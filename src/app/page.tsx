"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

const NARRATIVE = "Writing a story that only makes sense in reverse.";

type TraceStyle = CSSProperties & { "--trace-delay": string };
type SoonStyle = CSSProperties & { "--soon-delay": string };

type MenuAction = {
  label: string;
  href: string;
  external?: boolean;
};

type MenuActions = {
  primary: MenuAction;
  linkedin: MenuAction;
};

type MenuCard = {
  title: string;
  body: string;
  action?: MenuAction;
  actions?: MenuActions;
  status?: string;
};

const MENU_CARDS: MenuCard[] = [
  {
    title: "Midsummer Lab",
    body: "Spoken exploration of the tools for a postponed life.",
    action: {
      label: "Open",
      href: "https://midsummerlab.com",
      external: true,
    },
  },
  {
    title: "One",
    body: "A chatbot for building trust in the voice.",
    status: "On a shelf",
  },
  {
    title: "Mentoring",
    body: "1:1 / groups / academia",
    actions: {
      primary: {
        label: "Open",
        href: "/contact",
      },
      linkedin: {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/giuseppe-solazzo/",
        external: true,
      },
    },
  },
  {
    title: "Newsletter",
    body: "Letters from me to me.",
    status: "coming soon",
  },
];

const PORTFOLIO_ROOMS = [
  {
    title: "Work chapters",
    body: "The honest work timeline.",
    href: "/portfolio",
    status: "Open",
  },
  {
    title: "Acting",
    body: "Voice, body, pressure, play.",
    status: "coming soon",
  },
  {
    title: "-----",
    body: "Not ready for light yet.",
    status: "coming soon",
  },
];

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
  delay,
  className = "",
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={["trace-wrap", className].join(" ")}
      data-trace
      style={{ "--trace-delay": `${delay}s` } as TraceStyle}
    >
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

function ActionLink({ action }: { action: MenuAction }) {
  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="gs-btn gs-btn-5 home-menu-btn w-full sm:w-auto text-center"
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className="gs-btn gs-btn-5 home-menu-btn w-full sm:w-auto text-center"
    >
      {action.label}
    </Link>
  );
}

function MentoringActions({ actions }: { actions: MenuActions }) {
  return (
    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
      <a
        href={actions.linkedin.href}
        target="_blank"
        rel="noopener noreferrer"
        className="plain-linkedin"
        aria-label="Open Giuseppe on LinkedIn"
        title={actions.linkedin.label}
      >
        <LinkedInIconBW size={16} />
      </a>
      <span className="text-zinc-700 select-none">/</span>
      <ActionLink action={actions.primary} />
    </div>
  );
}

function SoonSignal({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <span
      className="soon-signal"
      style={{ "--soon-delay": `${delay}s` } as SoonStyle}
    >
      <span className="soon-dot" aria-hidden="true" />
      {label}
    </span>
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

        /* Back close to the original light trace, just driven by a variable delay */
        .trace-stroke {
          opacity: 0;
          stroke-dasharray: 52 468;
          stroke-dashoffset: 0;
          animation: traceOnce 5.2s linear 1 forwards;
          animation-delay: var(--trace-delay);
        }

        @keyframes traceOnce {
          0%   { opacity: 0; stroke-dashoffset: 0; }
          8%   { opacity: 0.38; }
          92%  { opacity: 0.38; }
          100% { opacity: 0; stroke-dashoffset: -520; }
        }

        .home-menu-btn {
          height: 34px;
          padding-left: 18px;
          padding-right: 18px;
          font-size: 0.875rem;
        }

        .home-icon-btn {
          height: 34px;
          min-width: 44px;
          padding-left: 14px;
          padding-right: 14px;
        }

        .plain-linkedin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(212,212,216,0.72);
          transition: color 220ms ease, text-shadow 220ms ease, transform 220ms ease;
        }

        .plain-linkedin:hover {
          color: rgba(244,244,245,0.92);
          text-shadow: 0 0 14px rgba(244,244,245,0.16);
          transform: translateY(-1px);
        }

        .menu-copy {
          margin-top: 0.2rem;
          color: rgba(161,161,170,0.70);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .soon-signal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 34px;
          color: rgba(212,212,216,0.70);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0;
          animation: soonLightning 8.4s steps(1, end) infinite;
          animation-delay: var(--soon-delay);
        }

        .soon-dot {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 9999px;
          background: rgba(244,244,245,0.68);
          box-shadow: 0 0 0 rgba(244,244,245,0);
        }

        @keyframes soonLightning {
          0%, 8%, 12%, 15%, 40%, 43%, 58%, 61%, 100% {
            opacity: 0;
            text-shadow: none;
            filter: none;
            transform: translateY(1px);
          }
          9% {
            opacity: 0.28;
            text-shadow: 0 0 4px rgba(255,255,255,0.10);
            transform: translateY(0);
          }
          10% {
            opacity: 0.92;
            text-shadow: 0 0 16px rgba(255,255,255,0.28), 0 0 3px rgba(255,255,255,0.18);
            filter: brightness(1.35);
            transform: translateY(0);
          }
          11%, 42%, 60% {
            opacity: 0.16;
            text-shadow: none;
            filter: none;
          }
          41% {
            opacity: 0.72;
            text-shadow: 0 0 12px rgba(255,255,255,0.18);
            filter: brightness(1.15);
          }
          59% {
            opacity: 0.88;
            text-shadow: 0 0 18px rgba(255,255,255,0.24);
            filter: brightness(1.3);
          }
        }

        .portfolio-open-signal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px;
          color: rgba(212,212,216,0.70);
          font-size: 0.875rem;
          line-height: 1;
          transition: color 220ms ease, text-shadow 220ms ease, transform 220ms ease;
        }

        .portfolio-row:hover .portfolio-open-signal {
          color: rgba(244,244,245,0.92);
          text-shadow: 0 0 14px rgba(244,244,245,0.16);
          transform: translateX(2px);
        }

        .portfolio-row {
          position: relative;
        }

        .portfolio-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.75rem;
          bottom: 0.75rem;
          width: 1px;
          border-radius: 9999px;
          background: rgba(244,244,245,0);
          box-shadow: 0 0 0 rgba(244,244,245,0);
          transition: background 220ms ease, box-shadow 220ms ease;
        }

        .portfolio-row:hover::before {
          background: rgba(244,244,245,0.56);
          box-shadow: 0 0 14px rgba(244,244,245,0.18);
        }

        @media (prefers-reduced-motion: reduce) {
          .trace-stroke { animation: none !important; opacity: 0 !important; }
          .wave-shadow,
          .soon-signal { animation: none !important; }
          .soon-signal { opacity: 0.55 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col py-6 sm:py-8">
        {/* a bit lower on desktop */}
        <div className="h-1 sm:h-2" />

        {/* Responsive spacer: puts content lower + more centered on mobile */}
        <div className="h-1 sm:h-3" />

        {/* THE MENU */}
        <section className="text-center">
          <p className="text-xs sm:text-base uppercase tracking-[0.22em] smog-muted">
            THE MENU
          </p>
        </section>

        {/* Cards */}
        <section className="mt-4 pb-1">
          <div className="space-y-2">
            {MENU_CARDS.map((card, index) => (
              <TraceBorderCard key={card.title} delay={0.6 + index * 2.4}>
                <div className="px-4 sm:px-5 py-2 sm:py-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-5">
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-medium smog-strong">
                        {card.title}
                      </h2>
                      {card.body ? (
                        <p className="menu-copy">
                          {card.body}
                        </p>
                      ) : null}
                    </div>

                    {card.action ? (
                      <ActionLink action={card.action} />
                    ) : card.actions ? (
                      <MentoringActions actions={card.actions} />
                    ) : card.status ? (
                      <div className="w-full sm:w-auto sm:min-w-36 sm:text-center">
                        <SoonSignal label={card.status} delay={index * 0.75} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </TraceBorderCard>
            ))}

            <div className="my-2.5 sm:my-3 text-center">
              <span className="inline-block smog font-semibold tracking-wider select-none opacity-70">
                ----------------
              </span>
            </div>

            <TraceBorderCard delay={10.2}>
              <div className="px-4 sm:px-5 py-2.5 sm:py-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-5">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-medium smog-strong">
                      Portfolio
                    </h2>
                    <p className="menu-copy">
                      Work chapters, acting, and one room still forming.
                    </p>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/giuseppe-solazzo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gs-btn gs-btn-5 gs-btn-icon home-icon-btn w-full sm:w-auto"
                    aria-label="Open Giuseppe on LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedInIconBW size={16} />
                  </a>
                </div>

                <div className="mt-2.5 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
                  {PORTFOLIO_ROOMS.map((room, index) => {
                    const content = (
                      <span className="portfolio-row flex flex-col gap-1.5 py-2 pl-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="min-w-0">
                          <span className="block text-[15px] font-medium smog-strong">
                            {room.title}
                          </span>
                          <span className="mt-0.5 block text-sm smog-muted">{room.body}</span>
                        </span>
                        <span className="w-full sm:w-auto sm:min-w-36 sm:text-center">
                          {room.href ? (
                            <span className="portfolio-open-signal" aria-hidden="true">
                              Open
                            </span>
                          ) : (
                            <SoonSignal label={room.status} delay={1.2 + index * 0.8} />
                          )}
                        </span>
                      </span>
                    );

                    return room.href ? (
                      <Link
                        key={room.title}
                        href={room.href}
                        className="block transition hover:text-zinc-100"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div key={room.title}>{content}</div>
                    );
                  })}
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
