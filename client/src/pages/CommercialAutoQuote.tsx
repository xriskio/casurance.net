import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialAutoQuoteForm from "@/components/CommercialAutoQuoteForm";

export default function CommercialAutoQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Auto Insurance Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a comprehensive quote for your commercial auto insurance. Complete the form below with detailed information about your fleet, drivers, and operations.
            </p>
          </div>
          <CommercialAutoQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
