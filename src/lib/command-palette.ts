/**
 * Command palette search index. Built from the registry plus hard-coded
 * site pages.
 */
import { registry } from "@/lib/registry";

export interface CommandItem {
  id: string;
  title: string;
  group:
    | "Components"
    | "AI"
    | "Blocks"
    | "Motion"
    | "Sections"
    | "Templates"
    | "Apps"
    | "Icons"
    | "Pages"
    | "Themes"
    | "Tools";
  href: string;
  description?: string;
  keywords?: string[];
  iconKey?: string;
}

const PAGES: CommandItem[] = [
  { id: "home", title: "Home", group: "Pages", href: "/", description: "Marketing home", iconKey: "Sparkles" },
  { id: "get-started", title: "Get started", group: "Pages", href: "/get-started", description: "Install in 30 seconds", iconKey: "ArrowRight" },
  { id: "components", title: "Components", group: "Pages", href: "/components", description: "All UI primitives", iconKey: "Boxes" },
  { id: "ai", title: "AI Components", group: "Pages", href: "/ai", description: "Message, Reasoning, Tools, …", iconKey: "Bot" },
  { id: "motion", title: "Motion", group: "Pages", href: "/motion", description: "22 motion elements", iconKey: "Sparkles" },
  { id: "registry", title: "Registry", group: "Pages", href: "/registry", description: "153 installable entries", iconKey: "Database" },
  { id: "magic", title: "Magic generator", group: "Tools", href: "/magic", description: "LLM-powered UI builder", iconKey: "Wand" },
  { id: "theme", title: "Theme builder", group: "Themes", href: "/theme", description: "6 presets, live preview", iconKey: "Sparkles" },
  { id: "playground", title: "Playground", group: "Tools", href: "/playground/button", description: "Tweak props live", iconKey: "Code" },
  { id: "seo", title: "SEO Kit", group: "Pages", href: "/seo", description: "next-seo + 17 JSON-LD", iconKey: "Globe" },
  { id: "templates", title: "Templates", group: "Pages", href: "/templates", description: "8 full pages", iconKey: "Layout" },
  { id: "sections", title: "Sections", group: "Pages", href: "/sections", description: "7 ready-to-drop sections", iconKey: "Layers" },
  { id: "icons", title: "Icons", group: "Pages", href: "/icons", description: "60+ hand-rolled icons", iconKey: "Sparkles" },
  { id: "showcase", title: "Showcase", group: "Pages", href: "/showcase", description: "Apps built with AgeZero UI", iconKey: "Star" },
  { id: "apps", title: "AI App Templates", group: "Pages", href: "/apps", description: "18 full AI apps", iconKey: "Layers" },
  { id: "app-chat-pdf", title: "Chat with PDF", group: "Apps", href: "/apps/chat-pdf", description: "Upload PDF + chat", iconKey: "FileText" },
  { id: "app-chat-youtube", title: "Chat with YouTube", group: "Apps", href: "/apps/chat-youtube", description: "Paste YouTube URL", iconKey: "Youtube" },
  { id: "app-gemini-chat", title: "Gemini Chat", group: "Apps", href: "/apps/gemini-chat", description: "Gemini-style chat", iconKey: "Sparkles" },
  { id: "app-deepseek-chat", title: "DeepSeek Chat", group: "Apps", href: "/apps/deepseek-chat", description: "DeepSeek UI clone", iconKey: "Bot" },
  { id: "app-image-generation", title: "AI Image Generation", group: "Apps", href: "/apps/image-generation", description: "Text → image", iconKey: "ImageIcon" },
  { id: "app-image-enhancer", title: "Image Enhancer", group: "Apps", href: "/apps/image-enhancer", description: "Upscale + denoise", iconKey: "Wand" },
  { id: "app-ghibli", title: "Ghibli Image Generator", group: "Apps", href: "/apps/ghibli-image", description: "Style transfer", iconKey: "Camera" },
  { id: "app-headshot", title: "Headshot Generator", group: "Apps", href: "/apps/headshot", description: "Selfie → headshot", iconKey: "Users" },
  { id: "app-interior-design", title: "Interior Design", group: "Apps", href: "/apps/interior-design", description: "Re-design a room", iconKey: "Home" },
  { id: "app-content-writer", title: "Content Writer AI", group: "Apps", href: "/apps/content-writer", description: "Blog / email / tweet", iconKey: "Pen" },
  { id: "app-codeforge", title: "Codeforge", group: "Apps", href: "/apps/codeforge", description: "AI build pipeline", iconKey: "Cpu" },
  { id: "app-changelog", title: "Changelog", group: "Apps", href: "/apps/changelog", description: "Release notes", iconKey: "BookOpen" },
  { id: "app-saas-landing", title: "SaaS Landing", group: "Apps", href: "/apps/saas-landing", description: "Marketing page", iconKey: "Globe" },
  { id: "app-startup", title: "Startup Landing", group: "Apps", href: "/apps/startup", description: "Dillionverma style", iconKey: "Briefcase" },
  { id: "app-blog", title: "Blog", group: "Apps", href: "/apps/blog", description: "Editorial blog", iconKey: "Newspaper" },
  { id: "app-portfolio", title: "Portfolio", group: "Apps", href: "/apps/portfolio", description: "Personal portfolio", iconKey: "Users" },
  { id: "app-mobile", title: "Mobile App Marketing", group: "Apps", href: "/apps/mobile", description: "Phone mockup page", iconKey: "Smartphone" },
  { id: "app-agent-roster", title: "Agent Roster", group: "Apps", href: "/apps/agent-app", description: "Multi-agent team", iconKey: "Bot" },
];

const ICON_KEY: Record<string, CommandItem["iconKey"]> = {
  ui: "Boxes",
  ai: "Bot",
  block: "Layout",
  icon: "Sparkles",
  section: "Layers",
};

const REGISTRY_ITEMS: CommandItem[] = registry.map((e) => ({
  id: e.name,
  title: e.title,
  group:
    e.category === "ui"
      ? "Components"
      : e.category === "ai"
        ? "AI"
        : e.category === "block"
          ? "Blocks"
          : "Pages",
  href: `/registry/${e.name}`,
  description: e.description,
  keywords: e.tags,
  iconKey: ICON_KEY[e.category],
}));

export const COMMAND_ITEMS: CommandItem[] = [...PAGES, ...REGISTRY_ITEMS];

export function searchCommands(query: string, limit = 8): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return COMMAND_ITEMS.slice(0, limit);
  }
  const matches: Array<{ item: CommandItem; score: number }> = [];
  for (const item of COMMAND_ITEMS) {
    let score = 0;
    const title = item.title.toLowerCase();
    if (title.startsWith(q)) score += 100;
    if (title.includes(q)) score += 50;
    if (item.group.toLowerCase().includes(q)) score += 10;
    if (item.description?.toLowerCase().includes(q)) score += 5;
    if (item.keywords?.some((k) => k.toLowerCase().includes(q))) score += 20;
    if (item.href.toLowerCase().includes(q)) score += 8;
    if (score > 0) matches.push({ item, score });
  }
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit).map((m) => m.item);
}