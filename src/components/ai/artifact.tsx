"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { X, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Artifact                                                                  */
/*  A panel for previewing generated content (HTML, SVG, code, etc.).        */
/* -------------------------------------------------------------------------- */

const artifactVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        outline: "border-dashed border-border",
        embedded: "border-border/60 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ArtifactProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof artifactVariants>["variant"];
  children?: React.ReactNode;
}

/**
 * The outer panel. Children are typically `ArtifactHeader` and
 * `ArtifactContent` (in that order).
 */
export const Artifact = React.forwardRef<HTMLDivElement, ArtifactProps>(
  function Artifact({ className, variant, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="artifact"
        className={cn(artifactVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface ArtifactHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Optional icon shown next to the title. */
  icon?: React.ReactNode;
  /** Title text. */
  title?: string;
  /** Optional subtitle or status (e.g. "Generated 2s ago"). */
  description?: React.ReactNode;
  /** Called when the close button is clicked. */
  onClose?: () => void;
  /** Hide the close button. */
  hideClose?: boolean;
  /** Right-aligned action elements (tabs, share, etc.). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const ArtifactHeader = React.forwardRef<
  HTMLDivElement,
  ArtifactHeaderProps
>(function ArtifactHeader(
  {
    className,
    icon,
    title = "Artifact",
    description,
    onClose,
    hideClose = false,
    actions,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="artifact-header"
      className={cn(
        "flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-2.5",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
          {icon ?? <Sparkles size={14} />}
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold">{title}</span>
          {description && (
            <span className="truncate text-[11px] text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {actions}
        {!hideClose && onClose && (
          <button
            type="button"
            aria-label="Close artifact"
            onClick={onClose}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-md",
              "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "transition-colors",
            )}
          >
            <X size={14} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
});

export interface ArtifactContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding preset. */
  spacing?: "none" | "tight" | "normal" | "loose";
}

/**
 * The scrollable body of an `Artifact`. Caps the height so nested previews
 * cannot push the rest of the page.
 */
export const ArtifactContent = React.forwardRef<
  HTMLDivElement,
  ArtifactContentProps
>(function ArtifactContent(
  { className, spacing = "normal", children, ...props },
  ref,
) {
  const padding =
    spacing === "none"
      ? ""
      : spacing === "tight"
        ? "p-2"
        : spacing === "loose"
          ? "p-8"
          : "p-4";
  return (
    <div
      ref={ref}
      data-slot="artifact-content"
      className={cn(
        "min-h-0 flex-1 overflow-auto",
        padding,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export { artifactVariants };
