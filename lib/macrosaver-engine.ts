import type { PricePoint, Product, RetailerOffer } from "@/data/types";

const GRAMS_PER_OZ = 28.3495;
// Prices are verified manually (no automated retailer feed), so these windows have to match a
// realistic re-check cadence rather than "how fresh would be ideal." 7 days made the entire
// catalog fall out of Product-snippet eligibility between manual passes; 30 days keeps stamped
// offers valid for a monthly check without asserting anything we haven't actually looked at.
// "Aging" gives one missed monthly cycle of grace before a price counts as stale.
const FRESH_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const STALE_MAX_AGE_MS = 60 * 24 * 60 * 60 * 1000;

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

/**
 * Price structured data is emitted only for a recent, explicitly dated observation.
 * Undated, invalid, future, and older snapshots remain visible on the page but are not
 * presented to crawlers as an active Offer.
 */
/** Most recent dated price observation across a product's offers, or null if none are dated. */
export function getLatestPriceObservation(product: Product): Date | null {
  const observedDates = product.offers
    .map((offer) => (offer.priceObservedAt ? Date.parse(offer.priceObservedAt) : NaN))
    .filter((time) => Number.isFinite(time));

  if (observedDates.length === 0) return null;

  return new Date(Math.max(...observedDates));
}

export type PriceFreshness = "fresh" | "aging" | "stale" | "unknown";

/**
 * Classifies a single offer's price-observation age. "Unknown" covers missing,
 * unparseable, and future-dated timestamps alike — none of those can be trusted
 * enough to call the price current, so they're never treated as better than stale.
 */
export function getOfferFreshness(
  offer: RetailerOffer,
  asOf: Date = new Date()
): PriceFreshness {
  if (!offer.priceObservedAt) return "unknown";

  const observedAt = Date.parse(offer.priceObservedAt);
  const asOfTime = asOf.getTime();

  if (!Number.isFinite(observedAt) || !Number.isFinite(asOfTime)) return "unknown";
  if (observedAt > asOfTime) return "unknown";

  const ageMs = asOfTime - observedAt;
  if (ageMs <= FRESH_MAX_AGE_MS) return "fresh";
  if (ageMs <= STALE_MAX_AGE_MS) return "aging";
  return "stale";
}

export function hasFreshPriceObservation(
  offer: RetailerOffer,
  asOf: Date = new Date()
): boolean {
  return getOfferFreshness(offer, asOf) === "fresh";
}

export type OfferSale = {
  price: number;
  listPrice: number;
  savings: number;
  savingsPct: number;
};

/** Sale details when `offer.listPrice` is a genuine discount off the current price, else null. */
export function getOfferSale(offer: RetailerOffer): OfferSale | null {
  if (offer.listPrice === undefined || offer.listPrice <= offer.price) return null;

  const savings = offer.listPrice - offer.price;

  return {
    price: offer.price,
    listPrice: offer.listPrice,
    savings: roundToTwo(savings),
    savingsPct: roundToTwo((savings / offer.listPrice) * 100),
  };
}

/** Chronological price observations for an offer, oldest first. Empty when nothing has been recorded yet. */
export function getPriceHistory(offer: RetailerOffer): PricePoint[] {
  return offer.priceHistory ?? [];
}

function getAvailableOffers(product: Product): RetailerOffer[] {
  return product.offers.filter((offer) => offer.inStock !== false);
}

export type PriceConfidenceStatus = "lowest-recorded" | "recorded" | "unavailable";

export type PriceConfidence = {
  /** The offer backing the headline price claim, or null when nothing is eligible. */
  offer: RetailerOffer | null;
  freshness: PriceFreshness;
  /** Count of in-stock offers with a usable (fresh or aging) timestamp for this product. */
  retailerCount: number;
  status: PriceConfidenceStatus;
};

/**
 * The single source of truth for "can we call this price current, and how many
 * retailers back it up." Stale and unknown offers are never eligible to be called
 * recorded/lowest — they can still be shown elsewhere on the page, just not as a
 * confidence claim MacroSaver hasn't earned.
 */
export function getPriceConfidence(
  product: Product,
  asOf: Date = new Date()
): PriceConfidence {
  const eligibleOffers = getAvailableOffers(product)
    .map((offer) => ({ offer, freshness: getOfferFreshness(offer, asOf) }))
    .filter((entry) => entry.freshness === "fresh" || entry.freshness === "aging");

  if (eligibleOffers.length === 0) {
    return { offer: null, freshness: "unknown", retailerCount: 0, status: "unavailable" };
  }

  const best = eligibleOffers.reduce((lowest, entry) =>
    entry.offer.price < lowest.offer.price ? entry : lowest
  );

  return {
    offer: best.offer,
    freshness: best.freshness,
    retailerCount: eligibleOffers.length,
    status: eligibleOffers.length > 1 ? "lowest-recorded" : "recorded",
  };
}

export function getBestOffer(product: Product): RetailerOffer | null {
  const availableOffers = getAvailableOffers(product);

  if (availableOffers.length === 0) {
    return null;
  }

  return availableOffers.reduce((bestOffer, offer) =>
    offer.price < bestOffer.price ? offer : bestOffer
  );
}

export function getCostPerServing(product: Product): number | null {
  if (!supportsServingMetrics(product)) return null;

  const bestOffer = getBestOffer(product);

  if (!bestOffer || product.servings <= 0) {
    return null;
  }

  return roundToTwo(bestOffer.price / product.servings);
}

export function getProteinPerDollar(product: Product): number | null {
  if (!supportsServingMetrics(product)) return null;

  const bestOffer = getBestOffer(product);

  if (!bestOffer || bestOffer.price <= 0 || product.nutrition.proteinGrams <= 0) {
    return null;
  }

  const totalProtein = product.nutrition.proteinGrams * product.servings;

  return roundToTwo(totalProtein / bestOffer.price);
}

// This is the metric you specifically wanted: what you actually pay per
// ounce of protein you get, regardless of tub size or serving count tricks.
export function getCostPerOzProtein(product: Product): number | null {
  if (!supportsServingMetrics(product)) return null;

  const bestOffer = getBestOffer(product);

  if (!bestOffer || bestOffer.price <= 0 || product.nutrition.proteinGrams <= 0) {
    return null;
  }

  const totalProteinGrams = product.nutrition.proteinGrams * product.servings;
  const totalProteinOz = totalProteinGrams / GRAMS_PER_OZ;

  if (totalProteinOz <= 0) {
    return null;
  }

  return roundToTwo(bestOffer.price / totalProteinOz);
}

export function getSavingsVsHighestOffer(product: Product): number | null {
  const bestOffer = getBestOffer(product);
  const availableOffers = getAvailableOffers(product);

  if (!bestOffer || availableOffers.length < 2) {
    return null;
  }

  const highestOffer = availableOffers.reduce((highest, offer) =>
    offer.price > highest.price ? offer : highest
  );

  return roundToTwo(highestOffer.price - bestOffer.price);
}

/**
 * Picks the single best-value product from a set, e.g. products sharing a category.
 * Prefers highest protein-per-dollar; falls back to lowest cost-per-serving for
 * categories (electrolytes, creatine) where protein isn't the relevant metric.
 */
export function getBestValueProduct(
  candidates: Product[],
  excludeId?: string
): Product | null {
  const pool = (excludeId ? candidates.filter((p) => p.id !== excludeId) : candidates).filter(
    (p) => getPriceConfidence(p).status !== "unavailable"
  );

  const byProteinPerDollar = pool
    .map((product) => ({ product, value: getProteinPerDollar(product) }))
    .filter((entry): entry is { product: Product; value: number } => entry.value !== null);

  if (byProteinPerDollar.length > 0) {
    return byProteinPerDollar.reduce((best, entry) => (entry.value > best.value ? entry : best))
      .product;
  }

  const byCostPerServing = pool
    .map((product) => ({ product, value: getCostPerServing(product) }))
    .filter((entry): entry is { product: Product; value: number } => entry.value !== null);

  if (byCostPerServing.length === 0) return null;

  return byCostPerServing.reduce((best, entry) => (entry.value < best.value ? entry : best))
    .product;
}

