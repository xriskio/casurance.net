import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxiQuoteForm from "@/components/TaxiQuoteForm";

export default function TaxiQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Taxi & Black Car Insurance Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive insurance coverage for your taxi, Uber Black, or black car operation. 
              Complete this detailed application to receive a customized quote within 24-48 hours.
            </p>
          </div>
          <TaxiQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
