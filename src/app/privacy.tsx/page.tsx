// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How giuseppesolazzo.com handles analytics and newsletter signups.",
};

const UPDATED = "2025-09-25";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-semibold">Privacy</h1>
          <p className="text-zinc-400 text-sm">Last updated: {UPDATED}</p>
        </header>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What I collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Cookieless analytics.</span> Vercel
              Web Analytics & Speed Insights (page views, country, referrer,
              device type, performance). No tracking cookies.
            </li>
            <li>
              <span className="font-medium">Server logs.</span> Vercel keeps
              short-lived logs (e.g., IP + request) for reliability and abuse
              prevention.
            </li>
            <li>
              <span className="font-medium">Email for Eon interest list.</span>{" "}
              Collected and stored via Buttondown with lightweight tags/notes
              (e.g., source page) to understand interest.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What I don’t do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No ad tracking or sale of personal data.</li>
            <li>No third-party tracking cookies.</li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Your choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unsubscribe at any time from the link in any email.</li>
            <li>
              Request deletion by emailing{" "}
              <a className="underline" href="mailto:hi@giuseppesolazzo.com">
                hi@giuseppesolazzo.com
              </a>{" "}
              from the subscribed address.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Processors</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Vercel</span> (hosting, analytics).
            </li>
            <li>
              <span className="font-medium">Buttondown</span> (email; uses
              Mailgun to send).
            </li>
          </ul>
        </section>

        <section className="space-y-2 text-zinc-200">
          <h2 className="text-xl font-medium">Contact</h2>
          <p>
            Email{" "}
            <a className="underline" href="mailto:hi@giuseppesolazzo.com">
              hi@giuseppesolazzo.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
