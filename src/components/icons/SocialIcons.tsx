import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Official Facebook brand icon with official Blue (#1877F2) and crisp white "f"
 */
export function FacebookIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M15.12 12.86l.54-3.53h-3.39V7.04c0-.97.47-1.91 2-1.91h1.54V2.12c-.27-.04-1.22-.12-2.31-.12-2.36 0-3.9 1.43-3.9 4.02v2.31H6.5v3.53h3.09V22h3.8v-9.14h1.73z"
      />
    </svg>
  );
}

/**
 * Official Instagram brand icon with signature sunset gradient (#f09433 -> #bc1888) and white camera
 */
export function InstagramIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dcw-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#dcw-ig-grad)" />
      <path
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.8h-9A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7z"
      />
      <circle cx="12" cy="12" r="3.3" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <circle cx="17" cy="7" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Official LinkedIn brand icon with official Blue (#0A66C2) and crisp white "in"
 */
export function LinkedInIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5.5" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M6.94 19H3.96V9.52h2.98V19zM5.45 8.23a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46zM19.04 19h-2.98v-4.67c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46V19H9.74V9.52h2.86v1.3h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V19z"
      />
    </svg>
  );
}

export { default as WhatsAppIcon } from "./WhatsAppIcon";
