import Link from "next/link";

const ITEMS = [
  { slug: "experience-1",  title: "one of the first, one of the best - washing dishes at sodexo" },
  { slug: "experience-2",  title: "multi-level marketing deep dive at essens europe" },
  { slug: "experience-3",  title: "demand-responsive-transportation analysis at citya mobility" },
  { slug: "experience-4",  title: "founding intern - providing access to experiences outside academia" },
  { slug: "experience-5-6",title: "development and market at findsparrow - supporting students by supporting communities" },
  { slug: "experience-7",  title: "putting kos ai on a map in silicon valley - executive leadership at a healthtech startup" },
  { slug: "experience-8",  title: "pit-stop at Kos before leaving US" },
  { slug: "whats-next",   title: "what’s next..." },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="font-display text-[clamp(28px,6vw,44px)]">
          looking back│moving forward
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/portfolio/${it.slug}`}
              className="group rounded-2xl border border-zinc-800/70 overflow-hidden hover:border-zinc-600/80 transition"
            >
              {/* image placeholder (swap with <Image /> later) */}
              <div className="aspect-[4/3] bg-zinc-900" />
              <div className="p-4">
                <h2 className="text-base font-medium leading-snug group-hover:text-white">{it.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
