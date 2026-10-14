"use client";
import { Globe2, MoveUpRight } from "lucide-react";
import { pilots } from "@/src/utils/content";
export default function ProgressSection({ c }) {
  return (
    <section className="section wrap progress-section" id="progress">
      <div className="section-heading">
        <p className="eyebrow">{c.tractionTag}</p>
        <div className="heading-row">
          <h2>{c.tractionTitle}</h2>
          <p>{c.tractionIntro}</p>
        </div>
      </div>
      <div className="global-heading">
        <Globe2 size={25} />
        <h3>{c.pilots}</h3>
        <span>GLOBAL CLINICAL PILOTS · 2026</span>
      </div>
      <div className="pilots-grid">
        {pilots.map(([city, org, coordinates], i) => (
          <article key={city}>
            <div className="pilot-top">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{c.country[i]}</span>
              <MoveUpRight size={18} />
            </div>
            <h3>
              {city}
              <span className="map-dot" />
            </h3>
            <p>{org}</p>
            <span className="coordinates">{coordinates}</span>
          </article>
        ))}
      </div>
      <p className="source-note">{c.pilotNote}</p>
      <div className="funding">
        <div className="funding-intro">
          <p className="eyebrow">BACKED BY BELIEF</p>
          <h2>{c.funding}</h2>
        </div>
        <div className="funding-data">
          <div className="funding-row">
            <div>
              <p>
                <span className="status-dot" />
                {c.grants}
              </p>
              <strong>$25,000</strong>
            </div>
            <div className="funding-logos">
              <span>MEDPRIX</span>
              <span>HealthBay</span>
              <span>+MediSense</span>
            </div>
          </div>
          <div className="funding-row pending-funding">
            <div>
              <p>
                <span className="pending-dot" />
                {c.progress}
              </p>
              <strong>$125,000</strong>
              <small>{c.progressNote}</small>
            </div>
            <div className="funding-logos">
              <span>WOMENA</span>
              <span>
                spade <small>ventures</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="partners">
        <p>{c.partners}</p>
        <div>
          <span>
            ASTANA IT
            <br />
            <b>UNIVERSITY</b>
          </span>
          <span>
            SEJONG
            <br />
            <b>HEART HOSPITAL</b>
          </span>
          <span className="serif-wordmark">
            MedHub <small>HAQ</small>
          </span>
          <span>
            HAYAT
            <br />
            <b>MEDICAL</b>
          </span>
          <span className="serif-wordmark">GT-MED</span>
          <span>
            TORONTO
            <br />
            <b>HEART CENTRE</b>
          </span>
        </div>
      </div>
    </section>
  );
}
