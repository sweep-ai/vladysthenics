import Image from "next/image";
import { finalCta, manifesto } from "@/data/copy";
import { founder } from "@/data/assets";
import { ApplyButton } from "./ApplyButton";

export function FounderManifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto__copy">
        <p className="manifesto__tagline" id="manifesto-title">
          {manifesto.tagline}
        </p>
        <div className="manifesto__lines">
          {manifesto.lines.map((line) => (
            <p
              key={line.text}
              className={line.emphasize ? "manifesto__line is-emphasis" : "manifesto__line"}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
      <div className="manifesto__photo">
        <Image
          src={founder.primary}
          alt={founder.primaryAlt}
          fill
          sizes="(max-width: 720px) 100vw, 720px"
          loading="lazy"
        />
        <div className="manifesto__overlay">
          <h2 id="final-cta-headline">{finalCta.headline}</h2>
          <p>{finalCta.subhead}</p>
          <ApplyButton variant="inverse" />
        </div>
      </div>
    </section>
  );
}
