import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the form below and one of our licensed agents will contact you with a competitive quote within 24 hours.
            </p>
          </div>
          <QuoteRequestForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
