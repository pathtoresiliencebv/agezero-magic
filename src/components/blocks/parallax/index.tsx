"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ParallaxProps {
  /** Negative moves with scroll (backgrounds), positive moves against (floating foreground). */
  speed?: number;
  /** Pixel cap on the total offset. */
  maxOffset?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle scroll-driven parallax. Wrap any element to give it a
 * smooth, eased parallax effect as the user scrolls.
 */
export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  function Parallax(
    { speed = 0.2, maxOffset = 100, children, className },
    ref
  ) {
    const [offset, setOffset] = React.useState(0);
    const inner = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const onScroll = () => {
        const node = inner.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const viewport = window.innerHeight;
        // Distance from element center to viewport center, in vh units.
        const delta = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const raw = delta * speed * 100;
        setOffset(Math.max(-maxOffset, Math.min(maxOffset, raw)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, [speed, maxOffset]);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <div
          ref={inner}
          style={{
            transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
            willChange: "transform",
            transition: "transform 80ms linear",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);