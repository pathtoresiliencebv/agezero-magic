"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "@/components/icons";

/**
 * Sidebar nav for the docs site. Highlights the active route. Grouped by
 * section so newcomers can orient quickly.
 */
export type SidebarItem = {
  href: string;
  label: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export const SITE_NAV: SidebarSection[] = [
  {
    title: "Get started",
    items: [
      { href: "/", label: "Introduction" },
      { href: "/get-started", label: "Installation" },
      { href: "/showcase", label: "Showcase" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/components", label: "Components" },
      { href: "/ai", label: "AI Components" },
      { href: "/motion", label: "Motion elements" },
      { href: "/icons", label: "Icons" },
      { href: "/registry", label: "Registry" },
    ],
  },
  {
    title: "Templates",
    items: [
      { href: "/templates", label: "All templates" },
      { href: "/templates/docs", label: "Docs page" },
      { href: "/templates/auth", label: "Auth page" },
      { href: "/templates/status", label: "Status page" },
      { href: "/templates/saas-landing", label: "SaaS landing" },
      { href: "/templates/directory", label: "Directory" },
      { href: "/templates/portfolio", label: "Portfolio" },
      { href: "/templates/ad-landing", label: "Ad landing" },
      { href: "/templates/lead-magnet", label: "Lead magnet" },
    ],
  },
  {
    title: "Sections",
    items: [
      { href: "/sections", label: "All sections" },
      { href: "/sections/magazine", label: "Magazine" },
      { href: "/sections/deck", label: "Deck" },
      { href: "/sections/data-report", label: "Data report" },
      { href: "/sections/newsletter", label: "Newsletter" },
      { href: "/sections/dashboard", label: "Dashboard" },
      { href: "/sections/hyperframe", label: "HyperFrame" },
      { href: "/sections/video", label: "Video" },
    ],
  },
  {
    title: "AI Apps",
    items: [
      { href: "/apps", label: "All 18 apps" },
      { href: "/apps/chat-pdf", label: "Chat with PDF" },
      { href: "/apps/chat-youtube", label: "Chat with YouTube" },
      { href: "/apps/gemini-chat", label: "Gemini Chat" },
      { href: "/apps/deepseek-chat", label: "DeepSeek Chat" },
      { href: "/apps/image-generation", label: "Image Generation" },
      { href: "/apps/image-enhancer", label: "Image Enhancer" },
      { href: "/apps/ghibli-image", label: "Ghibli Generator" },
      { href: "/apps/headshot", label: "Headshot Generator" },
      { href: "/apps/interior-design", label: "Interior Design" },
      { href: "/apps/content-writer", label: "Content Writer" },
      { href: "/apps/codeforge", label: "Codeforge" },
      { href: "/apps/agent-app", label: "Agent Roster" },
      { href: "/apps/changelog", label: "Changelog" },
      { href: "/apps/saas-landing", label: "SaaS Landing" },
      { href: "/apps/startup", label: "Startup Landing" },
      { href: "/apps/blog", label: "Blog" },
      { href: "/apps/portfolio", label: "Portfolio" },
      { href: "/apps/mobile", label: "Mobile Marketing" },
    ],
  },
  {
    title: "Tools",
    items: [
      { href: "/magic", label: "Magic generator" },
      { href: "/theme", label: "Theme builder" },
      { href: "/playground/button", label: "Playground" },
      { href: "/seo", label: "SEO Kit" },
      { href: "/skills", label: "Skills" },
    ],
  },
];

/** Paths where the sidebar should be collapsed by default. */
const COLLAPSED_BY_DEFAULT: string[] = [
  "/templates",
  "/sections",
  "/apps",
];

const STORAGE_KEY = "agezero-ui:sidebar-collapsed";

export function SiteSidebar() {
  const pathname = usePathname();
  const shouldDefaultCollapse = COLLAPSED_BY_DEFAULT.some((p) =>
    pathname.startsWith(p)
  );

  const [collapsed, setCollapsed] = React.useState<boolean>(shouldDefaultCollapse);
  const [hydrated, setHydrated] = React.useState(false);

  // Load saved preference (only honored if user is NOT on a default-collapsed path).
  React.useEffect(() => {
    setHydrated(true);
    if (shouldDefaultCollapse) {
      setCollapsed(true);
      return;
    }
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "1") setCollapsed(true);
      else if (v === "0") setCollapsed(false);
    } catch {}
  }, [shouldDefaultCollapse, pathname]);

  // Persist on change.
  React.useEffect(() => {
    if (!hydrated) return;
    if (shouldDefaultCollapse) return; // don't persist defaults
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {}
  }, [collapsed, hydrated, shouldDefaultCollapse]);

  return (
    <aside
      className={cn(
        "sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r border-border/60 py-4 transition-all duration-200 md:block",
        collapsed ? "w-12" : "w-60"
      )}
      aria-label="Documentation navigation"
    >
      {/* Collapse toggle */}
      <div className={cn("mb-3 flex", collapsed ? "justify-center px-0" : "justify-end pr-3")}>
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((c) => !c)}
          className="grid size-7 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      <nav className={cn("flex flex-col gap-5 text-sm", collapsed ? "px-0" : "pr-4")}>
        {SITE_NAV.map((section) => {
          const hasActive = section.items.some((item) =>
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          );
          return (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              {collapsed && (
                <div
                  className={cn(
                    "mx-2 my-2 h-px",
                    hasActive ? "bg-primary/40" : "bg-border/60"
                  )}
                  aria-hidden
                />
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "flex items-center gap-2 rounded-md transition-colors",
                          collapsed ? "justify-center px-0 py-2" : "px-2 py-1.5",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        )}
                      >
                        {collapsed ? (
                          <span className="grid size-5 place-items-center rounded-sm text-[10px] font-bold uppercase">
                            {item.label.slice(0, 1)}
                          </span>
                        ) : (
                          item.label
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}