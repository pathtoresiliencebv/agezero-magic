"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CountUpProps {
  /** Number to count up to. */
  value: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Optional delay before starting. */
  delay?: number;
  /** Number of decimal places to show. */
  decimals?: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "%", "K", "M"). */
  suffix?: string;
  /** Trigger on mount (default) or on scroll into view. */
  trigger?: "mount" | "scroll";
  className?: string;
}

/**
 * CountUp — animates from 0 to `value` with optional easing.
 * Pure rAF, no animation library required.
 */
export function CountUp({
  value,
  duration = 1500,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  trigger = "mount",
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = () => {
      const t0 = performance.now() + delay;
      let frame = 0;
      const tick = (now: number) => {
        const elapsed = now - t0;
        if (elapsed < 0) {
          frame = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, elapsed / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    if (trigger === "mount") {
      return start();
    }

    // scroll trigger — wait until visible
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      return start();
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, delay, trigger]);

  const formatted = display.toFixed(decimals);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}