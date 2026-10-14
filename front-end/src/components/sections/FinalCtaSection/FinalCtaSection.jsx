"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/src/ui/button";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
import Wave from "@/src/components/Wave/Wave";
export default function FinalCtaSection({ c }) {
  const { setDemoOpen } = useSiteStore();
  return (
    <section className="final-cta wrap">
      <div className="cta-glow" />
      <Image unoptimized src="/logo.svg" alt="" width={64} height={60} />
      <h2>{c.ctaTitle}</h2>
      <p>{c.ctaBody}</p>
      <Button className="primary-btn" onClick={() => setDemoOpen(true)}>
        {c.demo}
        <ArrowUpRight />
      </Button>
      <span className="cta-date">20.10.2026 / ASTANA</span>
      <Wave className="cta-wave" />
    </section>
  );
}
