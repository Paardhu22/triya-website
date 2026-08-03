import Image from "next/image";

import { heroProperties } from "@/data/properties";
import { SHUFFLE_PRESET } from "@/lib/shuffle";
import Shuffle from "./ui/Shuffle";

/**
 * Per-frame layout for the strip. Every frame sits on the same baseline and
 * grows upward, so `height` alone creates the stagger — alternating tall and
 * short down the row. Heights are in vh so the whole hero keeps fitting the
 * viewport without scrolling. Order matches `heroProperties`.
 */
const frames = [
  { width: "15%", height: "36vh" },
  { width: "17%", height: "32vh" },
  { width: "13%", height: "43vh" },
  { width: "14%", height: "31vh" },
  { width: "18%", height: "38vh" },
  { width: "19%", height: "34vh" },
];

export default function Hero() {
  // Every vertical measure is capped against vh as well as vw, so a short
  // window shrinks the hero to fit instead of pushing the statement below the
  // fold.
  return (
    <section className="flex min-h-[calc(100dvh-72px)] flex-1 flex-col justify-between overflow-hidden pt-[clamp(4.5rem,13vh,10rem)] pb-[5vh]">
      {/* `animate-rise` is gone — the shuffle is the entrance now, and running
          both would translate the strips mid-measure. */}
      <Shuffle
        {...SHUFFLE_PRESET}
        tag="h1"
        text="Triya Group"
        textAlign="left"
        className="px-5 text-[clamp(2.75rem,min(10.5vw,16vh),11rem)] leading-[0.82] font-medium tracking-[-0.045em] sm:px-8"
      />

      {/* Property strip — `items-end` is what puts every frame on one baseline. */}
      <div className="mt-[5vh]">
        <div className="flex w-full items-end gap-1.5 overflow-x-auto px-5 pb-2 sm:px-8 md:overflow-x-visible md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {heroProperties.map((property, i) => {
            const frame = frames[i];
            return (
              <figure
                key={property.slug}
                className="animate-unveil group relative h-[var(--h)] w-[62vw] shrink-0 md:w-[var(--w)] md:shrink md:grow"
                style={
                  {
                    "--w": frame.width,
                    "--h": frame.height,
                    animationDelay: `${180 + i * 90}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="relative h-full w-full overflow-hidden bg-line">
                  <Image
                    src={property.image}
                    alt={`${property.name}, ${property.location}`}
                    fill
                    sizes="(max-width: 768px) 62vw, 20vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    priority={i < 3}
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>

    </section>
  );
}
