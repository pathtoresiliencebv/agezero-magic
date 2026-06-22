"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  /** Phrases to cycle through. If empty, the single `text` prop is used. */
  phrases?: string[];
  /** Static text when `phrases` is empty. */
  text?: string;
  /** Typing speed in ms per character. */
  speed?: number;
  /** Pause at the end of a phrase in ms. */
  pause?: number;
  className?: string;
}

/**
 * Typewriter — types out text character by character. If `phrases` is
 * provided, it cycles through them, deleting and retyping.
 */
export function Typewriter({
  phrases,
  text,
  speed = 40,
  pause = 1200,
  className,
}: TypewriterProps) {
  const list = phrases ?? (text ? [text] : []);
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [displayed, setDisplayed] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (list.length === 0) return;
    const current = list[phraseIndex] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % list.length);
    } else {
      timer = setTimeout(
        () => {
          setDisplayed((d) =>
            deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, phraseIndex, list, speed, pause]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{displayed || "\u00A0"}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[1ch] animate-pulse bg-foreground"
      />
    </span>
  );
}