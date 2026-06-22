import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerProps {
  className?: string;
  /** Disable the animation (useful for reduced-motion users). */
  disabled?: boolean;
}

/**
 * Shimmer — a content-loading skeleton with an animated gradient sweep.
 * Use by replacing the children of a loading card with this component,
 * sized to match the eventual content.
 */
export function Shimmer({ className, disabled }: ShimmerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        !disabled && "az-shimmer",
        className
      )}
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/**
 * ShimmerText — a few stacked shimmer lines approximating a paragraph.
 */
export function ShimmerText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-3", i === lines - 1 && "w-3/4")}
        />
      ))}
    </div>
  );
}