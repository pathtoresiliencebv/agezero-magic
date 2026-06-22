"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /**
   * The currently selected value. The `Slider` always works with an
   * array of numbers internally; for a single-value slider just pass
   * `[value]`.
   */
  value?: number[];
  /** The default selected value (uncontrolled). */
  defaultValue?: number[];
}

/**
 * A horizontal slider, built on `@radix-ui/react-slider`. Renders a
 * single thumb by default; pass an array with two values to enable a
 * range slider.
 */
export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider({ className, ...props }, ref) {
  const thumbCount = Array.isArray(props.value)
    ? props.value.length
    : Array.isArray(props.defaultValue)
      ? props.defaultValue.length
      : 1;

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:min-w-40",
        "data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";
