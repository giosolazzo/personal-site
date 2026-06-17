import { NextResponse } from "next/server";

const CONTACT_TO_EMAIL = "gio.solazzo.o@gmail.com";
const DEFAULT_FROM_EMAIL = "Personal Site <onboarding@resend.dev>";
const MAX_MESSAGE_LENGTH = 5000;

function clean(value: FormDataEntryValue | null, maxLength = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailText({
  firstName,
  lastName,
  email,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const name = [firstName, lastName].filter(Boolean).join(" ") || "Not provided";

  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const firstName = clean(form.get("firstName"), 100);
    const lastName = clean(form.get("lastName"), 100);
    const email = clean(form.get("email"), 254);
    const subject = clean(form.get("subject"), 150);
    const message = clean(form.get("message"), MAX_MESSAGE_LENGTH);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Please add a subject and message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY.");
      return NextResponse.json(
        { ok: false, error: "Contact email is not configured yet." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: buildEmailText({ firstName, lastName, email, subject, message }),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text().catch(() => "");
      console.error(`Resend error ${response.status}: ${error}`);
      return NextResponse.json(
        { ok: false, error: "Email service rejected the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Could not send the message." },
      { status: 500 }
    );
  }
}
