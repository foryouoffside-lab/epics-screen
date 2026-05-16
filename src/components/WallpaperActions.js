"use client";

import { useState, useEffect } from "react";

const LIKED_KEY = "epicsscreen.liked";

function readLiked() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) || "{}"); } catch { return {}; }
}
function writeLiked(map) {
  try { localStorage.setItem(LIKED_KEY, JSON.stringify(map)); } catch {}
}

export default function WallpaperActions({ wallpaper }) {
  const { id, title, slug, imagePath } = wallpaper;
  const [likes, setLikes] = useState(wallpaper.likes || 0);
  const [downloads, setDownloads] = useState(wallpaper.downloads || 0);
  const [shares, setShares] = useState(wallpaper.shares || 0);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLiked(Boolean(readLiked()[id]));
  }, [id]);

  async function handleLike() {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    setLiked(next);
    setLikes((n) => n + (next ? 1 : -1));
    const map = readLiked();
    if (next) map[id] = true; else delete map[id];
    writeLiked(map);
    try {
      const res = await fetch("/api/wallpapers/like", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, action: next ? "like" : "unlike" })
      });
      const data = await res.json();
      if (data && typeof data.likes === "number") setLikes(data.likes);
    } catch {}
    setBusy(false);
  }

  async function handleDownload() {
    try {
      await fetch("/api/wallpapers/download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id })
      });
      setDownloads((n) => n + 1);
    } catch {}
    const a = document.createElement("a");
    a.href = imagePath;
    a.download = `${slug}${imagePath.substring(imagePath.lastIndexOf("."))}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    let shared = false;
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `${title} — Free HD & 4K Warrior Wallpaper`, 
          text: `Download "${title}" — free HD & 4K warrior wallpaper for phone & desktop on Epic's Screen`, 
          url 
        });
        shared = true;
      } catch {}
    }
    if (!shared) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied! Share this warrior wallpaper with friends.");
        shared = true;
      } catch {}
    }
    if (shared) {
      try {
        await fetch("/api/wallpapers/share", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id })
        });
        setShares((n) => n + 1);
      } catch {}
    }
  }

  return (
    <>
      <div className="actions" role="group" aria-label="Wallpaper actions">
        <button
          type="button"
          className={`btn btn--like ${liked ? "active" : ""}`}
          onClick={handleLike}
          aria-pressed={liked}
          aria-label={liked ? "Unlike this warrior wallpaper" : "Like this warrior wallpaper"}
        >
          <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{liked ? "Liked" : "Like"}</span>
        </button>

        <button type="button" className="btn btn--primary" onClick={handleDownload} aria-label="Download free HD warrior wallpaper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download HD
        </button>

        <button type="button" className="btn" onClick={handleShare} aria-label="Share this warrior wallpaper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>
      </div>

      <div className="stats-row" aria-label="Wallpaper statistics">
        <div className="stat">
          <div className="stat__val">{likes}</div>
          <div className="stat__lbl">Likes</div>
        </div>
        <div className="stat">
          <div className="stat__val">{downloads}</div>
          <div className="stat__lbl">Downloads</div>
        </div>
        <div className="stat">
          <div className="stat__val">{shares}</div>
          <div className="stat__lbl">Shares</div>
        </div>
        <div className="stat">
          <div className="stat__val">{wallpaper.views || 0}</div>
          <div className="stat__lbl">Views</div>
        </div>
      </div>
    </>
  );
}