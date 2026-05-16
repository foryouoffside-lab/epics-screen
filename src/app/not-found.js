import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "404 — Wallpaper Not Found",
  description: "The warrior wallpaper or page you're looking for doesn't exist. Browse our collection of free HD & 4K warrior wallpapers for phone and desktop.",
  path: "/404",
});

export default function NotFound() {
  return (
    <div className="empty" style={{ padding: "120px 20px" }} role="main" aria-label="Page not found">
      <h1>404 — Wallpaper Not Found</h1>
      <p style={{ maxWidth: 500, margin: "16px auto", color: "var(--text-dim)", lineHeight: 1.6 }}>
        This warrior has fallen in battle. The wallpaper or page you&apos;re looking for doesn&apos;t exist.
        <br />
        But our army of HD &amp; 4K wallpapers awaits you.
      </p>
      <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#fff", background: "var(--accent-grad)", padding: "12px 24px", borderRadius: 10, fontWeight: 600 }}>
          ← Browse Wallpapers
        </Link>
        <Link href="/about" style={{ color: "var(--text)", background: "var(--bg-elev)", padding: "12px 24px", borderRadius: 10, fontWeight: 500, border: "1px solid var(--border)" }}>
          About Us
        </Link>
      </div>
    </div>
  );
}