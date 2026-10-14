"use client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { copy } from "@/src/utils/content";
export const i18n = i18next.createInstance();
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: copy.ru },
      en: { translation: copy.en },
      kk: { translation: copy.kk },
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    initAsync: false,
  });
