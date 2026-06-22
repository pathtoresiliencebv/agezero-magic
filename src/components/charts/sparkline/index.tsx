"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[];
  /** Overall svg height. The line scales to the available width. */
  height?: number;
  /** Line color (default = --primary). */
  color?: string;
  /** Fill the area under the line. */
  fill?: boolean;
  /** Width of the line stroke. */
  strokeWidth?: number;
  /** Round corners of the fill area. */
  smooth?: boolean;
  className?: string;
}

/**
 * Lightweight line chart. Renders an SVG that auto-scales to the
 * parent width via viewBox.
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  function Sparkline(
    {
      data,
      height = 64,
      color = "var(--primary)",
      fill = true,
      strokeWidth = 2,
      smooth = true,
      className,
    },
    ref
  ) {
    if (data.length === 0) {
      return (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center text-xs text-muted-foreground",
            className
          )}
          style={{ height }}
        >
          No data
        </div>
      );
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 200; // virtual width; scales via viewBox
    const stepX = w / Math.max(1, data.length - 1);

    const points: Array<[number, number]> = data.map((v, i) => {
      const x = i * stepX;
      const y = 100 - ((v - min) / range) * 100;
      return [x, y];
    });

    const path = (() => {
      if (points.length === 0) return "";
      if (points.length === 1) {
        const p = points[0]!;
        return `M ${p[0]} ${p[1]}`;
      }
      if (!smooth) {
        return points
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
          .join(" ");
      }
      const first = points[0]!;
      let d = `M ${first[0]} ${first[1]}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)]!;
        const p1 = points[i]!;
        const p2 = points[i + 1]!;
        const p3 = points[Math.min(points.length - 1, i + 2)]!;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      return d;
    })();

    const last = points[points.length - 1]!;
    const head = points[0]!;
    const fillPath = `${path} L ${last[0]} 100 L ${head[0]} 100 Z`;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${w} 100`}
        preserveAspectRatio="none"
        width="100%"
        height={height}
        className={cn("overflow-visible", className)}
        aria-hidden
      >
        {fill && (
          <path d={fillPath} fill={color} opacity="0.12" />
        )}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
);