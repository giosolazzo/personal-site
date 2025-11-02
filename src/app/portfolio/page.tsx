import Link from "next/link";
import dynamic from "next/dynamic";
const Thumb = dynamic(() => import("@/components/Thumb"), { ssr: false });

const ITEMS = [
  { slug: "experience-1", title: "one of the first, one of the best - washing dishes at sodexo" },
  { slug: "experience-2", title: "multi-level marketing deep dive at essens europe" },
  { slug: "experience-3", title: "demand-responsive-transportation analysis at citya mobility" },
  { slug: "experience-4", title: "founding intern - providing access to experiences outside academia" },
  { slug: "experience-5", title: "development and market at findsparrow - supporting students by supporting communities" },
  { slug: "experience-6", title: "putting kos ai on a map in silicon valley - executive leadership at a healthtech startup" },
  { slug: "experience-7", title: "pit-stop at Kos before leaving US" },
  { slug: "experience-8", title: "what’s next..." },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-center text-5xl font-semibold">looking back│moving forward</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/portfolio/${it.slug}`}
              className="group block"
            >
              <Thumb src={`/images/portfolio/${it.slug}.webp`} alt={it.title} />
              <div className="mt-3 text-lg leading-snug group-hover:opacity-90">{it.title}</div>
              <div className="mt-3">
                <span className="inline-block rounded-full border border-zinc-700 px-4 py-2 text-sm group-hover:bg-zinc-100 group-hover:text-black transition">
                  read on
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
