import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, brands] = await Promise.all([
    prisma.product.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.brand.findMany({ select: { slug: true, updatedAt: true } })
  ]);

  const staticRoutes = ["", "/catalog", "/brands", "/decants", "/aroma-selection", "/about", "/contacts", "/telegram"];

  return [
    ...staticRoutes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...products.map((product) => ({ url: `${site.url}/catalog/${product.slug}`, lastModified: product.updatedAt, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...brands.map((brand) => ({ url: `${site.url}/brands/${brand.slug}`, lastModified: brand.updatedAt, changeFrequency: "weekly" as const, priority: 0.7 }))
  ];
}
