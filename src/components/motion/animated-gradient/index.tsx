import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientProps {
  colors?: string[];
  /** Cycle duration in seconds. */
  speed?: number;
  /** Background-position pan distance. Higher = wider sweep. */
  range?: number;
  /** When true, treats children as the foreground; otherwise fills the box. */
  className?: string;
  children?: React.ReactNode;
}

/**
 * A continuously-panning gradient background. Respects
 * prefers-reduced-motion.
 */
export function AnimatedGradient({
  colors = ["#7c3aed", "#ec4899", "#f59e0b", "#06b6d4", "#7c3aed"],
  speed = 12,
  range = 200,
  className,
  children,
}: AnimatedGradientProps) {
  const gradient = `linear-gradient(120deg, ${colors.join(", ")})`;
  return (
    <div
      className={cn("relative isolate", className)}
      style={
        {
          background: gradient,
          backgroundSize: `${range}% ${range}%`,
          animation: `jsn-gradient-pan ${speed}s ease-in-out infinite alternate`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}