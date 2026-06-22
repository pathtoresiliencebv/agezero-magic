import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "@/components/icons";

export interface PricingTier {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  cta?: { label: string; href: string };
  highlighted?: boolean;
}

export interface PricingProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
}

/**
 * Pricing — a 3-column pricing table. Set `highlighted: true` on the
 * tier you want to feature.
 */
export function Pricing({ title, subtitle, tiers }: PricingProps) {
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
          {tiers.map((tier, i) => (
            <Card
              key={i}
              className={
                tier.highlighted
                  ? "border-primary/50 bg-primary/5 shadow-md"
                  : "bg-card"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  {tier.highlighted ? (
                    <Badge>Most popular</Badge>
                  ) : null}
                </div>
                {tier.description ? (
                  <CardDescription>{tier.description}</CardDescription>
                ) : null}
                <div className="mt-4">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period ? (
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2 text-sm">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.cta ? (
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href={tier.cta.href}>{tier.cta.label}</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
