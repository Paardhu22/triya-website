"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { BRAND } from "@/data/brand";
import { EASE, EASE_UI } from "@/lib/motion";
import CloseButton from "./CloseButton";

/**
 * Full-screen navigation takeover.
 *
 * The destinations are the whole design: four oversized uppercase labels
 * bottom-left, the utility links in two quiet columns to their right. Each
 * label sits in a fixed-height window and rises into it from below, staggered,
 * so the list assembles line by line instead of appearing at once.
 *
 * Hovering any one label recedes the others to 30% (see `.menu-list` in
 * globals.css) — the list dims around whatever you are pointing at.
 */

// Placeholder destinations — every href is a section that does not exist yet.
const PRIMARY = [
  { label: "Hotels", href: "#hotels" },
  { label: "Residences", href: "#residences" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
];

const SECONDARY = [
  [
    { label: "Amenities", href: "#amenities" },
    { label: "Locations", href: "#locations" },
    { label: "Journal", href: "#journal" },
  ],
  [
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
    { label: "Contact", href: "#contact" },
  ],
];

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
          transition={{ duration: 0.3, ease: EASE_UI }}
          data-lenis-prevent
          className="no-scrollbar fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="section-shell flex min-h-full flex-col">
            {/* Matches the bar geometry underneath, so the wordmark does not
                shift when the panel drops over it. */}
            <div className="flex h-nav shrink-0 items-center justify-between">
              <span className="text-[19px] leading-none font-bold tracking-[-0.03em] text-white sm:text-[22px]">
                triya<span className="font-medium text-white/70">group</span>
              </span>
              {/* Pulled out to the gutter edge, the way the reference hangs it. */}
              <div className="-mr-3 sm:-mr-4">
                <CloseButton onClick={onClose} />
              </div>
            </div>

            {/* The long labels ("RESIDENCES") set the column ratio — at 1fr
                each they overrun the utility links. */}
            <div className="mt-auto grid grid-cols-1 items-end gap-10 pt-12 pb-10 sm:gap-14 sm:pt-20 sm:pb-14 lg:grid-cols-[1.35fr_1fr]">
              <nav className="menu-list flex flex-col">
                {PRIMARY.map((item, i) => (
                  <div
                    key={item.label}
                    className="overflow-hidden py-[0.1em]"
                    aria-hidden={false}
                  >
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{
                        y: "110%",
                        transition: {
                          duration: 0.4,
                          ease: EASE_UI,
                          delay: (PRIMARY.length - 1 - i) * 0.04,
                        },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: 0.12 + i * 0.07,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="menu-link focus-ring block text-[clamp(2rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.035em] whitespace-nowrap text-white uppercase"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-8 sm:gap-12 lg:items-end">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                  className="grid grid-cols-2 gap-x-8 gap-y-1 sm:gap-x-14 sm:gap-y-3"
                >
                  {SECONDARY.map((column, ci) => (
                    <div key={ci} className="flex flex-col gap-1 sm:gap-3">
                      {column.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          /* `py-1.5 -my-1.5` on touch widths grows the tap
                             target without moving the text — a 15px link is
                             otherwise an 18px-tall thing to hit with a thumb. */
                          className="focus-ring -my-1.5 w-fit py-1.5 text-[15px] tracking-[-0.01em] text-white/60 transition-colors duration-300 hover:text-white sm:my-0 sm:py-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                  className="flex flex-col gap-1 text-[13px] text-white/40 lg:items-end"
                >
                  <a
                    href={BRAND.phoneHref}
                    className="focus-ring -my-1 w-fit rounded py-1 transition-colors duration-300 hover:text-white sm:my-0 sm:py-0"
                  >
                    {BRAND.phone}
                  </a>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="focus-ring -my-1 w-fit rounded py-1 break-all transition-colors duration-300 hover:text-white sm:my-0 sm:py-0"
                  >
                    {BRAND.email}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
