"use client";

export default function Eon() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Eon</h1>
        <p className="text-zinc-300">
          A private AI that helps you switch perspectives, reduce noise, and act with clarity.
          Join the interest list to get early updates.
        </p>

        {/* Remember that the user signed up for Eon (used by /confirm router) */}
        <form
          action="/api/subscribe-eon"
          method="post"
          className="flex gap-2 max-w-md"
          onSubmit={() => {
            try { localStorage.setItem("ms_last_signup", "eon"); } catch {}
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@domain.com"
            autoComplete="email"
            className="flex-1 px-4 py-2 rounded-md bg-white text-black placeholder:text-zinc-500"
          />
          <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
            Join the list
          </button>
        </form>

        <p className="text-sm text-zinc-500">
          Managed via Buttondown. Unsubscribe anytime.
        </p>
      </div>
    </main>
  );
}
