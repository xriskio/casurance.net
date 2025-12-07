import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import CommercialPropertyQuoteForm from "@/components/CommercialPropertyQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CommercialPropertyQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Property Insurance Quote"
        description="Get commercial property insurance for shopping centers, office buildings, warehouses, and real estate investments. Protect your property with comprehensive coverage."
        keywords="commercial property insurance, building insurance, real estate insurance, landlord insurance, property damage coverage"
        canonical="/quote/commercial-property"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Commercial Property & Real Estate Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Comprehensive coverage for property owners, managers, and real estate investments.
              </p>
              <p className="text-sm text-muted-foreground">
                Our commercial property insurance provides protection for shopping centers, office buildings, 
                residential complexes, warehouses, mixed-use properties, and other real estate investments. 
                Coverage includes property damage, general liability, loss of rental income, and specialized 
                protections for property management operations. We offer tailored solutions for property 
                managers, landowners, developers, and real estate investors.
              </p>
            </CardContent>
          </Card>

          <CommercialPropertyQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
