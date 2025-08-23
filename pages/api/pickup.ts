// pages/api/pickup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// OPTIONAL: configure your default From address in an env var so you don't hardcode it
const FROM = process.env.PICKUP_FROM_EMAIL || "UNLACE <onboarding@resend.dev>"; // use your verified domain later

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Support simple honeypot (either "honeypot" or legacy "_gotcha")
  const honeypot = (req.body?.honeypot || req.body?._gotcha || "").toString();
  if (honeypot.trim().length > 0) {
    // Pretend success + redirect (bots never see this)
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  }

  // Extract fields (handles strings / arrays)
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

  // Extras[] checkboxes come as an array (or single string). Normalize:
  const extras = Array.isArray(b["extras[]"])
    ? (b["extras[]"] as string[])
    : b["extras[]"]
    ? [String(b["extras[]"])]
    : [];

  try {
    if (!process.env.PICKUP_TO_EMAIL) throw new Error("Missing PICKUP_TO_EMAIL env");

    // Admin notification
    await resend.emails.send({
      from: FROM,
      to: process.env.PICKUP_TO_EMAIL,
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

    // Customer auto-reply (optional)
    if (email) {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your UNLACE pickup request",
        text: `Thanks ${name || ""}, we’ve received your request and will confirm your pickup window shortly.\n\n— UNLACE`,
      });
    }

    // 🔁 Decide response: JSON for API clients, redirect for normal form posts
    const accepts = (req.headers.accept || "").toString();
    const wantsJSON = accepts.includes("application/json") || accepts.includes("text/json") || req.headers["x-requested-with"] === "XMLHttpRequest";

    if (wantsJSON) {
      return res.status(200).json({ ok: true });
    }

    // ✅ HTML form POST: server-side redirect to your Thank You page
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  } catch (err: any) {
    console.error(err);

    const accepts = (req.headers.accept || "").toString();
    const wantsJSON = accepts.includes("application/json") || accepts.includes("text/json") || req.headers["x-requested-with"] === "XMLHttpRequest";

    if (wantsJSON) {
      return res.status(500).json({ ok: false, error: err.message || "Unknown error" });
    }

    // Even on error, send users to /thank-you to avoid a broken UX
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  }
}

// Note: Next.js' default bodyParser handles urlencoded form posts.
// You can keep or remove this; it's not required for redirects.
export const config = { api: { bodyParser: true } };
