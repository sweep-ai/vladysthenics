import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export default function DisclaimerPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal">
        <h1>Disclaimer</h1>
        <p>
          Training results vary. Founder timelines (front lever in 4 months; one-arm handstand in 7
          months) describe Vlad&apos;s own training restart and are not a guarantee of your results.
          This site is not medical advice. Consult a qualified professional before beginning a new
          training program.
        </p>
        <p>
          <Link href="/">← Back to funnel</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}