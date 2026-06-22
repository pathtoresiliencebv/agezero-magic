"use client"

/**
 * SaaS Landing — MagicUI-style SaaS marketing page. Reuses the
 * ProHero + ProPricing blocks.
 */
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProHeader } from "@/components/blocks/pro-header";
import { ProHero } from "@/components/blocks/pro-hero";
import { ProPricing } from "@/components/blocks/pro-pricing";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { Testimonials } from "@/components/blocks/testimonials";
import { ArrowRight, Check, Sparkles } from "@/components/icons";

export function SaasLandingApp() {
  return (
    <div className="flex min-h-screen flex-col">
      <ProHeader />
      <ProHero
        badge="v0.4 · 110+ components"
        rotatingWords={["faster", "smarter", "prettier", "real"]}
        title="Ship your SaaS"
        description="A premium React kit for Next.js — primitives, AI components, 18 motion elements, 18 full AI app templates. Production-ready."
        primaryCta={{ label: "Start free", href: "/get-started" }}
        secondaryCta={{ label: "See live demo", href: "/showcase" }}
      />

      <section className="border-b border-border/60 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by
          </p>
          <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Stark" }, { name: "Wayne" }, { name: "Umbrella" }]} />
        </div>
      </section>

      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Why teams pick us</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: "0 runtime deps", desc: "Drop the kit into any Next.js app. No provider wraps." },
              { title: "AI-first", desc: "Message, Reasoning, Sources, Tool, WebhookCard out of the box." },
              { title: "Type-safe", desc: "Strict TypeScript. Every component exposes a typed API." },
              { title: "Accessible", desc: "ARIA roles, keyboard nav, prefers-reduced-motion." },
              { title: "Themable", desc: "OKLCH design tokens + live theme builder widget." },
              { title: "Open source", desc: "MIT license. Free forever for individuals." },
            ].map((f) => (
              <Card key={f.title}>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-20">
        <ProPricing className="mx-auto max-w-6xl px-6" />
      </section>

      <section className="border-b border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Testimonials items={[
  { quote: "AgeZero UI cut our build time in half.", name: "Jane", role: "CTO", initials: "JD" },
  { quote: "The AI components are unreal.", name: "John", role: "Founder", initials: "JS" },
  { quote: "Our team ships 2x faster now.", name: "Sam", role: "PM", initials: "SM" },
]} />
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © 2026 AgeZero UI · Built with love
      </footer>
    </div>
  );
}