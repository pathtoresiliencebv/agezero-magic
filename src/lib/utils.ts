import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally compose class names and resolve Tailwind CSS conflicts.
 *
 * Combines `clsx` (for conditional class construction) with
 * `tailwind-merge` (for intelligently merging conflicting Tailwind classes).
 * This is the canonical `cn()` helper used throughout AgeZero UI components.
 *
 * @example
 *   cn("px-2 py-1", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
