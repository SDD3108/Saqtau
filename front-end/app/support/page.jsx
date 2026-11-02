import Link from "next/link";

import SupportForm from "@/src/feature/Support/SupportForm";

const languages = {
  ru: "Русский",
  en: "English",
  kk: "Қазақша",
};

const copy = {
  ru: {
    home: "На главную",
    title: "Поддержка Saqtau AI",
    intro:
      "Не получается войти, пройти проверку или пригласить близкого? Напишите команде приложения.",
    label: "Электронная почта поддержки",
    help: "Что указать в письме",
    tip:
      "Укажите модель телефона, версию iOS или Android и версию приложения. Опишите, что вы нажали и что появилось на экране.",
    privacy:
      "Не отправляйте пароли, коды входа или результаты измерений.",
  },
  en: {
    home: "Home",
    title: "Saqtau AI Support",
    intro:
      "Need help signing in, completing a check-in or inviting a family member? Email the app team.",
    label: "Support email",
    help: "What to include",
    tip:
      "Include your phone model, iOS or Android version and app version. Tell us what you tapped and what appeared on screen.",
    privacy:
      "Please leave out passwords, sign-in codes and measurement results.",
  },
  kk: {
    home: "Басты бет",
    title: "Saqtau AI қолдау қызметі",
    intro:
      "Аккаунтқа кіре алмайсыз ба, тексеруден өту немесе отбасы мүшесін шақыру қиын болып тұр ма? Бізге жазыңыз.",
    label: "Қолдау қызметінің электрондық поштасы",
    help: "Хатта не жазу керек?",
    tip:
      "Телефон моделін, iOS немесе Android нұсқасын және қолданба нұсқасын көрсетіңіз. Нені басқаныңызды және экранда не көрінгенін сипаттаңыз.",
    privacy:
      "Құпиясөздерді, кіру кодтарын немесе өлшеу нәтижелерін жібермеңіз.",
  },
};

export const metadata = {
  title: "Saqtau AI | App Support",
  description: "Contact the Saqtau AI mobile app support team.",
};

export default async function SupportPage({ searchParams }) {
  const requested = (await searchParams)?.lang;
  const lang = ["en", "kk"].includes(requested) ? requested : "ru";
  const t = copy[lang];

  return (
    <main
      lang={lang}
      className="mx-auto min-h-screen max-w-2xl px-6 py-12 text-foreground"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-primary">
          ← {t.home}
        </Link>

        <nav aria-label="Language" className="flex flex-wrap gap-3">
          {Object.entries(languages).map(([code, name]) => (
            <Link
              key={code}
              href={code === "ru" ? "/support" : `/support?lang=${code}`}
              lang={code}
              hrefLang={code}
              aria-current={lang === code ? "page" : undefined}
              className={
                lang === code
                  ? "text-primary underline"
                  : "text-muted-foreground"
              }
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>

      <h1 className="mt-16 text-4xl font-semibold">{t.title}</h1>
      <SupportForm locale={lang} />

      <h2 className="text-xl font-semibold">{t.help}</h2>
      <p className="mt-3 leading-relaxed">{t.tip}</p>
      <p className="mt-3 text-sm text-muted-foreground">{t.privacy}</p>
    </main>
  );
}
