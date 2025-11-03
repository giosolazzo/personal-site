"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");

  return (
    <header
      className={[
        "sticky top-0 z-40 text-zinc-100 border-b",
        isPortfolio ? "bg-transparent border-transparent" : "bg-black border-white/10",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* left: site label */}
        <Link href="/" className="font-medium tracking-wide">
          hey, i’m giuseppe
        </Link>

        {/* right: contact */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/contact"
            className="font-semibold hover:opacity-80 no-underline"
          >
            what’s the worst that could happen if you reached out?
          </Link>
        </nav>
      </div>
    </header>
  );
}
