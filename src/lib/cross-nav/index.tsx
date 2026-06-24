/**
 * Cross-domain nav. Renders a row of pills linking to all other
 * AgeZero UI subdomains. Drop into any subdomain's layout.
 */
import Link from "next/link";
import { Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";
import { MegaMenu } from "@/components/mega-menu";

const SUBDOMAINS = {
  ui: "https://ui.agezero.io",
  templates: "https://templates.agezero.io",
  magic: "https://magic.agezero.io",
  mcp: "https://mcp.agezero.io",
  cli: "https://cli.agezero.io",
  skills: "https://skills.agezero.io",
  tools: "https://tools.agezero.io",
  seo: "https://seo.agezero.io",
  connect: "https://connect.agezero.io",
} as const;
type Subdomain = keyof typeof SUBDOMAINS;

const CROSS_NAV = [
  { label: "UI", subdomain: "ui" as const, href: SUBDOMAINS.ui },
  { label: "Templates", subdomain: "templates" as const, href: SUBDOMAINS.templates },
  { label: "Magic", subdomain: "magic" as const, href: SUBDOMAINS.magic },
  { label: "Skills", subdomain: "skills" as const, href: SUBDOMAINS.skills },
  { label: "Tools", subdomain: "tools" as const, href: SUBDOMAINS.tools },
  { label: "SEO", subdomain: "seo" as const, href: SUBDOMAINS.seo },
  { label: "MCP", subdomain: "mcp" as const, href: SUBDOMAINS.mcp },
  { label: "CLI", subdomain: "cli" as const, href: SUBDOMAINS.cli },
  { label: "Connect", subdomain: "connect" as const, href: SUBDOMAINS.connect },
];

const BRAND = {
  name: "AgeZero UI",
  shortName: "AgeZero",
  tagline: "Premium React UI kit for Next.js + AI",
  github: "https://github.com/pathtoresiliencebv/agezero-ui",
};

export function CrossDomainNav({ active }: { active?: Subdomain }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="https://ui.agezero.io" className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles size={14} />
          </span>
          {BRAND.shortName}
        </Link>
        <div className="hidden lg:block">
          <MegaMenu />
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          {CROSS_NAV.map((item) => {
            const isActive = item.subdomain === active;
            return (
              <Link
                key={item.subdomain}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs transition-colors",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <a
          href={BRAND.github}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-xs text-muted-foreground hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

export function CrossDomainFooter() {
  return (
    <footer className="mt-12 border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 font-medium text-foreground">{BRAND.name}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CROSS_NAV.map((item) => (
            <Link
              key={item.subdomain}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href="https://agezero.nl"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-xs text-primary hover:underline"
        >
          🏠 agezero.nl — The full AgeZero platform
        </a>
        <p className="mt-2 text-[10px] text-muted-foreground/70">
          {BRAND.tagline} · MIT licensed
        </p>
      </div>
    </footer>
  );
}
