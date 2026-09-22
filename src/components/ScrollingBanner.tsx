import Image from "next/image";
import { proofPhotos } from "@/data/assets";

type Props = {
  label?: string;
};

export function ScrollingBanner({ label = "Skill progress — placeholders until client media is ready" }: Props) {
  const loop = [...proofPhotos, ...proofPhotos];
  return (
    <section className="proof-banner" aria-label={label}>
      <p className="proof-banner__label">{label}</p>
      <div className="proof-banner__track-wrap">
        <div className="proof-banner__track">
          {loop.map((src, i) => (
            <div className="proof-banner__item" key={`${src}-${i}`}>
              <Image src={src} alt="" width={220} height={140} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}