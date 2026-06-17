"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      setStatus("sending");
      setErrorMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "Could not send the message.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something broke - try again."
      );
    }
  }

  return (
    <main className="bg-black text-zinc-100 flex-1">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center py-10 sm:py-14">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-medium text-zinc-100/90 text-center">
              What&apos;s the worst thing that could happen if you reached out?
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
                  className="gs-btn gs-btn-5"
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
                  {errorMessage || "Something broke - try again."}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
