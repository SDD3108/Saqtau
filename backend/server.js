import { config } from "./src/config.js";
import { openDatabase } from "./src/db/database.js";
import { createTokenService } from "./src/services/tokenService.js";
import { startTelegramWorker } from "./src/services/telegramService.js";
import { createApp } from "./src/app.js";

const database = openDatabase(config.database);

const app = createApp({
  database,
  tokens: createTokenService(config.secret),
  origin: config.origin,
});

const stopTelegram = startTelegramWorker(database);

const server = app.listen(config.port, config.host, () => {
  console.log(
    `Saqtau API: http://${config.host}:${config.port}`,
  );
});

let shuttingDown = false;

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    if (shuttingDown) return;

    shuttingDown = true;

    server.close(async () => {
      await stopTelegram();
      database.close();
      process.exit(0);
    });
  });
}