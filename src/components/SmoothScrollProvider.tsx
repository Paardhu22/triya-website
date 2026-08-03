"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";

// A stable ref is passed through context so consumers never re-render
// just because Lenis initialised. They read .current when they need it.
type LenisRef = React.RefObject<Lenis | null>;
const LenisContext = createContext<LenisRef>({ current: null });

export function useLenis(): LenisRef {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — no smooth scroll for these users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
