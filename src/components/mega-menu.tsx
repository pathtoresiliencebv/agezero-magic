"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "@/components/icons";

interface MegaMenuProps {}

export function MegaMenu({}: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toolkits = [
    {
      label: "UI/UX Toolkit",
      items: [
        { icon: "Layers", name: "UI Kit", href: "https://ui.agezero.io", desc: "32+ shadcn-style primitives" },
        { icon: "FileText", name: "Templates", href: "https://templates.agezero.io", desc: "6 landing page templates" },
        { icon: "Wand", name: "Magic", href: "https://magic.agezero.io", desc: "AI component generator" },
      ]
    },
    {
      label: "AI Agents Toolkit",
      items: [
        { icon: "Brain", name: "Skills", href: "https://skills.agezero.io", desc: "12 built-in AI skills" },
        { icon: "Wrench", name: "Tools", href: "https://tools.agezero.io", desc: "Theme builder & playground" },
        { icon: "Search", name: "SEO", href: "https://seo.agezero.io", desc: "Next SEO kit" },
      ]
    },
    {
      label: "Operating System Toolkit",
      items: [
        { icon: "Zap", name: "MCP", href: "https://mcp.agezero.io", desc: "MCP server" },
        { icon: "Terminal", name: "CLI", href: "https://cli.agezero.io", desc: "CLI toolkit" },
        { icon: "Plug", name: "Connect", href: "https://connect.agezero.io", desc: "API connectors" },
      ]
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
      >
        Toolkits <ChevronDown size={12} />
      </button>
      {open && <MegaPanel toolkits={toolkits} onSelect={() => setOpen(false)} />}
    </div>
  );
}

function MegaPanel({ toolkits, onSelect }: { toolkits: any[]; onSelect: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onSelect} />
      <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2">
        <div className="w-[680px] rounded-xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-3 divide-x divide-border/60 p-4">
            {toolkits.map((tk) => (
              <div key={tk.label} className="px-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tk.label}</p>
                {tk.items.map((item: any) => (
                  <a key={item.name} href={item.href} className="mb-2 flex items-start gap-2.5 rounded-lg p-2 hover:bg-accent transition-colors group">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <span className="text-xs">🔗</span>
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-border/60 px-4 py-3">
            <a href="https://agezero.nl" className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent transition-colors">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary/20 to-primary/5 text-primary">🏠</span>
              <div>
                <p className="text-xs font-semibold">agezero.nl</p>
                <p className="text-[10px] text-muted-foreground">The full AgeZero platform</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}