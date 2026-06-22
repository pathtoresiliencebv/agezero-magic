"use client"

/**
 * Agent — MagicUI-style AI agent showcase. Multi-agent roster with
 * status indicators.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Brain, Cpu, Wrench, Sparkles, ArrowRight } from "@/components/icons";

const AGENTS = [
  {
    id: "researcher",
    name: "Researcher",
    role: "Finds and verifies sources",
    icon: Brain,
    status: "running",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "coder",
    name: "Coder",
    role: "Writes & refactors code",
    icon: Cpu,
    status: "idle",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "designer",
    name: "Designer",
    role: "Composes layouts & mockups",
    icon: Sparkles,
    status: "idle",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: "ops",
    name: "Ops",
    role: "Deploys, monitors, fixes",
    icon: Wrench,
    status: "error",
    color: "from-amber-500 to-red-500",
  },
];

export function AgentApp() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 py-12">
      <header className="mb-10 text-center">
        <Badge variant="secondary" className="mb-2">
          <Bot size={10} className="mr-1" /> Agent roster
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Your AI team</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Four specialists. Handoff automatically. You approve the result.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((a) => {
          const Icon = a.icon;
          return (
            <Card key={a.id} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${a.color}`} />
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`grid size-9 place-items-center rounded-md bg-gradient-to-br ${a.color} text-white`}
                  >
                    <Icon size={16} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      a.status === "running"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : a.status === "error"
                          ? "bg-rose-500/10 text-rose-600"
                          : "bg-muted text-muted-foreground"
                    }
                  >
                    {a.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-semibold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.role}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Open <ArrowRight size={12} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Active run</h3>
            <ol className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Researcher · found 12 sources
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                Coder · waiting for plan
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                Designer · waiting for code
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-rose-500" />
                Ops · rate-limited, retrying
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Recent runs</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>Q3 OKR writeup</span>
                <Badge variant="outline" className="text-[10px]">3m</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Refactor auth flow</span>
                <Badge variant="outline" className="text-[10px]">12m</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Ship 18 new icons</span>
                <Badge variant="outline" className="text-[10px]">1m</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}