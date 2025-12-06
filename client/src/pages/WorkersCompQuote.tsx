import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkersCompQuoteForm from "@/components/WorkersCompQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function WorkersCompQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Workers' Compensation Insurance Quote"
        description="Get a workers' compensation insurance quote for your business. Protect your employees and comply with state requirements. Competitive rates available."
        keywords="workers compensation insurance, workers comp quote, employee injury insurance, workplace injury coverage, work comp insurance"
        canonical="/quote/workers-compensation"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Workers' Compensation Insurance Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this form to submit your workers' compensation risk for a quick quote. Provide detailed information about your payroll, classifications, and safety programs for the most accurate pricing.
            </p>
          </div>
          <WorkersCompQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
