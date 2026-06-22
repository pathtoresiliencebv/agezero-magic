"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ConfettiProps {
  /** Whether to fire. The component watches for transitions true→false. */
  fire: boolean;
  /** Number of particles. */
  count?: number;
  /** Origin of the burst — viewport coordinates. */
  origin?: { x: number; y: number };
  /** ms after which particles are removed. */
  duration?: number;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  color: string;
  size: number;
  shape: "rect" | "circle" | "tri";
}

const SHAPES = ["rect", "circle", "tri"] as const;

const COLORS = [
  "var(--primary)",
  "var(--accent-foreground)",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ec4899",
];

/**
 * Triggers a one-shot confetti burst from `origin` (or viewport center)
 * whenever `fire` flips from false to true.
 */
export const Confetti = React.forwardRef<HTMLDivElement, ConfettiProps>(
  function Confetti(
    { fire, count = 60, origin, duration = 1400, className },
    ref
  ) {
    const [particles, setParticles] = React.useState<Particle[]>([]);
    const reduceMotion = React.useRef(false);
    const lastFire = React.useRef(false);

    React.useEffect(() => {
      if (typeof window === "undefined") return;
      reduceMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }, []);

    React.useEffect(() => {
      if (!fire || lastFire.current) return;
      lastFire.current = true;
      if (reduceMotion.current) return;

      const w = typeof window !== "undefined" ? window.innerWidth : 800;
      const h = typeof window !== "undefined" ? window.innerHeight : 600;
      const o = origin ?? { x: w / 2, y: h / 2 };

      const next: Particle[] = Array.from({ length: count }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const speed = 8 + Math.random() * 10;
        const shape = SHAPES[i % SHAPES.length] ?? "rect";
        const color = COLORS[i % COLORS.length] ?? COLORS[0]!;
        return {
          id: Date.now() + i,
          x: o.x,
          y: o.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 12,
          color,
          size: 6 + Math.random() * 6,
          shape,
        };
      });
      setParticles(next);

      const t = setTimeout(() => setParticles([]), duration);
      return () => clearTimeout(t);
    }, [fire, count, origin, duration]);

    React.useEffect(() => {
      if (particles.length === 0) return;
      let raf = 0;
      const tick = () => {
        setParticles((p) =>
          p
            .map((pt) => ({
              ...pt,
              x: pt.x + pt.vx,
              y: pt.y + pt.vy,
              vy: pt.vy + 0.4, // gravity
              rot: pt.rot + pt.vrot,
            }))
            .filter((pt) => pt.y < (typeof window !== "undefined" ? window.innerHeight : 9999) + 40)
        );
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [particles.length]);

    // Reset lastFire when fire goes false
    React.useEffect(() => {
      if (!fire) lastFire.current = false;
    }, [fire]);

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none fixed inset-0 z-[100]", className)}
      >
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size * 0.5,
              background: p.color,
              transform: `rotate(${p.rot}deg)`,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "tri" ? 0 : 1,
              clipPath:
                p.shape === "tri"
                  ? "polygon(50% 0, 100% 100%, 0 100%)"
                  : undefined,
            }}
          />
        ))}
      </div>
    );
  }
);