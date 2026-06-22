import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuroraProps {
  /** Array of CSS color values used to paint the aurora. */
  colors?: string[];
  /** Animation speed in seconds for one cycle. */
  speed?: number;
  /** Vertical blur in px. Higher = softer. */
  blur?: number;
  /** Opacity 0..1. */
  intensity?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Aurora background — radial gradient blobs that slowly drift and
 * blend. Pure CSS, no library. Respects prefers-reduced-motion.
 */
export function Aurora({
  colors = ["#7c3aed", "#06b6d4", "#f43f5e", "#f59e0b"],
  speed = 18,
  blur = 100,
  intensity = 0.55,
  className,
  children,
}: AuroraProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={
          {
            ["--aurora-blur" as string]: `${blur}px`,
            ["--aurora-speed" as string]: `${speed}s`,
            ["--aurora-intensity" as string]: String(intensity),
          } as React.CSSProperties
        }
      >
        {colors.map((c, i) => (
          <span
            key={i}
            className="az-aurora-blob"
            style={{
              background: c,
              filter: `blur(var(--aurora-blur))`,
              opacity: "var(--aurora-intensity)",
              animationDuration: `var(--aurora-speed)`,
              animationDelay: `${(i * -3) / colors.length}s`,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}