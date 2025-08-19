// components/TopBanner.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  src: string;
  alt: string;
};

const SLIDES: Slide[] = [
  { src: "/banners/1.jpg", alt: "Premium sneaker cleaning — white leather sneaker" },
  { src: "/banners/2.jpg", alt: "Before and after midsole whitening" },
  { src: "/banners/3.jpg", alt: "Detailing brush on suede upper" },
];

// seconds per slide
const INTERVAL = 4.5;

export default function TopBanner() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  // autoplay
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function start() {
    stop();
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL * 1000);
  }
  function stop() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  // handlers for dots / swipe
  function goTo(i: number) {
    stop();
    setIndex(i % SLIDES.length);
  }

  return (
    <div className="relative w-full bg-black">
      {/* Slider height: adjust as you like */}
      <div className="relative h-56 sm:h-72 md:h-96 lg:h-[28rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={SLIDES[index].src}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Soft gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

        {/* Optional headline (can remove if you want just photos) */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-3 py-1 text-xs font-semibold">
              UNLACE
              <span className="opacity-60">•</span>
              Melbourne’s Premium Sneaker Laundry
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
