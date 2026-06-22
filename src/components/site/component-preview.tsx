"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ComponentPreviewProps {
  /** Short descriptive title for the demo. */
  title?: string;
  /** Optional JSX to render. */
  preview: React.ReactNode;
  /** Source code shown in the code panel. */
  code: string;
  /** Optional className for the preview surface. */
  className?: string;
  /**
   * Show a single column (preview only) by default. Users can toggle to
   * "Code" view in a real implementation; for the docs site we just show
   * both stacked vertically with a code block at the bottom.
   */
}

/**
 * Wrapper for showing a live component demo together with the source code
 * needed to render it. Pure presentation — no copy-to-clipboard, that's
 * handled in `<IconTile>`.
 */
export function ComponentPreview({
  title,
  preview,
  code,
  className,
}: ComponentPreviewProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      {title ? (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 text-sm">
          <span className="font-medium text-foreground">{title}</span>
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-h-[160px] items-center justify-center bg-background/40 p-8",
          className
        )}
      >
        {preview}
      </div>
      <pre className="overflow-x-auto border-t border-border/60 bg-muted/30 px-4 py-3 text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
