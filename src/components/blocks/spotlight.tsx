"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Spotlight — a card that follows the mouse with a soft radial highlight.
 * Pure pointer tracking via React state, no external animation library.
 */
export function Spotlight({ children, className }: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -200, y: -200 });

  const onMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60 bg-card",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, hsl(var(--primary) / 0.08), transparent 50%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}