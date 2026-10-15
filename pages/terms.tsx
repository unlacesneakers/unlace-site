import Head from "next/head";
import Header from "../components/Header";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — UNLACE</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Header />
      <main className="min-h-screen bg-black text-white px-4">
        <div className="mx-auto max-w-3xl py-16">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-zinc-300">
            These Terms of Service (“Terms”) govern your use of UNLACE services. By placing a booking, you agree to these Terms.
          </p>

          <h2 className="mt-10 text-xl font-semibold">1. Services</h2>
          <p className="mt-3 text-zinc-300">
            UNLACE provides sneaker cleaning, detailing, cosmetic de-yellowing and protective treatments. We do not provide shoe repairs or restoration of physical damage. Services are performed based on the condition and material of the sneakers, as assessed by our team.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Minimum Booking Requirement</h2>
          <p className="mt-3 text-zinc-300">
            A minimum of two pairs of sneakers is required per booking. Customers must provide an accurate pair count when requesting a pick-up. Any changes to the number of pairs or selected services may affect the estimated price.
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Inspection &amp; Pricing</h2>
          <p className="mt-3 text-zinc-300">
            All bookings are subject to inspection. Prices displayed during booking are estimates, not final quotes. Pricing may vary depending on condition, materials and required treatments. We will contact you if additional fees are applicable before proceeding.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Turnaround</h2>
          <p className="mt-3 text-zinc-300">
            Our standard estimated turnaround is 4–5 business days, depending on the selected service, sneaker condition and current booking volume. This is an estimate rather than a guaranteed completion date. We will advise you if additional time is required.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Pick-up &amp; Delivery</h2>
          <p className="mt-3 text-zinc-300">
            We offer door-to-door service within Melbourne metro. Mail-in service is available outside metro by arrangement. Customers should package sneakers securely for transport. Responsibility for loss or damage during transit will be determined by the circumstances and applicable law.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Cleaning-Only Policy &amp; Service Limitations</h2>
          <p className="mt-3 text-zinc-300">
            UNLACE specialises in sneaker cleaning and cosmetic care only. We do not repair or restore physically damaged shoes, including torn or cracked materials, detached soles, damaged stitching, broken components or structural defects.
          </p>
          <p className="mt-3 text-zinc-300">
            Cleaning may improve appearance but cannot reverse existing wear or physical damage. Some stains, discolouration and yellowing may be permanent. Our Icy Sole Revival treatment is a cosmetic de-yellowing service; it does not repair soles or guarantee complete whitening.
          </p>
          <p className="mt-3 text-zinc-300">
            Certain materials, including delicate suede, vintage fabrics and oxidised components, may be especially vulnerable during cleaning. We will assess the condition of sneakers and may decline or modify a treatment where we believe it cannot be performed safely. Nothing in these Terms excludes our responsibility for a failure to exercise due care and skill or other rights available under Australian Consumer Law.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Photos &amp; Marketing</h2>
          <p className="mt-3 text-zinc-300">
            With your consent, we may take before/after photos for quality control and marketing. Personal details will not be disclosed. You may opt out in the booking notes.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Payment &amp; Cancellations</h2>
          <p className="mt-3 text-zinc-300">
            Payment terms are confirmed at booking or on collection/delivery. Cancellations or reschedules should be requested with reasonable notice.
          </p>

          <h2 className="mt-8 text-xl font-semibold">9. Liability &amp; Consumer Rights</h2>
          <p className="mt-3 text-zinc-300">
            Nothing in these Terms excludes, restricts or modifies any consumer guarantees, rights or remedies that cannot lawfully be excluded under the Australian Consumer Law. Where permitted by law, we are not responsible for indirect or consequential loss unrelated to a breach of our legal obligations. Any remedy for a service issue will be assessed in accordance with applicable consumer law.
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Governing Law</h2>
          <p className="mt-3 text-zinc-300">
            These Terms are governed by the laws of Victoria, Australia. Disputes will be handled in accordance with applicable laws and any relevant rights to seek a remedy through a court or tribunal.
          </p>

          <h2 className="mt-8 text-xl font-semibold">11. Contact</h2>
          <p className="mt-3 text-zinc-300">
            Questions? Email us at <a className="underline" href="mailto:unlacesneakers@gmail.com">unlacesneakers@gmail.com</a>.
          </p>

          <p className="mt-10 text-xs text-zinc-500">
            This content is a general template and does not constitute legal advice.
          </p>
        </div>
      </main>
    </>
  );
}
