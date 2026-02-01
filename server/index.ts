import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handlePredict, handleResolveIssue, handleAreaHealth } from "./routes/civic";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Civic API routes
  app.post("/api/civic/predict", handlePredict);
  app.post("/api/civic/resolve/:issueId", handleResolveIssue);
  app.get("/api/civic/area-health", handleAreaHealth);

  return app;
}
