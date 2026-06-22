"use client"

/**
 * Changelog — MagicUI-style changelog page. Reverse-chronological list
 * of releases, with MDX support.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Rocket, Wrench, Bug, Tag } from "@/components/icons";

const TYPES = {
  feature: { icon: Sparkles, tone: "bg-emerald-500/10 text-emerald-600" },
  improvement: { icon: Rocket, tone: "bg-sky-500/10 text-sky-600" },
  fix: { icon: Wrench, tone: "bg-amber-500/10 text-amber-600" },
  breaking: { icon: Bug, tone: "bg-rose-500/10 text-rose-600" },
};

interface Entry {
  date: string;
  version: string;
  items: Array<{ type: keyof typeof TYPES; text: string }>;
}

const ENTRIES: Entry[] = [
  {
    date: "2026-06-21",
    version: "v0.4.0 — Wave 4",
    items: [
      { type: "feature", text: "18 new AI app templates (chat-pdf, chat-youtube, ghibli, …)" },
      { type: "feature", text: "Sticky theme builder widget (radius / font / gradient / animation)" },
      { type: "feature", text: "8 new motion elements (aurora, grid, beam, meteors, …)" },
      { type: "improvement", text: "Magic generator now has a live preview pane" },
    ],
  },
  {
    date: "2026-05-12",
    version: "v0.3.0 — Wave 3",
    items: [
      { type: "feature", text: "16 new UI primitives (Combobox, Calendar, DataTable, …)" },
      { type: "feature", text: "8 new AI components (VoiceInput, AgentTrace, WebhookCard, …)" },
      { type: "feature", text: "3 new templates (Docs, Auth, Status)" },
    ],
  },
  {
    date: "2026-04-01",
    version: "v0.2.0 — Wave 2",
    items: [
      { type: "feature", text: "7 sections, 5 mobile components, 11 agent skill files" },
      { type: "feature", text: "next-seo integration + 17 JSON-LD components" },
    ],
  },
  {
    date: "2026-03-04",
    version: "v0.1.0 — Wave 1",
    items: [
      { type: "feature", text: "Initial release: 16 UI primitives, 14 AI components, 16 blocks" },
      { type: "breaking", text: "First major version, no migrations needed" },
    ],
  },
];

export function ChangelogApp() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-3xl px-4 py-12">
      <header className="mb-10 text-center">
        <Badge variant="secondary" className="mb-2">
          <Tag size={10} className="mr-1" /> Changelog
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">What&apos;s new</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          New releases and improvements to AgeZero UI.
        </p>
      </header>

      <ol className="space-y-8">
        {ENTRIES.map((e) => (
          <li key={e.version}>
            <div className="sticky top-16 z-10 -mx-4 mb-3 bg-background/80 px-4 py-2 backdrop-blur">
              <h2 className="text-xl font-semibold tracking-tight">{e.version}</h2>
              <p className="text-xs text-muted-foreground">{e.date}</p>
            </div>
            <ul className="space-y-2 border-l border-border pl-6">
              {e.items.map((it, i) => {
                const Icon = TYPES[it.type].icon;
                return (
                  <li key={i} className="relative">
                    <span
                      className={`absolute -left-[33px] grid size-6 place-items-center rounded-full ${TYPES[it.type].tone}`}
                    >
                      <Icon size={12} />
                    </span>
                    <p className="text-sm leading-relaxed">{it.text}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}