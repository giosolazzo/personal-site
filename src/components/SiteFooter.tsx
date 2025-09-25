export default function SiteFooter() {
  return (
    <footer className="px-6 py-10 text-sm text-zinc-400">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} Giuseppe Solazzo</div>
        <nav className="flex gap-4">
          <a className="hover:underline" href="/privacy">Privacy</a>
          <a className="hover:underline" href="https://midsummerlab.com/midsummer">Midsummer</a>
        </nav>
      </div>
    </footer>
  );
}
