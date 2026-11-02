"use client";

import { useId, useRef, useState } from "react";

const contact = "satimovdamir6@gmail.com";
const wordsIn = (s) => s.match(/\S+/gu)?.length ?? 0;
const copy = {
  ru: {
    title: "Есть вопрос или что-то не работает?",
    intro: "Напишите команде Saqtau AI. Укажите почту, на которую мы сможем ответить.",
    email: "Ваша почта", message: "Сообщение", hint: "Опишите вопрос или ошибку…",
    words: "слов", send: "Отправить", busy: "Отправляем…", sent: "Сообщение отправлено. Спасибо!",
    long: "Сократите сообщение до 600 слов.", fail: "Не удалось отправить. Попробуйте ещё раз или напишите на почту ниже.",
    limit: "Слишком много обращений. Попробуйте позже или напишите на почту ниже.",
    alt: "Почта поддержки",
  },
  en: {
    title: "Have a question or found a problem?",
    intro: "Contact the Saqtau AI team. Leave an email address so we can reply.",
    email: "Your email", message: "Message", hint: "Describe your question or the issue…",
    words: "words", send: "Send", busy: "Sending…", sent: "Your message was sent. Thank you!",
    long: "Shorten your message to 600 words.", fail: "Couldn’t send your message. Try again or email us below.",
    limit: "Too many requests. Try again later or email us below.", alt: "Support email",
  },
  kk: {
    title: "Сұрағыңыз бар ма, әлде бір нәрсе дұрыс жұмыс істемей ме?",
    intro: "Saqtau AI командасына жазыңыз. Жауап беруіміз үшін электрондық поштаңызды көрсетіңіз.",
    email: "Электрондық поштаңыз", message: "Хабарлама", hint: "Сұрағыңызды немесе мәселені сипаттаңыз…",
    words: "сөз", send: "Жіберу", busy: "Жіберілуде…", sent: "Хабарламаңыз жіберілді. Рақмет!",
    long: "Хабарламаны 600 сөзге дейін қысқартыңыз.", fail: "Хабарлама жіберілмеді. Қайталап көріңіз немесе төмендегі поштаға жазыңыз.",
    limit: "Өтініш тым көп. Кейінірек қайталаңыз немесе төмендегі поштаға жазыңыз.", alt: "Қолдау поштасы",
  },
};

export default function SupportForm({ locale = "ru" }) {
  const t = copy[locale] ?? copy.ru;
  const id = useId();
  const lock = useRef(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const words = wordsIn(message);
  const over = words > 600;
  const busy = status === "busy";
  const field = "mt-1 block w-full rounded-xl border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-primary";
  async function submit(event) {
    event.preventDefault();
    if (lock.current || over || !words || !email.trim()) return;
    lock.current = true;
    setStatus("busy");
    try {
      const res = await fetch("/api/support", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      });
      if (!res.ok || (await res.json()).ok !== true) {
        setStatus(res.status === 429 ? "limit" : "fail");
        return;
      }
      setMessage(""); setEmail(""); setStatus("sent");
    } catch { setStatus("fail"); }
    finally { lock.current = false; }
  }
  return (
    <section id="support" aria-labelledby={id + "-title"} className="my-9 scroll-mt-24 rounded-2xl border border-border bg-card p-5 sm:p-7">
      <h2 id={id + "-title"} className="text-2xl font-semibold">{t.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t.intro}</p>
      <form className="mt-5 grid max-w-2xl gap-3" onSubmit={submit} aria-busy={busy}>
        <label className="text-sm">{t.email}
          <input className={field} name="email" type="email" autoComplete="email" maxLength={254}
            value={email} onChange={(e) => { setEmail(e.target.value); setStatus(""); }} required disabled={busy} />
        </label>
        <label className="text-sm">{t.message}
          <textarea className={field + " resize-y"} rows={3} name="message" required disabled={busy}
            placeholder={t.hint} value={message} aria-invalid={over} aria-describedby={id + "-count"}
            onChange={(e) => { setMessage(e.target.value); setStatus(""); }} />
        </label>
        <p id={id + "-count"} className={over ? "text-sm text-red-400" : "text-sm text-muted-foreground"}>
          {words} / 600 {t.words}{over ? " · " + t.long : ""}
        </p>
        <button type="submit" disabled={!words || over || busy}
          className="w-fit rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? t.busy : t.send}
        </button>
        <p role="status" className="text-sm empty:hidden">{["sent", "limit", "fail"].includes(status) ? t[status] : ""}</p>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">{t.alt}: <a className="break-all underline" href={"mailto:" + contact}>{contact}</a></p>
    </section>
  );
}
