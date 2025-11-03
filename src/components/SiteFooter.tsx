import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400">
      {/* Match header width for alignment */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 h-14 flex items-center justify-between">
        <span className="text-sm">© 2025 Giuseppe Solazzo</span>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/midsummer" className="hover:text-white">Midsummer</Link>
        </nav>
      </div>
    </footer>
  );
}
