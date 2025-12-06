import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeneralLiabilityQuoteForm from "@/components/GeneralLiabilityQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function GeneralLiabilityQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="General Liability Insurance Quote"
        description="Get a general liability insurance quote for your business. Protect against third-party claims, property damage, and bodily injury. Fast quotes from top carriers."
        keywords="general liability insurance, business liability insurance, commercial liability, third-party liability, GL insurance quote"
        canonical="/quote/general-liability"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              General Liability Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application to receive an accurate quote for your general liability insurance. Our underwriting team will review your submission and provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <GeneralLiabilityQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
