// components/TopBanner.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = { src: string; alt: string };

// Royalty-free (Unsplash) hypebeast-style sneaker shots
// You can swap these anytime; these links are hotlinked from Unsplash CDN.
const SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    alt: "Crisp white sneakers — minimal studio vibe",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    alt: "Streetwear look with high-top sneakers",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-bb2f1f5f80d3?q=80&w=1600&auto=format&fit=crop",
    alt: "Monochrome sneaker close-up — hype detail",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497683-56e16d1d7d5e?q=80&w=1600&auto=format&fit=crop",
    alt: "Lifestyle sneaker shot — urban mood",
  },
];

const INTERVAL = 4.5;            // seconds per slide
const SWIPE_THRESHOLD = 80;      // px to trigger swipe

export default function TopBanner() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  function start() {
    stop();
    timerRef.current = window.setTimeout(() => {
      if (!isHovering.current) next();
    }, INTERVAL * 1000);
  }
  function stop() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Softer, cleaner fade/slide
  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: -dir * 40, opacity: 0 }),
  };

  return (
    <div
      className="relative w-full bg-black"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
      aria-label="Featured sneaker slides"
    >
      {/* Height — adjust if you want taller/shorter */}
      <div className="relative h-56 sm:h-72 md:h-96 lg:h-[28rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={SLIDES[index].src}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 50%" }}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            draggable={false}
            // Swipe / drag on mobile
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const offset = info.offset.x;
              if (offset < -SWIPE_THRESHOLD) next();
              else if (offset > SWIPE_THRESHOLD) prev();
            }}
          />
        </AnimatePresence>

        {/* Gentle gradient for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

        {/* Right-aligned CTA (kept minimal) */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-5 flex items-end justify-end">
            <a
              href="#pickup"
              className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-sm"
            >
              Book a Pickup
            </a>
          </div>
        </div>

        {/* Subtle arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 w-9 h-9 flex items-center justify-center backdrop-blur text-white/90"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 w-9 h-9 flex items-center justify-center backdrop-blur text-white/90"
        >
          ›
        </button>

        {/* Minimal dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
