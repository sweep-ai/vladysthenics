import { postBooking } from "@/data/copy";

export function PrepChecklist() {
  return (
    <section className="pb-block pb-checklist">
      <div className="pb-step">
        <span className="pb-step__pill">4</span>
        <div>
          <h3>{postBooking.checklistTitle}</h3>
          <ol>
            {postBooking.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
