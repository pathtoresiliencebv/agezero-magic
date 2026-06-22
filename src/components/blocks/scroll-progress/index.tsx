"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps {
  /** Position of the bar on the page. */
  position?: "top" | "bottom";
  /** Bar color. */
  color?: string;
  /** Bar height in pixels. */
  thickness?: number;
  className?: string;
}

/**
 * A thin progress bar that fills as the user scrolls down the page.
 * Drop in once at the root of your app.
 */
export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  function ScrollProgress(
    { position = "top", color, thickness = 3, className },
    ref
  ) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, []);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className={cn(
          "pointer-events-none fixed inset-x-0 z-50 h-0.5 bg-transparent",
          position === "top" ? "top-0" : "bottom-0",
          className
        )}
        style={{ height: thickness }}
      >
        <div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: color ?? "var(--primary)",
            transition: "width 80ms linear",
          }}
        />
      </div>
    );
  }
);