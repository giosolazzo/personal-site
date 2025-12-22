import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://giuseppesolazzo.com"
      : "http://localhost:3000"
  ),
  title: { default: "Giuseppe Solazzo", template: "%s · Giuseppe Solazzo" },
  description: "Landing to Midsummer, Eon, and Portfolio.",
  openGraph: {
    type: "website",
    url: "https://giuseppesolazzo.com",
    title: "Giuseppe Solazzo",
    description: "Landing to Midsummer, Eon, and Portfolio.",
    siteName: "Giuseppe Solazzo",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-zinc-100 min-h-svh flex flex-col`}
      >
        <SiteHeader />

        {/* main content fills remaining space */}
        <div className="flex-1 flex flex-col">{children}</div>

        <SiteFooter />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
