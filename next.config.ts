import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Retired pages (Eon / One sign-ups and their confirm step): send old links home.
  async redirects() {
    return ["/eon", "/eon/:path*", "/one", "/one/:path*", "/confirm"].map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
