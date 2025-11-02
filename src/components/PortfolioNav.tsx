import Link from "next/link";

type Node = { slug: string; title: string };

export function PortfolioNav({
  prev,
  next,
}: {
  prev?: Node;
  next?: Node;
}) {
  return (
    <nav className="mt-12 pt-6 border-t border-zinc-300/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Prev */}
        <div className="min-w-0">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-500 px-4 py-2 hover:bg-zinc-900 hover:text-white transition"
            >
              <span aria-hidden>‹</span>
              <span className="truncate"> {prev.title}</span>
            </Link>
          ) : (
            <span className="text-zinc-400"> </span>
          )}
        </div>

        {/* Back to all */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-500 px-4 py-2 hover:bg-zinc-900 hover:text-white transition"
          >
            back to all
          </Link>
        </div>

        {/* Next */}
        <div className="min-w-0 text-right">
          {next ? (
            <Link
              href={`/portfolio/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-500 px-4 py-2 hover:bg-zinc-900 hover:text-white transition"
            >
              <span className="truncate">{next.title}</span>
              <span aria-hidden>›</span>
            </Link>
          ) : (
            <span className="text-zinc-400"> </span>
          )}
        </div>
      </div>
    </nav>
  );
}
