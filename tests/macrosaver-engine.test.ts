import assert from "node:assert/strict";
import test from "node:test";
import type { Product } from "../data/types.ts";
import {
  extractFlavor,
  getBestOffer,
  getBestValueProduct,
  getCostPerOzProtein,
  getCostPerServing,
  getOfferFreshness,
  getOfferSale,
  getPriceConfidence,
  getPriceHistory,
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
import { getProductLine, PRODUCT_LINES } from "../lib/product-lines.ts";
import { PRODUCT_OVERVIEWS } from "../lib/product-overviews.ts";
import { products } from "../data/products.ts";

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
        priceObservedAt: "2026-06-11T12:00:00.000Z",
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

test("offer freshness classifies fresh, aging, stale, and unknown observations", () => {
  const asOf = new Date("2026-08-23T12:00:00.000Z");

  assert.equal(
    getOfferFreshness({ retailer: "Store", price: 20, url: "https://example.com" }, asOf),
    "unknown"
  );
  assert.equal(
    getOfferFreshness(
      { retailer: "Store", price: 20, url: "https://example.com", priceObservedAt: "2026-08-20" },
      asOf
    ),
    "fresh"
  );
  assert.equal(
    getOfferFreshness(
      { retailer: "Store", price: 20, url: "https://example.com", priceObservedAt: "2026-07-15" },
      asOf
    ),
    "aging"
  );
  assert.equal(
    getOfferFreshness(
      { retailer: "Store", price: 20, url: "https://example.com", priceObservedAt: "2026-05-01" },
      asOf
    ),
    "stale"
  );
  assert.equal(
    getOfferFreshness(
      {
        retailer: "Store",
        price: 20,
        url: "https://example.com",
        priceObservedAt: "2026-08-24T00:00:00.000Z",
      },
      asOf
    ),
    "unknown"
  );
});

test("price confidence excludes stale/unknown offers and reflects valid retailer count", () => {
  const asOf = new Date("2026-08-23T12:00:00.000Z");
  const freshOffer = {
    retailer: "Store A",
    price: 40,
    url: "https://example.com/a",
    priceObservedAt: "2026-08-20",
  };
  const secondFreshOffer = {
    retailer: "Store B",
    price: 30,
    url: "https://example.com/b",
    priceObservedAt: "2026-08-15",
  };
  const staleOffer = {
    retailer: "Store C",
    price: 10,
    url: "https://example.com/c",
    priceObservedAt: "2026-01-01",
  };
  const undatedOffer = { retailer: "Store D", price: 5, url: "https://example.com/d" };

  assert.deepEqual(getPriceConfidence({ ...product, offers: [freshOffer] }, asOf), {
    offer: freshOffer,
    freshness: "fresh",
    retailerCount: 1,
    status: "recorded",
  });

  assert.deepEqual(
    getPriceConfidence({ ...product, offers: [freshOffer, secondFreshOffer] }, asOf),
    {
      offer: secondFreshOffer,
      freshness: "fresh",
      retailerCount: 2,
      status: "lowest-recorded",
    }
  );

  assert.deepEqual(getPriceConfidence({ ...product, offers: [staleOffer, undatedOffer] }, asOf), {
    offer: null,
    freshness: "unknown",
    retailerCount: 0,
    status: "unavailable",
  });

  assert.deepEqual(
    getPriceConfidence({ ...product, offers: [freshOffer, staleOffer] }, asOf),
    {
      offer: freshOffer,
      freshness: "fresh",
      retailerCount: 1,
      status: "recorded",
    }
  );
});

test("best-value and ranked-product pickers skip stale/unknown-priced candidates", () => {
  const asOf = new Date("2026-08-23T12:00:00.000Z");
  const withUndatedOffer: Product = {
    ...product,
    id: "undated-offer-product",
    offers: [{ retailer: "Store", price: 1, url: "https://example.com/cheap" }],
  };
  const withFreshOffer: Product = {
    ...product,
    id: "fresh-offer-product",
    offers: [
      {
        retailer: "Store",
        price: 25,
        url: "https://example.com/fresh",
        priceObservedAt: "2026-08-20",
      },
    ],
  };

  assert.equal(getPriceConfidence(withUndatedOffer, asOf).status, "unavailable");
  assert.equal(
    getBestValueProduct([withUndatedOffer, withFreshOffer])?.id,
    "fresh-offer-product"
  );
});

test("offer sale is only reported when listPrice is a genuine discount", () => {
  assert.equal(
    getOfferSale({ retailer: "Store", price: 20, url: "https://example.com" }),
    null
  );
  assert.equal(
    getOfferSale({ retailer: "Store", price: 20, url: "https://example.com", listPrice: 20 }),
    null
  );
  assert.equal(
    getOfferSale({ retailer: "Store", price: 20, url: "https://example.com", listPrice: 15 }),
    null
  );
  assert.deepEqual(
    getOfferSale({ retailer: "Store", price: 21.03, url: "https://example.com", listPrice: 29.99 }),
    { price: 21.03, listPrice: 29.99, savings: 8.96, savingsPct: 29.88 }
  );
});

test("price history returns recorded observations oldest-first, or empty when untracked", () => {
  assert.deepEqual(
    getPriceHistory({ retailer: "Store", price: 20, url: "https://example.com" }),
    []
  );
  const history = [
    { date: "2026-08-20", price: 25 },
    { date: "2026-08-29", price: 21 },
  ];
  assert.deepEqual(
    getPriceHistory({ retailer: "Store", price: 21, url: "https://example.com", priceHistory: history }),
    history
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

test("getProductLine finds the line for any member id and returns undefined for ungrouped products", () => {
  const line = getProductLine("17");
  assert.ok(line);
  assert.equal(line?.id, "optimum-nutrition-gold-standard-whey");
  assert.equal(getProductLine("test-product"), undefined);
});

test("every product line's primary id is one of its own members", () => {
  for (const line of PRODUCT_LINES) {
    assert.ok(
      line.memberProductIds.includes(line.primaryProductId),
      `${line.id} primary "${line.primaryProductId}" is not a listed member`
    );
  }
});

test("every product line has 2+ distinct members that all exist in the catalog", () => {
  const productIds = new Set(products.map((p) => p.id));
  for (const line of PRODUCT_LINES) {
    assert.ok(line.memberProductIds.length >= 2, `${line.id} has fewer than 2 members`);
    assert.equal(
      new Set(line.memberProductIds).size,
      line.memberProductIds.length,
      `${line.id} lists a duplicate member id`
    );
    for (const id of line.memberProductIds) {
      assert.ok(productIds.has(id), `${line.id} references missing product id "${id}"`);
    }
  }
});

test("every product overview references a real, unique product id", () => {
  const productIds = new Set(products.map((p) => p.id));
  const seen = new Set<string>();
  for (const overview of PRODUCT_OVERVIEWS) {
    assert.ok(productIds.has(overview.productId), `overview references missing product id "${overview.productId}"`);
    assert.ok(!seen.has(overview.productId), `duplicate overview for product id "${overview.productId}"`);
    seen.add(overview.productId);
  }
});

test("no product belongs to more than one product line", () => {
  const seen = new Map<string, string>();
  for (const line of PRODUCT_LINES) {
    for (const id of line.memberProductIds) {
      const existing = seen.get(id);
      assert.equal(existing, undefined, `product ${id} is in both "${existing}" and "${line.id}"`);
      seen.set(id, line.id);
    }
  }
});
