import test from "node:test";
import assert from "node:assert/strict";
import { QUICK_PICKS } from "../lib/quick-picks.ts";
import { products } from "../data/products.ts";
import { readFileSync } from "node:fs";

test("every quick pick references a real product with an offer", () => {
  for (const [slug, picks] of Object.entries(QUICK_PICKS)) {
    for (const pick of picks) {
      const product = products.find((p) => p.id === pick.productId);
      assert.ok(product, `${slug}: product ${pick.productId} not found`);
      assert.ok(product.offers.length > 0, `${slug}: product ${pick.productId} has no offer`);
    }
  }
});

test("quick picks only exist for real /best slugs and never mention price claims", () => {
  // best-value.ts uses the "@/" alias, which plain node cannot import, so match slugs in source.
  const source =
    readFileSync("lib/best-value.ts", "utf8") + readFileSync("lib/brand-comparison.ts", "utf8");
  const slugs = new Set([...source.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
  for (const [slug, picks] of Object.entries(QUICK_PICKS)) {
    assert.ok(slugs.has(slug), `unknown slug ${slug}`);
    for (const pick of picks) {
      const text = `${pick.bestFor} ${pick.standsOut} ${pick.tradeOff}`;
      assert.doesNotMatch(text, /\$|cheap|deal|sale|discount|lowest price|price drop/i);
    }
  }
});
