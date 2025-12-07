import NemtApplicationFormComprehensive from "@/components/NemtApplicationFormComprehensive";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

export default function NemtApplicationPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <SEOHead
        title="NEMT & Paratransit Insurance Application"
        description="Apply for comprehensive NEMT and paratransit insurance coverage. Protect your non-emergency medical transportation business with specialized coverage."
        keywords="NEMT insurance, paratransit insurance, non-emergency medical transportation, medical transport insurance"
        canonical="/apply/nemt"
      />
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-sm text-muted-foreground mb-4">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/industry/nemt-paratransit">
              <span className="hover:text-foreground cursor-pointer">NEMT & Paratransit</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Insurance Application</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">NEMT & Paratransit Insurance Application</h1>
          <p className="text-muted-foreground">
            Complete this application to get comprehensive insurance coverage for your Non-Emergency Medical Transportation or Paratransit business.
          </p>
        </div>
        <NemtApplicationFormComprehensive applicationType="nemt" />
      </div>
    </main>
  );
}
