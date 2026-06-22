"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Animation delay in milliseconds. */
  delay?: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Direction of the slide-in. */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to translate (in rem). */
  distance?: number;
  /** How much of the element must be visible to trigger (0-1). */
  threshold?: number;
  /** Re-trigger every time the element enters the viewport. */
  repeat?: boolean;
  className?: string;
}

/**
 * ScrollReveal — fades + slides children in when they scroll into view.
 * Uses IntersectionObserver under the hood; gracefully falls back to
 * always-visible for browsers that lack it.
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 700,
  direction = "up",
  distance = 1.5,
  threshold = 0.15,
  repeat = false,
  className,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for environments without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.disconnect();
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  const initial =
    direction === "up"
      ? `translateY(${distance}rem)`
      : direction === "down"
        ? `translateY(-${distance}rem)`
        : direction === "left"
          ? `translateX(${distance}rem)`
          : direction === "right"
            ? `translateX(-${distance}rem)`
            : "none";

  return (
    <div
      ref={ref}
      className={cn(
        "jsn-scroll-reveal transition-all ease-out",
        visible ? "jsn-scroll-reveal-visible" : "",
        className
      )}
      style={
        {
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : initial,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}