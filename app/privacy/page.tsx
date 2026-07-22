import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MacroSaver handles product reviews, comparison selections, server logs, and affiliate links.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "MacroSaver Privacy Policy",
    description:
      "How MacroSaver handles product reviews, comparison selections, server logs, and affiliate links.",
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-4 py-12 text-gray-300 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto max-w-3xl space-y-9">
        <header className="border-b border-gray-800 pb-7">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-400">Last updated July 21, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">What you can use without an account</h2>
          <p className="leading-relaxed text-gray-400">
            You do not need an account to browse products, calculate value metrics, compare products,
            or read guides and recipes. MacroSaver does not process payments; purchases happen on a
            retailer&apos;s site under that retailer&apos;s own terms and privacy policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Reviews you submit</h2>
          <p className="leading-relaxed text-gray-400">
            If you submit a product review, we collect the rating, optional name, optional comment,
            product identifier, submission time, and a one-way keyed hash derived from your IP
            address. The hash is used to limit abuse; the application does not intentionally store
            the raw IP address in the reviews table. Approved names, ratings, comments, and review
            dates may be displayed publicly.
          </p>
          <p className="leading-relaxed text-gray-400">
            Review records are stored with our database provider, Supabase. Pending reviews are
            visible to authorized moderators. We may reject spam, unsafe content, conflicts of
            interest, or content unrelated to the product. Contact us to request deletion of a review
            you submitted; we may ask for enough information to identify it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Local storage and technical data</h2>
          <p className="leading-relaxed text-gray-400">
            The comparison feature stores selected product identifiers in your browser&apos;s local
            storage so the tray persists between pages. You can remove products in the interface or
            clear site data in your browser. Our hosting infrastructure may also process standard
            request data such as IP address, user agent, requested URL, time, and error information
            for security, reliability, and diagnostics. Hosting logs are governed by the host&apos;s
            configured retention settings.
          </p>
        </section>

        <section className="rounded-lg border border-amber-400/30 bg-[#111] p-5">
          <h2 className="text-xl font-bold text-amber-300">Affiliate links and third parties</h2>
          <p className="mt-3 leading-relaxed text-gray-300">
            Product links may contain affiliate identifiers. When you follow one, the retailer or
            affiliate network may use cookies or similar technologies to attribute a purchase and
            may share commission-related reporting with us. MacroSaver may earn a commission without
            increasing your price. Retailers, affiliate networks, Supabase, and the site&apos;s hosting
            provider process data under their own privacy terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Retention, security, and your choices</h2>
          <p className="leading-relaxed text-gray-400">
            We retain review data while it is useful for moderation and publication, unless deletion
            is requested or a longer period is required for security or legal reasons. No online
            system is completely secure, but access to moderation tools and service credentials is
            restricted. You can choose not to submit a review, disable or clear browser storage, and
            manage retailer cookies through your browser.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-800 pt-7">
          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p className="leading-relaxed text-gray-400">
            For a privacy question or deletion request, email{" "}
            <a className="text-white underline hover:text-lime-400" href="mailto:support@macrosaver.com">
              support@macrosaver.com
            </a>
            . You can also read how our catalog and affiliate model work on the{" "}
            <Link className="text-white underline hover:text-lime-400" href="/about">
              About &amp; Methodology page
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
