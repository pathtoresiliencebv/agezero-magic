"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";

export interface DirectoryTool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
  url?: string;
  featured?: boolean;
  initials?: string;
}

export function DirectoryCard({
  tool,
  className,
}: {
  tool: DirectoryTool;
  className?: string;
}) {
  const initials = tool.initials ?? tool.name.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        tool.featured && "ring-1 ring-primary/30",
        className
      )}
    >
      {tool.featured && (
        <Badge variant="default" className="absolute -top-2 right-3">
          Featured
        </Badge>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-semibold text-primary">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{tool.name}</h3>
            <p className="text-xs text-muted-foreground">{tool.category}</p>
          </div>
        </div>
        <Badge variant="secondary" className="shrink-0">
          {tool.pricing}
        </Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {tool.tagline}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <StarRating value={tool.rating} count={tool.reviews} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {tool.tags.slice(0, 3).map((t) => (
          <Badge key={t} variant="outline" className="text-[10px]">
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <Button asChild size="sm" variant="outline" className="w-full">
          <Link href={tool.url ?? "#"}>View tool →</Link>
        </Button>
      </div>
    </div>
  );
}