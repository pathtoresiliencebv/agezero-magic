"use client";

import * as React from "react";

/**
 * Returns `true` after the component has mounted on the client.
 * Use to gate code that can't run during SSR (e.g. using `window`,
 * `IntersectionObserver`, random IDs, etc.).
 *
 * @example
 *   const isClient = useIsClient();
 *   if (!isClient) return null;
 *   return <SomeClientOnlyThing />;
 */
export function useIsClient(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}
