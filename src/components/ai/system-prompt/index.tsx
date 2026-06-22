import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings } from "@/components/icons";

export interface SystemPromptProps {
  /** The system prompt text. */
  prompt: string;
  /** Token count, shown in the footer. */
  tokenCount?: number;
  /** Optional model name. */
  model?: string;
  className?: string;
}

/**
 * Display a system prompt in a tinted card. Collapsed by default in
 * chat UIs to keep the conversation focused.
 */
export function SystemPrompt({
  prompt,
  tokenCount,
  model,
  className,
}: SystemPromptProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-border bg-muted/20 p-3 text-xs",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Settings size={12} />
        <span className="font-medium uppercase tracking-wider">System</span>
        {model && (
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            {model}
          </span>
        )}
        {tokenCount !== undefined && (
          <span className="ml-auto text-[10px] tabular-nums">
            {tokenCount} tokens
          </span>
        )}
      </div>
      <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground/80">
        {prompt}
      </pre>
    </div>
  );
}