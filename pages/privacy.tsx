import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — UNLACE</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-black text-white px-4">
        <div className="mx-auto max-w-3xl py-16">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-zinc-300">
            This Privacy Policy explains how UNLACE (“we”, “us”) collects, uses and protects your personal information in
            accordance with the Australian Privacy Principles (APPs).
          </p>

          <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
          <ul className="mt-3 text-zinc-300 list-disc pl-6 space-y-2">
            <li>Contact details (name, email, phone, suburb/postcode, address for pick-up/delivery)</li>
            <li>Booking details (service tier, date/time, notes, uploaded photos)</li>
            <li>Communications (emails, messages, follow-ups)</li>
            <li>Website analytics (cookies or similar, if enabled)</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">How We Use Your Information</h2>
          <ul className="mt-3 text-zinc-300 list-disc pl-6 space-y-2">
            <li>To process and fulfil bookings, including inspection-based pricing</li>
            <li>To communicate about pick-up, delivery and service updates</li>
            <li>To improve our services and website experience</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">Storage & Security</h2>
          <p className="mt-3 text-zinc-300">
            We take reasonable steps to protect personal information from misuse, interference and loss, as well as unauthorised
            access, modification or disclosure. Only authorised personnel have access on a need-to-know basis.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Sharing</h2>
          <p className="mt-3 text-zinc-300">
            We do not sell your personal information. We may share limited information with service providers (e.g. email or form
            processing) to operate the website and manage bookings.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Retention</h2>
          <p className="mt-3 text-zinc-300">
            We keep personal information only as long as necessary for the purposes set out above, unless a longer retention period
            is required by law.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Your Rights</h2>
          <p className="mt-3 text-zinc-300">
            You may request access to, or correction of, your personal information. Contact us using the details below.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-zinc-300">
            Email: <a className="underline" href="mailto:unlacesneakers@gmail.com">unlacesneakers@gmail.com</a>
          </p>

          <p className="mt-10 text-xs text-zinc-500">
            This policy is a general template and does not constitute legal advice.
          </p>
        </div>
      </main>
    </>
  );
}
