import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import SEOHead from "@/components/SEOHead";
import TrustedCarriers from "@/components/TrustedCarriers";

export default function QuotePage() {
  return (
    <>
      <SEOHead
        title="Get Free Commercial Insurance Quote"
        description="Request a free commercial insurance quote from licensed agents. Fast, competitive rates for general liability, workers comp, commercial auto, and 40+ insurance products. 24-hour response time guaranteed."
        keywords="commercial insurance quote, business insurance quote, free insurance quote, commercial auto quote, general liability quote, workers compensation quote"
        canonical="/quote"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Complete the form below and one of our licensed agents will contact you with a competitive quote within 24 hours.
            </p>
          </div>
        </div>
      </div>
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <QuoteRequestForm />
        </div>
      </main>
      <TrustedCarriers />
      <Footer />
    </div>
    </>
  );
}
