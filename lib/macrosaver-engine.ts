import type { Product, RetailerOffer } from "@/data/types";

const GRAMS_PER_OZ = 28.3495;
const STRUCTURED_PRICE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

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
 * Price structured data is emitted only for a recent, explicitly dated observation.
 * Undated, invalid, future, and older snapshots remain visible on the page but are not
 * presented to crawlers as an active Offer.
 */
export function hasFreshPriceObservation(
  offer: RetailerOffer,
  asOf: Date = new Date()
): boolean {
  if (!offer.priceObservedAt) return false;

  const observedAt = Date.parse(offer.priceObservedAt);
  const asOfTime = asOf.getTime();

  if (!Number.isFinite(observedAt) || !Number.isFinite(asOfTime)) return false;
  if (observedAt > asOfTime) return false;

  return asOfTime - observedAt <= STRUCTURED_PRICE_MAX_AGE_MS;
}

function getAvailableOffers(product: Product): RetailerOffer[] {
  return product.offers.filter((offer) => offer.inStock !== false);
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

