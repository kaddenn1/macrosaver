import type { Metadata } from "next";
import Champions from "@/components/Champions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { getBestSale } from "@/lib/macrosaver-engine";
import { serializeJsonLd } from "@/lib/json-ld";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const title = "Current Deals";
  const description =
    "Every product with an active, verified price drop on MacroSaver, ranked by biggest savings.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/deals` },
    robots:
      Object.keys(resolvedSearchParams).length > 0
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      title: `${title} | MacroSaver`,
      description,
      url: `${SITE_URL}/deals`,
    },
  };
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const hasQuery = Object.keys(resolvedSearchParams).length > 0;

  const dealProducts = (products as Product[])
    .filter((p) => getBestSale(p) !== null)
    .sort((a, b) => (getBestSale(b)?.savings ?? 0) - (getBestSale(a)?.savings ?? 0));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Deals", item: `${SITE_URL}/deals` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Current Deals",
    itemListElement: dealProducts.slice(0, 20).map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${p.id}`,
      name: p.name,
    })),
  };

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {!hasQuery && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
        />
      )}

      <div className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Deals" }]} />
        <div className="mb-6 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-rose-400 tracking-tight uppercase">
            Current Deals
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Every product with a verified price drop right now, ranked by biggest savings.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Champions
          dealsOnly
          searchParams={resolvedSearchParams}
          title="Deals"
          paginationPath="/deals"
        />
      </div>
    </main>
  );
}
