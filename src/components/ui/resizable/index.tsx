"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ResizableProps {
  /** Two children: [panel1, panel2]. */
  children: [React.ReactNode, React.ReactNode];
  /** Initial width of the first panel in % (default 50). */
  initial?: number;
  /** Min / max % for the first panel. */
  min?: number;
  max?: number;
  /** "horizontal" — split side by side. */
  direction?: "horizontal";
  className?: string;
}

/**
 * Two-pane resizable split. Drag the divider to resize. Keyboard
 * accessible (left/right arrows when divider is focused).
 */
export function Resizable({
  children,
  initial = 50,
  min = 10,
  max = 90,
  direction = "horizontal",
  className,
}: ResizableProps) {
  const [pct, setPct] = React.useState(initial);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const dragging = React.useRef(false);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = direction === "horizontal" ? e.clientX - rect.left : e.clientY - rect.top;
      const next = Math.max(min, Math.min(max, (x / rect.width) * 100));
      setPct(next);
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [direction, min, max]);

  return (
    <div
      ref={containerRef}
      className={cn("flex h-full w-full", className)}
      style={{ flexDirection: direction === "horizontal" ? "row" : "column" }}
    >
      <div
        className="overflow-auto"
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${pct}%`,
        }}
      >
        {children[0]}
      </div>
      <div
        role="separator"
        aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
        tabIndex={0}
        onMouseDown={() => {
          dragging.current = true;
          document.body.style.cursor = "col-resize";
        }}
        onKeyDown={(e) => {
          const delta = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -2 : 2;
          if (delta) {
            e.preventDefault();
            setPct((p) => Math.max(min, Math.min(max, p + delta)));
          }
        }}
        className={cn(
          "shrink-0 bg-border transition-colors hover:bg-primary/50 focus-visible:bg-primary/50 focus-visible:outline-none",
          direction === "horizontal"
            ? "w-1 cursor-col-resize"
            : "h-1 cursor-row-resize"
        )}
      />
      <div className="flex-1 overflow-auto">{children[1]}</div>
    </div>
  );
}