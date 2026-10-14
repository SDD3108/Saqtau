"use client";
import { Activity, ScanFace, ShieldCheck } from "lucide-react";
import Wave from "@/src/components/Wave/Wave";
export default function TechnologySection({ c }) {
  return (
    <section className="section wrap technology" id="technology">
      <div className="section-heading">
        <p className="eyebrow">{c.techTag}</p>
        <div className="heading-row">
          <h2>{c.techTitle}</h2>
          <p>{c.techIntro}</p>
        </div>
      </div>
      <div className="technology-grid">
        <div className="signal-panel">
          <div className="panel-top">
            <span>
              <ScanFace size={17} /> REMOTE PHOTOPLETHYSMOGRAPHY
            </span>
            <span className="status-dot" />
          </div>
          <div className="face-diagram">
            <div className="scan-corner c1" />
            <div className="scan-corner c2" />
            <div className="scan-corner c3" />
            <div className="scan-corner c4" />
            <svg viewBox="0 0 220 250" aria-hidden="true">
              <defs>
                <radialGradient id="faceGradient">
                  <stop stopColor="#ba95ff" stopOpacity=".35" />
                  <stop offset="1" stopColor="#9274db" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="dots"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#c8b3f2" />
                </pattern>
                <mask id="headMask">
                  <path
                    d="M110 18C50 18 35 65 45 125C48 156 64 188 84 202L85 226L50 245H170L135 226L136 202C156 188 172 156 175 125C185 65 170 18 110 18Z"
                    fill="white"
                  />
                </mask>
              </defs>
              <ellipse
                cx="110"
                cy="120"
                rx="110"
                ry="120"
                fill="url(#faceGradient)"
              />
              <rect
                width="220"
                height="250"
                fill="url(#dots)"
                mask="url(#headMask)"
              />
              <path
                d="M57 88L85 76L110 100L137 76L163 88M57 88L65 145L110 170L155 145L163 88M85 76L90 128L110 142L130 128L137 76M90 128L110 100L130 128M65 145L90 128M155 145L130 128M110 170L110 198"
                stroke="#c7a5ff"
                strokeOpacity=".6"
                fill="none"
              />
              {[
                [57, 88],
                [85, 76],
                [110, 100],
                [137, 76],
                [163, 88],
                [65, 145],
                [110, 170],
                [155, 145],
                [90, 128],
                [130, 128],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#dabfff" />
              ))}
            </svg>
            <div className="scan-line" />
          </div>
          <div className="wave-panel">
            <span>OPTICAL SIGNAL → PULSE WAVE</span>
            <Wave />
          </div>
          <div className="metric-list">
            {["HR", "HRV", "RR"].map((m, i) => (
              <div key={m}>
                <span>{m}</span>
                <p>{c.metrics[i]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="steps">
          {c.steps.map(([title, body], i) => (
            <div className="step" key={title}>
              <span className="step-no">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
          <div className="research-note">
            <Activity size={22} />
            <div>
              <h4>{c.research}</h4>
              <p>{c.researchBody}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="wellness-note">
        <ShieldCheck size={17} />
        {c.wellness}
      </p>
    </section>
  );
}
