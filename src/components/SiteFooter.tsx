"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");

  return (
    <footer
      className={[
        // ensure it renders above the fixed background
        "relative z-10 text-zinc-400 h-16 mt-auto",
        isPortfolio ? "bg-transparent" : "bg-black",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-full grid grid-cols-3 items-center">
        <div />
        <span className="justify-self-center text-sm sm:text-base">
          @ 2025 Giuseppe Solazzo
        </span>
        <nav className="justify-self-end flex items-center gap-4 text-sm sm:text-base">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
