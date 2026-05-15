import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand__mark" aria-hidden="true">E</span>
          <span>Epic&apos;s Screen</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/admin" className="cta">Upload</Link>
        </nav>
      </div>
    </header>
  );
}