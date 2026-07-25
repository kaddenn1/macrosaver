import { products } from "../data/products.ts";
import { getBestOffer, hasFreshPriceObservation, supportsServingMetrics } from "../lib/macrosaver-engine.ts";
import type { Product } from "../data/types.ts";

// Implements the "identify thin, duplicate, and incomplete product pages" step
// of the SEO recovery plan's Week 1 checklist. Flags weak-page signals per
// product rather than asserting quality judgments the label data can't support.

type Signal = "no-image" | "no-dated-price" | "no-offer" | "nutrition-unverified";

function getSignals(product: Product): Signal[] {
  const signals: Signal[] = [];

  if (!product.image) signals.push("no-image");
  if (!getBestOffer(product)) signals.push("no-offer");
  if (!product.offers.some((o) => hasFreshPriceObservation(o))) signals.push("no-dated-price");
  if (product.nutritionNote && supportsServingMetrics(product)) signals.push("nutrition-unverified");

  return signals;
}

const rows = (products as Product[]).map((product) => ({
  product,
  signals: getSignals(product),
}));

const bySignalCount = [...rows].sort((a, b) => b.signals.length - a.signals.length);

const signalTotals = new Map<Signal, number>();
for (const row of rows) {
  for (const signal of row.signals) {
    signalTotals.set(signal, (signalTotals.get(signal) ?? 0) + 1);
  }
}

console.log(`Index-quality audit: ${products.length} products.\n`);

console.log("Weak-page signal totals:");
for (const [signal, count] of signalTotals) {
  console.log(`  ${signal}: ${count}`);
}

const duplicateKey = (p: Product) => `${p.brand.toLowerCase()}|${p.name.toLowerCase()}`;
const seen = new Map<string, string>();
const exactDuplicates: Array<[string, string]> = [];
for (const product of products as Product[]) {
  const key = duplicateKey(product);
  const existingId = seen.get(key);
  if (existingId) exactDuplicates.push([existingId, product.id]);
  seen.set(key, product.id);
}
console.log(`\nExact brand+name duplicates: ${exactDuplicates.length}`);
for (const [a, b] of exactDuplicates) {
  console.log(`  product ${a} / product ${b}`);
}

const worst = bySignalCount.filter((r) => r.signals.length >= 2).slice(0, 25);
console.log(`\nWeakest ${worst.length} pages (2+ signals) — improve, consolidate, or noindex candidates:`);
for (const row of worst) {
  console.log(`  [${row.signals.length}] product ${row.product.id} — ${row.product.brand} ${row.product.name} (${row.signals.join(", ")})`);
}

const strongest = rows.filter((r) => r.signals.length === 0);
console.log(`\n${strongest.length} products currently have zero weak-page signals (flagship candidates).`);
