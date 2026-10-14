import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { HOME_UPDATED, SITE_URL, isoDate } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: HOME_UPDATED },
    { url: `${SITE_URL}/blog`, lastModified: isoDate(articles[0].date) },
    ...articles.map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: isoDate(a.date) })),
  ];
}
