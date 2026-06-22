"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Check, ChevronDown } from "@/components/icons";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

/**
 * Searchable select (command-palette-style). Filter as you type, click
 * to pick. Keyboard nav with up/down + Enter.
 */
export function Combobox({
  options,
  value: controlled,
  onChange,
  placeholder = "Search…",
  emptyMessage = "No results",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string | undefined>(controlled);
  const [q, setQ] = React.useState("");
  const [highlighted, setHighlighted] = React.useState(0);
  const value = controlled ?? internal;
  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!q) return options;
    const needle = q.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(needle) ||
        o.description?.toLowerCase().includes(needle)
    );
  }, [options, q]);

  const close = () => {
    setOpen(false);
    setQ("");
    setHighlighted(0);
  };

  const select = (v: string) => {
    setInternal(v);
    onChange?.(v);
    close();
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        className="w-full justify-between font-normal"
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown size={14} className="opacity-50" />
      </Button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card p-1 shadow-2xl">
          <div className="relative px-1 pb-1">
            <Search
              size={12}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setHighlighted(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlighted((h) => Math.min(filtered.length - 1, h + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlighted((h) => Math.max(0, h - 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (filtered[highlighted]) select(filtered[highlighted].value);
                } else if (e.key === "Escape") {
                  close();
                }
              }}
              placeholder={placeholder}
              className="h-7 pl-7 text-sm"
            />
          </div>
          <ul
            role="listbox"
            className="max-h-64 overflow-auto"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </li>
            ) : (
              filtered.map((o, i) => {
                const active = o.value === value;
                const hl = i === highlighted;
                return (
                  <li
                    key={o.value}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setHighlighted(i)}
                    onClick={() => select(o.value)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm",
                      hl && "bg-accent text-accent-foreground"
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate">{o.label}</p>
                      {o.description && (
                        <p className="truncate text-xs text-muted-foreground">
                          {o.description}
                        </p>
                      )}
                    </div>
                    {active && <Check size={12} className="shrink-0 text-primary" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}