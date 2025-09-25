import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host =
    process.env.NODE_ENV === "production"
      ? "https://giuseppesolazzo.com"
      : "http://localhost:3000";

  return [
    { url: `${host}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${host}/eon`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${host}/portfolio`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${host}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
