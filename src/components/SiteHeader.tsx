import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black text-zinc-100 border-b border-white/10">
      {/* Wider container so items aren't overly centered */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* left: site label */}
        <Link href="/" className="font-medium tracking-wide">
          hey, i’m giuseppe
        </Link>

        {/* right: contact */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/contact" className="font-semibold hover:opacity-80 no-underline">
            what’s the worst that could happen if you reached out?
          </Link>
        </nav>
      </div>
    </header>
  );
}
