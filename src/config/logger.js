import pino from "pino";
import pinoHttp from "pino-http";
import { uid } from "../utils/uid.js";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: undefined
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existing = req.headers["x-request-id"];
    const id = (Array.isArray(existing) ? existing[0] : existing) || uid();
    res.setHeader("x-request-id", id);
    return id;
  },
  customLogLevel: function (res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  }
});
