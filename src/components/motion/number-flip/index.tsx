"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberFlipProps {
  value: number;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
}

/**
 * Animates a number from its previous value to the new one. Internally
 * keeps a live counter that ticks toward the target.
 */
export function NumberFlip({ value, duration = 600, className }: NumberFlipProps) {
  const [display, setDisplay] = React.useState(value);
  const fromRef = React.useRef(value);
  const startRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) {
      setDisplay(value);
      return;
    }
    fromRef.current = display;
    startRef.current = performance.now();
    const tick = (t: number) => {
      const start = startRef.current ?? t;
      const elapsed = t - start;
      const k = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      const next = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(next);
      if (k < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      {Math.round(display).toLocaleString()}
    </span>
  );
}