"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "@/components/icons";

export interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
  /** When true, the value is treated as suggestions only. */
  suggestions?: string[];
}

/**
 * Chip-style tag input. Type and press Enter or comma to add. Click X
 * on a chip to remove.
 */
export function TagInput({
  value,
  onChange,
  placeholder = "Add tag…",
  className,
  suggestions,
}: TagInputProps) {
  const [draft, setDraft] = React.useState("");
  const [showSugg, setShowSugg] = React.useState(false);

  const add = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "");
    if (!tag) return;
    if (value.includes(tag)) return;
    onChange([...value, tag]);
    setDraft("");
  };

  const remove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const filtered = React.useMemo(() => {
    if (!suggestions) return [];
    return suggestions
      .filter((s) => !value.includes(s))
      .filter((s) => s.toLowerCase().includes(draft.toLowerCase()));
  }, [suggestions, value, draft]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 transition-colors focus-within:border-primary/50"
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => remove(tag)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setShowSugg(true);
          }}
          onFocus={() => setShowSugg(true)}
          onBlur={() => setTimeout(() => setShowSugg(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(draft);
            } else if (
              e.key === "Backspace" &&
              !draft &&
              value.length > 0
            ) {
              onChange(value.slice(0, -1));
            }
          }}
          placeholder={placeholder}
          className="min-w-32 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {showSugg && filtered.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filtered.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                add(s);
              }}
              className="rounded-md border border-dashed border-border bg-card px-2 py-0.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}