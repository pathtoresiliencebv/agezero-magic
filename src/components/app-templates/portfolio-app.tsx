"use client"

/**
 * Portfolio — MagicUI-style personal portfolio. Project grid + about
 * + experience.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Sparkles, Award, MapPin, Mail, Github, Twitter, Linkedin } from "@/components/icons";

const PROJECTS = [
  { id: 1, name: "AgeZero UI", desc: "A premium React kit for Next.js", tags: ["React", "Next.js", "TypeScript"], link: "https://agezero-ui.vercel.app" },
  { id: 2, name: "Open Chat", desc: "Open-source LLM chat with BYO key", tags: ["AI", "Chat"], link: "#" },
  { id: 3, name: "Pixel Posters", desc: "Generative poster art with p5.js", tags: ["Art", "p5"], link: "#" },
  { id: 4, name: "Daily Dozen", desc: "12 daily tasks, gamified", tags: ["Productivity"], link: "#" },
];

const EXPERIENCE = [
  { year: "2025–", role: "Founder & engineer", company: "AgeZero UI" },
  { year: "2022–24", role: "Senior frontend", company: "Vercel" },
  { year: "2019–22", role: "Frontend", company: "Linear" },
];

export function PortfolioApp() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-4xl px-4 py-12">
      <header className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <Avatar className="size-24">
          <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-500 text-2xl text-white">
            JS
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">Jan de Vries</h1>
          <p className="mt-1 text-muted-foreground">Builder · Amsterdam · Available for hire</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
            <Badge variant="secondary">
              <MapPin size={10} className="mr-1" /> Amsterdam
            </Badge>
            <Badge variant="secondary">
              <Mail size={10} className="mr-1" /> jan@agezero-ui.dev
            </Badge>
            <Button size="icon" variant="ghost" aria-label="GitHub"><Github size={14} /></Button>
            <Button size="icon" variant="ghost" aria-label="Twitter"><Twitter size={14} /></Button>
            <Button size="icon" variant="ghost" aria-label="LinkedIn"><Linkedin size={14} /></Button>
          </div>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          I design and build interfaces that feel alive. Currently focused on
          AI-native tooling and design systems. Previously at Vercel and Linear.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Sparkles size={16} className="text-primary" /> Selected work
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{p.name}</h3>
                <ArrowRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Award size={16} className="text-primary" /> Experience
        </h2>
        <ol className="space-y-3 border-l-2 border-border pl-4">
          {EXPERIENCE.map((e) => (
            <li key={e.role}>
              <p className="text-sm font-medium">
                {e.role} · {e.company}
              </p>
              <p className="text-xs text-muted-foreground">{e.year}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}