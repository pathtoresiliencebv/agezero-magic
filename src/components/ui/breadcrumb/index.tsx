import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Slash } from "@/components/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron";
  className?: string;
}

/**
 * Page hierarchy. Renders a list of links separated by chevrons or
 * slashes. The last item is rendered as plain text (not a link).
 */
export function Breadcrumb({
  items,
  separator = "chevron",
  className,
}: BreadcrumbProps) {
  const Sep = separator === "slash" ? Slash : ChevronRight;
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "text-foreground font-medium")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <Sep
                  size={12}
                  className="text-muted-foreground/50"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}