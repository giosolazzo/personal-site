import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-zinc-900">
      <div className="mx-auto max-w-5xl px-4 h-12 sm:h-14 flex items-center justify-between">
        <Link href="/" className="font-medium tracking-wide lowercase">
          hey, i’m giuseppe
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/eon" className="hover:text-white">Eon</Link>
          <a href="https://midsummerlab.com/midsummer" className="hover:text-white">Midsummer</a>
          <Link
            href="/contact"
            className="hover:text-white no-underline"
            aria-label="what’s the worst that could happen if you reached out?"
          >
            what’s the worst that could happen if you reached out?
          </Link>
        </nav>
      </div>
    </header>
  );
}
