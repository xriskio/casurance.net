import FairPlanQuoteForm from "@/components/FairPlanQuoteForm";
import { Link } from "wouter";
import { ChevronLeft, Phone, Flame, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function FairPlanQuotePage() {
  return (
    <>
      <Helmet>
        <title>California FAIR Plan Quote | Fire Insurance for High-Risk Properties | Casurance</title>
        <meta name="description" content="Request a California FAIR Plan quote for residential or commercial properties. Last resort fire insurance when traditional coverage is unavailable. Licensed FAIR Plan broker serving all of California." />
        <meta name="keywords" content="California FAIR Plan, FAIR Plan insurance, wildfire insurance, brush area insurance, fire insurance, high-risk property insurance" />
        <link rel="canonical" href="https://casurance.net/quote/fair-plan" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link href="/coverage/california-fair-plan">
            <span className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to California FAIR Plan Coverage
            </span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FairPlanQuoteForm />
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold">About the FAIR Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The California FAIR Plan provides basic fire insurance for properties that cannot obtain coverage through the traditional insurance market due to wildfire risk.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Covers fire, lightning, and internal explosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Residential limits up to $3 million</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Commercial limits up to $100 million</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Optional vandalism coverage available</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our licensed agents are ready to help you navigate the FAIR Plan application process.
                </p>
                <a 
                  href="tel:1-888-254-0089" 
                  className="flex items-center gap-2 text-primary font-semibold hover:underline"
                  data-testid="link-phone"
                >
                  <Phone className="h-4 w-4" />
                  1-888-254-0089
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  Monday - Friday, 9am - 5pm PT
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-semibold text-amber-800 mb-3">Important Notice</h3>
                <p className="text-sm text-amber-700">
                  The FAIR Plan is designed as a temporary solution. We will also explore traditional market options that may provide broader coverage at competitive rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
