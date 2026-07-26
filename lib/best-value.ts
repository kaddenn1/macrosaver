import type { Product, SupplementCategory } from "@/data/types";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getProteinPerDollar,
  getServingSizeGrams,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";

export type BestValueSortMetric = "proteinPerDollar" | "costPerServing" | "servingSizeGrams";

const METRIC_GETTERS: Record<BestValueSortMetric, (product: Product) => number | null> = {
  proteinPerDollar: getProteinPerDollar,
  costPerServing: getCostPerServing,
  servingSizeGrams: getServingSizeGrams,
};

/**
 * The "protein" category also holds collagen peptides, RTD protein milk/drinks,
 * and protein bars — all genuinely protein products, but not "protein powder" in
 * the sense someone searching that term means. Pages framed around protein powder
 * specifically should exclude these rather than silently including them because
 * they share a category tag.
 */
function isPowderFormat(product: Product): boolean {
  if (product.brand === "Built Bar") return false;
  if (/collagen/i.test(product.name)) return false;
  const servingSize = product.nutrition.servingSize ?? "";
  if (/\b(bottle|can)\b/i.test(servingSize)) return false;
  return true;
}

export type BestValueArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  category: SupplementCategory;
  /** Extra eligibility filter beyond category and having the sort metric available. */
  filter?: (product: Product) => boolean;
  /** Excludes collagen, RTD protein drinks/milk, and protein bars — for pages specifically about protein powder. */
  powderOnly?: boolean;
  sortBy: BestValueSortMetric;
  sortDirection: "asc" | "desc";
  limit: number;
  metricLabel: string;
  metricFormat: "grams" | "dollars";
};

export const BEST_VALUE_ARTICLES: BestValueArticle[] = [
  {
    slug: "cheapest-whey-protein-per-serving",
    title: "Cheapest Whey Protein per Serving",
    metaDescription:
      "Every whey protein in our catalog — identified by \"whey\" in the product name — ranked from lowest to highest cost per serving using recorded retailer prices.",
    intro:
      "This list is limited to products with \"whey\" in their own product name — we're not classifying formulas ourselves, just filtering to what the label already claims. They're ranked by cost per serving (price divided by servings per container), the number that actually determines what one scoop costs you, not the price on the tub.",
    category: "protein",
    filter: (product) => /whey/i.test(product.name),
    powderOnly: true,
    sortBy: "costPerServing",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Cost / Serving",
    metricFormat: "dollars",
  },
  {
    slug: "best-protein-powder-under-30",
    title: "Best Protein Powder Under $30",
    metaDescription:
      "Protein powders with a recorded retailer price under $30, ranked by protein per dollar so you can see which cheap tubs are actually the best deal.",
    intro:
      "Every product below has a recorded retailer price under $30. They're ranked by protein per dollar — total grams of protein in the container divided by price — not by sticker price alone, since a cheaper tub with a smaller scoop or fewer servings can be a worse deal than a slightly pricier one.",
    category: "protein",
    filter: (product) => {
      const offer = getBestOffer(product);
      return offer !== null && offer.price < 30;
    },
    powderOnly: true,
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
    metricFormat: "grams",
  },
  {
    slug: "best-protein-powder-under-50",
    title: "Best Protein Powder Under $50",
    metaDescription:
      "Protein powders with a recorded retailer price under $50, ranked by protein per dollar to find the best real value once you allow for bigger tubs.",
    intro:
      "Every product below has a recorded retailer price under $50 — enough headroom to include bigger tubs that a strict $30 cutoff would exclude. They're ranked by protein per dollar, not price, since a bigger container is only a better deal if it actually delivers more protein for the money.",
    category: "protein",
    filter: (product) => {
      const offer = getBestOffer(product);
      return offer !== null && offer.price < 50;
    },
    powderOnly: true,
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
    metricFormat: "grams",
  },
  {
    slug: "highest-protein-per-dollar",
    title: "Highest Protein Per Dollar: Ranked",
    metaDescription:
      "Every protein powder in our catalog with a recorded price, ranked from highest to lowest protein per dollar — no price ceiling, just the raw value ranking.",
    intro:
      "This is the full ranking, no price ceiling: every protein powder in our catalog with a recorded retailer price, sorted purely by protein per dollar. It's the same metric used in our $30 and $50 lists, just without a cutoff, so you can see exactly where a specific product lands against everything else we track.",
    category: "protein",
    powderOnly: true,
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 25,
    metricLabel: "Protein / $",
    metricFormat: "grams",
  },
  {
    slug: "best-value-clear-protein-powder",
    title: "Best-Value Clear Protein Powder",
    metaDescription:
      "Clear whey protein isolate products in our catalog, ranked by protein per dollar, for anyone who wants a juice-like protein drink instead of a milky shake.",
    intro:
      "Clear whey isolate is still a small category in our catalog — this list is limited to products explicitly labeled \"clear\" in their own name, so it may only show a couple of results today. They're ranked by protein per dollar, same as our other protein rankings.",
    category: "protein",
    filter: (product) => /clear/i.test(product.name),
    powderOnly: true,
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
    metricFormat: "grams",
  },
  {
    slug: "best-value-protein-powder-bariatric",
    title: "Best-Value Protein Powder for Bariatric Patients",
    metaDescription:
      "Protein products in our bariatric category, ranked by protein per dollar, for post-op shoppers prioritizing protein first in small portions.",
    intro:
      "Filtered to products tagged in our bariatric category that actually contain protein — mostly collagen and protein powders sized for small portions, not the full bariatric vitamin and supplement lineup. Ranked by protein per dollar. This is a newer part of our catalog, so the list may be short; always confirm with your bariatric team before changing what you use post-op.",
    category: "bariatric",
    filter: (product) => product.nutrition.proteinGrams > 0,
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
    metricFormat: "grams",
  },
  {
    slug: "best-protein-powder-small-serving-sizes",
    title: "Best Protein Powder for Small Serving Sizes",
    metaDescription:
      "Protein powders ranked by grams per serving, smallest first, for anyone who wants a lighter scoop to mix into a small glass or add to another recipe.",
    intro:
      "Ranked by the labeled grams-per-serving figure, smallest first — pulled directly from each product's serving size, not estimated. Only products with a parseable gram serving size on the label are included, so this list skips products sold by stick pack, bottle, or capsule instead of a scoop.",
    category: "protein",
    powderOnly: true,
    sortBy: "servingSizeGrams",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Grams / Serving",
    metricFormat: "grams",
  },
  {
    slug: "creatine-cost-per-serving",
    title: "Creatine Monohydrate Cost Per Serving: Ranked",
    metaDescription:
      "Every creatine monohydrate product in our catalog, ranked from lowest to highest cost per serving using recorded retailer prices — powder tubs and capsules alike.",
    intro:
      "Creatine monohydrate is close to a commodity — a 5g dose is a 5g dose regardless of brand, so price per serving is most of the decision. This list ranks every creatine product we track by cost per serving (price divided by servings per container), covering different sizes and flavors of the same formula as well as capsule versions, since a bigger tub or a multi-pack is only a better deal if it actually lowers the per-serving cost.",
    category: "creatine",
    sortBy: "costPerServing",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Cost / Serving",
    metricFormat: "dollars",
  },
  {
    slug: "protein-powder-price-tracker",
    title: "Protein Powder Price Tracker and Buying Guide",
    metaDescription:
      "Every scoopable protein powder in our catalog with a recorded price, sorted cheapest-per-serving first — a full reference table, not just a top-10 list.",
    intro:
      "This is the full catalog of protein powder specifically, not a shortlist: every scoopable whey, casein, or plant protein powder we track with a recorded price, sorted by cost per serving from cheapest to most expensive. It excludes collagen peptides, protein bars, and ready-to-drink protein shakes, which we track under the protein category too but aren't \"protein powder\" in the sense most people searching that term mean. Use it as a reference table rather than a top-picks list — pair it with the protein per dollar rankings above if you want the best value, not just the lowest sticker price.",
    category: "protein",
    powderOnly: true,
    sortBy: "costPerServing",
    sortDirection: "asc",
    limit: 60,
    metricLabel: "Cost / Serving",
    metricFormat: "dollars",
  },
];

export function getBestValueArticleBySlug(slug: string): BestValueArticle | undefined {
  return BEST_VALUE_ARTICLES.find((a) => a.slug === slug);
}

export function getBestValueArticlesByCategory(category: string): BestValueArticle[] {
  return BEST_VALUE_ARTICLES.filter((a) => a.category === category);
}

export type RankedProduct = { product: Product; metricValue: number };

export function getRankedProducts(article: BestValueArticle): RankedProduct[] {
  const categoryProducts = (products as Product[]).filter(
    (p) => p.category === article.category || p.additionalCategories?.includes(article.category)
  );

  const eligible = categoryProducts.filter(
    (p) =>
      supportsServingMetrics(p) &&
      (!article.powderOnly || isPowderFormat(p)) &&
      (!article.filter || article.filter(p))
  );

  const getMetric = METRIC_GETTERS[article.sortBy];

  const ranked = eligible
    .map((product) => ({ product, metricValue: getMetric(product) }))
    .filter((entry): entry is RankedProduct => entry.metricValue !== null);

  ranked.sort((a, b) =>
    article.sortDirection === "desc" ? b.metricValue - a.metricValue : a.metricValue - b.metricValue
  );

  return ranked.slice(0, article.limit);
}
