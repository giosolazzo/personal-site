import Link from "next/link";

export default function SiteHeader() {
  return (
    <header
      className="
        sticky top-0 z-40
        bg-black/60 backdrop-blur
        border-b border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      "
    >
      <div className="mx-auto max-w-5xl px-4 h-12 sm:h-14 flex items-center justify-between">
        <Link href="/" className="text-zinc-200 text-sm sm:text-base no-underline hover:opacity-90">
          hey, i’m giuseppe
        </Link>
        <Link href="/contact" className="text-zinc-300 text-sm no-underline hover:text-white">
          what’s the worst that could happen if you reached out?
        </Link>
      </div>
    </header>
  );
}
