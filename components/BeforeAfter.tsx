// components/BeforeAfter.tsx
"use client";
import React, { useRef, useState } from "react";

type Props = {
  before: string;  // /public path e.g. "/ba-aj1-before.jpg"
  after: string;   // /public path e.g. "/ba-aj1-after.jpg"
  alt: string;     // shared alt text
  className?: string;
};

export default function BeforeAfter({ before, after, alt, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(50); // percentage

  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setX(Math.max(0, Math.min(100, pct)));
  };

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) setFromClientX(e.touches[0].clientX);
    else setFromClientX((e as React.MouseEvent).clientX);
    (e.currentTarget as HTMLElement).ownerDocument.addEventListener("mousemove", onMove as any);
    (e.currentTarget as HTMLElement).ownerDocument.addEventListener("touchmove", onMove as any, { passive: false });
    (e.currentTarget as HTMLElement).ownerDocument.addEventListener("mouseup", onUp as any);
    (e.currentTarget as HTMLElement).ownerDocument.addEventListener("touchend", onUp as any);
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    if (e instanceof TouchEvent) {
      e.preventDefault();
      setFromClientX(e.touches[0].clientX);
    } else {
      setFromClientX(e.clientX);
    }
  };

  const onUp = (e: MouseEvent | TouchEvent) => {
    const doc = (wrapRef.current as HTMLDivElement).ownerDocument;
    doc.removeEventListener("mousemove", onMove as any);
    doc.removeEventListener("touchmove", onMove as any);
    doc.removeEventListener("mouseup", onUp as any);
    doc.removeEventListener("touchend", onUp as any);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black ${className}`}
    >
      {/* After (full) */}
      <img
        src={after}
        alt={alt}
        className="block w-full h-auto select-none pointer-events-none"
        draggable={false}
        loading="lazy"
      />

      {/* Before (masked by width) */}
      <div
        className="absolute inset-0"
        style={{ width: `${x}%`, overflow: "hidden", pointerEvents: "none" }}
        aria-hidden
      >
        <img
          src={before}
          alt=""
          className="block w-full h-auto select-none"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Divider / handle */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `calc(${x}% - 1px)` }}
        aria-hidden
      >
        <div className="h-full w-0.5 bg-white/70" />
        <button
          aria-label="Drag to compare before and after"
          onMouseDown={onDown}
          onTouchStart={onDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-white/30 bg-black/50 backdrop-blur text-white/90"
        >
          ||
        </button>
      </div>

      {/* Labels */}
      <div className="absolute left-3 top-3 text-xs px-2 py-1 rounded bg-black/60 border border-white/10">
        Before
      </div>
      <div className="absolute right-3 top-3 text-xs px-2 py-1 rounded bg-black/60 border border-white/10">
        After
      </div>
    </div>
  );
}
