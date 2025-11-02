import Link from "next/link";
import Thumb from "@/components/Thumb";

const ITEMS = [
  { slug: "sodexo",        title: "one of the first, one of the best - washing dishes at sodexo", img: "/images/portfolio/sodexo.webp" },
  { slug: "essens",        title: "multi-level marketing deep dive at essens europe",              img: "/images/portfolio/essens.webp" },
  { slug: "citya",         title: "demand-responsive-transportation analysis at citya mobility",   img: "/images/portfolio/citya.webp" },
  { slug: "founding-intern", title: "founding intern - providing access to experiences outside academia", img: "/images/portfolio/founding-intern.webp" },
  { slug: "findsparrow",   title: "development & market at findsparrow — supporting students & communities", img: "/images/portfolio/findsparrow.webp" },
  { slug: "kos-coo",       title: "putting kos ai on a map in silicon valley — executive leadership at a healthtech startup", img: "/images/portfolio/kos-coo.webp" },
  // Add the rest as you add images:
  // { slug: "kos-ops", title: "pit-stop at Kos", img: "/images/portfolio/kos-ops.webp" },
  // { slug: "whats-next", title: "what’s next…", img: "/images/portfolio/whats-next.webp" },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl sm:text-5xl font-semibold tracking-tight">
          looking back<span className="mx-2">|</span>moving forward
        </h1>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/portfolio/${it.slug}`}
              className="group rounded-2xl border border-zinc-800/70 p-5 hover:bg-zinc-100 hover:text-black transition block"
            >
              <Thumb src={it.img} alt={it.title} className="w-24 mb-4" />
              <div className="text-base leading-snug">{it.title}</div>
              <div className="mt-4 inline-flex rounded-full border border-current px-4 py-1 text-sm">
                read on
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-zinc-500 px-5 py-2 text-sm hover:bg-zinc-100 hover:text-black transition"
          >
            full portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
