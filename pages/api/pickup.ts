// pages/api/pickup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified sender once set in Vercel env:
// PICKUP_FROM_EMAIL = "UNLACE <no-reply@unlace.com.au>"
// Fallback keeps things working if that env var is missing.
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
    model,
    notes,
  } = b;

  // Checkboxes "extras[]" may be array or single string; normalize to array
  const extras: string[] = Array.isArray(b["extras[]"])
    ? b["extras[]"]
    : b["extras[]"]
    ? [String(b["extras[]"])]
    : [];

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    if (!process.env.PICKUP_TO_EMAIL) throw new Error("Missing PICKUP_TO_EMAIL");

    // ---------- Admin (plain text, neatly aligned) ----------
    const rows: Array<[string, string]> = [
      ["Name", name || "-"],
      ["Email", email || "-"],
      ["Phone", phone || "-"],
      ["Address", `${address || "-"}, ${suburb || "-"} ${postcode || "-"}`.replace(/^, /, "")],
      ["Date", date || "-"],
      ["Time Window", time_window || "-"],
      ["Service Tier", service_tier || "-"],
      ["Extras", extras.length ? extras.join(", ") : "-"],
      ["Model", model || "-"],
      ["Notes", (notes || "-").toString()],
    ];

    const adminText =
      "UNLACE — New Pickup Request\n" +
      "--------------------------------\n" +
      rows.map(([k, v]) => `${k.padEnd(12)}: ${v}`).join("\n") +
      "\n--------------------------------\n" +
      `Submitted: ${new Date().toISOString()}`;

    await resend.emails.send({
      from: FROM,
      to: process.env.PICKUP_TO_EMAIL!,
      subject: `New UNLACE Pickup Request${service_tier ? " — " + service_tier : ""}`,
      reply_to: email || undefined,
      text: adminText,
    });

    // ---------- Customer (polished HTML + text fallback) ----------
    if (email) {
      const customerText =
        `Thanks ${name || ""}, we’ve received your sneaker pick-up request.\n\n` +
        `Summary:\n` +
        ` - Service Tier: ${service_tier || "-"}\n` +
        ` - Pickup Address: ${address || "-"}, ${suburb || "-"} ${postcode || "-"}\n` +
        ` - Date: ${date || "-"}\n` +
        ` - Time Window: ${time_window || "-"}\n\n` +
        `We’ll confirm your pickup window shortly.\n\n— UNLACE`;

      const customerHtml = `
        <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            
            <!-- Header with logo -->
            <div style="background:#000;color:#fff;padding:20px;text-align:center;">
              <img src="https://unlace.com.au/logo.png" alt="UNLACE" style="max-height:50px;margin-bottom:10px;" />
              <h2 style="margin:0;font-size:20px;letter-spacing:.5px;">UNLACE — Premium Sneaker Atelier</h2>
            </div>

            <!-- Body -->
            <div style="padding:22px;color:#222;line-height:1.55;">
              <p style="font-size:16px;margin:0 0 10px;">Hi ${escapeHtml(name || "there")},</p>
              <p style="font-size:15px;margin:0 0 16px;">
                We’ve received your sneaker pick-up request ✅<br/>
                Our team will confirm your pickup window shortly via SMS or email.
              </p>

              <!-- Summary card -->
              <div style="margin:18px 0;padding:14px 16px;background:#fff8e1;border:1px solid #d4af37;border-radius:10px;">
                <p style="margin:0 0 8px;font-weight:600;color:#000;">Summary</p>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  ${tableRow("Service Tier", service_tier || "-")}
                  ${tableRow("Pickup Address", \`${address || "-"}, ${suburb || "-"} ${postcode || "-"}\`.replace(/^, /, ""))}
                  ${tableRow("Date", date || "-")}
                  ${tableRow("Time Window", time_window || "-")}
                  ${extras.length ? tableRow("Extras", extras.join(", ")) : ""}
                  ${model ? tableRow("Model", model) : ""}
                </table>
              </div>

              <!-- Reply button -->
              <div style="text-align:center;margin-top:24px;">
                <a href="mailto:unlacesneakers@gmail.com" 
                  style="display:inline-block;padding:12px 20px;background:#d4af37;color:#000;font-weight:bold;text-decoration:none;border-radius:6px;">
                  Reply to Confirm
                </a>
              </div>

              <p style="font-size:14px;color:#555;margin:20px 0 0;">
                Questions? Email us at 
                <a href="mailto:unlacesneakers@gmail.com" style="color:#000;">unlacesneakers@gmail.com</a>.
              </p>
            </div>

            <!-- Footer -->
            <div style="background:#f2f2f2;padding:14px;text-align:center;font-size:12px;color:#666;">
              © ${new Date().getFullYear()} UNLACE · Melbourne, VIC ·
              <a href="https://unlace.com.au" style="color:#666;text-decoration:none;">unlace.com.au</a>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your UNLACE pickup request",
        text: customerText,
        html: customerHtml,
      });
    }

    // HTML form → redirect to Thank You
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  } catch (err: any) {
    // On error, still send user to Thank You to avoid a broken UX
    console.error("[pickup] error:", err?.message || err);
    res.writeHead(303, { Location: "/thank-you" });
    return res.end();
  }
}

// Helper: safe HTML row
function tableRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 0;color:#555;vertical-align:top;width:40%;"><strong>${escapeHtml(label)}</strong></td>
      <td style="padding:6px 0;color:#222;vertical-align:top;width:60%;">${escapeHtml(String(value))}</td>
    </tr>
  `;
}

// Tiny HTML escaper
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Default bodyParser works for HTML forms
export const config = { api: { bodyParser: true } };
