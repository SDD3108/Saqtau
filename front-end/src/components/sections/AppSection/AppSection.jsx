"use client";
import Image from "next/image";
import {
  ArrowUpRight,
  Activity,
  Heart,
  ScanFace,
  Check,
  Plus,
  AudioLines,
} from "lucide-react";
import { Button } from "@/src/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/ui/tabs";
import { screens } from "@/src/utils/content";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
export default function AppSection({ c, setLightbox }) {
  const { setDemoOpen } = useSiteStore();
  return (
    <section className="product-section" id="app">
      <div className="wrap section">
        <div className="section-heading">
          <p className="eyebrow">{c.productTag}</p>
          <div className="heading-row">
            <h2>{c.productTitle}</h2>
            <p>{c.productIntro}</p>
          </div>
        </div>
        <Tabs defaultValue="0" className="product-tabs">
          <TabsList>
            {c.tabs.map((tab, i) => (
              <TabsTrigger value={String(i)} key={tab}>
                {
                  [
                    <ScanFace key="s" />,
                    <Activity key="a" />,
                    <AudioLines key="w" />,
                    <Heart key="h" />,
                  ][i]
                }
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {c.features.map(([title, body, bullets], i) => (
            <TabsContent value={String(i)} key={i}>
              <div className="feature-content">
                <div className="feature-copy">
                  <span className="feature-number">
                    0{i + 1} / SAQTAU EXPERIENCE
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <ul>
                    {bullets.map((b) => (
                      <li key={b}>
                        <Check size={17} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="outline-btn"
                    onClick={() => setDemoOpen(true)}
                  >
                    {c.demo}
                    <ArrowUpRight />
                  </Button>
                </div>
                <div className="feature-phones">
                  <div className="feature-aura" />
                  <Image
                    unoptimized
                    src={`/screens/${["welcome", "home", "assistant", "invite"][i]}.webp`}
                    alt={c.tabs[i]}
                    width={620}
                    height={1265}
                    loading="lazy"
                    className="secondary-phone"
                  />
                  <Image
                    unoptimized
                    src={`/screens/${["scan", "history", "chat", "family"][i]}.webp`}
                    alt={c.tabs[i]}
                    width={620}
                    height={1265}
                    loading="lazy"
                    className="primary-phone"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="screen-note">{c.screenNote}</p>
        <div className="gallery-heading">
          <h3>{c.gallery}</h3>
          <span>01 — 10</span>
        </div>
        <div className="screen-gallery">
          {screens.map((s, i) => (
            <button
              key={s}
              onClick={() => setLightbox(i)}
              aria-label={`${c.screen}: ${c.galleryItems[i]}`}
            >
              <div>
                <Image
                  unoptimized
                  src={`/screens/${s}.webp`}
                  alt={c.galleryItems[i]}
                  loading="lazy"
                  width={620}
                  height={1265}
                />
                <span className="gallery-plus">
                  <Plus />
                </span>
              </div>
              <span>
                {String(i + 1).padStart(2, "0")}
                <strong>{c.galleryItems[i]}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
