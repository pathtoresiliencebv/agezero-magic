"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui/button";

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  /** Render cell content. Defaults to the value. */
  cell?: (row: T) => React.ReactNode;
  /** When true, this column is sortable. */
  sortable?: boolean;
  /** Tailwind class for the cell (e.g. text-right for numbers). */
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** Set a row key. Default uses index. */
  rowKey?: (row: T, i: number) => string;
  className?: string;
}

/**
 * Sortable data table. Pure-JS sorting. Click a sortable column header
 * to toggle ascending / descending.
 */
export function DataTable<T>({
  data,
  columns,
  rowKey,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [dir, setDir] = React.useState<"asc" | "desc">("asc");

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    const out = [...data].sort((a, b) => {
      const av = a[sortKey] as unknown;
      const bv = b[sortKey] as unknown;
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return dir === "asc" ? av - bv : bv - av;
      }
      return dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return out;
  }, [data, sortKey, dir]);

  const toggle = (key: keyof T) => {
    if (sortKey === key) {
      setDir(dir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDir("asc");
    }
  };

  return (
    <div className={cn("overflow-x-auto rounded-md border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                scope="col"
                className={cn(
                  "px-4 py-2 font-semibold",
                  c.className,
                  c.sortable && "cursor-pointer select-none hover:text-foreground"
                )}
                onClick={() => c.sortable && toggle(c.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {c.header}
                  {c.sortable && sortKey === c.key && (
                    dir === "asc" ? <ArrowUp size={10} /> : <ArrowDown size={10} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
              >
                No results
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={rowKey ? rowKey(row, i) : String(i)}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className={cn("px-4 py-2", c.className)}>
                    {c.cell ? c.cell(row) : (row[c.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}