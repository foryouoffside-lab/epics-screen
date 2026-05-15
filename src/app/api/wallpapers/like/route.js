import { NextResponse } from "next/server";
import { incrementStat, getWallpaperById } from "@/lib/db";

export const runtime = "nodejs";

// In-memory store for liked wallpapers by IP
// In production, use a database or Redis
const likedByIP = new Map();

export async function POST(req) {
  try {
    const { id, action } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    // Get client IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || 
               "unknown";

    // Check if this IP already liked this wallpaper
    const userLikes = likedByIP.get(ip) || new Set();
    
    if (action === "like") {
      if (userLikes.has(id)) {
        return NextResponse.json({ error: "Already liked" }, { status: 429 });
      }
      userLikes.add(id);
    } else if (action === "unlike") {
      userLikes.delete(id);
    }
    
    likedByIP.set(ip, userLikes);

    const current = await getWallpaperById(id);
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const delta = action === "unlike" ? -1 : 1;
    const updated = await incrementStat(id, "likes", delta);
    return NextResponse.json({ ok: true, likes: Math.max(0, updated.likes) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}