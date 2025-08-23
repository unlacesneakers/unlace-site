// pages/api/pickup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use a verified sender if you’ve set PICKUP_FROM_EMAIL in Vercel,
// otherwise fall back to Resend’s default onboarding address (works without domain verification).
const FROM = process.env.PICKUP_FROM_EMAIL || "UNLACE <onboarding@resend.dev>";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // ---- Honeypot (spam) ----
  const honeypot = (req.body?.honeypot || req.body?._gotcha || "").toString();
  if (honeypot.trim().length > 0) {
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  }

  // ---- Extract fields ----
  const b = req.body as Record<string, any>;
  const {
    name,
    email,
    phone,
    address,
    suburb,
    postcode,
    date,
    time_window,
    service_tier,
    notes,
  } = b;

  // Checkboxes "extras[]" may be array or single string; normalize to array
  const extras: string[] = Array.isArray(b["extras[]"])
    ? b["extras[]"]
    : b["extras[]"]
    ? [String(b["extras[]"])]
    : [];

  // ---- Quick diagnostics ----
  console.log("[pickup] to:", process.env.PICKUP_TO_EMAIL);
  console.log("[pickup] from:", FROM);
  console.log("[pickup] got keys:", Object.keys(b || {}));
  console.log("[pickup] using RESEND_API_KEY prefix:", process.env.RESEND_API_KEY?.slice(0,6));

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    if (!process.env.PICKUP_TO_EMAIL) throw new Error("Missing PICKUP_TO_EMAIL");

    // ---- Admin notification ----
    console.log("[pickup] sending admin email to:", process.env.PICKUP_TO_EMAIL);
    await resend.emails.send({
      from: FROM,
      to: process.env.PICKUP_TO_EMAIL!,
      subject: `New UNLACE Pickup Request${service_tier ? " — " + service_tier : ""}`,
      reply_to: email || undefined,
      text: [
        `Name: ${name || "-"}`,
        `Email: ${email || "-"}`,
        `Phone: ${phone || "-"}`,
        `Address: ${address || "-"}, ${suburb || "-"} ${postcode || "-"}`,
        `Date: ${date || "-"}`,
        `Time Window: ${time_window || "-"}`,
        `Service Tier: ${service_tier || "-"}`,
        `Extras: ${extras.length ? extras.join(", ") : "-"}`,
        `Notes: ${notes || "-"}`,
      ].join("\n"),
    });
    console.log("[pickup] admin email send attempt done");

    // ---- Customer auto-reply ----
    if (email) {
      console.log("[pickup] sending auto-reply to:", email);
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your UNLACE pickup request",
        text: `Thanks ${name || ""}, we’ve received your request and will confirm your pickup window shortly.\n\n— UNLACE`,
      });
      console.log("[pickup] auto-reply attempt done");
    }

    // ---- Response ----
    const accepts = String(req.headers.accept || "");
    const wantsJSON =
      accepts.includes("application/json") ||
      accepts.includes("text/json") ||
      req.headers["x-requested-with"] === "XMLHttpRequest";

    if (wantsJSON) {
      return res.status(200).json({ ok: true });
    }

    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  } catch (err: any) {
    console.error("[pickup] error:", err);

    const accepts = String(req.headers.accept || "");
    const wantsJSON =
      accepts.includes("application/json") ||
      accepts.includes("text/json") ||
      req.headers["x-requested-with"] === "XMLHttpRequest";

    if (wantsJSON) {
      return res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
    }

    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  }
}

export const config = { api: { bodyParser: true } };
