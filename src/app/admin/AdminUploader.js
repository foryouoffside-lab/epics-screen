"use client";

import { useState, useRef } from "react";

export default function AdminUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const dropRef = useRef(null);

  function handleFile(f) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setMsg({ type: "err", text: "Please choose an image file." });
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
  }

  function onDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) { setMsg({ type: "err", text: "Please pick an image first." }); return; }
    if (!title.trim()) { setMsg({ type: "err", text: "Title is required." }); return; }
    if (!password) { setMsg({ type: "err", text: "Admin password is required." }); return; }

    setSubmitting(true);
    setMsg(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title.trim());
    fd.append("password", password);

    try {
      const res = await fetch("/api/wallpapers/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setMsg({ type: "ok", text: `Uploaded! View at /wallpaper/${data.slug}` });
      setFile(null);
      setPreview(null);
      setTitle("");
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {msg && <div className={`alert alert--${msg.type}`}>{msg.text}</div>}

      <div className="field">
        <label htmlFor="admin-pw">Admin password</label>
        <input
          id="admin-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the admin password"
          autoComplete="current-password"
          required
        />
      </div>

      <div
        ref={dropRef}
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => document.getElementById("admin-file").click()}
        role="button"
        tabIndex={0}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxHeight: 220, margin: "0 auto", borderRadius: 8 }} />
        ) : (
          <>
            <strong>Drop image here, or click to choose</strong>
            <p>JPG, PNG, WebP up to 20MB</p>
          </>
        )}
        <input
          id="admin-file"
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />
      </div>

      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="t">Title</label>
        <input id="t" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} />
      </div>

      <button type="submit" className="btn btn--primary" disabled={submitting} style={{ width: "100%", justifyContent: "center" }}>
        {submitting ? "Uploading…" : "Upload Wallpaper"}
      </button>
    </form>
  );
}