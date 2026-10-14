export function startTelegramWorker(
    database,
    {
      token = process.env.TELEGRAM_BOT_TOKEN,
      chatId = process.env.TELEGRAM_CHAT_ID,
      fetchImpl = fetch,
      intervalMs = 2000,
    } = {},
  ) {
    if (!token || !chatId) {
      console.warn(
        "Telegram disabled: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID",
      );
  
      return async () => {};
    }
  
    let stopped = false;
    let timer;
    let running = Promise.resolve();
  
    async function tick() {
      try {
        const row = database.nextNotification();
  
        if (!row) return;
  
        const text = [
          "Новая заявка — SaqtauAI",
          "",
          `Имя: ${row.first_name}`,
          `Фамилия: ${row.last_name}`,
          `Email: ${row.email}`,
          `Язык: ${row.locale}`,
          `Дата: ${new Date(row.created_at).toLocaleString("ru-RU", {
            timeZone: "Asia/Almaty",
          })} (Астана)`,
          `ID: ${row.id}`,
        ].join("\n");
  
        try {
          const response = await fetchImpl(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chat_id: chatId,
                text,
                link_preview_options: {
                  is_disabled: true,
                },
              }),
              signal: AbortSignal.timeout(10000),
            },
          );
  
          const result = await response.json();
  
          if (!response.ok || !result.ok) {
            const seconds =
              Number(result.parameters?.retry_after) || 60;
  
            database.notificationFailed(
              row.id,
              Math.max(60, seconds) * 1000,
            );
  
            console.warn(
              "Telegram rejected notification; queued for retry:",
              response.status,
            );
  
            return;
          }
  
          database.notificationSent(row.id);
        } catch {
          database.notificationFailed(row.id, 60000);
  
          console.warn(
            "Telegram delivery failed; queued for retry",
          );
        }
      } catch {
        console.error("Telegram queue processing failed");
      } finally {
        if (!stopped) {
          timer = setTimeout(() => {
            running = tick();
          }, intervalMs);
  
          timer.unref();
        }
      }
    }
  
    running = tick();
  
    return async () => {
      stopped = true;
      clearTimeout(timer);
      await running;
    };
  }