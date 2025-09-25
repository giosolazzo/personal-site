import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-medium tracking-wide">
          Giuseppe Solazzo
        </Link>

        <nav className="flex items-center gap-5 text-sm text-zinc-300">
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/eon" className="hover:text-white">Eon</Link>
          {/* External link stays an <a> */}
          <a href="https://midsummerlab.com/midsummer" className="hover:text-white">
            Midsummer
          </a>
        </nav>
      </div>
    </header>
  );
}
