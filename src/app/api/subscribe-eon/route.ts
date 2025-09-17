import { NextResponse } from "next/server";

async function subscribeToButtondown(email: string) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error("Missing BUTTONDOWN_API_KEY");

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      tags: ["Eon-Interest"], // tag this interest
    }),
    // Avoid caching
    cache: "no-store",
  });

  // Treat “already subscribed” as success too
  if (res.ok || res.status === 400 || res.status === 409) return true;

  const txt = await res.text().catch(() => "");
  throw new Error(`Buttondown error ${res.status}: ${txt}`);
}

export async function POST(req: Request) {
  try {
    // Accept form posts or JSON
    let email = "";
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await req.json();
      email = (json.email || "").toString().trim();
    } else {
      const form = await req.formData();
      email = (form.get("email") || "").toString().trim();
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    await subscribeToButtondown(email);

    // Redirect to a friendly thanks page on your site
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  } catch (err) {
    console.error(err);
    // Still send folks to /thanks so the UX is smooth
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  }
}
