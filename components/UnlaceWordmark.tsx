// components/UnlaceWordmark.tsx
import React from "react";
import UnlaceShoeIcon from "./UnlaceShoeIcon";

type Props = {
  size?: number;        // icon height in px; text scales with it
  className?: string;   // container classes
};

export default function UnlaceWordmark({ size = 56, className = "" }: Props) {
  // simple text size mapping (tweak as you like)
  const textPx = Math.round(size * 0.9); // ~ proportional to icon height
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} style={{ lineHeight: 0 }}>
      <UnlaceShoeIcon height={size} className="text-white" />
      <span
        className="font-extrabold tracking-tight text-white"
        style={{ fontSize: `${textPx}px` }}
        aria-label="UNLACE"
      >
        UNLACE
      </span>
    </div>
  );
}
