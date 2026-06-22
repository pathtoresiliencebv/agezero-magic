"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "@/components/icons";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Input + popover calendar. Click the input to open, click a day to
 * pick, click X to clear.
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const formatted = value
    ? value.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div ref={ref} className={cn("relative w-full max-w-sm", className)}>
      <div className="relative">
        <CalendarIcon
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          readOnly
          value={formatted}
          placeholder={placeholder}
          onClick={() => setOpen((o) => !o)}
          className="cursor-pointer pl-9 pr-8"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => onChange?.(undefined)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={12} />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute z-50 mt-1">
          <Calendar
            value={value}
            onChange={(d) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}