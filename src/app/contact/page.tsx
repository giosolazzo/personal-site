"use client";

import { useCallback, useState } from "react";

export default function ContactPage() {
  const [first, setFirst] = useState("");
  const [last, setLast]   = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const to = "hello@giuseppesolazzo.com"; // change if needed
    const name = [first, last].filter(Boolean).join(" ");
    const sub = encodeURIComponent(subject || "Message from giuseppesolazzo.com");
    const body = encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`
    );
    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  }, [first,last,email,subject,message]);

  return (
    <main className="min-h-screen bg-[--color-ivory] text-zinc-900 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">
          what is the worst thing that could happen if you reached out?
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input className="w-full rounded-md px-4 py-2 bg-white border border-zinc-300"
                     value={first} onChange={e=>setFirst(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input className="w-full rounded-md px-4 py-2 bg-white border border-zinc-300"
                     value={last} onChange={e=>setLast(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full rounded-md px-4 py-2 bg-white border border-zinc-300"
                   value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm mb-1">Subject</label>
            <input className="w-full rounded-md px-4 py-2 bg-white border border-zinc-300"
                   value={subject} onChange={e=>setSubject(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea rows={6}
              className="w-full rounded-md px-4 py-2 bg-white border border-zinc-300"
              value={message} onChange={e=>setMessage(e.target.value)} required />
          </div>

          <button
            type="submit"
            className="rounded-full bg-[--color-navy] text-white px-6 py-2 hover:opacity-90"
          >
            send it
          </button>
        </form>
      </div>
    </main>
  );
}
