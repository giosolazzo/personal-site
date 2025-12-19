'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/** In-view hook without ref casting */
function useInView(threshold = 0.25) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;

    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, threshold]);

  return { setRef: setNode, inView };
}

type Experience = {
  slug: string;
  title: string;
  company: string;
  location: string;
  role: string;
  date: string;
  coverSrc: string;
  highlights: string[];
  mirrored?: boolean;
};

type RowMeta = {
  slug: string;
  mirrored: boolean;
  y: number; // row top relative to the content box
  h: number; // row height
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Build the snake path in the SAME coordinate system as the content box:
 * - viewBox width = contentWidth (px)
 * - x positions use percentages of contentWidth
 *
 * Changes vs your current version:
 * 1) tighter lane (avoids face/diagonal portrait area)
 * 2) each row pass is SHORTER (no full-width “frame line”)
 * 3) heartbeat kink only every 3rd row (feels intentional)
 * 4) vertical drops go to the NEXT row’s edge (no big crossovers)
 */
function buildSnakePath(rows: RowMeta[], contentW: number) {
  if (!rows.length || contentW <= 0) return "";

  // Keep the wire inside the content column (avoid portrait center/face)
  const X_LEFT = contentW * 0.18;
  const X_RIGHT = contentW * 0.76;

  // Each row line length (prevents “box/frame” look)
  const ROW_SPAN = contentW * 0.46;

  // Rounded turn radius
  const R = clamp(contentW * 0.035, 18, 34);

  // Anchor inside each row (near title/first line)
  const rowY = (r: RowMeta) => r.y + 92;

  // start slightly above first row on left lane
  let x = X_LEFT;
  let y = Math.max(0, rowY(rows[0]) - 110);
  let d = `M ${x} ${y}`;

  // Smooth L-shaped turn from (x,y) to (nx,ny) with a rounded corner.
  // We choose HV or VH depending on which keeps us inside the lane best.
  const cornerTo = (nx: number, ny: number) => {
    const dx = nx - x;
    const dy = ny - y;

    // If one direction is tiny, just line it.
    if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
      d += ` L ${nx} ${ny}`;
      x = nx; y = ny;
      return;
    }

    // Prefer: vertical then horizontal (VH) when we're moving mostly vertical
    // Prefer: horizontal then vertical (HV) when we're moving mostly horizontal
    const preferVH = Math.abs(dy) >= Math.abs(dx);

    if (preferVH) {
      // go vertical to (x, ny - sign(dy)*R), then round into horizontal
      const y1 = ny - Math.sign(dy) * R;
      d += ` L ${x} ${y1}`;
      d += ` Q ${x} ${ny} ${x + Math.sign(dx) * R} ${ny}`;
      d += ` L ${nx} ${ny}`;
    } else {
      // go horizontal to (nx - sign(dx)*R, y), then round into vertical
      const x1 = nx - Math.sign(dx) * R;
      d += ` L ${x1} ${y}`;
      d += ` Q ${nx} ${y} ${nx} ${y + Math.sign(dy) * R}`;
      d += ` L ${nx} ${ny}`;
    }

    x = nx;
    y = ny;
  };

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const yA = rowY(r);

    // For each row:
    // - mirrored row (cover on right) => start on right lane and pass leftwards
    // - normal row => start on left lane and pass rightwards
    const startEdge = r.mirrored ? X_RIGHT : X_LEFT;

    // Short pass, not full width
    const endX = r.mirrored ? (startEdge - ROW_SPAN) : (startEdge + ROW_SPAN);

    // Move to row start (rounded)
    cornerTo(startEdge, yA);

    // Optional heartbeat kink (every 3rd row)
    const doBeat = i % 3 === 0;
    const midX = (startEdge + endX) / 2;

    if (doBeat) {
      const beatUp = yA - 9;
      const beatDown = yA + 12;

      d += ` L ${midX - 34} ${yA}`;
      d += ` L ${midX - 14} ${beatUp}`;
      d += ` L ${midX + 4} ${beatDown}`;
      d += ` L ${midX + 18} ${yA}`;
    } else {
      // subtle micro-bend so it still feels alive
      d += ` L ${midX} ${yA}`;
    }

    // Finish the row pass
    d += ` L ${endX} ${yA}`;
    x = endX;
    y = yA;

    // Drop toward next row — go to NEXT row’s start edge (prevents big crossovers)
    if (i < rows.length - 1) {
      const n = rows[i + 1];
      const nextYA = rowY(n);
      const nextStartEdge = n.mirrored ? X_RIGHT : X_LEFT;

      // drop point a bit above the next anchor
      const dropY = clamp(nextYA - 85, y + 60, nextYA - 55);

      cornerTo(nextStartEdge, dropY);
      // then continue down to next row start
      cornerTo(nextStartEdge, nextYA);
    } else {
      // End a bit below last row
      const endY = r.y + r.h + 140;
      cornerTo(x, endY);
    }
  }

  return d;
}

function TimelineWire({
  contentRef,
  rows,
}: {
  contentRef: React.RefObject<HTMLDivElement | null>;
  rows: RowMeta[];
}) {
  const [metrics, setMetrics] = useState<{ h: number; w: number; path: string }>({
    h: 0,
    w: 0,
    path: "",
  });

  const rafRef = useRef<number | null>(null);

    useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const node = contentRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const w = rect.width;
      const h = node.scrollHeight;

      const path = buildSnakePath(rows, w);
      setMetrics({ w, h, path });
    };

    const schedule = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    window.addEventListener("resize", schedule);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [contentRef, rows]);

  if (!metrics.h || !metrics.w || !metrics.path) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <svg
        width="100%"
        height={metrics.h}
        viewBox={`0 0 ${metrics.w} ${metrics.h}`}
        preserveAspectRatio="xMidYMin meet"
        aria-hidden="true"
        className="block"
      >
        <defs>
          <filter id="wireGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="pulseGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* base */}
        <path
          d={metrics.path}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          filter="url(#wireGlow)"
        />
        {/* highlight */}
        <path
          d={metrics.path}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.25"
        />

        {/* traveling pulse (short dash) */}
        <path
          d={metrics.path}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pulseGlow)"
          className="wire-pulse"
        />
      </svg>

      <style jsx>{`
        .wire-pulse {
          stroke-dasharray: 70 2400;
          animation: dashmove 2.35s linear infinite;
          opacity: 0.55;
        }

        @keyframes dashmove {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.35;
          }
          18% {
            opacity: 0.9;
          }
          40% {
            opacity: 0.55;
          }
          100% {
            stroke-dashoffset: -2470;
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}

export default function PortfolioPage() {
  // Diagonal controls (keep as-is)
  const topX = 59.4;
  const botX = 38.4;
  const gap = 0.3;
  const topLeftEnd = topX - gap / 2;
  const bottomLeftEnd = botX - gap / 2;
  const topRightStart = topX + gap / 2;
  const bottomRightStart = botX + gap / 2;

  const startRef = useRef<HTMLDivElement | null>(null);

  // Outer section wrapper (full width)
  const experiencesSectionRef = useRef<HTMLDivElement | null>(null);

  // Inner content box (max-w-6xl) — the wire MUST live in this coordinate system
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Row nodes for measuring (in content coords)
  const rowElsRef = useRef<Record<string, HTMLElement | null>>({});

  const experiences: Experience[] = useMemo(
    () => [
      {
        slug: "sodexo",
        title: "One of the First, One of the Best - Washing Dishes at Sodexo",
        company: "Sodexo",
        location: "Menlo Park, CA",
        role: "Dishwasher",
        date: "Sep 2022 - May 2023",
        coverSrc: "/images/portfolio/experiences/sodexo/cover.png",
        highlights: [
          "Yes, sounds like Jensen Huang's story - he's lucky I didn't start in tech.",
          "This humbling experience brought hunger in me... so what did I do next?",
        ],
        mirrored: false,
      },
      {
        slug: "essens",
        title: "Multi-Level Marketing Deep Dive at Essens Europe",
        company: "Essens Europe SE",
        location: "Brno, Czechia",
        role: "Manager in Training (Internship)",
        date: "Jun 2023 - Aug 2023",
        coverSrc: "/images/portfolio/experiences/essens/cover.png",
        highlights: [
          "At Essens, I immersed myself in every system of a network marketing company (30-35 headcount internally).",
          "Rotated through all departments, reporting directly to the Essens CFO, and even job shadowing the CEO.",
        ],
        mirrored: true,
      },
      {
        slug: "citya",
        title: "Demand-Responsive Transportation Analysis at Citya Mobility",
        company: "Citya Mobility s.r.o",
        location: "Prague, Czechia",
        role: "Manager / Market Specialist (Internship)",
        date: "Aug 2023",
        coverSrc: "/images/portfolio/experiences/citya/cover.png",
        highlights: [
          "My first experience in an early-stage scaling startup - at that time valued at EUR 13 million.",
          "I learned that in startups, there's always something to do, and always many things to do.",
        ],
        mirrored: false,
      },
      {
        slug: "intern",
        title: "Founding Intern - Providing Access to Experiences Outside Academia",
        company: "Intern",
        location: "Remote (European market)",
        role: "Founder",
        date: "Sep 2023 - Feb 2024",
        coverSrc: "/images/portfolio/experiences/intern/cover.png",
        highlights: [
          "I felt a need to share the difference between what is taught about real-world experience in academia and what it truly is.",
          "We learn from what we live, but sometimes we don't know what we're missing.",
        ],
        mirrored: true,
      },
      {
        slug: "findsparrow",
        title: "Development and Market at FindSparrow - Supporting Students by Supporting Communities",
        company: "FindSparrow Inc.",
        location: "Palo Alto, CA",
        role: "From Internship to VP of Business Development",
        date: "Sep 2023 - Mar 2024 (same period as Intern)",
        coverSrc: "/images/portfolio/experiences/findsparrow/cover.png",
        highlights: [
          "I joined Sparrow - a very early-stage startup with a team of 3... facing the classic chicken-and-egg situation of building a two-sided market.",
          "We expanded Sparrow's client base by executing a go-to-market strategy that acquired over 1,000 individual clients.",
        ],
        mirrored: false,
      },
      {
        slug: "kos",
        title: "Putting Kos AI on the Map in Silicon Valley - Executive Leadership at a HealthTech Startup",
        company: "Kos Inc.",
        location: "Palo Alto, CA",
        role: "Chief Operating Officer",
        date: "Aug 2024 - Jan 2025",
        coverSrc: "/images/portfolio/experiences/kos/cover.png",
        highlights: [
          "After graduation, I spent three months attending Bay Area events to explore my next move.",
          "Several meetings later, I joined Kos to help put it on the map in Silicon Valley.",
        ],
        mirrored: true,
      },
      {
        slug: "kos-2",
        title: "Pit-stop at Kos, Once Again - People Ops During Transition",
        company: "Kos Inc.",
        location: "Palo Alto, CA",
        role: "People and Operations",
        date: "Apr 2025 - Jun 2025",
        coverSrc: "/images/portfolio/experiences/kos/cover.png",
        highlights: [
          "I stepped back in during a leadership transition to keep the people side steady and finish the handoff clean.",
          "A few events needed to happen, a new team needed to settle, and I was heading back to Europe right after.",
        ],
        mirrored: false,
      },
    ],
    []
  );

  const [rowMeta, setRowMeta] = useState<RowMeta[]>([]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => {
      const c = contentRef.current;
      if (!c) return;

      const cRect = c.getBoundingClientRect();

      const next = experiences
        .map((e) => {
          const el = rowElsRef.current[e.slug];
          if (!el) return null;

          const r = el.getBoundingClientRect();
          const y = r.top - cRect.top + c.scrollTop;
          const h = r.height;

          if (!h) return null;
          return { slug: e.slug, mirrored: !!e.mirrored, y, h };
        })
        .filter(Boolean) as RowMeta[];

      setRowMeta(next);
    };

    let raf: number | null = null;
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(content);

    window.addEventListener("resize", schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [experiences]);

  return (
    <main className="relative min-h-[calc(100svh-var(--hdr)-var(--ftr))] text-zinc-100">
      {/* BG LAYERS */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/portfolio/hero.jpg"
          alt="Giuseppe"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, ${topLeftEnd}% 0%, ${bottomLeftEnd}% 100%, 0% 100%)`,
            backgroundColor: "rgba(0,0,0,0.925)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `polygon(${topRightStart}% 0%, 100% 0%, 100% 100%, ${bottomRightStart}% 100%)`,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />
      </div>

      {/* HERO HEADER */}
      <section className="relative z-10 h-[100svh] px-6">
        <div className="mx-auto max-w-6xl h-full flex flex-col items-center justify-center text-center">
          <div style={{ transform: "translateY(-8vh)" }}>
            <h1 className="text-4xl sm:text-5xl font-semibold">
              Looking back | Moving forward
            </h1>
          </div>

          {/* Arrow: in-between */}
          <button
            type="button"
            onClick={() => startRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="absolute top-[62vh] sm:top-[64vh] left-1/2 -translate-x-1/2 text-zinc-300 hover:text-white transition"
            aria-label="Scroll to experiences"
          >
            <span className="block animate-bounce text-5xl sm:text-6xl">↓</span>
          </button>
        </div>
      </section>

      {/* START ANCHOR */}
      <div ref={startRef} className="relative z-10 h-px w-full" />

      {/* EXPERIENCES SECTION */}
      <div ref={experiencesSectionRef} className="relative z-10">
        {/* ✅ Content box: wire is confined here */}
        <div ref={contentRef} className="relative mx-auto max-w-6xl">
          {/* wire behind rows */}
          <TimelineWire contentRef={contentRef} rows={rowMeta} />

          {/* rows */}
          <div className="relative z-[2]">
            {experiences.map((exp, idx) => (
              <ExperienceRow
                key={exp.slug}
                exp={exp}
                index={idx}
                registerRow={(slug, el) => {
                  rowElsRef.current[slug] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ExperienceRow({
  exp,
  index,
  registerRow,
}: {
  exp: Experience;
  index: number;
  registerRow: (slug: string, el: HTMLElement | null) => void;
}) {
  const { setRef, inView } = useInView(0.22);
  const isMirrored = !!exp.mirrored;

  const setRefs = (el: HTMLElement | null) => {
    setRef(el);
    registerRow(exp.slug, el);
  };

  return (
    <section
      ref={setRefs}
      className={`relative mx-auto max-w-6xl px-6 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ paddingTop: "4.05rem", paddingBottom: "4.05rem" }}
    >
      <div className="grid sm:grid-cols-5 gap-10 items-start">
        {/* COVER + META */}
        <aside
          className={[
            "sm:col-span-2 flex flex-col justify-start text-sm space-y-4 self-start",
            isMirrored ? "sm:order-2 items-end" : "sm:order-1 items-start",
          ].join(" ")}
        >
          <div className={isMirrored ? "w-full flex justify-end" : "w-full flex justify-start"}>
            <Image
              src={exp.coverSrc}
              alt={`${exp.company} cover`}
              width={560}
              height={560}
              priority={index === 0}
              className="rounded-2xl shadow-md w-[340px] sm:w-[440px] h-auto"
            />
          </div>

          <div
            className={[
              "w-[340px] sm:w-[440px]",
              "rounded-2xl border border-zinc-700/60 bg-black/30 backdrop-blur-sm",
              "px-6 py-5",
              "text-center",
            ].join(" ")}
          >
            <p className="font-semibold text-white text-base">{exp.company}</p>
            <p className="text-zinc-200">{exp.location}</p>
            <div className="flex justify-center">
              <hr className="border-zinc-600/80 w-14 my-3" />
            </div>
            <p className="text-zinc-100 font-medium">{exp.role}</p>
            <p className="text-zinc-300">{exp.date}</p>
          </div>
        </aside>

        {/* MAIN TEXT */}
        <div
          className={[
            "sm:col-span-3 space-y-5 leading-relaxed self-start",
            isMirrored ? "sm:order-1" : "sm:order-2",
          ].join(" ")}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {exp.title}
          </h2>

          <div className="space-y-3 text-zinc-200 max-w-[58ch]">
            {exp.highlights.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="flex justify-start">
            <Link
              href={`/portfolio/${exp.slug}`}
              className={[
                "inline-flex items-center gap-2",
                "rounded-full border border-zinc-500/70",
                "bg-white/10 px-5 py-2.5",
                "text-sm text-white",
                "hover:bg-white/15 hover:border-zinc-300/80 transition",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]",
              ].join(" ")}
            >
              Full story <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-9 h-px bg-zinc-700/30" />
    </section>
  );
}
