import * as React from "react";

import type { IconProps } from "./types";

/* -------------------------------------------------------------------------- */
/*  Media icons                                                               */
/*  Linear, 1.5px stroke, 24x24 viewBox, currentColor. AgeZero UI signature set.  */
/* -------------------------------------------------------------------------- */

/**
 * Play — right-pointing triangle inside a circle.
 */
export const Play: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Pause — two vertical bars inside a circle.
 */
export const Pause: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M10 8v8" />
    <path d="M14 8v8" />
  </svg>
);

/**
 * Image — picture frame with mountain + sun.
 */
export const Image: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="M3 17l5-5 4 4 3-3 6 6" />
  </svg>
);

/**
 * Camera — body with lens and viewfinder.
 */
export const Camera: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7l1.5-3h5L16 7" />
    <circle cx="12" cy="13.5" r="3.5" />
    <circle cx="17" cy="10" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Mic — rounded capsule on a stem with base.
 */
export const Mic: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 12a7 7 0 0 0 14 0" />
    <path d="M12 19v3" />
    <path d="M9 22h6" />
  </svg>
);

/**
 * Video — film body with lens circle and play triangle.
 */
export const Video: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
  </svg>
);

/**
 * Music — eighth note.
 */
export const Music: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <path d="M9 17V5l11-2v12" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="15.5" r="2.5" />
  </svg>
);

/**
 * Volume — speaker cone with sound waves.
 */
export const Volume: React.FC<IconProps> = ({ size = 16, ...props }) => (
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
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

/**
 * MicOff — microphone with strikethrough.
 */
export const MicOff: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2M19 12a7 7 0 0 1-.11 1.23M12 19v3M8 22h8" />
  </svg>
);

/**
 * VideoOff — video camera with strikethrough.
 */
export const VideoOff: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/**
 * VolumeX — muted speaker.
 */
export const VolumeX: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

/**
 * Cast — casting / screencast icon.
 */
export const Cast: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
    <line x1="2" y1="20" x2="2.01" y2="20" />
  </svg>
);

/**
 * Airplay — AirPlay icon.
 */
export const Airplay: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="6 17 12 21 18 17 12 13 6 17" />
    <path d="M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
  </svg>
);

/**
 * Speaker — hi-fi speaker.
 */
export const Speaker: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <circle cx="12" cy="14" r="4" />
    <line x1="12" y1="6" x2="12.01" y2="6" />
  </svg>
);
