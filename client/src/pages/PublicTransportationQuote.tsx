import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PublicTransportationQuoteForm from "@/components/PublicTransportationQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function PublicTransportationQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Public Transportation Insurance Quote"
        description="Get insurance for public transit operations including buses, shuttles, and paratransit. Comprehensive fleet and passenger coverage."
        keywords="public transportation insurance, bus insurance, shuttle insurance, transit insurance, paratransit insurance"
        canonical="/quote/public-transportation"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Public Transportation Insurance Application</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Complete insurance application for charter buses, municipal transit, school bus contractors, and passenger transportation operators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none mb-6">
                  <p className="text-muted-foreground">
                    This comprehensive application is designed for public transportation operators including:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6 list-disc">
                    <li>Charter & Tour Bus Operators</li>
                    <li>Municipal Transit Authorities</li>
                    <li>School Districts & School Bus Contractors</li>
                    <li>Limousine & Executive Transportation Services</li>
                    <li>Paratransit & Demand-Response Operations</li>
                    <li>Airport Shuttle & Hotel Transportation</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>Coverage Available:</strong> Auto Liability up to $10,000,000 • Physical Damage with Flexible Deductibles • 
                    General Liability up to $10,000,000 • Garage Liability • Garagekeepers Legal Liability • 
                    Hired & Non-Owned Auto • UM/UIM Coverage
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Please complete all 6 steps of this application. We'll review your submission and provide a competitive quote within 24-48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <PublicTransportationQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
