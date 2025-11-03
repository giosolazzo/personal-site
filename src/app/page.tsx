import Link from "next/link";
import Thumb from "@/components/Thumb";

export default function Home() {
  return (
    <main className="bg-black text-zinc-100">
      {/* HERO */}
      <section className="px-6 pt-12 pb-2 text-center">
        <h1 className="mx-auto max-w-3xl font-semibold tracking-tight text-[32px] sm:text-5xl leading-tight">
          Writing a story that only makes sense in reverse.
        </h1>

        {/* LinkedIn bubble under the title */}
        <div className="mt-4 flex justify-center">
          <a
            href="https://www.linkedin.com/in/giuseppe-solazzo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-100 hover:text-black transition"
            aria-label="Giuseppe on LinkedIn"
          >
            in
          </a>
        </div>

        <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.22em] text-zinc-400">
          THE MENU
        </p>
      </section>

      {/* MENU CARDS */}
      <section className="px-6 pb-1">
        <div className="mx-auto max-w-3xl space-y-3">
          {/* Midsummer */}
          <div className="rounded-2xl border border-zinc-800/70 p-4">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h2 className="text-base sm:text-lg font-medium">Midsummer</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Spoken explorations on breaking perfection.
                </p>
              </div>
              <a
                href="https://midsummerlab.com/midsummer"
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-100 hover:text-black transition"
              >
                start
              </a>
            </div>
          </div>

          {/* Eon */}
          <div className="rounded-2xl border border-zinc-800/70 p-4">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h2 className="text-base sm:text-lg font-medium">Eon</h2>
                <p className="mt-1 text-sm text-zinc-400">A reflective project in progress.</p>
              </div>
              <Link
                href="/eon"
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm bg-white text-black hover:bg-black hover:text-white transition"
              >
                pending
              </Link>
            </div>
          </div>

          {/* divider */}
          <hr className="my-2 border-zinc-800/70" />

          {/* Portfolio */}
          <div className="rounded-2xl border border-zinc-800/70 p-4">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                {/* image holder (reads /public/images/portfolio/...) */}
                <Thumb src="/images/portfolio/gio-logo.png" alt="Giuseppe logo" size={56} />
                <div>
                  <h2 className="text-base sm:text-lg font-medium">Portfolio</h2>
                  <p className="mt-1 text-sm text-zinc-400">A collection of past work.</p>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-100 hover:text-black transition"
              >
                browse
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
