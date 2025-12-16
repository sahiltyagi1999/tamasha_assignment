import dotenv from "dotenv";
import app from "./app";
import { connectDB, closeDB } from "./config/db";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.error(" MONGO_URI is missing in environment variables");
  process.exit(1);
}

(async () => {
  try {
    await connectDB(MONGO_URI);

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    const gracefulShutdown = async () => {
      console.log(" Shutting down");
      await closeDB();
      server.close(() => {
        console.log("Server stopped");
        process.exit(0);
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
