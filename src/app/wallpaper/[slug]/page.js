import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWallpaperBySlug, getRelatedWallpapers, incrementStat } from "@/lib/db";
import { buildMetadata, wallpaperJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import WallpaperActions from "@/components/WallpaperActions";
import WallpaperGrid from "@/components/WallpaperGrid";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const w = await getWallpaperBySlug(slug);
  if (!w) return buildMetadata({ title: "Wallpaper not found" });
  return buildMetadata({
    title: w.title,
    description: w.description || `Download "${w.title}" in HD & 4K. Free wallpaper on Epic's Screen.`,
    path: `/wallpaper/${w.slug}`,
    image: absoluteUrl(w.imagePath),
    type: "article",
    keywords: w.tags || []
  });
}

export const revalidate = 0;

export default async function WallpaperPage({ params }) {
  const { slug } = await params;
  const wallpaper = await getWallpaperBySlug(slug);
  if (!wallpaper) notFound();

  incrementStat(wallpaper.id, "views", 1).catch(() => {});

  const related = await getRelatedWallpapers(wallpaper, 10);

  return (
    <>
      <Script
        id="ld-wallpaper"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wallpaperJsonLd(wallpaper)) }}
      />

      <div className="container" style={{ paddingTop: 20 }}>
        <Link href="/" style={{ color: "var(--accent)", fontSize: 14 }}>
          ← Back to wallpapers
        </Link>
      </div>

      <article className="container detail" itemScope itemType="https://schema.org/ImageObject">
        <div className="detail__image">
          <Image
            src={wallpaper.imagePath}
            alt={wallpaper.title}
            width={wallpaper.width || 1920}
            height={wallpaper.height || 1080}
            placeholder={wallpaper.blurDataURL ? "blur" : "empty"}
            blurDataURL={wallpaper.blurDataURL || undefined}
            priority
            sizes="(max-width: 980px) 100vw, 70vw"
            itemProp="contentUrl"
          />
        </div>

        <aside className="detail__side">
          <h1 itemProp="name">{wallpaper.title}</h1>
          {wallpaper.description && (
            <p className="detail__meta" itemProp="description">{wallpaper.description}</p>
          )}
          <p className="detail__meta">
            {wallpaper.width} × {wallpaper.height} •{" "}
            {(wallpaper.fileSize / 1024 / 1024).toFixed(2)} MB
          </p>
          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <div className="detail__tags" aria-label="Tags">
              {wallpaper.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
            </div>
          )}
          <WallpaperActions wallpaper={wallpaper} />
        </aside>
      </article>

      {related.length > 0 && (
        <section className="container" aria-labelledby="related-h">
          <div className="section-h">
            <h2 id="related-h">More like this</h2>
          </div>
          <WallpaperGrid wallpapers={related} />
        </section>
      )}
    </>
  );
}