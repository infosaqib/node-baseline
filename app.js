dotenv.config();
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.config.js";
import indexMiddlewares from "./middlewares/index.middleware.js";
import { setupErrorHandlers } from "./middlewares/errorHandler.middleware.js";

import indexRoutes from "./routes/index.route.js";

const app = express();
const port = process.env.PORT || 5000;

indexMiddlewares(app);

app.use("/v1", indexRoutes);

app.get("/v1/health", (req, res) => {
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
