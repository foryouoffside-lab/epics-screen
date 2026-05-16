import WallpaperCard from "./WallpaperCard";

export default function WallpaperGrid({ wallpapers = [], showRank = false }) {
  if (!wallpapers || wallpapers.length === 0) return null;

  return (
    <section className="masonry" aria-label="HD & 4K Warrior Wallpaper Gallery">
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