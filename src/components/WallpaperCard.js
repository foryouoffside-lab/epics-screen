import Link from "next/link";
import Image from "next/image";

export default function WallpaperCard({ wallpaper, rank = null, priority = false }) {
  const { slug, title, thumbPath, width, height, blurDataURL, likes, downloads, views } = wallpaper;

  // Calculate aspect ratio for proper sizing
  const aspectW = width || 800;
  const aspectH = height || 600;

  return (
    <article className="card" itemScope itemType="https://schema.org/ImageObject">
      <Link href={`/wallpaper/${slug}`} aria-label={`View ${title}`}>
        {rank !== null && <span className="card__rank">#{rank}</span>}
        <div style={{ position: "relative", width: "100%", aspectRatio: `${aspectW}/${aspectH}` }}>
          <Image
            src={thumbPath}
            alt={title}
            fill
            sizes="(max-width: 420px) 100vw, (max-width: 680px) 50vw, (max-width: 980px) 33vw, (max-width: 1280px) 25vw, 20vw"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL || undefined}
            priority={priority}
            itemProp="thumbnailUrl"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="card__overlay">
          <h3 className="card__title" itemProp="name">{title}</h3>
          <div className="card__stats" aria-label="Wallpaper statistics">
            <span aria-label={`${likes || 0} likes`}>♥ {likes || 0}</span>
            <span aria-label={`${downloads || 0} downloads`}>⬇ {downloads || 0}</span>
            <span aria-label={`${views || 0} views`}>👁 {views || 0}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}