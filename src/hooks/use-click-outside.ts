"use client";

import * as React from "react";

/**
 * Calls `handler` when a pointer event fires outside the given ref.
 * Use for closing popovers, dropdowns, dialogs, and side panels.
 *
 * @example
 *   const ref = useRef<HTMLDivElement>(null);
 *   useClickOutside(ref, () => setOpen(false));
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
