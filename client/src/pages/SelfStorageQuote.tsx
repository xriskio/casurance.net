import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import SelfStorageQuoteForm from "@/components/SelfStorageQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function SelfStorageQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Self Storage Facility Insurance Quote"
        description="Get insurance for self storage facilities. Protect your storage business with property, liability, and customer goods coverage."
        keywords="self storage insurance, storage facility insurance, mini storage insurance, storage unit insurance"
        canonical="/quote/self-storage"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Self Storage Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Protect your self storage facility with comprehensive insurance coverage.
              </p>
              <p className="text-sm text-muted-foreground">
                Our self storage insurance provides comprehensive coverage for facility owners and operators, including 
                property protection, liability coverage, and specialized protection for unique risks associated with 
                self storage operations such as tenant disputes, security issues, and environmental concerns.
              </p>
            </CardContent>
          </Card>

          <SelfStorageQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
