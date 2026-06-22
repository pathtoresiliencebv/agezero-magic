/**
 * Site section metadata used by the header switcher + dynamic sub-nav.
 * Adding a new top-level section? Just add an entry here.
 */
import { Brain, Wand, Layers, Boxes, Sparkles, FileText, Wrench, Eye } from "@/components/icons";

export interface SubPage {
  href: string;
  label: string;
  description?: string;
}

export interface SiteSection {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
  /** Pages to show in the section's sub-nav (right of the switcher). */
  subPages: SubPage[];
  /** Pathname prefixes that should activate this section. */
  match: (pathname: string) => boolean;
}

export const sections: SiteSection[] = [
  {
    id: "docs",
    label: "Docs",
    href: "/components",
    description: "Browse the 30+ components, blocks, motion elements, icons, and the registry.",
    icon: Boxes,
    subPages: [
      { href: "/components", label: "Components" },
      { href: "/ai", label: "AI" },
      { href: "/icons", label: "Icons" },
      { href: "/motion", label: "Motion" },
      { href: "/registry", label: "Registry" },
    ],
    match: (p) =>
      p.startsWith("/components") ||
      p.startsWith("/ai") ||
      p.startsWith("/icons") ||
      p.startsWith("/motion") ||
      p.startsWith("/registry"),
  },
  {
    id: "templates",
    label: "Templates",
    href: "/templates",
    description: "Five complete starter sites built from the kit: SaaS, directory, ads, lead-magnet, portfolio.",
    icon: Layers,
    subPages: [
      { href: "/templates", label: "All" },
      { href: "/templates/saas-landing", label: "SaaS" },
      { href: "/templates/directory", label: "Directory" },
      { href: "/templates/ad-landing", label: "Ad landing" },
      { href: "/templates/lead-magnet", label: "Lead magnet" },
      { href: "/templates/portfolio", label: "Portfolio" },
    ],
    match: (p) => p.startsWith("/templates"),
  },
  {
    id: "tools",
    label: "Tools",
    href: "/magic",
    description: "Magic generator, theme builder, and the live component playground.",
    icon: Wand,
    subPages: [
      { href: "/magic", label: "Magic" },
      { href: "/theme", label: "Theme builder" },
      { href: "/playground/button", label: "Playground" },
    ],
    match: (p) =>
      p.startsWith("/magic") ||
      p.startsWith("/theme") ||
      p.startsWith("/playground"),
  },
  {
    id: "showcase",
    label: "Showcase",
    href: "/showcase",
    description: "See every block, motion element, and chart in one scrolling page.",
    icon: Eye,
    subPages: [],
    match: (p) => p.startsWith("/showcase"),
  },
];

export function detectSection(pathname: string): SiteSection {
  return (
    sections.find((s) => s.match(pathname)) ?? sections[0]!
  );
}
