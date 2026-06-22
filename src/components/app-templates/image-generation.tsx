"use client"

/**
 * AI Image Generation — text-to-image playground.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ModelSelector, type ModelOption } from "@/components/ai/model-selector";
import { TokenCounter } from "@/components/ai/token-counter";
import { Sparkles, Image as ImageIcon, Download, RefreshCw, Wand, ArrowRight } from "@/components/icons";

const MODELS: ModelOption[] = [
  { id: "flux-pro", vendor: "OpenAI", label: "FLUX 1.1 Pro", description: "Best quality" },
  { id: "sdxl", vendor: "OpenAI", label: "Stable Diffusion XL", description: "Open source" },
  { id: "dall-e-3", vendor: "OpenAI", label: "DALL·E 3", description: "Creative" },
];

const SAMPLE = [
  "A neon-lit cyberpunk alley in Tokyo at midnight, rain reflections",
  "An astronaut riding a horse on Mars, cinematic, golden hour",
  "A minimalist Scandinavian kitchen, natural light, 35mm photo",
];

export function ImageGenerationApp() {
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("flux-pro");
  const [generating, setGenerating] = React.useState(false);
  const [images, setImages] = React.useState<{ id: string; src: string; prompt: string }[]>([
    {
      id: "1",
      prompt: "A neon-lit cyberpunk alley in Tokyo at midnight",
      src: "https://picsum.photos/seed/cyberpunk/600/600",
    },
    {
      id: "2",
      prompt: "An astronaut riding a horse on Mars",
      src: "https://picsum.photos/seed/astronaut/600/600",
    },
  ]);

  const generate = () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setTimeout(() => {
      setImages((imgs) => [
        {
          id: Math.random().toString(36).slice(2, 9),
          prompt,
          src: `https://picsum.photos/seed/${encodeURIComponent(prompt)}/600/600`,
        },
        ...imgs,
      ].slice(0, 8));
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            <Sparkles size={18} className="mr-1 inline text-primary" /> AI Image Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Text → image in seconds. Powered by {MODELS.find((m) => m.id === model)?.label}.
          </p>
        </div>
        <ModelSelector value={model} onChange={setModel} options={MODELS} className="w-56" />
      </header>

      <Card>
        <CardContent className="space-y-3 p-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A neon-lit cyberpunk alley in Tokyo at midnight, rain reflections, cinematic…"
            rows={3}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrompt(s)}
                  className="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  {s.length > 30 ? s.slice(0, 30) + "…" : s}
                </button>
              ))}
            </div>
            <Button onClick={generate} disabled={!prompt.trim() || generating}>
              {generating ? (
                <>
                  <RefreshCw size={14} className="mr-1 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Wand size={14} className="mr-1" /> Generate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              <img
                src={img.src}
                alt={img.prompt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <button
                  aria-label="Download"
                  className="grid size-7 place-items-center rounded-md bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
                >
                  <Download size={12} />
                </button>
              </div>
            </div>
            <CardContent className="p-2">
              <p className="line-clamp-2 text-xs text-muted-foreground">{img.prompt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end text-xs text-muted-foreground">
        <TokenCounter value={75} max={75} />
        <span className="ml-2">· 1 image ≈ $0.02</span>
      </div>
    </div>
  );
}