import Header from "../components/Header";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Brush, Truck, Stars, Clock, BadgeCheck, Mail } from "lucide-react";
import Toast from "../components/Toast";

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-black hover:border-white/30 transition-colors">
      <div className="h-6 w-6 mb-4" aria-hidden>{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-300 text-sm">{desc}</p>
    </div>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  const { className = "", ...rest } = props;
  return <input {...rest} className={`bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 ${className}`} />;
}

export default function Home() {
  const router = useRouter();
  const [toastOpen, setToastOpen] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  // 👇 paste your real Formspree endpoint here
  const endpoint = "https://formspree.io/f/xyzpanlv";

  // Optional extras sent to Formspree:
  formData.append("_subject", "New UNLACE Pickup Request");
  formData.append("_next", "/thank-you"); // we also call router.push below—both are fine

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (res.ok) {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
      router.push("/thank-you");
    }, 1200);
    form.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
}

  return (
    <>
      <Head>
        <title>UNLACE — Melbourne’s Premium Sneaker Laundry</title>
        <meta name="description" content="UNLACE offers premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery." />
        <meta property="og:title" content="UNLACE — Melbourne’s Premium Sneaker Laundry" />
        <meta property="og:description" content="Premium sneaker cleaning, restoration, and protection with Melbourne-wide pick-up & delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "UNLACE",
              "image": "/og-image.jpg",
              "description": "Premium sneaker cleaning, restoration, and protection in Melbourne.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Melbourne",
                "addressRegion": "VIC",
                "postalCode": "3000",
                "addressCountry": "AU"
              },
              "telephone": "+61452507067",
              "url": "https://unlace.com.au",
              "sameAs": ["https://www.instagram.com/unlace"]
            })
          }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* Toast */}
        <Toast open={toastOpen}>Request received — we’ll confirm shortly.</Toast>

        {/* Hero */}
        <section id="hero" className="relative border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="uppercase tracking-[0.35em] text-zinc-400 text-xs mb-3">Australia’s Premium Sneaker Laundry</p>
              <h1 className="text-4xl sm:text-6xl font-extrabold">UNLACE your sneakers — relace your style.</h1>
              <p className="mt-4 text-zinc-300 max-w-2xl">From grails to beaters, we revive every pair with precision cleaning and restoration. Pick-up & delivery across Melbourne.</p>
              <div className="mt-8 flex gap-4">
                <a href="#pickup" className="rounded-2xl bg-white text-black px-6 py-3 font-semibold">Book a Pickup</a>
                <a href="#services" className="rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white hover:text-black">Explore Services</a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Eco-safe products</div>
                <div className="flex items-center gap-2"><Truck className="h-4 w-4"/> Pick-up & delivery</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4"/> 48h turnaround*</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-zinc-300 mb-4">At UNLACE, we believe your sneakers are more than just shoes — they’re a statement, a memory, and an investment worth protecting. Founded in Melbourne, our mission is to deliver world-class sneaker cleaning, restoration, and care to sneakerheads, collectors, and everyday wearers alike.</p>
          <p className="text-zinc-300 mb-4">Our team is made up of passionate sneaker enthusiasts who understand the unique needs of different materials, from premium leather to delicate suede. We combine expert craftsmanship with eco-friendly products, ensuring every pair receives meticulous attention without compromising the planet.</p>
          <p className="text-zinc-300">Whether it’s reviving your beaters, preserving your grails, or getting your daily rotation looking fresh, UNLACE offers Melbourne-wide pick-up and delivery for ultimate convenience. We’re here to keep your kicks looking as good as the day you copped them — or better.</p>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl sm:text-4xl font-bold">Services</h2>
            <p className="text-sm text-zinc-400">Meticulous care, premium results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card icon={<Droplets className="h-6 w-6" />} title="Deep Clean" desc="Upper, midsole, insole & laces — material-safe methods for leather, mesh, suede, nubuck." />
            <Card icon={<Brush className="h-6 w-6" />} title="Suede & Nubuck Care" desc="Colour-safe revivals with gentle nap restoration and protection." />
            <Card icon={<Stars className="h-6 w-6" />} title="Whitening & De-yellowing" desc="Icy sole restoration and stain reduction for that fresh-out-the-box feel." />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card icon={<BadgeCheck className="h-6 w-6" />} title="Protection Coating" desc="Water & stain repellent to keep your kicks cleaner for longer." />
            <Card icon={<Truck className="h-6 w-6" />} title="Pick-up & Delivery" desc="Door-to-door convenience across Melbourne metro." />
            <Card icon={<Stars className="h-6 w-6" />} title="Detailing & Lace Swap" desc="Relacing, edge repaint, glue touch-ups, deodorise & detail." />
          </div>
        </section>

        {/* Pickup Booking */}
        <section id="pickup" className="bg-zinc-950 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Request a Pick-Up</h2>
            <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Pickup booking form">
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
                <option>After hours (request)</option>
              </select>
              <select name="service_tier" required className="bg-black border border-white/10 rounded-xl px-4 py-3">
                <option value="">Service tier</option>
                <option>Essential Clean</option>
                <option>Premium Detail</option>
                <option>Restoration</option>
              </select>
              <textarea name="notes" placeholder="Sneaker model(s) & notes" className="bg-black border border-white/10 rounded-xl px-4 py-3 sm:col-span-2" rows={4} />
              <label className="sm:col-span-2 text-sm text-zinc-400">Upload sneaker photos (optional)</label>
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className="sm:col-span-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              />
              <label className="sm:col-span-2 text-sm text-zinc-300 flex items-start gap-3">
                <input required type="checkbox" className="mt-1"/>
                <span>
                  I agree to the <a href="/terms" className="underline">Terms of Service</a> and understand final pricing may change after inspection.
                </span>
              </label>
              <button className="sm:col-span-2 rounded-2xl bg-white text-black px-6 py-3 font-semibold">Request Pick-Up</button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400">
            <div>© {new Date().getFullYear()} UNLACE — Melbourne, VIC</div>
            <div className="flex items-center gap-4">
              <a href="mailto:unlacesneakers@gmail.com" className="hover:text-white flex items-center gap-1">
                <Mail className="h-4 w-4"/> unlacesneakers@gmail.com
              </a>
              <span className="opacity-40">•</span>
              <a href="https://www.instagram.com/unlacesneakers/" className="hover:text-white" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <span className="opacity-40">•</span>
              <a href="tel:+61YOURNUMBER" className="hover:text-white">+61452507067</a>
              <span className="opacity-40">•</span>
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <span className="opacity-40">•</span>
              <a href="/terms" className="hover:text-white">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
