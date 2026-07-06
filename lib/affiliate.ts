// The Associates tag is not secret — it's visible in every rendered link
// regardless — so it's fine to expose via NEXT_PUBLIC_.
const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "macrosaver-20";

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}
