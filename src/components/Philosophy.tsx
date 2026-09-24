"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { placeholder } from "@/lib/placeholder";
import { EASE } from "@/lib/motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

/**
 * One scale for both paragraphs. They sit in identical columns and carry the
 * same weight in the argument, so nothing justified the two near-identical
 * scales they used to have — 1.3/2.2vw/1.9 against 1.15/1.8vw/1.65 read as
 * an accident rather than a hierarchy.
 *
 * No max-width: the five-column cell already sets the measure. A `max-w-[40ch]`
 * here fought it, because the type stops growing at 1.7rem while the column
 * keeps widening — past ~1700px the cap left the paragraph short of the column
 * (156px at 1920, 423px at 2560) while the image in the same column position
 * still ran edge to edge. `text-pretty` rather than `text-balance` for the same
 * reason: balance equalises line lengths, which is right for a two-line heading
 * and wrong for a paragraph, where it pulls the whole block off the right edge.
 * The 1.1rem floor is the phone size, where the vw term has long bottomed out.
 */
const BODY =
  "text-[clamp(1.1rem,1.9vw,1.7rem)] leading-[1.55] tracking-[-0.015em] text-pretty";

/**
 * Both frames take the same ratio and the same span, mirrored across the two
 * rows. Sized by aspect ratio rather than viewport height: a `h-[72vh]` frame
 * reproportions itself on every resize, so it can never hold a stable
 * relationship to a ratio-sized frame beside it. That mismatch — not the
 * asymmetry — was what made the section look uneven.
 */
const FRAME = "relative aspect-[4/5] w-full overflow-hidden bg-line";
const FRAME_IMG =
  "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]";

export default function Philosophy() {
  return (
    <section id="about" className="bg-surface py-[max(4rem,14svh)]">
      <div className="section-shell">
        {/* One grid rather than two stacked ones, so both rows draw from the
            same track list and the left edge and central gutter land in the
            same place the whole way down. Columns 6–7 are that gutter. */}
        <div className="grid gap-y-10 sm:gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-[max(3rem,10svh)]">
          <motion.div
            className="flex flex-col justify-center md:col-span-5 md:col-start-1"
            {...fadeUp(0)}
          >
            {/* 10px matches every other section eyebrow on the site; this one
                was 16px and the only outlier among ten. */}
            <p className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
              Philosophy
            </p>

            <p className={cn("mt-7 sm:mt-10", BODY)}>
              Every property is shaped through proportion, light, texture, and
              the way a day actually moves through a room. We believe a stay
              should feel effortless — spaces that hold up to ordinary use and
              still feel considered on the hundredth morning.
            </p>
          </motion.div>

          <motion.figure
            className="group relative md:col-span-5 md:col-start-8"
            {...fadeUp(0.18)}
          >
            <div className={FRAME}>
              <Image
                src={placeholder("1768411471039-358fdad6ec04", 900, 1125)}
                alt="Daylight across a residence interior"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className={FRAME_IMG}
              />
            </div>
          </motion.figure>

          <motion.figure
            className="group relative md:col-span-5 md:col-start-1"
            {...fadeUp(0)}
          >
            <div className={FRAME}>
              <Image
                src={placeholder("1601993957728-1e56ab70c5a8", 900, 1125)}
                alt="Stairwell detail in a Triya property"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className={FRAME_IMG}
              />
            </div>
          </motion.figure>

          <motion.div
            className="flex flex-col justify-center md:col-span-5 md:col-start-8"
            {...fadeUp(0.18)}
          >
            <p className={BODY}>
              Elegance exists in the space between necessity and indulgence. Our
              design ethos rejects the ephemeral in favor of the timeless,
              utilizing clean geometric lines, organic materials, and deliberate
              spatial flow to cultivate a poetic sense of belonging. We craft
              sanctuaries that elevate the ritual of the everyday.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
