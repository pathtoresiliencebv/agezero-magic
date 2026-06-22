"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BarDatum {
  label: string;
  value: number;
  /** Optional override color. */
  color?: string;
}

export interface BarProps {
  data: BarDatum[];
  height?: number;
  /** Bar color. */
  color?: string;
  /** Show value labels on top of each bar. */
  showValue?: boolean;
  className?: string;
}

const PALETTE = [
  "var(--primary)",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

/**
 * Vertical bar chart. Pure SVG, themed via tokens, legend below.
 */
export const Bar = React.forwardRef<SVGSVGElement, BarProps>(
  function Bar(
    { data, height = 220, color, showValue = true, className },
    ref
  ) {
    if (data.length === 0) {
      return (
        <div
          className={cn(
            "flex w-full items-center justify-center text-xs text-muted-foreground",
            className
          )}
          style={{ height }}
        >
          No data
        </div>
      );
    }

    const max = Math.max(...data.map((d) => d.value)) || 1;
    const labelSpace = 24;
    const topPad = showValue ? 18 : 6;
    const w = 480;
    const innerH = 200 - topPad - labelSpace;
    const slot = w / data.length;
    const barW = Math.min(40, slot * 0.6);

    return (
      <div className={cn("w-full", className)}>
        <svg
          ref={ref}
          viewBox={`0 0 ${w} 200`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height={height}
          role="img"
        >
          {data.map((d, i) => {
            const h = (d.value / max) * innerH;
            const x = i * slot + (slot - barW) / 2;
            const y = topPad + (innerH - h);
            const c = d.color ?? color ?? PALETTE[i % PALETTE.length];
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  rx={3}
                  fill={c}
                  opacity={0.85}
                />
                {showValue && (
                  <text
                    x={x + barW / 2}
                    y={y - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--muted-foreground)"
                  >
                    {d.value.toLocaleString()}
                  </text>
                )}
                <text
                  x={x + barW / 2}
                  y={200 - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--muted-foreground)"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
);