import rateLimit from "express-rate-limit";

export function apiRateLimiter() {
  return rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
  });
}
