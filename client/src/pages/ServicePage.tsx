import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Service Request
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need to make a policy change, request a certificate, or submit a claim? We're here to help.
            </p>
          </div>
          <ServiceRequestForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
