import * as React from "react";

/**
 * Props for every AgeZero UI icon.
 *
 * Accepts every standard SVG attribute (since it extends
 * `React.SVGProps<SVGSVGElement>`) and adds an optional `size` prop that
 * sets both `width` and `height` in pixel units. `size` defaults to `16`
 * to keep icons small by default; pass any number to override.
 *
 * @example
 *   <Brain size={20} className="text-primary" aria-hidden="true" />
 *   <Brain {...{ size: 24, strokeWidth: 2 }} />
 */
export type IconProps = React.SVGProps<SVGSVGElement> & {
  /** Pixel size (width = height). Defaults to 16. */
  size?: number;
};
