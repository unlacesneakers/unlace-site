// pages/thank-you.tsx
// UNLACE — Thank You / Confirmation
// Clean, premium confirmation screen with next steps + contact CTAs

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { CheckCircle2, Mail, Phone, Instagram } from "lucide-react";

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thanks — UNLACE Booking Received</title>
        <meta
          name="description"
          content="Thanks! Your UNLACE pick-up request was received. We’ll confirm by SMS/email and request photos to finalise your quote."
        />
        <meta property="og:title" content="UNLACE — Booking Confirmed" />
        <meta
          property="og:description"
          content="We’ve got your details. We’ll be in touch shortly to confirm your pick-up window."
        />
        <meta property="og:type" content="website" />
        <style>{`html{scroll-behavior:smooth}`}</style>

        {/* Optional: simple GA4 event (replace G-XXXX with your ID)
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-XXXX', { page_path: '/thank-you' });
            gtag('event', 'lead', { method: 'formspree' });
          `
        }} /> */}
      </Head>

      <Header />

      <main className="min-h-screen bg-black text-white">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-white text-black p-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold">Thanks — request received</h1>
            <p className="mt-3 text-zinc-300">
              We’ve emailed a copy of your booking details. We’ll confirm your pick-up window shortly via SMS or email.
            </p>

            {/* Next steps */}
            <div className="mt-8 text-left space-y-3 text-zinc-300">
              <div className="flex gap-3">
                <span className="text-zinc-400">1.</span>
                <p>
                  <span className="font-semibold">Reply to our email</span> with a few sneaker photos (overall, sole, problem areas)
                  so we can finalise the quote.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-zinc-400">2.</span>
                <p>We’ll confirm the <span className="font-semibold">exact price & pick-up time</span>.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-zinc-400">3.</span>
                <p>Prepare your pair(s) in a bag. We’ll handle the rest.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="mailto:hello@unlace.com.au"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black px-4 py-3 hover:border-white/30"
              >
                <Mail className="h-4 w-4" />
                Email us
              </a>
              <a
                href="tel:+61452507067"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black px-4 py-3 hover:border-white/30"
              >
                <Phone className="h-4 w-4" />
                Call us
              </a>
              <a
                href="https://www.instagram.com/unlacesneakers/#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black px-4 py-3 hover:border-white/30"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>

            {/* Back home */}
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform"
              >
                Back to Home
              </Link>
            </div>

            {/* Fine print */}
            <p className="mt-6 text-xs text-zinc-500">
              If you didn’t make this request, please contact us immediately at{" "}
              <a className="underline" href="mailto:hello@unlace.com.au">hello@unlace.com.au</a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
