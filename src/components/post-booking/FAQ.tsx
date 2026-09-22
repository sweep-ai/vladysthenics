import { faq, postBooking } from "@/data/copy";

export function FAQ() {
  return (
    <section className="pb-block pb-faq">
      <div className="pb-step">
        <span className="pb-step__pill">3</span>
        <div>
          <h3>{postBooking.faqTitle}</h3>
          <div className="pb-faq__list">
            {faq.map((item) => (
              <details key={item.q} className="pb-faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
