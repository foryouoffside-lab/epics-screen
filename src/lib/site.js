export const siteConfig = {
  name: "Epic's Screen",
  shortName: "Epic's Screen",
  description:
    "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-default.png",
  locale: "en_US",
  twitter: "@epicsscreen",
  keywords: [
    "warrior wallpapers",
    "warrior phone wallpaper",
    "warrior HD wallpaper",
    "warrior 4K wallpaper",
    "warrior background",
    "samurai wallpaper",
    "viking wallpaper",
    "spartan wallpaper",
    "battle wallpaper",
    "warrior art",
    "free phone wallpapers",
    "mobile wallpapers",
    "desktop wallpapers",
    "wallpaper download",
    "aesthetic wallpapers",
    "wallpaper gallery",
    "Epic's Screen",
    "HD wallpapers",
    "4K wallpapers",
  ]
};

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = "/" + path;
  return `${siteConfig.url}${path}`;
}