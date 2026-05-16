export default function Loading() {
  return (
    <div className="empty" style={{ padding: "120px 20px" }} role="status" aria-label="Loading wallpapers">
      <div style={{ marginBottom: 16 }}>
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="2" 
          style={{ animation: "spin 1s linear infinite" }}
        >
          <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="2" fill="none" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: 15 }}>Loading wallpapers…</p>
    </div>
  );
}