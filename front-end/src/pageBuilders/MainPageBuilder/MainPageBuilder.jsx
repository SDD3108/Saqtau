"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";

import useSiteMotion from "@/src/hooks/useSiteMotion";
import { Button } from "@/src/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/src/ui/dialog";

import { copy, screens } from "@/src/utils/content";
import { i18n } from "@/i18n";

import HeroSection from "@/src/components/sections/HeroSection/HeroSection";
import TechnologySection from "@/src/components/sections/TechnologySection/TechnologySection";
import AppSection from "@/src/components/sections/AppSection/AppSection";
import ProgressSection from "@/src/components/sections/ProgressSection/ProgressSection";
import TeamSection from "@/src/components/sections/TeamSection/TeamSection";
import FaqSection from "@/src/components/sections/FaqSection/FaqSection";
import FinalCtaSection from "@/src/components/sections/FinalCtaSection/FinalCtaSection";

import Header from "@/src/common/header/Header";
import Footer from "@/src/common/footer/Footer";
import Countdown from "@/src/components/Countdown/Countdown";
import DemoForm from "@/src/feature/DemoRequest/DemoRequest";

const supportedLanguages = ["ru", "en", "kk"];
const languageStorageKey = "saqtau-language";

function Content() {
  useSiteMotion();

  const { i18n: translation } = useTranslation();

  const locale = supportedLanguages.includes(translation.language)
    ? translation.language
    : "ru";

  const c = copy[locale];

  const [privacy, setPrivacy] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    function persistLanguage(language) {
      if (!supportedLanguages.includes(language)) return;

      document.documentElement.lang = language;

      try {
        localStorage.setItem(languageStorageKey, language);
      } catch {
        // Сайт продолжает работать, если браузер запрещает localStorage.
      }
    }

    let savedLanguage = null;

    try {
      savedLanguage = localStorage.getItem(languageStorageKey);
    } catch {
      // Используем текущий язык, если хранилище недоступно.
    }

    i18n.on("languageChanged", persistLanguage);

    if (
      supportedLanguages.includes(savedLanguage) &&
      savedLanguage !== i18n.language
    ) {
      void i18n.changeLanguage(savedLanguage);
    } else {
      persistLanguage(i18n.language);
    }

    return () => {
      i18n.off("languageChanged", persistLanguage);
    };
  }, []);

  return (
    <>
      <div className="motion-progress" aria-hidden="true" />

      <Header c={c} locale={locale} />

      <main id="main">
        <HeroSection c={c} />

        <div className="wrap">
          <Countdown c={c} />

          <section className="stats">
            {["10+", "7+", "1,000+", "6"].map((stat, i) => (
              <div key={stat}>
                <strong>{stat}</strong>
                <span>{c.statLabels[i]}</span>
              </div>
            ))}
          </section>

          <p className="source-note">{c.source}</p>
        </div>

        <TechnologySection c={c} />
        <AppSection c={c} setLightbox={setLightbox} />
        <ProgressSection c={c} />
        <TeamSection c={c} />
        <FaqSection c={c} />
        <FinalCtaSection c={c} />
      </main>

      <Footer c={c} onPrivacy={() => setPrivacy(true)} />

      <DemoForm c={c} locale={locale} />

      <Dialog open={privacy} onOpenChange={setPrivacy}>
        <DialogContent className="demo-dialog">
          <DialogTitle>{c.privacy}</DialogTitle>

          <DialogDescription className="privacy-text">
            {c.privacyText}
            <br />
            <a
              href="mailto:almacapsula@gmail.com"
              className="text-primary underline"
            >
              almacapsula@gmail.com
            </a>
          </DialogDescription>

          <Button variant="outline" onClick={() => setPrivacy(false)}>
            {c.close}
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent className="lightbox">
          <DialogTitle>
            {lightbox !== null ? c.galleryItems[lightbox] : c.screen}
          </DialogTitle>

          <DialogDescription>{c.screenNote}</DialogDescription>

          {lightbox !== null && (
            <Image
              unoptimized
              src={`/screens/${screens[lightbox]}.webp`}
              alt={c.galleryItems[lightbox]}
              width={620}
              height={1265}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function MainPageBuilder() {
  return (
    <I18nextProvider i18n={i18n}>
      <Content />
    </I18nextProvider>
  );
}