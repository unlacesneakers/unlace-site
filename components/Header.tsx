// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState<string>("");

  // Observe sections to set activeHash while scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = [
      document.querySelector("#services"),
      document.querySelector("#pickup"),
    ].filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const isActivePath = (path: string) => router.pathname === path;
  const navClass = (active: boolean) =>
    active
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-zinc-400 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand → Home */}
        <Link href="/" className="text-xl font-extrabold tracking-wide hover:text-zinc-300">
          UNLACE
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={navClass(isActivePath("/"))}>Home</Link>
          <a href="/#services" className={navClass(activeHash === "#services")}>Services</a>
          <a href="/#pickup" className={navClass(activeHash === "#pickup")}>Book</a>
          <Link href="/privacy" className={navClass(isActivePath("/privacy"))}>Privacy</Link>
          <Link href="/terms" className={navClass(isActivePath("/terms"))}>Terms</Link>
        </nav>
      </div>
    </header>
  );
}
