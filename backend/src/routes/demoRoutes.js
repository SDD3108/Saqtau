import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { demoSchema } from "../validation/demoSchema.js";
export function createDemoRoutes({ database, tokens, origin, limit = 100 }) {
  const router = Router();
  router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  router.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: (_req, res) => res.status(429).json({ error: "rate_limit" }),
    }),
  );
  router.get("/", async (_req, res) => {
    try {
      res.json({ token: await tokens.issue() });
    } catch {
      res.status(503).json({ error: "unavailable" });
    }
  });
  router.post("/", async (req, res) => {
    if (req.headers.origin !== origin)
      return res.status(403).json({ error: "origin" });
    if (!req.is("application/json"))
      return res.status(415).json({ error: "content_type" });
    const parsed = demoSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "validation" });
    const authorization = req.headers.authorization || "";
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "token" });
    let id;
    try {
      id = await tokens.verify(authorization.slice(7));
    } catch {
      return res.status(401).json({ error: "token_expired" });
    }
    try {
      database.save(parsed.data, id);
      res.json({ ok: true });
    } catch {
      res.status(503).json({ error: "unavailable" });
    }
  });
  return router;
}
