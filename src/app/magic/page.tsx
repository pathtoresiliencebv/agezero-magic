"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sparkles,
  Wand,
  ArrowRight,
  Copy,
  Check,
  Eye,
  Code,
  RefreshCw,
  Heart,
  Star,
  Mail,
  Globe,
  Users,
  Play,
} from "@/components/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { Aurora } from "@/components/motion/aurora";

const EXAMPLES = [
  "Build a hero section with a gradient headline",
  "Show me a pricing card with a list of features",
  "Create a 3-column feature grid with icons",
  "Make a chat thread with user and assistant messages",
  "An infinite marquee with 6 company names",
  "A timeline of product releases",
  "A signup form with email and password",
  "A testimonial with quote and avatar",
];

interface GenerateResponse {
  title: string;
  description: string;
  code: string;
  source: "llm" | "template";
  error?: string;
}

const PREVIEW_MAP: Record<string, React.ReactNode> = {
  hero: <HeroPreview />,
  pricing: <PricingPreview />,
  features: <FeaturesPreview />,
  chat: <ChatPreview />,
  marquee: <MarqueePreview />,
  timeline: <TimelinePreview />,
  form: <FormPreview />,
  testimonial: <TestimonialPreview />,
};

function detectKind(p: string): keyof typeof PREVIEW_MAP {
  const s = p.toLowerCase();
  if (/hero|headline|landing/.test(s)) return "hero";
  if (/pricing|price|tier/.test(s)) return "pricing";
  if (/feature|grid|column/.test(s)) return "features";
  if (/chat|message|thread|conversation/.test(s)) return "chat";
  if (/marquee|scroll|company/.test(s)) return "marquee";
  if (/timeline|release|changelog/.test(s)) return "timeline";
  if (/form|signup|input|email/.test(s)) return "form";
  if (/testimonial|quote|review/.test(s)) return "testimonial";
  return "hero";
}

export default function MagicPage() {
  const [prompt, setPrompt] = React.useState("");
  const [result, setResult] = React.useState<GenerateResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [previewKind, setPreviewKind] = React.useState<keyof typeof PREVIEW_MAP>("hero");

  const generate = React.useCallback(async (p?: string) => {
    const text = (p ?? prompt).trim();
    if (!text) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = (await res.json()) as GenerateResponse;
      setResult(data);
      setPreviewKind(detectKind(text));
    } catch (e) {
      setResult({
        title: "Network error",
        description: "Could not reach the generator.",
        code: "",
        source: "template",
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  const copy = React.useCallback(async () => {
    if (!result?.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }, [result?.code]);

  return (
    <article className="mx-auto max-w-6xl space-y-8">
      <header className="text-center">
        <Badge variant="secondary" className="mb-4">
          <Wand size={12} className="mr-1" /> AgeZero UI Magic · v2 with live preview
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Describe it. We&apos;ll build it.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Type any UI in plain English — a hero, a chat thread, a pricing
          card — and watch the preview update live. Copy the code when you
          love it.
        </p>
      </header>

      {/* Prompt input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="e.g. a pricing card with three tiers and a highlighted middle"
              className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring"
              disabled={loading}
            />
            <Button onClick={() => generate()} disabled={loading || !prompt.trim()} size="lg">
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setPrompt(ex);
                  generate(ex);
                }}
                className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                disabled={loading}
              >
                {ex}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two-pane: live preview + code */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live preview */}
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye size={14} /> Live preview
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">
                {previewKind}
              </Badge>
            </div>
            <CardDescription>
              Updates as you change the prompt above.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t border-border">
              <Tabs defaultValue="light">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <TabsList className="h-7">
                    <TabsTrigger value="light" className="h-6 text-xs">Light</TabsTrigger>
                    <TabsTrigger value="dark" className="h-6 text-xs">Dark</TabsTrigger>
                  </TabsList>
                  <span className="text-[10px] text-muted-foreground">
                    {loading ? "Loading…" : result ? "Rendered" : "Idle"}
                  </span>
                </div>
                <TabsContent value="light" className="m-0 p-6">
                  <div className="transition-opacity duration-300" style={{ opacity: loading ? 0.4 : 1 }}>
                    {PREVIEW_MAP[previewKind]}
                  </div>
                </TabsContent>
                <TabsContent value="dark" className="m-0 bg-zinc-950 p-6">
                  <div className="transition-opacity duration-300" style={{ opacity: loading ? 0.4 : 1 }}>
                    <div className="text-zinc-100 [&_*]:text-zinc-100">
                      {PREVIEW_MAP[previewKind]}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Code */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code size={14} /> Generated code
              </CardTitle>
              {result?.code ? (
                <Button variant="outline" size="sm" onClick={copy}>
                  {copied ? (
                    <>
                      <Check size={14} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </Button>
              ) : null}
            </div>
            <CardDescription>
              {result?.description ?? "Your code will appear here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {result ? (
              <pre className="max-h-[480px] overflow-auto rounded-b-xl border-t border-border/60 bg-muted/30 px-5 py-4 text-xs leading-relaxed text-foreground">
                <code>{result.code || result.error}</code>
              </pre>
            ) : (
              <div className="grid place-items-center border-t border-border/60 bg-muted/10 py-16 text-center text-sm text-muted-foreground">
                <div>
                  <Sparkles size={28} className="mx-auto mb-3 text-muted-foreground/40" />
                  <p>Click any example or type your own.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sources & how it works */}
      <section className="grid gap-6 sm:grid-cols-2">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles size={16} /> How it works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              The generator tries each built-in template keyword against your
              prompt first. If there&apos;s no match, it calls an
              OpenAI-compatible LLM with a system prompt that lists every
              AgeZero UI export.
            </p>
            <p className="mt-3">
              To enable real generation, set{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">
                OPENAI_API_KEY
              </code>{" "}
              in your Vercel project settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Play size={16} /> Other ways to build
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Link href="/playground/button" className="flex items-center justify-between rounded-md border border-border p-2 hover:border-primary/40">
              <span>Playground · live tweak props</span>
              <ArrowRight size={12} />
            </Link>
            <Link href="/registry" className="flex items-center justify-between rounded-md border border-border p-2 hover:border-primary/40">
              <span>Registry · copy a component</span>
              <ArrowRight size={12} />
            </Link>
            <Link href="/get-started" className="flex items-center justify-between rounded-md border border-border p-2 hover:border-primary/40">
              <span>Install via CLI</span>
              <ArrowRight size={12} />
            </Link>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}

// ─── Live preview components ─────────────────────────────────────

function HeroPreview() {
  return (
    <FadeIn duration={400}>
      <Aurora colors={["#7c3aed", "#06b6d4"]} speed={14} intensity={0.3} className="rounded-lg">
        <div className="rounded-lg border border-border/60 bg-background/70 p-8 backdrop-blur text-center">
          <Badge variant="secondary" className="mb-3">v0.1 · Live</Badge>
          <h3 className="text-2xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--az-brand-gradient)" }}>
              Ship faster
            </span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A premium UI kit for Next.js + AI.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button size="sm">Get started</Button>
            <Button size="sm" variant="outline">Docs</Button>
          </div>
        </div>
      </Aurora>
    </FadeIn>
  );
}

function PricingPreview() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[
        { name: "Free", price: "$0", featured: false },
        { name: "Pro", price: "$19", featured: true },
        { name: "Team", price: "$49", featured: false },
      ].map((tier) => (
        <div
          key={tier.name}
          className={`rounded-lg border p-4 text-center ${
            tier.featured ? "border-primary bg-primary/5 ring-2 ring-primary" : "border-border"
          }`}
        >
          <p className="text-sm font-semibold">{tier.name}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{tier.price}</p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>✓ All components</li>
            <li>✓ Registry</li>
            <li>{tier.featured ? "✓ Priority support" : "○ Priority support"}</li>
          </ul>
          <Button size="sm" className="mt-3 w-full" variant={tier.featured ? "default" : "outline"}>
            Choose
          </Button>
        </div>
      ))}
    </div>
  );
}

function FeaturesPreview() {
  const features = [
    { icon: <Sparkles size={16} />, title: "AI-first", desc: "Built for the agent era." },
    { icon: <Globe size={16} />, title: "Production", desc: "Battle-tested primitives." },
    { icon: <Users size={16} />, title: "Team", desc: "Designed for collaboration." },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {features.map((f) => (
        <div key={f.title} className="rounded-lg border border-border p-3 text-center">
          <div className="mx-auto mb-2 grid size-8 place-items-center rounded-md bg-primary/10 text-primary">
            {f.icon}
          </div>
          <p className="text-sm font-medium">{f.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs">Y</div>
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
          What can AgeZero UI do?
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">J</div>
        <div className="rounded-lg border border-border bg-primary/5 px-3 py-2 text-sm">
          32 primitives, 22 AI components, 18 motion elements, and a magic generator.
        </div>
      </div>
    </div>
  );
}

function MarqueePreview() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card py-2 text-xs text-muted-foreground">
      <div className="flex animate-marquee-left gap-6 whitespace-nowrap">
        {["Acme", "Globex", "Initech", "Stark", "Wayne", "Umbrella"].map((n) => (
          <span key={n} className="mx-4 font-medium text-foreground">{n}</span>
        ))}
      </div>
    </div>
  );
}

function TimelinePreview() {
  return (
    <ol className="space-y-2 border-l-2 border-border pl-3 text-sm">
      {[
        { v: "v0.4", t: "Wave 4: 18 AI apps, theme builder" },
        { v: "v0.3", t: "Wave 3: 16 UI + 8 AI components" },
        { v: "v0.2", t: "Wave 2: sections, mobile, skills" },
        { v: "v0.1", t: "Wave 1: CLI, hooks, magic" },
      ].map((it) => (
        <li key={it.v}>
          <span className="font-mono text-xs text-primary">{it.v}</span>
          <p className="text-muted-foreground">{it.t}</p>
        </li>
      ))}
    </ol>
  );
}

function FormPreview() {
  return (
    <div className="space-y-2 rounded-lg border border-border p-4">
      <label className="block text-xs text-muted-foreground">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
      />
      <Button size="sm" className="w-full">
        Sign up
      </Button>
    </div>
  );
}

function TestimonialPreview() {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan-500 text-xs font-bold text-white">
          J
        </div>
        <div>
          <p className="text-sm font-medium">Jane Doe</p>
          <p className="text-xs text-muted-foreground">CTO, Acme</p>
        </div>
      </div>
      <p className="mt-3 text-sm italic">
        “AgeZero UI cut our build time in half. The AI components are unreal.”
      </p>
      <div className="mt-2 flex gap-0.5 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" />
        ))}
      </div>
    </div>
  );
}