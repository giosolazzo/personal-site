"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Thumb from "@/components/Thumb";

const NARRATIVE = "Writing a story that only makes sense in reverse.";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
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
    <div className={["trace-wrap", seqClassName].join(" ")} data-trace>
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

    const speed = 60;
    const shadowHold = 520;

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
    <main className="bg-black text-zinc-100 h-full">
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

        /* Trace always exists; animation scheduled via CSS delays */
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

      <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col py-10 sm:py-14">
        {/* a bit lower on desktop */}
        <div className="h-3 sm:h-5" />

        {/* Responsive spacer: puts content lower + more centered on mobile */}
        <div className="h-3 sm:h-8" />

        {/* THE MENU */}
        <section className="text-center">
          <p className="text-xs sm:text-base uppercase tracking-[0.22em] smog-muted">
            THE MENU
          </p>
        </section>

        {/* Cards */}
        <section className="mt-5 sm:mt-6 pb-1">
          <div className="space-y-3">
            {/* Midsummer */}
            <TraceBorderCard seqClassName="trace-0">
              <div className="px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-medium smog-strong">
                      Midsummer Lab
                    </h2>
                    <p className="mt-1 text-[15px] sm:text-base smog-muted">
                      Spoken exploration of the tools for a postponed life.
                    </p>
                  </div>

                  <a
                    href="https://midsummerlab.com"
                    className="gs-btn gs-btn-5 w-full sm:w-auto text-center"
                  >
                    Open
                  </a>
                </div>
              </div>
            </TraceBorderCard>

            {/* One */}
            <TraceBorderCard seqClassName="trace-1">
              <div className="px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-medium smog-strong">
                      One
                    </h2>
                    <p className="mt-1 text-[15px] sm:text-base smog-muted">
                      A chatbot for building trust in the voice.
                    </p>
                  </div>

                  <div className="w-full sm:w-auto text-center">
                    <span className="text-red-500 font-medium">
                      On a shelf
                    </span>
                  </div>
                </div>
              </div>
            </TraceBorderCard>

            {/* Divider */}
            <div className="my-5 sm:my-7 text-center">
              <span className="inline-block smog font-semibold tracking-wider select-none opacity-70">
                ----------------
              </span>
            </div>

            {/* Portfolio */}
            <TraceBorderCard seqClassName="trace-2">
              <div className="px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
                  <div className="flex items-center gap-4 min-w-0">
                    <Thumb
                      src="/images/portfolio/gio-logo.png"
                      alt="Giuseppe logo"
                      size={52}
                    />
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-medium smog-strong">
                        Portfolio
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-base smog-muted">
                        A collection of past work.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <a
                        href="https://www.linkedin.com/in/giuseppe-solazzo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gs-btn gs-btn-5 gs-btn-icon"
                        aria-label="Open Giuseppe on LinkedIn"
                        title="LinkedIn"
                      >
                        <LinkedInIconBW size={16} />
                      </a>

                      <span className="text-zinc-700 select-none">/</span>

                      <Link href="/portfolio" className="gs-btn gs-btn-5">
                        Browse
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TraceBorderCard>
          </div>
        </section>

        {/* Phrase back (under Portfolio) in THE MENU style */}
        <section className="mt-7 sm:mt-10 text-center">
          <p className="text-xs sm:text-base tracking-[0.22em] smog-muted leading-relaxed">
            <CharLine text={NARRATIVE} activeIdxFromEnd={activeIdxFromEnd} />
          </p>
        </section>

        <div className="mt-auto h-2" />
      </div>
    </main>
  );
}
