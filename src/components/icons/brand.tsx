import * as React from "react";

import type { IconProps } from "./types";

/* -------------------------------------------------------------------------- */
/*  Brand / AI icons                                                          */
/*  Linear, 1.5px stroke, 24x24 viewBox, currentColor. AgeZero UI signature set.  */
/* -------------------------------------------------------------------------- */

/**
 * Brain — two interlocking hemispheres with a center seam and neural folds.
 */
export const Brain: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M9.5 3.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.65 3 3 0 0 0 1.4 5.2 3 3 0 0 0 4.6 2.65" />
    <path d="M14.5 3.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5.65 3 3 0 0 1-1.4 5.2 3 3 0 0 1-4.6 2.65" />
    <path d="M12 3v18" />
    <path d="M9 8.5c1 0 2 .5 3 1.5" />
    <path d="M15 8.5c-1 0-2 .5-3 1.5" />
    <path d="M9 13.5c1 0 2 .5 3 1.5" />
    <path d="M15 13.5c-1 0-2 .5-3 1.5" />
  </svg>
);

/**
 * Cpu — central die with 4 pins per side and a circular core.
 */
export const Cpu: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 2v3" />
    <path d="M15 2v3" />
    <path d="M9 19v3" />
    <path d="M15 19v3" />
    <path d="M2 9h3" />
    <path d="M2 15h3" />
    <path d="M19 9h3" />
    <path d="M19 15h3" />
  </svg>
);

/**
 * Bot — friendly robot head with antenna, eyes, and a mouth.
 */
export const Bot: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M12 4v3" />
    <circle cx="12" cy="4" r="1" />
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M2 13v2" />
    <path d="M22 13v2" />
    <circle cx="8.5" cy="13.5" r="1" />
    <circle cx="15.5" cy="13.5" r="1" />
    <path d="M9 17h6" />
  </svg>
);

/**
 * Sparkles — three four-pointed stars in a diagonal cluster.
 */
export const Sparkles: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
    <path d="M18 14l.9 2.5L21 17.5l-2.1 1L18 21l-.9-2.5L15 17.5l2.1-1z" />
    <path d="M5 14l.9 2.5L8 17.5l-2.1 1L5 21l-.9-2.5L2 17.5l2.1-1z" />
  </svg>
);

/**
 * Wand — magic wand with three small stars fanning from the tip.
 */
export const Wand: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M4 20L16 8" />
    <path d="M16 4v4" />
    <path d="M20 8h-4" />
    <path d="M6 6l1 2" />
    <path d="M8 4l-1 2" />
    <path d="M9 8l2 1" />
    <path d="M7 8l-2 1" />
  </svg>
);

/**
 * Atom — nucleus with two intersecting electron orbits.
 */
export const Atom: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <circle cx="12" cy="12" r="1.2" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.5"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.5"
      transform="rotate(120 12 12)"
    />
  </svg>
);

/**
 * Circuit — schematic with a chip, two traces, and end nodes.
 */
export const Circuit: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="8" y="8" width="8" height="8" rx="1" />
    <path d="M12 3v5" />
    <path d="M12 16v5" />
    <path d="M3 12h5" />
    <path d="M16 12h5" />
    <circle cx="12" cy="3" r="1" />
    <circle cx="12" cy="21" r="1" />
    <circle cx="3" cy="12" r="1" />
    <circle cx="21" cy="12" r="1" />
  </svg>
);

/**
 * Chip — rounded square die with 3 leads on each side and a center mark.
 */
export const Chip: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <path d="M9 3v2" />
    <path d="M12 3v2" />
    <path d="M15 3v2" />
    <path d="M9 19v2" />
    <path d="M12 19v2" />
    <path d="M15 19v2" />
    <path d="M3 9h2" />
    <path d="M3 12h2" />
    <path d="M3 15h2" />
    <path d="M19 9h2" />
    <path d="M19 12h2" />
    <path d="M19 15h2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

/**
 * Network — 4 nodes connected to a central hub in a cross pattern.
 */
export const Network: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <circle cx="12" cy="12" r="2" />
    <circle cx="5" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M7 7l3 3" />
    <path d="M17 7l-3 3" />
    <path d="M7 17l3-3" />
    <path d="M17 17l-3-3" />
  </svg>
);

/**
 * Robot — full-body bot with rounded head, body panel, and stubby base.
 */
export const Robot: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="5" y="3" width="14" height="10" rx="2" />
    <circle cx="9" cy="8" r="0.8" />
    <circle cx="15" cy="8" r="0.8" />
    <path d="M9 11h6" />
    <path d="M7 13v3" />
    <path d="M17 13v3" />
    <rect x="3" y="16" width="18" height="5" rx="1.5" />
    <path d="M9 19h6" />
  </svg>
);
