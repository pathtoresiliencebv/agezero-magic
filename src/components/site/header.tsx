"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { Brain, ArrowRight, Menu } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MobileDrawer } from "@/components/mobile/mobile-drawer";
import { TouchTarget } from "@/components/mobile/touch-target";
import { cn } from "@/lib/utils";
import { SectionSwitcher } from "./section-switcher";
import { detectSection } from "./sections";

/**
 * Vercel-style site header.
 *
 * - On desktop: [Logo] / [Section switcher] [sub-nav]    [GitHub] [Get started] [Theme]
 * - On mobile:  [Menu] [Logo]                              [Theme] | drawer with full nav
 */
export function SiteHeader() {
  const pathname = usePathname();
  const section = React.useMemo(() => detectSection(pathname), [pathname]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80",
          "backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
          {/* Mobile menu trigger */}
          <TouchTarget asChild className="mr-1 lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Menu size={18} />
            </button>
          </TouchTarget>

          {/* Logo + slash + section switcher */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-1 py-1 font-semibold tracking-tight transition-colors hover:opacity-80"
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <Brain size={16} />
              </span>
              <span className="hidden sm:inline">AgeZero UI</span>
            </Link>
            <span aria-hidden className="hidden text-muted-foreground/40 sm:inline">/</span>
            <div className="hidden sm:block">
              <SectionSwitcher />
            </div>
          </div>

          {/* Sub-nav for the active section (desktop only) */}
          {section.subPages.length > 0 ? (
            <nav className="hidden flex-1 items-center gap-1 text-sm text-muted-foreground lg:flex">
              {section.subPages.map((p) => {
                const isActive =
                  pathname === p.href ||
                  (p.href !== "/" && pathname.startsWith(p.href + "/"));
                return (
                  <Link
                    key={p.href}
                    href={p.href}
                    className={cn(
                      "rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-foreground"
                    )}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <div className="hidden flex-1 lg:block" />
          )}

          {/* Right-side actions */}
          <div className="ml-auto flex items-center gap-2">
            <CommandPaletteTrigger className="hidden md:inline-flex" />
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <a
                href="https://github.com/javashn/agezero-ui"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/get-started">
                Get started <ArrowRight size={14} />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        side="left"
        className="p-4"
      >
        <Link
          href="/"
          onClick={() => setDrawerOpen(false)}
          className="mb-4 flex items-center gap-2 rounded-md px-2 py-2 font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Brain size={16} />
          </span>
          AgeZero UI
        </Link>
        <nav className="space-y-4">
          <div>
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.subPages.map((p) => {
                const isActive = pathname === p.href;
                return (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "block rounded-md px-2 py-2 text-sm hover:bg-accent",
                      isActive && "bg-accent font-medium text-foreground"
                    )}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              More
            </p>
            <div className="space-y-0.5">
              <Link
                href="/templates"
                className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                onClick={() => setDrawerOpen(false)}
              >
                All templates
              </Link>
              <Link
                href="/showcase"
                className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                onClick={() => setDrawerOpen(false)}
              >
                Showcase
              </Link>
              <Link
                href="/registry"
                className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                onClick={() => setDrawerOpen(false)}
              >
                Registry
              </Link>
              <Link
                href="/seo"
                className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                onClick={() => setDrawerOpen(false)}
              >
                SEO kit
              </Link>
              <Link
                href="/sections"
                className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                onClick={() => setDrawerOpen(false)}
              >
                Sections
              </Link>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <Button asChild className="w-full">
              <Link href="/get-started" onClick={() => setDrawerOpen(false)}>
                Get started <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </nav>
      </MobileDrawer>
    </>
  );
}
