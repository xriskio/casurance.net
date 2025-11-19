import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FranchisedDealerQuoteForm from "@/components/FranchisedDealerQuoteForm";

export default function FranchisedDealerQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Franchised Auto, Truck & RV Dealer Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive insurance for franchised vehicle dealerships. Our program offers garage liability, garagekeepers coverage, general liability, property, crime, and specialized dealer coverages with expert underwriting and in-house claims management. Complete this application to receive a competitive quote within 24-48 hours.
            </p>
          </div>
          <FranchisedDealerQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
