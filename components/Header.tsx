// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [active, setActive] = useState<"home" | "services" | "pickup" | null>(null);

  // Observe sections only on the home page
  useEffect(() => {
    if (router.pathname !== "/") {
      setActive(null);
      return;
    }
    if (typeof window === "undefined") return;

    const sections = [
      { id: "services", key: "services" as const },
      { id: "pickup", key: "pickup" as const },
    ]
      .map(({ id, key }) => {
        const el = document.getElementById(id);
        return el ? { el, key } : null;
      })
      .filter(Boolean) as { el: Element; key: "services" | "pickup" }[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      entries => {
        // Sort by visibility and pick the most visible
        const visible = entries
          .filter(e => e.isIntersecting)
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
        // Top margin pushes the trigger down so it feels calmer
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      }
    );

    sections.forEach(s => obs.observe(s.el));
    // On first load, assume home
    setActive("home");

    return () => obs.disconnect();
  }, [router.pathname]);

  // Neat underline style (no layout shift)
  const itemClass = (isActive: boolean) =>
    [
      "relative transition-colors",
      isActive ? "text-white" : "text-zinc-400 hover:text-white",
      // underline indicator
      "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded after:transition-all",
      isActive ? "after:w-full after:bg-white" : "after:w-0 after:bg-transparent",
    ].join(" ");

  const pathIs = (p: string) => router.pathname === p;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand → Home */}
        <Link href="/" className="text-xl font-extrabold tracking-wide hover:text-zinc-300">
          UNLACE
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={itemClass(pathIs("/") && active === "home")}>Home</Link>
          <a href="/#services" className={itemClass(pathIs("/") && active === "services"))}>Services</a>
          <a href="/#pickup" className={itemClass(pathIs("/") && active === "pickup"))}>Book</a>
          <Link href="/privacy" className={itemClass(pathIs("/privacy"))}>Privacy</Link>
          <Link href="/terms" className={itemClass(pathIs("/terms"))}>Terms</Link>
        </nav>
      </div>
    </header>
  );
}
