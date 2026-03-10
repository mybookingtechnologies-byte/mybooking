import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { GrowthWidgets } from "@/components/sections/growth-widgets";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "MyBooking Technologies Private Limited",
    template: "%s | MyBooking Technologies",
  },
  description: "Smart Software & Digital Solutions for Modern Businesses",
  openGraph: {
    title: "MyBooking Technologies",
    description: "Smart Software & Digital Solutions",
    url: "/",
    siteName: "MyBooking Technologies",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBooking Technologies",
    description: "Smart Software & Digital Solutions for Modern Businesses",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${space.variable} font-sans`}>
        <GoogleAnalytics />
        <PageViewTracker />
        <Header />
        <main>{children}</main>
        <GrowthWidgets />
        <Footer />
      </body>
    </html>
  );
}
