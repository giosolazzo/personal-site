import Link from "next/link";

const ITEMS = [
  { slug: "sodexo", title: "one of the first, one of the best - washing dishes at sodexo" },
  { slug: "essens", title: "multi-level marketing deep dive at essens europe" },
  { slug: "citya", title: "demand-responsive-transportation analysis at citya mobility" },
  { slug: "founding-intern", title: "founding intern - providing access to experiences outside academia" },
  { slug: "findsparrow", title: "development and market at findsparrow - supporting students by supporting communities" },
  { slug: "kos-coo", title: "putting kos ai on a map in silicon valley - executive leadership at a healthtech startup" },
  { slug: "kos-ops", title: "pit-stop at Kos before leaving US (People & Operations)" },
  { slug: "whats-next", title: "What’s next…" },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-[--color-ivory] text-zinc-900 px-6 py-14">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-center text-4xl sm:text-5xl font-semibold">
          looking back│moving forward
        </h1>

        <div className="grid gap-4 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/portfolio/${it.slug}`}
              className="rounded-2xl border border-zinc-300/70 p-5 hover:bg-black hover:text-white transition block"
            >
              <div className="text-lg font-medium">{it.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
