// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Stars, Clock, BadgeCheck, Mail, Sparkles, Truck } from "lucide-react";
import Header from "../components/Header";

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

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 ${className}`}
    />
  );
}

export default function Home() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // ✅ Your Formspree endpoint
    const endpoint = "https://formspree.io/f/xyzpanlv";

    formData.append("_subject", "New UNLACE Pickup Request");
    formData.append("_next", "/thank-you");

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      router.push("/thank-you");
    } else {
      alert("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>UNLACE — Melbourne’s Premium Sneaker Laundry</title>
        <meta
          name="description"
          content="UNLACE offers premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery."
        />
        <link rel="icon" href="/favicon.ico" />
        <style>{`html{scroll-behavior:smooth}`}</style>
      </Head>

      <Header />

      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* ==== HERO ==== */}
        <section id="hero" className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs mb-3">
                Australia’s Premium Sneaker Laundry
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold">
                UNLACE your sneakers — relace your style.
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl">
                From grails to beaters, we revive every pair with precision cleaning and restoration.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#pickup" className="rounded-2xl bg-white text-black px-6 py-3 font-semibold">
                  Book a Pickup
                </a>
                <a href="#services" className="rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white hover:text-black">
                  Explore Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==== SERVICES ==== */}
        <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl sm:text-4xl font-bold">Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card icon={<Droplets className="h-6 w-6" />} title="Essential Clean" desc="Exterior-only clean for uppers & midsoles — fast refresh for daily wear." price="$39" />
            <Card icon={<Droplets className="h-6 w-6" />} title="Premium Detail" desc="Deep clean of upper, midsole, insole & laces + deodorising." price="$69" />
            <Card icon={<Stars className="h-6 w-6" />} title="Whitening & De-yellowing" desc="Icy sole restoration and stain reduction." price="From $129" />
          </div>
        </section>

        {/* ==== PICKUP FORM ==== */}
        <section id="pickup" className="bg-zinc-950 border-t border-white/10 scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Request a Pick-Up</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" placeholder="Full name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="phone" placeholder="Phone" required className="sm:col-span-2" />
              <Input name="address" placeholder="Pickup address" required className="sm:col-span-2" />
              <Input name="suburb" placeholder="Suburb" required />
              <Input name="postcode" placeholder="Postcode" required />
              <Input name="date" type="date" required />
              <select name="time_window" required className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <option value="">Preferred time window</option>
                <option>9:00 – 12:00</option>
                <option>12:00 – 3:00</option>
                <option>3:00 – 6:00</option>
              </select>
              <select name="service_tier" required className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <option value="">Service tier</option>
                <option>Essential Clean</option>
                <option>Premium Detail</option>
                <option>Whitening & De-yellowing</option>
              </select>
              <fieldset className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <legend className="text-sm text-zinc-400">Extras</legend>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="extras[]" value="Lace Swap" /> Lace Swap
                </label>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="extras[]" value="Protection Coating" /> Protection Coating
                </label>
              </fieldset>
              <textarea name="notes" rows={4} className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 sm:col-span-2" placeholder="Notes (e.g. stains, yellowing)" />
              <label className="sm:col-span-2 text-sm text-zinc-400">Upload sneaker photos (optional)</label>
              <input type="file" name="photos" accept="image/*" multiple className="sm:col-span-2 bg-black border border-white/10 rounded-xl px-4 py-3" />
              <label className="sm:col-span-2 text-sm text-zinc-300 flex items-start gap-3">
                <input required type="checkbox" className="mt-1" />
                <span>I agree to the <a href="/terms" className="underline">Terms of Service</a></span>
              </label>
              <button disabled={submitting} className="sm:col-span-2 rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform">
                {submitting ? "Submitting..." : "Request Pick-Up"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
