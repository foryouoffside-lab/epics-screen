import WallpaperCard from "./WallpaperCard";

export default function WallpaperGrid({ wallpapers = [], showRank = false }) {
  return (
    <section className="masonry" aria-label="Wallpaper gallery">
      {wallpapers.map((w, i) => (
        <WallpaperCard
          key={w.id}
          wallpaper={w}
          rank={showRank ? i + 1 : null}
          priority={i < 6}
        />
      ))}
    </section>
  );
}
