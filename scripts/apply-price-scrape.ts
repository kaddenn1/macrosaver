/**
 * Applies a full live price scrape (CSV) to data/products.ts.
 *
 * Usage:
 *   node --experimental-strip-types scripts/apply-price-scrape.ts <path-to-csv> [--dry-run]
 *
 * Expected CSV columns (order doesn't matter, matched by header name):
 *   product_id, retailer, catalog_price, one_time_price, checked_at, action, safe_to_apply
 *   optional: verified_list_price (a genuine "was $X" strikethrough price)
 *
 * A row is applied only when safe_to_apply === "true" (covers both APPLY and
 * DATE_ONLY actions from the scrape's own verification pass) and a price is
 * present. REVIEW rows (safe_to_apply=false) are left completely untouched —
 * the scrape itself already rejected them (formulaic percentage patterns,
 * variant/package mismatches, no trustworthy rendered price, etc).
 *
 * Matches offers by product_id (catalog `id`) rather than ASIN, since some
 * offers (e.g. Sports Research) have no ASIN. Assumes one offer per product.
 * Edits data/products.ts as raw text (regex per id block) so existing
 * formatting, comments, and field ordering elsewhere in the file are
 * preserved. Idempotent against re-running the same day's file.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const csvArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");

if (!csvArg) {
  console.error("Usage: node --experimental-strip-types scripts/apply-price-scrape.ts <path-to-csv> [--dry-run]");
  process.exit(1);
}

function parseCsv(text: string): string[][] {
  // Handles quoted fields with embedded commas and newlines (RFC4180-ish).
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  const s = text.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\r") {
      // skip
    } else if (c === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

const csvPath = resolve(csvArg);
const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows[0].map((h) => h.trim());
const col = (name: string) => header.indexOf(name);

const idxId = col("product_id");
const idxPrice = col("one_time_price");
const idxCheckedAt = col("checked_at");
const idxSafe = col("safe_to_apply");
const idxListPrice = col("verified_list_price"); // optional, -1 if absent

for (const [name, idx] of [
  ["product_id", idxId],
  ["one_time_price", idxPrice],
  ["checked_at", idxCheckedAt],
  ["safe_to_apply", idxSafe],
] as const) {
  if (idx === -1) {
    console.error(`CSV is missing required column: ${name}`);
    process.exit(1);
  }
}

const productsPath = resolve(import.meta.dirname, "../data/products.ts");
let src = readFileSync(productsPath, "utf8");

let applied = 0;
let historyInitialized = 0;
let skippedUnverified = 0;
let alreadyCurrent = 0;
const listPriceSet: string[] = [];
const notFound: string[] = [];

for (const r of rows.slice(1)) {
  const id = r[idxId];
  const safe = r[idxSafe];
  const priceRaw = r[idxPrice];
  const checkedAtRaw = r[idxCheckedAt];
  const listPriceRaw = idxListPrice === -1 ? "" : r[idxListPrice];

  if (safe !== "true" || !priceRaw) {
    skippedUnverified++;
    continue;
  }
  const price = Number(priceRaw);
  if (!Number.isFinite(price)) {
    skippedUnverified++;
    continue;
  }
  const checkedAt = checkedAtRaw.slice(0, 10); // ISO timestamp -> YYYY-MM-DD

  const idNeedle = `id: "${id}"`;
  const idIdx = src.indexOf(idNeedle);
  if (idIdx === -1) {
    notFound.push(`id=${id} (not in catalog)`);
    continue;
  }
  const nextIdIdx = src.indexOf('id: "', idIdx + idNeedle.length);
  const blockEnd = nextIdIdx === -1 ? src.length : nextIdIdx;
  const offerMatch = src.slice(idIdx, blockEnd).match(/^\s*\{ retailer: "[^"]+", price: [\d.]+.*\}\s*$/m);
  if (!offerMatch || offerMatch.index === undefined) {
    notFound.push(`id=${id} (no offer line found)`);
    continue;
  }
  const lineStart = idIdx + offerMatch.index;
  const lineEnd = lineStart + offerMatch[0].length;
  const line = offerMatch[0];
  let newLine = line;

  const historyMatch = newLine.match(/priceHistory: \[(.*)\]/);
  if (!historyMatch) {
    // First-ever verified re-check for this offer: seed history from whatever price/date it had.
    const oldPriceMatch = newLine.match(/retailer: "[^"]+", price: ([\d.]+)/);
    const oldDateMatch = newLine.match(/priceObservedAt: "(\d{4}-\d{2}-\d{2})"/);
    const seedPoint =
      oldPriceMatch && oldDateMatch
        ? `{ date: "${oldDateMatch[1]}", price: ${oldPriceMatch[1]} }, `
        : "";
    newLine = newLine.replace(
      /(retailer: "[^"]+", price: )[\d.]+(.*?)(\s*\})\s*$/,
      (_m, prefix, middle) => {
        let rebuilt = `${prefix}${price}${middle}`;
        rebuilt = rebuilt.replace(/priceObservedAt: "\d{4}-\d{2}-\d{2}"/, `priceObservedAt: "${checkedAt}"`);
        if (!/priceObservedAt:/.test(rebuilt)) rebuilt += `, priceObservedAt: "${checkedAt}"`;
        rebuilt += `, priceHistory: [${seedPoint}{ date: "${checkedAt}", price: ${price} }] }`;
        return rebuilt;
      }
    );
    historyInitialized++;
  } else {
    const points = historyMatch[1];
    const lastPointMatch = points.match(/\{ date: "(\d{4}-\d{2}-\d{2})", price: ([\d.]+) \}\s*$/);
    if (lastPointMatch && lastPointMatch[1] === checkedAt) {
      // Re-running the same day's scrape: update in place instead of duplicating.
      if (Number(lastPointMatch[2]) === price) {
        alreadyCurrent++;
        continue;
      }
      newLine = newLine.replace(
        /\{ date: "(\d{4}-\d{2}-\d{2})", price: [\d.]+ \}(\s*\])/,
        `{ date: "$1", price: ${price} }$2`
      );
    } else {
      newLine = newLine.replace(/priceHistory: \[(.*)\]/, `priceHistory: [${points}, { date: "${checkedAt}", price: ${price} }]`);
    }
    newLine = newLine.replace(/(retailer: "[^"]+", price: )[\d.]+/, `$1${price}`);
    newLine = newLine.replace(/priceObservedAt: "\d{4}-\d{2}-\d{2}"/, `priceObservedAt: "${checkedAt}"`);
  }

  if (idxListPrice !== -1 && listPriceRaw) {
    const listPrice = Number(listPriceRaw);
    if (Number.isFinite(listPrice) && listPrice > price) {
      if (/listPrice: [\d.]+/.test(newLine)) {
        newLine = newLine.replace(/listPrice: [\d.]+/, `listPrice: ${listPrice}`);
      } else {
        newLine = newLine.replace(/priceObservedAt: "\d{4}-\d{2}-\d{2}"/, `listPrice: ${listPrice}, priceObservedAt: "${checkedAt}"`);
      }
      listPriceSet.push(`id=${id}`);
    }
  }

  if (newLine !== line) {
    src = src.slice(0, lineStart) + newLine + src.slice(lineEnd);
    applied++;
  }
}

console.log(`Applied: ${applied}`);
console.log(`History arrays initialized for first-time verification: ${historyInitialized}`);
console.log(`Already current (same date+price already recorded): ${alreadyCurrent}`);
console.log(`Skipped (unverified/not safe_to_apply): ${skippedUnverified}`);
if (listPriceSet.length) console.log(`List price set/updated: ${listPriceSet.join(", ")}`);
if (notFound.length) {
  console.log(`Not found in catalog (${notFound.length}) — new product? Add it manually first:`);
  for (const nf of notFound) console.log(`  ${nf}`);
}

if (dryRun) {
  console.log("\n--dry-run: no files written.");
} else {
  writeFileSync(productsPath, src, "utf8");
  console.log(`\nWrote ${productsPath}`);
}
