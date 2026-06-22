import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  initials?: string;
}

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  items: Testimonial[];
}

/**
 * Testimonials — a 3-column grid of customer quotes with avatar, name,
 * and role. Stripped-back: no background images, no logos.
 */
export function Testimonials({ title, subtitle, items }: TestimonialsProps) {
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
          {items.map((t, i) => (
            <Card key={i} className="bg-card">
              <CardContent className="flex h-full flex-col justify-between gap-6 pt-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {t.initials ??
                        t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    {t.role ? (
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
