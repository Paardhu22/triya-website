"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import type { Property, PropertyKind } from "@/data/properties";
import { cn } from "@/lib/cn";
import { EASE, EASE_UI } from "@/lib/motion";
import ArrowButton from "./ArrowButton";
import CloseButton from "./CloseButton";

/**
 * The listing takeover: one property per screen, stacked.
 *
 * Two things alternate with the index and stay locked together — the ground
 * (cream, ink, cream, ink) and the side the numeral sits on (left, right,
 * left). The image cluster always takes the opposite side, so the eye
 * zig-zags down the list instead of tracking a single column.
 *
 * The bar is a sibling of the scroller rather than a child of it, so it holds
 * position without taking layout space off the first band's full height. It
 * paints in difference mode for the same reason the site header does: it
 * crosses cream and ink bands and no single colour would work against both.
 */

/** Rises its children into place the first time the band is scrolled to. */
function Rise({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A frame built from three nested layers, each owning one movement so they
 * compose instead of fighting over `transform`:
 *
 *  1. the figure holds the mask, wiping open from its bottom edge;
 *  2. inside it the photograph rides *down* into place as the mask opens, so
 *     the picture appears to sit still behind a window that is being drawn
 *     rather than to slide up with it — the difference is what makes the
 *     reveal read as unhurried;
 *  3. innermost, a spring-smoothed parallax tied to the band's own progress
 *     through the scroller, so the cluster keeps drifting after it has landed.
 *
 * `className` has to carry the positioning: Tailwind emits `relative` after
 * `absolute`, so a base `relative` here would quietly win over an `absolute`
 * passed in and drop the offset frame back into the flow.
 */
function Frame({
  src,
  alt,
  delay = 0,
  className,
  sizes,
  priority,
  scroller,
  /** Pixels of parallax travel; opposite signs make the pair drift apart. */
  drift,
}: {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  sizes: string;
  priority?: boolean;
  scroller: React.RefObject<HTMLDivElement | null>;
  drift: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scroller,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const y = useSpring(raw, { stiffness: 80, damping: 24, restDelta: 0.5 });

  return (
    <motion.figure
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.25, ease: EASE, delay }}
      className={cn("overflow-hidden bg-line", className)}
    >
      <motion.div
        initial={{ y: "-22%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.25, ease: EASE, delay }}
        className="absolute inset-0"
      >
        {/* Bled vertically — the axis the parallax travels on — by more than
            the largest drift, so no scroll position can pull a bare edge into
            the frame. The smaller frame is the binding case: at a short
            viewport it is ~144px tall, and 26% of that still clears its 24px
            of travel. */}
        <motion.div style={{ y }} className="absolute inset-x-0 -top-[26%] -bottom-[26%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.figure>
  );
}

function Band({
  property,
  index,
  onSelect,
  scroller,
}: {
  property: Property;
  index: number;
  onSelect: (property: Property) => void;
  scroller: React.RefObject<HTMLDivElement | null>;
}) {
  // Odd bands invert: ink ground, numeral on the right, images on the left.
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section
      className={cn(
        "relative",
        flipped ? "bg-ink text-white" : "bg-background text-foreground",
      )}
    >
      <div className="section-shell flex min-h-[100svh] items-center py-20 sm:py-24">
        <div className="grid w-full items-center gap-y-12 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          {/* Numeral and copy */}
          <div
            className={cn(
              "lg:row-start-1",
              flipped ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:col-start-1",
            )}
          >
            <Rise>
              {/* The numeral is the motif of the listing, so it stays large and
                  legible — but a step off full contrast, so the name below it
                  still reads first. */}
              <span
                className={cn(
                  "block text-[clamp(3.25rem,8vw,7rem)] leading-[0.78] font-medium tracking-[-0.05em] tabular-nums",
                  flipped ? "text-white/45" : "text-foreground/45",
                )}
              >
                {number}
              </span>
            </Rise>

            <Rise delay={0.07}>
              <hr
                className={cn(
                  "mt-7 w-14 border-0 border-t",
                  flipped ? "border-white/25" : "border-foreground/20",
                )}
              />
            </Rise>

            <Rise delay={0.12}>
              <h3 className="mt-7 text-[clamp(1.9rem,3.5vw,3.25rem)] leading-[1.02] font-medium tracking-[-0.035em]">
                {property.name}
              </h3>
            </Rise>

            <Rise delay={0.18}>
              <p
                className={cn(
                  "mt-3 text-[11px] font-medium tracking-[0.28em] uppercase",
                  flipped ? "text-white/45" : "text-foreground/45",
                )}
              >
                {property.location} — {property.kind}
              </p>
            </Rise>

            <Rise delay={0.24}>
              <p
                className={cn(
                  "mt-7 max-w-[40ch] text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.6] tracking-[-0.01em] text-balance",
                  flipped ? "text-white/65" : "text-foreground/70",
                )}
              >
                {property.summary}
              </p>
            </Rise>

            <Rise delay={0.32} className="mt-10">
              <ArrowButton
                label={`View ${property.name}`}
                onClick={() => onSelect(property)}
              />
            </Rise>
          </div>

          {/* Image cluster — heights are vh-capped so the pair never outgrows
              the band on a short window. */}
          <div
            className={cn(
              "lg:row-start-1",
              flipped ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6 lg:col-start-7",
            )}
          >
            <div className="relative">
              <Frame
                src={property.gallery[1] ?? property.image}
                alt={`${property.name}, ${property.location}`}
                sizes="(max-width: 1024px) 70vw, 40vw"
                priority={index === 0}
                delay={0.1}
                scroller={scroller}
                drift={44}
                className={cn(
                  "relative h-[min(56svh,30rem)] w-[68%]",
                  flipped ? "ml-auto" : "",
                )}
              />

              {/* The floor matters: the parallax inside travels 24px and is
                  covered by a 26% vertical bleed, so the frame must stay above
                  ~92px or the drift outruns the bleed and pulls a bare edge
                  into view. 24svh alone falls under that on a landscape phone. */}
              <Frame
                src={property.gallery[2] ?? property.image}
                alt=""
                sizes="(max-width: 1024px) 42vw, 25vw"
                delay={0.28}
                scroller={scroller}
                drift={-24}
                className={cn(
                  "absolute bottom-[-9%] h-[max(7rem,min(24svh,13rem))] w-[42%]",
                  flipped ? "left-0" : "right-0",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PropertyListOverlay({
  kind,
  label,
  items,
  onSelect,
  onClose,
}: {
  kind: PropertyKind | null;
  label: string;
  items: Property[];
  onSelect: (property: Property) => void;
  onClose: () => void;
}) {
  // `useScroll` measures each band against this element rather than the window.
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          key={kind}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { duration: 0.55, ease: EASE_UI } }}
          transition={{ duration: 0.75, ease: EASE }}
          className="fixed inset-0 z-[70]"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} listing`}
        >
          <div
            style={{ mixBlendMode: "difference" }}
            className="pointer-events-none absolute inset-x-0 top-0 z-30"
          >
            <div className="section-shell flex h-nav items-center justify-between gap-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
                className="truncate text-[10px] font-medium tracking-[0.28em] text-white uppercase sm:text-[11px]"
              >
                {label} — {String(items.length).padStart(2, "0")}
              </motion.span>

              <div className="pointer-events-auto -mr-3 shrink-0 sm:-mr-4">
                <CloseButton onClick={onClose} label={`Close ${label}`} />
              </div>
            </div>
          </div>

          {/* Scrollbar hidden so the cream/ink bands run edge to edge.
              `relative` matters: it is the offset parent the scroll
              measurements are taken against. */}
          <div
            ref={scroller}
            data-lenis-prevent
            className="no-scrollbar relative h-full overflow-y-auto overscroll-contain bg-background"
          >
            {items.map((property, i) => (
              <Band
                key={property.slug}
                property={property}
                index={i}
                onSelect={onSelect}
                scroller={scroller}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
