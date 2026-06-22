import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "@/components/icons";
import { Switch } from "@/components/ui/switch";

export interface ProPricingTier {
  name: string;
  description: string;
  /** Monthly price. 0 means free. */
  monthly: number;
  /** Yearly price per month. */
  yearly: number;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
}

export interface ProPricingProps {
  tiers?: ProPricingTier[];
  className?: string;
}

const DEFAULT_TIERS: ProPricingTier[] = [
  {
    name: "Hobby",
    description: "For solo builders and side projects.",
    monthly: 0,
    yearly: 0,
    features: [
      "All 32 UI primitives",
      "All 22 AI components",
      "All 18 motion elements",
      "MIT license",
      "Community support",
    ],
    cta: { label: "Start free", href: "/get-started" },
  },
  {
    name: "Pro",
    description: "For indie hackers shipping real products.",
    monthly: 19,
    yearly: 15,
    features: [
      "Everything in Hobby",
      "All 18 AI app templates",
      "Magic generator (LLM)",
      "CLI + MCP server",
      "Priority email support",
      "Lifetime updates",
    ],
    cta: { label: "Upgrade to Pro", href: "/get-started" },
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Team",
    description: "For teams that ship together.",
    monthly: 49,
    yearly: 39,
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Shared design tokens",
      "SSO + role-based access",
      "Custom registry namespace",
      "Dedicated Slack channel",
    ],
    cta: { label: "Contact sales", href: "/get-started" },
  },
];

/**
 * Pro pricing block. 3 tiers, monthly/yearly toggle, featured middle
 * tier with a ribbon.
 */
export function ProPricing({
  tiers = DEFAULT_TIERS,
  className,
}: ProPricingProps) {
  const [yearly, setYearly] = React.useState(false);

  return (
    <section className={cn("py-16", className)}>
      <div className="mb-10 flex flex-col items-center gap-3">
        <Badge variant="outline">
          <Sparkles size={12} className="mr-1" /> Pricing
        </Badge>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className="text-sm">
            Yearly
            <span className="ml-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => {
          const price = yearly ? t.yearly : t.monthly;
          return (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 transition-colors",
                t.featured
                  ? "border-primary shadow-2xl ring-2 ring-primary/40"
                  : "border-border hover:border-primary/40"
              )}
            >
              {t.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {t.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  ${price}
                </span>
                <span className="text-sm text-muted-foreground">
                  /mo
                </span>
              </div>
              {yearly && t.yearly > 0 && (
                <p className="text-xs text-muted-foreground">
                  billed annually · ${t.yearly * 12}/year
                </p>
              )}
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-6 w-full"
                variant={t.featured ? "default" : "outline"}
              >
                <Link href={t.cta.href}>
                  {t.cta.label} <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}