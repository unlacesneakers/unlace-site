// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image"; // ✅ add this

export default function Header() {
  const router = useRouter();
  const [active, setActive] = useState<"home" | "services" | "pickup" | null>(null);

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
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      }
    );

    targets.forEach((el) => obs.observe(el));
    setActive("home");

    return () => obs.disconnect();
  }, [router.pathname]);

  const itemClass = (isActive: boolean) =>
    [
      "relative transition-colors",
      isActive ? "text-white" : "text-zinc-400 hover:text-white",
      "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded after:transition-all",
      isActive ? "after:w-full after:bg-white" : "after:w-0 after:bg-transparent",
    ].join(" ");

  const pathIs = (p: string) => router.pathname === p;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* ✅ Brand logo (white on black, fits h-16 header) */}
        <Link href="/" className="flex items-center gap-2" aria-label="UNLACE home">
          <Image
            src="/logo-unlace-white.png"   // put this file in /public
            alt="UNLACE"
            width={220}                     // safe default; CSS controls final size
            height={64}                     // matches h-16 header height
            priority
            className="h-16 w-auto object-contain"  // ~48px tall inside the 64px header (nice breathing room)
          />
        </Link>


        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={itemClass(pathIs("/") && active === "home")}>Home</Link>
          <a href="/#services" className={itemClass(pathIs("/") && active === "services")}>Services</a>
          <a href="/#pickup" className={itemClass(pathIs("/") && active === "pickup")}>Book</a>
          <Link href="/privacy" className={itemClass(pathIs("/privacy"))}>Privacy</Link>
          <Link href="/terms" className={itemClass(pathIs("/terms"))}>Terms</Link>
        </nav>
      </div>
    </header>
  );
}
