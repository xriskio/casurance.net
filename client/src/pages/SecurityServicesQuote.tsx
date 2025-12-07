import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SecurityServicesQuoteForm from "@/components/SecurityServicesQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function SecurityServicesQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Security Services Insurance Quote"
        description="Get comprehensive insurance for security guard companies and protective services. Coverage for armed and unarmed security operations."
        keywords="security guard insurance, protective services insurance, armed guard insurance, security company insurance"
        canonical="/quote/security-services"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SecurityServicesQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
