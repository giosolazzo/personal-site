import Link from "next/link";

export default function EonThanks() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="text-5xl">✨</div>
        <h1 className="text-3xl font-semibold">You’re on the list</h1>
        <p className="text-zinc-300">
          I’ll share early notes and invites as Eon takes shape.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
