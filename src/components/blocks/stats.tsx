import * as React from "react";

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsProps {
  title?: string;
  items: StatItem[];
}

/**
 * Stats — a 2- or 4-column strip of large numbers with a short label.
 * Used for traction, scale, and credibility numbers.
 */
export function Stats({ title, items }: StatsProps) {
  return (
    <section className="border-b border-border/60 py-16">
      <div className="mx-auto max-w-6xl px-6">
        {title ? (
          <h2 className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {title}
          </h2>
        ) : null}
        <div
          className={`grid grid-cols-2 gap-6 ${
            items.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-2"
          }`}
        >
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">
                {item.label}
              </div>
              {item.description ? (
                <div className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
