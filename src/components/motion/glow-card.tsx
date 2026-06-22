"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlowCardProps {
  children: React.ReactNode;
  /** Tailwind class for the glow color. Default: bg-primary. */
  color?: string;
  /** Glow intensity (0-1). Default 0.5. */
  intensity?: number;
  className?: string;
}

/**
 * GlowCard — a card that follows the cursor with a soft radial glow.
 * Use as a drop-in card variant; the glow tracks the pointer.
 */
export function GlowCard({
  children,
  color = "bg-primary",
  intensity = 0.5,
  className,
}: GlowCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -200, y: -200 });
  const [active, setActive] = React.useState(false);

  const onMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={onMove}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-colors",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          color
        )}
        style={{
          opacity: active ? intensity : 0,
          background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, currentColor, transparent 40%)`,
          mixBlendMode: "overlay",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}