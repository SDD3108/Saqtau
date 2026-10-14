import { test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createApp } from "../src/app.js";
import { openDatabase } from "../src/db/database.js";
import { createTokenService } from "../src/services/tokenService.js";
import { demoSchema } from "../src/validation/demoSchema.js";
import { demoSchema as clientSchema } from "../../front-end/src/feature/DemoRequest/demoSchema.js";
const valid = {
  firstName: "Дамир",
  lastName: "Сатимов",
  email: "TEST@example.com",
  consent: true,
  locale: "ru",
  website: "",
};
test("demo API verifies JWT, validates input, rejects cross-origin and deduplicates records", async () => {
  const database = openDatabase(":memory:");
  const tokens = createTokenService("test-secret-with-at-least-32-characters");
  const server = createApp({
    database,
    tokens,
    origin: "http://localhost:3000",
    limit: 50,
  }).listen(0, "127.0.0.1");
  await once(server, "listening");
  const url = `http://127.0.0.1:${server.address().port}/api/demo`;
  try {
    const get = await fetch(url);
    assert.equal(get.status, 200);
    assert.equal(get.headers.get("cache-control"), "no-store");
    const { token } = await get.json();
    const post = (body, extra = {}) =>
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
          authorization: `Bearer ${token}`,
          ...extra,
        },
        body: JSON.stringify(body),
      });
    assert.equal((await post(valid)).status, 200);
    assert.equal(database.count(), 1);
    assert.equal((await post(valid)).status, 200);
    assert.equal(database.count(), 1);
    assert.equal(
      (await post(valid, { authorization: "Bearer invalid" })).status,
      401,
    );
    assert.equal(
      (await post(valid, { origin: "https://wrong.example" })).status,
      403,
    );
    assert.equal((await post({ ...valid, email: "bad" })).status, 400);
    assert.equal((await post({ ...valid, consent: false })).status, 400);
    assert.equal((await post({ ...valid, website: "spam" })).status, 400);
    assert.equal(
      (await post({ ...valid, firstName: "x".repeat(5000) })).status,
      413,
    );
    assert.equal(database.count(), 1);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    database.close();
  }
});
test("requests persist after reopening the database", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "saqtau-"));
  const filename = path.join(folder, "test.sqlite");
  try {
    let db = openDatabase(filename);
    db.save(demoSchema.parse(valid), "test-id");
    db.close();
    db = openDatabase(filename);
    assert.equal(db.count(), 1);
    db.close();
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});
test("client/server schemas accept the same multilingual names and reject invalid payloads", () => {
  for (const patch of [
    {},
    { firstName: "Әли" },
    { firstName: "Jean-Luc" },
    { lastName: "O’Connor" },
    { email: "bad" },
    { firstName: "" },
    { consent: false },
    { locale: "de" },
  ]) {
    const input = { ...valid, ...patch };
    assert.deepEqual(
      clientSchema.safeParse(input).success,
      demoSchema.safeParse(input).success,
    );
  }
  assert.equal(demoSchema.parse(valid).email, "test@example.com");
});
