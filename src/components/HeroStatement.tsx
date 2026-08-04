"use client";

import { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

/* ─── scroll-animation text ──────────────────────────────────────────────── */

const FULL_TEXT =
  "We manage hotels and residences built around comfort, consistency, and quietly considered living";

const TEXT_WORDS = FULL_TEXT.split(" ");
const N = TEXT_WORDS.length; // 13

// Five fully-opaque RGB stops — no alpha so Framer Motion interpolates
// cleanly without any transparency dip mid-transition.
// Single-spaced on purpose: Motion's colour parser rejects the padded form
// ("rgb( 17,  17,  16)") and drops the tween, so these must not be aligned.
const C0 = "rgb(198, 196, 193)"; // warm gray
const C1 = "rgb(207, 170, 155)"; // blending toward terracotta
const C2 = "rgb(209, 129, 100)"; // terracotta premixed with background
const C3 = "rgb(113, 73, 58)"; // dark sienna
const C4 = "rgb(17, 17, 16)"; // foreground

const STAGGER = 0.85 / (N - 1);
const WINDOW  = 2.2 * STAGGER;
const FRAC    = [0, 0.18, 0.42, 0.68, 1.0];

function ScrollWord({
  word,
  index,
  isLast,
  progress,
}: {
  word: string;
  index: number;
  isLast: boolean;
  progress: MotionValue<number>;
}) {
  const s = index * STAGGER;
  const color = useTransform(
    progress,
    FRAC.map((f) => Math.min(1, s + f * WINDOW)),
    [C0, C1, C2, C3, C4]
  );
  return (
    <motion.span style={{ color }}>
      {isLast ? word : word + " "}
    </motion.span>
  );
}

/* ─── component ──────────────────────────────────────────────────────────── */

export default function HeroStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "center start"],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.50], [0, 1], {
    clamp: true,
  });

  return (
    <div
      ref={containerRef}
      className="shell-gutter relative flex min-h-[100svh] items-center justify-center overflow-hidden py-16 sm:py-24"
    >
      {/* The date markers bracket the statement. They are pinned to the gutter
          rather than the raw viewport edge so they stay in the same column as
          every other section, and `pt`/`pb` on the parent keeps the centred
          paragraph from ever reaching them on a short window. */}
      <span className="shell-gutter absolute inset-x-0 top-8 flex justify-between text-[11px] tracking-[-0.01em] text-muted">
        <span>2016</span>
        <span>2025</span>
      </span>

      {/* The floor drops to 1.75rem below `sm`: at 2.6rem this 97-character
          sentence took seven lines on a 320px screen and ran past the fold. */}
      <p className="relative z-20 mx-auto max-w-[64rem] text-center text-[clamp(1.75rem,7.5vw,5.2rem)] leading-[1.2] font-bold tracking-[-0.035em] sm:text-[clamp(2.25rem,4.8vw,5.2rem)] sm:leading-[1.15]">
        {TEXT_WORDS.map((word, i) => (
          <ScrollWord
            key={i}
            word={word}
            index={i}
            isLast={i === N - 1}
            progress={progress}
          />
        ))}
      </p>
    </div>
  );
}
