"use client";
import { useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/src/ui/button";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
import Logo from "@/src/components/Logo/Logo";
const navIds = ["technology", "app", "progress", "team"];
function subscribeScroll(cb) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
export default function Header({ c, locale }) {
  const { i18n: translation } = useTranslation();
  const { setDemoOpen } = useSiteStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const fixed = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 160,
    () => false,
  );
  function languagePicker() {
    return (
      <div className="languages" aria-label="Language">
        {["ru", "en", "kk"].map((l) => (
          <button
            key={l}
            lang={l}
            aria-pressed={locale === l}
            onClick={() => translation.changeLanguage(l)}
          >
            {l === "kk" ? "KZ" : l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }
  function header(compact = false) {
    return (
      <>
        <Logo />
        {!compact && (
          <nav className="desktop-nav">
            {c.nav.map((n, i) => (
              <a href={`#${navIds[i]}`} key={n}>
                {n}
              </a>
            ))}
          </nav>
        )}
        <div className="header-actions">
          {languagePicker()}
          <Button
            className="primary-btn header-demo"
            onClick={() => setDemoOpen(true)}
          >
            {c.demo}
            <ArrowUpRight />
          </Button>
          {!compact && (
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label={c.menu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu />
            </Button>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <a href="#main" className="skip-link">
        {locale === "en"
          ? "Skip to content"
          : locale === "kk"
            ? "Мазмұнға өту"
            : "Перейти к содержимому"}
      </a>
      <div id="top" />
      <header className="main-header wrap">{header()}</header>
      {mobileOpen && (
        <nav className="mobile-nav">
          {c.nav.map((n, i) => (
            <a
              href={`#${navIds[i]}`}
              key={n}
              onClick={() => setMobileOpen(false)}
            >
              {n}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
      {fixed && <header className="floating-header">{header(true)}</header>}
    </>
  );
}
