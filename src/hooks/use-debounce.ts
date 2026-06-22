"use client";

import * as React from "react";

/**
 * Debounces a fast-changing value (text input, slider, etc.) to a
 * stable value that only updates after `delay` ms of inactivity.
 *
 * Useful for: search inputs that trigger a fetch, sliders that
 * trigger expensive recalc, controlled inputs that need a debounced
 * side effect.
 *
 * @example
 *   const [query, setQuery] = useState("");
 *   const debounced = useDebounce(query, 300);
 *   useEffect(() => { fetch(debounced); }, [debounced]);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
