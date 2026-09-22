"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fireScheduleConversion } from "@/lib/conversionTracking";
import { trackSweepEvent } from "@/lib/sweep";

const DEFAULT_CALENDLY =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/vlesik34/15min";

type Props = {
  url?: string;
};

export function CalendlyEmbed({ url = DEFAULT_CALENDLY }: Props) {
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    const scriptId = "calendly-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    function onMessage(e: MessageEvent) {
      if (
        typeof e.data === "object" &&
        e.data?.event === "calendly.event_scheduled" &&
        !fired.current
      ) {
        fired.current = true;
        void (async () => {
          await fireScheduleConversion();
          await trackSweepEvent("call_booked", { provider: "calendly" });
          router.replace("/post-booking");
        })();
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  const isPlaceholder = url.includes("placeholder");

  return (
    <div className="calendly">
      {isPlaceholder ? (
        <div className="calendly__placeholder">
          <p>Calendly embed placeholder</p>
          <p>
            Set <code>NEXT_PUBLIC_CALENDLY_URL</code> to your inline scheduling link.
          </p>
          <button
            type="button"
            className="apply-btn"
            onClick={() => {
              void (async () => {
                await fireScheduleConversion();
                router.replace("/post-booking");
              })();
            }}
          >
            Simulate booking (dev)
          </button>
        </div>
      ) : (
        <div
          className="calendly-inline-widget"
          data-url={`${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1`}
          style={{ minWidth: "320px", height: "700px" }}
        />
      )}
    </div>
  );
}