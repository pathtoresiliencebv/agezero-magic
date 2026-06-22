"use client"

/**
 * Startup landing — dillionverma startup template style: clean hero
 * with auth tabs, social proof, pricing, FAQ.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { Testimonials } from "@/components/blocks/testimonials";
import { ProPricing } from "@/components/blocks/pro-pricing";
import { FAQ, type FAQItem } from "@/components/blocks/faq";
import { Sparkles, ArrowRight, Github } from "@/components/icons";

const FAQ_ITEMS: FAQItem[] = [
  { question: "Is AgeZero UI free?", answer: "Yes. The core is MIT-licensed and free forever for individuals and small teams." },
  { question: "Do I need to install anything?", answer: "Just the CLI: npx agezero-ui@latest init. Then add components one by one." },
  { question: "Can I use it with the AI SDK?", answer: "Yes. All AI components are designed to work with the Vercel AI SDK, LangChain, or any custom backend." },
  { question: "What about TypeScript?", answer: "Strict TypeScript everywhere. Every prop, every variant, fully typed." },
];

export function StartupApp() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/60 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles size={14} />
            </span>
            AgeZero UI
          </div>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github size={14} />
            </a>
          </nav>
          <Button asChild size="sm">
            <a href="#cta">Get started <ArrowRight size={14} className="ml-1" /></a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles size={12} className="mr-1" /> New · 18 AI app templates
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            Your startup, shipped in days.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            AgeZero UI gives you every component, page template, and motion
            primitive you need to launch — without the bloat.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button size="lg">
              Get started <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline">
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Stark" }, { name: "Wayne" }, { name: "Umbrella" }]} />
        </div>
      </section>

      <section id="features" className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">Features</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "32 UI primitives", d: "Buttons, cards, dialogs, comboboxes — typed." },
              { t: "22 AI components", d: "Message, Reasoning, Tools, WebhookCard." },
              { t: "18 motion elements", d: "Aurora, Grid, Beam, Stagger, Meteors." },
              { t: "18 AI app templates", d: "chat-pdf, chat-youtube, ghibli, headshot…" },
              { t: "Magic generator", d: "LLM-powered UI generator with live preview." },
              { t: "Sticky theme builder", d: "Tune radius/font/gradient at runtime." },
            ].map((f) => (
              <Card key={f.t}>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold">{f.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b border-border/60 py-20">
        <ProPricing className="mx-auto max-w-6xl px-6" />
      </section>

      <section className="border-b border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Testimonials items={[
  { quote: "AgeZero UI cut our build time in half.", name: "Jane", role: "CTO", initials: "JD" },
  { quote: "The AI components are unreal.", name: "John", role: "Founder", initials: "JS" },
]} />
        </div>
      </section>

      <section id="faq" className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight">FAQ</h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <section id="cta" className="py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Ready to ship?</h2>
        <p className="mt-2 text-muted-foreground">Join 12,000+ builders using AgeZero UI.</p>
        <Button size="lg" className="mt-6">
          Get started free <ArrowRight size={14} className="ml-1" />
        </Button>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © 2026 AgeZero UI
      </footer>
    </div>
  );
}