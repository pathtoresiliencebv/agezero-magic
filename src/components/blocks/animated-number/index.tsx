"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedNumberProps {
  /** Target value. */
  value: number;
  /** Locale for toLocaleString formatting. */
  locale?: string;
  /** Animation duration in ms. */
  duration?: number;
  /** Trigger animation only when the element scrolls into view. */
  triggerOnView?: boolean;
  /** Number of decimal places to display. */
  decimals?: number;
  className?: string;
}

/**
 * Easing-based number counter. Animates from the previous value to the
 * new one (great for stats that tick up after a fetch). Respects
 * `prefers-reduced-motion` by jumping to the final value.
 */
export const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  function AnimatedNumber(
    {
      value,
      locale = "en-US",
      duration = 800,
      triggerOnView = true,
      decimals = 0,
      className,
    },
    ref
  ) {
    const [display, setDisplay] = React.useState(triggerOnView ? 0 : value);
    const [started, setStarted] = React.useState(!triggerOnView);
    const ref0 = React.useRef<HTMLSpanElement | null>(null);
    const reduceMotion = React.useRef(false);
    const frame = React.useRef<number | undefined>(undefined);

    React.useEffect(() => {
      if (typeof window === "undefined") return;
      reduceMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }, []);

    React.useEffect(() => {
      if (triggerOnView && !started) {
        const node = ref0.current;
        if (!node) return;
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry?.isIntersecting) {
              setStarted(true);
              observer.disconnect();
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(node);
        return () => observer.disconnect();
      }
    }, [triggerOnView, started]);

    React.useEffect(() => {
      if (!started) return;
      if (reduceMotion.current) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const from = display;
      const to = value;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = from + (to - from) * eased;
        setDisplay(current);
        if (t < 1) {
          frame.current = requestAnimationFrame(step);
        } else {
          setDisplay(to);
        }
      };
      frame.current = requestAnimationFrame(step);
      return () => {
        if (frame.current) cancelAnimationFrame(frame.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, duration, started]);

    const fixed = display.toFixed(decimals);
    const [, decPart] = fixed.split(".");

    return (
      <span
        ref={(node) => {
          ref0.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }}
        className={cn("font-mono tabular-nums", className)}
      >
        {Math.trunc(display).toLocaleString(locale)}
        {decPart !== undefined && <>.{decPart}</>}
      </span>
    );
  }
);