import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const linkClass = (path: string) =>
    router.pathname === path
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-zinc-400 hover:text-white";

  return (
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold">
          UNLACE
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/terms" className={linkClass("/terms")}>
            Terms
          </Link>
          <Link href="/privacy" className={linkClass("/privacy")}>
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
