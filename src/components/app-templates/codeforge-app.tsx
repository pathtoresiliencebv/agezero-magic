"use client"

/**
 * Codeforge — AI app template inspired by MagicUI's codeforge. Workflow
 * visualization + chat-style editing + connections.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Code, GitBranch, Workflow, Zap, Play, Check, ArrowRight } from "@/components/icons";

const STEPS = [
  { id: 1, label: "Plan", desc: "Outline the work", done: true },
  { id: 2, label: "Code", desc: "Generate modules", done: true },
  { id: 3, label: "Test", desc: "Run unit + e2e", done: true },
  { id: 4, label: "Deploy", desc: "Push to Vercel", active: true },
  { id: 5, label: "Monitor", desc: "Watch logs & metrics" },
];

export function CodeforgeApp() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 py-10">
      <header className="mb-10 text-center">
        <Badge variant="secondary" className="mb-2">
          <Code size={10} className="mr-1" /> Codeforge · AI build pipeline
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">From prompt to production</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect your LLM. Connect your repos. Watch agents ship the change.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="space-y-3 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Workflow size={14} /> Workflow
            </h3>
            <ol className="space-y-2">
              {STEPS.map((s) => (
                <li
                  key={s.id}
                  className={`flex items-start gap-3 rounded-md border p-2 ${
                    s.active ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs ${
                      s.done
                        ? "bg-emerald-500 text-white"
                        : s.active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.done ? <Check size={12} /> : s.id}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button className="w-full">
              <Play size={14} className="mr-1" /> Run workflow
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {[
            { role: "system", text: "Workflow started: 5 steps queued." },
            { role: "planner", text: "I'll split this into 3 PRs: API, UI, tests." },
            { role: "coder", text: "Generated 12 files. Pushed branch `feat/onboarding`." },
            { role: "reviewer", text: "3 nitpicks. Posting as comments on the PR." },
            { role: "deployer", text: "Vercel build #4321 is green. Promoting to production." },
          ].map((m, i) => (
            <Card key={i}>
              <CardContent className="flex items-start gap-3 p-3 text-sm">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {m.role[0]?.toUpperCase()}
                </span>
                <p>{m.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}