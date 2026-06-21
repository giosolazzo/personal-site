import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "A short note on what this site collects and how to reach me.",
};

const UPDATED = "2026-06-21";

const sections = [
  {
    title: "Visits",
    lines: [
      "I count visits, not people.",
      "Vercel gives me basic, cookieless analytics: page views, rough location, referrer, device, browser, and performance.",
      "Useful to know if the site is alive. Not useful for stalking you.",
    ],
  },
  {
    title: "Messages",
    lines: [
      "If you use the contact form, I receive what you type: name, email, subject, and message.",
      "That email is sent through Resend so I can reply.",
    ],
  },
  {
    title: "One",
    lines: [
      "If you join the One list, Buttondown stores your email and small signup context like source, referrer, or country when available.",
      "There is also a tiny browser note, `ms_last_signup`, so the confirmation page knows where to send you.",
      "Unsubscribe anytime.",
    ],
  },
  {
    title: "No",
    lines: [
      "No ad tracking.",
      "No sale of personal data.",
      "No third-party tracking cookies from this site.",
      "No payment data.",
    ],
  },
  {
    title: "Control",
    lines: [
      "Want something deleted or corrected?",
      "Email me from the same address and I will handle it.",
    ],
  },
];

export default function Privacy() {
  return (
    <main className="bg-black text-zinc-100 px-6 py-12 flex-1">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-zinc-800/80 pb-8">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
            Privacy
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Small footprint.</h1>
          <p className="mt-3 max-w-xl text-zinc-400">
            This site collects the minimum I need to keep it working, understand basic visits,
            and reply when you reach out.
          </p>
          <p className="mt-4 text-sm text-zinc-500">Last updated: {UPDATED}</p>
        </header>

        <div className="divide-y divide-zinc-900">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-4 py-7 sm:grid-cols-[160px_1fr]"
            >
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                {section.title}
              </h2>
              <div className="space-y-3 text-zinc-200">
                {section.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-zinc-800/80 pt-7 text-zinc-300">
          <p>
            Email{" "}
            <a className="underline underline-offset-4" href="mailto:gio.solazzo.o@gmail.com">
              gio.solazzo.o@gmail.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
