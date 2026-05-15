import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Epic's Screen",
  description: "Learn more about Epic's Screen — a curated, professional wallpaper gallery.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <article className="container" style={{ padding: "60px 0", maxWidth: 800 }}>
      <h1 style={{ fontSize: 40, letterSpacing: "-0.02em" }}>About {siteConfig.name}</h1>
      <p style={{ color: "var(--text-dim)", lineHeight: 1.7, fontSize: 17 }}>
        {siteConfig.name} is a hand-curated gallery of high-quality wallpapers in HD and 4K resolutions.
        Every wallpaper is reviewed for quality, composition and visual impact before publishing —
        no AI-generated noise, no low-resolution uploads, just clean, premium imagery.
      </p>
      <h2 style={{ marginTop: 40 }}>What we offer</h2>
      <ul style={{ color: "var(--text-dim)", lineHeight: 1.9 }}>
        <li>Curated HD &amp; 4K wallpapers across multiple categories</li>
        <li>Free downloads with one click</li>
        <li>A Pinterest-style masonry browsing experience</li>
        <li>Likes, share and download tracking — discover what&apos;s trending</li>
      </ul>
    </article>
  );
}
