import Image from "next/image";
import { hero } from "@/data/copy";
import { heroGrid } from "@/data/assets";

export function PageHero() {
  return (
    <section className="page-hero" aria-labelledby="hero-headline">
      <div className="page-hero__atmosphere" aria-hidden="true">
        {heroGrid.map((src, i) => (
          <Image key={`${src}-${i}`} src={src} alt="" width={400} height={500} className="page-hero__tile" />
        ))}
      </div>
      <div className="page-hero__content">
        <p className="page-hero__eyebrow">
          <span className="page-hero__rule" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1 id="hero-headline" className="page-hero__headline">
          {hero.headline.map((line, i) => (
            <span
              key={line}
              className={i === hero.accentLineIndex ? "page-hero__accent" : undefined}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="page-hero__subhead">{hero.subhead}</p>
      </div>
    </section>
  );
}