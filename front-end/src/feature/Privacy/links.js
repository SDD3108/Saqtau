export function privacyLocale(value) {
  const language = typeof value === "string" ? value.toLowerCase().split(/[-_]/)[0] : "ru";
  if (language === "kz") return "kk";
  return ["ru", "en", "kk"].includes(language) ? language : "ru";
}

export function privacyHref(locale = "ru") {
  const lang = privacyLocale(locale);
  return lang === "ru" ? "/privacy" : `/privacy?lang=${lang}`;
}

export const privacyLabels = {
  ru: "Политика конфиденциальности",
  en: "Privacy Policy",
  kk: "Құпиялылық саясаты",
};
