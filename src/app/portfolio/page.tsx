export default function PortfolioPage() {
  // Diagonal controls
  const topX = 59.4;  // was 59.7 → tiny nudge left
  const botX = 38.4;  // was 38.7 → tiny nudge left
  const gap  = 0.3;   // thin visible gap

  const topLeftEnd       = topX - gap / 2;
  const bottomLeftEnd    = botX - gap / 2;
  const topRightStart    = topX + gap / 2;
  const bottomRightStart = botX + gap / 2;

  return (
    <main className="relative min-h-[calc(100svh-var(--hdr)-var(--ftr))] text-zinc-100">
      {/* FULL-PAGE BACKGROUND behind everything on this route */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/portfolio/hero.jpg"
          alt="Giuseppe"
          className="w-full h-full object-cover"
        />

        {/* LEFT overlay — mid darkness */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, ${topLeftEnd}% 0%, ${bottomLeftEnd}% 100%, 0% 100%)`,
            backgroundColor: "rgba(0,0,0,0.925)",
          }}
        />

        {/* RIGHT overlay — soft shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `polygon(${topRightStart}% 0%, 100% 0%, 100% 100%, ${bottomRightStart}% 100%)`,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />
      </div>

      {/* TEMP content to verify; we’ll replace with the cards next */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          
        </h1>
        <p className="mt-3 text-zinc-300">
          
        </p>
      </section>
    </main>
  );
}
