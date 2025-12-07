import NemtApplicationFormComprehensive from "@/components/NemtApplicationFormComprehensive";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

export default function AmbulanceApplicationPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <SEOHead
        title="Ambulance Insurance Application"
        description="Apply for comprehensive ambulance service insurance coverage. Protect your emergency medical service operations with specialized commercial auto and liability coverage."
        keywords="ambulance insurance, EMS insurance, emergency medical service insurance, ambulance liability"
        canonical="/apply/ambulance"
      />
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-sm text-muted-foreground mb-4">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Ambulance Insurance Application</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Ambulance Insurance Application</h1>
          <p className="text-muted-foreground">
            Complete this application to get comprehensive insurance coverage for your Ambulance service operations.
          </p>
        </div>
        <NemtApplicationFormComprehensive applicationType="ambulance" />
      </div>
    </main>
  );
}
