import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalLinesQuoteForm from "@/components/PersonalLinesQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function PersonalLinesQuote() {
  return (
    <>
      <SEOHead
        title="Personal Lines Insurance Quote | Casurance"
        description="Get a free personal insurance quote for auto, homeowners, landlord, high-value home, wildfire, or earthquake coverage. Fast quotes from trusted carriers nationwide."
        canonical="/quote/personal-lines"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Personal Lines Insurance Quote
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete this form to receive a personalized quote for your home, auto, or specialty coverage needs. Our personal insurance specialists will provide competitive options within 24-48 hours.
              </p>
            </div>
            <PersonalLinesQuoteForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
