import TncRideshareApplicationForm from "@/components/TncRideshareApplicationForm";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

export default function TncRideshareApplicationPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <SEOHead
        title="TNC & Rideshare Insurance Application"
        description="Apply for TNC and rideshare insurance coverage for your transportation network company. Comprehensive coverage for Uber, Lyft, and on-demand mobility platforms."
        keywords="TNC insurance, rideshare insurance, Uber insurance, Lyft insurance, mobility platform insurance"
        canonical="/apply/tnc-rideshare"
      />
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-sm text-muted-foreground mb-4">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/request-quote">
              <span className="hover:text-foreground cursor-pointer">Request Quote</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">TNC/Rideshare Application</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">TNC / Rideshare / Mobility Insurance Application</h1>
          <p className="text-muted-foreground">
            Complete this application to get comprehensive insurance coverage for your Transportation Network Company, rideshare platform, or on-demand mobility service.
          </p>
        </div>
        <TncRideshareApplicationForm />
      </div>
    </main>
  );
}
