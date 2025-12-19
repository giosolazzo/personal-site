import Image from "next/image";
import Link from "next/link";

export default function Experience1() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Side Panel */}
        <aside className="sm:col-span-1 space-y-2 text-sm">
          <Image
            src="/images/portfolio/experiences/sodexo/logo.png"
            alt="Sodexo logo"
            width={100}
            height={100}
            className="mb-2"
          />
          <p className="font-medium">sodexo</p>
          <p>menlo park, ca</p>
          <hr className="border-zinc-600 w-8 my-2" />
          <p>dishwasher</p>
          <p className="text-zinc-400">september 2022 - may 2023</p>
        </aside>

        {/* Main Content */}
        <section className="sm:col-span-3 space-y-6">
          <h1 className="text-2xl font-semibold">
            one of the first, one of the best – washing dishes at sodexo
          </h1>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              yes, sounds like <span className="underline">jensen huang</span>'s story – he’s lucky i didn’t start in tech
            </p>
            <p>
              dishwasher was indeed one of my first roles, and it's where my ambition/desire
              for great experiences, for great opportunities, was etched in me – ironically enough
            </p>
            <p>
              where my parents’ words “do you think we print money?” became much clearer
            </p>
            <p>
              this humbling experience brought hunger in me… so what did i do next?
            </p>
          </div>

          {/* Nav Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-between items-start gap-3 text-sm">
            <Link
              href="/portfolio"
              className="underline text-zinc-400 hover:text-white transition"
            >
              ← back to all
            </Link>
            <div className="flex gap-6">
              <span className="text-zinc-500">‹ dishwashing run</span>
              <Link
                href="/portfolio/experience-2"
                className="underline text-zinc-400 hover:text-white transition"
              >
                m-l-m deep dive →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
