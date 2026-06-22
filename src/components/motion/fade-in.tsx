"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FadeInProps {
  children: React.ReactNode;
  /** Animation delay in milliseconds. */
  delay?: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Direction of the fade. */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** How far to translate (in rem). */
  distance?: number;
  /** Trigger once on mount (default) or every time the element re-mounts. */
  trigger?: "mount";
  className?: string;
}

/**
 * FadeIn — fades children in on mount with an optional directional slide.
 * Pure CSS animation, no IntersectionObserver required.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 600,
  direction = "up",
  distance = 1,
  className,
}: FadeInProps) {
  const translate =
    direction === "up"
      ? `translateY(${distance}rem)`
      : direction === "down"
        ? `translateY(-${distance}rem)`
        : direction === "left"
          ? `translateX(${distance}rem)`
          : direction === "right"
            ? `translateX(-${distance}rem)`
            : "none";

  return (
    <div
      className={cn("az-fade-in", className)}
      style={
        {
          "--jsn-fade-translate": translate,
          "--jsn-fade-delay": `${delay}ms`,
          "--jsn-fade-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}