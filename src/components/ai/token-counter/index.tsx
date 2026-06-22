"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TokenCounterProps {
  /** Current token count. */
  value: number;
  /** Maximum token allowance (shows a progress bar). */
  max?: number;
  /** Label shown next to the value. */
  label?: string;
  /** Show an icon next to the value. */
  showIcon?: boolean;
  className?: string;
}

/**
 * Live token usage display. Designed to be wired into AI chat UIs —
 * shows current tokens, the limit, and a progress bar if `max` is set.
 */
export const TokenCounter = React.forwardRef<HTMLDivElement, TokenCounterProps>(
  function TokenCounter(
    { value, max, label = "tokens", showIcon = true, className },
    ref
  ) {
    const pct = max ? Math.min(100, (value / max) * 100) : 0;
    const overLimit = max ? value > max : false;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs",
          className
        )}
      >
        {showIcon && (
          <svg
            aria-hidden
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M3 7h18" />
            <path d="M3 12h12" />
            <path d="M3 17h6" />
          </svg>
        )}
        <span className="font-mono tabular-nums text-foreground">
          {value.toLocaleString()}
        </span>
        {max !== undefined && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono tabular-nums text-muted-foreground">
              {max.toLocaleString()}
            </span>
          </>
        )}
        <span className="text-muted-foreground">{label}</span>
        {max !== undefined && (
          <span
            aria-hidden
            className="ml-1 h-1 w-12 overflow-hidden rounded-full bg-muted"
          >
            <span
              className={cn(
                "block h-full transition-all",
                overLimit ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${pct}%` }}
            />
          </span>
        )}
      </div>
    );
  }
);