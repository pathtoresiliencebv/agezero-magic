"use client";

import * as React from "react";

interface UseIntersectionOptions extends IntersectionObserverInit {
  /** When true, stops observing after the first intersection. */
  freezeOnceVisible?: boolean;
}

/**
 * Wraps IntersectionObserver. Returns a tuple of `[ref, isIntersecting,
 * entry]` — pass `ref` to the element you want to watch.
 *
 * @example
 *   const [ref, visible] = useIntersection({ threshold: 0.5 });
 *   return <div ref={ref}>{visible && "On screen!"}</div>;
 */
export function useIntersection<T extends Element = HTMLDivElement>(
  options: UseIntersectionOptions = {}
): [
  React.RefCallback<T>,
  boolean | undefined,
  IntersectionObserverEntry | undefined
] {
  const { freezeOnceVisible = false, ...init } = options;
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
  const [isIntersecting, setIntersecting] = React.useState<boolean>();
  const frozenRef = React.useRef(false);

  const ref = React.useCallback(
    (node: T | null) => {
      if (typeof window === "undefined" || !("IntersectionObserver" in window))
        return;
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          setEntry(e);
          setIntersecting(e.isIntersecting);
          if (freezeOnceVisible && e.isIntersecting && !frozenRef.current) {
            frozenRef.current = true;
            observer.disconnect();
          }
        },
        init
      );
      observer.observe(node);
      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [freezeOnceVisible, JSON.stringify(init)]
  );

  return [ref, isIntersecting, entry];
}
