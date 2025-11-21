import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SecurityServicesQuoteForm from "@/components/SecurityServicesQuoteForm";

export default function SecurityServicesQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SecurityServicesQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
