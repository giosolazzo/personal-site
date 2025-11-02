import Link from "next/link";

export function PortfolioNav({
  prev, next
}: { prev?: { slug: string; title: string }; next?: { slug: string; title: string } }) {
  return (
    <div className="mt-12 border-t border-zinc-300/70 pt-6 flex items-center justify-between">
      <div>
        {prev && (
          <Link
            href={`/portfolio/${prev.slug}`}
            className="inline-flex items-center gap-2 text-lg hover:underline"
          >
            <span>‹</span>{prev.title}
          </Link>
        )}
      </div>

      <Link href="/portfolio" className="text-sm opacity-70 hover:opacity-100 underline">
        back to all
      </Link>

      <div>
        {next && (
          <Link
            href={`/portfolio/${next.slug}`}
            className="inline-flex items-center gap-2 text-lg hover:underline"
          >
            {next.title}<span>›</span>
          </Link>
        )}
      </div>
    </div>
  );
}
