import { products } from "@/data/products";
import type { Product } from "@/data/types";

export type Brand = {
  slug: string;
  name: string;
  intro: string;
};

export const BRANDS: Brand[] = [
  {
    slug: "sports-research",
    name: "Sports Research",
    intro: "A broad-catalog wellness brand covering everything from coconut oil and collagen to omega-3s and daily vitamins.",
  },
  {
    slug: "ghost",
    name: "Ghost",
    intro: "A lifestyle sports nutrition brand known for bold flavors and pop-culture collaborations across pre-workout, whey, and greens.",
  },
  {
    slug: "bariatricpal",
    name: "BariatricPal",
    intro: "Vitamins and protein supplements formulated specifically for life after bariatric surgery.",
  },
  {
    slug: "built-bar",
    name: "Built Bar",
    intro: "Thin, chocolate-coated protein bars built for a low-calorie, high-protein snack.",
  },
  {
    slug: "optimum-nutrition",
    name: "Optimum Nutrition",
    intro: "One of the most established names in sports nutrition, best known for Gold Standard Whey.",
  },
  {
    slug: "nutricost",
    name: "Nutricost",
    intro: "A value-focused brand with a wide catalog of no-frills supplement basics at low per-serving prices.",
  },
  {
    slug: "liquid-iv",
    name: "Liquid I.V.",
    intro: "Single-serve flavored drink mixes containing electrolytes, with formulas that vary in sugar and sodium content.",
  },
  {
    slug: "protein2o",
    name: "Protein2o",
    intro: "Protein-infused flavored water for people who want protein without a shake.",
  },
  {
    slug: "bariatric-fusion",
    name: "Bariatric Fusion",
    intro: "A brand focused on vitamins and protein products marketed to people after bariatric surgery.",
  },
  {
    slug: "spylt",
    name: "Spylt",
    intro: "Protein-packed flavored milk drinks aimed at a younger, social-first audience.",
  },
  {
    slug: "premier-protein",
    name: "Premier Protein",
    intro: "Ready-to-drink protein shakes built for grab-and-go convenience.",
  },
  {
    slug: "bari-life",
    name: "Bari Life",
    intro: "Chewable and capsule vitamin products marketed to bariatric surgery patients.",
  },
  {
    slug: "prosupps",
    name: "ProSupps",
    intro: "Performance-focused pre-workout and protein for serious training days.",
  },
  {
    slug: "dymatize",
    name: "Dymatize",
    intro: "A long-running protein brand best known for its fast-absorbing ISO100 whey isolate.",
  },
  {
    slug: "ascent",
    name: "Ascent",
    intro: "Clean-label whey and plant protein with short, simple ingredient lists.",
  },
  {
    slug: "vital-proteins",
    name: "Vital Proteins",
    intro: "Collagen peptides and related supplements for skin, joint, and daily wellness routines.",
  },
  {
    slug: "benefiber",
    name: "Benefiber",
    intro: "A widely available daily fiber supplement that dissolves clear in drinks and food.",
  },
  {
    slug: "bariatric-advantage",
    name: "Bariatric Advantage",
    intro: "A vitamin and protein brand focused on the bariatric-surgery market.",
  },
  {
    slug: "pin-up-girl",
    name: "Pin Up Girl",
    intro: "Everyday vitamins and minerals formulated for women's wellness.",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getBrandProducts(brandName: string): Product[] {
  return (products as Product[]).filter(
    (p) => p.brand.toLowerCase() === brandName.toLowerCase()
  );
}

export function getBrandProductCount(brandName: string): number {
  return getBrandProducts(brandName).length;
}
