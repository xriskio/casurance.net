import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialFloodQuoteForm from "@/components/CommercialFloodQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CommercialFloodQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Flood Insurance Quote"
        description="Protect your business from flood damage with commercial flood insurance. Coverage for buildings, equipment, and business interruption."
        keywords="commercial flood insurance, business flood insurance, flood coverage, NFIP commercial"
        canonical="/quote/commercial-flood"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Flood Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protect your commercial property from flood damage with specialized flood insurance. Complete this application to receive a comprehensive quote for coverage in flood zones and high-risk areas. Our specialists will review your submission and provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <CommercialFloodQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
