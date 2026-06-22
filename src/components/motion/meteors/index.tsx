import * as React from "react";
import { cn } from "@/lib/utils";

export interface MeteorsProps {
  /** Number of meteors to render. */
  count?: number;
  className?: string;
}

/**
 * Renders N falling meteors. Each meteor is positioned randomly and
 * animates top → bottom with a small delay.
 */
export function Meteors({ count = 12, className }: MeteorsProps) {
  const items = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        length: 30 + Math.random() * 60,
      })),
    [count]
  );
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 overflow-hidden",
        className
      )}
    >
      {items.map((m, i) => (
        <span
          key={i}
          className="az-meteor"
          style={
            {
              left: `${m.left}%`,
              width: `${m.length}px`,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}