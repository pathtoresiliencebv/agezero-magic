"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/** Tooltip provider — should wrap any part of the tree that uses tooltips. */
export const TooltipProvider = TooltipPrimitive.Provider;

/** Root `Tooltip` — controls open / close state. */
export const Tooltip = TooltipPrimitive.Root;

/** The trigger element (hoverable, focusable). */
export const TooltipTrigger = TooltipPrimitive.Trigger;

/** A portal for the tooltip content. */
export const TooltipPortal = TooltipPrimitive.Portal;

/**
 * The visible tooltip content. Renders inside a portal and animates in /
 * out with the JSN keyframes.
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = "TooltipContent";

/** Optional arrow that points back at the trigger. */
export const TooltipArrow = TooltipPrimitive.Arrow;
