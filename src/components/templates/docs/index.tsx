"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, BookOpen, Search } from "@/components/icons";

export interface DocsTocItem {
  id: string;
  title: string;
}

export interface DocsPageTemplateProps {
  nav: Array<{ title: string; href: string }>;
  toc: DocsTocItem[];
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Three-column docs template. Left: nav. Center: content. Right: TOC.
 */
export function DocsPageTemplate({
  nav,
  toc,
  title,
  description,
  children,
  className,
}: DocsPageTemplateProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 py-10 lg:px-8", className)}>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr_200px]">
        <aside className="hidden lg:block">
          <div className="relative">
            <Search
              size={12}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Search docs…"
              className="h-8 w-full rounded-md border border-border bg-background pl-7 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <nav className="mt-6 space-y-0.5">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <BookOpen size={12} />
                {n.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-base text-muted-foreground">{description}</p>
            )}
          </div>
          <article className="prose prose-sm max-w-none text-foreground dark:prose-invert">
            {children}
          </article>
        </main>
        <aside className="hidden lg:block">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </p>
          <ul className="space-y-1">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight size={10} /> {t.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}