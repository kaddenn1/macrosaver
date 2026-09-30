import type { Product } from "@/data/types";

const GRAMS_PER_OZ = 28.3495;

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

// Product names follow "Brand/Line - Flavor (size)" or "Brand/Line, Flavor (size)".
// Pulls the flavor out of either pattern; returns null for single-variant products
// (e.g. "Casein Protein") that have no flavor segment at all, and for trailing
// dosage/count segments (e.g. "300mg", "90 Capsules") that aren't real flavors.
export function extractFlavor(name: string): string | null {
  const withoutSize = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const dashParts = withoutSize.split(/\s[-–—]\s/);
  const commaParts = withoutSize.split(/,\s*/);
  const candidate =
    dashParts.length > 1
      ? dashParts[dashParts.length - 1]
      : commaParts.length > 1
        ? commaParts[commaParts.length - 1]
        : null;

  if (!candidate) return null;

  const normalized = candidate.trim();
  const looksLikeDosage = /^\d+(?:\.\d+)?\s*(?:mcg|mg|g|kg|ml|oz|lb)s?\b/i.test(normalized);
  const looksLikeCount = /^\d+\s*(?:count|ct|capsules?|softgels?|servings?|packs?)\b/i.test(
    normalized
  );

  return looksLikeDosage || looksLikeCount ? null : normalized;
}

/** Consumables are the only products for which serving and nutrition value math applies. */
export function supportsServingMetrics(product: Product): boolean {
  return (product.kind ?? "consumable") === "consumable";
}

/**
 * Parses the labeled gram weight out of a servingSize string like "1 scoop (26g)"
 * or "2 scoops (42g)". Returns null when no parenthesized gram figure is present
 * (e.g. "1 stick pack", "1 bottle (16.9 fl oz)") rather than guessing one.
 */
export function getServingSizeGrams(product: Product): number | null {
  if (!supportsServingMetrics(product) || !product.nutrition.servingSize) return null;

  const match = product.nutrition.servingSize.match(/\((\d+(?:\.\d+)?)\s*g\)/i);
  if (!match) return null;

  const grams = parseFloat(match[1]);
  return Number.isFinite(grams) && grams > 0 ? grams : null;
}

function getAvailableOffers(product: Product) {
  return product.offers.filter((offer) => offer.inStock !== false);
}

/** Whether a product has at least one in-stock retailer link to send a shopper to. */
export function hasAvailableOffer(product: Product): boolean {
  return getAvailableOffers(product).length > 0;
}

/**
 * Grams of protein per gram of serving weight — a stable nutrition metric that never
 * depends on price, used for default catalog/best-value ranking.
 */
export function getProteinConcentration(product: Product): number | null {
  const servingGrams = getServingSizeGrams(product);
  if (!servingGrams || product.nutrition.proteinGrams <= 0) return null;
  return roundToTwo(product.nutrition.proteinGrams / servingGrams);
}

export function getCaloriesPerGramProtein(product: Product): number | null {
  if (!product.nutrition.calories || product.nutrition.proteinGrams <= 0) return null;
  return roundToTwo(product.nutrition.calories / product.nutrition.proteinGrams);
}

/**
 * Stateless value calculator: the visitor types in the price they see at a retailer and
 * these compute cost/value figures on the spot. Nothing here reads or writes stored data —
 * these are pure functions of whatever price the caller passes in.
 */
export function costPerServing(price: number, servings: number): number | null {
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(servings) || servings <= 0) {
    return null;
  }
  return roundToTwo(price / servings);
}

export function proteinPerDollar(
  price: number,
  proteinGramsPerServing: number,
  servings: number
): number | null {
  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isFinite(proteinGramsPerServing) ||
    proteinGramsPerServing <= 0 ||
    !Number.isFinite(servings) ||
    servings <= 0
  ) {
    return null;
  }
  const totalProtein = proteinGramsPerServing * servings;
  return roundToTwo(totalProtein / price);
}

export function costPerOzProtein(
  price: number,
  proteinGramsPerServing: number,
  servings: number
): number | null {
  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isFinite(proteinGramsPerServing) ||
    proteinGramsPerServing <= 0 ||
    !Number.isFinite(servings) ||
    servings <= 0
  ) {
    return null;
  }
  const totalProteinOz = (proteinGramsPerServing * servings) / GRAMS_PER_OZ;
  if (totalProteinOz <= 0) return null;
  return roundToTwo(price / totalProteinOz);
}

/**
 * Picks the single best-value product from a set, e.g. products sharing a category.
 * Ranking is nutrition-only (never price-derived): prefers highest protein concentration
 * (protein per gram of serving), falling back to lowest calories-per-gram-of-protein for
 * categories (electrolytes, creatine) where protein concentration isn't meaningful.
 */
export function getBestValueProduct(candidates: Product[], excludeId?: string): Product | null {
  const pool = (excludeId ? candidates.filter((p) => p.id !== excludeId) : candidates).filter(
    (p) => hasAvailableOffer(p)
  );

  const byProteinConcentration = pool
    .map((product) => ({ product, value: getProteinConcentration(product) }))
    .filter((entry): entry is { product: Product; value: number } => entry.value !== null);

  if (byProteinConcentration.length > 0) {
    return byProteinConcentration.reduce((best, entry) =>
      entry.value > best.value ? entry : best
    ).product;
  }

  const byCaloriesPerGramProtein = pool
    .map((product) => ({ product, value: getCaloriesPerGramProtein(product) }))
    .filter((entry): entry is { product: Product; value: number } => entry.value !== null);

  if (byCaloriesPerGramProtein.length === 0) return null;

  return byCaloriesPerGramProtein.reduce((best, entry) => (entry.value < best.value ? entry : best))
    .product;
}
