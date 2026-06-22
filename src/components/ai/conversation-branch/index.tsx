"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GitBranch, GitMerge } from "@/components/icons";

export interface Branch {
  id: string;
  label: string;
  /** Messages in this branch. */
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface ConversationBranchProps {
  branches: Branch[];
  currentBranchId: string;
  onSwitch?: (branchId: string) => void;
  onFork?: (fromBranchId: string, atMessageIndex: number) => void;
  className?: string;
}

/**
 * Tree of conversation branches. Shows the current path, lets the user
 * switch to siblings, and fork a new branch from any message.
 */
export function ConversationBranch({
  branches,
  currentBranchId,
  onSwitch,
  className,
}: ConversationBranchProps) {
  const current = branches.find((b) => b.id === currentBranchId);
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <GitBranch size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium">
          {branches.length} {branches.length === 1 ? "branch" : "branches"}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {branches.map((b) => {
          const isCurrent = b.id === currentBranchId;
          return (
            <li
              key={b.id}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-2 text-xs",
                isCurrent && "bg-primary/5"
              )}
            >
              <button
                type="button"
                onClick={() => onSwitch?.(b.id)}
                className={cn(
                  "flex items-center gap-2 truncate",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <GitMerge
                  size={12}
                  className={isCurrent ? "text-primary" : ""}
                />
                <span className="truncate">{b.label}</span>
                {isCurrent && (
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    current
                  </span>
                )}
              </button>
              <span className="text-[10px] text-muted-foreground">
                {b.messages.length} msg
              </span>
            </li>
          );
        })}
      </ul>
      {!current && (
        <div className="px-3 py-2">
          <Button size="sm" variant="ghost" className="w-full">
            Fork from current
          </Button>
        </div>
      )}
    </div>
  );
}