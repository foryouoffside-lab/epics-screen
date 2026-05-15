"use client";

export default function Error({ error, reset }) {
  return (
    <div className="empty" style={{ padding: "120px 20px" }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "var(--text-mute)" }}>{error?.message || "Unknown error"}</p>
      <button className="btn btn--primary" onClick={() => reset()}>Try again</button>
    </div>
  );
}
