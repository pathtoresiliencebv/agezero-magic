"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Loader, Plus, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  PromptInput                                                               */
/*  A modern chat-style prompt with an auto-growing textarea, a tools row,     */
/*  and a loading-aware submit button.                                        */
/* -------------------------------------------------------------------------- */

const promptInputVariants = cva(
  "relative flex w-full flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        ghost: "border-transparent bg-muted/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PromptInputProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Called when the user submits the form (Enter without shift, or via the
   * submit button). Receives the current value of the textarea.
   */
  onSubmit?: (value: string) => void;
  /**
   * Called whenever the textarea value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * When `true`, the submit button shows a spinner and submission is
   * disabled. Use this while waiting for a model response.
   */
  isLoading?: boolean;
  /**
   * Default (uncontrolled) value.
   */
  defaultValue?: string;
  /**
   * Controlled value. If both `defaultValue` and `value` are omitted the
   * component manages its own state.
   */
  value?: string;
  variant?: VariantProps<typeof promptInputVariants>["variant"];
}

export const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  function PromptInput(
    {
      className,
      onSubmit,
      onValueChange,
      isLoading = false,
      defaultValue,
      value: valueProp,
      variant,
      children,
      ...props
    },
    ref,
  ) {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const value = isControlled ? valueProp : internalValue;

    const handleSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;
        const trimmed = value.trim();
        if (trimmed.length === 0) return;
        onSubmit?.(trimmed);
        if (!isControlled) setInternalValue("");
      },
      [isLoading, value, onSubmit, isControlled],
    );

    const handleValueChange = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    return (
      <form
        ref={ref}
        data-slot="prompt-input"
        data-loading={isLoading || undefined}
        onSubmit={handleSubmit}
        className={cn(promptInputVariants({ variant }), className)}
        {...props}
      >
        <PromptInputContext.Provider
          value={{
            value,
            isLoading,
            onValueChange: handleValueChange,
            onSubmit: () => handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>),
          }}
        >
          {children}
        </PromptInputContext.Provider>
      </form>
    );
  },
);

interface PromptInputContextValue {
  value: string;
  isLoading: boolean;
  onValueChange: (next: string) => void;
  onSubmit: () => void;
}

const PromptInputContext = React.createContext<PromptInputContextValue | null>(
  null,
);

function usePromptInputContext(component: string): PromptInputContextValue {
  const ctx = React.useContext(PromptInputContext);
  if (!ctx) {
    throw new Error(`${component} must be used inside a <PromptInput>.`);
  }
  return ctx;
}

export interface PromptInputTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  /**
   * Minimum number of visible rows. Default `1`.
   */
  minRows?: number;
  /**
   * Maximum number of visible rows before the textarea starts scrolling.
   * Default `8`.
   */
  maxRows?: number;
}

export const PromptInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PromptInputTextareaProps
>(function PromptInputTextarea(
  { className,
    minRows = 1,
    maxRows = 8,
    onKeyDown,
    placeholder = "Send a message…",
    disabled,
    ...props },
  ref,
) {
  const ctx = usePromptInputContext("PromptInputTextarea");
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  // Forward ref + internal ref.
  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
      }
    },
    [ref],
  );

  /**
   * Auto-grow logic: measure `scrollHeight` after every value change and
   * resize the textarea up to `maxRows`. Reset to `minRows` on empty value.
   */
  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Reset to measure natural height.
    el.style.height = "auto";

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
    const minHeight = lineHeight * minRows + 16; // 16 = 2 * padding-y
    const maxHeight = lineHeight * maxRows + 16;

    const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [ctx.value, minRows, maxRows]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      // Enter submits, Shift+Enter inserts a newline.
      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault();
        ctx.onSubmit();
      }
    },
    [ctx, onKeyDown],
  );

  return (
    <textarea
      ref={setRefs}
      data-slot="prompt-input-textarea"
      rows={minRows}
      value={ctx.value}
      onChange={(event) => ctx.onValueChange(event.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full resize-none border-0 bg-transparent px-4 pt-3 pb-1",
        "text-sm leading-relaxed text-card-foreground placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
});

export type PromptInputToolsProps =
  React.HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = React.forwardRef<
  HTMLDivElement,
  PromptInputToolsProps
>(function PromptInputTools({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="prompt-input-tools"
      className={cn(
        "flex items-center justify-between gap-2 px-2 pb-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export interface PromptInputActionMenuProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "type"> {
  /** Accessible label for the trigger. */
  label?: string;
  /** Optional icon. Defaults to Plus. */
  icon?: React.ReactNode;
  /** Button type. Defaults to "button". */
  type?: "button" | "submit" | "reset";
}

export const PromptInputActionMenu = React.forwardRef<
  HTMLButtonElement,
  PromptInputActionMenuProps
>(function PromptInputActionMenu(
  { className,
    label = "Add attachments or tools",
    icon,
    children,
    type = "button",
    ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      data-slot="prompt-input-action-menu"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "border border-border bg-background text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors",
        className,
      )}
      {...props}
    >
      {icon ?? <Plus size={16} />}
      {children}
    </button>
  );
});

export interface PromptInputSubmitProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Show loading spinner and disable interaction. */
  isLoading?: boolean;
  /** Label shown next to the icon when not loading. */
  label?: string;
  /** Custom icon for the non-loading state. Defaults to ArrowRight. */
  icon?: React.ReactNode;
}

export const PromptInputSubmit = React.forwardRef<
  HTMLButtonElement,
  PromptInputSubmitProps
>(function PromptInputSubmit(
  { className,
    isLoading: isLoadingProp,
    label,
    icon,
    type = "submit",
    children,
    ...props },
  ref,
) {
  const ctx = usePromptInputContext("PromptInputSubmit");
  const isLoading = isLoadingProp ?? ctx.isLoading;
  const disabled = isLoading || props.disabled;

  return (
    <button
      ref={ref}
      type={type}
      aria-label={isLoading ? "Sending…" : label ?? "Send"}
      data-slot="prompt-input-submit"
      data-loading={isLoading || undefined}
      disabled={disabled}
      className={cn(
        "ml-auto inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium",
        "bg-primary text-primary-foreground shadow-sm",
        "hover:opacity-90 active:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "transition-opacity",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader
            size={14}
            className="animate-spin"
            style={{ animationDuration: "0.8s" }}
          />
          <span>Thinking…</span>
        </>
      ) : (
        <>
          {label && <span>{label}</span>}
          {icon ?? <ArrowRight size={14} />}
        </>
      )}
      {children}
    </button>
  );
});

export { promptInputVariants };
