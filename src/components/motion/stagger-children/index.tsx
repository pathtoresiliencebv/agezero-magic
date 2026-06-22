"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StaggerChildrenProps {
  children: React.ReactNode;
  /** Delay between each child (ms). */
  step?: number;
  /** Initial delay (ms). */
  initialDelay?: number;
  /** Animation duration (ms). */
  duration?: number;
  className?: string;
  /** "up" | "down" | "fade" entry style. */
  from?: "up" | "down" | "fade";
  once?: boolean;
}

/**
 * Wrap a list of children to stagger their entrance. Uses
 * IntersectionObserver to trigger when the group enters the viewport.
 */
export function StaggerChildren({
  children,
  step = 80,
  initialDelay = 0,
  duration = 500,
  className,
  from = "up",
  once = true,
}: StaggerChildrenProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) setEnabled(false);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, once]);

  const items = React.Children.toArray(children);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => {
        const offset =
          from === "up" ? "translate3d(0, 16px, 0)" :
          from === "down" ? "translate3d(0, -16px, 0)" :
          "translate3d(0, 0, 0)";
        return (
          <div
            key={i}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translate3d(0,0,0)" : offset,
              transition: `opacity ${duration}ms ease ${initialDelay + i * step}ms, transform ${duration}ms ease ${initialDelay + i * step}ms`,
              willChange: "opacity, transform",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}