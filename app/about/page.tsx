import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Methodology",
  description:
    "How MacroSaver selects products, records prices, calculates value metrics, handles affiliate links, and approaches nutrition content.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About MacroSaver & Our Methodology",
    description:
      "A transparent explanation of MacroSaver's catalog, price snapshots, calculations, editorial standards, and affiliate model.",
    url: `${SITE_URL}/about`,
  },
};

const formulas = [
  ["Cost per serving", "Recorded available offer price ÷ servings in the package"],
  ["Protein per dollar", "Protein grams per serving ÷ cost per serving"],
  ["Cost per ounce of protein", "Recorded offer price ÷ total protein ounces in the package"],
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
          <h2 className="text-xl font-bold text-white">Catalog and price data</h2>
          <p className="leading-relaxed text-gray-400">
            Products are selected and entered manually; the catalog is not a complete survey of the
            market. Prices are manually maintained snapshots of the offers shown and can change at
            any time. The current dataset does not include observation timestamps, so MacroSaver
            does not claim that a displayed price is current. Many products also have only one
            tracked retailer; a recorded price is not the lowest price available anywhere.
          </p>
          <p className="leading-relaxed text-gray-400">
            Always verify the retailer price, package size, serving count, ingredients, and
            availability before purchasing. Out-of-stock offers are excluded from value rankings
            when that status is known.
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
            Calculations use the serving and nutrition values in our catalog. Manufacturers can
            change labels and formulations, and data-entry errors are possible. A low calculated
            cost is a value signal, not a judgment about quality, safety, or suitability.
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            Named community endorsement badges identify a contributor&apos;s product list. They are not
            a clinical certification, safety determination, or substitute for individualized advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Affiliate and ranking policy</h2>
          <p className="leading-relaxed text-gray-400">
            MacroSaver may earn a commission when you buy through a marked retailer link, at no
            added cost to you. Affiliate status does not alter the formulas. Product lists are
            ordered using the selected on-page metric and filters, not commission rate. We do not
            accept payment for user reviews.
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

        <section className="space-y-3 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-white">Reviews, corrections, and contact</h2>
          <p className="leading-relaxed text-gray-400">
            Submitted reviews are moderated before publication. If you spot an incorrect price,
            serving count, nutrition value, attribution, or broken link, email{" "}
            <a className="text-white underline hover:text-lime-400" href="mailto:support@macrosaver.com">
              support@macrosaver.com
            </a>
            . For information about submitted review data and local storage, read our{" "}
            <Link className="text-white underline hover:text-lime-400" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-xs uppercase tracking-wider text-gray-500">Last updated July 21, 2026</p>
        </section>
      </article>
    </main>
  );
}
