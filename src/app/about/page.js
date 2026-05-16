import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About — Free HD & 4K Warrior Wallpapers",
  description: "Epic's Screen curates the best free HD & 4K warrior wallpapers for phone and desktop. Samurai, viking, spartan & battle backgrounds. New wallpapers added weekly.",
  path: "/about",
  keywords: ["about warrior wallpapers", "free phone wallpapers", "HD wallpaper gallery", "warrior backgrounds"]
});

export default function AboutPage() {
  return (
    <article className="container" style={{ padding: "60px 0", maxWidth: 800 }}>
      <h1 style={{ fontSize: 40, letterSpacing: "-0.02em" }}>About {siteConfig.name}</h1>
      
      <p style={{ color: "var(--text-dim)", lineHeight: 1.8, fontSize: 17 }}>
        {siteConfig.name} is a hand-curated gallery of <strong style={{ color: "var(--text)" }}>free HD &amp; 4K warrior wallpapers</strong> for 
        phone and desktop. We focus on battle-ready, epic imagery — from samurai and vikings to 
        spartan warriors and dark fantasy art. Every wallpaper is reviewed for quality, composition 
        and visual impact before publishing.
      </p>

      <h2 style={{ marginTop: 40 }}>Why Warrior Wallpapers?</h2>
      <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
        Warrior art represents strength, discipline, and resilience — qualities that inspire. 
        Whether you&apos;re looking for a bold phone background or an epic desktop wallpaper, 
        our collection brings the spirit of warriors to your screen.
      </p>

      <h2 style={{ marginTop: 40 }}>What We Offer</h2>
      <ul style={{ color: "var(--text-dim)", lineHeight: 2, fontSize: 16 }}>
        <li><strong style={{ color: "var(--text)" }}>Curated HD &amp; 4K warrior wallpapers</strong> — no AI noise, only quality</li>
        <li><strong style={{ color: "var(--text)" }}>Free downloads</strong> — one click, no sign-up required</li>
        <li><strong style={{ color: "var(--text)" }}>Phone &amp; desktop optimized</strong> — perfect fit for any screen</li>
        <li><strong style={{ color: "var(--text)" }}>Pinterest-style browsing</strong> — discover, like, and share</li>
        <li><strong style={{ color: "var(--text)" }}>New wallpapers weekly</strong> — fresh warrior art added regularly</li>
      </ul>

      <h2 style={{ marginTop: 40 }}>Follow Us</h2>
      <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
        Stay updated with new wallpaper drops —{" "}
        <a 
          href="https://pin.it/7dViRFmkL" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", fontWeight: 600 }}
        >
          follow us on Pinterest
        </a>.
      </p>
    </article>
  );
}