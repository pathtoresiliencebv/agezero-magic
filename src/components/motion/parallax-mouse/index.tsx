"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ParallaxMouseProps {
  /** Strength in px. Higher = more movement. */
  strength?: number;
  /** Invert the direction. */
  invert?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wrap any content to make it track the cursor with a damped parallax
 * effect. Pure-rAF, respects prefers-reduced-motion.
 */
export function ParallaxMouse({
  strength = 16,
  invert = false,
  className,
  children,
}: ParallaxMouseProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) setEnabled(false);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const sign = invert ? -1 : 1;
      el.style.setProperty("--pm-x", `${dx * strength * sign}px`);
      el.style.setProperty("--pm-y", `${dy * strength * sign}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--pm-x", "0px");
      el.style.setProperty("--pm-y", "0px");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, invert, enabled]);

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
      style={{
        transform:
          "translate3d(var(--pm-x, 0px), var(--pm-y, 0px), 0)",
      }}
    >
      {children}
    </div>
  );
}