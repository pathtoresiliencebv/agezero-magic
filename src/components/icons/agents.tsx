import * as React from "react";

import type { IconProps } from "./types";

/* -------------------------------------------------------------------------- */
/*  Agents / Tools icons                                                      */
/*  Linear, 1.5px stroke, 24x24 viewBox, currentColor. AgeZero UI signature set.  */
/* -------------------------------------------------------------------------- */

/**
 * Wrench — adjustable wrench with offset head and open jaw.
 */
export const Wrench: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.7 6.3a4 4 0 0 1 5 5l-2.5-1.5L15 12l-3 3-2.2-2.2 2.2-3.2 1.2-1.2z" />
    <path d="M11 13L4 20" />
    <path d="M4 20l3-1" />
  </svg>
);

/**
 * Hammer — claw hammer with diagonal handle.
 */
export const Hammer: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 4l6 6-2 2-2-2-1 1-2-2 1-1-2-2z" />
    <path d="M13 9L4 20" />
    <path d="M9 5l-2 2" />
  </svg>
);

/**
 * Code — angle brackets around a forward slash.
 */
export const Code: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 6L3 12l5 6" />
    <path d="M16 6l5 6-5 6" />
    <path d="M14 4l-4 16" />
  </svg>
);

/**
 * Terminal — window with prompt and caret.
 */
export const Terminal: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 9l3 3-3 3" />
    <path d="M13 15h4" />
  </svg>
);

/**
 * Webhook — three connected nodes forming a hook with a center post.
 */
export const Webhook: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3" />
    <path d="M6 16.98c-1.66 0-3-1.34-3-3s1.34-3 3-3" />
    <path d="M18 16.98c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    <path d="M6 16.98V21" />
    <path d="M6 11V7" />
    <path d="M9 7h6" />
  </svg>
);

/**
 * Plug — outlet plug with two pins and cable.
 */
export const Plug: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 2v4" />
    <path d="M15 2v4" />
    <path d="M7 6h10v6a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
    <path d="M12 17v5" />
  </svg>
);

/**
 * Function — cursive 'f' inside a soft-cornered square.
 */
export const Function: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 4l-2 4h-4l-2 4h4l-2 4" />
  </svg>
);

/**
 * Database — classic cylinder with two ellipses and a connecting curve.
 */
export const Database: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

/**
 * Globe — meridians and equator over a circle.
 */
export const Globe: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

/**
 * KeyRound — round key bow with shaft and two teeth.
 */
export const KeyRound: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="8" cy="15" r="4" />
    <path d="M10.8 12.2L21 2" />
    <path d="M18 5l3 3" />
    <path d="M15 8l3 3" />
  </svg>
);
