"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Tilt3DProps {
  children: React.ReactNode;
  /** Maximum rotation in degrees. Default 12. */
  max?: number;
  /** Perspective in px. Default 1000. */
  perspective?: number;
  /** Scale on hover. Default 1.02. */
  scale?: number;
  /** Transition speed in ms. Default 400. */
  speed?: number;
  className?: string;
}

/**
 * Tilt3D — tilts its content in 3D on hover, following the pointer.
 * Pure CSS transforms, no library.
 */
export function Tilt3D({
  children,
  max = 12,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  className,
}: Tilt3DProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("");

  const onMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(
        `perspective(${perspective}px) rotateX(${-y * max * 2}deg) rotateY(${x * max * 2}deg) scale(${scale})`
      );
    },
    [max, perspective, scale]
  );

  const onLeave = React.useCallback(() => setTransform(""), []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("jsn-tilt", className)}
      style={
        {
          transform,
          transition: `transform ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
          transformStyle: "preserve-3d",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}