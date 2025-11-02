import Image from "next/image";

const items = [
  { slug: "1-sodexo", title: "one of the first, one of the best - washing dishes at sodexo" },
  { slug: "2-essens", title: "multi-level marketing deep dive at essens europe" },
  { slug: "3-citya", title: "demand-responsive-transportation analysis at citya mobility" },
  { slug: "4-founding-intern", title: "founding intern - providing access to experiences outside academia" },
  { slug: "5-findsparrow", title: "development and market at findsparrow - supporting students by supporting communities" },
  { slug: "6-kos-exec", title: "putting kos ai on a map in silicon valley - executive leadership at a healthtech startup" },
  { slug: "7-kos-pitstop", title: "pit-stop at Kos before leaving US" },
  { slug: "8-next", title: "what’s next..." },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="px-6 pt-16 pb-6 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">
          looking back│moving forward
        </h1>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.slug}
              className="rounded-2xl border border-zinc-800/70 overflow-hidden hover:border-zinc-700 transition"
            >
              <div className="relative aspect-[4/3] bg-zinc-900">
                <Image
                  src={`/portfolio/${it.slug}.jpg`}   /* upload later */
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-medium leading-snug">
                  {i + 1}. {it.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
