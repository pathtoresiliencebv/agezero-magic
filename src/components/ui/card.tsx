import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The root `Card` container — a neutral surface with a border, radius, and
 * subtle shadow. Most of the time you will compose it with the helper
 * sub-components below (`CardHeader`, `CardTitle`, `CardDescription`,
 * `CardContent`, `CardFooter`, `CardAction`).
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

/**
 * Header region of a `Card`. Use it to wrap the title + description (and
 * optionally the `CardAction`).
 */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn("flex flex-col gap-1.5 p-6", className)}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

/**
 * The main heading of a card. Renders an `<h3>` by default — override with
 * `asChild` if you need a different heading level.
 */
export const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

/**
 * Supporting copy displayed under a `CardTitle`. Use for one short
 * sentence of context.
 */
export const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

/**
 * Action area in the top-right corner of a `CardHeader` — typically a small
 * button, badge, or icon. The component is absolutely positioned so the
 * header content underneath it remains vertically centered.
 */
export const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(
          "absolute right-4 top-4 flex items-center justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);
CardAction.displayName = "CardAction";

/**
 * Main body region of a `Card`. Use it for the actual content (text, media,
 * nested components, …).
 */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("p-6 pt-0", className)}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

/**
 * Footer region of a `Card` — typically a row of buttons, links, or meta
 * information. Top-bordered by default so it visually separates from the
 * content area.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center gap-2 border-t border-border p-6", className)}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";
