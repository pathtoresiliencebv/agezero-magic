import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
  children: React.ReactNode;
  /** Tailwind gradient classes. Default: "from-primary via-purple-500 to-pink-500". */
  gradient?: string;
  /** Animate the gradient across the text. */
  animate?: boolean;
  className?: string;
}

/**
 * GradientText — wraps children in a gradient background-clip text effect.
 * When `animate` is true, the gradient position is animated using a CSS
 * background-position keyframe.
 */
export function GradientText({
  children,
  gradient = "from-primary via-purple-500 to-pink-500",
  animate = false,
  className,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        animate && "bg-[length:200%_auto] animate-gradient-x",
        className
      )}
    >
      {children}
    </span>
  );
}