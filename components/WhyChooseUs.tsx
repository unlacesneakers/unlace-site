// components/WhyChooseUs.tsx
import React from "react";

export type Benefit = {
  id: string;
  title: string;
  desc: string;
};

const WhyChooseUs: React.FC<{ items: Benefit[] }> = ({ items }) => (
  <section id="why-us" className="py-16 md:py-24 bg-black border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold mb-6">Why choose UNLACE</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <div key={b.id} className="rounded-2xl border border-white/10 p-6 bg-zinc-950">
            <h3 className="text-lg font-semibold">{b.title}</h3>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
