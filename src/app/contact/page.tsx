"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // If you already have an API route hooked up, wire it here.
    // For now we just simulate success:
    try {
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 400));
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-black text-zinc-100 flex-1">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 flex-1 flex flex-col">
        {/* Center the form block within the page */}
        <div className="flex-1 flex items-center justify-center py-10 sm:py-14">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-medium text-zinc-100/90 text-center">
              What’s the worst thing that could happen if you reached out?
            </h1>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">First name</label>
                  <input
                    name="firstName"
                    className="mt-2 w-full rounded-2xl bg-transparent border border-zinc-800/70 px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600/70"
                    placeholder="First name"
                    autoComplete="given-name"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Last name</label>
                  <input
                    name="lastName"
                    className="mt-2 w-full rounded-2xl bg-transparent border border-zinc-800/70 px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600/70"
                    placeholder="Last name"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl bg-transparent border border-zinc-800/70 px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600/70"
                  placeholder="Email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Subject *</label>
                <input
                  name="subject"
                  required
                  className="mt-2 w-full rounded-2xl bg-transparent border border-zinc-800/70 px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600/70"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={7}
                  className="mt-2 w-full rounded-2xl bg-transparent border border-zinc-800/70 px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600/70 resize-none"
                  placeholder="Message"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full border border-zinc-700/70 px-6 py-2 text-zinc-300 hover:text-zinc-100 hover:border-zinc-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending"
                    ? "sending..."
                    : status === "sent"
                    ? "sent"
                    : "send it"}
                </button>
              </div>

              {status === "error" ? (
                <p className="text-center text-sm text-zinc-500">
                  something broke — try again.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
