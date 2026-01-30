import { ApiError } from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/tokens.js";

export function requireSession(req, _res, next) {
  if (!req.session?.userId) return next(new ApiError(401, "Not authenticated (session)"));
  next();
}

export function requireJwt(req, _res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next(new ApiError(401, "Missing bearer token"));

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) return next(new ApiError(403, "Forbidden"));
    next();
  };
}
