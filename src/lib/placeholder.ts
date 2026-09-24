/**
 * Stand-in photography until the property shoots are delivered.
 *
 * Each id is a specific Unsplash photograph (free to use under the Unsplash
 * License), picked to match what the frame is captioned as — a twin-sharing
 * room, the mess, the laundry — so a detail page reads like a real listing in
 * the meantime. Ids are fixed, so layout stays deterministic between reloads
 * and builds.
 *
 * Leave `h` off to keep the photograph's own proportions and let the frame's
 * `object-cover` do the cropping; pass it only where the frame's ratio is
 * fixed. Deleting this file, lib/unsplashLoader.ts and the `loader` entries in
 * next.config.ts is the last step of the swap to real images.
 */
export const placeholder = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}&fit=crop` : ""}&auto=format&q=80`;
