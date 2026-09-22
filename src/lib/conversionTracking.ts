import { generateEventId, getSessionId, getVisitorId } from "./identity";

const LEAD_EVENT_KEY = "vlady_lead_event_id";
const SCHEDULE_EVENT_KEY = "vlady_schedule_event_id";
const APPLICANT_KEY = "vlady_applicant";

export type ApplicantPii = {
  name: string;
  email: string;
  phone: string;
};

export function storeApplicant(pii: ApplicantPii) {
  sessionStorage.setItem(APPLICANT_KEY, JSON.stringify(pii));
}

export function readApplicant(): ApplicantPii | null {
  try {
    const raw = sessionStorage.getItem(APPLICANT_KEY);
    return raw ? (JSON.parse(raw) as ApplicantPii) : null;
  } catch {
    return null;
  }
}

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

async function postTrackEvent(payload: Record<string, unknown>) {
  try {
    await fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[track-event]", err);
  }
}

export async function trackMetaDual(
  eventName: "PageView" | "Lead" | "Schedule",
  eventId: string,
  extra?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, {}, { eventID: eventId });
  }

  const applicant = readApplicant();
  await postTrackEvent({
    eventName,
    eventId,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    fbp: cookie("_fbp"),
    fbc: cookie("_fbc"),
    email: applicant?.email,
    phone: applicant?.phone,
    name: applicant?.name,
    ...extra,
  });
}

export async function fireLeadConversion() {
  let eventId = sessionStorage.getItem(LEAD_EVENT_KEY);
  if (!eventId) {
    eventId = generateEventId("lead");
    sessionStorage.setItem(LEAD_EVENT_KEY, eventId);
  }
  await trackMetaDual("Lead", eventId);
  return eventId;
}

export async function consumeLeadOnBooking() {
  const eventId = sessionStorage.getItem(LEAD_EVENT_KEY);
  if (!eventId) return;
  await trackMetaDual("Lead", eventId, { source: "booking_landing" });
}

export async function fireScheduleConversion() {
  let eventId = sessionStorage.getItem(SCHEDULE_EVENT_KEY);
  if (!eventId) {
    eventId = generateEventId("schedule");
    sessionStorage.setItem(SCHEDULE_EVENT_KEY, eventId);
  }
  await trackMetaDual("Schedule", eventId);
  return eventId;
}

export async function consumeScheduleOnPostBooking() {
  const eventId = sessionStorage.getItem(SCHEDULE_EVENT_KEY);
  if (!eventId) return;
  await trackMetaDual("Schedule", eventId, { source: "post_booking_landing" });
}

export async function trackPageView(path: string) {
  const eventId = generateEventId("pv");
  await trackMetaDual("PageView", eventId, { path });
}