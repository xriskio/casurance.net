import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LimousineQuoteForm from "@/components/LimousineQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function LimousineQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Limousine Insurance Quote"
        description="Get commercial limousine insurance for your livery business. Coverage for luxury vehicles, chauffeurs, and passenger liability."
        keywords="limousine insurance, livery insurance, limo company insurance, chauffeur insurance"
        canonical="/quote/limousine"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Limousine & Chauffeured Transportation Insurance Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application for limousine and chauffeured transportation insurance. Our specialists will review your fleet, operations, and driver information to provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <LimousineQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
