import * as React from "react";

import type { IconProps } from "./types";

/* -------------------------------------------------------------------------- */
/*  Communication icons                                                       */
/*  Linear, 1.5px stroke, 24x24 viewBox, currentColor. AgeZero UI signature set.  */
/* -------------------------------------------------------------------------- */

/**
 * MessageSquare — chat bubble with tail.
 */
export const MessageSquare: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M3 5h18v12H7l-4 4z" />
  </svg>
);

/**
 * MessageCircle — round chat bubble.
 */
export const MessageCircle: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
  </svg>
);

/**
 * Messages — two stacked bubbles.
 */
export const Messages: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M3 5h14v10H8l-5 4z" />
    <path d="M21 9v10h-7l-3 3v-3H7" />
  </svg>
);

/**
 * Phone — handset.
 */
export const Phone: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M4 5a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-1 2.2 12 12 0 0 0 7.8 7.8A3 3 0 0 1 19 14a3 3 0 0 1-3 3A15 15 0 0 1 4 5z" />
  </svg>
);

/**
 * VideoCall — video frame with two people silhouettes.
 */
export const VideoCall: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-2v8l-5-2z" />
    <circle cx="8" cy="11" r="1.5" />
    <path d="M5 16c0-2 1.5-3 3-3s3 1 3 3" />
  </svg>
);

/**
 * Send — paper plane.
 */
export const Send: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M3 12l18-8-6 18-3-7z" />
    <path d="M12 15l-3-3" />
  </svg>
);

/**
 * At — @ symbol.
 */
export const At: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 7.7" />
  </svg>
);

/**
 * Link — chain link.
 */
export const Link: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
  </svg>
);