import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play } from "@/components/icons";
import { Aurora } from "@/components/motion/aurora";
import { GridPattern } from "@/components/motion/grid-pattern";
import { Noise } from "@/components/motion/noise";
import { FadeIn } from "@/components/motion/fade-in";
import { Typewriter } from "@/components/motion/typewriter";

export interface ProHeroProps {
  badge?: string;
  /** Words to cycle through in the typewriter below the headline. */
  rotatingWords?: string[];
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Right-side mockup slot. */
  mockup?: React.ReactNode;
  className?: string;
}

/**
 * Pro hero — animated gradient background, optional typewriter
 * headline, dual CTAs, and a configurable right-side mockup.
 */
export function ProHero({
  badge = "Wave 4 · 18 AI app templates",
  rotatingWords = ["AI-native UIs", "agent threads", "chat experiences", "production apps"],
  title = "Build",
  description = "AgeZero UI is a premium React component kit for Next.js — 32 primitives, 22 AI components, 18 motion elements, and 18 full AI app templates. Drop them in, ship faster.",
  primaryCta = { label: "Get started", href: "/get-started" },
  secondaryCta = { label: "Watch demo", href: "/showcase" },
  mockup,
  className,
}: ProHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-border/60", className)}>
      <Aurora
        colors={["#7c3aed", "#06b6d4", "#f43f5e"]}
        speed={18}
        intensity={0.4}
        className="absolute inset-0 -z-10"
      />
      <GridPattern className="-z-10" mask="edges" />
      <Noise opacity={0.04} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <FadeIn direction="down" duration={400}>
            <Badge variant="secondary" className="mb-5 bg-background/60 backdrop-blur">
              <Sparkles size={12} className="mr-1" /> {badge}
            </Badge>
          </FadeIn>
          <FadeIn direction="up" delay={80} duration={700}>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              {title}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--az-brand-gradient)" }}>
                <Typewriter phrases={rotatingWords} speed={80} pause={1500} />
              </span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={160} duration={700}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={240} duration={600}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href={primaryCta.href}>
                  {primaryCta.label} <ArrowRight size={16} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={secondaryCta.href}>
                  <Play size={14} className="mr-1" /> {secondaryCta.label}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={300} duration={800}>
          <div className="relative">{mockup ?? <DefaultMockup />}</div>
        </FadeIn>
      </div>
    </section>
  );
}

function DefaultMockup() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-2 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-muted-foreground">
        <span className="size-2 rounded-full bg-rose-400" />
        <span className="size-2 rounded-full bg-amber-400" />
        <span className="size-2 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono">agezero-ui / hero.tsx</span>
      </div>
      <pre className="overflow-x-auto rounded-b-xl bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-100">
        <code>{`import { Hero } from "@/components/blocks/pro-hero";

export default function Home() {
  return (
    <Hero
      title="Build"
      rotatingWords={["AI-native UIs", "agent threads"]}
      primaryCta={{ label: "Get started", href: "/docs" }}
    />
  );
}`}</code>
      </pre>
    </div>
  );
}