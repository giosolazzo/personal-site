"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <main className="min-h-[calc(100svh-var(--hdr)-var(--ftr))] bg-[#E6E7E2] text-[#111] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <h1 className="text-center text-[26px] sm:text-[28px] font-semibold tracking-tight">
          what is the worst thing that could happen if you reached out?
        </h1>

        {/* Form */}
        <form
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            // placeholder (wire to /api/contact or Formspree later)
            setSending(true);
            setTimeout(() => setSending(false), 800);
          }}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-zinc-500">(required)</span>
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-zinc-600 mb-1">First Name</div>
                <input
                  required
                  className="w-full rounded-full bg-white px-5 py-3 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/30"
                  type="text"
                  name="firstName"
                />
              </div>
              <div>
                <div className="text-xs text-zinc-600 mb-1">Last Name</div>
                <input
                  required
                  className="w-full rounded-full bg-white px-5 py-3 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/30"
                  type="text"
                  name="lastName"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">
              Email <span className="text-zinc-500">(required)</span>
            </label>
            <input
              required
              className="mt-2 w-full rounded-full bg-white px-5 py-3 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/30"
              type="email"
              name="email"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium">
              Subject <span className="text-zinc-500">(required)</span>
            </label>
            <input
              required
              className="mt-2 w-full rounded-full bg-white px-5 py-3 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/30"
              type="text"
              name="subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium">
              Message <span className="text-zinc-500">(required)</span>
            </label>
            <textarea
              required
              rows={6}
              className="mt-2 w-full rounded-3xl bg-white px-5 py-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/30 resize-y"
              name="message"
            />
          </div>

          {/* Button */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-[#22314C] text-white px-6 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              {sending ? "sending…" : "send it"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
