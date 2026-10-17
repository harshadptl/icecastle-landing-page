import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { gpus } from "@/lib/gpus";
import { HOME_UPDATED, SITE_URL, isoDate } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: HOME_UPDATED },
    { url: `${SITE_URL}/faq`, lastModified: HOME_UPDATED },
    ...gpus.map((g) => ({ url: `${SITE_URL}/gpus/${g.slug}`, lastModified: "2026-10-17" })),
    { url: `${SITE_URL}/blog`, lastModified: isoDate(articles[0].date) },
    ...articles.map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: isoDate(a.date) })),
  ];
}
