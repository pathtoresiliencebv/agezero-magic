import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridPatternProps {
  /** Cell size in px. */
  size?: number;
  /** Line color (CSS). */
  color?: string;
  /** Mask direction: fade from center, top, bottom, or full. */
  mask?: "center" | "top" | "bottom" | "edges" | "none";
  className?: string;
}

/**
 * SVG grid pattern used as a subtle page or section background.
 * Mask uses a radial or linear gradient to fade the lines out.
 */
export function GridPattern({
  size = 32,
  color = "currentColor",
  mask = "edges",
  className,
}: GridPatternProps) {
  const id = React.useId();
  const maskStyle: React.CSSProperties =
    mask === "none"
      ? {}
      : mask === "center"
        ? {
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }
        : mask === "top"
          ? {
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%)",
            }
          : mask === "bottom"
            ? {
                WebkitMaskImage:
                  "linear-gradient(to top, transparent 0%, black 30%)",
                maskImage:
                  "linear-gradient(to top, transparent 0%, black 30%)",
              }
            : {
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 75%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 75%)",
              };

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-0", className)}
      style={{
        ...maskStyle,
        color: "var(--grid-color, currentColor)",
        ["--grid-color" as string]: color,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`grid-${id}`}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.18"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      </svg>
    </div>
  );
}