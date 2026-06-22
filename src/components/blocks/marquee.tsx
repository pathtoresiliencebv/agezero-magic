"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
  key?: string;
  content: React.ReactNode;
}

export interface MarqueeProps {
  items: MarqueeItem[];
  /** Direction of scroll. Default "left". */
  direction?: "left" | "right";
  /** Seconds for one full pass. */
  speed?: number;
  /** Pause animation on hover. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Marquee — an infinite horizontally scrolling strip. Renders the items
 * twice so the loop is seamless. Pure CSS animation, no JS state.
 */
export function Marquee({
  items,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-border/60 py-8",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max gap-12",
          animClass,
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-12" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <div
                key={`${dup}-${item.key ?? i}`}
                className="flex shrink-0 items-center text-2xl font-semibold tracking-tight text-muted-foreground/50"
              >
                {item.content}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}