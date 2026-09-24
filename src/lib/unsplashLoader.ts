import type { ImageLoaderProps } from "next/image";

/**
 * Sizes the stand-in photography on Unsplash's own CDN rather than routing it
 * through Next's optimizer. The optimizer gives up on an upstream fetch after
 * a few seconds, and Unsplash's first resize of a full-size original regularly
 * takes longer, so cold frames came back as 504s. Unsplash reads the same
 * width and quality parameters, so the srcset `next/image` builds still works.
 *
 * Goes with lib/placeholder.ts: once real photographs are in /public, delete
 * both files and the `loader` entries in next.config.ts.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  const w = Number(url.searchParams.get("w"));
  const h = Number(url.searchParams.get("h"));
  url.searchParams.set("w", String(width));
  // A fixed crop keeps its ratio at every width in the srcset.
  if (w && h) url.searchParams.set("h", String(Math.round((width * h) / w)));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
