// pages/index.tsx
// UNLACE — Melbourne’s Premium Sneaker Atelier

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// Centralized contact details (edit here once)
const CONTACT = {
  email: "unlacesneakers@gmail.com",
  phone: "+61452507067",
  instagram: "https://www.instagram.com/unlacesneakers/#",
  siteUrl: "https://www.unlace.com.au",
};

// Components
import Header from "../components/Header";
import TopBanner from "../components/TopBanner";
import GuaranteeStrip from "../components/GuaranteeStrip";
import WhyChooseUs, { Benefit } from "../components/WhyChooseUs";
import ProcessSteps, { Step } from "../components/ProcessSteps";
import FAQ, { QA } from "../components/FAQ";
import SchemaFAQ from "../components/SchemaFAQ";
import Reveal from "../components/Reveal";
import FloatingCta from "../components/FloatingCta";
import BeforeAfterStatic from "../components/BeforeAfterStatic";
import Testimonials, { Testimonial } from "../components/Testimonials";

// --- Manual reviews (paste new ones here as you get them) ---
const testimonials: Testimonial[] = [
  {
    id: "g1",
    quote:
      "Amazing service. Fast, professional, and my sneakers look brand new again. Definitely my go-to sneaker cleaners here in Melbourne.",
    author: "Google Reviewer",
    meta: "Melbourne, VIC",
    rating: 5,
  },
  {
    id: "g2",
    quote: "Thank you for the detailed clean!",
    author: "Google Reviewer",
    meta: "Melbourne, VIC",
    rating: 5,
  },
];

// Define the benefits (the content list)
const benefits: Benefit[] = [
  { id: "b1", title: "Professional deep clean", desc: "From midsoles to laces — premium tools and solutions for every material." },
  { id: "b2", title: "Icy sole revival & whitening", desc: "Targeted treatments to revive oxidised rubber and aged soles." },
  { id: "b3", title: "Pick-up & return", desc: "Door-to-door service across Melbourne. Convenient and secure." },
  { id: "b4", title: "Care for rare pairs", desc: "Material-specific methods for suede, nubuck, canvas, leather and knit." },
  { id: "b5", title: "Protection coating", desc: "Hydrophobic finish to keep pairs fresher for longer." },
  { id: "b6", title: "Local & responsive", desc: "Fast turnaround with friendly updates via SMS/Instagram." },
];

// Define the Steps
const steps: Step[] = [
  { id: "s1", title: "Request a pick-up", desc: "Use the booking form. We’ll confirm a time via SMS." },
  { id: "s2", title: "Assessment & quote", desc: "We inspect your pair and confirm any extras before starting." },
  { id: "s3", title: "Clean & treat", desc: "Deep clean + whitening options, lace swap and protection if selected." },
  { id: "s4", title: "Return like-new", desc: "Delivered back to you across Melbourne—ready to wear." },
];

// Refined FAQ (premium tone)
const faqs: QA[] = [
  {
    q: "How do pick-ups work?",
    a: <>Book through our online form and select a time window. We’ll confirm via SMS and handle the rest. Standard turnaround is 4–5 business days depending on service and condition.</>,
  },
  {
    q: "Do you repair or restore damaged sneakers?",
    a: <>No. UNLACE provides sneaker cleaning and cosmetic de-yellowing only. We do not repair torn materials, detached soles, broken stitching or other physical damage. Cleaning cannot reverse existing wear or damage.</>,
  },
  {
    q: "Do you clean suede and delicate materials?",
    a: <>Yes — suede, nubuck, mesh, and premium leathers are all cleaned with specialist tools and eco-safe solutions. Each material is treated with tailored techniques to protect its texture and integrity.</>,
  },
  {
    q: "How does pricing and payment work?",
    a: <>Our listed prices cover most pairs. If extras are needed, we confirm them with you before starting. Payment is made after service via card or transfer — no hidden costs, ever.</>,
  },
  {
    q: "Where do you operate?",
    a: <>We offer pick-up and delivery across Melbourne. If you’re outside the area, get in touch via Instagram and we’ll try to arrange a solution.</>,
  },
  {
    q: "What if I’m not satisfied with the result?",
    a: <>We stand by our work. If you’re not happy, we’ll re-clean or make it right — because every sneaker deserves a finish we’re proud of.</>,
  },
];

const faqsForSchema = [
  { q: "How do pick-ups work?", a: "Book through our online form and select a time window. We’ll confirm via SMS. Standard turnaround is 4–5 business days depending on service and condition." },
  { q: "Do you repair or restore damaged sneakers?", a: "No. UNLACE provides sneaker cleaning and cosmetic de-yellowing only. We do not repair torn materials, detached soles, broken stitching or other physical damage. Cleaning cannot reverse existing wear or damage." },
  { q: "Do you clean suede and delicate materials?", a: "Yes — suede, nubuck, mesh, and premium leathers are cleaned with specialist tools and eco-safe solutions. Each material is treated with tailored techniques." },
  { q: "How does pricing and payment work?", a: "Our listed prices cover most pairs. If extras are needed, we confirm them before starting. Payment is made after service via card or transfer." },
  { q: "Where do you operate?", a: "We offer pick-up and delivery across Melbourne. If you’re outside the area, message us on Instagram to arrange options." },
  { q: "What if I’m not satisfied with the result?", a: "If you’re not happy, we’ll re-clean or make it right — because every sneaker deserves a finish we’re proud of." },
];

// Icons
import {
  ShieldCheck,
  Droplets,
  Stars,
  Clock,
  BadgeCheck,
  Mail,
  Truck,
} from "lucide-react";

// ---------- Small UI helpers ----------
function Card({
  icon,
  title,
  desc,
  price,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  price?: string;
}) {
  return (
    <Reveal>
      <div className="relative rounded-2xl border border-white/10 p-6 bg-black hover:border-white/30 transition-colors">
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
    </Reveal>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  const [pairCount, setPairCount] = useState(2);
  const [protection, setProtection] = useState(false);
  const [laceSwap, setLaceSwap] = useState(false);
  const servicePrices: Record<string, number> = {
    "Essential Clean": 39,
    "Premium Detail": 55,
    "Icy Sole Revival": 85,
  };
  const baseCost = (servicePrices[selectedService] || 0) * pairCount;
  const minimumEstimate = baseCost + (protection ? 20 * pairCount : 0) + (laceSwap ? 10 * pairCount : 0);
  const maximumEstimate = baseCost + (protection ? 20 * pairCount : 0) + (laceSwap ? 15 * pairCount : 0);
  const money = (amount: number) => amount.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
  return (
    <>
      <Head>
        <title>Sneaker Cleaning Melbourne | Pick-Up & Delivery | UNLACE</title>
        <meta
          name="description"
          content="Premium sneaker cleaning in Melbourne. Essential Clean, deep cleaning, sole whitening and convenient pick-up and delivery. Minimum 2 pairs per booking."
        />
        <link rel="canonical" href="https://www.unlace.com.au/" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Sneaker Cleaning Melbourne | UNLACE" />
        <meta
          property="og:description"
          content="Premium sneaker cleaning, cosmetic sole whitening and protection with convenient Melbourne pick-up and delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.unlace.com.au/" />
        <meta property="og:image" content="https://www.unlace.com.au/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`html{scroll-behavior:smooth}`}</style>

        {/* LocalBusiness schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.unlace.com.au/#business",
              name: "UNLACE",
              image: "https://www.unlace.com.au/og-image.jpg",
              description:
                "Premium sneaker cleaning, cosmetic de-yellowing and protection with pick-up and delivery in Melbourne, Victoria.",
              areaServed: {
                "@type": "City",
                name: "Melbourne",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Melbourne",
                addressRegion: "VIC",
                addressCountry: "AU",
              },
              telephone: CONTACT.phone,
              email: CONTACT.email,
              url: CONTACT.siteUrl,
              sameAs: [CONTACT.instagram],
            }),
          }}
        />
      </Head>

      {/* -------- Header + mobile sticky CTA -------- */}
      <Header />
      <FloatingCta />

      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* ========== HERO ========== */}
        <section id="hero" className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Reveal>
                <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs mb-3 text-center">
                  Australia’s Premium Sneaker Atelier
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-center">
                  Premium Sneaker Cleaning in Melbourne
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 text-zinc-200 font-medium max-w-2xl mx-auto text-center">
                  UNLACE your sneakers — relace your style.
                </p>
                <p className="mt-3 text-zinc-300 max-w-2xl mx-auto text-center">
                  Professional sneaker cleaning, deep detailing and cosmetic sole whitening,
                  with convenient pick-up and delivery across Melbourne. Minimum 2 pairs per booking.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex gap-4 justify-center">
                  <a
                    href="#pickup"
                    className="rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform"
                  >
                    Book a Pickup
                  </a>
                  <a
                    href="#services"
                    className="rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white hover:text-black transition-colors"
                  >
                    Explore Services
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Eco-safe products
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Pick-up & delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> 4–5 business days*
                  </div>
                </div>
              </Reveal>
            </motion.div>
          </div>
        </section>

        {/* ✅ Guarantee bar */}
        <GuaranteeStrip />

        {/* TopBanner carousel */}
        <TopBanner />

        {/* ========== ABOUT ========== */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-white/10"
        >
          <Reveal><h2 className="text-2xl sm:text-4xl font-bold mb-4">About UNLACE — Melbourne Sneaker Cleaning</h2></Reveal>
          <div className="space-y-4">
            <Reveal><p className="text-zinc-300">UNLACE is a Melbourne sneaker cleaning service for people who want their favourite pairs cared for properly. From everyday trainers to collectable sneakers, we focus on careful cleaning, deep detailing and cosmetic sole de-yellowing.</p></Reveal>
            <Reveal delay={0.05}><p className="text-zinc-300">Our cleaning options include Essential Clean for exterior care, Premium Detail for a more thorough clean, and Icy Sole Revival for eligible yellowed soles. We tailor cleaning methods to the sneaker material and assess each pair before confirming the final quote.</p></Reveal>
            <Reveal delay={0.1}><p className="text-zinc-300">With sneaker pick-up and delivery available across Melbourne, booking a shoe clean is straightforward. Standard turnaround is estimated at 4–5 business days, depending on condition and service. UNLACE provides cleaning and cosmetic treatments only — not repairs to torn materials, detached soles or other physical damage.</p></Reveal>
          </div>
        </section>

        {/* ✅ Why Choose Us */}
        <Reveal>
          <WhyChooseUs items={benefits} />
        </Reveal>

        {/* Before and After photos */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-white/10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-8">Before & After</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* First panel uses defaults (Before/After) */}
            <BeforeAfterStatic
              src="/ba-placeholder-before.jpg"
              alt="UNLACE cleaning result — pair 1"
            />

            {/* Second panel inverted: After (left) / Before (right) */}
            <BeforeAfterStatic
              src="/ba-placeholder-after.jpg"
              alt="UNLACE cleaning result — pair 2"
              leftLabel="After"
              rightLabel="Before"
            />
          </div>
        </section>

        {/* ========== SERVICES ========== */}
        <section
          id="services"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24"
        >
          <Reveal>
            <div className="mb-8 sm:mb-10 flex items-end justify-between">
              <h2 className="text-2xl sm:text-4xl font-bold">Sneaker Cleaning Services in Melbourne</h2>
              <p className="text-sm text-zinc-400">Meticulous care, premium results.</p>
            </div>
          </Reveal>

          <div className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-4" role="note">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Important booking reminder</p>
            <p className="mt-1 text-white font-semibold">Minimum of 2 pairs per booking.</p>
          </div>

          <div className="mb-6 rounded-2xl border border-white/20 bg-zinc-900 px-5 py-4" role="note">
            <p className="text-sm font-bold uppercase tracking-wider text-white">Important service notice — Cleaning only</p>
            <p className="mt-2 text-sm text-zinc-300">UNLACE provides sneaker cleaning and cosmetic de-yellowing only. We do not repair or restore physically damaged shoes (including tears, detached soles, broken stitching or structural damage). Cleaning cannot reverse existing wear or damage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Essential Clean"
              desc="Exterior sneaker cleaning for uppers and midsoles — a practical refresh for everyday shoes."
              price="$39"
            />
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Premium Detail"
              desc="Detailed sneaker cleaning for uppers, midsoles, insoles and laces, with deodorising and material-appropriate care."
              price="$55"
            />
            <Card
              icon={<Stars className="h-6 w-6" />}
              title="Icy Sole Revival"
              desc="Cosmetic sole whitening to help reduce the appearance of yellowing on eligible sneakers. Results vary by condition and material."
              price="From $85"
            />
          </div>
        </section>

        {/* ========== UNLACE IN ACTION — INSTAGRAM REELS ========== */}
        <section
          id="videos"
          aria-labelledby="videos-heading"
          className="border-t border-white/10 bg-zinc-950 scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3">
                Behind the clean
              </p>
              <h2 id="videos-heading" className="text-2xl sm:text-4xl font-bold">
                UNLACE IN ACTION
              </h2>
              <p className="mt-3 mb-10 max-w-2xl text-zinc-300">
                See our sneaker cleaning process up close. Watch the detail and care
                that goes into every pair.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: "DPSjoPFj1ij", label: "UNLACE cleaning reel 1" },
                { id: "DOChA27k3Tg", label: "UNLACE cleaning reel 2" },
                { id: "DOnWtGrj5rB", label: "UNLACE cleaning reel 3" },
              ].map((reel) => (
                <div key={reel.id} className="min-w-0 rounded-2xl border border-white/10 bg-black p-3 sm:p-4">
                  <iframe
                    title={reel.label}
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                    className="w-full rounded-xl bg-white"
                    style={{ height: 520, border: 0 }}
                  />
                  <a
                    href={`https://www.instagram.com/reel/${reel.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
                  >
                    View on Instagram ↗
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-zinc-500">
              Videos are hosted by Instagram and may require Instagram cookies or access to load.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <Reveal>
          <ProcessSteps items={steps} />
        </Reveal>

        {/* Testimonials */}
        <Testimonials items={testimonials} instagramUrl={CONTACT.instagram} />

        {/* FAQ */}
        <Reveal>
          <FAQ items={faqs} />
        </Reveal>
        <SchemaFAQ items={faqsForSchema} />

        {/* Pickup Form */}
        <section id="pickup" className="bg-zinc-950 border-t border-white/10 scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Reveal><h2 className="text-2xl sm:text-4xl font-bold mb-6">Request a Pick-Up</h2></Reveal>

            <div className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-4" role="note">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Important booking reminder</p>
              <p className="mt-1 font-semibold">A minimum of 2 pairs is required per booking.</p>
              <p className="mt-1 text-sm text-zinc-300">Standard turnaround: 4–5 business days, depending on service and condition.</p>
              <p className="mt-2 text-sm text-zinc-300"><strong className="text-white">Cleaning only:</strong> We do not repair or restore physically damaged shoes. Existing wear and damage may remain after cleaning.</p>
            </div>

            <form
              action="/api/pickup"
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              aria-label="Pickup booking form"
            >
              <input type="hidden" id="subjectField" name="_subject" value="New UNLACE Pickup Request" />
              <input type="text" name="honeypot" className="hidden" aria-hidden="true" />

              {/* Contact */}
              <input name="name" placeholder="Full name" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30" />
              <input name="email" type="email" placeholder="Email" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30" />
              <input name="phone" placeholder="Phone" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2" />
              <input name="address" placeholder="Pickup address" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2" />
              <input name="suburb" placeholder="Suburb" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30" />
              <input name="postcode" placeholder="Postcode" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30" />

              {/* Date & time */}
              <input name="date" type="date" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30" />
              <select name="time_window" required className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30">
                <option value="">Preferred time window</option>
                <option>9:00 – 12:00</option>
                <option>12:00 – 3:00</option>
                <option>3:00 – 6:00</option>
                <option>After hours (request)</option>
              </select>

              {/* Service tier */}
              <select
                name="service_tier"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
                onChange={(e) => {
                  const subjectField = document.getElementById("subjectField") as HTMLInputElement | null;
                  setSelectedService(e.target.value);
                  if (subjectField) {
                    subjectField.value = `New UNLACE Pickup Request — ${e.target.value}`;
                  }
                }}
              >
                <option value="">Service tier</option>
                <option value="Essential Clean">Essential Clean</option>
                <option value="Premium Detail">Premium Detail</option>
                <option value="Icy Sole Revival">Icy Sole Revival</option>
              </select>

              {/* Extras */}
              <fieldset className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <legend className="text-sm text-zinc-400">Extras (optional)</legend>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Protection Coating" checked={protection} onChange={(e) => setProtection(e.target.checked)} />
                    <span>Protection Coating (+$20 per pair)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Lace Swap" checked={laceSwap} onChange={(e) => setLaceSwap(e.target.checked)} />
                    <span>Lace Swap (+$10–$15 per pair)</span>
                  </label>
                </div>
              </fieldset>

              {/* Minimum 2 pairs per booking */}
              <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-zinc-300">
                Number of pairs (minimum 2)
                <input name="pair_count" type="number" min="2" step="1" required value={pairCount} onChange={(e) => setPairCount(e.target.value === "" ? 0 : Number(e.target.value))} className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30" />
              </label>

              {/* Live estimate: final quote is confirmed after inspection */}
              <div className="sm:col-span-2 rounded-2xl border border-white/20 bg-black p-5" aria-live="polite">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Estimated Booking Cost</p>
                {selectedService && Number.isSafeInteger(pairCount) && pairCount >= 2 ? (
                  <>
                    <p className="mt-2 text-3xl font-bold text-white">
                      {money(minimumEstimate)}{minimumEstimate !== maximumEstimate ? ` – ${money(maximumEstimate)}` : ""}
                      {selectedService === "Icy Sole Revival" ? <span className="ml-2 text-sm font-normal text-zinc-400">starting from</span> : null}
                    </p>
                    <p className="mt-2 text-sm text-zinc-300">
                      {pairCount} pairs × {selectedService} ({money(servicePrices[selectedService])}/pair)
                      {protection ? ` + Protection Coating (${money(20 * pairCount)})` : ""}
                      {laceSwap ? ` + Lace Swap (${money(10 * pairCount)}–${money(15 * pairCount)})` : ""}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-zinc-300">Select a service and at least 2 pairs to see your estimate.</p>
                )}
                <p className="mt-3 text-xs text-zinc-400">
                  Indicative service pricing in AUD. Icy Sole Revival starts at $85 per pair.
                  Final pricing, any applicable delivery charges, and extra work will be confirmed after inspection.
                </p>
              </div>

              {/* Sneaker model & notes */}
              <input name="model" placeholder="Sneaker model(s) (e.g., AJ1, Yeezy 350)" className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2" />
              <textarea name="notes" rows={4} className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2" placeholder="Notes (stains, yellowing, suede, etc.)"></textarea>

              {/* Consent */}
              <label className="sm:col-span-2 text-sm text-zinc-300 flex items-start gap-3">
                <input required type="checkbox" className="mt-1" />
                <span>
                  I agree to the <a href="/terms" className="underline">Terms of Service</a>, understand final pricing may change after inspection, and acknowledge that UNLACE provides cleaning only, not repairs or restoration of physical damage.
                </span>
              </label>

              {/* Submit */}
              <button type="submit" className="sm:col-span-2 rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform">
                Request Pick-Up
              </button>

              <p className="text-xs text-zinc-500 sm:col-span-2">
                After you submit, we’ll reply asking for photos to confirm the condition and final quote.
              </p>
            </form>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400">
            <div className="text-center md:text-left">
              <p className="font-semibold text-white">UNLACE — Melbourne’s Sneaker Atelier</p>
              <p className="mt-1 text-zinc-400">
                Trusted care for your kicks, from pick-up to return.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 md:gap-3">
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white flex items-center gap-1">
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
              <a href={CONTACT.instagram} className="hover:text-white" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <div className="flex gap-3 text-xs mt-2">
                <a href="/privacy" className="hover:text-white">Privacy</a>
                <span className="opacity-40">•</span>
                <a href="/terms" className="hover:text-white">Terms</a>
              </div>
              <p className="text-xs text-zinc-500 mt-2">© {new Date().getFullYear()} UNLACE — Melbourne, VIC</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
