import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import VacantBuildingQuoteForm from "@/components/VacantBuildingQuoteForm";

export default function VacantBuildingQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Vacant Building & Land Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Comprehensive coverage for vacant properties and undeveloped land.
              </p>
              <p className="text-sm text-muted-foreground">
                Whether you own vacant buildings awaiting renovation, undeveloped land for future projects, 
                or properties between tenants, our specialized coverage protects against vandalism, liability 
                claims, natural disasters, and other risks unique to unoccupied properties.
              </p>
            </CardContent>
          </Card>

          <VacantBuildingQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
