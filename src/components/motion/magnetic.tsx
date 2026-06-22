"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: React.ReactNode;
  /** Pull strength (0-1). Default 0.4. */
  strength?: number;
  /** Transition speed in ms. Default 400. */
  speed?: number;
  className?: string;
}

/**
 * Magnetic — pulls its content toward the pointer, like a magnet.
 * Use for buttons or CTAs to add a tactile, premium feel.
 */
export function Magnetic({
  children,
  strength = 0.4,
  speed = 400,
  className,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const onMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength]
  );

  const onLeave = React.useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-block", className)}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: `transform ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  );
}