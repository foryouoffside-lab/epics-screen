// Centralized SEO helpers: build Next.js Metadata objects and JSON-LD
// structured data so every page consistently ranks well in search engines.

import { siteConfig, absoluteUrl } from "./site";

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  keywords = []
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const desc = description || siteConfig.description;
  const url = absoluteUrl(path);
  const ogImage = image || absoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    keywords: [...siteConfig.keywords, ...keywords].join(", "),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      site: siteConfig.twitter,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" }
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png")
  };
}

export function imageGalleryJsonLd(wallpapers) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: wallpapers.slice(0, 24).map((w) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(w.imagePath),
      thumbnailUrl: absoluteUrl(w.thumbPath),
      name: w.title,
      description: w.description
    }))
  };
}

export function wallpaperJsonLd(w) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: w.title,
    description: w.description,
    contentUrl: absoluteUrl(w.imagePath),
    thumbnailUrl: absoluteUrl(w.thumbPath),
    uploadDate: new Date(w.createdAt).toISOString(),
    width: w.width,
    height: w.height,
    encodingFormat: w.mimeType,
    keywords: (w.tags || []).join(", "),
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: w.likes || 0
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/DownloadAction",
        userInteractionCount: w.downloads || 0
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/ShareAction",
        userInteractionCount: w.shares || 0
      }
    ]
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path)
    }))
  };
}
