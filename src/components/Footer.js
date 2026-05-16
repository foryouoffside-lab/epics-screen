import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>
          © {year} {siteConfig.name} — Free HD & 4K Warrior Wallpapers for Phone & Desktop
        </p>
        <nav aria-label="Footer navigation" style={{ marginTop: 8 }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </nav>
        <p style={{ marginTop: 16 }}>
          <a
            href="https://pin.it/7dViRFmkL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Epic's Screen on Pinterest"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "linear-gradient(135deg, #e60023, #c5001a)",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.95-.18-2.4.04-3.43l1.27-5.43s-.32-.66-.32-1.64c0-1.53.89-2.67 2-2.67.94 0 1.4.7 1.4 1.55 0 .95-.6 2.36-.92 3.67-.26 1.1.55 2 1.64 2 1.96 0 3.47-2.07 3.47-5.06 0-2.65-1.9-4.5-4.62-4.5-3.15 0-5 2.36-5 4.8 0 .95.37 1.97.83 2.53.09.1.1.2.07.3l-.28 1.12c-.05.18-.15.22-.34.13-1.26-.58-2.05-2.42-2.05-3.9 0-3.17 2.3-6.08 6.64-6.08 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.25-5.2 6.25-1.02 0-1.98-.53-2.3-1.16l-.63 2.4c-.23.87-.84 1.96-1.25 2.63A12 12 0 0 0 12 24a12 12 0 0 0 0-24z"/>
            </svg>
            Follow on Pinterest
          </a>
        </p>
      </div>
    </footer>
  );
}