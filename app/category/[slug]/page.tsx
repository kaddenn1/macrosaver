import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilterDrawer from "@/components/FilterDrawer";
import Champions from "@/components/Champions";
import Breadcrumbs from "@/components/Breadcrumbs";
import SortDropdown from "@/components/SortDropdown";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { CATEGORY_SLUGS, CATEGORY_TITLES } from "@/lib/categories";
import { CATEGORY_BUYING_GUIDE } from "@/lib/categoryContent";
import { getGuideByCategory } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";
import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { getCatalogFacets } from "@/lib/catalog-facets";
import { getCostPerServing } from "@/lib/macrosaver-engine";
import { serializeJsonLd } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  if (!CATEGORY_SLUGS.includes(slug)) return {};
  const displayTitle = CATEGORY_TITLES[slug];

  const title = `${displayTitle} Price & Value Comparison`;
  const description = `Compare ${displayTitle.toLowerCase()} products by recorded offer-price snapshot, cost per serving, and available nutrition data on MacroSaver.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/category/${slug}` },
    robots:
      Object.keys(resolvedSearchParams).length > 0
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      title: `${title} | MacroSaver`,
      description,
      url: `${SITE_URL}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug: currentSlug } = await params;
  const resolvedSearchParams = await searchParams;
  const hasQuery = Object.keys(resolvedSearchParams).length > 0;

  if (!CATEGORY_SLUGS.includes(currentSlug)) notFound();

  const displayTitle = CATEGORY_TITLES[currentSlug];
  const buyingGuide = CATEGORY_BUYING_GUIDE[currentSlug];
  const fullGuide = getGuideByCategory(currentSlug);
  const facets = getCatalogFacets(currentSlug);

  const categoryProducts = (products as Product[]).filter(
    (p) =>
      p.category.toLowerCase() === currentSlug.toLowerCase() ||
      p.additionalCategories?.some((c) => c.toLowerCase() === currentSlug.toLowerCase())
  ).sort((a, b) => (getCostPerServing(a) ?? Number.POSITIVE_INFINITY) - (getCostPerServing(b) ?? Number.POSITIVE_INFINITY));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: displayTitle,
        item: `${SITE_URL}/category/${currentSlug}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${displayTitle} Deals`,
    itemListElement: categoryProducts.slice(0, 20).map((p, index) => ({
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: displayTitle }]} />
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
              {displayTitle}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Compare {displayTitle.toLowerCase()} by recorded price snapshot, cost per serving, and nutrition value.
            </p>
          </div>

          {/* Controls Cluster: Search & Sort! */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar label={`Search ${displayTitle}`} />
            <SortDropdown allowProteinSort={currentSlug === "protein"} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-6 lg:px-8 pb-24">

        <div className="w-full lg:w-[280px] shrink-0">
           <FilterDrawer activeCategory={currentSlug} facets={facets} />
        </div>

        <div className="flex-1 w-full min-w-0">
          <Champions
            filterCategory={currentSlug}
            searchParams={resolvedSearchParams}
            paginationPath={`/category/${currentSlug}`}
          />

          {buyingGuide && (
            <div className="mt-12 border-t border-gray-800 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                How We Rank {displayTitle} Deals
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[750px]">
                {buyingGuide}
              </p>
              {fullGuide && (
                <Link
                  href={`/guides/${fullGuide.slug}`}
                  className="inline-block mt-4 text-[11px] font-black uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors"
                >
                  Read the full {displayTitle} buying guide →
                </Link>
              )}
            </div>
          )}
        </div>

      </div>

    </main>
  );
}
