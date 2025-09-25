import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host =
    process.env.NODE_ENV === "production"
      ? "https://giuseppesolazzo.com"
      : "http://localhost:3000";

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${host}/sitemap.xml`,
  };
}
