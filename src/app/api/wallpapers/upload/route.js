// POST /api/wallpapers/upload — multipart upload (admin only via password)
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { processUploadedImage } from "@/lib/image-processor";
import { addWallpaper } from "@/lib/db";
import { makeSlug, newId } from "@/lib/slug";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const form = await req.formData();
    const password = form.get("password");
    if (!password || password !== process.env.ADMIN_UPLOAD_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const title = (form.get("title") || "").toString().trim();
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const arrayBuf = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    if (buf.length > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 400 });
    }

    const id = newId();
    const slug = makeSlug(title);
    const tempPath = path.join(os.tmpdir(), `epicsscreen-${id}`);
    await fs.writeFile(tempPath, buf);

    const processed = await processUploadedImage({ tempPath, baseName: id });

    const wallpaper = {
      id,
      slug,
      title,
      description: "",
      category: "warrior",
      categoryName: "Warrior",
      tags: ["warrior", "hd wallpaper", "4k wallpaper"],
      imagePath: processed.imagePath,
      thumbPath: processed.thumbPath,
      blurDataURL: processed.blurDataURL,
      width: processed.width,
      height: processed.height,
      mimeType: processed.mimeType,
      fileSize: processed.fileSize,
      likes: 0,
      downloads: 0,
      shares: 0,
      views: 0,
      createdAt: Date.now()
    };

    await addWallpaper(wallpaper);

    return NextResponse.json({ ok: true, id, slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}