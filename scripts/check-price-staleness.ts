/**
 * Reports every offer whose priceObservedAt isn't today, so a batch of
 * catalog edits (photos, corrections, affiliate-link fixes, etc.) can't
 * quietly leave some products' price check-ins behind again.
 *
 * This is a workflow/hygiene check, separate from getOfferFreshness's
 * 30/60-day fresh/aging/stale thresholds in lib/macrosaver-engine.ts,
 * which govern what the site is allowed to *display* as a current price.
 * An offer can pass here as "not today" while still being perfectly
 * "fresh" by that display logic — this check is about catching drift
 * in day-to-day catalog maintenance, not about site correctness.
 *
 * Usage:
 *   npm run check:price-staleness
 *   node --experimental-strip-types scripts/check-price-staleness.ts [--days N]
 *
 * Exits 1 if anything is behind today (or the --days threshold, if given).
 */
import { products } from "../data/products.ts";
import type { Product } from "../data/types.ts";

const daysArgIdx = process.argv.indexOf("--days");
const thresholdDays = daysArgIdx !== -1 ? Number(process.argv[daysArgIdx + 1]) : 0;

const today = new Date();
today.setHours(0, 0, 0, 0);

type StaleRow = { id: string; name: string; observedAt: string | undefined; ageDays: number | "unknown" };

const rows: StaleRow[] = [];

for (const product of products as Product[]) {
  for (const offer of product.offers) {
    const observedAt = (offer as { priceObservedAt?: string }).priceObservedAt;
    if (!observedAt) {
      rows.push({ id: product.id, name: product.name, observedAt, ageDays: "unknown" });
      continue;
    }
    const observedMs = Date.parse(observedAt);
    if (!Number.isFinite(observedMs)) {
      rows.push({ id: product.id, name: product.name, observedAt, ageDays: "unknown" });
      continue;
    }
    const ageDays = Math.round((today.getTime() - observedMs) / (24 * 60 * 60 * 1000));
    if (ageDays > thresholdDays) {
      rows.push({ id: product.id, name: product.name, observedAt, ageDays });
    }
  }
}

if (rows.length === 0) {
  console.log(
    thresholdDays === 0
      ? "All offers are stamped with today's date. Nothing stale."
      : `All offers are within ${thresholdDays} day(s) old.`
  );
  process.exit(0);
}

rows.sort((a, b) => (b.ageDays === "unknown" ? 1 : b.ageDays) - (a.ageDays === "unknown" ? 1 : a.ageDays));

console.log(
  `${rows.length} offer(s) ${thresholdDays === 0 ? "not dated today" : `older than ${thresholdDays} day(s)`}:\n`
);
for (const row of rows) {
  const age = row.ageDays === "unknown" ? "unknown date" : `${row.ageDays}d old`;
  console.log(`  id ${row.id.padEnd(5)} ${age.padEnd(12)} (${row.observedAt ?? "none"})  ${row.name}`);
}

process.exitCode = 1;
