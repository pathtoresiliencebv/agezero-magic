import * as React from "react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="inline-flex" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.round(value);
          return (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              className={filled ? "text-amber-500" : "text-muted-foreground/40"}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count.toLocaleString()})</span>
      )}
    </div>
  );
}