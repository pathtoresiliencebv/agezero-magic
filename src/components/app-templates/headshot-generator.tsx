"use client"

/**
 * Headshot / Portrait Generator — turn a selfie into a professional
 * headshot using style transfer.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, User, Loader, Download, Image as ImageIcon, Camera } from "@/components/icons";

const STYLES = [
  { id: "corporate", label: "Corporate", emoji: "👔" },
  { id: "casual", label: "Casual", emoji: "☕" },
  { id: "linkedin", label: "LinkedIn", emoji: "💼" },
  { id: "speaker", label: "Speaker", emoji: "🎤" },
  { id: "graduation", label: "Graduation", emoji: "🎓" },
  { id: "creative", label: "Creative", emoji: "🎨" },
];

export function HeadshotGeneratorApp() {
  const [style, setStyle] = React.useState("linkedin");
  const [processing, setProcessing] = React.useState(false);

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <Badge variant="secondary" className="mb-2">
          <Sparkles size={10} className="mr-1" /> AI Headshot Generator
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Studio-quality portraits, instantly</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload 1 selfie → get 12 professional headshots in your chosen style.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              1. Pick a style
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`rounded-md border p-2 text-center text-xs ${
                    style === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="text-lg">{s.emoji}</div>
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              2. Upload a selfie
            </p>
            <div className="grid place-items-center rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-muted-foreground">
              <div>
                <Upload size={20} className="mx-auto mb-2" />
                <p className="text-xs">Click or drop a photo</p>
                <p className="text-[10px] text-muted-foreground/70">JPG, PNG, HEIC · max 10MB</p>
              </div>
            </div>
            <Button className="w-full" disabled={processing}>
              {processing ? (
                <>
                  <Loader size={14} className="mr-1 animate-spin" /> Generating 12 portraits…
                </>
              ) : (
                <>
                  <Camera size={14} className="mr-1" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preview
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="grid aspect-square place-items-center rounded-md bg-muted/30 text-muted-foreground"
                >
                  <User size={20} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">
              Free tier: 3 generations / day · Pro: unlimited + 4K
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}