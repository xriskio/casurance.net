import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantQuoteForm from "@/components/RestaurantQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function RestaurantQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Restaurant Insurance Quote"
        description="Get comprehensive restaurant insurance with our Business Owners Policy. Protect your café, bar, or food service establishment with property and liability coverage."
        keywords="restaurant insurance, food service insurance, cafe insurance, bar insurance, restaurant BOP, food liability insurance"
        canonical="/quote/restaurant"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Restaurant Business Owners Policy (BOP) Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive insurance coverage for your restaurant, café, or food service establishment. Our specialists will review your operations, safety measures, and unique risks to provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <RestaurantQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}