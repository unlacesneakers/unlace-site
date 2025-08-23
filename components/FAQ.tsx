// components/FAQ.tsx
import React, { useState } from "react";

export type QA = { q: string; a: React.ReactNode };

const FAQ: React.FC<{ title?: string; items: QA[] }> = ({ title = "FAQ", items }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-6">{title}</h2>

        <div className="rounded-2xl border border-white/10 divide-y divide-white/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  className="w-full text-left px-4 md:px-6 py-4 md:py-5 flex items-center justify-between"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-semibold">{item.q}</span>
                  <span className="ml-4 grid h-6 w-6 place-items-center rounded-full border border-white/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div className={`overflow-hidden transition-all ${isOpen ? "max-h-[400px] pb-5" : "max-h-0"}`}>
                  <div className="px-4 md:px-6 text-zinc-400 leading-relaxed text-sm">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
