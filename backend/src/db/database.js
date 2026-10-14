import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
export function openDatabase(filename) {
  if (filename !== ":memory:")
    mkdirSync(path.dirname(filename), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS demo_requests (
 id TEXT PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE, locale TEXT NOT NULL, consent_version TEXT NOT NULL, created_at TEXT NOT NULL);`);
  const insert = db.prepare(
    "INSERT INTO demo_requests (id,first_name,last_name,email,locale,consent_version,created_at) VALUES (?,?,?,?,?,?,?) ON CONFLICT DO NOTHING",
  );
  return {
    save(data, id) {
      insert.run(
        id,
        data.firstName,
        data.lastName,
        data.email,
        data.locale,
        "demo-2026-10-14",
        new Date().toISOString(),
      );
    },
    close() {
      db.close();
    },
    count() {
      return db.prepare("SELECT count(*) AS count FROM demo_requests").get()
        .count;
    },
  };
}
