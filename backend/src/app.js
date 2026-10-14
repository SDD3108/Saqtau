import express from "express";
import { createDemoRoutes } from "./routes/demoRoutes.js";
export function createApp(options) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "4kb" }));
  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/demo", createDemoRoutes(options));
  app.use((error, _req, res, _next) => {
    if (error.type === "entity.too.large")
      return res.status(413).json({ error: "too_large" });
    if (error instanceof SyntaxError)
      return res.status(400).json({ error: "invalid_json" });
    res.status(500).json({ error: "internal_error" });
  });
  return app;
}
