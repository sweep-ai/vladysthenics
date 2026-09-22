import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal">
        <h1>Privacy Policy</h1>
        <p>Last updated: August 9, 2026</p>
        <p>
          Vladysthenics (&quot;we&quot;) collects information you submit through the application
          form (name, email, phone, social handle, quiz answers) to evaluate fit and schedule a
          strategy call.
        </p>
        <p>
          We may use Meta Pixel / Conversions API, Microsoft Clarity, Calendly, Zapier, and CRM
          tools when configured. Replace this stub with counsel-reviewed copy before paid traffic.
        </p>
        <p>
          <Link href="/">← Back to funnel</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}