"use client";
import { ArrowUpRight, ArrowRight, Smartphone } from "lucide-react";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
import useCountdown, { launchAt } from "@/src/hooks/useCountdown";
export default function Countdown({ c }) {
  const now = useCountdown();
  const diff = now ? Math.max(0, Math.floor(launchAt / 1000) - now) : null;
  const values =
    diff === null
      ? ["—", "—", "—", "—"]
      : [
          Math.floor(diff / 86400),
          Math.floor(diff / 3600) % 24,
          Math.floor(diff / 60) % 60,
          diff % 60,
        ].map((v) => String(v).padStart(2, "0"));
  return (
    <section className="launch" aria-label={c.launch}>
      <div className="launch-heading">
        <p className="eyebrow">
          <span className="status-dot" />
          {c.launch}
        </p>
        <p>
          {c.launchDate} <ArrowUpRight size={16} />
        </p>
      </div>
      {diff === 0 ? (
        <div className="launched">
          <h2>{c.released}</h2>
          <p>{c.releasedSub}</p>
        </div>
      ) : (
        <div className="countdown">
          {values.map((n, i) => (
            <div className="count-unit" key={i}>
              <span className="count-number" aria-label={n}>
                {Array.from(n).map((digit, index) => (
                  <span
                    className="count-digit"
                    aria-hidden="true"
                    key={`${index}-${digit}`}
                  >
                    {digit}
                  </span>
                ))}
              </span>
              <span className="count-label">{c.units[i]}</span>
            </div>
          ))}
        </div>
      )}
      <div className="launch-bottom">
        <span>
          <Smartphone size={16} /> iOS & Android
        </span>
        <button onClick={() => useSiteStore.getState().setDemoOpen(true)}>
          {c.launchCta}
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
