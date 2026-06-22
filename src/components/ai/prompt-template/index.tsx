"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search } from "@/components/icons";

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  /** Variables the user can fill in. Use {{name}} in `prompt`. */
  variables?: Array<{ name: string; label: string; defaultValue?: string }>;
}

export interface PromptTemplateProps {
  templates: PromptTemplate[];
  onUse?: (template: PromptTemplate, vars: Record<string, string>) => void;
  className?: string;
}

/**
 * Library of saved prompt templates. Search by title, click "Use" to
 * pre-fill an input.
 */
export function PromptTemplate({
  templates,
  onUse,
  className,
}: PromptTemplateProps) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState<string | null>(
    templates[0]?.id ?? null
  );
  const [vars, setVars] = React.useState<Record<string, string>>({});

  const filtered = React.useMemo(() => {
    if (!q) return templates;
    const needle = q.toLowerCase();
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(needle) ||
        t.description.toLowerCase().includes(needle) ||
        t.category.toLowerCase().includes(needle)
    );
  }, [templates, q]);

  const current = filtered.find((t) => t.id === active) ?? filtered[0];

  return (
    <div
      className={cn(
        "grid gap-3 rounded-md border border-border bg-card md:grid-cols-[260px_1fr]",
        className
      )}
    >
      <div className="border-b border-border p-3 md:border-b-0 md:border-r">
        <div className="relative">
          <Search
            size={12}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates…"
            className="h-8 w-full rounded-md border border-border bg-background pl-7 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <ul className="mt-2 space-y-0.5">
          {filtered.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(t.id);
                  setVars({});
                }}
                className={cn(
                  "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs",
                  current?.id === t.id
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <FileText size={12} className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.title}</p>
                  <p className="truncate text-[10px] text-muted-foreground/80">
                    {t.category}
                  </p>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-2 py-3 text-center text-xs text-muted-foreground">
              No templates
            </li>
          )}
        </ul>
      </div>
      {current && (
        <div className="p-3">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">{current.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {current.description}
              </p>
            </div>
            <Badge variant="secondary">{current.category}</Badge>
          </div>
          {current.variables && current.variables.length > 0 && (
            <div className="mb-3 space-y-1.5">
              {current.variables.map((v) => (
                <label key={v.name} className="block text-xs">
                  <span className="mb-0.5 block text-muted-foreground">
                    {v.label}
                  </span>
                  <input
                    value={vars[v.name] ?? v.defaultValue ?? ""}
                    onChange={(e) =>
                      setVars((s) => ({ ...s, [v.name]: e.target.value }))
                    }
                    className="h-7 w-full rounded-md border border-border bg-background px-2 text-xs"
                  />
                </label>
              ))}
            </div>
          )}
          <pre className="rounded-md border border-border bg-muted/30 p-2 text-[11px] leading-relaxed">
            <code>{current.prompt}</code>
          </pre>
          {onUse && (
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={() => onUse(current, vars)}>
                <Plus size={12} className="mr-1" /> Use template
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}