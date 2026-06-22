import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ChevronDown } from "@/components/icons";

export interface ProHeaderLink {
  label: string;
  href: string;
  description?: string;
}

export interface ProHeaderProps {
  brand?: string;
  brandHref?: string;
  primaryNav?: ProHeaderLink[];
  secondaryNav?: ProHeaderLink[];
  cta?: { label: string; href: string };
  className?: string;
}

const DEFAULT_PRIMARY: ProHeaderLink[] = [
  { label: "Product", href: "#product", description: "All 32 primitives, 22 AI components." },
  { label: "Solutions", href: "#solutions", description: "Templates for every AI use case." },
  { label: "Pricing", href: "#pricing", description: "Free for individuals. $19/mo for teams." },
  { label: "Docs", href: "/components", description: "Browse the full component API." },
  { label: "Showcase", href: "/showcase", description: "Real apps built with AgeZero UI." },
];

/**
 * Pro marketing header. Sticky, frosted-glass, with a multi-column mega
 * menu that opens on hover or keyboard focus.
 */
export function ProHeader({
  brand = "AgeZero UI",
  brandHref = "/",
  primaryNav = DEFAULT_PRIMARY,
  secondaryNav = [
    { label: "GitHub", href: "https://github.com/javashn/agezero-ui" },
    { label: "Twitter", href: "https://twitter.com/agezero_ui" },
  ],
  cta = { label: "Get started", href: "/get-started" },
  className,
}: ProHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<number | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={brandHref} className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles size={14} />
          </span>
          {brand}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((l, i) => (
            <div
              key={l.label}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                if (l.description) setActive(i);
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={l.href}
                className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
                {l.description && <ChevronDown size={12} className="opacity-50" />}
              </Link>
              {l.description && active === i && (
                <div
                  className="absolute left-0 top-full mt-1 w-72 rounded-lg border border-border bg-card p-3 shadow-2xl"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <p className="text-sm font-medium">{l.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {l.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {secondaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-sm text-muted-foreground hover:text-foreground lg:inline-block"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="ml-2 hidden lg:inline-flex" size="sm">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="space-y-1 border-t border-border/60 bg-background px-4 py-3 lg:hidden">
          {primaryNav.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block rounded-md px-2 py-2 text-sm text-foreground hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="mt-2 w-full" size="sm">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}