import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OceanCargoQuoteForm from "@/components/OceanCargoQuoteForm";

export default function OceanCargoQuote() {
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

      <footer className="mt-16 border-t">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Casurance Inc. All rights reserved. | License #6005562</p>
        </div>
      </footer>
    </div>
  );
}
