import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "@/components/icons";

export type ComparisonCell = boolean | string;

export interface ComparisonRow {
  feature: string;
  values: ComparisonCell[];
}

export interface ComparisonColumn {
  name: string;
  /** Optional highlighted column. */
  highlighted?: boolean;
}

export interface ComparisonProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Comparison — a feature-vs-product table. Cells can be `true` (✓),
 * `false` (✗), or a string (rendered as-is). The first column holds
 * the feature name.
 */
export function Comparison({
  columns,
  rows,
  title,
  subtitle,
  className,
}: ComparisonProps) {
  return (
    <section className={cn("border-b border-border/60 py-20", className)}>
      <div className="mx-auto max-w-5xl px-6">
        {title ? (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Feature
                </th>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-4 py-3 text-center font-medium",
                      col.highlighted && "bg-primary/5 text-primary"
                    )}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-4 py-3 text-center",
                        columns[j]?.highlighted && "bg-primary/5"
                      )}
                    >
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check
                            size={18}
                            className="mx-auto text-emerald-500"
                          />
                        ) : (
                          <X
                            size={18}
                            className="mx-auto text-muted-foreground/50"
                          />
                        )
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}