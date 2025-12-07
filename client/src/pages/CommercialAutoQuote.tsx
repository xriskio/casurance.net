import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialAutoQuoteForm from "@/components/CommercialAutoQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CommercialAutoQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Auto Insurance Quote"
        description="Get a comprehensive commercial auto insurance quote for limousines, taxis, TNC (Uber/Lyft), buses, and fleet vehicles. Competitive rates from top carriers."
        keywords="commercial auto insurance, fleet insurance, limousine insurance, taxi insurance, TNC insurance, bus insurance, Uber insurance, Lyft insurance"
        canonical="/quote/commercial-auto"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Auto Insurance - Limousine/Taxi/TNC/Buses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a comprehensive quote for commercial auto, limousine, taxi, TNC (Uber/Lyft), and bus operations. Complete the form below with detailed information about your fleet, drivers, and operations.
            </p>
          </div>
          <CommercialAutoQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
