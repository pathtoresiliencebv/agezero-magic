"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ModelOption {
  id: string;
  label: string;
  vendor: string;
  description?: string;
  contextWindow?: number;
  costTier?: "free" | "low" | "mid" | "high";
}

export interface ModelSelectorProps {
  options: ModelOption[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const COST_TONE: Record<NonNullable<ModelOption["costTier"]>, string> = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  low: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  mid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const COST_LABEL: Record<NonNullable<ModelOption["costTier"]>, string> = {
  free: "Free",
  low: "$",
  mid: "$$",
  high: "$$$",
};

/**
 * Horizontal row of model cards. The selected one has a primary
 * border + a checkmark.
 */
export const ModelSelector = React.forwardRef<HTMLDivElement, ModelSelectorProps>(
  function ModelSelector(
    { options, value: controlled, onChange, className },
    ref
  ) {
    const [internal, setInternal] = React.useState<string | undefined>(
      controlled ?? options[0]?.id
    );
    const value = controlled ?? internal;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Model"
        className={cn(
          "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                setInternal(opt.id);
                onChange?.(opt.id);
              }}
              className={cn(
                "group relative flex flex-col items-start gap-1 rounded-lg border bg-card p-3 text-left transition-colors",
                "hover:border-primary/40 hover:bg-accent/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "border-primary shadow-[0_0_0_1px_theme(colors.primary.DEFAULT)]"
                  : "border-border"
              )}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-medium text-foreground">{opt.label}</span>
                {opt.costTier && (
                  <Badge
                    variant="secondary"
                    className={cn("px-1.5 py-0", COST_TONE[opt.costTier])}
                  >
                    {COST_LABEL[opt.costTier]}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {opt.vendor}
                {opt.contextWindow
                  ? ` · ${opt.contextWindow.toLocaleString()} ctx`
                  : ""}
              </span>
              {opt.description && (
                <span className="text-xs text-muted-foreground/80 line-clamp-2">
                  {opt.description}
                </span>
              )}
              {selected && (
                <span
                  aria-hidden
                  className="absolute right-2 top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);