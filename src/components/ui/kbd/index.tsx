import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional label. Defaults to rendering `children`. */
  children: React.ReactNode;
}

/**
 * Inline keyboard shortcut display. Use inside a tooltip or button label
 * to show a shortcut. e.g. <Kbd>⌘K</Kbd>
 */
export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 select-none items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}