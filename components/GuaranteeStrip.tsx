// File: components/GuaranteeStrip.tsx
import React from "react";

const GuaranteeStrip: React.FC = () => (
  <div className="bg-black text-white">
    <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </span>
        Satisfaction Guarantee
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </span>
        Gentle on suede & premium materials
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </span>
        Pick-up across Melbourne
      </div>
    </div>
  </div>
);

export default GuaranteeStrip;
