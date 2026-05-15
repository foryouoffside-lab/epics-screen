import { NextResponse } from "next/server";
import { getWallpaperById } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(_req, { params }) {
  const { id } = await params;
  const w = await getWallpaperById(id);
  if (!w) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(w);
}