import { ApiError } from "../utils/apiError.js";
import { logger } from "../config/logger.js";

export function errorHandler(err, req, res, _next) {
  const status = err instanceof ApiError ? err.statusCode : 500;

  if (status >= 500) {
    logger.error({ err, reqId: req.id }, "Unhandled error");
  } else {
    logger.warn(
      { err: { message: err.message, details: err.details }, reqId: req.id },
      "Request error"
    );
  }

  res.status(status).json({
    message: err.message ?? "Internal Server Error",
    details: err.details ?? undefined,
    requestId: req.id
  });
}
