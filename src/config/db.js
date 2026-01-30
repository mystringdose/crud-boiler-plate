import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

export async function connectDb() {
  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => logger.info("Mongo connected"));
  mongoose.connection.on("error", (err) => logger.error({ err }, "Mongo error"));

  await mongoose.connect(env.mongoUri);
}
