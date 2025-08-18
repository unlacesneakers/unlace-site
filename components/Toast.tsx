import React from "react";
export default function Toast({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-50 transition-all ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl bg-white text-black px-4 py-3 text-sm shadow-lg">
        {children}
      </div>
    </div>
  );
}
