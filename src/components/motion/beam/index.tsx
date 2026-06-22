"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BeamProps {
  /** Direction of motion. */
  from?: "top" | "left" | "right" | "bottom";
  /** Duration of one sweep in seconds. */
  duration?: number;
  /** Delay between sweeps in seconds. */
  delay?: number;
  /** Beam color. */
  color?: string;
  /** Beam thickness in px. */
  thickness?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Border beam — a thin highlight that sweeps around the perimeter of
 * the element. Pure CSS keyframes.
 */
export function Beam({
  from = "top",
  duration = 3,
  delay = 1,
  color = "rgba(255,255,255,0.6)",
  thickness = 1,
  className,
  children,
}: BeamProps) {
  return (
    <div
      className={cn("relative isolate", className)}
      style={
        {
          ["--beam-color" as string]: color,
          ["--beam-thickness" as string]: `${thickness}px`,
          ["--beam-duration" as string]: `${duration}s`,
          ["--beam-delay" as string]: `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
      <span
        aria-hidden
        className="az-beam-runner"
        data-from={from}
      />
    </div>
  );
}