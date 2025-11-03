// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "A short note on what this site collects and how to reach me.",
};

const UPDATED = "2025-09-25";

export default function Privacy() {
  return (
    <main className="bg-black text-zinc-100 px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-3xl font-semibold">Privacy</h1>
          <p className="text-zinc-400 text-sm">Last updated: {UPDATED}</p>
        </header>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What’s collected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Basic, cookieless analytics</span> (page views,
              country/region, referrer, device type, performance).
            </li>
            <li>
              <span className="font-medium">Short-lived server logs</span> (for reliability and abuse prevention).
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What’s not collected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No ad tracking. No sale of personal data.</li>
            <li>No third-party tracking cookies.</li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Your choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You can request deletion of any saved contact information.</li>
            <li>
              Email me from the same address you want removed and I’ll handle it.
            </li>
          </ul>
        </section>

        <section className="space-y-2 text-zinc-200">
          <h2 className="text-xl font-medium">Contact</h2>
          <p>
            Email{" "}
            <a className="underline" href="mailto:gio.solazzo.o@gmail.com">
              gio.solazzo.o@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
