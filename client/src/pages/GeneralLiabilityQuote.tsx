import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeneralLiabilityQuoteForm from "@/components/GeneralLiabilityQuoteForm";

export default function GeneralLiabilityQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              General Liability Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application to receive an accurate quote for your general liability insurance. Our underwriting team will review your submission and provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <GeneralLiabilityQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
