"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/icons";

export interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Simple show/hide panel with a chevron. Uses native <details> for
 * zero-JS state.
 */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  return (
    <details
      className={cn("group rounded-md border border-border bg-card", className)}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={14}
          className="text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t border-border px-3 py-2 text-sm text-muted-foreground">
        {children}
      </div>
    </details>
  );
}