// components/UnlaceShoeIcon.tsx
import React from "react";

type Props = {
  height?: number;          // pixel height (defaults below)
  className?: string;       // e.g. "text-white"
  title?: string;
};

/**
 * Hand-traced minimalist shoe icon inspired by your logo.
 * Uses currentColor so you can theme it with Tailwind (e.g., text-white).
 */
export default function UnlaceShoeIcon({
  height = 56,
  className = "text-white",
  title = "UNLACE shoe",
}: Props) {
  return (
    <svg
      viewBox="0 0 200 110"
      height={height}
      aria-label={title}
      role="img"
      className={className}
    >
      {/* Outline strokes */}
      <g fill="none" stroke="currentColor" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
        {/* Sole */}
        <path d="M10 88 C40 90, 78 86, 110 74 C128 67, 140 59, 154 51 C160 48, 166 50, 172 54 C181 60, 188 64, 192 64 C195 64, 196 70, 189 75 C181 81, 171 88, 160 88 L10 88 Z" />
        {/* Upper sweep */}
        <path d="M26 69 C40 58, 52 54, 68 55 C77 56, 88 60, 100 68" />
        {/* Lace throat */}
        <path d="M70 55 C72 59, 78 63, 84 66" />
        {/* Heel to toe upper */}
        <path d="M26 69 C30 53, 36 40, 40 36 C45 31, 50 31, 56 34 C64 38, 72 44, 84 48 C100 53, 114 50, 128 44" />
        {/* Signature lace loop rising above heel */}
        <path d="M50 28 C50 18, 58 12, 66 14 C72 16, 74 22, 72 30 C70 38, 74 44, 78 50" />
      </g>
    </svg>
  );
}
