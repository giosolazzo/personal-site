"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CAL_LINK = "https://cal.com/gio-solazzo";

export default function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ESC closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Click outside closes (for the small dropdown panel)
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <>
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
          <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 justify-end">
            {/* Anchor wrapper */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="cursor-pointer hover:text-zinc-100 transition whitespace-nowrap font-medium text-zinc-300 gs-title-wght"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                Begin a conversation
              </button>

              {/* Slide-down panel */}
              <div
                ref={panelRef}
                className={[
                  "absolute left-0 top-full mt-4 z-50",
                  "transition-all duration-200 ease-out",
                  open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none",
                ].join(" ")}
                role="menu"
                aria-label="Begin a conversation options"
              >
                <div className="px-1 py-1">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block py-1.5 text-zinc-300 hover:text-zinc-100 transition whitespace-nowrap"
                    role="menuitem"
                  >
                    Let’s have a call
                  </a>

                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block py-1.5 text-zinc-300 hover:text-zinc-100 transition whitespace-nowrap"
                    role="menuitem"
                  >
                    Send me a message
                  </Link>
                </div>
              </div>
            </div>

            <span className="text-zinc-700 select-none">/</span>

            <Link
              href="/privacy"
              className="hover:text-zinc-100 transition whitespace-nowrap"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      {/* Blur backdrop when open */}
      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[6px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
