import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GarageServiceQuoteForm from "@/components/GarageServiceQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function GarageServiceQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Garage Service Center Insurance Quote"
        description="Get insurance for auto repair shops and service centers. Coverage for garagekeepers liability, property, and operations."
        keywords="garage insurance, auto repair shop insurance, garagekeepers liability, service center insurance"
        canonical="/quote/garage-service-centers"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Garage & Service Center Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized insurance for automotive repair shops, body shops, and service centers. Our program provides garage liability, garagekeepers coverage, general liability, property, and specialized coverages tailored to garage operations. Complete this application to receive a comprehensive quote within 24-48 hours.
            </p>
          </div>
          <GarageServiceQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
