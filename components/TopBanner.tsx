// components/TopBanner.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  {
    src: "/slide1.jpg",
    alt: "Air Jordan 1 Retro hanging",
  },
  {
    src: "/slide2.jpg",
    alt: "Air Jordan 1 Landscape",
  },
];

const INTERVAL = 5;
const SWIPE_THRESHOLD = 80;

export default function TopBanner() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const tRef = useRef<number | null>(null);
  const hovering = useRef(false);

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  };
  const prev = () => {
    setDir(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const start = () => {
    stop();
    tRef.current = window.setTimeout(() => {
      if (!hovering.current) next();
    }, INTERVAL * 1000);
  };
  const stop = () => {
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = null;
  };

  useEffect(() => {
    start();
    return stop;
  }, [index]);

  const variants = {
    enter: (d: 1 | -1) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: 1 | -1) => ({ x: -d * 40, opacity: 0 }),
  };

  return (
    <section
      aria-label="Featured sneakers"
      className="relative w-full bg-black"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="relative h-64 sm:h-80 md:h-[26rem] lg:h-[30rem] overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={SLIDES[index].src}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeOut" }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

        {/* CTA */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-6 flex justify-end">
            <a
              href="#pickup"
              className="rounded-2xl bg-white text-black px-5 py-2 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-sm"
            >
              Book a Pickup
            </a>
          </div>
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 w-9 h-9 flex items-center justify-center backdrop-blur text-white/90"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 w-9 h-9 flex items-center justify-center backdrop-blur text-white/90"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
