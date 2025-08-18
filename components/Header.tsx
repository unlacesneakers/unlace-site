// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  // Simple active state: exact match for full pages
  const isActive = (path: string) => router.pathname === path;

  // Styles: active vs default
  const navClass = (path: string) =>
    isActive(path)
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-zinc-400 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand → always links home */}
        <Link href="/" className="text-xl font-extrabold tracking-wide hover:text-zinc-300">
          UNLACE
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={navClass("/")}>Home</Link>
          {/* On the home page, these anchor links scroll to sections */}
          <a href="/#services" className="text-zinc-400 hover:text-white">Services</a>
          <a href="/#pickup" className="text-zinc-400 hover:text-white">Book</a>
          <Link href="/privacy" className={navClass("/privacy")}>Privacy</Link>
          <Link href="/terms" className={navClass("/terms")}>Terms</Link>
        </nav>
      </div>
    </header>
  );
}
