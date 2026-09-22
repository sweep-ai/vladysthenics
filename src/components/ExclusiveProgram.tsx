import Image from "next/image";
import { exclusive } from "@/data/copy";
import { exclusiveGrid, founder } from "@/data/assets";
import { ApplyButton } from "./ApplyButton";

export function ExclusiveProgram() {
  return (
    <section className="exclusive" aria-labelledby="exclusive-headline">
      <div className="exclusive__atmosphere" aria-hidden="true">
        <Image src={exclusiveGrid[0]} alt="" width={800} height={1000} loading="lazy" />
      </div>
      <div className="exclusive__content">
        <p className="exclusive__eyebrow">{exclusive.eyebrow}</p>
        <h2 id="exclusive-headline">{exclusive.headline}</h2>
        <p>{exclusive.body}</p>
        <ul>
          {exclusive.whoFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="exclusive__founder">
          <Image
            src={founder.secondary}
            alt=""
            fill
            sizes="260px"
            loading="lazy"
          />
        </div>
        <ApplyButton variant="inverse" />
      </div>
    </section>
  );
}