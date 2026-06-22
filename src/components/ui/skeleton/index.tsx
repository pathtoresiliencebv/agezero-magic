import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width as a Tailwind class or a CSS value. */
  width?: string;
  /** Height as a Tailwind class or a CSS value. */
  height?: string;
  /** Round the skeleton (circle). */
  rounded?: boolean;
}

/**
 * Loading placeholder. Renders a soft pulse.
 */
export function Skeleton({
  className,
  width,
  height,
  rounded,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-busy
      aria-live="polite"
      className={cn(
        "animate-pulse bg-muted",
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}