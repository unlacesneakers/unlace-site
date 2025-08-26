// components/FloatingCta.tsx
"use client";
import React from "react";

export default function FloatingCta() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <a
          href="#pickup"
          className="block text-center rounded-2xl bg-white text-black px-6 py-3 font-semibold shadow-lg active:translate-y-[1px]"
        >
          Book a Pickup
        </a>
      </div>
      {/* subtle safe area / blur bar */}
      <div className="h-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
    </div>
  );
}
