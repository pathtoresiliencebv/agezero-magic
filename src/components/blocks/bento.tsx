import * as React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconProps } from "@/components/icons";

export interface BentoItem {
  icon?: React.FC<IconProps>;
  title: string;
  description: string;
  /** Tailwind grid span classes, e.g. "sm:col-span-2". */
  span?: string;
  /** Optional background override, e.g. "bg-primary/5". */
  background?: string;
}

export interface BentoGridProps {
  title?: string;
  subtitle?: string;
  items: BentoItem[];
}

/**
 * BentoGrid — a varied-size feature grid that looks "designed". Each item
 * declares its own column span via the `span` prop.
 */
export function BentoGrid({ title, subtitle, items }: BentoGridProps) {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {title ? (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Card
              key={i}
              className={`${item.background ?? "bg-card"} ${item.span ?? ""}`}
            >
              <CardHeader>
                {item.icon ? (
                  <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <item.icon size={18} />
                  </div>
                ) : null}
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
