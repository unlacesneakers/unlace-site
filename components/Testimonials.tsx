// components/Testimonials.tsx
"use client";
import React from "react";
import { Quote, Star } from "lucide-react";

export type Testimonial = {
  id: string;
  quote: string;
  author?: string;      // e.g., "J. Nguyen"
  meta?: string;        // e.g., "Brunswick, VIC" or "@handle"
  rating?: 1 | 2 | 3 | 4 | 5;
};

export default function Testimonials({
  items,
  instagramUrl,
}: {
  items: Testimonial[];
  instagramUrl?: string;
}) {
  const hasReviews = items && items.length > 0;

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-white/10"
    >
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold">What people say</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Trust signals from the community — we’ll surface customer reviews here.
        </p>
      </div>

      {/* Empty / Coming soon */}
      {!hasReviews && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl border border-white/10 bg-black p-3">
              <Quote className="h-5 w-5 text-white/80" />
            </div>
            <div className="grow">
              <h3 className="text-lg font-semibold">Reviews coming soon</h3>
              <p className="mt-2 text-zinc-300">
                We’ve just opened up bookings. As we complete work for Melbourne
                sneakerheads, we’ll share verified reviews here.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="#pickup"
                  className="rounded-2xl bg-white text-black px-5 py-2 text-sm font-semibold hover:-translate-y-0.5 transition-transform"
                >
                  Book a Pickup
                </a>
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/20 px-5 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-colors"
                  >
                    DM us on Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of reviews */}
      {hasReviews && (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-white/10 bg-black p-6"
            >
              <div className="flex items-center gap-2 text-amber-300">
                {typeof t.rating === "number" &&
                  Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
              </div>

              <p className="mt-3 text-zinc-200 leading-relaxed">
                “{t.quote}”
              </p>

              {(t.author || t.meta) && (
                <div className="mt-4 text-sm text-zinc-400">
                  {t.author && <span className="font-medium text-white">{t.author}</span>}
                  {t.author && t.meta && <span className="opacity-40 mx-2">•</span>}
                  {t.meta}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
