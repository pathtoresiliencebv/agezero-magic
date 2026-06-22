"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwipeableProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  /** Minimum distance in px to count as a swipe (default 60). */
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Detects swipe gestures via pointer events. Children render normally;
 * the wrapper just adds event listeners. SSR-safe (no-op without DOM).
 */
export function Swipeable({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 60,
  children,
  className,
}: SwipeableProps) {
  const start = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      className={cn("touch-pan-y", className)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) start.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const t = e.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - s.x;
        const dy = t.clientY - s.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > threshold) onSwipeRight?.();
          else if (dx < -threshold) onSwipeLeft?.();
        } else {
          if (dy > threshold) onSwipeDown?.();
          else if (dy < -threshold) onSwipeUp?.();
        }
      }}
    >
      {children}
    </div>
  );
}
