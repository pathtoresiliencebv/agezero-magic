import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "@/components/icons";

/**
 * Hero — a big marketing hero with a tag badge, a two-line headline, a
 * tagline, and two CTAs. Pure presentation, fully themable.
 */
export interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({
  eyebrow = "v0.1 · Now with 21st.dev-style registry",
  title,
  subtitle,
  primaryCta = { label: "Get started", href: "/get-started" },
  secondaryCta = { label: "Browse components", href: "/components" },
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <Badge variant="secondary" className="mb-6">
          <Sparkles size={12} className="mr-1" /> {eyebrow}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href={primaryCta.href}>
              {primaryCta.label} <ArrowRight size={16} />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
