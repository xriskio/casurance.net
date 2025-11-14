import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialPackageQuoteForm from "@/components/CommercialPackageQuoteForm";

export default function CommercialPackageQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Package Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this comprehensive application for commercial package coverage. Bundle your property and liability insurance for comprehensive protection and competitive pricing. Our specialists will review your submission and provide a tailored quote within 24-48 hours.
            </p>
          </div>
          <CommercialPackageQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}