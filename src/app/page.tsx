import Link from "next/link";
import Thumb from "@/components/Thumb";

export default function Home() {
  return (
    <main className="bg-black text-zinc-100">
      <div
        className="mx-auto max-w-3xl px-6
                   min-h-[calc(100svh-var(--hdr)-var(--ftr))]
                   flex flex-col"
      >
        {/* HERO */}
        <section className="pt-10 pb-1 text-center">
          <h1 className="mx-auto max-w-3xl font-semibold tracking-tight text-[30px] sm:text-5xl leading-[1.25]">
            <span className="block">Writing a story</span>
            <span className="block mt-1">that only makes sense in reverse.</span>
          </h1>

          {/* LinkedIn bubble under the title */}
          <div className="mt-5 flex justify-center">
            <a
              href="https://www.linkedin.com/in/giuseppe-solazzo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-4 py-2 text-sm sm:text-base text-zinc-200 hover:bg-zinc-100 hover:text-black transition"
              aria-label="Giuseppe on LinkedIn"
            >
              in
            </a>
          </div>

          {/* “THE MENU” a bit bigger */}
          <p className="mt-5 text-sm sm:text-base uppercase tracking-[0.22em] text-zinc-400">
            THE MENU
          </p>
        </section>

        {/* MENU CARDS */}
        <section className="pb-1">
          <div className="space-y-3">
            {/* Midsummer */}
            <div className="rounded-2xl border border-zinc-800/70 p-5">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-medium">Midsummer</h2>
                  <p className="mt-1 text-[15px] sm:text-base text-zinc-400">
                    Spoken explorations on breaking perfection.
                  </p>
                </div>
                <a
                  href="https://midsummerlab.com/midsummer"
                  className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm sm:text-base hover:bg-zinc-100 hover:text-black transition"
                >
                  start
                </a>
              </div>
            </div>

            {/* Eon */}
            <div className="rounded-2xl border border-zinc-800/70 p-5">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-medium">Eon</h2>
                  <p className="mt-1 text-[15px] sm:text-base text-zinc-400">
                    A reflective project in progress.
                  </p>
                </div>
                <Link
                  href="/eon"
                  className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm sm:text-base bg-white text-black hover:bg-black hover:text-white transition"
                >
                  pending
                </Link>
              </div>
            </div>

            {/* SHORT, BOLD WHITE DIVIDER (not full-width) */}
            <div className="my-6 sm:my-8 text-center">
              <span className="inline-block text-white font-semibold tracking-wider select-none">
                ----------------
              </span>
            </div>

            {/* Portfolio */}
            <div className="rounded-2xl border border-zinc-800/70 p-5">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Thumb src="/images/portfolio/gio-logo.png" alt="Giuseppe logo" size={56} />
                  <div>
                    <h2 className="text-lg sm:text-xl font-medium">Portfolio</h2>
                    <p className="mt-1 text-[15px] sm:text-base text-zinc-400">
                      A collection of past work.
                    </p>
                  </div>
                </div>

                <Link
                  href="/portfolio"
                  className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm sm:text-base hover:bg-zinc-100 hover:text-black transition"
                >
                  browse
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* small fixed spacer so footer is visible without scroll */}
        <div className="mt-auto h-2" />
      </div>
    </main>
  );
}
