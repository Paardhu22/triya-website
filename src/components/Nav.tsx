"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

import { EASE } from "@/lib/motion";
import MenuOverlay from "./ui/MenuOverlay";
import MenuToggle from "./ui/MenuToggle";

/**
 * The bar carries nothing but the wordmark and the toggle — every destination
 * lives in the takeover menu.
 *
 * It never paints a background. Sections alternate cream and ink the whole way
 * down, so any panel colour would be wrong against roughly half of it. Instead
 * the bar blends in difference mode: white content over an ink section stays
 * white, over cream it inverts to near-black. Nothing changes state on scroll
 * because there is no state to change.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Navigating closes the panel from the link handler itself (see MenuOverlay),
  // so there is no route-watching effect here.

  // A takeover covers the page; the page behind it should not keep scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Kept outside the blended header — difference mode would turn terracotta
          into a cyan that belongs to no palette. */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-terracotta"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        style={{ mixBlendMode: "difference" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="section-shell flex h-[72px] items-center justify-between">
          <Link href="/" className="focus-ring rounded">
            <span className="text-[22px] leading-none font-bold tracking-[-0.03em] text-white">
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
