import Link from "next/link";

const ITEMS = [
  { slug: "experience-1", title: "Experience #1" },
  { slug: "experience-2", title: "Experience #2" },
  { slug: "experience-3", title: "Experience #3" },
  { slug: "experience-4", title: "Experience #4" },
  { slug: "experience-5", title: "Experience #5" },
  { slug: "experience-6", title: "Experience #6" },
  { slug: "experience-7", title: "Experience #7" },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-semibold">Portfolio</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/portfolio/${it.slug}`}
              className="rounded-2xl border border-zinc-700/60 p-5 hover:bg-zinc-100 hover:text-black transition block"
            >
              <div className="text-lg font-medium">{it.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
