"use client";

import { ArrowUpRight } from "lucide-react";
import Logo from "@/src/components/Logo/Logo";

const navIds = ["technology", "app", "progress", "team", "contact"];

export default function Footer({ c, onPrivacy }) {
  return (
    <footer className="wrap">
      <div className="footer-top">
        <div>
          <Logo />
          <p>{c.footer}</p>
        </div>

        <nav>
          {c.nav.map((label, i) => (
            <a key={navIds[i]} href={navIds[i] == "contact" ? "/support" : `#${navIds[i]}`}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 SaqtauAI ·{" "}
          <a
            href="https://www.instagram.com/saqtau.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>
        </span>

        <span>Astana, Kazakhstan · {c.footerNote}</span>

        <button type="button" onClick={onPrivacy}>
          {c.privacy}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </footer>
  );
}