"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Plug, ArrowRight, ArrowLeft, Check } from "@/components/icons";

export interface Webhook {
  id: string;
  url: string;
  event: string;
  direction: "incoming" | "outgoing";
  status: "success" | "pending" | "failed";
  lastTriggered?: string;
  payload?: Record<string, unknown>;
}

export interface WebhookCardProps {
  webhook: Webhook;
  className?: string;
}

const STATUS_TONE = {
  success: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-amber-500/10 text-amber-600",
  failed: "bg-rose-500/10 text-rose-600",
} as const;

const STATUS_ICON = {
  success: Check,
  pending: Plug,
  failed: Plug,
} as const;

/**
 * Display a single webhook configuration: URL, event, recent activity.
 */
export function WebhookCard({ webhook, className }: WebhookCardProps) {
  const Icon = STATUS_ICON[webhook.status];
  const isIncoming = webhook.direction === "incoming";
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              {isIncoming ? <ArrowLeft size={10} className="mr-1" /> : <ArrowRight size={10} className="mr-1" />}
              {webhook.direction}
            </Badge>
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              {webhook.event}
            </code>
          </div>
          <p className="mt-2 truncate font-mono text-xs text-muted-foreground">
            {webhook.url}
          </p>
        </div>
        <Badge
          variant="secondary"
          className={cn("shrink-0", STATUS_TONE[webhook.status])}
        >
          <Icon size={10} className="mr-1" />
          {webhook.status}
        </Badge>
      </div>
      {webhook.lastTriggered && (
        <p className="mt-3 text-[10px] text-muted-foreground">
          Last triggered {webhook.lastTriggered}
        </p>
      )}
      {webhook.payload && (
        <pre className="mt-3 max-h-32 overflow-auto rounded bg-muted/30 p-2 text-[10px]">
          <code>{JSON.stringify(webhook.payload, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}