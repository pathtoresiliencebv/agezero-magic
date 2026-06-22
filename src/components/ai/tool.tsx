"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { ChevronDown, Wrench, Check, Loader, X, Circle } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Tool                                                                      */
/*  A collapsible card for showing a tool invocation and its result.          */
/* -------------------------------------------------------------------------- */

export type ToolState =
  | "pending"
  | "running"
  | "completed"
  | "error"
  | "cancelled";

const toolVariants = cva(
  "my-3 w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      state: {
        pending: "border-dashed border-border",
        running: "border-border",
        completed: "border-border",
        error: "border-destructive/50",
        cancelled: "border-border opacity-70",
      },
    },
    defaultVariants: {
      state: "completed",
    },
  },
);

const stateIcon: Record<ToolState, React.ReactNode> = {
  pending: <Circle size={12} className="text-muted-foreground" />,
  running: (
    <Loader
      size={12}
      className="animate-spin text-foreground"
      style={{ animationDuration: "0.8s" }}
    />
  ),
  completed: <Check size={12} className="text-emerald-500" />,
  error: <X size={12} className="text-destructive" />,
  cancelled: <Circle size={12} className="text-muted-foreground" />,
};

const stateLabel: Record<ToolState, string> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  error: "Error",
  cancelled: "Cancelled",
};

function formatDuration(durationMs: number): string {
  if (!Number.isFinite(durationMs) || durationMs < 0) return "0s";
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  const seconds = durationMs / 1000;
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = Math.round(seconds % 60);
  return `${minutes}m ${rem.toString().padStart(2, "0")}s`;
}

export interface ToolProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  state?: ToolState;
  children?: React.ReactNode;
}

export const Tool = React.forwardRef<HTMLDivElement, ToolProps>(
  function Tool(
    { className, state = "completed", children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="tool"
        data-state={state}
        className={cn(toolVariants({ state }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface ToolHeaderProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /** Title shown for the tool — typically the tool's function name. */
  title?: string;
  state?: ToolState;
  /** Duration in milliseconds. If provided we render "Completed in 0.4s". */
  durationMs?: number;
  /**
   * Inline, machine-friendly arguments preview (e.g. `{query: "weather"}`).
   */
  args?: string;
  children?: React.ReactNode;
}

/**
 * A `<button>` that toggles the tool body. Wrap `ToolContent` somewhere
 * inside the `Tool` to be revealed.
 */
export const ToolHeader = React.forwardRef<HTMLButtonElement, ToolHeaderProps>(
  function ToolHeader(
    { className, title, state = "completed", durationMs, args, children, ...props },
    ref,
  ) {
    // We rely on the parent <details> pattern by switching to a <button> +
    // parent-controlled visibility. To keep this implementation simple we
    // use local state that toggles a data-attribute on the parent.
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      const root = ref && "current" in ref ? ref.current?.parentElement : null;
      if (!root) return;
      const body = root.querySelector<HTMLElement>("[data-slot='tool-content']");
      if (!body) return;
      body.style.display = open ? "block" : "none";
    }, [open, ref]);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-slot="tool-header"
        data-open={open || undefined}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-left text-xs",
          "hover:bg-accent/40 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-background">
          <Wrench size={12} />
        </span>
        <span className="flex-1 truncate text-foreground">
          {title ?? "Tool"}
        </span>
        {args && (
          <span className="hidden truncate text-muted-foreground sm:inline-block sm:max-w-[40%]">
            {args}
          </span>
        )}
        <span className="flex items-center gap-1 text-muted-foreground">
          {stateIcon[state]}
          {state === "completed" && durationMs !== undefined ? (
            <span>{formatDuration(durationMs)}</span>
          ) : (
            <span>{stateLabel[state]}</span>
          )}
        </span>
        <ChevronDown
          size={12}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
        {children}
      </button>
    );
  },
);

export interface ToolNameProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  name: string;
}

/** The function name of the tool. Renders in a `font-mono` chip. */
export const ToolName = React.forwardRef<HTMLSpanElement, ToolNameProps>(
  function ToolName({ name, className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="tool-name"
        className={cn(
          "rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-foreground",
          className,
        )}
        {...props}
      >
        {name}
      </span>
    );
  },
);

export interface ToolOutputProps
  extends Omit<React.HTMLAttributes<HTMLPreElement>, "children"> {
  /** Pre-formatted output text. */
  output: string;
  /** Optional language label for the code block. */
  language?: string;
}

/**
 * Monospace, scrollable output. Trims long lines and caps the visible height
 * to keep the conversation scannable.
 */
export const ToolOutput = React.forwardRef<HTMLPreElement, ToolOutputProps>(
  function ToolOutput(
    { output, language, className, ...props },
    ref,
  ) {
    return (
      <pre
        ref={ref}
        data-slot="tool-output"
        data-language={language}
        className={cn(
          "m-0 max-h-80 overflow-auto bg-muted/60 px-4 py-3",
          "font-mono text-[12px] leading-relaxed text-foreground",
          "border-t border-border",
          className,
        )}
        {...props}
      >
        <code>{output}</code>
      </pre>
    );
  },
);

export {
  toolVariants,
  formatDuration as formatToolDuration,
  stateIcon as toolStateIcon,
  stateLabel as toolStateLabel,
};
