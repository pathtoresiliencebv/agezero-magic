"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Optional class names to merge with the default toggle styles. */
  className?: string;
}

/**
 * Minimal icon button that flips between `light` and `dark` themes.
 *
 * It is intentionally a "dumb" toggle (not a 3-state system/light/dark menu)
 * to keep the foundation track focused. The richer menu/dropdown variant
 * can be built later on top of `useTheme()`.
 */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ className, ...rest }, ref) {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md",
          "border border-border bg-background text-foreground",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...rest}
      >
        <Sun
          className={cn(
            "h-4 w-4 transition-all",
            isDark ? "rotate-90 scale-0" : "rotate-0 scale-100",
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "-ml-4 h-4 w-4 transition-all",
            isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0",
          )}
          aria-hidden="true"
        />
      </button>
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";
