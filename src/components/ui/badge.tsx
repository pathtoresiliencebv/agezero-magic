import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        warning: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Compact, status-like label — useful for tags, counts, and other
 * low-prominence metadata. Use one of the six variants to set the visual
 * tone.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { badgeVariants };
