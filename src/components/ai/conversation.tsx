"use client";

import * as React from "react";

import { ChevronDown, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Conversation                                                              */
/*  A scrollable container with auto-scroll-to-bottom behavior, an empty      */
/*  state slot, and a "scroll to latest" floating button.                     */
/* -------------------------------------------------------------------------- */

export interface ConversationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If `true` (default), the container scrolls to the bottom on every
   * children change. Set to `false` for manual control.
   */
  autoScroll?: boolean;
}

/**
 * The outer scroll container. It exposes a forwarded ref so consumers can
 * hook into the underlying `<div>` for things like windowing or virtualization.
 */
export const Conversation = React.forwardRef<
  HTMLDivElement,
  ConversationProps
>(function Conversation(
  { autoScroll = true, className, children, ...props },
  ref,
) {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  // Combine forwarded ref with our internal ref.
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  // Auto-scroll to bottom on every children change when enabled.
  React.useEffect(() => {
    if (!autoScroll) return;
    const el = innerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [autoScroll, children]);

  const onScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const el = event.currentTarget;
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollButton(distanceFromBottom > 80);
      props.onScroll?.(event);
    },
    [props],
  );

  const scrollToBottom = React.useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={setRefs}
      data-slot="conversation"
      onScroll={onScroll}
      className={cn(
        "relative flex h-full w-full flex-col overflow-y-auto overscroll-contain",
        className,
      )}
      {...props}
    >
      {children}
      {showScrollButton && (
        <ConversationScrollButton onClick={scrollToBottom} />
      )}
    </div>
  );
});

export interface ConversationContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding around the messages. */
  spacing?: "none" | "tight" | "normal" | "loose";
}

export const ConversationContent = React.forwardRef<
  HTMLDivElement,
  ConversationContentProps
>(function ConversationContent(
  { spacing = "normal", className, children, ...props },
  ref,
) {
  const padding =
    spacing === "none"
      ? ""
      : spacing === "tight"
        ? "px-3 py-2"
        : spacing === "loose"
          ? "px-8 py-8"
          : "px-4 py-4";
  return (
    <div
      ref={ref}
      data-slot="conversation-content"
      className={cn("mx-auto flex w-full max-w-3xl flex-col gap-1", padding, className)}
      {...props}
    >
      {children}
    </div>
  );
});

export interface ConversationEmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Title shown in the empty state. */
  title?: string;
  /** Description shown below the title. */
  description?: string;
  /** Custom icon — defaults to Sparkles. */
  icon?: React.ReactNode;
}

export const ConversationEmptyState = React.forwardRef<
  HTMLDivElement,
  ConversationEmptyStateProps
>(function ConversationEmptyState(
  {
    title = "Start a conversation",
    description = "Ask anything — the assistant will reply here.",
    icon,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="conversation-empty"
      className={cn(
        "mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 px-4 py-16 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm">
        {icon ?? <Sparkles size={20} />}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
});

export type ConversationScrollButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Floating circular button rendered in the bottom-right of a `Conversation`
 * when the user has scrolled up. Clicking it scrolls back to the latest
 * message.
 */
export const ConversationScrollButton = React.forwardRef<
  HTMLButtonElement,
  ConversationScrollButtonProps
>(function ConversationScrollButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Scroll to latest message"
      data-slot="conversation-scroll-button"
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full",
        "border border-border bg-card text-foreground shadow-md",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors",
        className,
      )}
      {...props}
    >
      <ChevronDown size={16} />
    </button>
  );
});
