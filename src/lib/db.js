// Lightweight JSON-file database for wallpaper metadata.
// Local: stores in /data folder. Vercel: uses /tmp for writes.

import fs from "fs/promises";
import path from "path";

const isVercel = process.env.VERCEL === "1";
const DATA_DIR = isVercel 
  ? path.join("/tmp", "data") 
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "wallpapers.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    const seed = { wallpapers: [], categories: [] };
    await fs.writeFile(DB_FILE, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readDb() {
  await ensureFile();
  const raw = await fs.readFile(DB_FILE, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return { wallpapers: [], categories: [] };
  }
}

export async function writeDb(db) {
  await ensureFile();
  const tmp = DB_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_FILE);
}

export async function getAllWallpapers() {
  const db = await readDb();
  return [...db.wallpapers].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getRankedWallpapers(limit = 24) {
  const all = await getAllWallpapers();
  const now = Date.now();
  const scored = all.map((w) => {
    const ageDays = (now - w.createdAt) / (1000 * 60 * 60 * 24);
    const freshness = 1 / (1 + ageDays / 14);
    const score =
      (w.likes || 0) * 3 +
      (w.downloads || 0) * 2 +
      (w.shares || 0) * 1.5 +
      (w.views || 0) * 0.2 +
      freshness * 10;
    return { ...w, rankScore: Math.round(score * 100) / 100 };
  });
  scored.sort((a, b) => b.rankScore - a.rankScore);
  return scored.slice(0, limit);
}

export async function getWallpaperBySlug(slug) {
  const db = await readDb();
  return db.wallpapers.find((w) => w.slug === slug) || null;
}

export async function getWallpaperById(id) {
  const db = await readDb();
  return db.wallpapers.find((w) => w.id === id) || null;
}

export async function addWallpaper(wallpaper) {
  const db = await readDb();
  db.wallpapers.unshift(wallpaper);
  if (wallpaper.category && !db.categories.find((c) => c.slug === wallpaper.category)) {
    db.categories.push({
      slug: wallpaper.category,
      name: wallpaper.categoryName || wallpaper.category
    });
  }
  await writeDb(db);
  return wallpaper;
}

export async function updateWallpaper(id, patch) {
  const db = await readDb();
  const idx = db.wallpapers.findIndex((w) => w.id === id);
  if (idx === -1) return null;
  db.wallpapers[idx] = { ...db.wallpapers[idx], ...patch };
  await writeDb(db);
  return db.wallpapers[idx];
}

export async function incrementStat(id, field, amount = 1) {
  const db = await readDb();
  const idx = db.wallpapers.findIndex((w) => w.id === id);
  if (idx === -1) return null;
  db.wallpapers[idx][field] = (db.wallpapers[idx][field] || 0) + amount;
  await writeDb(db);
  return db.wallpapers[idx];
}

export async function getCategories() {
  const db = await readDb();
  return db.categories;
}

export async function getWallpapersByCategory(slug) {
  const db = await readDb();
  return db.wallpapers
    .filter((w) => w.category === slug)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function getRelatedWallpapers(wallpaper, limit = 8) {
  const db = await readDb();
  return db.wallpapers
    .filter((w) => w.id !== wallpaper.id && w.category === wallpaper.category)
    .slice(0, limit);
}