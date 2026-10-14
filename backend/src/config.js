import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import dotenv from "dotenv";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env"), quiet: true });
export const production = process.env.NODE_ENV === "production";
if (
  production &&
  (!process.env.DEMO_JWT_SECRET || process.env.DEMO_JWT_SECRET.length < 32)
)
  throw new Error(
    "Set DEMO_JWT_SECRET (at least 32 characters) before production start.",
  );
export const config = {
  port: Number(process.env.PORT || 4000),
  host: process.env.HOST || "127.0.0.1",
  origin: new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")
    .origin,
  secret: process.env.DEMO_JWT_SECRET || randomBytes(48).toString("hex"),
  database: path.resolve(root, process.env.DATABASE_PATH || "data/demo.sqlite"),
};
