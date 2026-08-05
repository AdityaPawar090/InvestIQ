import React from "react";

// Cool blue/cyan brand mark — reads clearly on both light and dark backgrounds.
const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iq-logo-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="45%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="iq-logo-bolt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ECFEFF" />
        <stop offset="100%" stopColor="#CFFAFE" />
      </linearGradient>
    </defs>

    <rect width="64" height="64" rx="16" fill="url(#iq-logo-bg)" />

    <rect x="10" y="38" width="7" height="16" rx="2" fill="#DBEAFE" opacity="0.9" />
    <rect x="21" y="30" width="7" height="24" rx="2" fill="#DBEAFE" opacity="0.9" />
    <rect x="32" y="20" width="7" height="34" rx="2" fill="#DBEAFE" opacity="0.9" />

    <path
      d="M40 8 L26 34 H36 L30 56 L52 26 H41 Z"
      fill="url(#iq-logo-bolt)"
      stroke="#2563EB"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;