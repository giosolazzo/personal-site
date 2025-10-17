import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between text-zinc-200">
        {/* left */}
        <Link href="/" className="text-sm tracking-wide hover:opacity-80">
          hey, i’m Giuseppe
        </Link>

        {/* right */}
        <Link
          href="/contact"
          className="text-sm hover:opacity-80 underline underline-offset-4 decoration-zinc-500"
        >
          what’s the worst that could happen if you reached out?
        </Link>
      </div>
    </header>
  );
}
