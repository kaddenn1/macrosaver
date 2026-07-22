import type { Metadata } from "next";
import Hero from "@/components/Hero"; // <-- The Glow Up!
import CategoryRow from "@/components/CategoryRow";
import FilterDrawer from "@/components/FilterDrawer";
import Champions from "@/components/Champions";
import SortDropdown from "@/components/SortDropdown";
import SearchBar from "@/components/SearchBar";
import { products } from "@/data/products";
import { CATEGORY_SLUGS, CATEGORY_TITLES } from "@/lib/categories";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { getCatalogFacets } from "@/lib/catalog-facets";
import { parseCatalogQuery } from "@/lib/catalog-query";

const HOMEPAGE_PREVIEW_COUNT = 4;
const HOME_TITLE = `${SITE_NAME} | Compare Supplement Value & Cost per Serving`;
const HOME_DESCRIPTION =
  "Compare protein powder, pre-workout, creatine, and other supplements by recorded price snapshot, cost per serving, and nutrition value.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const hasQuery = Object.keys(resolvedSearchParams).length > 0;

  return {
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    robots: hasQuery ? { index: false, follow: true } : undefined,
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      url: SITE_URL,
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const facets = getCatalogFacets();
  const listingQuery = parseCatalogQuery(resolvedSearchParams, {
    allowSearch: true,
    allowMaxPrice: true,
    maxPriceCeiling: facets.maxCost,
    allowProteinSort: true,
  });

  const categoriesWithProducts = CATEGORY_SLUGS.filter((slug) =>
    products.some(
      (p) =>
        p.category === slug ||
        (p.additionalCategories as readonly string[] | undefined)?.includes(slug)
    )
  );

  return (
    <main className="min-h-screen text-gray-100 font-sans">

      {/* 1. The Brand New Hero Section! */}
      <Hero />

      {/* Category Row Section */}
      <div id="categories" className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-2 scroll-mt-24">
        {/* We can hide this title now since the Hero is doing the heavy lifting! */}
        {/* <h2 className="text-2xl font-black text-[#a3e635] tracking-tight uppercase mb-4">
          Shop by Category
        </h2> */}
        <CategoryRow />
      </div>

      {/* Header & Controls Section */}
      <div id="best-deals" className="w-full max-w-[1600px] mx-auto pt-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div className="border-l-4 border-[#a3e635] pl-4">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase">
              Best Value Picks
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar />
            <SortDropdown />
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Section */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-6 lg:px-8 pb-24">

        <div className="w-full lg:w-[280px] shrink-0">
            <FilterDrawer facets={facets} />
        </div>

        <div className="flex-1 w-full min-w-0">
          {listingQuery.hasListingIntent ? (
            <Champions
              searchParams={resolvedSearchParams}
              title="Filtered Products"
              paginationPath="/"
            />
          ) : (
            <div className="flex flex-col gap-16">
              {categoriesWithProducts.map((slug) => (
                <Champions
                  key={slug}
                  filterCategory={slug}
                  limit={HOMEPAGE_PREVIEW_COUNT}
                  title={CATEGORY_TITLES[slug] || slug}
                  viewAllHref={`/category/${slug}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
