import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GolfCountryClubQuoteForm from "@/components/GolfCountryClubQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function GolfCountryClubQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Golf & Country Club Insurance Quote"
        description="Get comprehensive insurance for golf courses and country clubs. Coverage for property, liability, golf carts, and club operations."
        keywords="golf course insurance, country club insurance, golf cart insurance, club liability insurance"
        canonical="/quote/golf-country-club"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Golf & Country Club Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application for golf course, country club, and private membership club insurance. Our specialists will review your property, operations, amenities, and coverage needs to provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <GolfCountryClubQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
