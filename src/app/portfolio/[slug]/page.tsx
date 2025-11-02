import { notFound } from "next/navigation";
import { PortfolioNav } from "@/components/PortfolioNav";

type Item = {
  slug: string;
  side: string[];
  main: string[];
  title: string;
};

const ITEMS: Item[] = [
  {
    slug: "sodexo",
    title: "dishwashing run",
    side: [
      "sodexo", "menlo park, ca", "——————", "dishwasher", "september 2022 - may 2023",
    ],
    main: [
      "yes, sounds like jensen huang's story - he’s lucky i didn’t start in tech",
      "dishwasher was indeed one of my first roles, and it's where my ambition/desire for great experiences, for great opportunities, was etched in me - ironically enough",
      "where my parents’ words “do you think we print money?” became much clearer",
      "this humbling experience brought hunger in me… so what did i do next?",
    ],
  },
  {
    slug: "essens",
    title: "m-l-m deep dive",
    side: [
      "essens europe se", "brno, czechia", "essensworld.com",
      "leading e-commerce and multi-level marketing company, communicating lifestyles through self-care products and network",
      "——————",
      "manager in training (internship)", "june 2023 - august 2023",
    ],
    main: [
      "at essens, i immersed myself in every system of a network marketing company (30-35 headcount internally), rotated through all departments, reporting directly to the essens cfo, and even job shadowing the ceo",
      "throughout this experience, i took on roles in marketing, accounting, purchasing, process analysis, hr, production",
      "in practical terms:",
      "created tailored marketing campaigns",
      "evaluated performance indicators with the accounting team",
      "managed contractual documents and purchase orders",
      "investigated process errors and proposed corrective measures",
      "participated in pre-selecting and interviewing candidates",
      "spearheaded a bonus project proposing ai tools to enhance processes",
      "the echo:",
      "collaborated with 4 franchise managers, analyzing performance indicators against set metrics",
      "developed and executed three digital marketing campaigns for the company's e-commerce strategy and lead generation",
      "conducted a competitive analysis of around 20 mlm companies to define the competitive edge and identify expansion opportunities",
      "initiated an ai project to explore process automation for internal processes - researching and applying ai tools to enhance existing systems at essens",
      "let’s try a startup now, next experience —>",
    ],
  },
  {
    slug: "citya",
    title: "d-r-t analysis",
    side: [
      "citya mobility s.r.o", "prague, czechia", "citya.io",
      "a demand-responsive transport platform connecting passengers with drivers through data analysis and ai, enabling flexible and eco-friendly travel in cities and regions",
      "——————",
      "manager/market specialist (internship)", "august 2023",
    ],
    main: [
      "my first experience in an early-stage scaling startup - at that time valued at €13 million",
      "job shadowed the company’s ceo and worked alongside a team of 8, helping citya leverage its position in the demand-responsive transportation and on-demand transit space",
      "explored potential product features and pivot opportunities while learning that in startups, “there’s always something to do, and always many things to do”",
      "the echo:",
      "shaped citya’s strategic positioning through a competitive analysis of 30+ demand-responsive/on-demand transit companies, generating targeted product feedback and identifying expansion opportunities",
      "engaged with early clients (B2B, B2G) in sales meetings to gather research-driven feedback that refined development and sales strategies and defined citya’s competitive edge",
      "founding a startup, next experience —>",
    ],
  },
  {
    slug: "founding-intern",
    title: "founding intern",
    side: [
      "intern", "remote (european market)", "—————",
      "a platform connecting students with real-world experiences, empowering them to discover their voice beyond academia",
      "——————",
      "founder", "september 2023 - february 2024",
    ],
    main: [
      "sharing the learning",
      "after my first experiences outside academia, i felt a need to share the difference between what is taught about real-world experience in academia world and what it truly is – what i have seen, what i have lived",
      "so i founded intern",
      "my goal was to encourage people my age, while still in school, to find our voice in the real world - because how can we fall in love with a contribution we’ve never experienced firsthand? real-world engagement then guides us to choose education as the pathway to pursuing the knowledge desired for the chosen direction",
      "we learn from what we live, but sometimes we don't know what we're missing",
      "the work that has been done:",
      "hired a product designer and an engineer to kick off the technical side",
      "built a landing page with a waitlist feature while gathering interest from students seeking real-world experiences",
      "established engagement from 4 university leaders to help connect students with dynamic opportunities",
      "received commitments from several companies to support the project",
      "the echo:",
      "european legislation and the costly fee for an employment intermediary, combined with my inexperience in execution (lack of speed, commitment, and team leadership), ultimately put this project on the shelf",
      "learning how to execute, next experience —>",
    ],
  },
  {
    slug: "findsparrow",
    title: "findsparrow",
    side: [
      "findsparrow inc.", "palo alto, california", "findsparrow.com",
      "a platform helping all students obtain academic success by providing freelance opportunities, while serving local communities",
      "——————",
      "from internship to", "—> vp of business development",
      "september 2023 - march 2024", "(same period as intern)",
    ],
    main: [
      "while working on intern…",
      "i joined sparrow – a very early-stage startup with a team of 3. before revenue, sparrow had a platform with active leads and an mvp with around a hundred users, facing the classic chicken-and-egg situation of building a two-sided market",
      "the echo:",
      "during that time, we expanded sparrow’s client base by executing a go-to-market strategy that acquired over 1,000 individual clients, leading to interest in partnerships with local businesses",
      "market analysis – based on the other eight freelance platforms, sparrow’s positioning was defined, strengthening its brand, affecting how the edge was marketed, and boosting web traffic",
      "at this stage, there was a lot of research involved, a lot of outreach to universities, and efforts to attract communities through social platforms, discussing the pain points of freelancing from both sides of the business",
      "during my stay at sparrow, i experienced the rocky path of finding the ideal investor as well - the long lists of vc funds, angels, etc - and perhaps realized that building a customer base is the most narrow path to both growing the business and securing funding - going from chasing to attracting",
      "founding a startup, next experience —>",
    ],
  },
  {
    slug: "kos-coo",
    title: "kos ai (executive)",
    side: [
      "kos inc.", "palo alto, california", "kos-ai.com │ pitchbook",
      "wearable iot devices remotely monitor patient vitals and assist healthcare professionals in delivering complex diagnostic feedback and timely medication, leveraging scale and ai to transform care from reactive to preventive, providing quality healthcare for everyone",
      "——————",
      "chief operating officer", "august 2024 - january 2025",
    ],
    main: [
      "after graduation, i spent three months attending bay area events to explore my next move",
      "by the third month, i began building again - launching a personal project that shared other people’s journeys",
      "it was then i realized that people are drawn to those who are curious and capable, and if i can build something for myself, people know i can build something for them too",
      "several meetings later, i joined kos - a healthtech startup - as one of the executives to plant kos on a map in silicon valley after four years of remote development on the 13th iteration of its wearable hardware and integrated software",
      "at this point, kos had passed several rounds of private investment (safe contracts), with a multiple 10-figure evaluation reports, had a board of ex-executives from major healthtech corporations, and a team under 50 spread out remotely",
      "the goals were clear: customer, funding, and team",
      "the echo:",
      "served as the face and voice of kos, hosting product launches, hiring events, celebratory gatherings, and networking sessions - representing kos at family office, high net worth, medtech conferences, and forums",
      "executed the relocation into newly leased offices in stanford research park, ensuring the space was fully equipped for incoming engineering, operational, and medical teams, and establishing day-to-day administration",
      "led daily operations as second-in-command, consulting the ceo, exploring financial oversight, investor relations, and regulatory processes (fda 510(k), ptcrb), and working toward closing new customer contracts; promoted kos in-person at over 50 vc offices on sand hill road, leveraging our hq location to engage potential investors and fuel the push toward a $10m series a",
      "consolidated the remote team of under 50 and its workforce into an on-site team of 8 by recruiting engineers and others through stanford hiring events (info sessions, meet&greets, company tours, career fairs), transferring four years of remote work into on-site optimization",
      "handled corporate governance and legal frameworks (ndas, employment agreements, stock grants, budgeting), learning about compliance along the way, and ensuring the company was structured to keep r&d and operations moving forward",
      "series a wasn’t fully closed (70%) by the time my employment ended, kos reached customers but in the healthcare world, deals can take time, and revenue is the only language that is loud enough, yet building an engineering team that now carries the knowledge and tech forward was a success",
      "due to goals not being fully met, my executive employment wasn’t approved to continue by the board, and despite kos’s genuine interest in finding a different role, we weren't able to see a clear path to continue working together",
      "a great experience, with even greater lessons learned and more yet to be learned",
      "next chapter —>",
    ],
  },
  {
    slug: "kos-ops",
    title: "pit-stop at Kos",
    side: [
      "kos inc.", "palo alto, california", "kos-ai.com │ pitchbook",
      "wearable iot devices … (same description)",
      "——————",
      "People and Operations", "April 2024 - June 2025",
    ],
    main: [
      "don’t have main yet",
    ],
  },
  {
    slug: "whats-next",
    title: "loading",
    side: [
      "what’s next", "loading", "loading", "loading.com",
      "loadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloadingloading",
      "——————", "loading", "march 2025 - loading",
    ],
    main: [
      "nothing",
    ],
  },
];

const order = ITEMS.map(i => i.slug);

export default function Page({ params }: { params: { slug: string } }) {
  const i = ITEMS.find(x => x.slug === params.slug);
  if (!i) return notFound();

  const idx = order.indexOf(i.slug);
  const prev = idx > 0 ? ITEMS[idx - 1] : undefined;
  const next = idx < ITEMS.length - 1 ? ITEMS[idx + 1] : undefined;

  return (
    <main className="min-h-screen bg-[--color-ivory] text-zinc-900 px-6 py-10">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[260px_1fr] gap-10">
        {/* side panel */}
        <aside className="text-sm space-y-3">
          {i.side.map((line, n) => (
            <div key={n} className={line.startsWith("—") ? "opacity-60" : ""}>{line}</div>
          ))}
        </aside>

        {/* main */}
        <article className="prose prose-zinc max-w-none">
          <h1 className="mb-6 text-2xl font-semibold tracking-tight">{i.title}</h1>
          <div className="space-y-4">
            {i.main.map((p, n) => (
              <p key={n} className="leading-relaxed">{p}</p>
            ))}
          </div>

          <PortfolioNav
            prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
            next={next ? { slug: next.slug, title: next.title } : undefined}
          />
        </article>
      </div>
    </main>
  );
}
