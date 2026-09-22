"use client";

import { useEffect } from "react";
import { funnelVsl } from "@/data/videos";
import { trackSweepEvent } from "@/lib/sweep";
import { ApplicationForm } from "./ApplicationForm";
import { ExclusiveProgram } from "./ExclusiveProgram";
import { Footer } from "./Footer";
import { FounderManifesto } from "./FounderManifesto";
import { PageHero } from "./PageHero";
import { RealClientStories } from "./RealClientStories";
// import { ScrollingBanner } from "./ScrollingBanner";
import { SiteHeader } from "./SiteHeader";
import { StickyApplyBar } from "./StickyApplyBar";
import { VSLPlayer } from "./VSLPlayer";

export function FunnelShell() {
  useEffect(() => {
    void trackSweepEvent("quiz_page_view", { page_id: "funnel_home" });

    if (window.location.hash === "#application-form") {
      document.getElementById("application-form")?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="funnel">
        <PageHero />
        <VSLPlayer config={funnelVsl} id="vsl" />
        <ApplicationForm />
        {/* <ScrollingBanner /> */}
        <RealClientStories />
        <ExclusiveProgram />
        <FounderManifesto />
      </main>
      <Footer />
      <StickyApplyBar />
    </>
  );
}