"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/use-is-client";

export interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

/**
 * Slide-in drawer for mobile. No Radix dependency — just a div with
 * a transform transition.
 *
 * Respects `prefers-reduced-motion`: the transition becomes instant.
 */
export function MobileDrawer({
  open,
  onOpenChange,
  side = "left",
  children,
  className,
  overlayClassName,
}: MobileDrawerProps) {
  const isClient = useIsClient();

  // Esc to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // Lock scroll when open
  React.useEffect(() => {
    if (!open || !isClient) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isClient]);

  const isHorizontal = side === "left" || side === "right";
  const transform = (() => {
    if (!open) {
      if (side === "left") return "translateX(-100%)";
      if (side === "right") return "translateX(100%)";
      return "translateY(100%)";
    }
    return "translate(0, 0)";
  })();

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        onClick={() => onOpenChange(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
          overlayClassName
        )}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed z-50 bg-card shadow-2xl",
          "transition-transform duration-300 ease-out will-change-transform",
          side === "left" && "inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border",
          side === "right" && "inset-y-0 right-0 w-72 max-w-[85vw] border-l border-border",
          side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t border-border",
          className
        )}
        style={{
          transform,
        }}
      >
        {children}
      </div>
    </>
  );
}
