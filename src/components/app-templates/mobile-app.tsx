"use client"

/**
 * Mobile app showcase — MagicUI-style mobile marketing. Phone mockup
 * with feature list.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, Star, Apple, Smartphone, Zap, Shield, Layers } from "@/components/icons";

export function MobileApp() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 py-12">
      <header className="mb-10 text-center">
        <Badge variant="secondary" className="mb-2">
          <Smartphone size={10} className="mr-1" /> iOS · Android
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          AgeZero UI in your pocket
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Browse components, tweak themes, and copy snippets — anywhere.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Button>
            <Apple size={14} className="mr-1" /> App Store
          </Button>
          <Button variant="outline">
            <Download size={14} className="mr-1" /> Google Play
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>4.8 · 12,400 reviews</span>
        </div>
      </header>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="order-2 flex justify-center lg:order-1">
          <div className="rounded-[2.5rem] border-8 border-zinc-900 bg-zinc-950 p-3 shadow-2xl">
            <div className="rounded-[1.75rem] bg-gradient-to-b from-primary/30 via-background to-cyan-500/20 p-4">
              <div className="mb-2 flex items-center justify-between text-[10px] text-foreground/70">
                <span>9:41</span>
                <span>5G</span>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/60 p-3 backdrop-blur">
                <Badge variant="secondary" className="text-[9px]">
                  <Sparkles size={8} className="mr-0.5" /> Wave 4
                </Badge>
                <h3 className="mt-2 text-base font-semibold">110+ components</h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Browse them all in your pocket.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {["UI", "AI", "Motion", "Hooks", "Charts", "Apps"].map((c) => (
                    <div
                      key={c}
                      className="rounded-md border border-border/40 bg-card/40 p-2 text-center text-[10px]"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-2xl font-semibold tracking-tight">Built for builders on the go</h2>
          <ul className="mt-4 space-y-3">
            {[
              { icon: Sparkles, title: "Live theme preview", desc: "Tweak radius / font / gradient on your phone." },
              { icon: Zap, title: "Instant search", desc: "Find any component in under 100ms." },
              { icon: Layers, title: "Offline-first", desc: "Browse 110+ components without WiFi." },
              { icon: Shield, title: "Private by design", desc: "No tracking. No analytics. Just the kit." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.title} className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}