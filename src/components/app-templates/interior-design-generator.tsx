"use client"

/**
 * Interior Design Generator — room re-design from a photo.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, Loader, Home, Image as ImageIcon } from "@/components/icons";

const ROOMS = ["Living room", "Bedroom", "Kitchen", "Office", "Bathroom", "Outdoor"];
const STYLES = ["Scandinavian", "Mid-century", "Bohemian", "Minimalist", "Industrial", "Japandi"];

export function InteriorDesignGeneratorApp() {
  const [room, setRoom] = React.useState("Living room");
  const [style, setStyle] = React.useState("Scandinavian");
  const [processing, setProcessing] = React.useState(false);

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-5xl px-4 py-10">
      <header className="mb-8 text-center">
        <Badge variant="secondary" className="mb-2">
          <Sparkles size={10} className="mr-1" /> AI Interior Designer
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Reimagine your space</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Snap a room → get 4 re-designs in different styles in seconds.
        </p>
      </header>

      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Room
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {ROOMS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(r)}
                  className={`rounded-md border px-2 py-1.5 text-xs ${
                    room === r ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Style
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`rounded-md border px-2 py-1.5 text-xs ${
                    style === s ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upload
            </p>
            <div className="grid place-items-center rounded-md border border-dashed border-border bg-muted/30 p-4 text-center text-muted-foreground">
              <div>
                <Upload size={18} className="mx-auto mb-1" />
                <p className="text-xs">Photo of your {room.toLowerCase()}</p>
              </div>
            </div>
            <Button
              className="mt-2 w-full"
              disabled={processing}
              onClick={() => {
                setProcessing(true);
                setTimeout(() => setProcessing(false), 2000);
              }}
            >
              {processing ? (
                <>
                  <Loader size={14} className="mr-1 animate-spin" /> Designing…
                </>
              ) : (
                <>
                  <Home size={14} className="mr-1" /> Re-design
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="grid aspect-square place-items-center bg-muted/30 text-muted-foreground">
              <ImageIcon size={20} />
            </div>
            <CardContent className="p-2">
              <p className="text-xs text-muted-foreground">{STYLES[i % STYLES.length]} take</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}