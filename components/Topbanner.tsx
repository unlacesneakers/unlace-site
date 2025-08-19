// components/TopBanner.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    alt: "Clean white sneaker on neutral background",
  },
  {
    src: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop",
    alt: "Detail brush near sneaker midsole",
  },
  {
    src: "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop",
    alt: "Monochrome sneaker studio shot",
  },
];

const INTERVAL = 4.5;
const SWIPE_THRESHOLD = 80;

export default function TopBanner() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

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
      if (!hoverRef.current) next();
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

  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: -dir * 60, opacity: 0 }),
  };

  return (
    <div
      className="relative w-full bg-black"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="relative h-56 sm:h-72 md:h-96 lg:h-[28rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={SLIDES[index].src}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            draggable={false}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const offset = info.offset.x;
              if (offset < -SWIPE_THRESHOLD) next();
              else if (offset > SWIPE_THRESHOLD) prev();
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

        {/* Badge + CTA */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-3 py-1 text-xs font-semibold w-max">
              UNLACE <span className="opacity-60">•</span> Melbourne’s Premium Sneaker Laundry
            </div>
            <a
              href="#pickup"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:-translate-y-0.5 transition-transform w-max"
            >
              Book a Pickup
            </a>
          </div>
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 w-9 h-9 flex items-center justify-center backdrop-blur"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 w-9 h-9 flex items-center justify-center backdrop-blur"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
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
