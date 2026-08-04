"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

import { EASE, EASE_UI } from "@/lib/motion";
import { useLenis } from "./SmoothScrollProvider";
import MenuOverlay from "./ui/MenuOverlay";
import MenuToggle from "./ui/MenuToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const lenisRef = useLenis();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const heroHeight = useRef(0);

  // After the page-load entrance animation completes, switch to the fast
  // scroll-responsive transition so hide/show feels instant, not sluggish.
  const hasEntered = useRef(false);

  useEffect(() => {
    const measure = () => {
      // Read the bar height from the same custom property the CSS uses, rather
      // than repeating the number — it differs per breakpoint.
      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        ) || 72;
      heroHeight.current = window.innerHeight - navH;
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    const scrollingDown = latest > previous;
    lastY.current = latest;

    const halfHero = heroHeight.current / 2;

    if (latest < halfHero) {
      // Top half of the hero — always visible.
      setNavHidden(false);
    } else if (scrollingDown) {
      // Past the halfway mark scrolling down — hide the entire bar.
      setNavHidden(true);
    } else {
      // Any upward scroll — bring the bar back.
      setNavHidden(false);
    }
  });

  // Pause Lenis so the page can't scroll behind the open menu overlay.
  useEffect(() => {
    if (open) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
    return () => {
      lenisRef.current?.start();
    };
  }, [open, lenisRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Progress bar lives outside the blended header — difference mode
          would turn terracotta into a cyan that belongs to no palette. */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-terracotta"
        style={{ scaleX: progress }}
      />

      {/* `-100%` rather than a pixel offset, so the bar hides itself completely
          whatever height the current breakpoint gives it. */}
      <motion.header
        initial={{ y: "-100%", opacity: 0 }}
        animate={navHidden ? { y: "-100%", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={
          hasEntered.current
            ? { duration: 0.38, ease: EASE_UI }
            : { duration: 0.9, ease: EASE, delay: 0.2 }
        }
        onAnimationComplete={() => {
          hasEntered.current = true;
        }}
        style={{
          mixBlendMode: "difference",
          pointerEvents: navHidden ? "none" : "auto",
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="section-shell flex h-nav items-center justify-between">
          <Link href="/" className="focus-ring rounded">
            <span className="text-[19px] leading-none font-bold tracking-[-0.03em] text-white sm:text-[22px]">
              triya
              <span className="font-medium text-white/70">group</span>
            </span>
          </Link>

          <MenuToggle onClick={() => setOpen(true)} expanded={open} />
        </div>
      </motion.header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
