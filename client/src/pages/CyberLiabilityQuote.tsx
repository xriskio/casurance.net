import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CyberLiabilityQuoteForm from "@/components/CyberLiabilityQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CyberLiabilityQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Cyber Liability Insurance Quote"
        description="Protect your business from cyber threats with comprehensive cyber liability insurance. Coverage for data breaches, ransomware, and network security incidents."
        keywords="cyber liability insurance, data breach insurance, cyber security insurance, ransomware coverage"
        canonical="/quote/cyber-liability"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Cyber Liability Insurance Quote Request
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Protect your business from cyber threats with comprehensive cyber liability coverage. 
              Fill out this detailed application to receive a customized quote.
            </p>
          </div>
          <CyberLiabilityQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
