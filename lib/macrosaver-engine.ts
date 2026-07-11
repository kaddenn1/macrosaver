import type { Product, RetailerOffer } from "@/data/types";

const GRAMS_PER_OZ = 28.3495;

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

// Product names follow "Brand/Line - Flavor (size)" or "Brand/Line, Flavor (size)".
// Pulls the flavor out of either pattern; returns null for single-variant products
// (e.g. "Casein Protein") that have no flavor segment at all.
export function extractFlavor(name: string): string | null {
  const match = name.match(/(?:-|,)\s*([^()]+?)\s*(?:\([^)]*\))?$/);
  return match ? match[1].trim() : null;
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
  const bestOffer = getBestOffer(product);

  if (!bestOffer || product.servings <= 0) {
    return null;
  }

  return roundToTwo(bestOffer.price / product.servings);
}

export function getProteinPerDollar(product: Product): number | null {
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

