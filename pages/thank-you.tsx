import Link from "next/link";
import Head from "next/head";

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You — UNLACE</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Thank you!</h1>
          <p className="text-zinc-300 mb-8">
            We’ve received your pick-up request and will confirm your time window shortly via SMS or email.
          </p>
          <Link href="/" className="inline-block rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
