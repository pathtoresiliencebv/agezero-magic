import * as React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconProps } from "@/components/icons";

export interface FeatureItem {
  icon: React.FC<IconProps>;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

/**
 * FeatureGrid — a 2/3/4 column grid of icon + title + description tiles.
 * The bread-and-butter of every SaaS landing page.
 */
export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureGridProps) {
  const colClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

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
        <div className={`grid grid-cols-1 gap-4 ${colClass}`}>
          {features.map((feature, i) => (
            <Card key={i} className="bg-card">
              <CardHeader>
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon size={18} />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
