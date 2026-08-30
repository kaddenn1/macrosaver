/**
 * Applies a daily/every-other-day Amazon price scrape (CSV) to data/products.ts.
 *
 * Usage:
 *   node --experimental-strip-types scripts/apply-price-scrape.ts <path-to-csv> [--dry-run]
 *
 * Expected CSV columns (order doesn't matter, matched by header name):
 *   macrosaver_id, asin, amazon_displayed_price_usd, amazon_price_status, checked_at
 *   optional: amazon_list_price_usd (a genuine Amazon "was $X" strikethrough price)
 *
 * Rows are only applied when amazon_price_status === "amazon_page" and a price is
 * present — rows like price_not_exposed/fetch_error are left untouched rather than
 * guessed at. Edits data/products.ts as raw text (regex per ASIN line) so existing
 * formatting, comments, and field ordering elsewhere in the file are preserved.
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
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.length > 0);
  return lines.map((line) => {
    const fields: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (inQuotes) {
        if (c === '"') {
          if (line[j + 1] === '"') {
            cur += '"';
            j++;
          } else {
            inQuotes = false;
          }
        } else {
          cur += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        fields.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    fields.push(cur);
    return fields;
  });
}

const csvPath = resolve(csvArg);
const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows[0].map((h) => h.trim());
const col = (name: string) => header.indexOf(name);

const idxId = col("macrosaver_id");
const idxAsin = col("asin");
const idxPrice = col("amazon_displayed_price_usd");
const idxStatus = col("amazon_price_status");
const idxCheckedAt = col("checked_at");
const idxListPrice = col("amazon_list_price_usd"); // optional, -1 if absent

for (const [name, idx] of [
  ["macrosaver_id", idxId],
  ["asin", idxAsin],
  ["amazon_displayed_price_usd", idxPrice],
  ["amazon_price_status", idxStatus],
  ["checked_at", idxCheckedAt],
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
  const asin = r[idxAsin];
  const status = r[idxStatus];
  const priceRaw = r[idxPrice];
  const checkedAt = r[idxCheckedAt];
  const listPriceRaw = idxListPrice === -1 ? "" : r[idxListPrice];

  if (status !== "amazon_page" || !priceRaw) {
    skippedUnverified++;
    continue;
  }
  const price = Number(priceRaw);
  if (!Number.isFinite(price)) {
    skippedUnverified++;
    continue;
  }

  const asinNeedle = `asin: "${asin}"`;
  const idx = src.indexOf(asinNeedle);
  if (idx === -1) {
    notFound.push(`id=${id} asin=${asin} (not in catalog)`);
    continue;
  }
  const lineStart = src.lastIndexOf("\n", idx) + 1;
  const lineEnd = src.indexOf("\n", idx);
  const line = src.slice(lineStart, lineEnd);
  let newLine = line;

  const historyMatch = newLine.match(/priceHistory: \[(.*)\]/);
  if (!historyMatch) {
    // First-ever verified re-check for this offer: seed history from whatever price/date it had.
    const oldPriceMatch = newLine.match(/retailer: "Amazon", price: ([\d.]+)/);
    const oldDateMatch = newLine.match(/priceObservedAt: "(\d{4}-\d{2}-\d{2})"/);
    const seedPoint =
      oldPriceMatch && oldDateMatch
        ? `{ date: "${oldDateMatch[1]}", price: ${oldPriceMatch[1]} }, `
        : "";
    newLine = newLine.replace(
      /(retailer: "Amazon", price: )[\d.]+(.*?)(\s*\})\s*$/,
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
    newLine = newLine.replace(/(retailer: "Amazon", price: )[\d.]+/, `$1${price}`);
    newLine = newLine.replace(/priceObservedAt: "\d{4}-\d{2}-\d{2}"/, `priceObservedAt: "${checkedAt}"`);
  }

  if (idxListPrice !== -1 && listPriceRaw) {
    const listPrice = Number(listPriceRaw);
    if (Number.isFinite(listPrice) && listPrice > price) {
      if (/listPrice: [\d.]+/.test(newLine)) {
        newLine = newLine.replace(/listPrice: [\d.]+/, `listPrice: ${listPrice}`);
      } else {
        newLine = newLine.replace(/(url: amazonUrl\([^)]*\), asin: "[^"]*")/, `$1, listPrice: ${listPrice}`);
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
console.log(`Skipped (unverified/no price in scrape): ${skippedUnverified}`);
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
