"use client";

export default function Error({ error, reset }) {
  return (
    <div className="empty" style={{ padding: "120px 20px" }} role="alert">
      <h2>Something went wrong</h2>
      <p style={{ maxWidth: 400, margin: "16px auto", color: "var(--text-dim)" }}>
        A glitch in the battlefield. Our warriors are working to fix it.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          background: "var(--accent-grad)",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Try Again
      </button>
    </div>
  );
}