import assert from "node:assert/strict";
import test from "node:test";
import type { Product } from "../data/types.ts";
import {
  costPerOzProtein,
  costPerServing,
  extractFlavor,
  getBestValueProduct,
  getCaloriesPerGramProtein,
  getProteinConcentration,
  hasAvailableOffer,
  proteinPerDollar,
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
  nutrition: { proteinGrams: 25, calories: 120, servingSize: "1 scoop (30g)" },
  offers: [
    { retailer: "Store A", url: "https://example.com/a" },
    { retailer: "Store B", url: "https://example.com/b" },
  ],
};

test("costPerServing computes a normal case and rejects invalid inputs", () => {
  assert.equal(costPerServing(30, 20), 1.5);
  assert.equal(costPerServing(0, 20), null);
  assert.equal(costPerServing(-5, 20), null);
  assert.equal(costPerServing(30, 0), null);
});

test("proteinPerDollar computes a normal case and rejects invalid inputs", () => {
  assert.equal(proteinPerDollar(30, 25, 20), 16.67);
  assert.equal(proteinPerDollar(0, 25, 20), null);
  assert.equal(proteinPerDollar(-10, 25, 20), null);
  assert.equal(proteinPerDollar(30, 25, 0), null);
});

test("costPerOzProtein computes a normal case and rejects invalid inputs", () => {
  assert.equal(costPerOzProtein(30, 25, 20), 1.7);
  assert.equal(costPerOzProtein(0, 25, 20), null);
  assert.equal(costPerOzProtein(-1, 25, 20), null);
  assert.equal(costPerOzProtein(30, 25, 0), null);
});

test("getProteinConcentration reads grams of protein per gram of serving weight", () => {
  assert.equal(getProteinConcentration(product), 0.83);
  assert.equal(
    getProteinConcentration({ ...product, nutrition: { proteinGrams: 25 } }),
    null
  );
  assert.equal(
    getProteinConcentration({ ...product, nutrition: { ...product.nutrition, proteinGrams: 0 } }),
    null
  );
});

test("getCaloriesPerGramProtein divides calories by protein grams, or null when unavailable", () => {
  assert.equal(getCaloriesPerGramProtein(product), 4.8);
  assert.equal(
    getCaloriesPerGramProtein({ ...product, nutrition: { ...product.nutrition, calories: undefined } }),
    null
  );
  assert.equal(
    getCaloriesPerGramProtein({ ...product, nutrition: { ...product.nutrition, proteinGrams: 0 } }),
    null
  );
});

test("hasAvailableOffer reflects whether any offer is in stock", () => {
  assert.equal(hasAvailableOffer(product), true);
  assert.equal(
    hasAvailableOffer({
      ...product,
      offers: [{ retailer: "Store A", url: "https://example.com/a", inStock: false }],
    }),
    false
  );
  assert.equal(hasAvailableOffer({ ...product, offers: [] }), false);
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
  assert.equal(supportsServingMetrics(product), true);
});

test("getBestValueProduct ranks by protein concentration, not price", () => {
  const higherProteinConcentration: Product = {
    ...product,
    id: "higher-protein-concentration",
    nutrition: { proteinGrams: 25, servingSize: "1 scoop (30g)" },
  };
  const lowerProteinConcentration: Product = {
    ...product,
    id: "lower-protein-concentration",
    nutrition: { proteinGrams: 10, servingSize: "1 scoop (30g)" },
  };

  assert.equal(
    getBestValueProduct([lowerProteinConcentration, higherProteinConcentration])?.id,
    "higher-protein-concentration"
  );
});

test("getBestValueProduct excludes products with no available offer", () => {
  const outOfStock: Product = {
    ...product,
    id: "out-of-stock-product",
    nutrition: { proteinGrams: 40, servingSize: "1 scoop (30g)" },
    offers: [{ retailer: "Store A", url: "https://example.com/a", inStock: false }],
  };
  const inStock: Product = {
    ...product,
    id: "in-stock-product",
    nutrition: { proteinGrams: 10, servingSize: "1 scoop (30g)" },
  };

  assert.equal(getBestValueProduct([outOfStock, inStock])?.id, "in-stock-product");
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
      flavor: "Imaginary",
      page: "2",
    },
    { allowedFlavors: [], allowProteinFilters: true }
  );

  assert.equal(query.hasListingIntent, false);
  assert.equal(query.sort, "protein-high");
  assert.equal(query.page, 2);
  assert.equal(getCatalogQueryString(query), "page=2");
});

test("protein filtering is available only when the listing enables it", () => {
  const allowed = parseCatalogQuery(
    { protein: "25" },
    { allowProteinFilters: true }
  );
  const denied = parseCatalogQuery(
    { protein: "25" },
    { allowProteinFilters: false }
  );

  assert.equal(allowed.protein, 25);
  assert.equal(allowed.hasListingIntent, true);
  assert.equal(denied.protein, undefined);
  assert.equal(denied.hasListingIntent, false);
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
