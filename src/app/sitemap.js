import { getAllWallpapers } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const base = siteConfig.url;
  const wallpapers = await getAllWallpapers();

  const staticRoutes = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      images: wallpapers.slice(0, 10).map((w) => ({
        loc: `${base}${w.imagePath}`,
        title: w.title,
        caption: w.description || `${w.title} - Free HD wallpaper download`,
      })),
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const wallpaperRoutes = wallpapers.map((w) => ({
    url: `${base}/wallpaper/${w.slug}`,
    lastModified: new Date(w.createdAt),
    changeFrequency: "weekly",
    priority: 0.9,
    images: [
      {
        loc: `${base}${w.imagePath}`,
        title: w.title,
        caption: w.description || `Download ${w.title} - HD warrior wallpaper for phone & desktop`,
      },
    ],
    videos: [],
  }));

  return [...staticRoutes, ...wallpaperRoutes];
}