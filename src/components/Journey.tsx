"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { properties } from "@/data/properties";

/**
 * The cinematic beat between the hero and the statement: a pinned stage where a
 * window opens onto a room, then the camera moves through three stays. It is
 * scroll-scrubbed motion graphics over stills instead of a generated video, so
 * there is nothing to stream and it runs the same on a phone as on a desktop.
 *
 * Everything moves on transform and opacity off one scroll progress value. The
 * only exception is the opening window, a `clip-path` inset, which is a single
 * layer and settles to `none` the moment it is fully open.
 */

const shot = (slug: string, i: number) => {
  const p = properties.find((x) => x.slug === slug)!;
  return { src: p.gallery[i].src, alt: `${p.gallery[i].caption}, ${p.name}` };
};

const SHOTS = [
  shot("triya-house", 1),
  shot("the-annexe", 1),
  shot("triya-pavilion", 0),
];

const COUNT_WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/**
 * Bands in scroll progress (0 when the stage pins, 1 when it lets go). Each is
 * roughly 85svh of plateau on a 460svh section, so a normal flick cannot skip
 * one. Starting points: tune `range` here, nothing else moves.
 */
const BANDS = [
  {
    range: [0.12, 0.4],
    title: "Move in with one bag.",
    sub: "Meals, housekeeping and Wi-Fi are already running the day you arrive.",
  },
  {
    range: [0.42, 0.68],
    title: "The small things, handled.",
    sub: "Hot water, a quiet floor, and a manager who picks up the phone.",
  },
  {
    range: [0.7, 1],
    title: "Stay a night or a year.",
    sub: `${COUNT_WORDS[properties.length] || properties.length} properties across Hyderabad. One standard in every one.`,
  },
] as const;

const smooth = { clamp: true } as const;

function Words({
  text,
  k,
  className,
}: {
  text: string;
  k: MotionValue<number>;
  className: string;
}) {
  const words = text.split(" ");
  return (
    <h2 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} n={words.length} k={k} />
        ))}
      </span>
    </h2>
  );
}

/** Word-by-word rise: each word owns a slice of the band's assembly progress. */
function Word({ word, i, n, k }: { word: string; i: number; n: number; k: MotionValue<number> }) {
  const start = (i / n) * 0.55;
  const y = useTransform(k, [start, start + 0.45], ["0.6em", "0em"], smooth);
  const opacity = useTransform(k, [start, start + 0.45], [0, 1], smooth);
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span className="inline-block" style={{ y, opacity }}>
        {word}
        {i < n - 1 ? " " : ""}
      </motion.span>
    </span>
  );
}

function Band({
  band,
  index,
  progress,
}: {
  band: (typeof BANDS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const [a, b] = band.range;
  const f = Math.min(0.03, (b - a) / 3);
  const first = index === 0;
  const last = index === BANDS.length - 1;

  // Opacity holds a long plateau and eases at each edge. The opening band is
  // assembled on load (see the stage), the closing band never fades out.
  const opacity = useTransform(
    progress,
    [a, a + f, b - f, b],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
    smooth,
  );
  // Assembly settles in the first ~20svh of the band, then sits still.
  const k = useTransform(progress, [a, a + 0.06], [first ? 1 : 0, 1], smooth);
  const subOpacity = useTransform(k, [0.55, 1], [0, 1], smooth);
  const subY = useTransform(k, [0.55, 1], [12, 0], smooth);
  const ctaOpacity = useTransform(k, [0.75, 1], [0, 1], smooth);

  return (
    <motion.div
      style={{ opacity }}
      className="journey-band pointer-events-none absolute inset-x-0 bottom-[max(3rem,12svh)] shell-gutter"
    >
      <div className="relative max-w-[min(100%,52rem)]">
        <Words
          text={band.title}
          k={k}
          className="text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-white"
        />
        <motion.p
          style={{ opacity: subOpacity, y: subY }}
          className="mt-5 max-w-[38ch] text-[clamp(1rem,1.5vw,1.35rem)] leading-[1.5] tracking-[-0.01em] text-white/85 sm:mt-7"
        >
          {band.sub}
        </motion.p>
        {last && (
          <motion.a
            href="#contact"
            style={{ opacity: ctaOpacity }}
            className="journey-cta focus-ring pointer-events-auto mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-terracotta px-6 text-[12px] font-medium tracking-[0.2em] text-white uppercase sm:mt-10"
          >
            Plan a visit
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M4 12h15M12.5 5.5 19 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

function Shot({
  shot,
  index,
  progress,
}: {
  shot: (typeof SHOTS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Crossfade on the seam between bands; every shot keeps a slow push-in
  // across its own stretch so the frame is never fully still.
  const prev = index > 0 ? BANDS[index - 1].range[1] : 0;
  const end = BANDS[index].range[1];
  const opacity = useTransform(
    progress,
    [Math.max(0, prev - 0.02), prev + 0.02],
    [index === 0 ? 1 : 0, 1],
    smooth,
  );
  const scale = useTransform(progress, [Math.max(0, prev - 0.02), end], [1.18, 1.02], smooth);
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale }}>
        <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-cover" priority={index === 0} />
      </motion.div>
    </motion.div>
  );
}

function StaticJourney() {
  const band = BANDS[BANDS.length - 1];
  const s = SHOTS[SHOTS.length - 1];
  return (
    <section aria-label="Stay with Triya" className="relative h-[100svh] overflow-hidden bg-ink">
      <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-cover" />
      <div className="journey-scrim absolute inset-0" />
      <div className="journey-band absolute inset-x-0 bottom-[max(3rem,12svh)] shell-gutter">
        <h2 className="text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-white">
          {band.title}
        </h2>
        <p className="mt-5 max-w-[38ch] text-[clamp(1rem,1.5vw,1.35rem)] leading-[1.5] text-white/85">{band.sub}</p>
        <a
          href="#contact"
          className="journey-cta focus-ring mt-8 inline-flex min-h-11 items-center rounded-full bg-terracotta px-6 text-[12px] font-medium tracking-[0.2em] text-white uppercase"
        >
          Plan a visit
        </a>
      </div>
    </section>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  // Read after mount (the server cannot know it, so reading during render
  // mismatches hydration) and kept live, so flipping the setting mid-visit swaps
  // the stage without a reload.
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A function transform keeps every downstream value on Motion's own frame
  // loop. Fed straight from useScroll, Motion hands them to the browser's
  // native scroll timeline, which mis-maps multi-stop keyframes and left
  // finished bands and shots visible on top of each other.
  const scrollYProgress = useTransform(raw, (v) => v);

  // The window: a framed rectangle that opens to full bleed over the first
  // stretch, while the scrim and the opening caption arrive with it.
  const inset = useTransform(scrollYProgress, [0, 0.12], [1, 0], smooth);
  const clipPath = useTransform(inset, (v) =>
    v <= 0.001 ? "none" : `inset(${v * 18}% ${v * 22}% ${v * 18}% ${v * 22}% round ${v * 24}px)`,
  );
  const counter = useTransform(scrollYProgress, (p) => {
    const i = BANDS.findIndex((b) => p < b.range[1]);
    return `0${(i === -1 ? BANDS.length - 1 : i) + 1} / 0${BANDS.length}`;
  });
  const chromeOpacity = useTransform(scrollYProgress, [0.06, 0.12], [0, 1], smooth);

  if (reduce) return <StaticJourney />;

  return (
    <section ref={ref} aria-label="Stay with Triya" className="relative h-[460svh] bg-background">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 bg-ink" style={{ clipPath }}>
          {SHOTS.map((s, i) => (
            <Shot key={s.src} shot={s} index={i} progress={scrollYProgress} />
          ))}
          <motion.div className="journey-scrim absolute inset-0" style={{ opacity: chromeOpacity }} />
          <motion.div style={{ opacity: chromeOpacity }}>
            {BANDS.map((band, i) => (
              <Band key={band.title} band={band} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>
          <motion.p
            aria-hidden="true"
            style={{ opacity: chromeOpacity }}
            className="journey-chip absolute top-[calc(var(--nav-h)+1rem)] right-5 rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white/80 tabular-nums sm:right-8 xl:right-12"
          >
            <motion.span>{counter}</motion.span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
