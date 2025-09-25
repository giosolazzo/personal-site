import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://giuseppesolazzo.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: now, priority: 0.6 },
    { url: `${base}/eon`, lastModified: now, priority: 0.6 },
  ];
}
