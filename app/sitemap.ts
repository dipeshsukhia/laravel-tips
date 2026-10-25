import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content";

export const dynamic = "force-static";

const siteRoot = "https://dipeshsukhia.github.io/laravel-tips";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategories();

  return [
    { url: `${siteRoot}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteRoot}/all-tips/`, changeFrequency: "weekly", priority: 0.9 },
    ...categories.flatMap((category) => [
      {
        url: `${siteRoot}/${category.slug}/`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      ...category.tips.map((tip) => ({
        url: `${siteRoot}/${category.slug}/${tip.slug}/`,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ]),
  ];
}
