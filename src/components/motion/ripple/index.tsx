"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RippleProps {
  /** Whether to add a click ripple. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Ripple color. */
  color?: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
  children: React.ReactElement;
}

/**
 * Wraps a clickable element to add a Material-style ripple on click.
 * The original element's className is preserved.
 */
export function Ripple({
  onClick,
  color = "currentColor",
  duration = 600,
  className,
  children,
}: RippleProps) {
  const [ripples, setRipples] = React.useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const idRef = React.useRef(0);

  const handle = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples((r) => [
      ...r,
      {
        id: ++idRef.current,
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      },
    ]);
    setTimeout(() => {
      setRipples((r) => r.slice(1));
    }, duration);
    onClick?.(e);
  };

  // React.cloneElement preserves the original onClick but is restricted
  // to the trigger element type.
  return (
    <span
      className={cn("relative inline-block overflow-hidden", className)}
      onMouseDown={handle}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="az-ripple"
          style={
            {
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              background: color,
              ["--ripple-duration" as string]: `${duration}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}