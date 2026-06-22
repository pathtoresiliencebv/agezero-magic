"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Loader                                                                    */
/*  Three loading-indicator variants. All animate via Tailwind / CSS only.    */
/* -------------------------------------------------------------------------- */

const loaderVariants = cva("inline-flex items-center gap-1.5", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const dotSize: Record<NonNullable<VariantProps<typeof loaderVariants>["size"]>, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const spinnerSize: Record<
  NonNullable<VariantProps<typeof loaderVariants>["size"]>,
  string
> = {
  sm: "h-3 w-3 border-[1.5px]",
  md: "h-4 w-4 border-2",
  lg: "h-5 w-5 border-[2.5px]",
};

const barSize: Record<
  NonNullable<VariantProps<typeof loaderVariants>["size"]>,
  string
> = {
  sm: "h-2 w-0.5",
  md: "h-3 w-1",
  lg: "h-4 w-1.5",
};

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: VariantProps<typeof loaderVariants>["size"];
  /** Optional accessible label. */
  label?: string;
}

/**
 * Three pulsing dots with a staggered animation. The default loader.
 */
export const LoaderDots: React.FC<LoaderProps> = ({
  className,
  size = "md",
  label = "Loading",
  ...props
}) => (
  <div
    role="status"
    aria-label={label}
    data-slot="loader-dots"
    className={cn(loaderVariants({ size }), className)}
    {...props}
  >
    <span
      className={cn(
        "rounded-full bg-current opacity-60",
        dotSize[size ?? "md"],
        "animate-bounce [animation-delay:-0.3s]",
      )}
    />
    <span
      className={cn(
        "rounded-full bg-current opacity-75",
        dotSize[size ?? "md"],
        "animate-bounce [animation-delay:-0.15s]",
      )}
    />
    <span
      className={cn(
        "rounded-full bg-current",
        dotSize[size ?? "md"],
        "animate-bounce",
      )}
    />
  </div>
);

/**
 * A spinner ring that rotates using a CSS animation. Uses the existing
 * `Loader` icon for the path, so it stays on-brand.
 */
export const LoaderSpinner: React.FC<LoaderProps> = ({
  className,
  size = "md",
  label = "Loading",
  ...props
}) => {
  const dim = spinnerSize[size ?? "md"];
  return (
    <div
      role="status"
      aria-label={label}
      data-slot="loader-spinner"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "inline-block rounded-full border-current border-t-transparent animate-spin",
          dim,
        )}
        style={{ animationDuration: "0.8s" }}
      />
    </div>
  );
};

/**
 * Three vertical bars whose height oscillates, evoking a sound-wave / volume
 * indicator.
 */
export const LoaderBars: React.FC<LoaderProps> = ({
  className,
  size = "md",
  label = "Loading",
  ...props
}) => (
  <div
    role="status"
    aria-label={label}
    data-slot="loader-bars"
    className={cn(loaderVariants({ size }), className)}
    {...props}
  >
    <span
      className={cn(
        "rounded-sm bg-current origin-bottom",
        barSize[size ?? "md"],
        "animate-[az-loader-bar_1s_ease-in-out_infinite]",
      )}
      style={{ animationDelay: "-0.3s" }}
    />
    <span
      className={cn(
        "rounded-sm bg-current origin-bottom",
        barSize[size ?? "md"],
        "animate-[az-loader-bar_1s_ease-in-out_infinite]",
      )}
      style={{ animationDelay: "-0.15s" }}
    />
    <span
      className={cn(
        "rounded-sm bg-current origin-bottom",
        barSize[size ?? "md"],
        "animate-[az-loader-bar_1s_ease-in-out_infinite]",
      )}
    />
  </div>
);

/**
 * Generic `Loader` — defaults to `LoaderDots` so consumers can just import
 * `{ Loader }` for the common case.
 */
export const Loader: React.FC<LoaderProps> = LoaderDots;

export { loaderVariants };
