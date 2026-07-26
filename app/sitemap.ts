import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { GUIDES } from "@/lib/guides";
import { BRANDS } from "@/lib/brands";
import { RECIPES } from "@/lib/recipes";
import { BEST_VALUE_ARTICLES } from "@/lib/best-value";
import { BRAND_COMPARISON_ARTICLES } from "@/lib/brand-comparison";
import { getProductLine } from "@/lib/product-lines";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/best`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/recipes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/brands`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((brand) => ({
    url: `${SITE_URL}/brands/${brand.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const recipeRoutes: MetadataRoute.Sitemap = RECIPES.map((recipe) => ({
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Flavor/size variants of the same line only submit their primary variant's
  // URL — the rest canonicalize to it (see lib/product-lines.ts) and don't
  // need a separate sitemap entry telling Google to treat them as distinct pages.
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => {
      const line = getProductLine(product.id);
      return !line || line.primaryProductId === product.id;
    })
    .map((product) => ({
      url: `${SITE_URL}/product/${product.id}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.6,
    }));

  const bestValueRoutes: MetadataRoute.Sitemap = BEST_VALUE_ARTICLES.map((article) => ({
    url: `${SITE_URL}/best/${article.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const brandComparisonRoutes: MetadataRoute.Sitemap = BRAND_COMPARISON_ARTICLES.map((article) => ({
    url: `${SITE_URL}/best/${article.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...bestValueRoutes,
    ...brandComparisonRoutes,
    ...brandRoutes,
    ...recipeRoutes,
    ...productRoutes,
  ];
}
