import { getAcceptingSlugs } from "@/lib/registration";

export const runtime = "nodejs";

/** Which listings currently accept registrations (used to show the Register button). */
export async function GET() {
  return Response.json({ slugs: await getAcceptingSlugs() }, { headers: { "Cache-Control": "public, max-age=60" } });
}
