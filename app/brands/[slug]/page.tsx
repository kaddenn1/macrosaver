import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Champions from "@/components/Champions";
import { BRANDS, getBrandBySlug, getBrandProductCount } from "@/lib/brands";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  const query = await searchParams;
  const title = `${brand.name} Products & Value`;
  const description = `${brand.intro} Compare cataloged offer-price snapshots and cost-per-serving values for tracked ${brand.name} products.`;
  const hasQuery = Object.values(query).some((value) => value !== undefined);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/brands/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/brands/${slug}` },
    robots: hasQuery ? { index: false, follow: true } : undefined,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const count = getBrandProductCount(brand.name);

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1600px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
            {brand.name}
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-[650px]">
            {brand.intro}
          </p>
          <p className="text-xs text-gray-500 mt-3 uppercase tracking-wider">
            {count} {count === 1 ? "product" : "products"} tracked
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Champions
          filterBrand={brand.name}
          searchParams={resolvedSearchParams}
          title={`${brand.name} Products`}
          viewAllHref="/brands"
          paginationPath={`/brands/${slug}`}
        />
      </div>
    </main>
  );
}
