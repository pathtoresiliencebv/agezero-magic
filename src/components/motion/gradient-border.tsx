"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientBorderProps {
  children: React.ReactNode;
  /** Tailwind gradient classes. Default: from-primary via-purple-500 to-pink-500. */
  gradient?: string;
  /** Border thickness in px. Default 2. */
  thickness?: number;
  /** Corner radius in px. Default 12. */
  radius?: number;
  /** Animation speed in seconds. Default 4. */
  duration?: number;
  /** Pause animation when not hovered. */
  pauseOnIdle?: boolean;
  className?: string;
}

/**
 * GradientBorder — wraps children in a 2-px animated gradient ring.
 * Uses a conic-gradient with a rotating mask to create the sweep effect.
 */
export function GradientBorder({
  children,
  gradient = "from-primary via-purple-500 to-pink-500",
  thickness = 2,
  radius = 12,
  duration = 4,
  pauseOnIdle = false,
  className,
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        pauseOnIdle && "group jsn-gradient-pause-on-idle",
        className
      )}
      style={
        {
          padding: thickness,
          borderRadius: radius,
          background: `linear-gradient(90deg, var(--tw-gradient-stops))`,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-[inherit] bg-gradient-to-r",
          gradient,
          "az-gradient-border-sweep"
        )}
        style={{ "--jsn-gradient-duration": `${duration}s` } as React.CSSProperties}
      />
      <div
        className="relative h-full w-full rounded-[inherit] bg-background"
        style={{ borderRadius: radius - thickness }}
      >
        {children}
      </div>
    </div>
  );
}