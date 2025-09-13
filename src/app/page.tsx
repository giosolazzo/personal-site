export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>hey, i’m giuseppe</h1>
      <p>Writing a story that only makes sense in reverse.</p>

      <h2 style={{ marginTop: 24 }}>The menu</h2>
      <ul>
        <li>
          {/* During development this points to your local midsummer app */}
          <a href="http://localhost:3001/midsummer">Midsummer (workshops)</a>
        </li>
        <li>
          <a href="/work">Portfolio</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </main>
  );
}
