"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CitationSource {
  id: string;
  title: string;
  url?: string;
  author?: string;
  publishedAt?: string;
}

export interface CitationProps {
  source: CitationSource;
  index: number;
  className?: string;
}

/**
 * Inline citation marker. Renders a small superscript badge; hover
 * (or focus) shows a popover with the source metadata.
 */
export const Citation = React.forwardRef<HTMLSpanElement, CitationProps>(
  function Citation({ source, index, className }, ref) {
    const [open, setOpen] = React.useState(false);

    return (
      <span
        ref={ref}
        className={cn("relative inline-block align-baseline", className)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          type="button"
          aria-label={`Citation ${index}: ${source.title}`}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={cn(
            "ml-0.5 mr-0.5 inline-flex h-4 min-w-4 cursor-pointer items-center justify-center rounded-full px-1 align-super text-[10px] font-semibold leading-none",
            "bg-primary/10 text-primary hover:bg-primary/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {index}
        </button>
        {open && (
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-md border border-border bg-card p-2.5 text-left text-xs text-card-foreground shadow-lg"
          >
            <span className="block font-medium leading-snug">
              {source.title}
            </span>
            {source.author && (
              <span className="mt-0.5 block text-muted-foreground">
                {source.author}
                {source.publishedAt ? ` · ${source.publishedAt}` : ""}
              </span>
            )}
            {source.url && (
              <span className="mt-1 block truncate text-[10px] text-primary">
                {source.url}
              </span>
            )}
            <span
              aria-hidden
              className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-card"
              style={{ filter: "drop-shadow(0 1px 0 rgb(0 0 0 / 0.1))" }}
            />
          </span>
        )}
      </span>
    );
  }
);