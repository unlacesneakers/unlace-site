import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const data = req.body as Record<string, string | undefined>;
  const { name, email, phone, address, suburb, postcode, date, time_window, service_tier, notes } = data;

  try {
    if (!process.env.PICKUP_TO_EMAIL) throw new Error("Missing PICKUP_TO_EMAIL env");

    await resend.emails.send({
      from: "UNLACE <no-reply@your-domain.com>",
      to: process.env.PICKUP_TO_EMAIL,
      subject: "New UNLACE Pickup Request",
      reply_to: email || undefined,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Address: ${address}, ${suburb} ${postcode}`,
        `Date: ${date}`,
        `Time Window: ${time_window}`,
        `Service Tier: ${service_tier}`,
        `Notes: ${notes || "-"}`,
      ].join("\n"),
    });

    if (email) {
      await resend.emails.send({
        from: "UNLACE <no-reply@your-domain.com>",
        to: email,
        subject: "We received your UNLACE pickup request",
        text: `Thanks ${name || ""}, we’ve got your request and will confirm your pickup window shortly.\n\n— UNLACE`,
      });
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export const config = { api: { bodyParser: true } };
