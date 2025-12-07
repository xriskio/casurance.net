import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelQuoteForm from "@/components/HotelQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function HotelQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Hotel & Motel Insurance Quote"
        description="Get comprehensive hotel and motel insurance. Protect your hospitality business with property, liability, and specialized coverage for lodging operations."
        keywords="hotel insurance, motel insurance, hospitality insurance, inn insurance, bed and breakfast insurance, lodging insurance"
        canonical="/quote/hotel"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Hotel Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application for hotel, motel, and hospitality property insurance. Our specialists will review your amenities, operations, and coverage needs to provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <HotelQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}