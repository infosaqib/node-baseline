dotenv.config();
import dotenv from "dotenv";
import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGO_URI;

if (!MONGODB_URL) {
  console.error("FATAL ERROR: MONGO_URI is not defined");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected successfully to MongoDB (^_^) ");
  } catch (error) {
    console.error(
      `Internal server Error, please try again::: ${error.message}`,
    );
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`disconnect DB is failed -_- ::: ${error.message}`);
  }
};

process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

export default connectDB;
