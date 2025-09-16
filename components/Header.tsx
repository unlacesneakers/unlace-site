// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [active, setActive] = useState<"home" | "services" | "pickup" | null>(null);
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [router.pathname]);

  // Track which section is in view (desktop underline)
  useEffect(() => {
    if (router.pathname !== "/") {
      setActive(null);
      return;
    }
    if (typeof window === "undefined") return;

    const targets = ["services", "pickup"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    if (targets.length === 0) {
      setActive("home");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          setActive("home");
          return;
        }
        const id = (visible.target as HTMLElement).id;
        if (id === "services") setActive("services");
        else if (id === "pickup") setActive("pickup");
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] }
    );

    targets.forEach((el) => obs.observe(el));
    setActive("home");
    return () => obs.disconnect();
  }, [router.pathname]);

  const itemClass = (isActive: boolean) =>
    [
      "relative transition-colors",
      isActive ? "text-white" : "text-zinc-300 hover:text-white",
      "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded after:transition-all",
      isActive ? "after:w-full after:bg-white" : "after:w-0 after:bg-transparent",
    ].join(" ");

  const pathIs = (p: string) => router.pathname === p;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand text */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide hover:text-zinc-300"
          aria-label="UNLACE home"
        >
          UNLACE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={itemClass(pathIs("/") && active === "home")}>Home</Link>
          <a href="/#services" className={itemClass(pathIs("/") && active === "services")}>Services</a>
          <a href="/#pickup" className={itemClass(pathIs("/") && active === "pickup")}>Book</a>
          <a href="/#results" className={itemClass(pathIs("/") && active === null)}>Results</a>
          <Link href="/privacy" className={itemClass(pathIs("/privacy"))}>Privacy</Link>
          <Link href="/terms" className={itemClass(pathIs("/terms"))}>Terms</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 px-2.5 py-2 text-white/90 hover:bg-white/10"
        >
          {/* icon */}
          <span className="sr-only">Menu</span>
          {!open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2 text-sm">
            <Link href="/" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Home</Link>
            <a href="/#services" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Services</a>
            <a href="/#pickup" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Book</a>
            <a href="/#results" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Results</a>
            <Link href="/privacy" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Privacy</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="py-2 text-zinc-200 hover:text-white">Terms</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
