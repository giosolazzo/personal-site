import { NextResponse } from "next/server";

async function subscribeToButtondown(email: string, referer?: string | null) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error("Missing BUTTONDOWN_API_KEY");

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      // If your Buttondown account uses API versions, uncomment next line and set the version you use:
      // "X-Buttondown-API-Version": "2025-06-01",
    },
    body: JSON.stringify({
      // Buttondown expects email_address. We also include email for safety.
      email_address: email,
      email,
      tags: ["Eon-Interest"],
      referrer_url: referer || undefined,
      notes: "Signup via giuseppesolazzo.com/eon",
    }),
    cache: "no-store",
  });

  if (res.ok || res.status === 201) return true;

  // Treat “already exists / already subscribed” as success
  if (res.status === 400 || res.status === 409 || res.status === 422) {
    let msg = "";
    try {
      const j = await res.json();
      msg = JSON.stringify(j);
      if (msg.includes("already") || msg.includes("exists")) return true;
    } catch {}
    throw new Error(`Buttondown error ${res.status}: ${msg || (await res.text().catch(() => ""))}`);
  }

  throw new Error(`Buttondown error ${res.status}: ${await res.text().catch(() => "")}`);
}

export async function POST(req: Request) {
  try {
    // Accept form posts or JSON
    let email = "";
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const json = await req.json();
      email = (json.email || json.email_address || "").toString().trim();
    } else {
      const form = await req.formData();
      email = (form.get("email") || form.get("email_address") || "").toString().trim();
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    await subscribeToButtondown(email, req.headers.get("referer"));

    // Always send users to your thanks page
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  } catch (err) {
    console.error(err);
    // Still redirect to thanks (silent failure UX)
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  }
}
