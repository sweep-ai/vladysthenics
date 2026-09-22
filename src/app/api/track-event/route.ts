import { createHash } from "crypto";
import { NextResponse } from "next/server";

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      eventName?: string;
      eventId?: string;
      email?: string;
      phone?: string;
      name?: string;
      fbp?: string;
      fbc?: string;
      [key: string]: unknown;
    };

    if (!body.eventName || !body.eventId) {
      return NextResponse.json({ error: "eventName and eventId required" }, { status: 400 });
    }

    const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const token = process.env.META_CAPI_TOKEN;

    if (pixelId && token) {
      const userData: Record<string, unknown> = {};
      if (body.email) userData.em = [sha256(body.email)];
      if (body.phone) userData.ph = [sha256(body.phone.replace(/\D/g, ""))];
      if (body.fbp) userData.fbp = body.fbp;
      if (body.fbc) userData.fbc = body.fbc;

      const payload = {
        data: [
          {
            event_name: body.eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: body.eventId,
            action_source: "website",
            user_data: userData,
          },
        ],
      };

      const res = await fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        console.error("[meta-capi]", res.status, await res.text());
      }
    } else {
      console.info("[track-event]", body.eventName, body.eventId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track-event]", err);
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
}