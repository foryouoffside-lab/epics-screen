import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty" style={{ padding: "120px 20px" }}>
      <h2>404 — Page not found</h2>
      <p>That wallpaper or page doesn&apos;t exist.</p>
      <p><Link href="/" style={{ color: "var(--accent)" }}>← Back to home</Link></p>
    </div>
  );
}
