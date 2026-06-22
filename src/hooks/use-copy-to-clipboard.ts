"use client";

import * as React from "react";

interface CopyState {
  copied: boolean;
  error: Error | null;
}

/**
 * `navigator.clipboard.writeText` wrapped in a hook with a 2s reset
 * to the `copied` flag.
 *
 * @example
 *   const { copied, copy } = useCopyToClipboard();
 *   return <button onClick={() => copy("hello")}>{copied ? "Copied" : "Copy"}</button>;
 */
export function useCopyToClipboard(resetMs = 2000): {
  copied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<boolean>;
} {
  const [state, setState] = React.useState<CopyState>({
    copied: false,
    error: null,
  });

  const resetTimeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = React.useCallback(
    async (text: string): Promise<boolean> => {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        const error = new Error("Clipboard API unavailable");
        setState({ copied: false, error });
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setState({ copied: true, error: null });
        clearTimeout(resetTimeout.current);
        resetTimeout.current = setTimeout(
          () => setState({ copied: false, error: null }),
          resetMs
        );
        return true;
      } catch (e) {
        setState({ copied: false, error: e as Error });
        return false;
      }
    },
    [resetMs]
  );

  React.useEffect(() => () => clearTimeout(resetTimeout.current), []);

  return { ...state, copy };
}
