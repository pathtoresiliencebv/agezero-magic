"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  /** Open delay in ms (default 200). */
  openDelay?: number;
  /** Close delay in ms (default 100). */
  closeDelay?: number;
  className?: string;
}

/**
 * Hover-revealed card. The popover appears on hover (not click).
 * Pure-CSS, no Radix dependency.
 */
export function HoverCard({
  trigger,
  children,
  openDelay = 200,
  closeDelay = 100,
  className,
}: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const openTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleOpen = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const handleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {trigger}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-lg border border-border bg-card p-3 text-left text-sm shadow-2xl",
            className
          )}
        >
          {children}
        </span>
      )}
    </span>
  );
}