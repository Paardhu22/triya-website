"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { BRAND } from "@/data/brand";
import type { Property } from "@/data/properties";
import { EASE, EASE_UI } from "@/lib/motion";
import CloseButton from "./CloseButton";

/**
 * The property detail page — the last layer of the stack, opened from the
 * arrow on a listing band and sitting above it at z-80.
 *
 * It always lands on cream, whatever the ground of the band underneath was:
 * arriving at a detail page should feel like a reset, not a continuation of
 * the alternating rhythm.
 *
 * The panel carries the slide; the contents fade up behind it on a short
 * stagger, so the takeover reads as one move rather than two.
 */
export default function PropertyOverlay({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {property && (
        <motion.div
          key={property.slug}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { duration: 0.5, ease: EASE_UI } }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          aria-label={`${property.name} details`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
            <div className="section-shell flex h-nav items-center justify-end">
              <div className="pointer-events-auto -mr-3 sm:-mr-4">
                <CloseButton
                  onClick={onClose}
                  label={`Close ${property.name}`}
                />
              </div>
            </div>
          </div>

          <div
            data-lenis-prevent
            className="no-scrollbar h-full overflow-y-auto overscroll-contain bg-background"
          >
            {/* Hero — the close button sits over this, so it stays white. */}
            <div className="relative h-[62svh] min-h-[20rem] w-full overflow-hidden bg-line">
              <motion.div
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
                className="absolute inset-0"
              >
                <Image
                  src={property.gallery[0] ?? property.image}
                  alt={`${property.name}, ${property.location}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/25" />

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
                className="section-shell absolute inset-x-0 bottom-0 pb-8 sm:pb-14"
              >
                <p className="text-[10px] font-medium tracking-[0.28em] text-white/60 uppercase sm:text-[11px]">
                  {property.location} — {property.kind}
                </p>
                <h2 className="mt-3 text-[clamp(1.9rem,6.5vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white text-pretty">
                  {property.name}
                </h2>
              </motion.div>
            </div>

            <div className="section-shell pt-[max(3rem,9svh)] pb-[max(4rem,12svh)]">
              {/* Statement + the numbers, side by side. */}
              <div className="grid gap-y-12 sm:gap-y-14 md:grid-cols-12 md:gap-x-10">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
                  className="md:col-span-7"
                >
                  <p className="text-[clamp(1.2rem,2.4vw,2.1rem)] leading-[1.3] font-medium tracking-[-0.03em] text-pretty sm:leading-[1.25]">
                    {property.tagline}
                  </p>
                  <p className="mt-6 max-w-[52ch] text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.65] tracking-[-0.01em] text-foreground/70 sm:mt-8">
                    {property.description}
                  </p>
                </motion.div>

                <motion.dl
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
                  className="grid grid-cols-2 gap-x-6 gap-y-7 self-start sm:gap-x-8 sm:gap-y-8 md:col-span-4 md:col-start-9"
                >
                  {property.stats.map((stat) => (
                    <div key={stat.label} className="border-t border-line pt-4">
                      <dt className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
                        {stat.label}
                      </dt>
                      <dd className="mt-2 text-[clamp(1.05rem,1.5vw,1.4rem)] leading-tight font-medium tracking-[-0.025em]">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </motion.dl>
              </div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
                className="mt-[max(3.5rem,11svh)] grid gap-y-7 md:grid-cols-12 md:gap-x-10"
              >
                <p className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase md:col-span-3">
                  {"What's included"}
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8 md:col-span-8 md:col-start-5 lg:grid-cols-3">
                  {property.amenities.map((item) => (
                    <li
                      key={item}
                      className="border-t border-line pt-3 text-[14px] tracking-[-0.01em] text-foreground/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Gallery — the tall frame leads, the two wide ones follow. */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
                className="mt-[max(3.5rem,11svh)] grid gap-4 sm:grid-cols-2 sm:gap-5"
              >
                {property.gallery.slice(1).map((src, i) => (
                  <figure
                    key={src}
                    className={`relative w-full overflow-hidden bg-line ${
                      i === 0 ? "aspect-[4/5] sm:row-span-2" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${property.name} — view ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>
                ))}
              </motion.div>

              {/* Enquiry */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
                className="mt-[max(3.5rem,11svh)] border-t border-line pt-8 sm:pt-10"
              >
                <p className="text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.25] font-medium tracking-[-0.03em] text-pretty">
                  Enquire about {property.name}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1 text-[14px] text-foreground/60">
                  <a
                    href={BRAND.phoneHref}
                    className="focus-ring -my-1.5 rounded py-1.5 transition-colors duration-300 hover:text-foreground sm:my-0 sm:py-0"
                  >
                    {BRAND.phone}
                  </a>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="focus-ring -my-1.5 rounded py-1.5 break-all transition-colors duration-300 hover:text-foreground sm:my-0 sm:py-0"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
