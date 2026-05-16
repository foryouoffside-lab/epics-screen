// Simple in-memory rate limiter for API endpoints.
// Limits repeated requests from the same IP within a time window.
// Memory is cleared on server restart (acceptable for this use case).

const rateMap = new Map();

export function rateLimit(ip, action, maxRequests = 10, windowMs = 60000) {
  const key = `${ip}:${action}`;
  const now = Date.now();
  const record = rateMap.get(key);
  
  if (!record || now - record.start > windowMs) {
    rateMap.set(key, { start: now, count: 1 });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((record.start + windowMs - now) / 1000) };
  }
  
  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

// Clean up stale entries every 5 minutes (server-side only, not during build).
if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateMap) {
      if (now - record.start > 300000) rateMap.delete(key);
    }
  }, 300000);
}