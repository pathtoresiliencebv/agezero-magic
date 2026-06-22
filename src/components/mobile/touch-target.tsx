"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps any element to ensure it meets the 44×44px minimum touch target
 * (Apple HIG / WCAG 2.5.5). Useful for icon buttons in tight toolbars.
 */
export function TouchTarget({
  children,
  className,
  asChild = false,
  size = 44,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  size?: number;
}) {
  const style = { minWidth: size, minHeight: size };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; style?: React.CSSProperties }>;
    return React.cloneElement(child, {
      className: cn(child.props.className, "inline-flex items-center justify-center", className),
      style: { ...child.props.style, ...style },
    });
  }

  return (
    <span
      style={style}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </span>
  );
}
