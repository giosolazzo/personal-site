export default function Portfolio() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Portfolio</h1>
        <p className="text-zinc-300">Drafting a more personal, narrative take on my work.</p>

        <ul className="space-y-3 text-zinc-300">
          <li className="rounded-2xl border border-zinc-800/60 p-4">• Project A (placeholder)</li>
          <li className="rounded-2xl border border-zinc-800/60 p-4">• Project B (placeholder)</li>
          <li className="rounded-2xl border border-zinc-800/60 p-4">• Project C (placeholder)</li>
        </ul>
      </div>
    </main>
  );
}
