"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CAL_LINK = "https://cal.com/gio-solazzo";

export default function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");

  return (
    <header
      className={[
        "sticky top-0 z-40 text-zinc-100",
        isPortfolio ? "bg-transparent" : "bg-black",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* left */}
        <Link
          href="/"
          className="font-medium tracking-wide text-zinc-300 hover:text-zinc-100 transition text-sm sm:text-base whitespace-nowrap"
        >
          hey, I’m Giuseppe
        </Link>

        {/* right */}
        <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 flex-wrap justify-end">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition whitespace-nowrap"
            aria-label="Schedule a call"
            title="Schedule a call"
          >
            Let’s talk
          </a>

          <span className="text-zinc-700 select-none">/</span>

          <Link
            href="/contact"
            className="hover:text-zinc-100 transition text-right leading-tight max-w-42.5 sm:max-w-none"
            aria-label="Send a message"
            title="Send a message"
          >
            What’s the worst that could happen if you reached out?
          </Link>
        </nav>
      </div>
    </header>
  );
}
