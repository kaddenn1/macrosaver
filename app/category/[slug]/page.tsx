import type { Metadata } from "next";
import CategoryRow from "@/components/CategoryRow";
import FilterDrawer from "@/components/FilterDrawer";
import Champions from "@/components/Champions";
import SortDropdown from "@/components/SortDropdown";
import SearchBar from "@/components/SearchBar"; // <-- New Search Import!
import Link from "next/link";
import { CATEGORY_SLUGS, CATEGORY_TITLES } from "@/lib/categories";
import { CATEGORY_BUYING_GUIDE } from "@/lib/categoryContent";
import { getGuideByCategory } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const displayTitle = CATEGORY_TITLES[slug] || slug;

  const title = `Best ${displayTitle} Deals | Compare Prices on MacroSaver`;
  const description = `Compare ${displayTitle.toLowerCase()} prices across top retailers and find the best cost per serving. Updated pricing, value scores, and savings on MacroSaver.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/category/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/category/${slug}` },
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

  const displayTitle = CATEGORY_TITLES[currentSlug] || currentSlug;
  const buyingGuide = CATEGORY_BUYING_GUIDE[currentSlug];
  const fullGuide = getGuideByCategory(currentSlug);

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      
      <div className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-2">
         <CategoryRow />
      </div>

      <div className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
              {displayTitle}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Compare top-rated {displayTitle.toLowerCase()} from trusted retailers.
            </p>
          </div>
          
          {/* Controls Cluster: Search & Sort! */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar />
            <SortDropdown />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-6 lg:px-8 pb-24">
        
        <div className="w-full lg:w-[280px] shrink-0">
           <FilterDrawer />
        </div>
        
        <div className="flex-1 w-full min-w-0">
          <Champions filterCategory={currentSlug} searchParams={resolvedSearchParams} />

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