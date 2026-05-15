# Epic's Screen

A professional, Pinterest-style wallpaper gallery built with **Next.js 14 (App Router)**, written entirely in JavaScript (`.js`, no `.jsx`).

## Features

- Pinterest-style masonry wallpaper grid
- Admin upload page (`/admin`) gated by a password (no login system)
- Automatic image processing with Sharp (WebP thumbnails, dimensions, blur placeholder)
- Like counts, download counts, share counts, and an image ranking score
- Download button, native share + copy-link share
- Per-wallpaper SEO page with JSON-LD `ImageObject` structured data
- Category pages with their own SEO metadata
- Auto-generated `sitemap.xml`, `robots.txt`, and Web App Manifest
- Open Graph + Twitter Card meta tags on every page
- Fully responsive, accessible, semantic HTML

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open <http://localhost:3000> for the gallery and <http://localhost:3000/admin> to upload wallpapers (uses the password from `ADMIN_UPLOAD_PASSWORD`).

## Storage layout

- `public/uploads/wallpapers/` — original full-resolution images
- `public/uploads/thumbs/` — generated WebP thumbnails
- `data/wallpapers.json` — wallpaper metadata (created on first upload)

## SEO

Every component / page has:
- Unique `<title>` and meta description
- Open Graph + Twitter Card tags
- JSON-LD structured data (`WebSite`, `ImageGallery`, `ImageObject`, `BreadcrumbList`)
- Canonical URLs
- Sitemap + robots

Set `NEXT_PUBLIC_SITE_URL` in `.env` to your real domain before deploying.
