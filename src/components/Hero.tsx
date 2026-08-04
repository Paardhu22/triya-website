import Image from "next/image";

import { heroProperties } from "@/data/properties";
import { SHUFFLE_PRESET } from "@/lib/shuffle";
import Shuffle from "./ui/Shuffle";

/**
 * Per-frame layout for the strip. Every frame sits on the same baseline and
 * grows upward, so `height` alone creates the stagger — alternating tall and
 * short down the row. Order matches `heroProperties`.
 *
 * Heights are `svh` — the *smallest* viewport height, i.e. the one with the
 * mobile URL bar showing. Both of the obvious alternatives are wrong here:
 *
 *   - `vh` resolves against the largest viewport, the one with the bar hidden,
 *     so a 43vh frame is taller than 43% of what you can actually see and the
 *     strip pushes out of the hero on first paint;
 *   - `dvh` tracks the viewport as it changes, which sounds better but means
 *     every one of these frames — and the hero's padding, and the wordmark's
 *     own font size — is relaid out continuously while the bar collapses under
 *     a scroll. That is a scroll-time layout thrash, and it re-triggers the
 *     re-measure in `Shuffle` on top of it.
 *
 * `svh` is constant, so nothing moves while scrolling, and because it is the
 * smallest of the three, sizing against it always fits.
 */
const frames = [
  { width: "15%", height: "36svh" },
  { width: "17%", height: "32svh" },
  { width: "13%", height: "43svh" },
  { width: "14%", height: "31svh" },
  { width: "18%", height: "38svh" },
  { width: "19%", height: "34svh" },
];

/**
 * One full pass of the six frames.
 *
 * Rendered twice on phones to feed the marquee (see `.hero-marquee-track` in
 * globals.css); the second pass is `duplicate`, which makes it decorative —
 * hidden from assistive tech so the portfolio is not announced twice — and
 * drops it entirely from `md` up, where the row is static and one pass fills
 * the width on its own.
 *
 * `pr-1.5` matches the inter-frame gap so each set's width includes its own
 * trailing gap. That is what makes the track's -50% wrap seamless.
 */
function StripSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-end gap-1.5 pr-1.5 md:w-full md:pr-0 ${
        duplicate ? "hero-marquee-dupe md:hidden" : ""
      }`}
    >
      {heroProperties.map((property, i) => {
        const frame = frames[i];
        return (
          <figure
            key={property.slug}
            className="animate-unveil group relative h-[max(8rem,var(--h))] w-[min(52vw,15rem)] shrink-0 md:w-[var(--w)] md:shrink md:grow"
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
                alt={duplicate ? "" : `${property.name}, ${property.location}`}
                fill
                sizes="(max-width: 768px) 52vw, 20vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                /* Only the first pass preloads — the duplicate points at the
                   same URLs, so a second set of hints would just be noise. */
                priority={!duplicate && i < 3}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}

export default function Hero() {
  // Every vertical measure is capped against svh as well as vw, so a short
  // window shrinks the hero to fit instead of pushing the statement below the
  // fold. The paddings use `max()` against a rem floor so the rhythm survives
  // a landscape phone, where a bare percentage would collapse to nothing.
  return (
    <section className="flex min-h-[calc(100svh-var(--nav-h))] flex-1 flex-col justify-between overflow-hidden pt-[clamp(2.5rem,13svh,10rem)] pb-[max(1.25rem,5svh)]">
      {/* `animate-rise` is gone — the shuffle is the entrance now, and running
          both would translate the strips mid-measure.

          The type is capped against `svh` as well as `vw` so a short landscape
          window shrinks the wordmark instead of letting it eat the strip — and
          `svh` specifically, because a font size on a `dvh` cap would resize
          mid-scroll on every phone. */}
      <Shuffle
        {...SHUFFLE_PRESET}
        tag="h1"
        text="Triya Group"
        textAlign="left"
        className="shell-gutter text-[clamp(2.5rem,min(10.5vw,16svh),11rem)] leading-[0.82] font-medium tracking-[-0.045em]"
      />

      {/* Property strip — `items-end` is what puts every frame on one baseline.
          On phones the track drifts right-to-left under its own power and runs
          full-bleed off both edges; from `md` up it is the static row it always
          was, one pass wide.

          Deliberately no `data-lenis-prevent` here. This element covers most of
          the lower hero, and that attribute makes Lenis ignore wheel events
          over it — they fall through to native scroll while Lenis keeps
          animating its own target, and the two fight until the page stutters
          and swallows scroll distance. Nothing here needs it: the only state in
          which this element scrolls is the reduced-motion fallback, and
          SmoothScrollProvider never constructs Lenis at all in that case. */}
      <div className="mt-[max(1.5rem,5svh)]">
        <div className="hero-marquee no-scrollbar overflow-hidden md:overflow-visible">
          <div className="hero-marquee-track flex w-max items-end md:w-full">
            <StripSet />
            <StripSet duplicate />
          </div>
        </div>
      </div>

    </section>
  );
}
