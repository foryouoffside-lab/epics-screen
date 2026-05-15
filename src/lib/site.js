// Central site configuration used across SEO, metadata, sitemap and structured data.
export const siteConfig = {
  name: "Epic's Screen",
  shortName: "Epic's Screen",
  description:
    "Epic's Screen is a curated, Pinterest-style gallery of high-quality HD and 4K wallpapers. Browse, like, share and download stunning wallpapers for desktop and mobile — free.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-default.png",
  locale: "en_US",
  twitter: "@epicsscreen",
  keywords: [
    "wallpapers",
    "HD wallpapers",
    "4K wallpapers",
    "free wallpapers",
    "desktop wallpapers",
    "mobile wallpapers",
    "wallpaper gallery",
    "Epic's Screen",
    "download wallpapers",
    "aesthetic wallpapers",
    "minimal wallpapers",
    "nature wallpapers",
    "abstract wallpapers"
  ]
};

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = "/" + path;
  return `${siteConfig.url}${path}`;
}