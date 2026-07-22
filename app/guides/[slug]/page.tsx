import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Champions from "@/components/Champions";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const title = `${guide.title} | MacroSaver`;

  return {
    title,
    description: guide.summary,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
    openGraph: { title, description: guide.summary, url: `${SITE_URL}/guides/${slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${SITE_URL}/guides/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
<div className="w-full max-w-[900px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-gray-800 pb-6">
          <Link
            href={`/category/${guide.category}`}
            className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors"
          >
            ← Shop {guide.categoryLabel}
          </Link>
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase mt-3">
            {guide.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="space-y-10 pb-16">
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-white mb-2">
                {section.heading}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 pb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-sm font-bold text-[#a3e635] mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Champions
          filterCategory={guide.category}
          limit={4}
          title={`Shop ${guide.categoryLabel}`}
          viewAllHref={`/category/${guide.category}`}
        />
      </div>
    </main>
  );
}
