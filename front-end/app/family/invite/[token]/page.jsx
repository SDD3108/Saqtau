import { notFound } from "next/navigation";
import { headers } from "next/headers";
import styles from "./invite.module.css";

export const metadata = { title: "Family · Saqtau AI", robots: { index: false, follow: false }, referrer: "no-referrer" };
const words = {
  ru: ["Приглашение в семью", "Откройте приглашение в Saqtau AI. Войдите в аккаунт и нажмите «Принять». Ваши замеры останутся закрытыми.", "Открыть Saqtau AI", "Установить через TestFlight", "После установки снова нажмите исходную ссылку. Для Android публичной версии в Google Play пока нет."],
  kk: ["Отбасына шақыру", "Шақыруды Saqtau AI қолданбасында ашыңыз. Аккаунтыңызға кіріп, «Қабылдау» батырмасын басыңыз. Өлшеу нәтижелеріңіз құпия болып қалады.", "Saqtau AI қолданбасын ашу", "TestFlight арқылы орнату", "Орнатқаннан кейін бастапқы сілтемені қайта ашыңыз. Android нұсқасы Google Play-де әзірге жарияланбаған."],
  en: ["A family invitation", "Open this invitation in Saqtau AI, sign in and tap Accept. Your readings stay private.", "Open Saqtau AI", "Install with TestFlight", "After installing, tap the original link again. There is no public Android release on Google Play yet."],
};
export default async function Invite({ params }) {
  const { token } = await params;
  if (!/^[a-zA-Z0-9_-]{16,160}$/.test(token)) notFound();
  const pref = (await headers()).get("accept-language") || "";
  const lang = pref.toLowerCase().split(",").map(v => v.trim().split(/[-;]/)[0]).find(v => Object.hasOwn(words,v)) || "ru";
  const [title, body, open, install, hint] = words[lang];
  return <main className={styles.page} lang={lang}><article className={styles.card}>
    <div className={styles.brand}><img alt="" src="/logo.svg" width="45" height="45"/> Saqtau AI</div>
    <h1>{title}</h1><p>{body}</p>
    <a className={styles.primary} href={`saqtau://family/invite/${encodeURIComponent(token)}`}>{open}</a>
    <a className={styles.secondary} href="https://testflight.apple.com/join/K8VsqZzU" rel="noreferrer">{install}</a>
    <p className={styles.hint}>{hint}</p>
  </article></main>;
}
