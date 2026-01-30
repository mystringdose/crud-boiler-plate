import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "mongo-sanitize";
import { env } from "../config/env.js";

export function securityMiddleware() {
  return [
    helmet(),
    cors({ origin: env.corsOrigin, credentials: true }),
    hpp(),
    (req, _res, next) => {
      req.body = mongoSanitize(req.body);
      req.query = mongoSanitize(req.query);
      req.params = mongoSanitize(req.params);
      next();
    }
  ];
}
