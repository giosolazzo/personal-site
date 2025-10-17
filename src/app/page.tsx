import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* Top rail */}
      <div className="px-6 py-4 flex items-center justify-between text-sm">
        <span className="opacity-90">hey, i’m giuseppe</span>
        <Link
          href="/contact"
          className="opacity-90 hover:opacity-100 underline underline-offset-4"
        >
          what’s the worst that could happen if you reached out?
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pt-8 pb-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
            Writing a story that only
            <br className="hidden sm:block" /> makes sense in reverse.
          </h1>

          {/* tiny “in” circle */}
          <div className="mt-6 flex justify-center">
            <a
              href="https://www.linkedin.com/in/giuseppesolazzo"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-zinc-700/60 grid place-items-center text-xs hover:bg-zinc-100 hover:text-black transition"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>

          <p className="mt-8 italic text-zinc-300">The menu</p>
        </div>
      </section>

      {/* Menu cards */}
      <section className="px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Midsummer */}
          <div className="rounded-2xl border border-zinc-700/60 p-5">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-medium">Midsummer</h2>
                <p className="text-sm mt-1 text-zinc-300">
                  Spoken explorations and workshops on breaking perfectionism
                </p>
              </div>
              <a
                href="https://midsummerlab.com/midsummer"
                className="px-5 py-2 rounded-full border border-zinc-600 hover:bg-zinc-100 hover:text-black transition text-sm"
              >
                start
              </a>
            </div>
          </div>

          {/* Eon */}
          <div className="rounded-2xl border border-zinc-700/60 p-5">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-medium">Eon</h2>
                <p className="text-sm mt-1 text-zinc-300">
                  A reflective project in progress — slowly coming to form
                </p>
              </div>
              <Link
                href="/eon"
                className="px-5 py-2 rounded-full border border-zinc-600 bg-zinc-100 text-black hover:opacity-90 transition text-sm"
              >
                pending
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="py-2 text-center text-zinc-500 select-none">──────────</div>

          {/* Portfolio */}
          <div className="rounded-2xl border border-zinc-700/60 p-5">
            <div className="flex items-center gap-4">
              {/* simple square “logo” placeholder; safe to remove if you add an image later */}
              <div className="h-14 w-14 rounded-lg bg-zinc-900 border border-zinc-700/60 grid place-items-center text-[10px] tracking-wide text-zinc-400">
                GIUSEPPE
                <br />
                SOLAZZO
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-medium">Portfolio</h2>
                <p className="text-sm mt-1 text-zinc-300">
                  A collection of past work
                </p>
              </div>

              <Link
                href="/portfolio"
                className="px-5 py-2 rounded-full border border-zinc-600 hover:bg-zinc-100 hover:text-black transition text-sm"
              >
                browse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (black background as requested) */}
      <footer className="px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-16" />
          <p className="text-center text-xs text-zinc-400">
            @ 2025 Giuseppe Solazzo
          </p>
          <div className="h-10" />
        </div>
      </footer>
    </main>
  );
}
