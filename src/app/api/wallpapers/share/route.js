import { NextResponse } from "next/server";
import { incrementStat } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const updated = await incrementStat(id, "shares", 1);
    return NextResponse.json({ ok: true, shares: updated?.shares || 0 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
