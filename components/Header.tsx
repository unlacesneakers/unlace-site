import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-wide hover:text-zinc-400">
          UNLACE
        </Link>
        <nav className="flex gap-6 text-sm text-zinc-400">
          <Link href="/#services" className="hover:text-white">Services</Link>
          <Link href="/#pickup" className="hover:text-white">Book</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </nav>
      </div>
    </header>
  );
}
