import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TruckingQuoteForm from "@/components/TruckingQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function TruckingQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Trucking Insurance Quote"
        description="Get commercial trucking and transportation insurance. Protect your fleet with auto liability, physical damage, cargo, and motor truck cargo coverage."
        keywords="trucking insurance, commercial truck insurance, fleet insurance, cargo insurance, motor carrier insurance, transportation insurance"
        canonical="/quote/trucking"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Transportation & Trucking Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application for commercial trucking and transportation insurance. Our specialists will review your fleet, drivers, and operations to provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <TruckingQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
