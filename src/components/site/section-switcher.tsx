"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";
import { sections, detectSection, type SiteSection } from "./sections";
import { ChevronDown, Check, ArrowRight } from "@/components/icons";

/**
 * Vercel-style section switcher.
 *
 * - Top-left slot: a button that shows the current section + a chevron.
 * - On click: opens a popover with all sections as cards (icon, label,
 *   description). Selecting one navigates to that section's main page.
 * - Closes on click outside, on Escape, or on navigation.
 */
export function SectionSwitcher() {
  const pathname = usePathname();
  const active = React.useMemo(() => detectSection(pathname), [pathname]);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useClickOutside(containerRef, () => setOpen(false));

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on navigation
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <active.icon size={14} className="text-muted-foreground group-hover:text-foreground" />
        <span>{active.label}</span>
        <ChevronDown
          size={12}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute left-0 top-[calc(100%+6px)] z-50 w-[min(640px,calc(100vw-2rem))]",
            "rounded-xl border border-border bg-card p-2 shadow-2xl",
            "origin-top-left animate-in fade-in-0 slide-in-from-top-1"
          )}
        >
          <div className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Switch section
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {sections.map((s) => (
              <SectionCard
                key={s.id}
                section={s}
                active={s.id === active.id}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
            <span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd>{" "}
              to close
            </span>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              Get started <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  active,
}: {
  section: SiteSection;
  active: boolean;
}) {
  const Icon = section.icon;
  return (
    <Link
      href={section.href}
      role="menuitem"
      className={cn(
        "group relative flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors",
        "hover:border-border hover:bg-accent/40",
        active && "border-primary/30 bg-primary/5"
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-foreground/10 group-hover:text-foreground"
        )}
      >
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">
            {section.label}
          </span>
          {active && <Check size={12} className="text-primary" />}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {section.description}
        </p>
      </div>
    </Link>
  );
}