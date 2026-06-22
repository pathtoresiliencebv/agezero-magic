/**
 * 6 hand-tuned OKLCH theme presets. Each is a complete light + dark
 * pair that swaps the design tokens defined in `globals.css`.
 *
 * Apply with a single class on <html>: `data-theme="blue"`.
 */

export interface ThemePalette {
  light: Record<string, string>;
  dark: Record<string, string>;
}

const token = (l: number, c: number, h: number) => `oklch(${l} ${c} ${h})`;

export const themes: Record<string, ThemePalette> = {
  default: {
    light: {
      "--background": token(1, 0, 0),
      "--foreground": token(0.145, 0, 0),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.145, 0, 0),
      "--primary": token(0.205, 0, 0),
      "--primary-foreground": token(0.985, 0, 0),
      "--muted": token(0.97, 0, 0),
      "--muted-foreground": token(0.556, 0, 0),
      "--border": token(0.922, 0, 0),
      "--ring": token(0.708, 0, 0),
    },
    dark: {
      "--background": token(0.145, 0, 0),
      "--foreground": token(0.985, 0, 0),
      "--card": token(0.205, 0, 0),
      "--card-foreground": token(0.985, 0, 0),
      "--primary": token(0.985, 0, 0),
      "--primary-foreground": token(0.205, 0, 0),
      "--muted": token(0.269, 0, 0),
      "--muted-foreground": token(0.708, 0, 0),
      "--border": token(0.269, 0, 0),
      "--ring": token(0.439, 0, 0),
    },
  },
  blue: {
    light: {
      "--background": token(0.99, 0.005, 250),
      "--foreground": token(0.15, 0.02, 250),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.15, 0.02, 250),
      "--primary": token(0.55, 0.2, 250),
      "--primary-foreground": token(0.99, 0, 0),
      "--muted": token(0.96, 0.01, 250),
      "--muted-foreground": token(0.5, 0.02, 250),
      "--border": token(0.9, 0.01, 250),
      "--ring": token(0.55, 0.2, 250),
    },
    dark: {
      "--background": token(0.16, 0.02, 250),
      "--foreground": token(0.97, 0.005, 250),
      "--card": token(0.21, 0.02, 250),
      "--card-foreground": token(0.97, 0.005, 250),
      "--primary": token(0.7, 0.18, 250),
      "--primary-foreground": token(0.16, 0.02, 250),
      "--muted": token(0.25, 0.02, 250),
      "--muted-foreground": token(0.7, 0.01, 250),
      "--border": token(0.3, 0.02, 250),
      "--ring": token(0.7, 0.18, 250),
    },
  },
  purple: {
    light: {
      "--background": token(0.99, 0.005, 310),
      "--foreground": token(0.15, 0.02, 310),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.15, 0.02, 310),
      "--primary": token(0.55, 0.22, 310),
      "--primary-foreground": token(0.99, 0, 0),
      "--muted": token(0.96, 0.015, 310),
      "--muted-foreground": token(0.5, 0.02, 310),
      "--border": token(0.9, 0.015, 310),
      "--ring": token(0.55, 0.22, 310),
    },
    dark: {
      "--background": token(0.16, 0.02, 310),
      "--foreground": token(0.97, 0.005, 310),
      "--card": token(0.21, 0.025, 310),
      "--card-foreground": token(0.97, 0.005, 310),
      "--primary": token(0.72, 0.2, 310),
      "--primary-foreground": token(0.16, 0.02, 310),
      "--muted": token(0.25, 0.025, 310),
      "--muted-foreground": token(0.7, 0.01, 310),
      "--border": token(0.3, 0.025, 310),
      "--ring": token(0.72, 0.2, 310),
    },
  },
  green: {
    light: {
      "--background": token(0.99, 0.005, 150),
      "--foreground": token(0.15, 0.02, 150),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.15, 0.02, 150),
      "--primary": token(0.55, 0.18, 150),
      "--primary-foreground": token(0.99, 0, 0),
      "--muted": token(0.96, 0.01, 150),
      "--muted-foreground": token(0.5, 0.02, 150),
      "--border": token(0.9, 0.01, 150),
      "--ring": token(0.55, 0.18, 150),
    },
    dark: {
      "--background": token(0.16, 0.02, 150),
      "--foreground": token(0.97, 0.005, 150),
      "--card": token(0.21, 0.02, 150),
      "--card-foreground": token(0.97, 0.005, 150),
      "--primary": token(0.7, 0.17, 150),
      "--primary-foreground": token(0.16, 0.02, 150),
      "--muted": token(0.25, 0.02, 150),
      "--muted-foreground": token(0.7, 0.01, 150),
      "--border": token(0.3, 0.02, 150),
      "--ring": token(0.7, 0.17, 150),
    },
  },
  orange: {
    light: {
      "--background": token(0.99, 0.005, 50),
      "--foreground": token(0.15, 0.02, 50),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.15, 0.02, 50),
      "--primary": token(0.65, 0.2, 50),
      "--primary-foreground": token(0.99, 0, 0),
      "--muted": token(0.96, 0.01, 50),
      "--muted-foreground": token(0.5, 0.02, 50),
      "--border": token(0.9, 0.01, 50),
      "--ring": token(0.65, 0.2, 50),
    },
    dark: {
      "--background": token(0.16, 0.02, 50),
      "--foreground": token(0.97, 0.005, 50),
      "--card": token(0.21, 0.02, 50),
      "--card-foreground": token(0.97, 0.005, 50),
      "--primary": token(0.75, 0.18, 50),
      "--primary-foreground": token(0.16, 0.02, 50),
      "--muted": token(0.25, 0.02, 50),
      "--muted-foreground": token(0.7, 0.01, 50),
      "--border": token(0.3, 0.02, 50),
      "--ring": token(0.75, 0.18, 50),
    },
  },
  rose: {
    light: {
      "--background": token(0.99, 0.005, 0),
      "--foreground": token(0.15, 0.02, 0),
      "--card": token(1, 0, 0),
      "--card-foreground": token(0.15, 0.02, 0),
      "--primary": token(0.6, 0.22, 0),
      "--primary-foreground": token(0.99, 0, 0),
      "--muted": token(0.96, 0.01, 0),
      "--muted-foreground": token(0.5, 0.02, 0),
      "--border": token(0.9, 0.01, 0),
      "--ring": token(0.6, 0.22, 0),
    },
    dark: {
      "--background": token(0.16, 0.02, 0),
      "--foreground": token(0.97, 0.005, 0),
      "--card": token(0.21, 0.02, 0),
      "--card-foreground": token(0.97, 0.005, 0),
      "--primary": token(0.72, 0.2, 0),
      "--primary-foreground": token(0.16, 0.02, 0),
      "--muted": token(0.25, 0.02, 0),
      "--muted-foreground": token(0.7, 0.01, 0),
      "--border": token(0.3, 0.02, 0),
      "--ring": token(0.72, 0.2, 0),
    },
  },
};

export const themeNames = Object.keys(themes);
export type ThemeName = keyof typeof themes;