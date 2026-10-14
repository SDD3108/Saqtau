"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/src/ui/button";
import { advisors } from "@/src/utils/content";
export default function TeamSection({ c }) {
  const [allAdvisors, setAllAdvisors] = useState(false);
  return (
    <section className="section wrap team-section" id="team">
      <div className="section-heading">
        <p className="eyebrow">{c.teamTag}</p>
        <div className="heading-row">
          <h2>{c.teamTitle}</h2>
          <p>{c.teamIntro}</p>
        </div>
      </div>
      <div className="founders">
        {[
          ["yerkin", "Yerkin Sayanur", c.founder, c.founderBio],
          ["nikolai", "Tcoi Nikolai", c.cofounder, c.cofounderBio],
        ].map(([photo, name, role, bio]) => (
          <article key={name}>
            <Image
              unoptimized
              src={`/${photo}.png`}
              alt={name}
              width={350}
              height={350}
              loading="lazy"
            />
            <div>
              <span>{role}</span>
              <h3>{name}</h3>
              <p>{bio}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="advisors-heading">
        <h3>{c.advisors}</h3>
        <Button variant="ghost" onClick={() => setAllAdvisors(!allAdvisors)}>
          {allAdvisors ? c.lessAdvisors : c.allAdvisors}
          <Plus className={allAdvisors ? "rotate-45" : ""} />
        </Button>
      </div>
      <div className="advisors">
        {advisors.slice(0, allAdvisors ? 12 : 6).map(([name, org, role]) => (
          <article key={name}>
            <span>{role}</span>
            <h4>{name}</h4>
            <p>{org}</p>
          </article>
        ))}
      </div>
      <p className="source-note">{c.advisorNote}</p>
    </section>
  );
}
