import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Service Request
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Need to make a policy change, request a certificate, or submit a claim? We're here to help.
            </p>
          </div>
        </div>
      </div>
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ServiceRequestForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
