import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container site-header__inner">
        <Link 
          href="/" 
          className="brand" 
          aria-label={`${siteConfig.name} — Free HD & 4K Warrior Wallpapers`}
          title="Epic's Screen — Free Warrior Wallpapers HD & 4K"
        >
          <span className="brand__mark" aria-hidden="true">E</span>
          <span>Epic&apos;s Screen</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/" title="Free HD & 4K Warrior Wallpapers">Home</Link>
          <Link href="/about" title="About Epic's Screen">About</Link>
          <Link href="/admin" className="cta" rel="nofollow">Upload</Link>
        </nav>
      </div>
    </header>
  );
}