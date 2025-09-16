// components/BeforeAfterStatic.tsx
"use client";
import Image from "next/image";
import React from "react";

type Props = {
  /** Path in /public (e.g. "/results/aj1-pair.webp") */
  src: string;
  alt: string;
  /** Optional: custom labels */
  leftLabel?: string;   // default: "Before"
  rightLabel?: string;  // default: "After"
  /** Optional wrapper classes (e.g., width controls) */
  className?: string;
};

export default function BeforeAfterStatic({
  src,
  alt,
  leftLabel = "Before",
  rightLabel = "After",
  className = "",
}: Props) {
  return (
    <figure
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black",
        "shadow-sm",
        className || "w-full max-w-xl mx-auto",
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}         // intrinsic width (won’t force layout)
        height={800}         // intrinsic height; aspect won’t stretch
        priority={false}
        className="h-auto w-full object-cover"
      />

      {/* Left badge (Before) */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"
        aria-hidden
      >
        {leftLabel}
      </span>

      {/* Right badge (After) */}
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/15 bg-white/90 px-2.5 py-1 text-xs font-semibold text-black"
        aria-hidden
      >
        {rightLabel}
      </span>
    </figure>
  );
}
