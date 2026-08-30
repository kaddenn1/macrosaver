import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getLatestPriceObservation,
  getOfferFreshness,
  getOfferSale,
  getPriceConfidence,
  getPriceHistory,
  getProteinPerDollar,
  getSavingsVsHighestOffer,
  hasFreshPriceObservation,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";
import { getTheme } from "@/lib/theme";
import { CATEGORY_TITLES } from "@/lib/categories";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { serializeJsonLd } from "@/lib/json-ld";
import { APPROVAL_BADGES, APPROVAL_LINKS, APPROVAL_LINK_LABELS } from "@/lib/approvals";
import { getReviewSummary } from "@/lib/reviews";
import ProductReviews from "@/components/ProductReviews";
import CompareButton from "@/components/CompareButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import { getGuideByCategory } from "@/lib/guides";
import { RECIPES } from "@/lib/recipes";
import { getProductLine } from "@/lib/product-lines";
import { getProductOverview } from "@/lib/product-overviews";
import { getBestValueArticleBySlug } from "@/lib/best-value";
import type { Product, RetailerOffer } from "@/data/types";

export const revalidate = 3600;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.96-.83-1.6-2.02-1.72-3.36h-3.06v13.53c0 1.62-1.32 2.94-2.94 2.94a2.94 2.94 0 0 1-2.94-2.94c0-1.62 1.32-2.93 2.94-2.93.31 0 .6.05.88.13V10.1a6.06 6.06 0 0 0-.88-.06 6.02 6.02 0 0 0-6.02 6.02A6.02 6.02 0 0 0 8.88 22a6.02 6.02 0 0 0 6.02-6.02V9.14a9.29 9.29 0 0 0 5.42 1.74V7.83a5.86 5.86 0 0 1-3.72-2.01z" />
    </svg>
  );
}

function formatOfferFreshnessLabel(offer: RetailerOffer): string {
  const freshness = getOfferFreshness(offer);
  if (freshness === "unknown") return "Undated — verify at retailer";

  const dateLabel = new Date(offer.priceObservedAt as string).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return freshness === "stale" ? `Checked ${dateLabel} — verify current price` : `Checked ${dateLabel}`;
}

function getRelatedProducts(product: Product, limit: number): Product[] {
  return (products as Product[])
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.additionalCategories?.includes(product.category))
    )
    .sort((a, b) => (getCostPerServing(a) ?? 999) - (getCostPerServing(b) ?? 999))
    .slice(0, limit);
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    return {};
  }

  const bestOffer = getBestOffer(product);
  const servingMetricsApply = supportsServingMetrics(product);

  const title = `${product.name} | ${product.brand} Price & Value`;
  const priceText = bestOffer
    ? `Recorded price snapshot $${bestOffer.price.toFixed(2)}`
    : "Recorded price snapshot unavailable";
  const detailsText = servingMetricsApply
    ? "cost per serving and nutrition details"
    : "product details";
  const description = `${product.brand} ${product.name}: ${priceText} — ${detailsText} on ${SITE_NAME}. Verify current price at the retailer.`;

  // Flavor/size variants of the same line canonicalize to one primary variant,
  // so Google consolidates ranking signal instead of treating near-duplicate
  // flavor pages as separate low-value pages (see lib/product-lines.ts).
  const line = getProductLine(product.id);
  const canonicalId = line ? line.primaryProductId : product.id;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/product/${canonicalId}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/product/${product.id}`,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    notFound();
  }

  const theme = getTheme(product.category);
  const overview = getProductOverview(product.id);
  const relatedBestValueArticle = overview?.relatedBestValueSlug
    ? getBestValueArticleBySlug(overview.relatedBestValueSlug)
    : undefined;
  const priceConfidence = getPriceConfidence(product);
  const headlineSale = priceConfidence.offer ? getOfferSale(priceConfidence.offer) : null;
  const costPerServing = getCostPerServing(product);
  const costPerOzProtein = getCostPerOzProtein(product);
  const proteinPerDollar = getProteinPerDollar(product);
  const savings = getSavingsVsHighestOffer(product);
  const servingMetricsApply = supportsServingMetrics(product);
  const hasProtein = servingMetricsApply && product.nutrition.proteinGrams > 0;
  const categoryTitle = CATEGORY_TITLES[product.category] || product.category;
  const relatedProducts = getRelatedProducts(product, 4);
  const reviewSummary = await getReviewSummary(product.id);
  const guide = getGuideByCategory(product.category);
  const featuredInRecipes = RECIPES.filter((r) => r.featuredProductId === product.id);
  const latestPriceObservation = getLatestPriceObservation(product);

  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const freshOffers = sortedOffers.filter((offer) => hasFreshPriceObservation(offer));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: `${SITE_URL}/category/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE_URL}/product/${product.id}`,
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(overview && { description: overview.summary }),
    brand: { "@type": "Brand", name: product.brand },
    category: CATEGORY_TITLES[product.category] || product.category,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    url: `${SITE_URL}/product/${product.id}`,
    // Offer/price data is only presented to crawlers when at least one offer carries
    // an explicit, recent observation date — undated snapshots stay visible on the
    // page but are never asserted as current price/availability facts to Google.
    ...(freshOffers.length > 0 && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: freshOffers[0].price,
        highPrice: freshOffers[freshOffers.length - 1].price,
        offerCount: freshOffers.length,
        offers: freshOffers.map((offer) => ({
          "@type": "Offer",
          url: offer.url,
          priceCurrency: "USD",
          price: offer.price,
          availability:
            offer.inStock === false
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          seller: { "@type": "Organization", name: offer.retailer },
        })),
      },
    }),
    ...(reviewSummary.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewSummary.averageRating,
        reviewCount: reviewSummary.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviewSummary.reviews
        .filter((r) => r.comment)
        .map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.reviewerName || "Anonymous" },
          datePublished: r.createdAt,
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: r.comment,
        })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryTitle, href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 flex flex-col lg:flex-row gap-10">
          {/* Image */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="h-72 bg-[#111] border border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <ProductImageLightbox src={product.image} alt={product.name} />
              ) : (
                <div className="text-center opacity-50">
                  <div className={`w-10 h-12 mx-auto mb-2 border-2 rounded-sm ${theme.border}`}>
                    <div className="w-full h-2 border-b-2 bg-gray-800 border-inherit rounded-t-sm" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${theme.text}`}>
                    {product.category}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Main details */}
          <div className="flex-1">
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.text}`}>
              {product.brand}
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-4">{product.name}</h1>

            {overview && (
              <p className="text-sm text-gray-300 leading-relaxed mb-5">{overview.summary}</p>
            )}

            {(() => {
              const line = getProductLine(product.id);
              if (!line) return null;
              const variants = (products as Product[]).filter((p) =>
                line.memberProductIds.includes(p.id)
              );
              return (
                <ProductVariantSelector currentProductId={product.id} variants={variants} />
              );
            })()}

            <div className="mb-4">
              <CompareButton productId={product.id} productName={product.name} variant="pill" />
            </div>

            {product.approvedBy && product.approvedBy.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {product.approvedBy
                  .filter((key) => APPROVAL_BADGES[key])
                  .map((key) => (
                    <div key={key} className="relative h-7 w-32">
                      <Image src={APPROVAL_BADGES[key]} alt={`${key} approved`} fill className="object-contain" />
                    </div>
                  ))}
                {product.approvedBy
                  .filter((key) => APPROVAL_LINKS[key])
                  .map((key) => (
                    <a
                      key={`${key}-social`}
                      href={APPROVAL_LINKS[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-[#a3e635] hover:border-[#a3e635] hover:underline"
                    >
                      <TikTokIcon className="h-3.5 w-3.5 shrink-0" />
                      {APPROVAL_LINK_LABELS[key] ?? "View on TikTok"}
                    </a>
                  ))}
              </div>
            )}

            {/* Value metrics grid */}
            <div
              className={`grid ${
                hasProtein
                  ? "grid-cols-2 sm:grid-cols-4"
                  : servingMetricsApply
                    ? "grid-cols-2"
                    : "grid-cols-1"
              } gap-4 mb-8 border-y border-gray-800 py-6`}
            >
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  {priceConfidence.status === "lowest-recorded"
                    ? "Lowest Recorded Price"
                    : priceConfidence.status === "recorded"
                      ? `Recorded Price at ${priceConfidence.offer?.retailer}`
                      : "Price Unavailable"}
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-black text-white">
                    {priceConfidence.offer ? `$${priceConfidence.offer.price.toFixed(2)}` : "—"}
                  </div>
                  {headlineSale && (
                    <span className="text-xs font-bold text-gray-500 line-through">
                      ${headlineSale.listPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {headlineSale && (
                  <div className="mt-0.5 text-[10px] font-bold text-rose-400">
                    Save ${headlineSale.savings.toFixed(2)} ({headlineSale.savingsPct.toFixed(0)}%)
                  </div>
                )}
                <div className="mt-1 text-[9px] uppercase tracking-wider text-gray-500">
                  {priceConfidence.offer?.priceObservedAt
                    ? `Checked ${new Date(priceConfidence.offer.priceObservedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}`
                    : "Check retailer for current price"}
                </div>
              </div>
              {servingMetricsApply && (
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Cost / Serving
                  </div>
                  <div className={`text-xl font-black ${theme.text}`}>
                    {costPerServing !== null ? `$${costPerServing.toFixed(2)}` : "—"}
                  </div>
                </div>
              )}
              {hasProtein && (
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Cost / Oz Protein
                  </div>
                  <div className={`text-xl font-black ${theme.text}`}>
                    {costPerOzProtein !== null ? `$${costPerOzProtein.toFixed(2)}` : "—"}
                  </div>
                </div>
              )}
              {hasProtein && (
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Protein / Dollar
                  </div>
                  <div className="text-xl font-black text-white">
                    {proteinPerDollar !== null ? `${proteinPerDollar.toFixed(1)}g` : "—"}
                  </div>
                </div>
              )}
            </div>

            {/* Nutrition facts */}
            {servingMetricsApply && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                  Nutrition Facts
                </h2>
                {product.nutritionNote && (
                  <p className="text-xs text-gray-400 mb-3">{product.nutritionNote}</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-400 uppercase">Servings</div>
                    <div className="font-bold text-white">{product.servings}</div>
                  </div>
                  {product.nutrition.servingSize && (
                    <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-gray-400 uppercase">Serving Size</div>
                      <div className="font-bold text-white">{product.nutrition.servingSize}</div>
                    </div>
                  )}
                  {product.nutrition.calories !== undefined && (
                    <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-gray-400 uppercase">Calories</div>
                      <div className="font-bold text-white">{product.nutrition.calories}</div>
                    </div>
                  )}
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-400 uppercase">Protein</div>
                    <div className="font-bold text-white">{product.nutrition.proteinGrams}g</div>
                  </div>
                  {product.nutrition.carbsGrams !== undefined && (
                    <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-gray-400 uppercase">Carbs</div>
                      <div className="font-bold text-white">{product.nutrition.carbsGrams}g</div>
                    </div>
                  )}
                  {product.nutrition.sugarGrams !== undefined && (
                    <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-gray-400 uppercase">Sugar</div>
                      <div className="font-bold text-white">{product.nutrition.sugarGrams}g</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {overview && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                  Best For &amp; Trade-offs
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  <span className="font-bold text-white">Best for: </span>
                  {overview.bestFor}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${theme.text}`}>
                      Pros
                    </div>
                    <ul className="flex flex-col gap-1.5 text-sm text-gray-300">
                      {overview.pros.map((pro) => (
                        <li key={pro} className="flex gap-2">
                          <span className={theme.text}>+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Trade-offs
                    </div>
                    <ul className="flex flex-col gap-1.5 text-sm text-gray-300">
                      {overview.cons.map((con) => (
                        <li key={con} className="flex gap-2">
                          <span className="text-gray-500">–</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {relatedBestValueArticle && (
                  <Link
                    href={`/best/${relatedBestValueArticle.slug}`}
                    className={`inline-block mt-4 text-[11px] font-black uppercase tracking-widest ${theme.text} hover:text-white transition-colors`}
                  >
                    See where this ranks in {relatedBestValueArticle.title} →
                  </Link>
                )}
              </div>
            )}

            {/* Offers */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                  Compare Offers
                </h2>
                {savings !== null && (
                  <span className="text-xs text-gray-400">
                    Save <span className={`font-bold ${theme.text}`}>${savings.toFixed(2)}</span> vs
                    highest price
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {sortedOffers.map((offer) => {
                  const isBest =
                    priceConfidence.offer?.retailer === offer.retailer &&
                    priceConfidence.offer?.price === offer.price;
                  const isOutOfStock = offer.inStock === false;
                  const sale = getOfferSale(offer);

                  if (isOutOfStock) {
                    return (
                      <div
                        key={offer.retailer}
                        className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-800 bg-[#0d0d0d] opacity-50"
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-white text-sm">{offer.retailer}</span>
                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                              Out of Stock
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500">
                            {formatOfferFreshnessLabel(offer)}
                          </span>
                        </div>
                        <span className="text-lg font-black text-gray-400">${offer.price.toFixed(2)}</span>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={offer.retailer}
                      href={offer.url}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                        isBest
                          ? `${theme.border} bg-[#111]`
                          : "border-gray-800 bg-[#0d0d0d] hover:border-gray-600"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-sm">{offer.retailer}</span>
                          {isBest && (
                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${theme.bg} text-black`}
                            >
                              Best Price
                            </span>
                          )}
                          {sale && (
                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-rose-500 text-white">
                              Sale
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {formatOfferFreshnessLabel(offer)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-baseline gap-2">
                          {sale && (
                            <span className="text-xs font-bold text-gray-500 line-through">
                              ${sale.listPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-black text-white">${offer.price.toFixed(2)}</span>
                        </div>
                        <span className={`text-xs font-bold uppercase ${theme.text}`}>Buy →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {sortedOffers.some((offer) => getPriceHistory(offer).length >= 2) && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                  Price History
                </h2>
                <div className="flex flex-col gap-6">
                  {sortedOffers
                    .filter((offer) => getPriceHistory(offer).length >= 2)
                    .map((offer) => (
                      <div key={offer.retailer} className="bg-[#111] border border-gray-800 rounded-lg px-4 py-4">
                        {sortedOffers.length > 1 && (
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                            {offer.retailer}
                          </div>
                        )}
                        <PriceHistoryChart history={getPriceHistory(offer)} color={theme.hex} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-gray-400 leading-relaxed">
              As an Amazon Associate and affiliate of other retailer programs, MacroSaver earns from
              qualifying purchases made through links on this page. This does not affect the price you
              pay or the offers we show — our rankings are based purely on cost per serving and cost
              per ounce of protein.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
              <span>
                {latestPriceObservation
                  ? `Price data last verified ${latestPriceObservation.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}`
                  : "Retailer prices shown above are undated snapshots"}
              </span>
              <span aria-hidden="true">·</span>
              <Link href="/about#corrections" className="underline hover:text-gray-300">
                Report a correction
              </Link>
              {guide && (
                <>
                  <span aria-hidden="true">·</span>
                  <Link href={`/guides/${guide.slug}`} className="underline hover:text-gray-300">
                    Read the {guide.categoryLabel} Buying Guide
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <ProductReviews productId={product.id} summary={reviewSummary} />

        {featuredInRecipes.length > 0 && (
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
              Featured In These Recipes
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredInRecipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="block bg-[#111] border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition-colors"
                >
                  <div className="h-24 flex items-center justify-center mb-2 relative overflow-hidden rounded">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400 uppercase">No Image</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-200 leading-snug line-clamp-2">
                    {recipe.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((related) => {
                const relatedBestOffer = getBestOffer(related);
                const relatedCostPerServing = getCostPerServing(related);
                return (
                  <Link
                    key={related.id}
                    href={`/product/${related.id}`}
                    className="block bg-[#111] border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition-colors"
                  >
                    <div className="h-24 flex items-center justify-center mb-2">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.name}
                          width={80}
                          height={80}
                          className="object-contain h-full w-auto"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400 uppercase">No Image</span>
                      )}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                      {related.brand}
                    </div>
                    <div className="text-xs text-gray-200 leading-snug line-clamp-2 mb-1">
                      {related.name}
                    </div>
                    <div className="text-sm font-black text-white">
                      {relatedBestOffer ? `$${relatedBestOffer.price.toFixed(2)}` : "—"}
                      {relatedCostPerServing !== null && (
                        <span className="text-[10px] font-normal text-gray-400 ml-1">
                          (${relatedCostPerServing.toFixed(2)}/serving)
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      </main>
    </>
  );
}
