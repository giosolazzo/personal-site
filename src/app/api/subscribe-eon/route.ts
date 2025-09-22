import { NextResponse } from "next/server";

// Read src/utm params from the Referer URL (the page the form was on)
function parseQuery(url?: string | null) {
  try {
    if (!url) return {};
    const u = new URL(url);
    const q = new URLSearchParams(u.search);
    const get = (k: string) => q.get(k) || undefined;
    return {
      src: get("src"),
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
    };
  } catch {
    return {};
  }
}

async function subscribeToButtondown(email: string, opts: {
  referer?: string | null;
  country?: string | null;
}) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error("Missing BUTTONDOWN_API_KEY");

  const qp = parseQuery(opts.referer);

  // Build tags for easy segmentation
  const tags = [
    "Eon-Interest",
    qp.src ? `src-${qp.src}` : undefined,
    qp.utm_campaign ? `utm-${qp.utm_campaign}` : undefined,
    opts.country ? `ctry-${opts.country}` : undefined,
  ].filter(Boolean) as string[];

  // Build a simple notes string for quick searching
  const notes = [
    qp.src ? `src=${qp.src}` : null,
    qp.utm_source ? `utm_source=${qp.utm_source}` : null,
    qp.utm_medium ? `utm_medium=${qp.utm_medium}` : null,
    qp.utm_campaign ? `utm_campaign=${qp.utm_campaign}` : null,
    opts.country ? `country=${opts.country}` : null,
    opts.referer ? `ref=${opts.referer}` : null,
  ].filter(Boolean).join("; ");

  const payload = {
    email_address: email,
    email,
    tags,
    referrer_url: opts.referer || undefined,
    notes: notes || undefined,
  };

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      // "X-Buttondown-API-Version": "2025-06-01", // uncomment if you set a specific API version in Buttondown
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (res.ok || res.status === 201) return true;

  // Common “already exists / similar” responses — treat as success
  if ([400, 409, 422].includes(res.status)) {
    const txt = await res.text().catch(() => "");
    if (/already|exists/i.test(txt)) return true;
    throw new Error(`Buttondown error ${res.status}: ${txt}`);
  }

  throw new Error(`Buttondown error ${res.status}: ${await res.text().catch(() => "")}`);
}

export async function POST(req: Request) {
  try {
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

    await subscribeToButtondown(email, {
      referer: req.headers.get("referer"),
      country: req.headers.get("x-vercel-ip-country"),
    });

    // Thank-you screen
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  } catch (err) {
    console.error(err);
    // Still send them to thanks so the UX is smooth
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  }
}
