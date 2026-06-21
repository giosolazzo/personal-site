import { NextResponse } from "next/server";

function parseQueryFromReferer(referer?: string | null) {
  try {
    if (!referer) return {};
    const url = new URL(referer);
    const query = url.searchParams;
    const get = (key: string) => query.get(key) || undefined;
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

function buildMetadata(obj: Record<string, string | undefined | null>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && value.length) out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

async function subscribeToButtondown(
  email: string,
  opts: { referer?: string | null; country?: string | null }
) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) throw new Error("Missing BUTTONDOWN_API_KEY");

  const query = parseQueryFromReferer(opts.referer);

  const tags = [
    "One-Interest",
    query.src ? `src-${query.src}` : undefined,
    query.utm_campaign ? `utm-${query.utm_campaign}` : undefined,
    opts.country ? `ctry-${opts.country}` : undefined,
  ].filter(Boolean) as string[];

  const notes = [
    query.src ? `src=${query.src}` : null,
    query.utm_source ? `utm_source=${query.utm_source}` : null,
    query.utm_medium ? `utm_medium=${query.utm_medium}` : null,
    query.utm_campaign ? `utm_campaign=${query.utm_campaign}` : null,
    opts.country ? `country=${opts.country}` : null,
    query.ref ? `ref=${query.ref}` : null,
  ]
    .filter(Boolean)
    .join("; ");

  const metadata = buildMetadata({
    src: query.src,
    utm_source: query.utm_source,
    utm_medium: query.utm_medium,
    utm_campaign: query.utm_campaign,
    country: opts.country ?? undefined,
  });

  const response = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      email,
      tags,
      metadata,
      referrer_url: opts.referer || undefined,
      notes: notes || undefined,
    }),
    cache: "no-store",
  });

  if (response.ok || response.status === 201) return true;

  if ([400, 409, 422].includes(response.status)) {
    const text = await response.text().catch(() => "");
    if (/already|exists/i.test(text)) return true;
    throw new Error(`Buttondown error ${response.status}: ${text}`);
  }

  throw new Error(`Buttondown error ${response.status}: ${await response.text().catch(() => "")}`);
}

export async function POST(req: Request) {
  try {
    let email = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
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

    return NextResponse.redirect(new URL("/one/thanks", req.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/one/thanks", req.url), 303);
  }
}
