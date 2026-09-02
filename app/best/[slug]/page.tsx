import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  BEST_VALUE_ARTICLES,
  getBestValueArticleBySlug,
  getRankedProducts,
  type BestValueArticle,
  type RankedProduct,
} from "@/lib/best-value";
import {
  BRAND_COMPARISON_ARTICLES,
  getBrandComparisonBySlug,
  getBrandStats,
  type BrandComparisonArticle,
  type BrandStats,
} from "@/lib/brand-comparison";
import { getGuideByCategory } from "@/lib/guides";
import { getBestOffer, getCostPerServing, hasFreshPriceObservation } from "@/lib/macrosaver-engine";
import { CATEGORY_TITLES } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/json-ld";
import type { Product } from "@/data/types";

export function generateStaticParams() {
  return [
    ...BEST_VALUE_ARTICLES.map((article) => ({ slug: article.slug })),
    ...BRAND_COMPARISON_ARTICLES.map((article) => ({ slug: article.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBestValueArticleBySlug(slug) ?? getBrandComparisonBySlug(slug);
  if (!article) return {};

  const title = `${article.title} | MacroSaver`;

  return {
    title,
    description: article.metaDescription,
    alternates: { canonical: `${SITE_URL}/best/${slug}` },
    openGraph: { title, description: article.metaDescription, url: `${SITE_URL}/best/${slug}` },
  };
}

export default async function BestValueArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rankedArticle = getBestValueArticleBySlug(slug);
  const brandArticle = getBrandComparisonBySlug(slug);

  if (!rankedArticle && !brandArticle) {
    notFound();
  }

  return rankedArticle ? (
    <RankedListArticle article={rankedArticle} slug={slug} />
  ) : (
    <BrandComparisonArticlePage article={brandArticle!} slug={slug} />
  );
}

function ArticleShell({
  title,
  intro,
  category,
  children,
}: {
  title: string;
  intro: string;
  category: string;
  children: React.ReactNode;
}) {
  const guide = getGuideByCategory(category);
  const categoryLabel = CATEGORY_TITLES[category] ?? category;

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[900px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Best Value", href: "/best" },
            { label: title },
          ]}
        />

        <div className="mb-10 border-b border-gray-800 pb-6">
          <Link
            href={`/category/${category}`}
            className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors"
          >
            ← Shop {categoryLabel}
          </Link>
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase mt-3">{title}</h1>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">{intro}</p>
          {guide && (
            <p className="text-gray-500 text-xs mt-3">
              New to {categoryLabel.toLowerCase()}? Read the{" "}
              <Link href={`/guides/${guide.slug}`} className="underline hover:text-gray-300">
                {guide.title}
              </Link>{" "}
              first.
            </p>
          )}
        </div>

        {children}

        <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-800 pt-6 pb-16">
          Generated from recorded retailer price snapshots in our catalog. Prices marked &quot;undated
          snapshot&quot; have not been re-observed recently — verify the current price at the retailer
          before buying.{" "}
          <Link href="/about#corrections" className="underline hover:text-gray-300">
            Report a correction
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

function ProductRow({
  product,
  metricLabel,
  metricValue,
  metricFormat,
  rank,
}: {
  product: Product;
  metricLabel: string;
  metricValue: number;
  metricFormat: "grams" | "dollars";
  rank?: number;
}) {
  const offer = getBestOffer(product);
  const costPerServing = getCostPerServing(product);
  const priceIsDated = offer
    ? product.offers.some(
        (o) => o.retailer === offer.retailer && o.price === offer.price && hasFreshPriceObservation(o)
      )
    : false;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex items-center gap-4 bg-[#111] border border-gray-800 hover:border-[#a3e635] rounded-xl p-4 transition-all duration-300"
    >
      {rank !== undefined && (
        <div className="text-lg font-black text-gray-600 w-6 text-center shrink-0">{rank}</div>
      )}
      <div className="w-14 h-14 shrink-0 bg-[#0a0a0a] border border-gray-800 rounded-lg relative overflow-hidden">
        {product.image && (
          <Image src={product.image} alt={product.name} fill className="object-contain p-1.5" sizes="56px" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#a3e635] mb-1">
          {product.brand}
        </div>
        <div className="text-sm font-bold text-white leading-snug truncate">{product.name}</div>
        <div className="text-[10px] text-gray-500 mt-1">
          {offer
            ? `${priceIsDated ? "Verified" : "Undated snapshot"} $${offer.price.toFixed(2)}`
            : "Price unavailable"}
          {costPerServing !== null && ` · $${costPerServing.toFixed(2)}/serving`}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{metricLabel}</div>
        <div className="text-lg font-black text-white">
          {metricFormat === "grams" ? `${metricValue.toFixed(1)}g` : `$${metricValue.toFixed(2)}`}
        </div>
      </div>
    </Link>
  );
}

function RankedListArticle({ article, slug }: { article: BestValueArticle; slug: string }) {
  const ranked = getRankedProducts(article);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Best Value", item: `${SITE_URL}/best` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/best/${slug}` },
    ],
  };

  // Position and product identity only — no price claims here, since prices on this
  // page are undated catalog snapshots, not verified current offers. Dated Offer
  // data is asserted only on the product page itself, per product, when it qualifies.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: article.title,
    itemListElement: ranked.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${entry.product.id}`,
      name: entry.product.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <ArticleShell title={article.title} intro={article.intro} category={article.category}>
        <div className="pb-16">
          {ranked.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-800 rounded-xl">
              No products currently qualify for this ranking.
            </div>
          ) : (
            <ol className="flex flex-col gap-3">
              {ranked.map((entry: RankedProduct, index) => (
                <li key={entry.product.id}>
                  <ProductRow
                    product={entry.product}
                    metricLabel={article.metricLabel}
                    metricValue={entry.metricValue}
                    metricFormat={article.metricFormat}
                    rank={index + 1}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </ArticleShell>
    </>
  );
}

function BrandColumn({ stats, metricLabel, metricFormat }: { stats: BrandStats; metricLabel: string; metricFormat: "grams" | "dollars" }) {
  const sorted = [...stats.products]
    .filter((r) => r.costPerServing !== null)
    .sort((a, b) => (a.costPerServing ?? 0) - (b.costPerServing ?? 0));

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-3">{stats.brand}</h2>
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
          <div className="text-[10px] text-gray-400 uppercase">Avg Cost / Serving</div>
          <div className="font-bold text-white">
            {stats.avgCostPerServing !== null ? `$${stats.avgCostPerServing.toFixed(2)}` : "—"}
          </div>
        </div>
        <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
          <div className="text-[10px] text-gray-400 uppercase">Best Protein / $</div>
          <div className="font-bold text-white">
            {stats.bestProteinPerDollar !== null ? `${stats.bestProteinPerDollar.value.toFixed(1)}g` : "—"}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm border-2 border-dashed border-gray-800 rounded-xl">
            No priced products from this brand yet.
          </div>
        ) : (
          sorted.map((row) => (
            <ProductRow
              key={row.product.id}
              product={row.product}
              metricLabel={metricLabel}
              metricValue={metricFormat === "grams" ? (row.proteinPerDollar ?? 0) : (row.costPerServing ?? 0)}
              metricFormat={metricFormat}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BrandComparisonArticlePage({ article, slug }: { article: BrandComparisonArticle; slug: string }) {
  const statsA = getBrandStats(article.category, article.brandA);
  const statsB = getBrandStats(article.category, article.brandB);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Best Value", item: `${SITE_URL}/best` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/best/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <ArticleShell title={article.title} intro={article.intro} category={article.category}>
        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <BrandColumn stats={statsA} metricLabel="Protein / $" metricFormat="grams" />
          <BrandColumn stats={statsB} metricLabel="Protein / $" metricFormat="grams" />
        </div>
      </ArticleShell>
    </>
  );
}
