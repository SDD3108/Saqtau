"use client";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/src/components/Logo/Logo";
const navIds = ["technology", "app", "progress", "team"];
export default function Footer({ c, onPrivacy }) {
  return (
    <footer className="wrap">
      <div className="footer-top">
        <div>
          <Logo />
          <p>{c.footer}</p>
        </div>
        <nav>
          {c.nav.map((n, i) => (
            <a key={n} href={`#${navIds[i]}`}>
              {n}
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
        <button onClick={() => onPrivacy()}>
          {c.privacy}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </footer>
  );
}
