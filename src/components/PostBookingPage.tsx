"use client";

import { useEffect } from "react";
import { postBooking } from "@/data/copy";
import { postBookingPreface } from "@/data/videos";
import { consumeScheduleOnPostBooking } from "@/lib/conversionTracking";
import { trackSweepEvent } from "@/lib/sweep";
import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";
import { VSLPlayer } from "./VSLPlayer";
import { ConfirmAppointment } from "./post-booking/ConfirmAppointment";
import { FAQ } from "./post-booking/FAQ";
import { PrepChecklist } from "./post-booking/PrepChecklist";

export function PostBookingPage() {
  useEffect(() => {
    void consumeScheduleOnPostBooking();
    void trackSweepEvent("post_booking_view");
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="post-booking">
        <header className="post-booking__header">
          <h1>{postBooking.title}</h1>
          <p>
            Complete these <strong>MANDATORY</strong> steps to lock in your call. Skipping them is
            the #1 reason people no-show — don&apos;t leave your spot half-set.
          </p>
        </header>

        <section className="pb-vsl">
          <p className="pb-preface-label">{postBooking.prefaceLabel}</p>
          <VSLPlayer config={postBookingPreface} />
        </section>

        <section className="pb-block">
          <div className="pb-step">
            <span className="pb-step__pill">1</span>
            <div>
              <h3>{postBooking.step1.title}</h3>
              <p>{postBooking.step1.body}</p>
            </div>
          </div>
        </section>

        <ConfirmAppointment />
        <FAQ />
        <PrepChecklist />
      </main>
      <Footer />
    </>
  );
}
