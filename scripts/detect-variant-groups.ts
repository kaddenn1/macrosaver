import { products } from "../data/products.ts";
import type { Product } from "../data/types.ts";

// One-off review tool: proposes candidate flavor/size variant groupings for
// lib/product-lines.ts. Output is meant to be eyeballed by a human before
// being hand-copied into that config — grouping errors would visibly break
// the on-page variant selector, so this never runs as live production logic.

function baseNameKey(name: string): string {
  const withoutSize = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const dashParts = withoutSize.split(/\s[-–—]\s/);
  const commaParts = withoutSize.split(/,\s*/);
  const base =
    dashParts.length > 1
      ? dashParts.slice(0, -1).join(" - ")
      : commaParts.length > 1
        ? commaParts.slice(0, -1).join(", ")
        : withoutSize;
  return base.trim().toLowerCase();
}

type Group = { brand: string; category: string; baseName: string; members: Product[] };

const groups = new Map<string, Group>();

for (const product of products as Product[]) {
  const base = baseNameKey(product.name);
  const key = `${product.brand.toLowerCase()}|${product.category}|${base}`;
  if (!groups.has(key)) {
    groups.set(key, { brand: product.brand, category: product.category, baseName: base, members: [] });
  }
  groups.get(key)!.members.push(product);
}

const multiMember = [...groups.values()]
  .filter((g) => g.members.length >= 2)
  .sort((a, b) => b.members.length - a.members.length);

console.log(`Detected ${multiMember.length} candidate product lines (2+ members):\n`);

for (const group of multiMember) {
  const sortedMembers = [...group.members].sort((a, b) => Number(a.id) - Number(b.id));
  console.log(`[${sortedMembers.length}] ${group.brand} — "${group.baseName}" (${group.category})`);
  for (const m of sortedMembers) {
    console.log(`    id ${m.id}\t${m.name}`);
  }
  console.log();
}

const singletons = [...groups.values()].filter((g) => g.members.length === 1).length;
console.log(`${singletons} products have no detected sibling (single-variant, no group needed).`);
