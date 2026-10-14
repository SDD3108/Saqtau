import { config } from "./src/config.js";
import { openDatabase } from "./src/db/database.js";
import { createTokenService } from "./src/services/tokenService.js";
import { createApp } from "./src/app.js";
const database = openDatabase(config.database);
const app = createApp({
  database,
  tokens: createTokenService(config.secret),
  origin: config.origin,
});
const server = app.listen(config.port, config.host, () =>
  console.log(`Saqtau API: http://${config.host}:${config.port}`),
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () =>
    server.close(() => {
      database.close();
      process.exit(0);
    }),
  );
