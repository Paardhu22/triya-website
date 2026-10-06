"use client";

import { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

import { useSmoothProgress } from "@/lib/useSmoothProgress";

/* ─── scroll-animation text ──────────────────────────────────────────────── */

const FULL_TEXT =
  "We manage hotels and residences built around comfort, consistency, and quietly considered living.";

const TEXT_WORDS = FULL_TEXT.split(" ");
const N = TEXT_WORDS.length; // 13

/**
 * The three values the sentence is built on — and the alliteration the copy
 * already leans on. They settle on terracotta while everything around them
 * settles on ink, so the pillars carry without breaking the line into
 * separate sizes or weights.
 */
const KEYWORDS = new Set(["comfort", "consistency", "considered"]);

/** Tokens arrive with punctuation attached ("comfort,"), so strip it first. */
const isKeyword = (word: string) =>
  KEYWORDS.has(word.replace(/[^a-zA-Z]/g, "").toLowerCase());

// Five fully-opaque RGB stops — no alpha so Framer Motion interpolates
// cleanly without any transparency dip mid-transition.
// Single-spaced on purpose: Motion's colour parser rejects the padded form
// ("rgb( 17,  17,  16)") and drops the tween, so these must not be aligned.
const C0 = "rgb(198, 196, 193)"; // warm gray
const C1 = "rgb(207, 170, 155)"; // blending toward terracotta
const C2 = "rgb(209, 129, 100)"; // terracotta premixed with background
const C3 = "rgb(113, 73, 58)"; // dark sienna
const C4 = "rgb(17, 17, 16)"; // foreground

// Every word passes through terracotta on its way to ink. The keywords simply
// stop there instead of continuing down into the dark, so the accent is the
// same colour the sentence is already made of — not a highlight laid on top.
const K3 = "rgb(205, 104, 70)";
const K4 = "rgb(194, 83, 44)"; // --terracotta

const RAMP = [C0, C1, C2, C3, C4];
const RAMP_KEYWORD = [C0, C1, C2, K3, K4];

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
    isKeyword(word) ? RAMP_KEYWORD : RAMP
  );
  return (
    <motion.span style={{ color }}>
      {isLast ? word : word + " "}
    </motion.span>
  );
}

/* ─── component ──────────────────────────────────────────────────────────── */

export default function HeroStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  // Measured across the pinned run: 0 when the section's top reaches the top
  // of the viewport (the pin engages) and 1 when its bottom reaches the bottom
  // (the pin releases). The sentence is centred in the viewport for all of it,
  // which the previous offset could not do — it finished colouring at the
  // moment the text arrived at centre, so the whole animation played on its
  // way up the lower half of the screen.
  const { scrollYProgress: raw } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // A beat of stillness at each end: the sentence sits centred and cold before
  // the first word warms, and holds fully lit before the section lets go. That
  // trailing hold is what makes the stop read as deliberate rather than as the
  // page having stalled.
  const scrollYProgress = useSmoothProgress(raw);
  const progress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1], {
    clamp: true,
  });

  return (
    // The height over the sticky child is the scroll the pin consumes — it is
    // never a blank screen of its own.
    <section ref={sectionRef} className="relative h-[220svh]">
      <div className="shell-gutter sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden py-16 sm:py-24">
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
        <p className="relative z-20 mx-auto max-w-[64rem] text-center text-[clamp(1.75rem,7.5vw,5.2rem)] leading-[1.2] font-bold tracking-[-0.035em] text-balance sm:text-[clamp(2.25rem,4.8vw,5.2rem)] sm:leading-[1.15]">
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
    </section>
  );
}
