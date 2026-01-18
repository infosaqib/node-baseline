import helmet from "helmet";
import cors from "cors";
import express from "express";
import logger from "./logger.middleware.js";
import limiter from "../utils/rateLimiter.utils.js";
import timeout from "connect-timeout";

export default function setupMiddlewares(app) {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(logger);
  app.use(limiter);
  app.use(timeout("5s")); // requests longer than 5s
  app.use((req, res, next) => {
    if (!req.timedout) next();
  });
}
