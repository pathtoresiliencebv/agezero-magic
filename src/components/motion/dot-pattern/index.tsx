import * as React from "react";
import { cn } from "@/lib/utils";

export interface DotPatternProps {
  size?: number;
  dotSize?: number;
  color?: string;
  className?: string;
  mask?: "center" | "edges" | "none";
}

/**
 * Repeating dot field, like graph paper. Mask fades the dots out
 * at the edges for a softer background look.
 */
export function DotPattern({
  size = 22,
  dotSize = 1.2,
  color = "currentColor",
  mask = "edges",
  className,
}: DotPatternProps) {
  const id = React.useId();
  const maskStyle: React.CSSProperties =
    mask === "none"
      ? {}
      : mask === "center"
        ? {
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }
        : {
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          };
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-0", className)}
      style={{ ...maskStyle, color }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id={`dots-${id}`}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={dotSize}
              fill="currentColor"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
      </svg>
    </div>
  );
}