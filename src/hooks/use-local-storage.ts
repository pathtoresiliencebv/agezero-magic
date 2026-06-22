"use client";

import * as React from "react";

/**
 * Persists a piece of state in localStorage. SSR-safe: returns the
 * initial value during render and hydrates on mount.
 *
 * @example
 *   const [name, setName] = useLocalStorage("name", "Anonymous");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = React.useState<T>(initialValue);

  // Hydrate on mount so SSR markup matches the first client render
  // after `useState` reads `initialValue`.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore parse / storage errors (private mode, quota, etc.)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // swallow
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set];
}
