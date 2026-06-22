"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

/**
 * The root `Avatar` container. Always supply both an `AvatarImage` and an
 * `AvatarFallback` inside — the fallback is shown while the image loads
 * (or forever, if it fails).
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

/**
 * The actual image element. Will gracefully not render if the source fails
 * to load — in that case the `AvatarFallback` shows.
 */
export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
});

AvatarImage.displayName = "AvatarImage";

/**
 * Fallback content shown while the image is loading or if it fails. Most
 * often this is the user's initials (e.g. "JD" for John Doe).
 */
export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});

AvatarFallback.displayName = "AvatarFallback";
