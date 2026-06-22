"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { Loader, Check, X, Circle, Bot, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  AgentCard                                                                 */
/*  A card representing an autonomous agent — avatar, name, status, and a     */
/*  short description. Color-codes the status pill.                           */
/* -------------------------------------------------------------------------- */

export type AgentStatus = "idle" | "running" | "done" | "error";

const agentCardVariants = cva(
  "group/agent relative flex w-full flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-sm transition-all",
  {
    variants: {
      status: {
        idle: "border-border",
        running: "border-foreground/30",
        done: "border-emerald-500/40",
        error: "border-destructive/50",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

const statusBadge: Record<
  AgentStatus,
  { label: string; classes: string; icon: React.ReactNode }
> = {
  idle: {
    label: "Idle",
    classes:
      "bg-muted text-muted-foreground border border-border",
    icon: <Circle size={10} />,
  },
  running: {
    label: "Running",
    classes:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    icon: (
      <Loader
        size={10}
        className="animate-spin"
        style={{ animationDuration: "0.8s" }}
      />
    ),
  },
  done: {
    label: "Done",
    classes:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    icon: <Check size={10} />,
  },
  error: {
    label: "Error",
    classes:
      "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30",
    icon: <X size={10} />,
  },
};

export interface AgentCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name: string;
  description?: string;
  status?: AgentStatus;
  /** Avatar element — defaults to a Bot icon. */
  avatar?: React.ReactNode;
  /** Label for the action button. Defaults to "View". */
  actionLabel?: string;
  /** Click handler for the action button. */
  onAction?: () => void;
  /** Optional metadata row (e.g. "Last run 2m ago"). */
  meta?: React.ReactNode;
  children?: React.ReactNode;
}

export const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  function AgentCard(
    {
      className,
      name,
      description,
      status = "idle",
      avatar,
      actionLabel = "View",
      onAction,
      meta,
      children,
      ...props
    },
    ref,
  ) {
    const badge = statusBadge[status];
    return (
      <div
        ref={ref}
        data-slot="agent-card"
        data-status={status}
        className={cn(
          agentCardVariants({ status }),
          "hover:border-foreground/20 hover:shadow-md",
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
              status === "running"
                ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : status === "done"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : status === "error"
                    ? "border-destructive/40 bg-destructive/10 text-destructive"
                    : "border-border bg-muted text-foreground",
            )}
          >
            {avatar ?? <Bot size={16} />}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold">{name}</h3>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  badge.classes,
                )}
              >
                {badge.icon}
                {badge.label}
              </span>
            </div>
            {description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {(meta || onAction) && (
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] text-muted-foreground">{meta}</div>
            {onAction && (
              <button
                type="button"
                onClick={onAction}
                className={cn(
                  "inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs font-medium",
                  "text-foreground hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "transition-colors",
                )}
              >
                {actionLabel}
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover/agent:translate-x-0.5"
                />
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    );
  },
);

export { agentCardVariants, statusBadge as agentStatusBadge };
