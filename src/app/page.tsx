import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold">Giuseppe Solazzo</h1>
          <p className="text-zinc-300">Builder, conversations, and tools.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://midsummerlab.com/midsummer"
            className="rounded-2xl border border-zinc-700/60 p-5 hover:bg-zinc-100 hover:text-black transition block"
          >
            <h2 className="text-xl font-medium">Midsummer Workshops</h2>
            <p className="text-sm mt-1 text-current/70">Talks → workshop.</p>
          </a>

          <Link
            href="/eon"
            className="rounded-2xl border border-zinc-700/60 p-5 hover:bg-zinc-100 hover:text-black transition block"
          >
            <h2 className="text-xl font-medium">Eon</h2>
            <p className="text-sm mt-1 text-current/70">Private AI waitlist.</p>
          </Link>

          <Link
            href="/portfolio"
            className="rounded-2xl border border-zinc-700/60 p-5 hover:bg-zinc-100 hover:text-black transition block sm:col-span-2"
          >
            <h2 className="text-xl font-medium">Portfolio</h2>
            <p className="text-sm mt-1 text-current/70">Narrative overview.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
