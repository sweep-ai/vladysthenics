import { postBooking } from "@/data/copy";

export function ConfirmAppointment() {
  return (
    <section className="pb-block">
      <div className="pb-step">
        <span className="pb-step__pill">2</span>
        <div>
          <h3>{postBooking.step2.title}</h3>
          <p>{postBooking.step2.body}</p>
        </div>
      </div>
      <figure className="pb-rsvp">
        <p className="pb-rsvp__meet">
          <span className="pb-rsvp__pin" aria-hidden="true" />
          Google Meet (instructions in description)
        </p>
        <div className="pb-rsvp__cal">
          <span className="pb-rsvp__cal-icon" aria-hidden="true">
            31
          </span>
          <div>
            <p className="pb-rsvp__cal-label">On your Google Calendar</p>
            <p className="pb-rsvp__conflict">Conflict with Work at 8:00 AM – 6:00 PM</p>
          </div>
        </div>
        <div className="pb-rsvp__actions" aria-hidden="true">
          <span>Yes</span>
          <span>No</span>
          <span>Maybe</span>
          <span className="is-light">Directions</span>
          <span className="is-more">⋮</span>
        </div>
        <figcaption className="visually-hidden">
          RSVP Yes on the Google Calendar invite
        </figcaption>
      </figure>
    </section>
  );
}
