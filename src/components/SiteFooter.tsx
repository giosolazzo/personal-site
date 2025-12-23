"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");

  return (
    <footer
      className={[
        "relative z-10 text-zinc-400 mt-auto",
        // keep your visual height, but allow safe-area padding
        "h-16",
        isPortfolio ? "bg-transparent" : "bg-black",
      ].join(" ")}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
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
