import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "@/components/icons";

export interface StepsItem {
  title: string;
  description?: string;
}

export interface StepsProps {
  items: StepsItem[];
  /** 0-based index of the current step. */
  current: number;
  /** "horizontal" or "vertical" layout. */
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Stepper / progress indicator. Each step can be: pending, current, or
 * completed. The connector between them lights up when moving to the next.
 */
export function Steps({
  items,
  current,
  orientation = "horizontal",
  className,
}: StepsProps) {
  const isHoriz = orientation === "horizontal";
  return (
    <ol
      className={cn(
        isHoriz ? "flex w-full items-start" : "flex flex-col",
        className
      )}
    >
      {items.map((item, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        return (
          <li
            key={i}
            className={cn(
              "flex",
              isHoriz
                ? "flex-1 flex-col"
                : "items-start gap-3 pb-6 last:pb-0"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-3",
                !isHoriz && "w-full"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-card text-primary",
                  !isCompleted && !isCurrent && "border-border bg-card text-muted-foreground"
                )}
              >
                {isCompleted ? <Check size={12} /> : i + 1}
              </span>
              {isHoriz && (
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              )}
            </div>
            {!isHoriz && (
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            )}
            {isHoriz && i < items.length - 1 && (
              <div
                aria-hidden
                className={cn(
                  "mx-3 mt-3.5 h-px flex-1 transition-colors",
                  i < current ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}