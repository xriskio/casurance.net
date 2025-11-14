import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CommercialPropertyQuoteForm from "@/components/CommercialPropertyQuoteForm";

export default function CommercialPropertyQuote() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Casurance
          </Link>
          <Link
            href="/quote"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-back-quote"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quote Options
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Commercial Property & Real Estate Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Comprehensive coverage for property owners, managers, and real estate investments.
              </p>
              <p className="text-sm text-muted-foreground">
                Our commercial property insurance provides protection for shopping centers, office buildings, 
                residential complexes, warehouses, mixed-use properties, and other real estate investments. 
                Coverage includes property damage, general liability, loss of rental income, and specialized 
                protections for property management operations. We offer tailored solutions for property 
                managers, landowners, developers, and real estate investors.
              </p>
            </CardContent>
          </Card>

          <CommercialPropertyQuoteForm />
        </div>
      </main>

      <footer className="mt-16 border-t">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Casurance Inc. All rights reserved. | License #6005562</p>
        </div>
      </footer>
    </div>
  );
}