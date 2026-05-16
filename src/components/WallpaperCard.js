import Link from "next/link";
import Image from "next/image";

export default function WallpaperCard({ wallpaper, rank = null, priority = false }) {
  const { slug, title, thumbPath, width, height, blurDataURL, likes, downloads, views } = wallpaper;

  const aspectW = width || 800;
  const aspectH = height || 600;

  return (
    <article className="card" itemScope itemType="https://schema.org/ImageObject">
      <Link href={`/wallpaper/${slug}`} aria-label={`Download ${title} — Free HD Warrior Wallpaper`} title={title}>
        {rank !== null && <span className="card__rank" aria-label={`Rank ${rank}`}>#{rank}</span>}
        <div style={{ position: "relative", width: "100%", aspectRatio: `${aspectW}/${aspectH}` }}>
          <Image
            src={thumbPath}
            alt={`${title} — Free HD & 4K warrior wallpaper for phone and desktop`}
            title={title}
            fill
            sizes="(max-width: 420px) 100vw, (max-width: 680px) 50vw, (max-width: 980px) 33vw, (max-width: 1280px) 25vw, 20vw"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL || undefined}
            priority={priority}
            itemProp="thumbnailUrl"
            style={{ objectFit: "cover" }}
          />
        </div>
        <meta itemProp="name" content={title} />
        <meta itemProp="contentUrl" content={thumbPath} />
        <div className="card__overlay">
          <h3 className="card__title" itemProp="name">{title}</h3>
          <div className="card__stats" aria-label={`Stats: ${likes || 0} likes, ${downloads || 0} downloads, ${views || 0} views`}>
            <span aria-label={`${likes || 0} likes`}>♥ {likes || 0}</span>
            <span aria-label={`${downloads || 0} downloads`}>⬇ {downloads || 0}</span>
            <span aria-label={`${views || 0} views`}>👁 {views || 0}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}