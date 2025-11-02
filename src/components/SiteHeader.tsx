import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800
                       bg-transparent supports-[backdrop-filter]:bg-black/35 backdrop-blur">
      <div className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between text-zinc-200">
        <Link href="/" className="text-sm tracking-wide hover:opacity-80 font-display">
          hey, i’m giuseppe
        </Link>

        <Link
          href="/contact"
          aria-label="Contact"
          className="text-sm hover:opacity-80 font-display"
        >
          what’s the worst that could happen if you reached out?
        </Link>
      </div>
    </header>
  );
}
