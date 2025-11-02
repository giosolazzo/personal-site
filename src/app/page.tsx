import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* HERO */}
      <section className="px-6 pt-20 pb-8 text-center">
        <h1
          className="mx-auto max-w-3xl font-display tracking-tight
                     text-4xl sm:text-5xl"
        >
          Writing a story that only makes sense in reverse.
        </h1>

        <div className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
          THE MENU
        </div>
      </section>

      {/* MENU CARDS */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {/* Midsummer */}
          <div className="rounded-2xl border border-zinc-800/70 p-5">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-medium">Midsummer</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Spoken explorations on breaking perfection.
                </p>
              </div>

              <a
                href="https://midsummerlab.com/midsummer"
                className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm
                           hover:bg-zinc-100 hover:text-black transition"
              >
                start
              </a>
            </div>
          </div>

          {/* Eon */}
          <div className="rounded-2xl border border-zinc-800/70 p-5">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-medium">Eon</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  A reflective project in progress.
                </p>
              </div>

              <Link
                href="/eon"
                className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm
                           hover:bg-zinc-100 hover:text-black transition"
              >
                pending
              </Link>
            </div>
          </div>

          {/* divider */}
          <div className="py-6 text-center text-zinc-600">────────</div>

          {/* Portfolio */}
          <div className="rounded-2xl border border-zinc-800/70 p-5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                {/* visible logo bubble */}
                <div className="relative h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <Image
                    src="/logo-square.png"   /* add a 1:1 logo here; falls back to empty box if missing */
                    alt=""
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Portfolio</h2>
                  <p className="mt-1 text-sm text-zinc-400">A collection of past work.</p>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm
                           hover:bg-zinc-100 hover:text-black transition"
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
