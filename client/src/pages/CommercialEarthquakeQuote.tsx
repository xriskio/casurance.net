import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialEarthquakeQuoteForm from "@/components/CommercialEarthquakeQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CommercialEarthquakeQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Earthquake Insurance Quote"
        description="Protect your business from earthquake damage. Comprehensive commercial earthquake coverage for buildings and business property."
        keywords="commercial earthquake insurance, earthquake coverage, seismic insurance, building earthquake insurance"
        canonical="/quote/commercial-earthquake"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Earthquake Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protect your business from earthquake damage with specialized earthquake coverage. Essential for properties in seismically active regions. Complete this application to receive a tailored quote. Our underwriting team will review your submission and provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <CommercialEarthquakeQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
