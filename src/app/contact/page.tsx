export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <div className="rounded-2xl border border-zinc-700/60 p-5 space-y-3">
          <p>Email: <a className="underline" href="mailto:gio.solazzo.o@gmail.com">gio.solazzo.o@gmail.com</a></p>
          {/* Add other links later if needed */}
        </div>
      </div>
    </main>
  );
}
