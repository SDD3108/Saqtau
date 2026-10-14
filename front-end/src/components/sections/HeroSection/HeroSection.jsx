"use client";
import Image from "next/image";
import SignalField from "../../SignalField/SignalField";
import { ArrowUpRight, ArrowRight, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/src/ui/button";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
export default function HeroSection({ c }) {
  const { setDemoOpen } = useSiteStore();
  return (
    <section className="hero wrap">
      <div className="hero-glow" />
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          {c.eyebrow}
        </p>
        <h1>
          {c.hero[0]}
          <br />
          <span>{c.hero[1]}</span>
        </h1>
        <p className="hero-description">{c.intro}</p>
        <div className="hero-buttons">
          <Button className="primary-btn" onClick={() => setDemoOpen(true)}>
            {c.demo}
            <ArrowUpRight />
          </Button>
          <a href="#app" className="text-link">
            {c.explore}
            <ArrowRight size={17} />
          </a>
        </div>
        <p className="hero-micro">
          <ShieldCheck size={16} />
          {c.micro}
        </p>
      </div>
      <div className="hero-visual">
        <SignalField />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="visual-cross cross-one">+</span>
        <span className="visual-cross cross-two">+</span>
        <div className="signal-label">
          <span className="status-dot" /> rPPG · CONTACTLESS
        </div>
        <Image
          unoptimized
          className="hero-phone back-phone"
          src="/screens/home.webp"
          alt={c.galleryItems[1]}
          width={620}
          height={1265}
          fetchPriority="high"
        />
        <Image
          unoptimized
          className="hero-phone front-phone"
          src="/screens/scan.webp"
          alt={c.galleryItems[2]}
          width={620}
          height={1264}
          fetchPriority="high"
        />
        <div className="signal-chip">
          <div className="signal-icon">
            <Activity size={20} />
          </div>
          <div>
            <strong>{c.scan}</strong>
            <span>{c.scanSub}</span>
          </div>
          <span className="signal-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <span className="visual-caption">SAQTAU AI / YOUR DAILY CHECK-IN</span>
      </div>
      <div className="hero-baseline">
        <span>PREVENTIVE CARE, REIMAGINED.</span>
        <a href="#technology" aria-label={c.nav[0]}>
          SCROLL TO EXPLORE <span>↓</span>
        </a>
      </div>
    </section>
  );
}
