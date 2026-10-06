"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { BRAND } from "@/data/brand";
import { EASE } from "@/lib/motion";
import { useSmoothProgress } from "@/lib/useSmoothProgress";

/**
 * The one call to action the page funnels to. A static site has no backend, so
 * the form composes an email to the front desk and hands it to the visitor's
 * own mail app. The success state says exactly that, nothing more.
 */

const FIELD =
  "w-full border-b border-white/30 bg-transparent py-3 text-[16px] text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-terracotta";
const LABEL = "text-[10px] font-medium tracking-[0.28em] text-white/55 uppercase";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const scrollYProgress = useSmoothProgress(raw);
  // The rule under the headline draws itself as the section arrives.
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Looking for: ${d.get("kind")}`,
      `From: ${d.get("date") || "Flexible"}`,
      "",
      String(d.get("note") || ""),
    ].join("\n");
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      `Visit request from ${d.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden bg-ink py-[max(5rem,16svh)] text-white">
      <div aria-hidden="true" className="contact-glow pointer-events-none absolute -top-1/3 left-1/2 h-[80svh] w-[80vw] -translate-x-1/2 rounded-full" />

      <div className="section-shell relative grid gap-14 md:grid-cols-12 md:gap-x-8">
        <motion.div className="md:col-span-6" {...rise(0)}>
          <p className={LABEL}>Plan a visit</p>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance">
            See the room before you decide.
          </h2>
          <svg viewBox="0 0 400 8" className="mt-8 h-2 w-[min(100%,24rem)]" aria-hidden="true" preserveAspectRatio="none">
            <motion.path
              d="M0 4 C 100 0, 200 8, 400 4"
              fill="none"
              stroke="var(--terracotta)"
              strokeWidth="1.5"
              style={{ pathLength: draw }}
            />
          </svg>
          <p className="mt-8 max-w-[40ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-white/70">
            Tell us when you want to move in or check in. We will call you back within a day, set up a walkthrough, and
            give you the full price up front. No brokerage, no surprises on the first bill.
          </p>
          <div className="mt-10 flex flex-col gap-2 text-[15px] text-white/60">
            <a href={BRAND.phoneHref} className="focus-ring w-fit rounded transition-colors hover:text-white">
              {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} className="focus-ring w-fit rounded transition-colors hover:text-white">
              {BRAND.email}
            </a>
          </div>
        </motion.div>

        <motion.div className="md:col-span-5 md:col-start-8" {...rise(0.15)}>
          {sent ? (
            <div role="status" className="flex min-h-full flex-col justify-center">
              <p className={LABEL}>Almost there</p>
              <p className="mt-5 text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.25] tracking-[-0.02em]">
                Your email app should have opened with the details filled in. Press send and we will call you back.
              </p>
              <p className="mt-5 text-[15px] text-white/60">
                Nothing opened? Write to{" "}
                <a href={`mailto:${BRAND.email}`} className="underline underline-offset-4">
                  {BRAND.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <label className="flex flex-col gap-1">
                <span className={LABEL}>Your name</span>
                <input name="name" required autoComplete="name" placeholder="Full name" className={FIELD} />
              </label>
              <label className="flex flex-col gap-1">
                <span className={LABEL}>Phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91"
                  className={FIELD}
                />
              </label>
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className={LABEL}>Looking for</span>
                  <select name="kind" className={`${FIELD} [&>option]:text-ink`} defaultValue="A residence">
                    <option>A residence</option>
                    <option>A hotel stay</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className={LABEL}>From</span>
                  <input name="date" type="date" className={`${FIELD} [color-scheme:dark]`} />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className={LABEL}>Anything we should know</span>
                <textarea name="note" rows={2} placeholder="Budget, area, how long you plan to stay" className={`${FIELD} resize-none`} />
              </label>
              <button
                type="submit"
                className="journey-cta focus-ring mt-2 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-terracotta px-7 text-[12px] font-medium tracking-[0.2em] text-white uppercase"
              >
                Request a visit
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 12h15M12.5 5.5 19 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <footer className="section-shell relative mt-[max(5rem,14svh)] flex flex-col gap-4 border-t border-white/15 pt-8 text-[13px] text-white/45 sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. Hyderabad.
        </p>
        <p>Photographs are representative while our own shoots are in progress.</p>
      </footer>
    </section>
  );
}
