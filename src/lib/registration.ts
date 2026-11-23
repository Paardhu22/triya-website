import "server-only";

import { properties } from "@/data/properties";

/**
 * Server-side link to the admin app's public registration API. Both values stay on the
 * server (never NEXT_PUBLIC_*): TRIYA_ADMIN_URL is the admin app's origin and
 * REGISTRATION_API_SECRET must equal the admin's PUBLIC_REGISTRATION_SECRET.
 */
export function adminConfig(): { url: string; secret: string } | null {
  const url = process.env.TRIYA_ADMIN_URL?.trim().replace(/\/+$/, "");
  const secret = process.env.REGISTRATION_API_SECRET?.trim();
  if (!url || !secret) return null;
  return { url, secret };
}

/**
 * Listing slugs that may take registrations: mapped to a real admin property AND present
 * in this site's own listing data. Anything unmapped, or any failure, means "closed".
 */
export async function getAcceptingSlugs(): Promise<string[]> {
  const config = adminConfig();
  if (!config) return [];
  try {
    const res = await fetch(`${config.url}/api/public/registrations/properties`, {
      headers: { "x-registration-secret": config.secret },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const body = (await res.json()) as { slugs?: unknown };
    const known = new Set(properties.map((p) => p.slug));
    return Array.isArray(body.slugs)
      ? body.slugs.filter((s): s is string => typeof s === "string" && known.has(s))
      : [];
  } catch {
    return [];
  }
}
