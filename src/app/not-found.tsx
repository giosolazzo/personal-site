// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-xl mx-auto text-center space-y-5">
        <div className="text-6xl">🤷‍♂️</div>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-zinc-400">Try one of these:</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition">Home</Link>
          <Link href="/eon" className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition">Eon</Link>
          <Link href="/portfolio" className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition">Portfolio</Link>
        </div>
      </div>
    </main>
  );
}
