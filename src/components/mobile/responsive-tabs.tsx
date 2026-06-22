"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface ResponsiveTabsItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface ResponsiveTabsProps {
  items: ResponsiveTabsItem[];
  defaultValue?: string;
  className?: string;
}

/**
 * Tabs on desktop (≥ 640px), accordion on mobile.
 */
export function ResponsiveTabs({
  items,
  defaultValue,
  className,
}: ResponsiveTabsProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [value, setValue] = React.useState(defaultValue ?? items[0]?.value);

  if (isDesktop) {
    return (
      <div className={cn("space-y-3", className)}>
        <div
          role="tablist"
          className="inline-flex rounded-md border border-border bg-card p-0.5 text-sm"
        >
          {items.map((it) => (
            <button
              key={it.value}
              role="tab"
              aria-selected={value === it.value}
              onClick={() => setValue(it.value)}
              className={cn(
                "rounded-sm px-3 py-1.5 transition-colors",
                value === it.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {it.label}
            </button>
          ))}
        </div>
        <div>
          {items.map((it) =>
            it.value === value ? (
              <div key={it.value} role="tabpanel">
                {it.content}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }

  // Mobile: accordion
  return (
    <div className={cn("divide-y divide-border rounded-md border border-border bg-card", className)}>
      {items.map((it) => {
        const open = value === it.value;
        return (
          <details
            key={it.value}
            open={open}
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) setValue(it.value);
            }}
            className="group"
          >
            <summary className="flex cursor-pointer items-center justify-between p-3 text-sm font-medium">
              {it.label}
              <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <div className="p-3 pt-0 text-sm text-muted-foreground">
              {it.content}
            </div>
          </details>
        );
      })}
    </div>
  );
}
