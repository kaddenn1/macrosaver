import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { GUIDES } from "@/lib/guides";
import { BRANDS } from "@/lib/brands";
import { RECIPES } from "@/lib/recipes";
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
      url: `${SITE_URL}/compare`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/protein`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.7,
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

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...brandRoutes,
    ...recipeRoutes,
    ...productRoutes,
  ];
}
