import { adminConfig, getAcceptingSlugs } from "@/lib/registration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: unknown, status: number) => Response.json(body, { status, headers: NO_STORE });

const MAX_BODY = 4 * 1024 * 1024;
const FIELDS = ["websiteSlug", "fullName", "phone", "email", "preferredCheckIn", "consent"] as const;

// Best-effort per-instance throttle. The admin API enforces the authoritative shared limits.
const hits = new Map<string, { count: number; resetAt: number }>();
function throttled(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    if (hits.size > 5000) hits.clear();
    hits.set(ip, { count: 1, resetAt: now + 10 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 8;
}

/** Public form target. Validates origin + shape, then relays server-to-server to the admin app. */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    let originHost = "";
    try { originHost = new URL(origin).host; } catch { /* invalid */ }
    if (originHost !== host) return json({ error: "Forbidden" }, 403);
  }

  const length = request.headers.get("content-length");
  if (!length || !/^\d+$/.test(length) || Number(length) > MAX_BODY) {
    return json({ error: "Request is too large" }, 413);
  }

  const config = adminConfig();
  if (!config) return json({ error: "Registration is not available right now" }, 503);

  const ip = (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (throttled(ip || "unknown")) {
    return json({ error: "Too many attempts. Please try again later." }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  // Bots: filled honeypot, or submitted faster than a person can type. Pretend success.
  const honeypot = form.get("company");
  const startedAt = Number(form.get("startedAt"));
  if ((typeof honeypot === "string" && honeypot.trim() !== "") || (Number.isFinite(startedAt) && Date.now() - startedAt < 2000)) {
    return json({ ok: true, status: "created" }, 201);
  }

  const slug = form.get("websiteSlug");
  if (typeof slug !== "string" || !(await getAcceptingSlugs()).includes(slug)) {
    return json({ error: "This property is not accepting online registrations" }, 404);
  }

  // Forward an explicit allowlist only; nothing else from the browser reaches the admin app.
  const out = new FormData();
  for (const key of FIELDS) {
    const value = form.get(key);
    if (typeof value === "string") out.set(key, value);
  }
  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) out.set("photo", photo, "kyc");

  try {
    const res = await fetch(`${config.url}/api/public/registrations`, {
      method: "POST",
      headers: {
        "x-registration-secret": config.secret,
        "x-registration-client-ip": ip,
      },
      body: out,
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    const body = (await res.json().catch(() => ({}))) as { status?: string; error?: string; fields?: Record<string, string> };
    if (res.ok) return json({ ok: true, status: body.status === "duplicate" ? "duplicate" : "created" }, res.status === 200 ? 200 : 201);
    // 401/5xx from the admin app are infrastructure problems: never leak them to visitors.
    if (res.status === 401 || res.status >= 500) return json({ error: "Registration is not available right now. Please try again later." }, 503);
    return json({ error: body.error ?? "Registration could not be submitted", fields: body.fields }, res.status);
  } catch {
    return json({ error: "Registration is not available right now. Please try again later." }, 503);
  }
}
