import express from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(24000).refine((s) => s.split(/\s+/u).length <= 600),
});

export function supportRoutes({ origin, telegramFetch = fetch }){
  const router = express.Router();
  router.post("/", (req, res, next)=>{
      res.set("Cache-Control", "no-store");
      if(req.get("origin") !== origin){
        return res.sendStatus(403);
      }
      if(!req.is("application/json")){
        return res.sendStatus(415);
      }
      next();
    },
    rateLimit({ limit: 30, windowMs: 15 * 60000, legacyHeaders: false }),
    express.json({ limit: "128kb" }),async (req,res)=>{
      const parsed = schema.safeParse(req.body);
      if(!parsed.success){
        return res.status(400).json({ error: "invalid" });
      }
      const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = process.env;
      if(!token || !chat){
        return res.status(503).json({ error: "unavailable" });
      }
      const { email, message } = parsed.data;
      const caption = "Поддержка Saqtau AI\nEmail для ответа: " + email;
      const text = caption + "\n\n" + message;
      let method = "sendMessage";
      let body = new FormData();
      body.set("chat_id", chat);
      if (text.length <= 4096) {
        body.set("text", text);
        body.set("link_preview_options", JSON.stringify({ is_disabled: true }));
      } else {
        method = "sendDocument";
        body.set("caption", caption);
        body.set("document", new Blob([message], { type: "text/plain;charset=utf-8" }), "support.txt");
      }
      try{
        const result = await telegramFetch(`https://api.telegram.org/bot${token}/${method}`,{
          method: "POST", body, signal: AbortSignal.timeout(10000),
        });
        if(result.ok && (await result.json()).ok == true){
          return res.json({ ok: true });
        }
      }
      catch{
        console.log("Failed to send support message to Telegram.");
        // Never log Telegram URLs, sender addresses or message text.
      }
      return res.status(503).json({ error: "unavailable" });
    }
  );
  return router;
}
