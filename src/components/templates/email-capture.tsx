"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export interface EmailCaptureProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  badge?: string;
  incentive?: string;
  className?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

/**
 * Single-focus email capture form used on lead-magnet pages. Inline
 * success state, copyable share link.
 */
export function EmailCapture({
  title = "Get the free guide",
  subtitle = "Drop your email and we'll send it straight to your inbox.",
  cta = "Send me the guide",
  badge,
  incentive,
  className,
  onSubmit,
}: EmailCaptureProps) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");
  const { copied, copy } = useCopyToClipboard();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setState("loading");
    try {
      await onSubmit?.(email);
    } catch {
      /* swallow — demo only */
    }
    setState("done");
  };

  if (state === "done") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center",
          className
        )}
      >
        <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Check your inbox.</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We just sent <strong>{email}</strong> a download link.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Know someone who&apos;d like this?
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              copy("https://agezero-ui.vercel.app/templates/lead-magnet")
            }
          >
            {copied ? "Copied!" : "Copy share link"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8",
        className
      )}
    >
      {badge && (
        <Badge variant="secondary" className="mb-3">
          {badge}
        </Badge>
      )}
      <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 flex-1"
        />
        <Button
          type="submit"
          size="lg"
          className="h-11"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Sending…" : cta}
        </Button>
      </div>
      {incentive && (
        <p className="mt-3 text-xs text-muted-foreground">{incentive}</p>
      )}
    </form>
  );
}