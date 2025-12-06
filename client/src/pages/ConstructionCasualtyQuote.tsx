import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import ConstructionCasualtyQuoteForm from "@/components/ConstructionCasualtyQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function ConstructionCasualtyQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Construction Casualty Insurance Quote"
        description="Get comprehensive construction casualty insurance. Coverage for general contractors, subcontractors, and construction operations."
        keywords="construction insurance, contractor insurance, construction liability, subcontractor insurance"
        canonical="/quote/construction-casualty"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Construction Casualty Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Protect your contracting business with comprehensive construction casualty insurance coverage.
              </p>
              <p className="text-sm text-muted-foreground">
                Our construction casualty insurance protects contractors, subcontractors, and construction companies from 
                third-party claims of bodily injury and property damage arising from construction operations. Coverage includes 
                protection for both ongoing and completed work, contractual liability, and defense costs.
              </p>
            </CardContent>
          </Card>

          <ConstructionCasualtyQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
