"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTab {
  title: string;
  content: React.ReactNode;
}

export interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  className?: string;
}

/**
 * AnimatedTabs — a tab strip with a sliding indicator. The active tab is
 * indicated by an underline whose position is animated via CSS transitions.
 */
export function AnimatedTabs({ tabs, className }: AnimatedTabsProps) {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });

  React.useLayoutEffect(() => {
    const el = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab-index="${active}"]`
    );
    if (!el || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - containerRect.left,
      width: rect.width,
    });
  }, [active, tabs.length]);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        role="tablist"
        className="relative flex border-b border-border/60"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            data-tab-index={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              i === active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.title}
          </button>
        ))}
        <span
          aria-hidden
          className="absolute -bottom-px h-0.5 bg-primary transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>
      <div className="py-6 text-sm text-muted-foreground">
        {tabs[active]?.content}
      </div>
    </div>
  );
}