/**
 * Applies a full live price scrape (CSV) to data/products.ts.
 *
 * Usage:
 *   node --experimental-strip-types scripts/apply-price-scrape.ts <path-to-csv> [--dry-run]
 *
 * Expected CSV columns (order doesn't matter, matched by header name):
 *   product_id, retailer, catalog_price, one_time_price, checked_at, action, safe_to_apply
 *   optional: verified_list_price (a genuine "was $X" strikethrough price)
 *   optional: subscribe_and_save_price (kept only while lower than the applied price)
 *
 * A row is applied — price, priceObservedAt, and verificationState: "verified" — only when
 * safe_to_apply === "true" (covers both APPLY and DATE_ONLY actions from the scrape's own
 * verification pass) and a price is present. REVIEW rows (safe_to_apply=false) still get a
 * lastCheckedAt + verificationState: "checked_stale" stamp — the link WAS looked at, that's
 * real and worth recording — but price/priceObservedAt are left untouched, so a rejected
 * check can never silently masquerade as a verified one.
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

/**
 * checked_at comes through as either an ISO timestamp or, when the source spreadsheet's date
 * column got exported without its date formatting, a raw Excel/Sheets serial day-number (days
 * since 1899-12-30, fractional part = time of day). Detect and convert the latter rather than
 * blindly slicing the string, which would otherwise write garbage dates into the catalog.
 */
function toDateStamp(raw: string): string {
  if (/^\d+(\.\d+)?$/.test(raw)) {
    const serial = Number(raw);
    const ms = Math.round((serial - 25569) * 86400 * 1000);
    return new Date(ms).toISOString().slice(0, 10);
  }
  return raw.slice(0, 10);
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
const idxSnsPrice = col("subscribe_and_save_price"); // optional, -1 if absent

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

/**
 * Replaces `field: "..."` in an offer line if present, else inserts it right after
 * `anchorField: "..."`. Falls back to inserting before the closing brace if the anchor
 * itself isn't present (e.g. a pre-migration offer with no priceObservedAt yet).
 */
function upsertStringField(line: string, field: string, value: string, anchorField: string): string {
  const existing = new RegExp(`${field}: "[^"]*"`);
  if (existing.test(line)) {
    return line.replace(existing, `${field}: "${value}"`);
  }
  const anchor = new RegExp(`(${anchorField}: "[^"]*")`);
  if (anchor.test(line)) {
    return line.replace(anchor, `$1, ${field}: "${value}"`);
  }
  return line.replace(/\s*\}\s*$/, `, ${field}: "${value}" }`);
}

const productsPath = resolve(import.meta.dirname, "../data/products.ts");
let src = readFileSync(productsPath, "utf8");

/**
 * Stamps a rejected (safe_to_apply=false) row's offer with lastCheckedAt and
 * verificationState: "checked_stale" — the link was genuinely looked at, so that much is
 * worth recording — without touching price, priceObservedAt, or priceHistory. Never
 * downgrades an offer this same file already applied as verified.
 */
function stampCheckedStale(id: string, checkedAt: string): boolean {
  const idNeedle = `id: "${id}"`;
  const idIdx = src.indexOf(idNeedle);
  if (idIdx === -1) return false;

  const nextIdIdx = src.indexOf('id: "', idIdx + idNeedle.length);
  const blockEnd = nextIdIdx === -1 ? src.length : nextIdIdx;
  const offerMatch = src.slice(idIdx, blockEnd).match(/^\s*\{ retailer: "[^"]+", price: [\d.]+.*\}\s*$/m);
  if (!offerMatch || offerMatch.index === undefined) return false;

  const lineStart = idIdx + offerMatch.index;
  const lineEnd = lineStart + offerMatch[0].length;
  const line = offerMatch[0];

  if (/verificationState: "verified"/.test(line) && line.includes(`priceObservedAt: "${checkedAt}"`)) {
    return false;
  }

  let newLine = upsertStringField(line, "lastCheckedAt", checkedAt, "url");
  newLine = upsertStringField(newLine, "verificationState", "checked_stale", "lastCheckedAt");

  if (newLine === line) return false;
  src = src.slice(0, lineStart) + newLine + src.slice(lineEnd);
  return true;
}

let applied = 0;
let historyInitialized = 0;
let skippedUnverified = 0;
let markedCheckedStale = 0;
let alreadyCurrent = 0;
const listPriceSet: string[] = [];
const snsPriceSet: string[] = [];
const notFound: string[] = [];

for (const r of rows.slice(1)) {
  const id = r[idxId];
  const safe = r[idxSafe];
  const priceRaw = r[idxPrice];
  const checkedAtRaw = r[idxCheckedAt];
  const listPriceRaw = idxListPrice === -1 ? "" : r[idxListPrice];
  const snsPriceRaw = idxSnsPrice === -1 ? "" : r[idxSnsPrice];

  if (safe !== "true" || !priceRaw) {
    skippedUnverified++;
    if (checkedAtRaw && stampCheckedStale(id, toDateStamp(checkedAtRaw))) {
      markedCheckedStale++;
    }
    continue;
  }
  const price = Number(priceRaw);
  if (!Number.isFinite(price)) {
    skippedUnverified++;
    continue;
  }
  const checkedAt = toDateStamp(checkedAtRaw);

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
        // Price/date already recorded — still fall through to listPrice/subscribeAndSavePrice
        // backfill below rather than skipping the row outright.
        alreadyCurrent++;
      } else {
        newLine = newLine.replace(
          /\{ date: "(\d{4}-\d{2}-\d{2})", price: [\d.]+ \}(\s*\])/,
          `{ date: "$1", price: ${price} }$2`
        );
      }
    } else {
      newLine = newLine.replace(/priceHistory: \[(.*)\]/, `priceHistory: [${points}, { date: "${checkedAt}", price: ${price} }]`);
    }
    newLine = newLine.replace(/(retailer: "[^"]+", price: )[\d.]+/, `$1${price}`);
    newLine = newLine.replace(/priceObservedAt: "\d{4}-\d{2}-\d{2}"/, `priceObservedAt: "${checkedAt}"`);
  }

  newLine = upsertStringField(newLine, "lastCheckedAt", checkedAt, "priceObservedAt");
  newLine = upsertStringField(newLine, "verificationState", "verified", "lastCheckedAt");

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

  if (idxSnsPrice !== -1 && snsPriceRaw) {
    const snsPrice = Number(snsPriceRaw);
    if (Number.isFinite(snsPrice) && snsPrice < price) {
      if (/subscribeAndSavePrice: [\d.]+/.test(newLine)) {
        newLine = newLine.replace(/subscribeAndSavePrice: [\d.]+/, `subscribeAndSavePrice: ${snsPrice}`);
      } else {
        newLine = newLine.replace(
          /priceObservedAt: "\d{4}-\d{2}-\d{2}"/,
          `subscribeAndSavePrice: ${snsPrice}, priceObservedAt: "${checkedAt}"`
        );
      }
      snsPriceSet.push(`id=${id}`);
    } else if (Number.isFinite(snsPrice) && /subscribeAndSavePrice: [\d.]+/.test(newLine)) {
      // No longer a discount (S&S price rose to meet or exceed the new price) — drop the stale field.
      newLine = newLine.replace(/,?\s*subscribeAndSavePrice: [\d.]+/, "");
    }
  }

  if (newLine !== line) {
    src = src.slice(0, lineStart) + newLine + src.slice(lineEnd);
    applied++;
  }
}

console.log(`Applied (verified): ${applied}`);
console.log(`History arrays initialized for first-time verification: ${historyInitialized}`);
console.log(`Already current (same date+price already recorded): ${alreadyCurrent}`);
console.log(`Skipped (unverified/not safe_to_apply): ${skippedUnverified}`);
console.log(`  ...of which stamped lastCheckedAt/checked_stale: ${markedCheckedStale}`);
if (listPriceSet.length) console.log(`List price set/updated: ${listPriceSet.join(", ")}`);
if (snsPriceSet.length) console.log(`Subscribe & Save price set/updated: ${snsPriceSet.join(", ")}`);
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
