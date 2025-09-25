import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://giuseppesolazzo.com"
      : "http://localhost:3000";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/eon`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly" },
    { url: `${base}/privacy`, changeFrequency: "monthly" },
  ];
}
