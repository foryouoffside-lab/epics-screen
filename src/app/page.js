import Link from "next/link";
import Script from "next/script";
import WallpaperGrid from "@/components/WallpaperGrid";
import { getAllWallpapers } from "@/lib/db";
import { buildMetadata, imageGalleryJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Warrior Wallpapers HD & 4K — Free Phone & Desktop Backgrounds",
  description: "Download free warrior wallpapers in HD & 4K for phone and desktop. Epic's Screen curates battle, samurai, viking & spartan backgrounds. New wallpapers added weekly.",
  path: "/",
  keywords: ["warrior wallpapers", "warrior phone wallpaper", "warrior HD", "samurai wallpaper", "viking wallpaper", "spartan wallpaper"]
});

export const revalidate = 0;

export default async function HomePage() {
  const all = await getAllWallpapers();

  return (
    <>
      <Script
        id="ld-gallery"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd(all)) }}
      />

      <section className="hero" aria-labelledby="hero-h">
        <div className="container">
          <h1 id="hero-h">Warrior Wallpapers</h1>
          <p>
            Download free HD &amp; 4K warrior wallpapers for your phone and desktop.
            Curated collection of battle-ready backgrounds — samurai, viking, spartan &amp; more.
          </p>
        </div>
      </section>

      <section className="container" aria-labelledby="latest-h">
        <div className="section-h">
          <h2 id="latest-h">Latest Wallpapers</h2>
        </div>
        {all.length === 0 ? (
          <div className="empty">
            <h2>No wallpapers yet</h2>
            <p>
              Head over to <Link href="/admin" style={{ color: "var(--accent)" }}>the admin page</Link>{" "}
              to upload your first wallpaper.
            </p>
          </div>
        ) : (
          <WallpaperGrid wallpapers={all} />
        )}
      </section>
    </>
  );
}