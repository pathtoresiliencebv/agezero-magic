"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useTheme,
  RADIUS_PRESETS,
  FONT_PRESETS,
  GRADIENT_PRESETS,
  ANIMATION_PRESETS,
  type RadiusPreset,
  type FontPreset,
  type GradientPreset,
  type AnimationSpeed,
} from "@/lib/theme-store";
import { Sparkles, Settings, X, RefreshCw } from "@/components/icons";

/**
 * Sticky floating theme builder. Collapsed by default — click the
 * floating button to open. Controls global radius / font / gradient /
 * animation tokens.
 */
export function ThemeBuilderWidget() {
  const [open, setOpen] = React.useState(false);
  const { state, set, reset } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <div
          className={cn(
            "w-80 max-w-[calc(100vw-2rem)] origin-bottom-right rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur",
            "animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={14} className="text-primary" />
              Theme Builder
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                aria-label="Reset"
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <RefreshCw size={12} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          <Section label="Radius">
            <ChipGroup
              value={state.radius}
              options={RADIUS_PRESETS}
              onChange={(v) => set("radius", v as RadiusPreset)}
              labels={(v) => v}
            />
          </Section>

          <Section label="Font">
            <ChipGroup
              value={state.font}
              options={FONT_PRESETS}
              onChange={(v) => set("font", v as FontPreset)}
              labels={(v) => v}
            />
          </Section>

          <Section label="Gradient">
            <div className="grid grid-cols-4 gap-1.5">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set("gradient", g as GradientPreset)}
                  aria-label={g}
                  aria-pressed={state.gradient === g}
                  className={cn(
                    "h-7 rounded-md border text-[10px] font-medium uppercase tracking-wider",
                    state.gradient === g
                      ? "border-primary text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  )}
                  style={
                    g === "none"
                      ? { background: "transparent" }
                      : {
                          backgroundImage:
                            g === "aurora"
                              ? "linear-gradient(135deg,#7c3aed,#06b6d4)"
                              : g === "sunset"
                                ? "linear-gradient(135deg,#f43f5e,#f59e0b)"
                                : g === "ocean"
                                  ? "linear-gradient(135deg,#0ea5e9,#6366f1)"
                                  : g === "cosmic"
                                    ? "linear-gradient(135deg,#4c1d95,#db2777)"
                                    : g === "forest"
                                      ? "linear-gradient(135deg,#059669,#65a30d)"
                                      : "linear-gradient(135deg,#ec4899,#facc15)",
                        }
                  }
                >
                  {g === "none" ? "—" : ""}
                </button>
              ))}
            </div>
          </Section>

          <Section label="Animation">
            <ChipGroup
              value={state.animation}
              options={ANIMATION_PRESETS}
              onChange={(v) => set("animation", v as AnimationSpeed)}
              labels={(v) => v}
            />
          </Section>

          <div className="mt-3 rounded-md border border-dashed border-border bg-background/40 p-2 text-[10px] text-muted-foreground">
            <code className="font-mono">--az-radius: {state.radius}</code>
            <br />
            <code className="font-mono">--az-font: {state.font}</code>
            <br />
            <code className="font-mono">--az-brand-gradient: {state.gradient}</code>
            <br />
            <code className="font-mono">--az-animation-scale: {state.animation}</code>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open theme builder"
        className={cn(
          "flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xl transition-transform hover:scale-105",
          "bg-[image:var(--az-brand-gradient)]"
        )}
      >
        <Settings size={20} className="text-white" />
      </button>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function ChipGroup<T extends string>({
  value,
  options,
  onChange,
  labels,
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  labels: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-md border px-2 py-1 text-[10px] font-medium transition-colors",
            value === o
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          {labels(o)}
        </button>
      ))}
    </div>
  );
}