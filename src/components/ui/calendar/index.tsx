"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "@/components/icons";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  /** Locale for month/day names. */
  locale?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/**
 * Simple month-grid calendar. No external date library.
 */
export function Calendar({
  value,
  onChange,
  className,
  locale = "en-US",
}: CalendarProps) {
  const [view, setView] = React.useState<Date>(value ?? new Date());

  const monthStart = startOfMonth(view);
  const monthName = MONTHS[view.getMonth()]!;
  const year = view.getFullYear();
  const firstDay = monthStart.getDay();
  const total = daysInMonth(view);

  const cells: Array<{ day?: number; date?: Date }> = [];
  for (let i = 0; i < firstDay; i++) cells.push({});
  for (let d = 1; d <= total; d++) {
    cells.push({
      day: d,
      date: new Date(year, view.getMonth(), d),
    });
  }
  while (cells.length % 7 !== 0) cells.push({});

  const isSelected = (d: Date) =>
    value &&
    d.getFullYear() === value.getFullYear() &&
    d.getMonth() === value.getMonth() &&
    d.getDate() === value.getDate();

  const isToday = (d: Date) => {
    const t = new Date();
    return (
      d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate()
    );
  };

  return (
    <div className={cn("rounded-md border border-border bg-card p-3", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">
          {monthName} {year}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setView(new Date(year, view.getMonth() - 1, 1))}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setView(new Date(year, view.getMonth() + 1, 1))}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c.day) return <div key={i} />;
          const selected = c.date && isSelected(c.date);
          const today = c.date && isToday(c.date);
          return (
            <button
              key={i}
              type="button"
              onClick={() => c.date && onChange?.(c.date)}
              className={cn(
                "aspect-square rounded text-xs transition-colors",
                selected
                  ? "bg-primary text-primary-foreground"
                  : today
                    ? "border border-primary text-foreground"
                    : "text-foreground hover:bg-accent"
              )}
            >
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}