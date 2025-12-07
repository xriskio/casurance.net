import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HabitationalQuoteForm from "@/components/HabitationalQuoteForm";
import { Building2, Shield, FileCheck, Umbrella } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function HabitationalQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Habitational Insurance Quote"
        description="Get specialty habitational insurance for apartments, condos, townhouse associations, and assisted living. Property limits up to $75 million per location."
        keywords="habitational insurance, apartment insurance, condo insurance, HOA insurance, assisted living insurance, lessor's risk"
        canonical="/quote/habitational"
      />
      <Header />
      <main id="main-content" className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Habitational Program Insurance Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Specialty package insurance for apartments, condominiums, townhouse associations, lessor's risk, offices, and assisted living residences. Our comprehensive program includes property, inland marine, crime, equipment breakdown, and liability coverage with property limits up to $75 million per location.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="bg-card border rounded-lg p-4 text-center">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Property up to $75M</span>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">GL $1M/$2M Limits</span>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <FileCheck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Crime Coverage</span>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <Umbrella className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Umbrella to $25M</span>
              </div>
            </div>
          </div>
          <HabitationalQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
