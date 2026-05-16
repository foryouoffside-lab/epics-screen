import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWallpaperBySlug, getAllWallpapers, incrementStat } from "@/lib/db";
import { buildMetadata, wallpaperJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import WallpaperActions from "@/components/WallpaperActions";
import WallpaperGrid from "@/components/WallpaperGrid";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const w = await getWallpaperBySlug(slug);
  if (!w) return buildMetadata({ title: "Wallpaper not found" });
  const tags = w.tags || [];
  return buildMetadata({
    title: `${w.title} — Free HD & 4K Wallpaper Download`,
    description: w.description || `Download ${w.title} in HD & 4K for phone and desktop. Free warrior wallpaper from Epic's Screen.`,
    path: `/wallpaper/${w.slug}`,
    image: absoluteUrl(w.imagePath),
    type: "article",
    keywords: [...tags, "warrior wallpaper", "HD wallpaper", "4K wallpaper", "phone wallpaper", "desktop wallpaper", "free download"]
  });
}

export const revalidate = 0;

export default async function WallpaperPage({ params }) {
  const { slug } = await params;
  const wallpaper = await getWallpaperBySlug(slug);
  if (!wallpaper) notFound();

  incrementStat(wallpaper.id, "views", 1).catch(() => {});

  // Get all wallpapers except current one for "More Warrior Wallpapers"
  const allWallpapers = await getAllWallpapers();
  const moreWallpapers = allWallpapers.filter(w => w.id !== wallpaper.id);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: wallpaper.title, path: `/wallpaper/${wallpaper.slug}` }
  ];

  return (
    <>
      <Script
        id="ld-wallpaper"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wallpaperJsonLd(wallpaper)) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <nav aria-label="Breadcrumb" className="container" style={{ paddingTop: 20, fontSize: 13, color: "var(--text-mute)" }}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap" }} itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbs.map((b, i) => (
            <li key={b.path} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {i > 0 && <span style={{ marginRight: 8 }} aria-hidden="true">/</span>}
              {i === breadcrumbs.length - 1 ? (
                <span itemProp="name">{b.name}</span>
              ) : (
                <Link href={b.path} itemProp="item" style={{ color: "var(--text-dim)" }}>
                  <span itemProp="name">{b.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={i + 1} />
            </li>
          ))}
        </ol>
      </nav>

      <article className="container detail" itemScope itemType="https://schema.org/ImageObject">
        <div className="detail__image">
          <Image
            src={wallpaper.imagePath}
            alt={wallpaper.title}
            title={wallpaper.title}
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
              {wallpaper.tags.map((t) => (
                <span key={t} className="tag" itemProp="keywords">#{t}</span>
              ))}
            </div>
          )}
          <WallpaperActions wallpaper={wallpaper} />
        </aside>
      </article>

      {moreWallpapers.length > 0 && (
        <section className="container" aria-labelledby="related-h">
          <div className="section-h">
            <h2 id="related-h">More Warrior Wallpapers</h2>
          </div>
          <WallpaperGrid wallpapers={moreWallpapers} />
        </section>
      )}
    </>
  );
}