import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import OceanCargoQuoteForm from "@/components/OceanCargoQuoteForm";

export default function OceanCargoQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Ocean Cargo Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Protect your cargo shipments with comprehensive ocean cargo insurance coverage.
              </p>
              <p className="text-sm text-muted-foreground">
                Our ocean cargo insurance protects goods in transit via ocean vessels from loss or damage due to 
                perils of the sea, including storm damage, vessel collision, jettison, and other maritime risks. 
                Coverage includes protection for your cargo from origin to final destination.
              </p>
            </CardContent>
          </Card>

          <OceanCargoQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
