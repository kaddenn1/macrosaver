import type { Product } from "../data/types.ts";
import { extractFlavor, getProteinConcentration } from "./macrosaver-engine.ts";

export const PROTEIN_THRESHOLDS = [20, 25, 30] as const;
export const CATALOG_PAGE_SIZE = 24;

export type CatalogSearchParams = Record<string, string | string[] | undefined>;
export type CatalogSort = "protein-high";

export type CatalogQuery = {
  q?: string;
  protein?: (typeof PROTEIN_THRESHOLDS)[number];
  flavor?: string;
  type?: "clear";
  sort: CatalogSort;
  page: number;
  /** True only when a valid filter, search, or non-default sort was requested. */
  hasListingIntent: boolean;
};

type ParseCatalogQueryOptions = {
  allowSearch?: boolean;
  allowProteinFilters?: boolean;
  allowedFlavors?: readonly string[];
};

function getSingleValue(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function normalizeCatalogSort(): CatalogSort {
  return "protein-high";
}

export function parseCatalogQuery(
  raw: CatalogSearchParams | undefined,
  options: ParseCatalogQueryOptions = {}
): CatalogQuery {
  const query: CatalogQuery = {
    sort: "protein-high",
    page: 1,
    hasListingIntent: false,
  };

  if (options.allowSearch !== false) {
    const search = getSingleValue(raw?.q)?.trim();
    if (search && search.length <= 80) query.q = search;
  }

  if (options.allowProteinFilters) {
    const protein = Number(getSingleValue(raw?.protein));
    if (PROTEIN_THRESHOLDS.includes(protein as (typeof PROTEIN_THRESHOLDS)[number])) {
      query.protein = protein as (typeof PROTEIN_THRESHOLDS)[number];
    }

    if (getSingleValue(raw?.type) === "clear") query.type = "clear";
  }

  const flavor = getSingleValue(raw?.flavor);
  if (flavor && options.allowedFlavors?.includes(flavor)) query.flavor = flavor;

  const pageValue = getSingleValue(raw?.page);
  if (pageValue && /^[1-9]\d{0,3}$/.test(pageValue)) query.page = Number(pageValue);

  query.hasListingIntent = Boolean(
    query.q || query.protein !== undefined || query.flavor || query.type
  );

  return query;
}

export function applyCatalogQuery(items: readonly Product[], query: CatalogQuery): Product[] {
  let matches = [...items];

  if (query.protein !== undefined) {
    matches = matches.filter((product) => product.nutrition.proteinGrams >= query.protein!);
  }

  if (query.flavor) {
    matches = matches.filter((product) => extractFlavor(product.name) === query.flavor);
  }

  if (query.type === "clear") {
    matches = matches.filter((product) => product.name.toLowerCase().includes("clear"));
  }

  if (query.q) {
    const search = query.q.toLowerCase();
    matches = matches.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search)
    );
  }

  matches.sort((a, b) => {
    const proteinDifference =
      (getProteinConcentration(b) ?? 0) - (getProteinConcentration(a) ?? 0);
    return proteinDifference || a.name.localeCompare(b.name);
  });

  return matches;
}

export function getCatalogQueryString(query: CatalogQuery, page = query.page): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.protein !== undefined) params.set("protein", String(query.protein));
  if (query.flavor) params.set("flavor", query.flavor);
  if (query.type) params.set("type", query.type);
  if (page > 1) params.set("page", String(page));
  return params.toString();
}
