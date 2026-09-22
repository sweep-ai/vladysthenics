"use client";

import { useEffect } from "react";
import { booking } from "@/data/copy";
import { consumeLeadOnBooking } from "@/lib/conversionTracking";
import { trackSweepEvent } from "@/lib/sweep";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { Footer } from "./Footer";
// import { ScrollingBanner } from "./ScrollingBanner";
import { SiteHeader } from "./SiteHeader";

export function BookingPage() {
  useEffect(() => {
    void consumeLeadOnBooking();
    void trackSweepEvent("booking_page_view");
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="booking">
        <header className="booking__header">
          <p className="booking__label">{booking.label}</p>
          <h1>{booking.headline}</h1>
          <p>{booking.subhead}</p>
        </header>
        <CalendlyEmbed />
        {/* <ScrollingBanner label="While you pick a time — proof placeholders" /> */}
      </main>
      <Footer />
    </>
  );
}