import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HighValueHomeQuoteForm from "@/components/HighValueHomeQuoteForm";

export default function HighValueHomeQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              High Value Homeowners Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium homeowners insurance for luxury homes and high-value properties, including coverage in high-risk areas (brush zones, fire zones, flood areas). Complete this application to receive a comprehensive quote tailored to your unique property needs. Our high-value home specialists will review your submission and provide a competitive quote within 24-48 hours.
            </p>
          </div>
          <HighValueHomeQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
