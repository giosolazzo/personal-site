// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

// Local lightweight image holder (no dynamic import needed)
function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square w-24 rounded-lg overflow-hidden bg-zinc-900/50 border border-zinc-800/70">
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* HERO */}
      <section className="px-6 pt-16 pb-6 text-center">
        <h1 className="mx-auto max-w-3xl font-semibold tracking-tight text-[34px] sm:text-5xl">
          Writing a story that only makes sense in reverse.
        </h1>
        <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.22em] text-zinc-400">
          THE MENU
        </p>
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
                className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm hover:bg-zinc-100 hover:text-black transition"
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
                className="rounded-full border border-zinc-700 px-6 py-2.5 text-sm hover:bg-zinc-100 hover:text-black transition"
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
              <div className="flex items-center gap-4">
                {/* image holder */}
                <Thumb src="/images/portfolio/home-card.webp" alt="portfolio" />
                <div>
                  <h2 className="text-lg font-medium">Portfolio</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    A collection of past work.
                  </p>
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
