import React from "react";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

/**
 * Official WhatsApp icon with brand-accurate geometry and colors.
 */
export default function WhatsAppIcon({
  className = "",
  size = 18,
}: WhatsAppIconProps) {
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
      <path
        fill="#25D366"
        d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9a11.84 11.84 0 0 0 1.59 5.95L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42z"
      />
      <path
        fill="#FFFFFF"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.78-1.48-1.76-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.59-.49-.51-.67-.52-.18-.01-.38-.01-.58-.01-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34z"
      />
    </svg>
  );
}
