"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StreamingTextProps {
  /** The text to render. Each char added per tick simulates a stream. */
  text: string;
  /** Characters per second (default 40). */
  speed?: number;
  /** Cursor character to show while streaming (default "▍"). */
  cursor?: string | null;
  /** Show the cursor after streaming finishes (default false). */
  keepCursor?: boolean;
  /** Delay before starting in ms. */
  delay?: number;
  className?: string;
}

/**
 * Incremental text rendering with a blinking cursor. Useful for
 * simulating LLM streaming output in demos and playgrounds.
 */
export const StreamingText = React.forwardRef<HTMLSpanElement, StreamingTextProps>(
  function StreamingText(
    { text, speed = 40, cursor = "▍", keepCursor = false, delay = 0, className },
    ref
  ) {
    const [shown, setShown] = React.useState(0);
    const [started, setStarted] = React.useState(false);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
      let startTimer: ReturnType<typeof setTimeout>;
      let interval: ReturnType<typeof setInterval> | undefined;
      if (delay > 0) {
        startTimer = setTimeout(() => setStarted(true), delay);
      } else {
        setStarted(true);
      }
      return () => {
        clearTimeout(startTimer);
        if (interval) clearInterval(interval);
      };
    }, [delay]);

    React.useEffect(() => {
      if (!started) return;
      setShown(0);
      setDone(false);
      const total = text.length;
      if (total === 0) {
        setDone(true);
        return;
      }
      const stepMs = 1000 / speed;
      const id = setInterval(() => {
        setShown((n) => {
          if (n >= total) {
            clearInterval(id);
            setDone(true);
            return total;
          }
          return n + 1;
        });
      }, stepMs);
      return () => clearInterval(id);
    }, [text, speed, started]);

    const showCursor = cursor && (!done || keepCursor);

    return (
      <span ref={ref} className={cn("whitespace-pre-wrap", className)}>
        {text.slice(0, shown)}
        {showCursor && (
          <span
            aria-hidden
            className="ml-px inline-block w-[0.55em] -mb-px animate-pulse"
          >
            {cursor}
          </span>
        )}
      </span>
    );
  }
);