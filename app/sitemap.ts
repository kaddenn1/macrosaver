import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { CATEGORY_SLUGS } from "@/lib/categories";
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

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
