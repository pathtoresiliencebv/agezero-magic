"use client";

import * as React from "react";

/**
 * Theme store — controls global design tokens (radius, font, gradient,
 * animation). Updates CSS custom properties on :root, persists in
 * localStorage. Used by the Theme Builder widget and the /theme page.
 */

export type RadiusPreset = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type FontPreset = "inter" | "manrope" | "geist" | "sora" | "jetbrains" | "system";
export type GradientPreset =
  | "aurora"
  | "sunset"
  | "ocean"
  | "cosmic"
  | "forest"
  | "candy"
  | "none";
export type AnimationSpeed = "off" | "slow" | "normal" | "fast";

export interface ThemeState {
  radius: RadiusPreset;
  font: FontPreset;
  gradient: GradientPreset;
  animation: AnimationSpeed;
}

const RADII: Record<RadiusPreset, string> = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

const FONTS: Record<FontPreset, string> = {
  inter: "Inter, system-ui, sans-serif",
  manrope: "Manrope, system-ui, sans-serif",
  geist: "Geist, Inter, system-ui, sans-serif",
  sora: "Sora, Inter, system-ui, sans-serif",
  jetbrains: "'JetBrains Mono', ui-monospace, monospace",
  system: "system-ui, sans-serif",
};

const GRADIENTS: Record<GradientPreset, string> = {
  aurora: "linear-gradient(135deg, #7c3aed, #06b6d4)",
  sunset: "linear-gradient(135deg, #f43f5e, #f59e0b)",
  ocean: "linear-gradient(135deg, #0ea5e9, #6366f1)",
  cosmic: "linear-gradient(135deg, #4c1d95, #db2777)",
  forest: "linear-gradient(135deg, #059669, #65a30d)",
  candy: "linear-gradient(135deg, #ec4899, #facc15)",
  none: "none",
};

const SPEEDS: Record<AnimationSpeed, number> = {
  off: 0,
  slow: 1.5,
  normal: 1,
  fast: 0.5,
};

const DEFAULT: ThemeState = {
  radius: "lg",
  font: "inter",
  gradient: "aurora",
  animation: "normal",
};

const STORAGE_KEY = "agezero-ui:theme";

interface ThemeContextValue {
  state: ThemeState;
  set: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
  reset: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ThemeState>(DEFAULT);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...DEFAULT, ...parsed });
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--az-radius", RADII[state.radius]);
    root.style.setProperty("--az-font", FONTS[state.font]);
    root.style.setProperty(
      "--az-animation-scale",
      String(SPEEDS[state.animation])
    );
    if (state.animation === "off") {
      root.setAttribute("data-anim", "off");
    } else if (state.animation === "fast") {
      root.setAttribute("data-anim", "fast");
    } else if (state.animation === "slow") {
      root.setAttribute("data-anim", "slow");
    } else {
      root.setAttribute("data-anim", "normal");
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--az-brand-gradient", GRADIENTS[state.gradient]);
  }, [state.gradient]);

  const set = React.useCallback(
    <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setState(DEFAULT), []);

  return (
    <ThemeContext.Provider value={{ state, set, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    return {
      state: DEFAULT,
      set: () => {},
      reset: () => {},
    } as ThemeContextValue;
  }
  return ctx;
}

export const RADIUS_PRESETS: RadiusPreset[] = [
  "none", "sm", "md", "lg", "xl", "2xl", "full",
];
export const FONT_PRESETS: FontPreset[] = [
  "inter", "manrope", "geist", "sora", "jetbrains", "system",
];
export const GRADIENT_PRESETS: GradientPreset[] = [
  "none", "aurora", "sunset", "ocean", "cosmic", "forest", "candy",
];
export const ANIMATION_PRESETS: AnimationSpeed[] = [
  "off", "slow", "normal", "fast",
];