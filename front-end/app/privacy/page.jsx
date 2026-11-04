import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { privacyCopy, privacyEmail, privacyLanguages } from "@/src/feature/Privacy/content";
import { privacyHref, privacyLocale } from "@/src/feature/Privacy/links";

export async function generateMetadata({ searchParams }) {
  const locale = privacyLocale((await searchParams)?.lang);
  const t = privacyCopy[locale];
  return {
    title: `${t.title} | Saqtau AI`,
    description: t.description,
    alternates: {
      canonical: privacyHref(locale),
      languages: { ru: "/privacy", en: "/privacy?lang=en", kk: "/privacy?lang=kk" },
    },
    // Preserve the previous policy's indexing setting until the text is approved.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${t.title} | Saqtau AI`, description: t.description,
      url: privacyHref(locale), type: "website",
    },
  };
}

export default async function PrivacyPage({ searchParams }) {
  const lang = privacyLocale((await searchParams)?.lang);
  const t = privacyCopy[lang];
  const supportHref = lang === "ru" ? "/support" : `/support?lang=${lang}`;
  return (
    <main lang={lang} className="mx-auto min-h-screen max-w-4xl px-6 py-10 text-foreground sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft size={16} aria-hidden="true" />{t.home}
        </Link>
        <nav aria-label={t.language} className="flex flex-wrap gap-2">
          {Object.entries(privacyLanguages).map(([code, label]) => (
            <Link key={code} href={privacyHref(code)} lang={code} hrefLang={code}
              aria-current={lang === code ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === code ? "border-primary bg-primary/10 font-medium text-primary" : "border-border text-muted-foreground hover:text-primary"}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <header className="mt-12 border-b border-border pb-8 sm:mt-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          <ShieldCheck size={18} aria-hidden="true" />Saqtau AI
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.description}</p>
        <p className="mt-4 text-sm text-muted-foreground"><time dateTime="2026-11-04">{t.updated}</time></p>
      </header>
      <nav aria-label={t.contents} className="mt-8 rounded-2xl border border-border p-5 sm:p-6">
        <h2 className="font-semibold">{t.contents}</h2>
        <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          {t.sections.map((section) => (
            <li key={section.id}><a href={`#${section.id}`} className="text-muted-foreground hover:text-primary hover:underline">{section.title}</a></li>
          ))}
        </ol>
      </nav>
      <article className="mt-12 space-y-10">
        {t.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
            <h2 id={`${section.id}-title`} className="text-xl font-semibold sm:text-2xl">{section.title}</h2>
            <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </article>
      <section aria-labelledby="privacy-contact" className="mt-12 rounded-2xl border border-border bg-primary/5 p-6 sm:p-8">
        <h2 id="privacy-contact" className="text-xl font-semibold">{t.contactTitle}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t.contactText}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <a href={`mailto:${privacyEmail}`} className="inline-flex items-center gap-2 break-all font-medium text-primary hover:underline">
            <Mail size={18} aria-hidden="true" className="shrink-0" />{privacyEmail}
          </a>
          <Link href={supportHref} className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
            {t.contactForm}<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <footer className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">© 2026 Saqtau AI · {t.title}</footer>
    </main>
  );
}
