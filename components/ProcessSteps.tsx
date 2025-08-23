// components/ProcessSteps.tsx
import React from "react";

export type Step = { id: string; title: string; desc: string };

const ProcessSteps: React.FC<{ items: Step[]; title?: string }> = ({
  items,
  title = "How it works",
}) => (
  <section id="process" className="py-16 md:py-24 bg-black border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold mb-6">{title}</h2>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((s, i) => (
          <li
            key={s.id}
            className="relative rounded-2xl border border-white/10 p-6 bg-zinc-950"
          >
            <div className="absolute -left-3 -top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm font-semibold">
              {i + 1}
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
