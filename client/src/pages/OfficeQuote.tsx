import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfficeQuoteForm from "@/components/OfficeQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function OfficeQuote() {
  return (
    <>
      <SEOHead
        title="Office Building Insurance Quote - Casurance"
        description="Get a comprehensive office building insurance quote for mid-rise and high-rise properties. Property, liability, and umbrella coverage for commercial office spaces nationwide."
        canonical="/quote/office-building"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" tabIndex={-1} className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4" data-testid="heading-office-quote">
                Office Building Insurance Quote
              </h1>
              <p className="text-lg text-muted-foreground">
                Specialized coverage for mid-rise (7-14 stories) and high-rise (15+ stories) office buildings. 
                Our program offers property limits up to $100M per location with comprehensive fire protection requirements.
              </p>
            </div>
            <OfficeQuoteForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
