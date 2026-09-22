import { getSessionId, getVisitorId } from "./identity";

export const SWEEP_FUNNEL_ID =
  process.env.NEXT_PUBLIC_SWEEP_FUNNEL_ID || "974a4190-fa35-4308-af89-bc8b8f8bb719";

const API_BASE = process.env.NEXT_PUBLIC_SWEEP_API_BASE_URL;
const FUNNEL_ID = SWEEP_FUNNEL_ID;

export async function trackSweepEvent(
  eventName: string,
  metadata?: Record<string, unknown>,
  idempotencyKey?: string,
) {
  if (!API_BASE || !FUNNEL_ID) return;
  try {
    await fetch(`${API_BASE}/funnels/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funnel_id: FUNNEL_ID,
        event_name: eventName,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        metadata,
        ...(idempotencyKey ? { idempotency_key: idempotencyKey } : {}),
      }),
    });
  } catch (err) {
    console.error("[sweep event]", err);
  }
}

export async function submitSweepLead(payload: Record<string, unknown>) {
  if (!API_BASE || !FUNNEL_ID) return;
  try {
    await fetch(`${API_BASE}/funnels/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funnel_id: FUNNEL_ID,
        source: "quiz",
        ...payload,
      }),
    });
  } catch (err) {
    console.error("[sweep lead]", err);
  }
}