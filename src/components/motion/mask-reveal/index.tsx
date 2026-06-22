"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MaskRevealProps {
  children: React.ReactNode;
  /** Delay (ms) before starting. */
  delay?: number;
  /** Animation duration (ms). */
  duration?: number;
  /** Animation direction. */
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  /** Re-trigger every time the element enters the viewport. */
  once?: boolean;
}

/**
 * Reveal children with a sweeping clip-path mask. Triggers on first
 * intersection.
 */
export function MaskReveal({
  children,
  delay = 0,
  duration = 800,
  direction = "up",
  className,
  once = true,
}: MaskRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) setEnabled(false);
  }, []);

  React.useEffect(() => {
    if (!enabled || shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, enabled, once]);

  const clipTo: Record<NonNullable<MaskRevealProps["direction"]>, string> = {
    up: "inset(0 0 0% 0)",
    down: "inset(0 0 0% 0)",
    left: "inset(0 0 0 0)",
    right: "inset(0 0 0 0)",
  };
  const clipFrom: Record<NonNullable<MaskRevealProps["direction"]>, string> = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        clipPath: shown ? clipTo[direction] : clipFrom[direction],
        transition: `clip-path ${duration}ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}