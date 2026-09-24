import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * The Triya lockup, traced from the brand PNG into two SVGs that share one
 * viewBox. Drawn at the same size in the same spot, they stack back into the
 * full logo — split so each half can sit in a different blend layer:
 *
 *  - the wordmark is white, so inside a difference-blended bar it reads black
 *    on cream and white over photography;
 *  - the gold mark has to stay out of that blend, which would turn it into a
 *    blue on cream.
 */
const SIZE = { width: 162, height: 40, unoptimized: true, loading: "eager" } as const;
const HEIGHT = "h-9 w-auto sm:h-10";

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/triya-wordmark.svg"
      alt="Triya Group of Hospitality"
      {...SIZE}
      className={cn(HEIGHT, className)}
    />
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/triya-mark.svg"
      alt=""
      {...SIZE}
      className={cn(HEIGHT, className)}
    />
  );
}

/** Both halves in one element, for grounds that are always dark. */
export default function Logo() {
  return (
    <span className="relative block">
      <LogoWordmark />
      <LogoMark className="absolute inset-0" />
    </span>
  );
}
