"use client"

/**
 * Blog — MagicUI-style blog with featured + grid layout.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, ArrowRight, Calendar, Clock } from "@/components/icons";

const POSTS = [
  { id: 1, title: "Why we built our own registry", category: "Engineering", date: "Jun 18, 2026", read: "8 min", featured: true, author: "JSN" },
  { id: 2, title: "Designing an AI-native design system", category: "Design", date: "Jun 12, 2026", read: "6 min", author: "JSN" },
  { id: 3, title: "Magic UI vs shadcn — when to pick which", category: "Tools", date: "Jun 04, 2026", read: "12 min", author: "JSN" },
  { id: 4, title: "Theming with OKLCH in Tailwind v4", category: "CSS", date: "May 28, 2026", read: "5 min", author: "JSN" },
  { id: 5, title: "Building a sticky theme builder widget", category: "Tutorial", date: "May 20, 2026", read: "9 min", author: "JSN" },
  { id: 6, title: "The 60-icon rule", category: "Design", date: "May 10, 2026", read: "4 min", author: "JSN" },
];

export function BlogApp() {
  const featured = POSTS[0]!;
  const rest = POSTS.slice(1);
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 py-12">
      <header className="mb-10 text-center">
        <Badge variant="secondary" className="mb-2">
          <BookOpen size={10} className="mr-1" /> The AgeZero UI Blog
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Notes from the team</h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden lg:row-span-2">
          <div className="grid h-64 place-items-center bg-gradient-to-br from-primary/20 via-cyan-500/20 to-rose-500/20">
            <BookOpen size={48} className="text-foreground/30" />
          </div>
          <CardContent className="p-5">
            <Badge variant="secondary">{featured.category}</Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{featured.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              How we replaced 12 libraries with a single registry-driven kit, and why you should
              too. A deep-dive on tree-shaking, codegen, and developer experience.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">{featured.author}</AvatarFallback>
              </Avatar>
              <span>{featured.author}</span>
              <span>·</span>
              <Calendar size={10} />
              <span>{featured.date}</span>
              <span>·</span>
              <Clock size={10} />
              <span>{featured.read}</span>
            </div>
          </CardContent>
        </Card>

        {rest.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="grid size-20 shrink-0 place-items-center rounded-md bg-muted/40">
                <BookOpen size={20} className="text-muted-foreground/50" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge variant="outline" className="text-[10px]">
                  {p.category}
                </Badge>
                <h3 className="mt-1 text-base font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.date} · {p.read}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">
          View all posts <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}