"use client"

/**
 * Ghibli Image Generator — style-transfer playground.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Upload, Image as ImageIcon, Wand, Loader, Download } from "@/components/icons";

const STYLES = [
  { id: "ghibli", label: "Studio Ghibli", emoji: "🌿" },
  { id: "anime", label: "Anime 90s", emoji: "🌸" },
  { id: "watercolor", label: "Watercolor", emoji: "🎨" },
  { id: "pixel", label: "Pixel art", emoji: "👾" },
];

export function GhibliImageGeneratorApp() {
  const [style, setStyle] = React.useState("ghibli");
  const [prompt, setPrompt] = React.useState("A cat looking at the moon from a window");
  const [generating, setGenerating] = React.useState(false);
  const [results, setResults] = React.useState<{ id: string; src: string; style: string; prompt: string }[]>([
    { id: "1", src: "https://picsum.photos/seed/ghibli1/500/500", style: "ghibli", prompt: "A child running through tall grass" },
    { id: "2", src: "https://picsum.photos/seed/ghibli2/500/500", style: "ghibli", prompt: "Floating islands in the clouds" },
  ]);

  const generate = () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setTimeout(() => {
      setResults((r) => [
        { id: Math.random().toString(36).slice(2, 9), src: `https://picsum.photos/seed/${prompt}/500/500`, style, prompt },
        ...r,
      ].slice(0, 6));
      setGenerating(false);
    }, 1800);
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 py-8">
      <header className="mb-6 text-center">
        <Badge variant="secondary" className="mb-2">
          <Sparkles size={10} className="mr-1" /> Ghibli-style generator
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Whimsical worlds, one prompt away</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Turn a text prompt into a hand-drawn, watercolor-painted scene.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="space-y-3 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Style
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`rounded-md border p-2 text-left text-xs ${
                    style === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="mr-1.5">{s.emoji}</span> {s.label}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Prompt
            </p>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none text-sm"
              placeholder="A cat looking at the moon from a window…"
            />
            <Button onClick={generate} className="w-full" disabled={generating}>
              {generating ? (
                <>
                  <Loader size={14} className="mr-1 animate-spin" /> Drawing…
                </>
              ) : (
                <>
                  <Wand size={14} className="mr-1" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {results.map((r) => (
            <Card key={r.id} className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <img
                  src={r.src}
                  alt={r.prompt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute right-1 top-1">
                  <button
                    aria-label="Download"
                    className="grid size-7 place-items-center rounded-md bg-black/40 text-white hover:bg-black/60"
                  >
                    <Download size={12} />
                  </button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="line-clamp-2 text-xs text-muted-foreground">{r.prompt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}