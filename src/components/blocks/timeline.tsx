"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/components/icons";

export interface TimelineEntry {
  title: string;
  description?: string;
  date?: string;
  icon?: React.FC<IconProps>;
}

export interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

/**
 * Timeline — a vertical list of events with a connecting line.
 * Each entry has an icon, title, optional description and date.
 */
export function Timeline({ entries, className }: TimelineProps) {
  return (
    <ol className={cn("relative space-y-8 border-s border-border/60 ps-8", className)}>
      {entries.map((entry, i) => (
        <li key={i} className="relative">
          <span className="absolute -start-[2.05rem] grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm">
            {entry.icon ? (
              <entry.icon size={14} className="text-primary" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-primary" />
            )}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="font-semibold text-foreground">{entry.title}</h3>
            {entry.date ? (
              <time className="text-xs text-muted-foreground">{entry.date}</time>
            ) : null}
          </div>
          {entry.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {entry.description}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}