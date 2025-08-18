// pages/index.tsx
// ======================================================
// UNLACE — Home Page (Next.js + Tailwind + Framer Motion)
// - Sticky header (imported from components/Header.tsx)
// - Services with price badges
// - Extras beside Service Tier in booking form
// - Photo links + file upload with Formspree fallback
// - Smooth anchor scrolling + clean layout
// ======================================================

import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// ===== Icons =====
import {
  ShieldCheck,
  Droplets,
  Stars,
  Clock,
  BadgeCheck,
  Mail,
  Sparkles,
  Truck,
} from "lucide-react";

// ===== Components =====
import Header from "../components/Header";

// ===== Small UI helpers =====
function Card({
  icon,
  title,
  desc,
  price, // optional price badge
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  price?: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 p-6 bg-black hover:border-white/30 transition-colors">
      {/* Price badge (optional) */}
      {price && (
        <span className="absolute top-4 right-4 text-[11px] uppercase tracking-wide rounded-full bg-white text-black px-2 py-1">
          {price}
        </span>
      )}
      <div className="h-6 w-6 mb-4" aria-hidden>
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-300 text-sm">{desc}</p>
    </div>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 ${className}`}
    />
  );
}

// ======================================================
// Page
// ======================================================
export default function Home() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // ===== Formspree submit (with file validation + fallback) =====
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // ✅ Your Formspree endpoint
    const endpoint = "https://formspree.io/f/xyzpanlv";

    // ---- Client-side validation for files ----
    const fileInput = form.querySelector(
      'input[name="photos"]'
    ) as HTMLInputElement | null;
    const files = fileInput?.files || null;

    const MAX_MB = 10; // typical Formspree per-file limit
    if (files && files.length > 0) {
      for (const f of Array.from(files)) {
        const mb = f.size / (1024 * 1024);
        if (mb > MAX_MB) {
          alert(
            `"${f.name}" is ${mb.toFixed(
              1
            )}MB. Max ${MAX_MB}MB per image. Please resize/compress and try again.`
          );
          return;
        }
        if (!f.type.startsWith("image/")) {
          alert(
            `"${f.name}" is not an image. Please upload images only (jpg, png, webp).`
          );
          return;
        }
      }
    }

    // ---- Formspree helper fields ----
    const email =
      (form.querySelector('input[name="email"]') as HTMLInputElement)?.value ||
      "";
    if (email) formData.set("_replyto", email);
    formData.set("_subject", "New UNLACE Pickup Request");
    formData.set("_next", "/thank-you");

    // POST helper (keeps error messages if Formspree returns JSON)
    const send = async (fd: FormData) => {
      const res = await fetch(endpoint, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }, // don't set Content-Type manually
      });
      let msg = "";
      try {
        const data = await res.json();
        if (!res.ok && data?.errors?.length) {
          msg = data.errors.map((e: any) => e.message).join("\n");
        }
      } catch {
        // ignore parse errors
      }
      return { ok: res.ok, msg };
    };

    setSubmitting(true);

    // Try with files first (if any)
    let { ok, msg } = await send(formData);

    // If it failed and we had files, retry without files (common plan limitation)
    if (!ok && files && files.length > 0) {
      const retry = new FormData(form);
      retry.delete("photos"); // strip binary attachments
      retry.set(
        "photo_upload_issue",
        "User attempted to upload images, but attachments were not accepted. See 'Photo links (optional)' if provided."
      );
      // keep helper fields
      if (email) retry.set("_replyto", email);
      retry.set("_subject", "New UNLACE Pickup Request");
      retry.set("_next", "/thank-you");

      const r = await send(retry);
      ok = r.ok;
      msg = r.msg || msg;
    }

    setSubmitting(false);

    if (ok) {
      router.push("/thank-you");
    } else {
      alert(
        msg ||
          "Something went wrong. Please try again (you can paste image links in the Photo links field)."
      );
    }
  }

  return (
    <>
      <Head>
        <title>UNLACE — Melbourne’s Premium Sneaker Laundry</title>
        <meta
          name="description"
          content="UNLACE offers premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery."
        />
        <meta property="og:title" content="UNLACE — Melbourne’s Premium Sneaker Laundry" />
        <meta
          property="og:description"
          content="Premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        {/* Smooth scrolling if not present globally */}
        <style>{`html{scroll-behavior:smooth}`}</style>
      </Head>

      {/* ===== Sticky Header (brand + nav) ===== */}
      <Header />

      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* ===== HERO ===== */}
        <section id="hero" className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs mb-3">
                Australia’s Premium Sneaker Laundry
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold">
                UNLACE your sneakers — relace your style.
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl">
                From grails to beaters, we revive every pair with precision cleaning
                and restoration. Pick-up & delivery across Melbourne.
              </p>
              <div className="mt-8 flex gap-4">
                <a
                  href="#pickup"
                  className="rounded-2xl bg-white text-black px-6 py-3 font-semibold"
                >
                  Book a Pickup
                </a>
                <a
                  href="#services"
                  className="rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white hover:text-black"
                >
                  Explore Services
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Eco-safe products
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Pick-up & delivery
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> 48h turnaround*
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-zinc-300 mb-4">
            At UNLACE, we believe your sneakers are more than just shoes — they’re a
            statement, a memory, and an investment worth protecting. Founded in Melbourne,
            our mission is to deliver world-class sneaker cleaning, restoration, and care
            to sneakerheads, collectors, and everyday wearers alike.
          </p>
          <p className="text-zinc-300 mb-4">
            Our team is made up of passionate sneaker enthusiasts who understand the
            unique needs of different materials, from premium leather to delicate suede.
            We combine expert craftsmanship with eco-friendly products, ensuring every
            pair receives meticulous attention without compromising the planet.
          </p>
          <p className="text-zinc-300">
            Whether it’s reviving your beaters, preserving your grails, or getting your
            daily rotation looking fresh, UNLACE offers Melbourne-wide pick-up and delivery
            for ultimate convenience. We’re here to keep your kicks looking as good as the
            day you copped them — or better.
          </p>
        </section>

        {/* ===== SERVICES (with price badges) ===== */}
        {/* add scroll-mt so anchors stop below sticky header */}
        <section
          id="services"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24"
        >
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl sm:text-4xl font-bold">Services</h2>
            <p className="text-sm text-zinc-400">Meticulous care, premium results.</p>
          </div>

          {/* Core services */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Essential Clean"
              desc="Exterior-only clean for uppers & midsoles — fast refresh for daily wear."
              price="$39"
            />
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Premium Detail"
              desc="Deep clean of upper, midsole, insole & laces + deodorising. Material-safe for leather, mesh, suede & nubuck."
              price="$69"
            />
            <Card
              icon={<Stars className="h-6 w-6" />}
              title="Whitening & De-yellowing"
              desc="Icy sole restoration and stain reduction for that fresh-out-the-box feel."
              price="From $129"
            />
          </div>

          {/* Extras */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Extras</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Add-ons you can include with any service.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <Card
                icon={<Sparkles className="h-6 w-6" />}
                title="Lace Swap"
                desc="Fresh laces or custom swap — fitted to your pair."
                price="$10–$15"
              />
              <Card
                icon={<BadgeCheck className="h-6 w-6" />}
                title="Protection Coating"
                desc="Water & stain repellent to keep your kicks cleaner for longer."
                price="$20"
              />
            </div>
          </div>
        </section>

        {/* ===== PICKUP BOOKING (Formspree) ===== */}
        <section
          id="pickup"
          className="bg-zinc-950 border-t border-white/10 scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Request a Pick-Up</h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              aria-label="Pickup booking form"
            >
              {/* Contact & address */}
              <Input name="name" placeholder="Full name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="phone" placeholder="Phone" required className="sm:col-span-2" />
              <Input
                name="address"
                placeholder="Pickup address"
                required
                className="sm:col-span-2"
              />
              <Input name="suburb" placeholder="Suburb" required />
              <Input name="postcode" placeholder="Postcode" required />

              {/* Date & time window */}
              <Input name="date" type="date" required />
              <select
                name="time_window"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="">Preferred time window</option>
                <option>9:00 – 12:00</option>
                <option>12:00 – 3:00</option>
                <option>3:00 – 6:00</option>
                <option>After hours (request)</option>
              </select>

              {/* Service tier (left) */}
              <select
                name="service_tier"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="">Service tier</option>
                <option>Essential Clean</option>
                <option>Premium Detail</option>
                <option>Whitening & De-yellowing</option>
              </select>

              {/* Extras (right) — sits beside on desktop thanks to 2-col grid */}
              <fieldset className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <legend className="text-sm text-zinc-400">Extras (optional)</legend>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Lace Swap" />
                    <span>Lace Swap</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Protection Coating" />
                    <span>Protection Coating</span>
                  </label>
                </div>
              </fieldset>

              {/* Sneaker model & notes */}
              <Input
                name="model"
                placeholder="Sneaker model(s) (e.g., AJ1, Yeezy 350)"
                className="sm:col-span-2"
              />
              <textarea
                name="notes"
                rows={4}
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2"
                placeholder="Notes (stains, yellowing, suede, etc.)"
              />

              {/* Photo links (optional) */}
              <input
                name="photo_links"
                placeholder="Photo links (optional) — paste Google Drive/Dropbox/IG URLs"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 sm:col-span-2"
              />

              {/* File upload (optional) */}
              <label className="sm:col-span-2 text-sm text-zinc-400">
                Upload sneaker photos (optional)
              </label>
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className="sm:col-span-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              />

              {/* Consent */}
              <label className="sm:col-span-2 text-sm text-zinc-300 flex items-start gap-3">
                <input required type="checkbox" className="mt-1" />
                <span>
                  I agree to the <a href="/terms" className="underline">Terms of Service</a> and
                  understand final pricing may change after inspection.
                </span>
              </label>

              {/* Spam honeypot */}
              <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />

              {/* Submit */}
              <button
                disabled={submitting}
                className="sm:col-span-2 rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Request Pick-Up"}
              </button>
              <p className="text-xs text-zinc-500 sm:col-span-2">
                Tip: Images up to ~10MB each. If uploads don’t work, paste file links above.
              </p>
            </form>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400">
            <div>© {new Date().getFullYear()} UNLACE — Melbourne, VIC</div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@unlace.com.au"
                className="hover:text-white flex items-center gap-1"
              >
                <Mail className="h-4 w-4" /> hello@unlace.com.au
              </a>
              <span className="opacity-40">•</span>
              <a
                href="https://instagram.com/unlace"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <span className="opacity-40">•</span>
              <a href="tel:+61XXXXXXXXX" className="hover:text-white">
                +61 XXXXXXXX
              </a>
              <span className="opacity-40">•</span>
              <a href="/privacy" className="hover:text-white">
                Privacy
              </a>
              <span className="opacity-40">•</span>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
