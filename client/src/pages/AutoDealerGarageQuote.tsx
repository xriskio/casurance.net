import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoDealerGarageQuoteForm from "@/components/AutoDealerGarageQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function AutoDealerGarageQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Auto Dealer & Garage Insurance Quote"
        description="Get comprehensive insurance for auto dealers and garages. Coverage for inventory, garagekeepers liability, and dealer operations."
        keywords="auto dealer insurance, garage insurance, dealer liability, auto lot insurance"
        canonical="/quote/auto-dealer-garage"
      />
      <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Auto Dealer & Garage Insurance Quote
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive coverage for auto dealers, used car lots, body shops, repair shops, and automotive service centers
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Complete this comprehensive insurance application for your auto dealership or garage operation. This form covers dealer operations, service and repair facilities, body shops, and all related automotive businesses.
            </p>
          </div>
          <AutoDealerGarageQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
