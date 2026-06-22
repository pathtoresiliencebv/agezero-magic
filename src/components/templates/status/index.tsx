"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Clock, Wrench } from "@/components/icons";

export interface StatusComponent {
  id: string;
  name: string;
  status: "operational" | "degraded" | "partial" | "down" | "maintenance";
  description?: string;
}

export interface StatusIncident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  startedAt: string;
  resolvedAt?: string;
  updates: Array<{ time: string; message: string }>;
}

const STATUS_TONE = {
  operational: "bg-emerald-500/10 text-emerald-600",
  degraded: "bg-amber-500/10 text-amber-600",
  partial: "bg-amber-500/10 text-amber-600",
  down: "bg-rose-500/10 text-rose-600",
  maintenance: "bg-sky-500/10 text-sky-600",
} as const;

const STATUS_LABEL = {
  operational: "Operational",
  degraded: "Degraded",
  partial: "Partial outage",
  down: "Down",
  maintenance: "Maintenance",
} as const;

const STATUS_ICON = {
  operational: Check,
  degraded: AlertCircle,
  partial: AlertCircle,
  down: AlertCircle,
  maintenance: Wrench,
} as const;

export interface StatusPageTemplateProps {
  components: StatusComponent[];
  incidents: StatusIncident[];
  className?: string;
}

/**
 * Status page template. Banner + component grid + incident timeline.
 */
export function StatusPageTemplate({
  components,
  incidents,
  className,
}: StatusPageTemplateProps) {
  const overall = components.every((c) => c.status === "operational")
    ? "operational"
    : components.some((c) => c.status === "down")
      ? "down"
      : "degraded";

  const OverallIcon = STATUS_ICON[overall];

  return (
    <div className={cn("mx-auto w-full max-w-4xl px-4 py-12 lg:px-8", className)}>
      <div
        className={cn(
          "rounded-xl border border-border p-6 text-center",
          STATUS_TONE[overall]
        )}
      >
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-background/30">
          <OverallIcon size={20} />
        </div>
        <h1 className="text-2xl font-bold">
          {overall === "operational"
            ? "All systems operational"
            : STATUS_LABEL[overall]}
        </h1>
        <p className="mt-1 text-sm opacity-80">
          Last updated just now · Powered by AgeZero UI Status
        </p>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Components
        </h2>
        <div className="divide-y divide-border rounded-md border border-border bg-card">
          {components.map((c) => {
            const Icon = STATUS_ICON[c.status];
            return (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  {c.description && (
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  )}
                </div>
                <Badge variant="secondary" className={STATUS_TONE[c.status]}>
                  <Icon size={10} className="mr-1" />
                  {STATUS_LABEL[c.status]}
                </Badge>
              </div>
            );
          })}
        </div>
      </section>

      {incidents.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recent incidents
          </h2>
          <div className="space-y-4">
            {incidents.map((i) => (
              <div
                key={i.id}
                className="rounded-md border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{i.title}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      i.status === "resolved" && "text-emerald-600",
                      i.status === "monitoring" && "text-sky-600"
                    )}
                  >
                    {i.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  <Clock size={10} className="mr-1 inline" />
                  {i.startedAt}
                  {i.resolvedAt && ` → ${i.resolvedAt}`}
                </p>
                <ol className="mt-3 space-y-2 border-l-2 border-border pl-3">
                  {i.updates.map((u, idx) => (
                    <li key={idx} className="text-xs">
                      <p className="font-medium text-foreground">{u.message}</p>
                      <p className="text-muted-foreground">{u.time}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}