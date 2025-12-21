import Link from "next/link";

type Node = { slug: string; title: string };

function normalizeTypography(s: string) {
  return (s ?? "").replace(/[—–]/g, "-").replace(/→/g, "->");
}

const LOWERCASE_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "nor",
  "for",
  "so",
  "yet",
  "as",
  "at",
  "by",
  "in",
  "of",
  "on",
  "per",
  "to",
  "up",
  "via",
  "with",
  "from",
]);

function titleCaseLabel(s: string, slugForOverride?: string) {
  if (slugForOverride === "intern") return "INTERN";

  const raw = normalizeTypography(s).trim();
  if (!raw) return "";

  const words = raw.split(/\s+/g);

  return words
    .map((w, idx) => {
      const lower = w.toLowerCase();

      // Special tokens
      if (w === "->") return "->";
      if (lower === "ai") return "AI";
      if (lower === "mlm") return "MLM";

      // Keep common short words lowercase unless first word
      if (idx !== 0 && LOWERCASE_WORDS.has(lower)) return lower;

      // Default: capitalize first character only (keeps "m-l-m" style as "M-l-m")
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

export function PortfolioNav({ prev, next }: { prev?: Node; next?: Node }) {
  return (
    <nav className="mt-12 pt-6 border-t border-zinc-300/50">
      <div className="flex items-center justify-between gap-4">
        {/* Prev */}
        <div className="min-w-0">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-500 px-4 py-2 hover:bg-zinc-900 hover:text-white transition"
            >
              <span aria-hidden>‹</span>
              <span className="truncate">{titleCaseLabel(prev.title, prev.slug)}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        {/* Next */}
        <div className="min-w-0 text-right">
          {next ? (
            <Link
              href={`/portfolio/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-500 px-4 py-2 hover:bg-zinc-900 hover:text-white transition"
            >
              <span className="truncate">{titleCaseLabel(next.title, next.slug)}</span>
              <span aria-hidden>›</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </nav>
  );
}
