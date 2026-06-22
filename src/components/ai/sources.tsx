"use client";

import * as React from "react";

import { ArrowRight, Globe } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Sources                                                                   */
/*  A horizontally-laid-out list of citations rendered as compact badges.     */
/* -------------------------------------------------------------------------- */

export interface SourceItem {
  /** Display title of the source. */
  title: string;
  /** Short description (1–2 lines) shown beneath the title. */
  description?: string;
  /** External URL the badge links to. */
  url: string;
  /** Optional favicon URL — falls back to a Globe icon. */
  favicon?: string;
}

export interface SourcesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Heading shown above the list. */
  title?: string;
  /** Source items to render. */
  items: SourceItem[];
}

export const Sources = React.forwardRef<HTMLDivElement, SourcesProps>(
  function Sources(
    { className, title = "Sources", items, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="sources"
        className={cn("my-3 w-full", className)}
        {...props}
      >
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <Source key={`${item.url}-${idx}`} {...item} />
          ))}
        </div>
        {children}
      </div>
    );
  },
);

export interface SourceProps extends SourceItem {
  className?: string;
}

/**
 * A compact badge with a favicon, title, and an external-link arrow. The
 * entire card is a link that opens in a new tab.
 */
export const Source = React.forwardRef<HTMLAnchorElement, SourceProps>(
  function Source(
    { title, description, url, favicon, className, ...anchorProps },
    ref,
  ) {
    return (
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        data-slot="source"
        className={cn(
          "group/source inline-flex max-w-xs items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5",
          "text-xs text-card-foreground shadow-sm",
          "hover:border-foreground/30 hover:bg-accent/40 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...anchorProps}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
          {favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={favicon}
              alt=""
              className="h-3 w-3 object-contain"
              loading="lazy"
            />
          ) : (
            <Globe size={10} className="text-muted-foreground" />
          )}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{title}</span>
          {description && (
            <span className="truncate text-[10px] text-muted-foreground">
              {description}
            </span>
          )}
        </span>
        <ArrowRight
          size={12}
          className="ml-1 shrink-0 text-muted-foreground transition-transform group-hover/source:translate-x-0.5"
        />
      </a>
    );
  },
);
