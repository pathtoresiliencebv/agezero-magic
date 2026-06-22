import * as React from "react";
import { cn } from "@/lib/utils";

export interface NoiseProps {
  /** 0..1 */
  opacity?: number;
  className?: string;
}

/**
 * SVG turbulence noise overlay. Adds film grain to a background.
 */
export function Noise({ opacity = 0.06, className }: NoiseProps) {
  const id = React.useId();
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-0", className)}
      style={{ opacity }}
    >
      <svg width="100%" height="100%">
        <filter id={`noise-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${id})`} />
      </svg>
    </div>
  );
}