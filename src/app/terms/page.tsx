import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal">
        <h1>Terms of Use</h1>
        <p>Last updated: August 9, 2026</p>
        <p>
          By using this site you agree to apply in good faith for coaching consideration. Applying
          does not guarantee acceptance or results. Coaching terms are provided separately if you
          enroll.
        </p>
        <p>
          <Link href="/">← Back to funnel</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}