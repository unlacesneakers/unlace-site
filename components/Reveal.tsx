// components/Reveal.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number; // how far to slide up
};

export default function Reveal({
  children,
  delay = 0.1,
  duration = 0.6,
  y = 20,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible
    >
      {children}
    </motion.div>
  );
}
