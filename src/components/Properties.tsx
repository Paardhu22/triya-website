"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  byKind,
  categories,
  type Category,
  type Property,
  type PropertyKind,
} from "@/data/properties";
import { EASE } from "@/lib/motion";
import PropertyListOverlay from "./ui/PropertyListOverlay";
import PropertyOverlay from "./ui/PropertyOverlay";

/**
 * The portfolio entry point. The section itself shows nothing but the two
 * divisions — no property names, no thumbnails. Each is a full-bleed band that
 * opens the listing takeover, and the listing in turn opens a detail page, so
 * the portfolio is three layers deep and each one is a whole screen.
 *
 * State for both takeovers lives here, the way `Nav` owns `MenuOverlay`: the
 * overlays stay presentational and this component handles the scroll lock and
 * the escape key for the pair.
 */

function CategoryBand({
  category,
  count,
  index,
  onOpen,
}: {
  category: Category;
  count: number;
  index: number;
  onOpen: (kind: PropertyKind) => void;
}) {
  return (
    <motion.button
      type="button"
      id={category.id}
      onClick={() => onOpen(category.kind)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
      aria-label={`Browse ${category.label}`}
      className="group focus-ring relative block h-[62vh] w-full overflow-hidden text-left md:h-[100dvh]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      {/* Dark enough that the type holds on any placeholder photograph. */}
      <div className="absolute inset-0 bg-ink/60 transition-colors duration-700 group-hover:bg-ink/50" />

      {/* Own gutter rather than `.section-shell` — each half is its own box,
          and the outer one only matches the page gutter on its outer edge. */}
      <div className="relative flex h-full flex-col justify-between px-5 py-10 sm:px-8 sm:py-12">
        <p className="text-[11px] font-medium tracking-[0.28em] text-white/55 uppercase">
          {String(index + 1).padStart(2, "0")} —{" "}
          {String(count).padStart(2, "0")} properties
        </p>

        <div>
          {/* Half-width columns, so this tops out well below the full-bleed
              size the same word could carry across the whole page. */}
          <h3 className="text-[clamp(2.25rem,5.2vw,5rem)] leading-[0.9] font-bold tracking-[-0.045em] text-white uppercase">
            {category.label}
          </h3>

          <p className="mt-6 max-w-[42ch] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] tracking-[-0.01em] text-white/65 text-balance">
            {category.blurb}
          </p>

          {/* Decorative — the whole half is the control. */}
          <span
            aria-hidden="true"
            className="mt-9 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-white/55 uppercase transition-colors duration-300 group-hover:text-white"
          >
            Browse
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1"
            >
              <path
                d="M4 12h15M12.5 5.5 19 12l-6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Properties() {
  const [openKind, setOpenKind] = useState<PropertyKind | null>(null);
  const [openProperty, setOpenProperty] = useState<Property | null>(null);

  const listItems = useMemo(
    () => (openKind ? byKind(openKind) : []),
    [openKind],
  );
  const listLabel =
    categories.find((category) => category.kind === openKind)?.label ?? "";

  // Either takeover covers the page; whatever is behind it should not scroll.
  useEffect(() => {
    const locked = openKind !== null || openProperty !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openKind, openProperty]);

  // Escape peels one layer at a time rather than dismissing the whole stack.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openProperty) setOpenProperty(null);
      else if (openKind) setOpenKind(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKind, openProperty]);

  return (
    <section id="properties" className="bg-background pt-[14vh] pb-[14vh]">
      <div className="section-shell">
        <p className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
          Portfolio
        </p>
        <p className="mt-8 max-w-[34ch] text-[clamp(1rem,1.35vw,1.35rem)] leading-[1.5] tracking-[-0.015em] text-balance">
          Two divisions, one operating standard. Choose the one you are looking
          for and the whole list opens.
        </p>
      </div>

      {/* Full-bleed, split down the middle — residences left, hotels right,
          each holding a full screen. They stack on narrow windows. */}
      <div className="mt-[8vh] grid gap-3 md:grid-cols-2">
        {categories.map((category, i) => (
          <CategoryBand
            key={category.kind}
            category={category}
            count={byKind(category.kind).length}
            index={i}
            onOpen={setOpenKind}
          />
        ))}
      </div>

      <PropertyListOverlay
        kind={openKind}
        label={listLabel}
        items={listItems}
        onSelect={setOpenProperty}
        onClose={() => setOpenKind(null)}
      />

      <PropertyOverlay
        property={openProperty}
        onClose={() => setOpenProperty(null)}
      />
    </section>
  );
}
