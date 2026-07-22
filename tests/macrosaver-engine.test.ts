import assert from "node:assert/strict";
import test from "node:test";
import type { Product } from "../data/types.ts";
import {
  extractFlavor,
  getBestOffer,
  getCostPerOzProtein,
  getCostPerServing,
  getProteinPerDollar,
  getSavingsVsHighestOffer,
  hasFreshPriceObservation,
  supportsServingMetrics,
} from "../lib/macrosaver-engine.ts";
import { serializeJsonLd } from "../lib/json-ld.ts";
import {
  applyCatalogQuery,
  getCatalogQueryString,
  parseCatalogQuery,
} from "../lib/catalog-query.ts";
import {
  getMetricHighlights,
  reconcileCompareIds,
  sanitizeCompareIds,
} from "../lib/compare.ts";

const product: Product = {
  id: "test-product",
  name: "Test Whey - Chocolate (2 lb)",
  brand: "Test Brand",
  category: "protein",
  servings: 20,
  nutrition: { proteinGrams: 25 },
  offers: [
    { retailer: "Store A", price: 40, url: "https://example.com/a" },
    { retailer: "Store B", price: 30, url: "https://example.com/b" },
  ],
};

test("value metrics use the cheapest available offer", () => {
  assert.equal(getBestOffer(product)?.retailer, "Store B");
  assert.equal(getCostPerServing(product), 1.5);
  assert.equal(getProteinPerDollar(product), 16.67);
  assert.equal(getCostPerOzProtein(product), 1.7);
  assert.equal(getSavingsVsHighestOffer(product), 10);
});

test("out-of-stock offers are excluded", () => {
  const withUnavailableLowPrice: Product = {
    ...product,
    offers: [
      { retailer: "Unavailable", price: 1, url: "https://example.com/oos", inStock: false },
      { retailer: "Available", price: 35, url: "https://example.com/in-stock" },
    ],
  };

  assert.equal(getBestOffer(withUnavailableLowPrice)?.retailer, "Available");
  assert.equal(getSavingsVsHighestOffer(withUnavailableLowPrice), null);
});

test("invalid denominators return null instead of misleading values", () => {
  assert.equal(getCostPerServing({ ...product, servings: 0 }), null);
  assert.equal(
    getProteinPerDollar({ ...product, nutrition: { proteinGrams: 0 } }),
    null
  );
});

test("non-consumables never receive serving or nutrition value metrics", () => {
  const equipment: Product = {
    ...product,
    id: "test-jump-rope",
    name: "Test Jump Rope",
    kind: "equipment",
    servings: 1,
    nutrition: { proteinGrams: 25 },
  };

  assert.equal(supportsServingMetrics(equipment), false);
  assert.equal(getCostPerServing(equipment), null);
  assert.equal(getProteinPerDollar(equipment), null);
  assert.equal(getCostPerOzProtein(equipment), null);
  assert.equal(supportsServingMetrics(product), true);
});

test("only recent, explicitly dated prices qualify for Offer structured data", () => {
  const asOf = new Date("2026-07-21T12:00:00.000Z");

  assert.equal(
    hasFreshPriceObservation(
      { retailer: "Store", price: 20, url: "https://example.com" },
      asOf
    ),
    false
  );
  assert.equal(
    hasFreshPriceObservation(
      {
        retailer: "Store",
        price: 20,
        url: "https://example.com",
        priceObservedAt: "2026-07-20T12:00:00.000Z",
      },
      asOf
    ),
    true
  );
  assert.equal(
    hasFreshPriceObservation(
      {
        retailer: "Store",
        price: 20,
        url: "https://example.com",
        priceObservedAt: "2026-07-01T12:00:00.000Z",
      },
      asOf
    ),
    false
  );
  assert.equal(
    hasFreshPriceObservation(
      {
        retailer: "Store",
        price: 20,
        url: "https://example.com",
        priceObservedAt: "2026-07-22T12:00:00.000Z",
      },
      asOf
    ),
    false
  );
});

test("flavor extraction ignores product-line hyphens and dosage variants", () => {
  assert.equal(extractFlavor("Legend Pre-Workout - Blue Raspberry (30 Servings)"), "Blue Raspberry");
  assert.equal(extractFlavor("Legend Pre-Workout, Blue Razz (30 Servings)"), "Blue Razz");
  assert.equal(extractFlavor("Magnesium Glycinate - 300mg (90 Capsules)"), null);
  assert.equal(extractFlavor("L-Theanine + Caffeine (60 Softgels)"), null);
});

test("JSON-LD serialization cannot break out of a script element", () => {
  const serialized = serializeJsonLd({ review: "</script><script>alert(1)</script>" });

  assert.equal(serialized.includes("</script>"), false);
  assert.match(serialized, /\\u003c\/script\\u003e/);
});

test("catalog queries ignore unsupported and malformed listing values", () => {
  const query = parseCatalogQuery(
    {
      q: "   ",
      protein: "999",
      maxPrice: "12oops",
      flavor: "Imaginary",
      sort: "protein-high",
      page: "2",
    },
    { maxPriceCeiling: 10, allowedFlavors: [], allowProteinSort: false }
  );

  assert.equal(query.hasListingIntent, false);
  assert.equal(query.sort, "price-low");
  assert.equal(query.page, 2);
  assert.equal(getCatalogQueryString(query), "page=2");
});

test("protein sorting is available only when the listing enables it", () => {
  const allowed = parseCatalogQuery(
    { sort: "protein-high" },
    { allowProteinSort: true }
  );
  const denied = parseCatalogQuery(
    { sort: "protein-high" },
    { allowProteinSort: false }
  );

  assert.equal(allowed.sort, "protein-high");
  assert.equal(allowed.hasListingIntent, true);
  assert.equal(denied.sort, "price-low");
  assert.deepEqual(applyCatalogQuery([product], denied), [product]);
});

test("compare IDs are validated, deduplicated, and capped", () => {
  assert.deepEqual(
    sanitizeCompareIds(["one", "bad id", "one", "two", "three", "four", "five", 6]),
    ["one", "two", "three", "four"]
  );
});

test("compare reconciliation preserves IDs selected after a catalog request began", () => {
  assert.deepEqual(
    reconcileCompareIds(
      ["still-valid", "deleted", "new-selection"],
      ["still-valid", "deleted"],
      ["still-valid"]
    ),
    ["still-valid", "new-selection"]
  );
});

test("metric highlights expose every tied lowest value", () => {
  const result = getMetricHighlights(
    [
      { id: "one", value: 1 },
      { id: "two", value: 1 },
      { id: "three", value: 2 },
      { id: "missing", value: null },
    ],
    "min"
  );

  assert.deepEqual([...result.ids], ["one", "two"]);
  assert.equal(result.isTie, true);
});
