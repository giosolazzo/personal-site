import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/SiteHeader"; // keep if you already added it
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 👇 add this block
const isProd = process.env.NODE_ENV === "production";
const site = isProd ? "https://giuseppesolazzo.com" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Giuseppe Solazzo", template: "%s · Giuseppe Solazzo" },
  description: "Landing to Midsummer, Eon, and Portfolio.",
  openGraph: {
    type: "website",
    url: site,
    title: "Giuseppe Solazzo",
    description: "Landing to Midsummer, Eon, and Portfolio.",
    siteName: "Giuseppe Solazzo",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@yourhandle", // optional
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        {children}
        {/* cookie-less web analytics + real-user performance */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
