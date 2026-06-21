'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Experience = {
  slug: string;
  company: string;
  title: string;
  location: string;
  role: string;
  date: string;
  summary: string;
  highlights: string[];
};

const experiences: Experience[] = [
  {
    slug: "sodexo",
    company: "Sodexo",
    title: "One of the First, One of the Best - Washing Dishes at Sodexo",
    location: "Menlo Park, CA",
    role: "Dishwasher",
    date: "Sep 2022 - May 2023",
    summary: "Dishwasher. First real hunger. First real humility.",
    highlights: [
      "Yes, sounds like Jensen Huang's story - he's lucky I didn't start in tech.",
      "This humbling experience brought hunger in me... so what did I do next?",
    ],
  },
  {
    slug: "essens",
    company: "Essens Europe SE",
    title: "Multi-Level Marketing Deep Dive at Essens Europe",
    location: "Brno, Czechia",
    role: "Manager in Training (Internship)",
    date: "Jun 2023 - Aug 2023",
    summary: "Rotated through a real network-marketing machine.",
    highlights: [
      "I immersed myself in every system of a 30-35 person network marketing company.",
      "Marketing, accounting, purchasing, HR, production, and a first serious look at operations.",
    ],
  },
  {
    slug: "citya",
    company: "Citya Mobility s.r.o",
    title: "Demand-Responsive Transportation Analysis at Citya Mobility",
    location: "Prague, Czechia",
    role: "Manager / Market Specialist (Internship)",
    date: "Aug 2023",
    summary: "First early-stage startup. Many things, all at once.",
    highlights: [
      "My first experience in an early-stage scaling startup - at that time valued at EUR 13 million.",
      "I learned that in startups, there's always something to do, and always many things to do.",
    ],
  },
  {
    slug: "intern",
    company: "Intern",
    title: "Founding Intern - Providing Access to Experiences Outside Academia",
    location: "Remote (European market)",
    role: "Founder",
    date: "Sep 2023 - Feb 2024",
    summary: "Tried to build the missing bridge between school and real work.",
    highlights: [
      "I wanted to share the difference between what is taught about experience and what it actually feels like.",
      "We learn from what we live, but sometimes we don't know what we're missing.",
    ],
  },
  {
    slug: "findsparrow",
    company: "FindSparrow Inc.",
    title: "Development and Market at FindSparrow - Supporting Students by Supporting Communities",
    location: "Palo Alto, CA",
    role: "From Internship to VP of Business Development",
    date: "Sep 2023 - Mar 2024",
    summary: "Two-sided marketplace work. Students, communities, outreach.",
    highlights: [
      "I joined Sparrow - a very early-stage startup with a team of 3.",
      "We expanded Sparrow's client base by executing a go-to-market strategy that acquired over 1,000 individual clients.",
    ],
  },
  {
    slug: "kos",
    company: "Kos Inc.",
    title: "Putting Kos AI on the Map in Silicon Valley - Executive Leadership at a HealthTech Startup",
    location: "Palo Alto, CA",
    role: "Chief Operating Officer",
    date: "Aug 2024 - Jan 2025",
    summary: "A healthtech chapter with offices, fundraising, hiring, and pressure.",
    highlights: [
      "After graduation, I spent three months attending Bay Area events to explore my next move.",
      "Several meetings later, I joined Kos to help put it on the map in Silicon Valley.",
    ],
  },
  {
    slug: "kos-2",
    company: "Kos Inc.",
    title: "Pit-stop at Kos, Once Again - People Ops During Transition",
    location: "Palo Alto, CA",
    role: "People and Operations",
    date: "Apr 2025 - Jun 2025",
    summary: "Returned during transition. Less spotlight, more reliability.",
    highlights: [
      "I stepped back in during a leadership transition to keep the people side steady and finish the handoff clean.",
      "A few events needed to happen, a new team needed to settle, and I was heading back to Europe right after.",
    ],
  },
  {
    slug: "service-marketplace-ecosystem",
    company: "[Stealth] Service Marketplace Ecosystem",
    title: "[Stealth] Service Marketplace Ecosystem - One-Click Booking for Services",
    location: "Remote (US market)",
    role: "Market Research / Go-to-Market / Positioning",
    date: "Sep 2025 - Dec 2025",
    summary: "One-click booking, like Amazon but for services.",
    highlights: [
      "Built around upfront pricing, trusted providers, fast confirmation, and less chasing.",
      "700 responses, 1-on-1 interviews, Nextdoor outreach, and Prolific surveys across the US.",
    ],
  },
  {
    slug: "behavera",
    company: "Behavera",
    title: "Behavera - Raw Sales, Growth, and the Human Layer",
    location: "Prague, Czechia",
    role: "Partner / Growth",
    date: "Feb 2026 - Present",
    summary: "Raw B2B selling in a small Czech people-analytics SaaS.",
    highlights: [
      "Talking with CEOs, testing markets, building partnerships, and learning that we sell ourselves first.",
      "Current chapter. Still being written.",
    ],
  },
];

export default function PortfolioPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <main className="relative min-h-[calc(100svh-var(--hdr)-var(--ftr))] text-zinc-100">
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/portfolio/hero_1.jpeg"
          alt="Giuseppe walking by the sea"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_58%]"
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/22" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
      </div>

      <section className="relative z-10 mx-auto min-h-[calc(100svh-var(--hdr)-var(--ftr))] max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
        <div>
          <header className="mb-8 flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Portfolio</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Looking back | Moving forward
              </h1>
            </div>
          </header>

          <div className="relative max-w-3xl">
            <div className="absolute left-[9px] top-3 bottom-3 w-px bg-zinc-800" />
            <div className="absolute left-[6px] top-3 h-16 w-[7px] rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.38)] portfolio-pulse" />

            <div className="space-y-1">
              {experiences.map((exp) => {
                const isOpen = activeSlug === exp.slug;

                return (
                  <article key={exp.slug} className="relative pl-8">
                    <button
                      type="button"
                      onClick={() => setActiveSlug(isOpen ? null : exp.slug)}
                      className="group grid w-full gap-1 py-3 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={[
                          "absolute left-0 top-[1.15rem] h-[19px] w-[19px] rounded-full border bg-black transition",
                          isOpen
                            ? "border-white shadow-[0_0_18px_rgba(255,255,255,0.28)]"
                            : "border-zinc-700 group-hover:border-zinc-300",
                        ].join(" ")}
                      />
                      <span className="grid gap-x-5 gap-y-1 sm:grid-cols-[minmax(0,1fr)_12rem]">
                        <span className="block text-base font-semibold text-zinc-100 sm:col-span-2">
                          {exp.company}
                        </span>
                        <span className="block text-sm text-zinc-500">{exp.date}</span>
                        <span className="text-sm text-zinc-500">{exp.location}</span>
                        <span className="block text-zinc-300">{exp.summary}</span>
                      </span>
                    </button>

                    <div
                      className={[
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="min-h-0">
                        <div className="mb-5 border-l border-zinc-800 pl-5 text-sm text-zinc-300">
                          <div className="text-zinc-500">
                            <p>{exp.role}</p>
                          </div>

                          <div className="mt-4 space-y-2">
                            {exp.highlights.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>

                          <Link
                            href={`/portfolio/${exp.slug}`}
                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-600 px-4 py-2 text-sm text-zinc-100 transition hover:border-zinc-200"
                          >
                            Full story <span aria-hidden="true">-&gt;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .portfolio-pulse {
          animation: portfolioPulse 6.5s linear infinite;
        }

        @keyframes portfolioPulse {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          8% {
            opacity: 0.8;
          }
          88% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(calc(100% + 58vh));
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-pulse {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
