"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PulseProps {
  children: React.ReactNode;
  /** Pulse color (Tailwind class). Default: bg-primary. */
  color?: string;
  /** Pulse intensity (0-1). Default 0.4. */
  intensity?: number;
  /** Pulse speed in ms. Default 2000. */
  duration?: number;
  className?: string;
}

/**
 * Pulse — adds a glowing radial pulse behind its children. Useful for
 * highlighting CTAs or active states without animating the children themselves.
 */
export function Pulse({
  children,
  color = "bg-primary",
  intensity = 0.4,
  duration = 2000,
  className,
}: PulseProps) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] animate-pulse-ring",
          color
        )}
        style={
          {
            opacity: intensity,
            "--jsn-pulse-duration": `${duration}ms`,
          } as React.CSSProperties
        }
      />
      <div className="relative">{children}</div>
    </div>
  );
}