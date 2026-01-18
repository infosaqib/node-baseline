import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.config.js";
import apiRouter from "./routes/api.routes.js";
import indexMiddlewares from "./middlewares/index.middleware.js";
import { setupErrorHandlers } from "./middlewares/errorHandler.middleware.js";
import { connectDB } from "./config/db.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

indexMiddlewares(app);

app.use("/api", apiRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

setupErrorHandlers(app);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
