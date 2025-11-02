import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-black text-zinc-300 border-t border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <span className="text-sm">© 2025 Giuseppe Solazzo</span>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <a
            href="https://midsummerlab.com/midsummer"
            className="hover:text-white"
          >
            Midsummer
          </a>
        </nav>
      </div>
    </footer>
  );
}
