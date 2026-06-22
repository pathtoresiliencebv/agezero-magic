import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";

export interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * CTA — a centered call-to-action section, typically used at the bottom
 * of a landing page.
 */
export function CTA({
  title = "Ready to build?",
  subtitle = "Install AgeZero UI in under a minute — no runtime package, just copy and go.",
  primaryCta,
  secondaryCta,
}: CTAProps) {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href={primaryCta.href}>
              {primaryCta.label} <ArrowRight size={16} />
            </Link>
          </Button>
          {secondaryCta ? (
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
