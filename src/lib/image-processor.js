// Image processing pipeline used by the admin upload endpoint.
// Reads the uploaded image, generates an optimized WebP thumbnail,
// captures dimensions, and produces a low-resolution blur placeholder
// suitable for Next.js <Image placeholder="blur"> usage.

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const WALLPAPERS_DIR = path.join(process.cwd(), "public", "uploads", "wallpapers");
const THUMBS_DIR = path.join(process.cwd(), "public", "uploads", "thumbs");

export async function ensureDirs() {
  await fs.mkdir(WALLPAPERS_DIR, { recursive: true });
  await fs.mkdir(THUMBS_DIR, { recursive: true });
}

export async function processUploadedImage({ tempPath, baseName }) {
  await ensureDirs();

  const buffer = await fs.readFile(tempPath);
  const image = sharp(buffer, { failOn: "none" });
  const meta = await image.metadata();

  const ext = (meta.format || "jpeg").toLowerCase();
  const safeExt = ["jpeg", "jpg", "png", "webp", "avif"].includes(ext) ? ext : "jpeg";
  const finalName = `${baseName}.${safeExt === "jpeg" ? "jpg" : safeExt}`;
  const thumbName = `${baseName}.webp`;
  const blurName = `${baseName}.blur.webp`;

  const finalPath = path.join(WALLPAPERS_DIR, finalName);
  const thumbPath = path.join(THUMBS_DIR, thumbName);
  const blurPath = path.join(THUMBS_DIR, blurName);

  // Original optimized save (re-encode for stripping metadata + compression).
  await sharp(buffer)
    .rotate()
    .toFormat(safeExt === "png" ? "png" : safeExt === "webp" ? "webp" : "jpeg", { quality: 90 })
    .toFile(finalPath);

  // Thumbnail (max 800px wide WebP).
  await sharp(buffer)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbPath);

  // Blur placeholder (32px wide).
  const blurBuf = await sharp(buffer)
    .rotate()
    .resize({ width: 32 })
    .webp({ quality: 40 })
    .toBuffer();
  await fs.writeFile(blurPath, blurBuf);
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  // Clean up temp file.
  try { await fs.unlink(tempPath); } catch {}

  return {
    imagePath: `/uploads/wallpapers/${finalName}`,
    thumbPath: `/uploads/thumbs/${thumbName}`,
    blurDataURL,
    width: meta.width || 0,
    height: meta.height || 0,
    mimeType: `image/${safeExt === "jpeg" ? "jpeg" : safeExt}`,
    fileSize: buffer.length
  };
}
