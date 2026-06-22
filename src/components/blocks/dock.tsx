"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/components/icons";

export interface DockItem {
  label: string;
  href: string;
  icon: React.FC<IconProps>;
}

export interface DockProps {
  items: DockItem[];
  /** Position relative to its container. */
  position?: "bottom" | "top";
  className?: string;
}

/**
 * Dock — a macOS-style floating dock with magnify-on-hover.
 * Pure CSS hover magnification via group-hover + transition.
 */
export function Dock({ items, position = "bottom", className }: DockProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center",
        position === "bottom" ? "bottom-6" : "top-6",
        className
      )}
    >
      <div className="pointer-events-auto flex items-end gap-1 rounded-2xl border border-border/60 bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className="group relative grid h-10 w-10 place-items-center rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-accent"
          >
            <item.icon
              size={20}
              className="text-muted-foreground transition-all group-hover:text-foreground group-hover:[&]:scale-110"
            />
            <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-border/60 bg-background px-2 py-0.5 text-[10px] font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}