"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Thumb from "@/components/Thumb";

const NARRATIVE = "Writing a story that only makes sense in reverse.";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

/**
 * Narrative as characters so we can apply a subtle shadow pass.
 * No forced line breaks -> wraps naturally.
 */
function CharLine({
  text,
  activeIdxFromEnd,
}: {
  text: string;
  activeIdxFromEnd: number | null; // 0 = last char
}) {
  const chars = useMemo(() => text.split(""), [text]);
  const activeIdx =
    activeIdxFromEnd !== null ? chars.length - 1 - activeIdxFromEnd : -1;

  return (
    <span>
      {chars.map((ch, i) => {
        const isActive = i === activeIdx;
        return (
          <span key={i} className={isActive ? "wave-shadow" : ""}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Card wrapper with a clean stroke trace that runs ONCE, triggered by CSS delays.
 * No React toggling -> no glitch.
 */
function TraceBorderCard({
  seqClassName,
  children,
}: {
  seqClassName: string; // "trace-0" | "trace-1" | "trace-2"
  children: React.ReactNode;
}) {
  return (
    <div className={["trace-wrap", seqClassName].join(" ")}>
      <div className="trace-surface">{children}</div>

      <svg
        className="trace-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="15"
          ry="15"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trace-stroke"
        />
      </svg>
    </div>
  );
}

function LinkedInIconBW({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="inline-block"
    >
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 23.5h4V7.98h-4V23.5ZM8.5 7.98h3.83v2.12h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1v9.36h-4v-8.3c0-1.98-.04-4.52-2.76-4.52-2.76 0-3.18 2.16-3.18 4.39v8.43h-4V7.98Z"
      />
    </svg>
  );
}

export default function Home() {
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return prefersReducedMotion();
  }, []);

  // --- Narrative shadow sweep ---
  const [activeIdxFromEnd, setActiveIdxFromEnd] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const speed = 60; // slower = more “smog”
    const shadowHold = 520; // longer = visible but subtle

    const runWave = () => {
      const len = NARRATIVE.length;
      let idx = 0;

      const waveTimer = window.setInterval(() => {
        setActiveIdxFromEnd(idx);

        const clearTimer = window.setTimeout(() => {
          setActiveIdxFromEnd(null);
        }, shadowHold);

        idx += 1;

        if (idx >= len) {
          window.clearInterval(waveTimer);
          window.clearTimeout(clearTimer);
          setActiveIdxFromEnd(null);
        }
      }, speed);
    };

    const startTimer = window.setTimeout(runWave, 1200);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, [reduced]);

  return (
    <main className="bg-black text-zinc-100">
      <style>{`
        /* Smoggy palette on black */
        .smog-strong { color: rgba(244,244,245,0.92); }
        .smog { color: rgba(212,212,216,0.80); }
        .smog-muted { color: rgba(161,161,170,0.78); }

        /* Character shadow sweep (smoggy, not “flash”) */
        @keyframes shadowWave {
          0%   { text-shadow: 0 0 0 rgba(255,255,255,0); opacity: 1; }
          35%  { text-shadow: 0 0 14px rgba(255,255,255,0.10), 0 0 2px rgba(255,255,255,0.06); opacity: 0.96; }
          100% { text-shadow: 0 0 0 rgba(255,255,255,0); opacity: 1; }
        }
        .wave-shadow { animation: shadowWave 780ms ease-out; }

        /* Trace border wrapper */
        .trace-wrap { position: relative; border-radius: 16px; }
        .trace-surface {
          border-radius: 16px;
          border: 1px solid rgba(39,39,42,0.70);
          background: transparent;
        }
        .trace-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

        /*
          KEY: trace ALWAYS exists, animation scheduled via CSS + delays.
          No React toggling -> no dash jump/glitch.
        */
        .trace-stroke {
          opacity: 0;
          stroke-dasharray: 52 468;
          stroke-dashoffset: 0;
        }

        @keyframes traceOnce {
          0%   { opacity: 0; stroke-dashoffset: 0; }
          8%   { opacity: 0.38; }
          92%  { opacity: 0.38; }
          100% { opacity: 0; stroke-dashoffset: -520; }
        }

        /* sequence timing */
        .trace-0 .trace-stroke { animation: traceOnce 5.2s linear 1 forwards; animation-delay: 0.6s; }
        .trace-1 .trace-stroke { animation: traceOnce 5.2s linear 1 forwards; animation-delay: 6.3s; }
        .trace-2 .trace-stroke { animation: traceOnce 5.2s linear 1 forwards; animation-delay: 12.0s; }

        @media (prefers-reduced-motion: reduce) {
          .trace-0 .trace-stroke,
          .trace-1 .trace-stroke,
          .trace-2 .trace-stroke { animation: none !important; opacity: 0 !important; }
          .wave-shadow { animation: none !important; }
        }
      `}</style>

      <div
        className="mx-auto max-w-3xl px-6
                   min-h-[calc(100svh-var(--hdr)-var(--ftr))]
                   flex flex-col"
      >
        {/* Move content LOWER (more middle but still a bit up) */}
        <div className="h-14 sm:h-16" />

        {/* THE MENU */}
        <section className="text-center">
          <p className="text-sm sm:text-base uppercase tracking-[0.22em] smog-muted">
            THE MENU
          </p>
        </section>

        {/* Cards */}
        <section className="mt-6 pb-1">
          <div className="space-y-3">
            {/* Midsummer */}
            <TraceBorderCard seqClassName="trace-0">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-medium smog-strong">
                      Midsummer
                    </h2>
                    <p className="mt-1 text-[15px] sm:text-base smog-muted">
                      Spoken explorations on breaking perfection.
                    </p>
                  </div>

                  <a
                    href="https://midsummerlab.com/midsummer"
                    className="rounded-full border border-zinc-700/70 px-6 py-2 text-sm sm:text-base smog hover:border-zinc-500/70 hover:text-zinc-100 transition"
                  >
                    Open
                  </a>
                </div>
              </div>
            </TraceBorderCard>

            {/* Eon */}
            <TraceBorderCard seqClassName="trace-1">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-medium smog-strong">
                      Eon
                    </h2>
                    <p className="mt-1 text-[15px] sm:text-base smog-muted">
                      A reflective project in progress.
                    </p>
                  </div>

                  <Link
                    href="/eon"
                    className="rounded-full border border-zinc-700/70 px-6 py-2 text-sm sm:text-base smog hover:border-zinc-500/70 hover:text-zinc-100 transition"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </TraceBorderCard>

            {/* Divider */}
            <div className="my-6 sm:my-8 text-center">
              <span className="inline-block smog font-semibold tracking-wider select-none opacity-70">
                ----------------
              </span>
            </div>

            {/* Portfolio */}
            <TraceBorderCard seqClassName="trace-2">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <Thumb
                      src="/images/portfolio/gio-logo.png"
                      alt="Giuseppe logo"
                      size={56}
                    />
                    <div>
                      <h2 className="text-lg sm:text-xl font-medium smog-strong">
                        Portfolio
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-base smog-muted">
                        A collection of past work.
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn icon-only / Browse */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/in/giuseppe-solazzo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-zinc-700/70 px-4 py-2 text-sm sm:text-base smog hover:border-zinc-500/70 hover:text-zinc-100 transition inline-flex items-center"
                      aria-label="Open Giuseppe on LinkedIn"
                      title="LinkedIn"
                    >
                      <LinkedInIconBW size={16} />
                    </a>

                    <span className="text-zinc-700 select-none">/</span>

                    <Link
                      href="/portfolio"
                      className="rounded-full border border-zinc-700/70 px-6 py-2 text-sm sm:text-base smog hover:border-zinc-500/70 hover:text-zinc-100 transition"
                    >
                      Browse
                    </Link>
                  </div>
                </div>
              </div>
            </TraceBorderCard>
          </div>
        </section>

        {/* Phrase back (under Portfolio) in THE MENU style */}
        <section className="mt-10 text-center">
          <p className="text-sm sm:text-base tracking-[0.22em] smog-muted">
            {NARRATIVE}
          </p>
        </section>

        <div className="mt-auto h-2" />
      </div>
    </main>
  );
}
