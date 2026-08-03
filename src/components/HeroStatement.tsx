"use client";

import { useEffect, useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

/* ─── scroll-animation text ──────────────────────────────────────────────── */

const FULL_TEXT =
  "We manage hotels and residences built around comfort, consistency, and quietly considered living";

const TEXT_WORDS = FULL_TEXT.split(" ");
const N = TEXT_WORDS.length; // 13

// Five fully-opaque RGB stops — no alpha so Framer Motion interpolates
// cleanly without any transparency dip mid-transition.
const C0 = "rgb(198, 196, 193)"; // warm gray
const C1 = "rgb(207, 170, 155)"; // blending toward terracotta
const C2 = "rgb(209, 129, 100)"; // terracotta premixed with background
const C3 = "rgb(113,  73,  58)"; // dark sienna
const C4 = "rgb( 17,  17,  16)"; // foreground

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

/* ─── cursor trail ───────────────────────────────────────────────────────── */

const TRAIL_WORDS = [
  "Symphonic", "Serenity", "Tactile", "Fluidity", "Restraint", "Sanctuary",
  "Timeless", "Intentionality", "Elegance", "Cohesive", "Clarity", "Fluency",
] as const;
type TrailWord = (typeof TRAIL_WORDS)[number];

const COLOR_MAP: Record<TrailWord, { bg: string; fg: string }> = {
  Symphonic:       { bg: "#3B82F6", fg: "#fff" },
  Serenity:        { bg: "#7C3AED", fg: "#fff" },
  Tactile:         { bg: "#D97706", fg: "#fff" },
  Fluidity:        { bg: "#84CC16", fg: "#111110" },
  Restraint:       { bg: "#111110", fg: "#fff" },
  Sanctuary:       { bg: "#C2532C", fg: "#fff" },
  Timeless:        { bg: "#A78BFA", fg: "#111110" },
  Intentionality:  { bg: "#F59E0B", fg: "#111110" },
  Elegance:        { bg: "#EF4444", fg: "#fff" },
  Cohesive:        { bg: "#10B981", fg: "#fff" },
  Clarity:         { bg: "#F3F0E8", fg: "#111110" },
  Fluency:         { bg: "#0EA5E9", fg: "#fff" },
};

function useCursorTrail(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastX = 0, lastY = 0, lastTime = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const spawnCard = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      const word = TRAIL_WORDS[Math.floor(Math.random() * TRAIL_WORDS.length)];
      const { bg, fg } = COLOR_MAP[word];
      const deg = (Math.random() * 24 - 12).toFixed(1);

      const card = document.createElement("div");
      card.setAttribute("data-trail-card", "");
      card.textContent = word.toUpperCase();
      card.style.setProperty("--rot", `${deg}deg`);
      Object.assign(card.style, {
        position: "absolute",
        left: `${relX}px`,
        top: `${relY}px`,
        background: bg,
        color: fg,
        fontFamily: "inherit",
        fontSize: "26px",
        fontWeight: "700",
        letterSpacing: "0.08em",
        padding: "16px 32px",
        borderRadius: "10px",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        zIndex: "30",
        animation: "cursor-card-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      });
      container.appendChild(card);

      // Switch to fade-out after pop-in (250ms) + hold (450ms) = 700ms.
      const t1 = setTimeout(() => {
        card.style.animation = "cursor-card-out 300ms ease forwards";
      }, 700);
      // Remove from DOM after total lifetime ~1000ms.
      const t2 = setTimeout(() => card.remove(), 1000);
      timers.push(t1, t2);
    };

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= 250 || now - lastTime >= 1800) {
        spawnCard(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    container.addEventListener("mousemove", onMove);
    return () => {
      container.removeEventListener("mousemove", onMove);
      timers.forEach(clearTimeout);
      container.querySelectorAll("[data-trail-card]").forEach((el) => el.remove());
    };
  }, [containerRef]);
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

  const lastS = (N - 1) * STAGGER;
  const cursorBg = useTransform(
    progress,
    FRAC.map((f) => Math.min(1, lastS + f * WINDOW)),
    [C0, C1, C2, C3, C4]
  );

  useCursorTrail(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 sm:px-8"
    >
      <span className="absolute top-8 left-5 text-[11px] tracking-[-0.01em] text-muted sm:left-8">
        2016
      </span>
      <span className="absolute top-8 right-5 text-[11px] tracking-[-0.01em] text-muted sm:right-8">
        2025
      </span>

      <p className="relative z-20 mx-auto max-w-[64rem] text-center text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[1.15] font-bold tracking-[-0.035em]">
        {TEXT_WORDS.map((word, i) => (
          <ScrollWord
            key={i}
            word={word}
            index={i}
            isLast={i === N - 1}
            progress={progress}
          />
        ))}

        <motion.span
          aria-hidden
          style={{ backgroundColor: cursorBg }}
          className="cursor-blink inline-block w-[3px] h-[0.82em] rounded-sm ml-[4px] align-middle"
        />
      </p>
    </div>
  );
}
