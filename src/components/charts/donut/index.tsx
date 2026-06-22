"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DonutSlice {
  label: string;
  value: number;
  color?: string;
}

export interface DonutProps {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  /** Center label. If omitted, shows the total. */
  centerLabel?: React.ReactNode;
  className?: string;
}

const PALETTE = [
  "var(--primary)",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
];

/**
 * Donut chart with optional center label. Pure SVG, no animation lib.
 */
export const Donut = React.forwardRef<SVGSVGElement, DonutProps>(
  function Donut(
    { data, size = 200, thickness = 28, centerLabel, className },
    ref
  ) {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const r = size / 2 - thickness / 2;
    const c = 2 * Math.PI * r;
    let offset = 0;

    const defaultCenter = (
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight="600"
        fill="var(--foreground)"
      >
        {total.toLocaleString()}
      </text>
    );

    return (
      <div
        className={cn("inline-flex flex-col items-center gap-3", className)}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Donut chart"
        >
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {data.map((d, i) => {
              const dash = (d.value / total) * c;
              const segment = (
                <circle
                  key={d.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="transparent"
                  stroke={d.color ?? PALETTE[i % PALETTE.length]}
                  strokeWidth={thickness}
                  strokeDasharray={`${dash} ${c - dash}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += dash;
              return segment;
            })}
          </g>
          {centerLabel ?? defaultCenter}
        </svg>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block size-2 rounded-full"
                style={{ background: d.color ?? PALETTE[i % PALETTE.length] }}
              />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-mono tabular-nums text-foreground">
                {d.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);