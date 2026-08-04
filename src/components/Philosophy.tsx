"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { placeholder } from "@/lib/placeholder";
import { EASE } from "@/lib/motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Philosophy() {
  return (
    <section id="about" className="bg-surface py-[14vh]">
      <div className="section-shell">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <motion.div className="md:col-span-5 flex flex-col justify-center" {...fadeUp(0)}>
            <p className="text-[16px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
              Philosophy
            </p>

            <p className="mt-10 max-w-[40ch] text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.6] tracking-[-0.015em] text-balance">
              Every property is shaped through proportion, light, texture, and
              the way a day actually moves through a room. We believe a stay
              should feel effortless — spaces that hold up to ordinary use and
              still feel considered on the hundredth morning.
            </p>
          </motion.div>

          <motion.figure
            className="group relative md:col-span-6 md:col-start-7"
            {...fadeUp(0.18)}
          >
            <div className="relative h-[72vh] w-full overflow-hidden bg-line">
              <Image
                src={placeholder("triya-philosophy-tall", 900, 1200)}
                alt="Daylight across a residence interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </motion.figure>
        </div>

        {/* Offset below the copy, deliberately not aligned to the frame above. */}
        <div className="mt-[10vh] grid md:grid-cols-12 md:gap-x-8">
          <motion.figure
            className="group relative md:col-span-4"
            {...fadeUp(0)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
              <Image
                src={placeholder("triya-philosophy-wide", 800, 600)}
                alt="Stairwell detail in a Triya property"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </motion.figure>

          <motion.div
            className="md:col-span-6 md:col-start-7 flex flex-col justify-center"
            {...fadeUp(0.2)}
          >
            <p className="max-w-[38ch] text-[clamp(1.15rem,1.8vw,1.65rem)] leading-[1.55] tracking-[-0.015em] text-balance">
              Elegance exists in the space between necessity and indulgence. Our
              design ethos rejects the ephemeral in favor of the timeless,
              utilizing clean geometric lines, organic materials, and deliberate
              spatial flow to cultivate a poetic sense of belonging. We craft
              sanctuaries that elevate the ritual of the everyday.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
