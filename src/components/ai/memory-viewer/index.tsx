"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Database, Plus, Trash } from "@/components/icons";

export interface MemoryEntry {
  id: string;
  key: string;
  value: string;
  /** When the entry was last updated. */
  updatedAt?: string;
  /** Tags for grouping. */
  tags?: string[];
}

export interface MemoryViewerProps {
  entries: MemoryEntry[];
  onDelete?: (id: string) => void;
  onAdd?: (key: string, value: string) => void;
  className?: string;
}

/**
 * Long-term memory inspector. Lists key-value pairs the agent has
 * remembered across conversations.
 */
export function MemoryViewer({
  entries,
  onDelete,
  onAdd,
  className,
}: MemoryViewerProps) {
  const [adding, setAdding] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Database size={14} className="text-muted-foreground" />
          Long-term memory
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={() => setAdding((a) => !a)}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-accent"
          >
            <Plus size={12} /> Add
          </button>
        )}
      </div>
      {adding && (
        <div className="space-y-2 border-b border-border bg-muted/20 p-3">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="key (e.g. user:name)"
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs"
          />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="value"
            rows={2}
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs"
          />
          <div className="flex justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setKey("");
                setValue("");
              }}
              className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (!key) return;
                onAdd?.(key, value);
                setKey("");
                setValue("");
                setAdding(false);
              }}
              className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {entries.length === 0 ? (
        <p className="p-4 text-center text-xs text-muted-foreground">
          No memories yet.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {entries.map((e) => (
            <li key={e.id} className="px-3 py-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-foreground">{e.key}</code>
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(e.id)}
                    aria-label={`Delete ${e.key}`}
                    className="text-muted-foreground hover:text-rose-500"
                  >
                    <Trash size={12} />
                  </button>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">{e.value}</p>
              {e.tags && e.tags.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {e.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              {e.updatedAt && (
                <p className="mt-1 text-[10px] text-muted-foreground/70">
                  {e.updatedAt}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}