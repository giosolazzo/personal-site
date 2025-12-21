import { notFound } from "next/navigation";
import Link from "next/link";
import { PortfolioNav } from "@/components/PortfolioNav";

type Item = {
  slug: string;
  title: string; // small label (used above H1 + nav labels)
  headline: string; // big title (same as portfolio page titles)
  side: string[];
  main: string[];
  image?: string; // logo path
};

const ITEMS: Item[] = [
  {
    slug: "sodexo",
    title: "dishwashing run",
    headline: "One of the First, One of the Best - Washing Dishes at Sodexo",
    side: ["Sodexo", "Menlo Park, CA", "------", "Dishwasher", "September 2022 - May 2023"],
    main: [
      "Sounds a bit like Jensen Huang's story - he's lucky I didn't start in tech.",
      "Dishwasher was indeed one of my first roles, and it's where my ambition and desire for great experiences and great opportunities was etched in me - ironically enough.",
      "Where my parents' words, “Do you think we print money?”, became much clearer.",
      "This humbling experience brought hunger in me... so what did I do next?",
    ],
    image: "/images/portfolio/experiences/sodexo/logo.png",
  },

  {
    slug: "essens",
    title: "m-l-m deep dive",
    headline: "Multi-Level Marketing Deep Dive at Essens Europe",
    side: [
      "Essens Europe SE",
      "Brno, Czechia",
      "essensworld.com",
      "Leading e-commerce and multi-level marketing company, communicating lifestyles through self-care products and network",
      "------",
      "Manager in Training (Internship)",
      "June 2023 - August 2023",
    ],
    main: [
      "At Essens, I immersed myself in every system of a network marketing company (30-35 headcount internally), rotated through all departments, reported directly to the Essens CFO, and even job shadowed the CEO.",
      "Throughout this experience, I took on roles in marketing, accounting, purchasing, process analysis, HR, and production.",
      "",
      "In practical terms:",
      "• Created tailored marketing campaigns",
      "• Evaluated performance indicators with the accounting team",
      "• Managed contractual documents and purchase orders",
      "• Investigated process errors and proposed corrective measures",
      "• Participated in pre-selecting and interviewing candidates",
      "• Spearheaded a bonus project proposing AI tools to enhance processes",
      "",
      "The echo:",
      "• Collaborated with 4 franchise managers, analyzing performance indicators against set metrics",
      "• Developed and executed three digital marketing campaigns for the company's e-commerce strategy and lead generation",
      "• Conducted a competitive analysis of around 20 MLM companies to define the competitive edge and identify expansion opportunities",
      "• Initiated an AI project to explore process automation for internal processes - researching and applying AI tools to enhance existing systems at Essens",
      "",
      "Let's try a startup now, next experience ->",
    ],
    image: "/images/portfolio/experiences/essens/logo.png",
  },

  {
    slug: "citya",
    title: "d-r-t analysis",
    headline: "Demand-Responsive Transportation Analysis at Citya Mobility",
    side: [
      "Citya Mobility s.r.o",
      "Prague, Czechia",
      "citya.io",
      "A demand-responsive transport platform connecting passengers with drivers through data analysis and AI, enabling flexible and eco-friendly travel in cities and regions",
      "------",
      "Manager/Market Specialist (Internship)",
      "August 2023",
    ],
    main: [
      "My first experience in an early-stage scaling startup - at that time valued at EUR 13 million.",
      "I job shadowed the company's CEO and worked alongside a team of 8, helping Citya leverage its position in the demand-responsive transportation and on-demand transit space.",
      "I explored potential product features and pivot opportunities while learning that in startups, “There's always something to do, and always many things to do.”",
      "",
      "The echo:",
      "• Shaped Citya's strategic positioning through a competitive analysis of 30+ demand-responsive/on-demand transit companies, generating targeted product feedback and identifying expansion opportunities",
      "• Engaged with early clients (B2B, B2G) in sales meetings to gather research-driven feedback that refined development and sales strategies and defined Citya's competitive edge",
      "",
      "Founding a startup, next experience ->",
    ],
    image: "/images/portfolio/experiences/citya/logo.png",
  },

  {
    slug: "intern",
    title: "founding intern",
    headline: "Founding Intern - Providing Access to Experiences Outside Academia",
    side: [
      "Intern",
      "Remote (European market)",
      "------",
      "A platform connecting students with real-world experiences, empowering them to discover their voice beyond academia",
      "------",
      "Founder",
      "September 2023 - February 2024",
    ],
    main: [
      "Sharing the learning",
      "After my first experiences outside academia, I felt a need to share the difference between what is taught about real-world experience in academia and what it truly is - what I have seen, what I have lived.",
      "",
      "So I founded Intern.",
      "",
      "My goal was to encourage people my age, while still in school, to find our voice in the real world - because how can we fall in love with a contribution we've never experienced firsthand? Real-world engagement then guides us to choose education as the pathway to pursuing the knowledge desired for the chosen direction.",
      "",
      "We learn from what we live, but sometimes we don't know what we're missing.",
      "",
      "The work that has been done:",
      "• Hired a product designer and an engineer to kick off the technical side",
      "• Built a landing page with a waitlist feature while gathering interest from students seeking real-world experiences",
      "• Established engagement from 4 university leaders to help connect students with dynamic opportunities",
      "• Received commitments from several companies to support the project",
      "",
      "The echo:",
      "• European legislation and the costly fee for an employment intermediary, combined with my inexperience in execution (lack of speed, commitment, and team leadership), ultimately put this project on the shelf",
      "",
      "Learning how to execute, next experience ->",
    ],
    image: "/images/portfolio/experiences/intern/logo.png",
  },

  {
    slug: "findsparrow",
    title: "findsparrow",
    headline: "Development and Market at FindSparrow - Supporting Students by Supporting Communities",
    side: [
      "FindSparrow Inc.",
      "Palo Alto, California",
      "findsparrow.com",
      "A platform helping all students obtain academic success by providing freelance opportunities, while serving local communities",
      "------",
      "From internship to",
      "-> VP of Business Development",
      "September 2023 - March 2024",
      "(Same period as Intern)",
    ],
    main: [
      "While working on Intern...",
      "I joined Sparrow - a very early-stage startup with a team of 3. Before revenue, Sparrow had a platform with active leads and an MVP with around a hundred users, facing the classic chicken-and-egg situation of building a two-sided market.",
      "",
      "The echo:",
      "• During that time, we expanded Sparrow's client base by executing a go-to-market strategy that acquired over 1,000 individual clients, leading to interest in partnerships with local businesses",
      "• Market analysis - based on the other eight freelance platforms, Sparrow's positioning was defined, strengthening its brand, affecting how the edge was marketed, and boosting web traffic",
      "",
      "At this stage, there was a lot of research involved, a lot of outreach to universities, and efforts to attract communities through social platforms, discussing the pain points of freelancing from both sides of the business.",
      "",
      "During my stay at Sparrow, I experienced the rocky path of finding the ideal investor as well - the long lists of VC funds, angels, etc. And I realized that building a customer base is the most narrow path to both growing the business and securing funding - going from chasing to attracting.",
      "",
      "Founding a startup, next experience ->",
    ],
    image: "/images/portfolio/experiences/findsparrow/logo.png",
  },

  {
    slug: "kos",
    title: "kos ai",
    headline: "Putting Kos AI on the Map in Silicon Valley - Executive Leadership",
    side: [
      "Kos Inc.",
      "Palo Alto, California",
      "kos-ai.com | pitchbook",
      "Wearable IoT devices remotely monitor patient vitals and assist healthcare professionals in delivering complex diagnostic feedback and timely medication, leveraging scale and AI to transform care from reactive to preventive, providing quality healthcare for everyone",
      "------",
      "Chief Operating Officer",
      "August 2024 - January 2025",
    ],
    main: [
      "After graduation, I spent three months attending Bay Area events to explore my next move.",
      "",
      "By the third month, I began building again - launching a personal project that shared other people's journeys.",
      "It was then I realized that people are drawn to those who are curious and capable, and if I can build something for myself, people know I can build something for them too.",
      "",
      "Several meetings later, I joined Kos - a healthtech startup - as one of the executives to plant Kos on a map in Silicon Valley after four years of remote development on the 13th iteration of its wearable hardware and integrated software.",
      "",
      "At this point, Kos had passed several rounds of private investment (safe contracts), had multiple 10-figure evaluation reports, had a board of ex-executives from major healthtech corporations, and had a team under 50 spread out remotely.",
      "",
      "The goals were clear: customer, funding, and team.",
      "",
      "The echo:",
      "• Served as the face and voice of Kos, hosting product launches, hiring events, celebratory gatherings, and networking sessions - representing Kos at family office, high net worth, medtech conferences, and forums",
      "• Executed the relocation into newly leased offices in Stanford Research Park, ensuring the space was fully equipped for incoming engineering, operational, and medical teams, and establishing day-to-day administration",
      "• Led daily operations as second-in-command, consulting the CEO, exploring financial oversight, investor relations, and regulatory processes (FDA 510(k), PTCRB), and working toward closing new customer contracts; promoted Kos in-person at over 50 VC offices on Sand Hill Road, leveraging our HQ location to engage potential investors and fuel the push toward a $10M Series A",
      "• Consolidated the remote team of under 50 into an on-site team of 8 by recruiting engineers and others through Stanford hiring events (info sessions, meet and greets, company tours, career fairs), transferring four years of remote work into on-site optimization",
      "• Handled corporate governance and legal frameworks (NDAs, employment agreements, stock grants, budgeting), learning about compliance along the way, and ensuring the company was structured to keep R&D and operations moving forward",
      "",
      "Series A wasn't fully closed (70%) by the time my employment ended. Kos reached customers, but in healthcare, deals can take time, and revenue is the only language that is loud enough. Still, building an engineering team that now carries the knowledge and tech forward was a success.",
      "",
      "Due to goals not being fully met, my executive employment wasn't approved to continue by the board. And despite Kos's genuine interest in finding a different role, we weren't able to see a clear path to continue working together.",
      "",
      "A great experience, with even greater lessons learned - and more yet to be learned.",
      "",
      "Next chapter ->",
    ],
    image: "/images/portfolio/experiences/kos/logo.png",
  },

  {
    slug: "kos-2",
    title: "pit-stop at kos",
    headline: "Pit-Stop at Kos, Once Again - People Ops During Transition",
    side: [
      "Kos Inc.",
      "Palo Alto, California",
      "kos-ai.com | pitchbook",
      "Wearable IoT devices remotely monitor patient vitals and assist healthcare professionals in delivering complex diagnostic feedback and timely medication, leveraging scale and AI to transform care from reactive to preventive, providing quality healthcare for everyone",
      "------",
      "People and Operations",
      "April 2025 - June 2025",
    ],
    main: [
      "I stepped back in during a leadership transition - not to “join again”, but to stabilize the people side and keep momentum intact.",
      "This phase was less about spotlight and more about reliability: communication, structure, clean handoffs, and making sure the team stayed focused while leadership shifted.",
      "I was heading back to Europe after - so the job was simple: leave things better than I found them, and make the next chapter easier for whoever takes the wheel.",
      "",
      "The echo:",
      "• Kept internal operations steady during transition: clarity in roles, priorities, and expectations",
      "• Supported team continuity through coordination, scheduling, and execution across day-to-day moving parts",
      "• Drove clean handoffs: documentation, ownership transfer, and reducing “single points of failure”",
      "• Helped leadership regain bandwidth by absorbing the unglamorous operational load that quietly breaks teams",
      "",
      "Back to Europe - next chapter ->",
    ],
    image: "/images/portfolio/experiences/kos/logo.png",
  },
];

const order = ITEMS.map((i) => i.slug);

/**
 * Your typography rules:
 * - no em dashes / en dashes
 * - arrow becomes ->
 * This happens at render-time so you don’t accidentally reintroduce unicode dashes later.
 */
function normalizeTypography(s: string) {
  return s.replace(/[—–]/g, "-").replace(/→/g, "->");
}

function renderMain(lines: string[]) {
  const out: React.ReactNode[] = [];
  let i = 0;

  const isDivider = (s: string) => /^-{3,}$/.test(s.trim());
  const isSection = (s: string) => s.trim().endsWith(":");
  const isBullet = (s: string) => s.trim().startsWith("•") || s.trim().startsWith("-");

  while (i < lines.length) {
    const raw = lines[i] ?? "";
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    if (isDivider(line)) {
      out.push(<div key={`div-${i}`} className="h-px bg-white/10 my-6" />);
      i++;
      continue;
    }

    if (isSection(line)) {
      out.push(
        <div key={`sec-${i}`} className="mt-8 mb-3 text-[11px] tracking-[0.18em] text-zinc-400">
          {normalizeTypography(line.replace(/:$/, ""))}
        </div>
      );
      i++;
      continue;
    }

    if (isBullet(line)) {
      const bullets: string[] = [];
      while (i < lines.length && isBullet((lines[i] ?? "").trim())) {
        bullets.push((lines[i] ?? "").trim().replace(/^[-•]\s?/, ""));
        i++;
      }
      out.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 list-disc pl-5 text-zinc-200">
          {bullets.map((b, k) => (
            <li key={k} className="leading-relaxed">
              {normalizeTypography(b)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    out.push(
      <p key={`p-${i}`} className="text-zinc-200 leading-relaxed">
        {normalizeTypography(raw)}
      </p>
    );
    i++;
  }

  return out;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = ITEMS.find((x) => x.slug === slug);
  if (!item) return notFound();

  const idx = order.indexOf(item.slug);
  const prev = idx > 0 ? ITEMS[idx - 1] : undefined;
  const next = idx < ITEMS.length - 1 ? ITEMS[idx + 1] : undefined;

  return (
    <main className="relative min-h-screen text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-black" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-[320px_1fr] items-start">
          {/* SIDE (bubble) */}
          <div className="flex flex-col gap-5">
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
              {/* LOGO only */}
              <div className="mb-6 flex items-center justify-center">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={`${item.slug} logo`}
                    className="max-h-20 w-auto"
                  />
                ) : null}
              </div>

              {/* Side text (no forced uppercase) */}
              <div className="space-y-2 text-sm text-zinc-200 tracking-[0.02em]">
                {item.side.map((line, n) => (
                  <div
                    key={n}
                    className={line.trim().startsWith("-") ? "text-zinc-500" : ""}
                  >
                    {normalizeTypography(line)}
                  </div>
                ))}
              </div>
            </aside>

            {/* ONE Back to all button (only here) */}
            <Link
              href="/portfolio"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              ← Back to all
            </Link>
          </div>

          {/* MAIN */}
          <article className="pb-16">
            {/* Small label should match portfolio page label */}
            <div className="text-[11px] tracking-[0.18em] text-zinc-400">
              {normalizeTypography(item.title)}
            </div>

            {/* Big title should match portfolio page title */}
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              {normalizeTypography(item.headline)}
            </h1>

            <div className="mt-6 space-y-4">{renderMain(item.main)}</div>

            <div className="mt-10">
              <PortfolioNav
                prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
                next={next ? { slug: next.slug, title: next.title } : undefined}
              />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
