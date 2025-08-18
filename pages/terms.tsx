import Head from "next/head";
import Header from "../components/Header";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — UNLACE</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-black text-white px-4">
        <div className="mx-auto max-w-3xl py-16">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-zinc-300">
            These Terms of Service (“Terms”) govern your use of UNLACE services. By placing a booking, you agree to these Terms.
          </p>

          <h2 className="mt-10 text-xl font-semibold">1. Services</h2>
          <p className="mt-3 text-zinc-300">
            We provide sneaker cleaning, detailing, restoration and protection. Services are performed based on the condition and
            material of the sneakers, as assessed by our team.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Inspection & Pricing</h2>
          <p className="mt-3 text-zinc-300">
            All bookings are subject to inspection. Pricing may vary depending on condition, materials and required treatments.
            We will contact you if additional fees are applicable before proceeding.
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Turnaround</h2>
          <p className="mt-3 text-zinc-300">
            Estimated times (e.g., Essential 24–48h) are indicative and may vary based on volume and condition. Express options
            may be available on request.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Pick-up & Delivery</h2>
          <p className="mt-3 text-zinc-300">
            We offer door-to-door service within Melbourne metro. Mail-in service is available outside metro by arrangement.
            Risk during transit is the sender’s responsibility unless otherwise agreed.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Care & Limitations</h2>
          <p className="mt-3 text-zinc-300">
            While we take utmost care, some stains, yellowing or damage may be permanent. Certain materials (e.g. delicate suede,
            vintage or oxidised components) carry inherent risk. Colour transfer or slight shade variance may occur.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Photos & Marketing</h2>
          <p className="mt-3 text-zinc-300">
            With your consent, we may take before/after photos for quality control and marketing. Personal details will not be
            disclosed. You may opt out in the booking notes.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Payment & Cancellations</h2>
          <p className="mt-3 text-zinc-300">
            Payment terms are confirmed at booking or on collection/delivery. Cancellations or reschedules should be requested
            with reasonable notice.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Liability</h2>
          <p className="mt-3 text-zinc-300">
            To the maximum extent permitted by law, our liability is limited to re-performing the service or refunding the
            service fee. We are not responsible for indirect or consequential loss.
          </p>

          <h2 className="mt-8 text-xl font-semibold">9. Governing Law</h2>
          <p className="mt-3 text-zinc-300">
            These Terms are governed by the laws of Victoria, Australia. Disputes will be subject to the exclusive jurisdiction
            of the courts of Victoria.
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Contact</h2>
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
