"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  searchCommands,
  type CommandItem,
} from "@/lib/command-palette";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Boxes,
  Bot,
  Layout,
  Layers,
  Wand,
  Code,
  Globe,
  Star,
  FileText,
  Camera,
  Users,
  Home,
  Pen,
  Cpu,
  BookOpen,
  Briefcase,
  Newspaper,
  Smartphone,
  Database,
  ArrowRight,
  Youtube,
  Image as ImageIcon,
  Hash,
} from "@/components/icons";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles,
  Boxes,
  Bot,
  Layout,
  Layers,
  Wand,
  Code,
  Globe,
  Star,
  FileText,
  Camera,
  Users,
  Home,
  Pen,
  Cpu,
  BookOpen,
  Briefcase,
  Newspaper,
  Smartphone,
  Database,
  ArrowRight,
  Youtube,
  ImageIcon,
  Hash,
};

const GROUP_ORDER: CommandItem["group"][] = [
  "Pages",
  "Components",
  "AI",
  "Blocks",
  "Sections",
  "Apps",
  "Tools",
  "Themes",
];

const STORAGE_KEY = "agezero-ui:cmdk-recent";

export interface CommandPaletteProps {
  className?: string;
}

/**
 * Global command palette. Triggered with ⌘K / Ctrl+K from anywhere on
 * the site. Searches across all 153+ registry entries plus site pages.
 */
export function CommandPalette({ className }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [highlighted, setHighlighted] = React.useState(0);
  const [recent, setRecent] = React.useState<string[]>([]);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // Load recent from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecent(JSON.parse(raw).slice(0, 4));
    } catch {}
  }, []);

  // Global keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Compute results
  const results = React.useMemo(() => {
    const base = searchCommands(query, 16);
    return base;
  }, [query]);

  // Group by category
  const grouped = React.useMemo(() => {
    const map = new Map<CommandItem["group"], CommandItem[]>();
    for (const item of results) {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      items: map.get(g)!,
    }));
  }, [results]);

  // Flat list for keyboard nav
  const flat = React.useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const choose = (item: CommandItem) => {
    // Persist to recent
    try {
      const next = [item.id, ...recent.filter((r) => r !== item.id)].slice(0, 4);
      setRecent(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(flat.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[highlighted]) choose(flat[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Reset highlight when query changes
  React.useEffect(() => {
    setHighlighted(0);
  }, [query]);

  // Scroll highlighted into view
  React.useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-cmdk-idx="${highlighted}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  if (!open) return null;

  let runningIdx = -1;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div
        className={cn(
          "relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl",
          "animate-in fade-in-0 slide-in-from-top-2 duration-150",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search size={16} className="text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search 153+ components, blocks, pages…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {query.trim() === "" && recent.length > 0 && (
            <Group
              title="Recent"
              items={recent
                .map((id) =>
                  searchCommands("", 100).find((c) => c.id === id)
                )
                .filter((x): x is CommandItem => Boolean(x))}
              highlighted={highlighted}
              runningIdxRef={{ get: () => runningIdx, set: (v) => { runningIdx = v; } }}
              onChoose={choose}
            />
          )}

          {grouped.length === 0 ? (
            <div className="grid place-items-center py-12 text-center text-sm text-muted-foreground">
              <div>
                <Sparkles size={20} className="mx-auto mb-2 opacity-50" />
                No results for &quot;{query}&quot;.
              </div>
            </div>
          ) : (
            grouped.map(({ group, items }) => (
              <Group
                key={group}
                title={group}
                items={items}
                highlighted={highlighted}
                runningIdxRef={{ get: () => runningIdx, set: (v) => { runningIdx = v; } }}
                onChoose={choose}
              />
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-background/40 px-3 py-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-0.5">
              <KbdIcon><ArrowUp size={10} /></KbdIcon>
              <KbdIcon><ArrowDown size={10} /></KbdIcon>
              navigate
            </span>
            <span className="inline-flex items-center gap-0.5">
              <KbdIcon><CornerDownLeft size={10} /></KbdIcon>
              select
            </span>
          </div>
          <span>{flat.length} results</span>
        </div>
      </div>
    </div>
  );
}

function KbdIcon({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-0.5">
      {children}
    </kbd>
  );
}

function Group({
  title,
  items,
  highlighted,
  runningIdxRef,
  onChoose,
}: {
  title: string;
  items: CommandItem[];
  highlighted: number;
  runningIdxRef: { get: () => number; set: (v: number) => void };
  onChoose: (item: CommandItem) => void;
}) {
  return (
    <div className="mb-1.5 last:mb-0">
      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul>
        {items.map((item) => {
          runningIdxRef.set(runningIdxRef.get() + 1);
          const idx = runningIdxRef.get();
          const Icon = (item.iconKey && ICONS[item.iconKey]) || Hash;
          const isHl = idx === highlighted;
          return (
            <li key={item.id}>
              <button
                type="button"
                data-cmdk-idx={idx}
                onClick={() => onChoose(item)}
                onMouseEnter={() => {
                  /* would setHighlighted but we don't have a setter here */
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  isHl
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    isHl ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="block truncate text-[10px] text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </span>
                <ArrowRight size={10} className="shrink-0 opacity-50" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Floating button to open the command palette. Renders the keyboard
 * hint.
 */
export function CommandPaletteTrigger({ className }: { className?: string }) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") force();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        // Dispatch ⌘K
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true })
        );
      }}
      className={cn(
        "flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
        className
      )}
      aria-label="Open command palette"
    >
      <Search size={12} />
      <span>Search…</span>
      <kbd className="ml-1 rounded border border-border bg-background px-1 text-[10px]">
        ⌘K
      </kbd>
    </button>
  );
}