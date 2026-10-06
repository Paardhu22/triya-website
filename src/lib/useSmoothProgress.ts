"use client";

import { useEffect, useRef } from "react";
import { MotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Scroll progress that glides on every device.
 *
 * On desktop Lenis already eases the wheel, so the raw value is passed through.
 * Lenis leaves touch alone (`syncTouch` off, which is right for native feel), so
 * on touch screens the value runs through a spring instead: scroll-scrubbed
 * motion then trails the finger slightly and settles, rather than stepping.
 * Overdamped, so it never overshoots past the band edges.
 *
 * Returned through a function transform either way, which also keeps every
 * consumer on Motion's own frame loop rather than the native scroll timeline.
 */
export function useSmoothProgress(raw: MotionValue<number>) {
  const spring = useSpring(raw, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  const touch = useRef(false);
  useEffect(() => {
    const mq = matchMedia("(pointer: coarse)");
    const sync = () => {
      touch.current = mq.matches;
      spring.jump(raw.get());
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [raw, spring]);
  return useTransform([raw, spring], ([r, s]: number[]) => (touch.current ? s : r));
}
