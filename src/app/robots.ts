import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://giuseppesolazzo.com"
      : "http://localhost:3000";
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml` };
}
