import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-transparent">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        {/* left */}
        <Link href="/" className="text-zinc-100 font-medium tracking-wide">
          hey, i’m giuseppe
        </Link>

        {/* right (no underline) */}
        <Link
          href="/contact"
          className="text-sm text-zinc-300 hover:text-white no-underline"
        >
          what’s the worst that could happen if you reached out?
        </Link>
      </div>
    </header>
  );
}
