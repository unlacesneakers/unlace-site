// pages/index.tsx
// UNLACE — Melbourne’s Premium Sneaker Atelier

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

// Centralized contact details (edit here once)
const CONTACT = {
  email: "unlacesneakers@gmail.com",
  phone: "+61452507067",
  instagram: "https://www.instagram.com/unlacesneakers/#",
  siteUrl: "https://unlace.com.au",
};

// Components
import Header from "../components/Header";
import TopBanner from "../components/TopBanner";
import GuaranteeStrip from "../components/GuaranteeStrip";
import WhyChooseUs, { Benefit } from "../components/WhyChooseUs";
import ProcessSteps, { Step } from "../components/ProcessSteps";
import FAQ, { QA } from "../components/FAQ";
import SchemaFAQ from "../components/SchemaFAQ";

// ---------- Inline brand wordmark (shoe icon + UNLACE) ----------

function UnlaceShoeIcon({
  height = 56,
  className = "text-white",
  title = "UNLACE shoe",
}: {
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 110"
      height={height}
      aria-label={title}
      role="img"
      className={className}
    >
      {/* Minimalist, hand-traced shoe outline. Uses currentColor. */}
      <g fill="none" stroke="currentColor" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
        {/* Sole */}
        <path d="M10 88 C40 90, 78 86, 110 74 C128 67, 140 59, 154 51 C160 48, 166 50, 172 54 C181 60, 188 64, 192 64 C195 64, 196 70, 189 75 C181 81, 171 88, 160 88 L10 88 Z" />
        {/* Upper sweep */}
        <path d="M26 69 C40 58, 52 54, 68 55 C77 56, 88 60, 100 68" />
        {/* Lace throat */}
        <path d="M70 55 C72 59, 78 63, 84 66" />
        {/* Heel to toe upper */}
        <path d="M26 69 C30 53, 36 40, 40 36 C45 31, 50 31, 56 34 C64 38, 72 44, 84 48 C100 53, 114 50, 128 44" />
        {/* Signature lace loop rising above heel */}
        <path d="M50 28 C50 18, 58 12, 66 14 C72 16, 74 22, 72 30 C70 38, 74 44, 78 50" />
      </g>
    </svg>
  );
}

function UnlaceWordmark({ size = 56, className = "" }: { size?: number; className?: string }) {
  const textPx = Math.round(size * 0.9); // scale text proportionally to icon height
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} style={{ lineHeight: 0 }}>
      <UnlaceShoeIcon height={size} className="text-white" />
      <span
        className="font-extrabold tracking-tight text-white"
        style={{ fontSize: `${textPx}px` }}
        aria-label="UNLACE"
      >
        UNLACE
      </span>
    </div>
  );
}

// ---------- Content data ----------

const benefits: Benefit[] = [
  { id: "b1", title: "Professional deep clean", desc: "From midsoles to laces — premium tools and solutions for every material." },
  { id: "b2", title: "Icy sole revival & whitening", desc: "Targeted treatments to revive oxidised rubber and aged soles." },
  { id: "b3", title: "Pick-up & return", desc: "Door-to-door service across Melbourne. Convenient and secure." },
  { id: "b4", title: "Care for rare pairs", desc: "Material-specific methods for suede, nubuck, canvas, leather and knit." },
  { id: "b5", title: "Protection coating", desc: "Hydrophobic finish to keep pairs fresher for longer." },
  { id: "b6", title: "Local & responsive", desc: "Fast turnaround with friendly updates via SMS/Instagram." },
];

const steps: Step[] = [
  { id: "s1", title: "Request a pick-up", desc: "Use the booking form. We’ll confirm a time via SMS." },
  { id: "s2", title: "Assessment & quote", desc: "We inspect your pair and confirm any extras before starting." },
  { id: "s3", title: "Clean & treat", desc: "Deep clean + whitening options, lace swap and protection if selected." },
  { id: "s4", title: "Return like-new", desc: "Delivered back to you across Melbourne—ready to wear." },
];

const faqs: QA[] = [
  {
    q: "How do pick-ups work?",
    a: <>Book through our online form and select a time window. We’ll confirm via SMS and handle the rest. Standard turnaround is 2–4 days depending on service and condition.</>,
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
  { q: "How do pick-ups work?", a: "Book through our online form and select a time window. We’ll confirm via SMS. Standard turnaround is 2–4 days depending on service and condition." },
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
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>UNLACE — Melbourne’s Premium Sneaker Atelier</title>
        <meta
          name="description"
          content="UNLACE offers premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery."
        />
        <meta property="og:title" content="UNLACE — Melbourne’s Premium Sneaker Atelier" />
        <meta
          property="og:description"
          content="Premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`html{scroll-behavior:smooth}`}</style>

        {/* LocalBusiness schema with centralized contact */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "UNLACE",
              image: "/og-image.jpg",
              description:
                "Premium sneaker cleaning, restoration, and protection in Melbourne.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Melbourne",
                addressRegion: "VIC",
                postalCode: "3000",
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

      {/* -------- Header -------- */}
      <Header />

      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* ========== HERO ========== */}
        <section id="hero" className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* ✅ Code-based brand (shoe icon + UNLACE) — crisp, scalable */}
              <UnlaceWordmark size={64} className="mb-6" />

              {/* Strapline — 'Sneaker Atelier' */}
              <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs mb-3 text-center">
                Australia’s Premium Sneaker Atelier
              </p>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-center">
                UNLACE your sneakers — relace your style.
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl mx-auto text-center">
                From daily beaters to grail-level pairs, UNLACE restores sneakers with precision
                techniques and eco-safe care. Door-to-door pick-up & return across Melbourne.
              </p>
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
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Eco-safe products
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Pick-up & delivery
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> 3 to 4 days*
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ✅ Guarantee bar right after Hero */}
        <GuaranteeStrip />

        {/* TopBanner carousel */}
        <TopBanner />

        {/* ========== ABOUT ========== */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-zinc-300 mb-4">
            At UNLACE, we believe sneakers are more than just footwear — they’re culture, memory, and investment.
            Founded in Melbourne, our mission is simple: to give every pair the same meticulous care we give our own.
          </p>
          <p className="text-zinc-300 mb-4">
            Our team is made up of sneakerheads who understand the nuances of premium materials. From delicate suede
            to aged rubber, every clean is tailored with eco-safe solutions and specialist techniques.
          </p>
          <p className="text-zinc-300">
            Whether it’s reviving beaters, preserving grails, or refreshing your daily rotation, UNLACE offers
            convenient Melbourne-wide pick-up and return. Every sneaker is treated with precision, passion, and
            respect — so they look and feel as good as the day you copped them.
          </p>
        </section>

        {/* ✅ Why Choose Us */}
        <WhyChooseUs items={benefits} />

        {/* ========== SERVICES ========== */}
        <section
          id="services"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24"
        >
          <div className="mb-8 sm:mb-10 flex items-end justify-between">
            <h2 className="text-2xl sm:text-4xl font-bold">Services</h2>
            <p className="text-sm text-zinc-400">Meticulous care, premium results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Essential Clean"
              desc="A quick reset for your daily rotation. Exterior clean of uppers & midsoles — restores freshness without the wait."
              price="$39"
            />
            <Card
              icon={<Droplets className="h-6 w-6" />}
              title="Premium Detail"
              desc="Full inside-out deep clean: uppers, midsoles, insoles & laces. Material-safe for leather, mesh, suede & nubuck — finished with deodorising."
              price="$55"
            />
            <Card
              icon={<Stars className="h-6 w-6" />}
              title="Icy Sole Revival"
              desc="Reverse yellowing and oxidation with targeted whitening & stain treatment. Bring back that fresh-out-the-box glow."
              price="From $85"
            />
          </div>

          {/* Extras */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Extras</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Custom add-ons to elevate your clean.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <Card
                icon={<BadgeCheck className="h-6 w-6" />}
                title="Protection Coating"
                desc="Hydrophobic layer that repels water & stains — keep your sneakers fresher for longer."
                price="$20"
              />
              <Card
                icon={<BadgeCheck className="h-6 w-6" />}
                title="Lace Swap"
                desc="Swap in fresh stock laces or customise with a premium replacement — fitted to your pair."
                price="$10–$15"
              />
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <ProcessSteps items={steps} />

        {/* FAQ */}
        <FAQ items={faqs} />
        <SchemaFAQ items={faqsForSchema} />

        {/* ========== PICKUP BOOKING (API) ========== */}
        <section id="pickup" className="bg-zinc-950 border-t border-white/10 scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Request a Pick-Up</h2>

            <form
              action="/api/pickup"
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              aria-label="Pickup booking form"
            >
              {/* Hidden helpers */}
              <input type="hidden" id="subjectField" name="_subject" value="New UNLACE Pickup Request" />
              <input type="text" name="honeypot" className="hidden" aria-hidden="true" />

              {/* Contact & address */}
              <input
                name="name"
                placeholder="Full name"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
              />
              <input
                name="phone"
                placeholder="Phone"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2"
              />
              <input
                name="address"
                placeholder="Pickup address"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2"
              />
              <input
                name="suburb"
                placeholder="Suburb"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
              />
              <input
                name="postcode"
                placeholder="Postcode"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
              />

              {/* Date & time window */}
              <input
                name="date"
                type="date"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
              />
              <select
                name="time_window"
                required
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
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
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
                onChange={(e) => {
                  const subjectField = document.getElementById("subjectField") as HTMLInputElement | null;
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

              {/* Extras (right) */}
              <fieldset className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <legend className="text-sm text-zinc-400">Extras (optional)</legend>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Protection Coating" />
                    <span>Protection Coating</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="extras[]" value="Lace Swap" />
                    <span>Lace Swap</span>
                  </label>
                </div>
              </fieldset>

              {/* Sneaker model & notes */}
              <input
                name="model"
                placeholder="Sneaker model(s) (e.g., AJ1, Yeezy 350)"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2"
              />
              <textarea
                name="notes"
                rows={4}
                className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2"
                placeholder="Notes (stains, yellowing, suede, etc.)"
              ></textarea>

              {/* Consent */}
              <label className="sm:col-span-2 text-sm text-zinc-300 flex items-start gap-3">
                <input required type="checkbox" className="mt-1" />
                <span>
                  I agree to the <a href="/terms" className="underline">Terms of Service</a> and
                  understand final pricing may change after inspection.
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
            {/* Brand tagline */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-white">UNLACE — Melbourne’s Sneaker Atelier</p>
              <p className="mt-1 text-zinc-400">
                Trusted care for your kicks, from pick-up to return.
              </p>
            </div>

            {/* Contact + links */}
            <div className="flex flex-col items-center md:items-end gap-2 md:gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-white flex items-center gap-1"
              >
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <div className="flex gap-3 text-xs mt-2">
                <a href="/privacy" className="hover:text-white">Privacy</a>
                <span className="opacity-40">•</span>
                <a href="/terms" className="hover:text-white">Terms</a>
              </div>

              <p className="text-xs text-zinc-500 mt-2">
                © {new Date().getFullYear()} UNLACE — Melbourne, VIC
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
