"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { ChevronDown, Brain } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Reasoning                                                                 */
/*  A collapsible block for showing chain-of-thought / step-by-step           */
/*  explanations emitted by the model.                                        */
/* -------------------------------------------------------------------------- */

const reasoningVariants = cva(
  "my-3 w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      state: {
        thinking: "border-dashed",
        done: "border-solid",
      },
    },
    defaultVariants: {
      state: "done",
    },
  },
);

/**
 * Format a millisecond count as a short duration string ("1.4s", "32s", etc).
 */
function formatDuration(durationMs: number): string {
  if (!Number.isFinite(durationMs) || durationMs < 0) return "0s";
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  const seconds = durationMs / 1000;
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = Math.round(seconds % 60);
  return `${minutes}m ${rem.toString().padStart(2, "0")}s`;
}

export interface ReasoningProps
  extends Omit<React.HTMLAttributes<HTMLDetailsElement>, "children"> {
  /**
   * Whether the panel is currently streaming reasoning. Drives the visual
   * treatment and the default open/closed behavior.
   */
  isStreaming?: boolean;
  /**
   * If `true`, the reasoning panel starts open. Defaults to `true` while
   * streaming and `false` afterwards.
   */
  defaultOpen?: boolean;
  /**
   * Optional duration in milliseconds — when provided the trigger shows
   * "Thought for X.Xs" instead of the default copy.
   */
  durationMs?: number;
  children?: React.ReactNode;
}

export const Reasoning = React.forwardRef<HTMLDetailsElement, ReasoningProps>(
  function Reasoning(
    {
      className,
      isStreaming = false,
      defaultOpen,
      durationMs,
      children,
      ...props
    },
    ref,
  ) {
    const open =
      defaultOpen ?? isStreaming;
    const state: VariantProps<typeof reasoningVariants>["state"] = isStreaming
      ? "thinking"
      : "done";

    return (
      <details
        ref={ref}
        data-slot="reasoning"
        data-state={isStreaming ? "thinking" : "done"}
        data-duration-ms={durationMs}
        open={open}
        className={cn(reasoningVariants({ state }), className)}
        {...props}
      >
        {children}
      </details>
    );
  },
);

export interface ReasoningTriggerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Optional duration to display in the trigger. Overrides the parent
   * `Reasoning`'s `durationMs`.
   */
  durationMs?: number;
  /** Title text shown alongside the icon. Default: "Reasoning". */
  title?: string;
  children?: React.ReactNode;
}

/**
 * The collapsible trigger. We use `<summary>` so the element works without
 * JavaScript and inherits native disclosure behavior. The chevron rotates
 * using `details[open] > summary > .chevron`.
 */
export const ReasoningTrigger = React.forwardRef<
  HTMLElement,
  ReasoningTriggerProps
>(function ReasoningTrigger(
  { className,
    durationMs,
    title = "Reasoning",
    children,
    ...props },
  ref,
) {
  // Walk up the DOM to find the surrounding <details> element to read its
  // duration and streaming state from props (passed by the parent).
  const detailsRef = React.useRef<HTMLDetailsElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
      detailsRef.current = node?.closest("details") ?? null;
    },
    [ref],
  );

  // Resolve the effective duration from the closest <details data-...> attrs.
  // We avoid React Context for SSR simplicity and read via attribute.
  const [effectiveDuration, setEffectiveDuration] = React.useState<
    number | undefined
  >(durationMs);
  React.useEffect(() => {
    if (durationMs !== undefined) {
      setEffectiveDuration(durationMs);
      return;
    }
    const el = detailsRef.current;
    if (!el) return;
    const raw = el.getAttribute("data-duration-ms");
    if (raw) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) setEffectiveDuration(parsed);
    }
  }, [durationMs]);

  const isStreaming =
    detailsRef.current?.getAttribute("data-state") === "thinking";

  return (
    <summary
      ref={setRefs}
      data-slot="reasoning-trigger"
      className={cn(
        "flex cursor-pointer list-none items-center gap-2 px-3 py-2 select-none",
        "text-xs font-medium text-muted-foreground hover:text-foreground",
        "[&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      <Brain
        size={14}
        className={cn(
          isStreaming && "animate-pulse text-foreground",
        )}
      />
      <span className="flex-1 truncate">
        {isStreaming
          ? "Thinking…"
          : effectiveDuration !== undefined
            ? `Thought for ${formatDuration(effectiveDuration)}`
            : title}
      </span>
      <ChevronDown
        size={14}
        className="transition-transform duration-200 group-open:rotate-180 [[open]>&]:rotate-180"
      />
      {children}
    </summary>
  );
});

export type ReasoningContentProps =
  React.HTMLAttributes<HTMLDivElement>;

/**
 * The collapsible body of a `Reasoning`. Animates height with a CSS-only
 * transition that works with the native `<details>` element.
 */
export const ReasoningContent = React.forwardRef<
  HTMLDivElement,
  ReasoningContentProps
>(function ReasoningContent({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="reasoning-content"
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out",
        // When the surrounding <details> is open, switch to 1fr.
        "open:[[open]_&]:grid-rows-[1fr]",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
});

export { reasoningVariants, formatDuration };
