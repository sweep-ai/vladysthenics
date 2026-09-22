"use client";

import { useEffect, useRef, useState } from "react";
import { clientStories } from "@/data/copy";
import { clientTestimonials } from "@/data/assets";

export function RealClientStories() {
  return (
    <section className="client-stories" aria-labelledby="client-stories-title">
      <h2 id="client-stories-title" className="client-stories__title">
        {clientStories.title}
      </h2>
      <p className="client-stories__subhead">{clientStories.subhead}</p>
      <ul className="client-stories__list">
        {clientTestimonials.map((item) => (
          <li key={item.src} className="client-stories__item">
            <LazyClientVideo
              src={item.src}
              name={item.name}
              result={item.result}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

type VideoProps = {
  src: string;
  name: string;
  result: string;
};

function LazyClientVideo({ src, name, result }: VideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="client-stories__figure" ref={ref}>
      <div className="client-stories__video-wrap">
        {near ? (
          <video
            className="client-stories__video"
            src={src}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="client-stories__video-placeholder" aria-hidden="true" />
        )}
      </div>
      <figcaption className="client-stories__caption">
        <span className="client-stories__name">{name}</span>
        <span className="client-stories__result">{result}</span>
      </figcaption>
    </figure>
  );
}