// The Associates tag is not secret — it's visible in every rendered link
// regardless — so it's fine to expose via NEXT_PUBLIC_.
const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "macrosaver-20";

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

/**
 * Plain, untagged Amazon search link — no affiliate tag, no stored price/ASIN, no
 * commission. Used for "Check Price" on products where Amazon offers were pulled
 * (2026-09-25, Associates compliance): this just points a shopper at Amazon's own
 * search, it doesn't require Associates status and doesn't cache any Amazon content.
 */
export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}
