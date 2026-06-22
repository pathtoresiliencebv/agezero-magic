"use client";

import * as React from "react";
import type { IconProps } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface IconTileProps {
  /** Display name (e.g. "Brain"). */
  name: string;
  /** The icon component itself. */
  icon: React.FC<IconProps>;
  /** Optional className for the outer tile. */
  className?: string;
}

/**
 * Tiled icon with a name label and click-to-copy import snippet. Used on
 * the /icons page to expose the full set in a discoverable grid.
 */
export function IconTile({ name, icon: Icon, className }: IconTileProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(() => {
    const text = `import { ${name} } from "@/components/icons";`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    }
  }, [name]);

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group flex flex-col items-center justify-center gap-2 rounded-lg border border-border/60 bg-card p-4 transition-colors",
        "hover:border-primary/40 hover:bg-accent/40",
        className
      )}
      aria-label={`Copy import for ${name}`}
    >
      <Icon size={22} className="text-foreground" />
      <span className="text-xs text-muted-foreground group-hover:text-foreground">
        {copied ? "Copied!" : name}
      </span>
    </button>
  );
}
