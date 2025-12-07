import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ManagementLiabilityQuoteForm from "@/components/ManagementLiabilityQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function ManagementLiabilityQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Management Liability Insurance Quote"
        description="Get D&O, EPLI, and fiduciary liability coverage for your management team. Protect directors and officers from personal liability."
        keywords="D&O insurance, management liability, directors and officers insurance, fiduciary liability"
        canonical="/quote/management-liability"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Management Liability Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protect your directors, officers, and management team with comprehensive management liability coverage including D&O, EPLI, and fiduciary liability. Complete this application to receive a tailored quote within 24-48 hours.
            </p>
          </div>
          <ManagementLiabilityQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
