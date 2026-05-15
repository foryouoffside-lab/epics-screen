import { getAllWallpapers } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const base = siteConfig.url;
  const wallpapers = await getAllWallpapers();

  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 }
  ];

  const wallpaperRoutes = wallpapers.map((w) => ({
    url: `${base}/wallpaper/${w.slug}`,
    lastModified: new Date(w.createdAt),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticRoutes, ...wallpaperRoutes];
}