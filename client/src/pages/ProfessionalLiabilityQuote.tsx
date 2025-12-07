import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfessionalLiabilityQuoteForm from "@/components/ProfessionalLiabilityQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function ProfessionalLiabilityQuote() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Professional Liability Insurance Quote"
        description="Get errors and omissions (E&O) insurance for professionals. Protect against negligence claims, malpractice, and professional mistakes."
        keywords="professional liability insurance, E&O insurance, errors and omissions, malpractice insurance"
        canonical="/quote/professional-liability"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Professional Liability Insurance Quote
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Get comprehensive Cover-Pro professional liability coverage for your consulting or professional services firm. Complete the application below for a customized quote.
              </p>
            </div>
            <ProfessionalLiabilityQuoteForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
