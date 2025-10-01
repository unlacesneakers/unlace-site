// components/Testimonials.tsx
"use client";
import React from "react";
import { Quote, Star } from "lucide-react";

export type Testimonial = {
  id: string;
  quote: string;
  author?: string;
  meta?: string;        // e.g., suburb/date/handle
  rating?: 1 | 2 | 3 | 4 | 5;
};

type RatingSummary = {
  rating: number;       // e.g., 5.0
  total: number;        // e.g., 2
  reviewLink: string;   // your Google review link
};

export default function Testimonials({
  items,
  instagramUrl,
  ratingSummary,
}: {
  items: Testimonial[];
  instagramUrl?: string;
  ratingSummary?: RatingSummary;
}) {
  const hasReviews = items && items.length > 0;
  const REVIEW_LINK =
    ratingSummary?.reviewLink || "https://g.page/r/CdDLoz-4o6xIEAE/review";

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-white/10"
    >
      {/* Badge + summary */}
      <div className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
        <img src="/google-g-icon.png" alt="Google logo" className="h-5 w-5" />
        <span>
          Verified by <span className="text-white font-medium">Google Reviews</span>
        </span>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="text-2xl sm:text-4xl font-bold">What people say</h2>
        {ratingSummary && (
          <a
            href={REVIEW_LINK}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-300 hover:text-white"
            aria-label="View reviews on Google"
          >
            <span className="mr-1">⭐ {ratingSummary.rating.toFixed(1)}</span>
            <span className="opacity-70">· Based on {ratingSummary.total} Google review{ratingSummary.total === 1 ? "" : "s"}</span>
          </a>
        )}
      </div>
      <p className="text-sm text-zinc-400 mb-8">
        Trust signals from the community — verified reviews displayed below.
      </p>

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

              <p className="mt-3 text-zinc-200 leading-relaxed">“{t.quote}”</p>

              {(t.author || t.meta) && (
                <div className="mt-4 text-sm text-zinc-400">
                  {t.author && (
                    <span className="font-medium text-white">{t.author}</span>
                  )}
                  {t.author && t.meta && (
                    <span className="opacity-40 mx-2">•</span>
                  )}
                  {t.meta}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Leave a review button */}
      <div className="mt-10 text-center">
        <a
          href={REVIEW_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform"
        >
          Leave a Google Review
        </a>
      </div>
    </section>
  );
}
