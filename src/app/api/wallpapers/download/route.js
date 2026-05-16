import { NextResponse } from "next/server";
import { incrementStat } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limiter";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limit = rateLimit(ip, "download", 30, 60000);
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const updated = await incrementStat(id, "downloads", 1);
    return NextResponse.json({ ok: true, downloads: updated?.downloads || 0 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}