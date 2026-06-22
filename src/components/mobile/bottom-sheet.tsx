"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "@/components/icons";

export interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Snap height in vh (default 50). */
  snapHeight?: number;
  className?: string;
}

/**
 * Modal that slides up from the bottom on mobile. Has a drag handle
 * (visual only — no actual drag in v1) and an X button to dismiss.
 */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  snapHeight = 50,
  className,
}: BottomSheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => onOpenChange(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[90vh] rounded-t-2xl border-t border-border bg-card shadow-2xl transition-transform duration-300 ease-out sm:hidden",
          "will-change-transform",
          open ? "translate-y-0" : "translate-y-full",
          className
        )}
        style={{ minHeight: `${snapHeight}vh` }}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted" />
        <div className="flex items-start justify-between gap-2 px-5 pb-2 pt-3">
          <div className="min-w-0 flex-1">
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="-mr-1 -mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: "calc(90vh - 80px)" }}>
          {children}
        </div>
      </div>
    </>
  );
}
