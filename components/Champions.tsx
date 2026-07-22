import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getSavingsVsHighestOffer,
  extractFlavor,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";
import type { Product } from "@/data/types";
import { getTheme } from "@/lib/theme";
import { APPROVAL_BADGES } from "@/lib/approvals";
import CompareButton from "@/components/CompareButton";
import {
  applyCatalogQuery,
  CATALOG_PAGE_SIZE,
  getCatalogQueryString,
  parseCatalogQuery,
} from "@/lib/catalog-query";

interface ChampionsProps {
  filterCategory?: string;
  filterBrand?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  /** Caps how many products are shown (e.g. a 4-up homepage preview row). */
  limit?: number;
  title?: string;
  viewAllHref?: string;
  paginationPath?: string;
}

export default function Champions({
  filterCategory,
  filterBrand,
  searchParams,
  limit,
  title = "Products",
  viewAllHref,
  paginationPath,
}: ChampionsProps) {
  let displayProducts = [...products] as Product[];

  if (filterCategory) {
    const target = filterCategory.toLowerCase();
    displayProducts = displayProducts.filter(
      (p) =>
        p.category.toLowerCase() === target ||
        p.additionalCategories?.some((c) => c.toLowerCase() === target)
    );
  }

  if (filterBrand) {
    const target = filterBrand.toLowerCase();
    displayProducts = displayProducts.filter((p) => p.brand.toLowerCase() === target);
  }

  const scopedProducts = displayProducts;
  const scopedCosts = scopedProducts
    .map((product) => getCostPerServing(product))
    .filter((cost): cost is number => cost !== null);
  const allowedFlavors = filterCategory
    ? Array.from(
        new Set(
          scopedProducts
            .map((product) => extractFlavor(product.name))
            .filter((flavor): flavor is string => flavor !== null)
        )
      )
    : [];
  const isProteinCategory = filterCategory === "protein";
  const hasListingControls = !filterBrand;
  const query = parseCatalogQuery(searchParams, {
    allowSearch: hasListingControls,
    allowMaxPrice: hasListingControls,
    maxPriceCeiling: scopedCosts.length ? Math.max(...scopedCosts) : undefined,
    allowProteinFilters: isProteinCategory,
    allowProteinSort: hasListingControls && (!filterCategory || isProteinCategory),
    allowedFlavors,
  });

  displayProducts = applyCatalogQuery(scopedProducts, query);

  const totalMatches = displayProducts.length;
  const totalPages = limit ? 1 : Math.max(1, Math.ceil(totalMatches / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(query.page, totalPages);

  if (limit) {
    displayProducts = displayProducts.slice(0, limit);
  } else {
    const pageStart = (currentPage - 1) * CATALOG_PAGE_SIZE;
    displayProducts = displayProducts.slice(pageStart, pageStart + CATALOG_PAGE_SIZE);
  }

  const pageStart = totalMatches === 0 ? 0 : (currentPage - 1) * CATALOG_PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * CATALOG_PAGE_SIZE, totalMatches);
  const pageHref = (page: number) => {
    const queryString = getCatalogQueryString(query, page);
    return `${paginationPath ?? ""}${queryString ? `?${queryString}` : ""}` || "/";
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          {title}
          <span className="text-xs font-medium tracking-normal text-gray-400">
            ({limit && totalMatches > displayProducts.length
              ? `${displayProducts.length} of ${totalMatches}`
              : totalPages > 1
                ? `${pageStart}–${pageEnd} of ${totalMatches}`
                : totalMatches})
          </span>
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-xs text-gray-400 hover:text-white uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-800 rounded-xl">
            No products found matching those filters. Try adjusting your selections!
          </div>
        )}

        {displayProducts.map((item) => {
          const bestOffer = getBestOffer(item);
          const costPerServing = getCostPerServing(item);
          const costPerOzProtein = getCostPerOzProtein(item);
          const savings = getSavingsVsHighestOffer(item);
          const servingMetricsApply = supportsServingMetrics(item);
          const hasProtein = servingMetricsApply && item.nutrition.proteinGrams > 0;

          const theme = getTheme(item.category);

          return (<div
              key={item.id}
              className={`bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 group flex flex-col relative ${theme.hoverBorder} ${theme.glow}`}
            >
              <CompareButton productId={item.id} productName={item.name} />

              <Link
                href={`/product/${item.id}`}
                className="flex flex-1 flex-col rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
                aria-label={`View details for ${item.name}`}
              >
              <div className="h-48 bg-[#0a0a0a] flex items-center justify-center border-b border-gray-800 relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 399px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                ) : (
                  <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className={`w-8 h-10 mx-auto mb-2 border-2 rounded-sm ${theme.border}`}>
                      <div className="w-full h-2 border-b-2 bg-gray-800 border-inherit rounded-t-sm" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${theme.text}`}>
                      {item.category}
                    </span>
                    <p className="text-[8px] text-gray-400 uppercase mt-1">Asset Pending</p>
                  </div>
                )}
                {item.approvedBy && item.approvedBy.length > 0 && (
                  <div className="absolute bottom-2 left-2 z-10 flex gap-1">
                    {item.approvedBy
                      .filter((key) => APPROVAL_BADGES[key])
                      .map((key) => (
                        <div key={key} className="relative h-5 w-24 drop-shadow-md">
                          <Image src={APPROVAL_BADGES[key]} alt={`${key} community endorsement badge`} fill className="object-contain" />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.text}`}>
                  {item.brand}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-2 flex-1">
                  {item.name}
                </h3>

                <div className={`mt-auto gap-2 ${servingMetricsApply ? "grid grid-cols-2" : "block"}`}>
                   <div>
                     <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                       {item.offers.filter((offer) => offer.inStock !== false).length > 1
                         ? "Lowest Undated Snapshot"
                         : "Undated Price Snapshot"}
                      </div>
                      <div className="text-xl font-black text-white">
                        {bestOffer ? `$${bestOffer.price.toFixed(2)}` : "—"}
                     </div>
                     <div className="mt-1 text-[9px] uppercase tracking-wider text-gray-500">
                       Verify at retailer
                     </div>
                     {servingMetricsApply && (
                       <>
                         <div className="mt-2 text-[10px] uppercase tracking-wider text-gray-400">
                           Per Serving
                         </div>
                         <div className={`mt-0.5 text-sm font-bold ${theme.text}`}>
                           {costPerServing !== null ? `$${costPerServing.toFixed(2)}` : "—"}
                         </div>
                       </>
                     )}
                   </div>

                   {servingMetricsApply && <div className="text-right">
                     <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">
                        {savings !== null ? `Save $${savings.toFixed(2)} vs highest` : ' '}
                     </div>
                     {hasProtein && (
                       <>
                         <div className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider text-right">
                           Cost / Oz Protein
                         </div>
                         <div className={`text-sm font-bold mt-0.5 text-right ${theme.text}`}>
                            {costPerOzProtein !== null ? `$${costPerOzProtein.toFixed(2)}` : '—'}
                         </div>
                       </>
                     )}
                   </div>}
                </div>

                <div className={`w-full mt-4 py-2 text-[11px] font-black uppercase tracking-widest text-black rounded transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.bg} ${theme.hoverBg}`}>
                  {bestOffer && (
                    <span className="max-w-[55%] truncate rounded bg-black/80 px-1.5 py-0.5 text-[8px] text-white">
                      {bestOffer.retailer}
                    </span>
                  )}
                  View Details →
                </div>
              </div>
              </Link>
            </div>
          );
        })}
      </div>

      {!limit && totalPages > 1 && (
        <nav
          aria-label="Product result pages"
          className="mt-10 flex items-center justify-center gap-4 border-t border-gray-800 pt-6"
        >
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              scroll={false}
              className="inline-flex min-h-11 items-center rounded border border-gray-700 px-4 text-xs font-bold uppercase tracking-wider text-gray-200 hover:border-[#a3e635] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
            >
              ← Previous
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center px-4 text-xs font-bold uppercase tracking-wider text-gray-600">
              ← Previous
            </span>
          )}
          <span className="text-xs text-gray-400" aria-current="page">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              scroll={false}
              className="inline-flex min-h-11 items-center rounded border border-gray-700 px-4 text-xs font-bold uppercase tracking-wider text-gray-200 hover:border-[#a3e635] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
            >
              Next →
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center px-4 text-xs font-bold uppercase tracking-wider text-gray-600">
              Next →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
