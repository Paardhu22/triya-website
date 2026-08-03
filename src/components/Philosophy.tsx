import Image from "next/image";

import { placeholder } from "@/lib/placeholder";

/**
 * The band below the hero. Same vocabulary as the hero — flush-left text, a
 * strip of unevenly placed frames — but slowed down: one statement, two images,
 * a lot of empty surface between them.
 *
 * The tall frame sits to the right of the copy and runs past the bottom of the
 * text block; the wide one drops in below and to the left, so the eye travels
 * diagonally rather than down a column.
 */
export default function Philosophy() {
  return (
    <section id="about" className="bg-surface py-[14vh]">
      <div className="section-shell">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <p className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
              Philosophy
            </p>

            <p className="mt-8 max-w-[34ch] text-[clamp(1rem,1.35vw,1.35rem)] leading-[1.5] tracking-[-0.015em] text-balance">
              Every property is shaped through proportion, light, texture, and
              the way a day actually moves through a room. We believe a stay
              should feel effortless — spaces that hold up to ordinary use and
              still feel considered on the hundredth morning.
            </p>
          </div>

          <figure className="group relative md:col-span-6 md:col-start-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-line">
              <Image
                src={placeholder("triya-philosophy-tall", 900, 1125)}
                alt="Daylight across a residence interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </figure>
        </div>

        {/* Offset below the copy, deliberately not aligned to the frame above. */}
        <div className="mt-[10vh] grid md:grid-cols-12 md:gap-x-8">
          <figure className="group relative md:col-span-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
              <Image
                src={placeholder("triya-philosophy-wide", 800, 600)}
                alt="Stairwell detail in a Triya property"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
