import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, AMAZON_ASSOCIATE_ACTIVE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Methodology",
  description:
    "How MacroSaver selects products, sources nutrition data, calculates value metrics, handles affiliate links, and approaches nutrition content.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About MacroSaver & Our Methodology",
    description:
      "A transparent explanation of MacroSaver's catalog, nutrition data, value calculations, editorial standards, and affiliate model.",
    url: `${SITE_URL}/about`,
  },
};

const formulas = [
  ["Protein concentration", "Protein grams per serving ÷ serving weight in grams"],
  ["Cost per serving", "The price you type into our value calculator ÷ servings in the package"],
  ["Protein per dollar", "Total protein grams in the package ÷ the price you type in"],
  ["Cost per ounce of protein", "The price you type in ÷ total protein ounces in the package"],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12 text-gray-300 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="border-b border-gray-800 pb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
            Transparency
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            About MacroSaver &amp; Our Methodology
          </h1>
          <p className="mt-4 leading-relaxed text-gray-400">
            MacroSaver helps shoppers compare nutrition products on serving-level value. We show
            our math, disclose the limits of our catalog, and separate affiliate relationships from
            the calculations used to order products.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Catalog and nutrition data</h2>
          <p className="leading-relaxed text-gray-400">
            Products are selected and entered manually; the catalog is not a complete survey of the
            market. MacroSaver does not store, track, or display retailer prices anywhere on the
            site — rankings are built entirely from label nutrition data (protein per serving,
            serving weight, calories) that we enter from the manufacturer&apos;s own listing.
          </p>
          <p className="leading-relaxed text-gray-400">
            Where you see a dollar figure on a product page, it came from the value calculator: you
            type in the price you currently see at a retailer, and the math (cost per serving,
            protein per dollar, cost per ounce of protein) runs in your browser on the spot. Nothing
            you type is saved, logged, or sent anywhere.
          </p>
          <p className="leading-relaxed text-gray-400">
            Always verify the retailer price, package size, serving count, ingredients, and
            availability before purchasing. Out-of-stock offers are excluded from our &quot;Where to
            Buy&quot; links when that status is known.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">How value metrics are calculated</h2>
          <dl className="space-y-3">
            {formulas.map(([term, definition]) => (
              <div key={term} className="rounded-lg border border-gray-800 bg-[#111] p-4">
                <dt className="font-bold text-white">{term}</dt>
                <dd className="mt-1 text-sm text-gray-400">{definition}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm leading-relaxed text-gray-400">
            Category rankings and best-value guides use protein concentration (protein grams per
            gram of serving) — a nutrition-only metric that never depends on price. Manufacturers can
            change labels and formulations, and data-entry errors are possible. A high protein
            concentration is a nutrition-density signal, not a judgment about quality, safety, or
            suitability.
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            Named community endorsement badges identify a contributor&apos;s product list. They are not
            a clinical certification, safety determination, or substitute for individualized advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Affiliate and ranking policy</h2>
          <p className="leading-relaxed text-gray-400">
            {AMAZON_ASSOCIATE_ACTIVE && "As an Amazon Associate I earn from qualifying purchases. "}
            MacroSaver may earn a commission when you buy through marked retailer links, at no added cost to you.
            Affiliate status does not alter the rankings: product lists are ordered by nutrition data
            (protein concentration), not commission rate, and outbound retailer links are marked
            &quot;(paid link)&quot; wherever they appear. We do not accept payment for user reviews.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Nutrition and health content</h2>
          <p className="leading-relaxed text-gray-400">
            Guides and recipes are general educational content, not medical advice, diagnosis, or
            individualized nutrition care. MacroSaver does not currently claim that this content has
            been reviewed by a physician or registered dietitian. People who are pregnant, take
            medication, have a medical condition, or have had bariatric surgery should confirm
            choices with their qualified care team and follow the product label.
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            General reference sources include the{" "}
            <a
              href="https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-Consumer/"
              target="_blank"
              rel="noopener"
              className="text-lime-400 underline hover:text-lime-300"
            >
              NIH Office of Dietary Supplements
            </a>
            ,{" "}
            <a
              href="https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much"
              target="_blank"
              rel="noopener"
              className="text-lime-400 underline hover:text-lime-300"
            >
              FDA caffeine guidance
            </a>
            , and{" "}
            <a
              href="https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery"
              target="_blank"
              rel="noopener"
              className="text-lime-400 underline hover:text-lime-300"
            >
              NIDDK bariatric surgery information
            </a>
            .
          </p>
        </section>

        <section id="corrections" className="space-y-3 border-t border-gray-800 pt-8 scroll-mt-24">
          <h2 className="text-xl font-bold text-white">Reviews, corrections, and contact</h2>
          <p className="leading-relaxed text-gray-400">
            Submitted reviews are moderated before publication. If you spot an incorrect product fact,
            serving count, nutrition value, attribution, label detail, or broken link, email{" "}
            <a className="text-white underline hover:text-lime-400" href="mailto:support@macrosaver.com">
              support@macrosaver.com
            </a>
            . For information about submitted review data and local storage, read our{" "}
            <Link className="text-white underline hover:text-lime-400" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-xs uppercase tracking-wider text-gray-500">Last updated September 11, 2026</p>
        </section>
      </article>
    </main>
  );
}
