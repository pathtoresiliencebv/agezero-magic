"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Loader, Circle, ChevronRight, ChevronDown } from "@/components/icons";

export interface TraceStep {
  id: string;
  label: string;
  description?: string;
  duration?: number;
  status: "pending" | "running" | "completed" | "error";
  /** Nested sub-steps (recursive). */
  children?: TraceStep[];
}

export interface AgentTraceProps {
  steps: TraceStep[];
  className?: string;
}

const STATUS_ICON = {
  pending: Circle,
  running: Loader,
  completed: Check,
  error: Circle,
} as const;

const STATUS_TONE = {
  pending: "text-muted-foreground",
  running: "text-primary",
  completed: "text-emerald-500",
  error: "text-rose-500",
} as const;

/**
 * Tree of agent execution steps. Recursive — sub-agents can have
 * their own sub-agents.
 */
export function AgentTrace({ steps, className }: AgentTraceProps) {
  return (
    <ol className={cn("space-y-1 text-sm", className)}>
      {steps.map((step) => (
        <TraceRow key={step.id} step={step} depth={0} />
      ))}
    </ol>
  );
}

function TraceRow({ step, depth }: { step: TraceStep; depth: number }) {
  const [open, setOpen] = React.useState(true);
  const Icon = STATUS_ICON[step.status];
  const hasChildren = step.children && step.children.length > 0;

  return (
    <li>
      <div
        className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-muted/30"
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Collapse" : "Expand"}
            className="mt-0.5 text-muted-foreground hover:text-foreground"
          >
            {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
        ) : (
          <span className="mt-0.5 inline-block w-3" />
        )}
        <Icon
          size={14}
          className={cn(
            "mt-0.5 shrink-0",
            STATUS_TONE[step.status],
            step.status === "running" && "animate-spin"
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="text-foreground">{step.label}</p>
          {step.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
          )}
        </div>
        {step.duration !== undefined && (
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {step.duration}ms
          </span>
        )}
      </div>
      {hasChildren && open && (
        <ol className="mt-1 space-y-0.5">
          {step.children!.map((c) => (
            <TraceRow key={c.id} step={c} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
}