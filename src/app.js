import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import swaggerUi from "swagger-ui-express";

import { env } from "./config/env.js";
import { httpLogger } from "./config/logger.js";
import { openapiSpec } from "./docs/openapi.js";

import { securityMiddleware } from "./middlewares/security.js";
import { apiRateLimiter } from "./middlewares/rateLimit.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(httpLogger);
  app.use(securityMiddleware());
  app.use(apiRateLimiter());

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Note: If you deploy behind a proxy (NGINX/ALB), set:
  // app.set("trust proxy", 1);
  app.use(
    session({
      name: env.sessionName,
      secret: env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: env.nodeEnv === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
      store: MongoStore.create({ mongoUrl: env.mongoUri })
    })
  );

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
