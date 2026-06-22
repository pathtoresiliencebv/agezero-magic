"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/icons";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

/**
 * FAQ — vertical list of native <details> accordions. No JS state,
 * accessible by default, animates open via the browser's default behavior.
 */
export function FAQ({
  title = "Frequently asked questions",
  subtitle,
  items,
  className,
}: FAQProps) {
  return (
    <section className={cn("border-b border-border/60 py-20", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card">
          {items.map((item, i) => (
            <details
              key={i}
              className="group px-6 py-4 [&[open]]:bg-accent/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground">
                <span>{item.question}</span>
                <ChevronDown
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}