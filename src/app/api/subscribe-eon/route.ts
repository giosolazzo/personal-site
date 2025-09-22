import { NextResponse } from "next/server";

// Pull src/utm from the page the form was submitted on (Referer)
function parseQueryFromReferer(referer?: string | null) {
  try {
    if (!referer) return {};
    const u = new URL(referer);
    const q = u.searchParams;
    const get = (k: string) => q.get(k) || undefined;
    return {
      src: get("src"),
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      ref: referer,
    };
  } catch {
    return {};
  }
}

async function subscribeToButtondown(email: string, opts: { referer?: string | null; country?: string | null }) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error("Missing BUTTONDOWN_API_KEY");

  const qp = parseQueryFromReferer(opts.referer);

  // Tags: easy segmentation in Buttondown
  const tags = [
    "Eon-Interest",
    qp.src ? `src-${qp.src}` : undefined,
    qp.utm_campaign ? `utm-${qp.utm_campaign}` : undefined,
    opts.country ? `ctry-${opts.country}` : undefined,
  ].filter(Boolean) as string[];

  // Notes: free-text searchable audit trail
  const notes = [
    qp.src ? `src=${qp.src}` : null,
    qp.utm_source ? `utm_source=${qp.utm_source}` : null,
    qp.utm_medium ? `utm_medium=${qp.utm_medium}` : null,
    qp.utm_campaign ? `utm_campaign=${qp.utm_campaign}` : null,
    opts.country ? `country=${opts.country}` : null,
    qp.ref ? `ref=${qp.ref}` : null,
  ]
    .filter(Boolean)
    .join("; ");

  // Metadata: shows up in the subscriber’s “Metadata” panel
  const metadata = {
    src: qp.src || null,
    utm_source: qp.utm_source || null,
    utm_medium: qp.utm_medium || null,
    utm_campaign: qp.utm_campaign || null,
    country: opts.country || null,
  };

  const payload = {
    email_address: email,
    email,
    tags,
    metadata,
    referrer_url: opts.referer || undefined,
    notes: notes || undefined,
  };

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      // If you’ve pinned an API version in Buttondown, uncomment the line below and match it:
      // "X-Buttondown-API-Version": "2025-06-01",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (res.ok || res.status === 201) return true;

  // Treat “already exists” as success so UX stays smooth
  if ([400, 409, 422].includes(res.status)) {
    const text = await res.text().catch(() => "");
    if (/already|exists/i.test(text)) return true;
    throw new Error(`Buttondown error ${res.status}: ${text}`);
  }

  throw new Error(`Buttondown error ${res.status}: ${await res.text().catch(() => "")}`);
}

export async function POST(req: Request) {
  try {
    // Accept JSON and form posts
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

    // Always send users to the thank-you page
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  } catch (err) {
    console.error(err);
    // Keep UX smooth even on API error
    return NextResponse.redirect(new URL("/eon/thanks", req.url), 303);
  }
}
