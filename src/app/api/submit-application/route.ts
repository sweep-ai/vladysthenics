import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    const webhook = process.env.ZAPIER_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error("[zapier]", res.status, await res.text());
        return NextResponse.json({ error: "Lead webhook failed." }, { status: 502 });
      }
    } else {
      console.info("[submit-application] accepted (no ZAPIER_WEBHOOK_URL)", {
        email,
        leadStatus: body.leadStatus,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submit-application]", err);
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
}