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

const HOMEPAGE_PREVIEW_COUNT = 4;
const ACTIVE_FILTER_KEYS = ["q", "protein", "maxPrice", "flavor", "type"];

export const metadata: Metadata = {
  title: `${SITE_NAME} | Compare Supplement & Protein Powder Prices`,
  description:
    "Compare prices for protein powder, pre-workout, creatine, and more across top retailers. See cost per serving and find the lowest price on every product.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} | Compare Supplement & Protein Powder Prices`,
    description:
      "Compare prices for protein powder, pre-workout, creatine, and more across top retailers. See cost per serving and find the lowest price on every product.",
    url: SITE_URL,
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const hasActiveFilters = ACTIVE_FILTER_KEYS.some((key) => resolvedSearchParams[key]);

  const categoriesWithProducts = CATEGORY_SLUGS.filter((slug) =>
    products.some((p) => p.category === slug || p.additionalCategories?.includes(slug))
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
              Best Deals Right Now
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
          <FilterDrawer />
        </div>

        <div className="flex-1 w-full min-w-0">
          {hasActiveFilters ? (
            <Champions searchParams={resolvedSearchParams} />
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