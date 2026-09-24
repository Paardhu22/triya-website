"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { AMENITIES } from "@/data/amenities";
import { BRAND } from "@/data/brand";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/cn";
import { EASE, EASE_UI } from "@/lib/motion";
import CloseButton from "./CloseButton";

/**
 * Below the fold the page is read by scrolling, not arrival, so these rise
 * when they come into view rather than on the takeover's opening stagger.
 */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const EYEBROW =
  "text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase";

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
 *
 * Reading order follows what someone choosing a room checks first: what it
 * costs, what is included, then what it looks like inside.
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
                  src={property.gallery[0]?.src ?? property.image}
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

              {/* Amenities — grouped, each item on the same ruled row the
                  stats use, with an icon so the list can be scanned. */}
              <section
                aria-labelledby={`${property.slug}-amenities`}
                className="mt-[max(3.5rem,11svh)] grid gap-y-7 sm:gap-y-10 md:grid-cols-12 md:gap-x-10"
              >
                <motion.h3
                  {...reveal()}
                  id={`${property.slug}-amenities`}
                  className={cn(EYEBROW, "md:col-span-3")}
                >
                  {"What's included"}
                </motion.h3>

                <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
                  {property.amenities.map((group, i) => (
                    <motion.div key={group.title} {...reveal(i * 0.06)}>
                      <p className="text-[11px] font-medium tracking-[0.2em] uppercase">
                        {group.title}
                      </p>
                      <ul className="mt-4">
                        {group.items.map((key) => {
                          const { label, icon: Icon } = AMENITIES[key];
                          return (
                            <li
                              key={key}
                              className="flex items-center gap-3 border-t border-line py-3 text-[14px] tracking-[-0.01em] text-foreground/75"
                            >
                              <Icon
                                aria-hidden="true"
                                strokeWidth={1.5}
                                className="h-[18px] w-[18px] shrink-0 text-foreground/50"
                              />
                              {label}
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Gallery — rows alternate a wide frame and a tall one, and
                  swap sides each row. Bottoms align, so the tall frame rises
                  above its neighbour and the captions sit on one line. */}
              <section
                aria-labelledby={`${property.slug}-photos`}
                className="mt-[max(3.5rem,11svh)]"
              >
                <motion.h3
                  {...reveal()}
                  id={`${property.slug}-photos`}
                  className={EYEBROW}
                >
                  Inside {property.name}
                </motion.h3>

                <div className="mt-8 grid gap-y-12 md:grid-cols-12 md:items-end md:gap-x-6 md:gap-y-[9svh]">
                  {property.gallery.slice(1).map((photo, i) => {
                    const wide = (Math.floor(i / 2) + (i % 2)) % 2 === 0;
                    return (
                      <motion.figure
                        key={photo.src}
                        {...reveal()}
                        className={cn(
                          "group",
                          wide ? "md:col-span-7" : "md:col-span-5",
                        )}
                      >
                        <div
                          className={cn(
                            "relative w-full overflow-hidden bg-line",
                            wide ? "aspect-[4/3]" : "aspect-[4/5]",
                          )}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.caption}
                            fill
                            sizes={
                              wide
                                ? "(max-width: 768px) 100vw, 58vw"
                                : "(max-width: 768px) 100vw, 42vw"
                            }
                            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                        </div>
                        <figcaption className="mt-3 flex items-baseline justify-between gap-6 text-[13px] tracking-[-0.01em] text-foreground/65">
                          {photo.caption}
                          <span className="text-[11px] tracking-[0.2em] text-foreground/40 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </figcaption>
                      </motion.figure>
                    );
                  })}
                </div>
              </section>

              {/* Enquiry */}
              <motion.div
                {...reveal()}
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
