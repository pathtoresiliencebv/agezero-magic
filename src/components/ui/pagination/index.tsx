import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "@/components/icons";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Number of page buttons to show on each side of the current one. */
  siblingCount?: number;
  className?: string;
}

/**
 * Pagination control. Shows prev/next, current page, and a window of
 * sibling pages with ellipses.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const items = React.useMemo(() => {
    const out: Array<number | "ellipsis-left" | "ellipsis-right"> = [];
    const left = Math.max(2, page - siblingCount);
    const right = Math.min(totalPages - 1, page + siblingCount);

    if (totalPages <= 1) return [1];
    out.push(1);
    if (left > 2) out.push("ellipsis-left");
    for (let i = left; i <= right; i++) out.push(i);
    if (right < totalPages - 1) out.push("ellipsis-right");
    if (totalPages > 1) out.push(totalPages);
    return out;
  }, [page, totalPages, siblingCount]);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Button
        size="icon"
        variant="outline"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </Button>
      {items.map((it, i) =>
        it === "ellipsis-left" || it === "ellipsis-right" ? (
          <span
            key={i}
            className="px-2 text-xs text-muted-foreground"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Button
            key={i}
            size="icon"
            variant={it === page ? "default" : "outline"}
            onClick={() => onPageChange(it)}
            aria-current={it === page ? "page" : undefined}
            aria-label={`Page ${it}`}
          >
            {it}
          </Button>
        )
      )}
      <Button
        size="icon"
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </Button>
    </nav>
  );
}