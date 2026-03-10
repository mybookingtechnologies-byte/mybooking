import type { MetadataRoute } from "next";

const routes = [
  "",
  "/services",
  "/industries",
  "/industries/restaurant",
  "/industries/hotel",
  "/industries/gym",
  "/industries/clinic",
  "/industries/cinema",
  "/industries/school",
  "/products",
  "/portfolio",
  "/pricing",
  "/about",
  "/contact",
  "/blog",
  "/admin/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}