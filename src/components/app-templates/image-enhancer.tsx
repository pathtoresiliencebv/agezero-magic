"use client"

/**
 * Image Enhancer / Upscaler — drop a low-res image, get a 4× upscale.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Upload, Download, ArrowRight, Image as ImageIcon, Loader } from "@/components/icons";

export function ImageEnhancerApp() {
  const [scale, setScale] = React.useState([4]);
  const [denoise, setDenoise] = React.useState([50]);
  const [processing, setProcessing] = React.useState(false);

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-5xl px-4 py-8">
      <header className="mb-6 text-center">
        <Badge variant="secondary" className="mb-2">
          <Sparkles size={10} className="mr-1" /> AI Image Enhancer
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Upscale & enhance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Drop a low-res photo. Get a 4× super-resolution version in seconds.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card className="overflow-hidden">
          <CardContent className="grid grid-cols-2 gap-px bg-border p-0">
            <div className="bg-card p-4 text-center">
              <Badge variant="outline" className="mb-2 text-[10px]">Before</Badge>
              <div className="grid aspect-square place-items-center rounded-md border border-dashed border-border bg-muted/30">
                <div className="text-center text-muted-foreground">
                  <Upload size={20} className="mx-auto mb-2" />
                  <p className="text-xs">Drop image here</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 text-center">
              <Badge variant="secondary" className="mb-2 text-[10px]">
                {scale[0]}× upscaled
              </Badge>
              <div className="grid aspect-square place-items-center rounded-md bg-muted/30">
                {processing ? (
                  <Loader size={20} className="animate-spin text-primary" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon size={20} className="mx-auto mb-2" />
                    <p className="text-xs">Output appears here</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Scale</span>
                <span className="font-mono text-muted-foreground">{scale[0]}×</span>
              </div>
              <Slider value={scale} onValueChange={setScale} min={2} max={8} step={1} />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Denoise</span>
                <span className="font-mono text-muted-foreground">{denoise[0]}%</span>
              </div>
              <Slider value={denoise} onValueChange={setDenoise} min={0} max={100} step={5} />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setProcessing(true);
                setTimeout(() => setProcessing(false), 2200);
              }}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader size={14} className="mr-1 animate-spin" /> Enhancing…
                </>
              ) : (
                <>
                  Enhance <ArrowRight size={14} className="ml-1" />
                </>
              )}
            </Button>
            <div className="rounded-md border border-dashed border-border p-2 text-center text-[10px] text-muted-foreground">
              Free tier: 5 images / day
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}