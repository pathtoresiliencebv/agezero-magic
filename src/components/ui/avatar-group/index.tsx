import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AvatarGroupProps {
  /** Array of { name, src? } */
  users: Array<{ name: string; src?: string }>;
  /** Max number of avatars to show before a "+N" indicator. */
  max?: number;
  size?: number;
  className?: string;
}

/**
 * Stacked row of avatars with overlap. Falls back to initials when no
 * image is supplied.
 */
export function AvatarGroup({
  users,
  max = 4,
  size = 28,
  className,
}: AvatarGroupProps) {
  const shown = users.slice(0, max);
  const overflow = users.length - shown.length;
  return (
    <div className={cn("flex -space-x-2", className)}>
      {shown.map((u, i) => (
        <Avatar
          key={i}
          className="border-2 border-background"
          style={{ width: size, height: size }}
        >
          {u.src && <AvatarImage src={u.src} alt={u.name} />}
          <AvatarFallback className="text-[10px]">
            {u.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <span
          className="flex items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground"
          style={{ width: size, height: size }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}