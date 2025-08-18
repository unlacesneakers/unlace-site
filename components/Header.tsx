// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const isActivePath = (path: string) => router.pathname === path;
  const isActiveHash = (hash: string) => router.asPath.endsWith(hash); // "/#services" or "/#pickup"

  const navClass = (active: boolean) =>
    active
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
          <Link href="/" className={navClass(isActivePath("/"))}>Home</Link>
          <a href="/#services" className={navClass(isActiveHash("#services"))}>Services</a>
          <a href="/#pickup" className={navClass(isActiveHash("#pickup"))}>Book</a>
          <Link href="/privacy" className={navClass(isActivePath("/privacy"))}>Privacy</Link>
          <Link href="/terms" className={navClass(isActivePath("/terms"))}>Terms</Link>
        </nav>
      </div>
    </header>
  );
}
