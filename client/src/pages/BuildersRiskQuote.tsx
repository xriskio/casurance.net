import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import BuildersRiskQuoteForm from "@/components/BuildersRiskQuoteForm";

export default function BuildersRiskQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Builders Risk Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Protect your construction projects from start to finish with comprehensive builders risk coverage.
              </p>
              <p className="text-sm text-muted-foreground">
                Our builders risk insurance covers new construction projects, providing protection for materials, 
                equipment, and the structure itself during the construction phase. Coverage includes protection 
                against theft, vandalism, weather damage, and more.
              </p>
            </CardContent>
          </Card>

          <BuildersRiskQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
