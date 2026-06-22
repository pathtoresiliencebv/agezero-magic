import * as React from "react";

export interface Logo {
  name: string;
  /** Render-prop or text fallback. */
  render?: () => React.ReactNode;
  text?: string;
}

export interface LogoCloudProps {
  title?: string;
  logos: Logo[];
  className?: string;
}

/**
 * LogoCloud — a centered row of "logos". Since we don't have real brand
 * marks to embed, we render stylized text for each logo. Swap in your
 * own SVGs via the `render` prop.
 */
export function LogoCloud({ title = "Trusted by teams at", logos }: LogoCloudProps) {
  return (
    <section className="border-b border-border/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {logo.render ? logo.render() : logo.text ?? logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
