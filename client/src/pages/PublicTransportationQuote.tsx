import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PublicTransportationQuoteForm from "@/components/PublicTransportationQuoteForm";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicTransportationQuote() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b" role="banner">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" data-testid="link-home">
            <img
              src="/casurance-logo.svg"
              alt="Casurance Insurance Agency - Return to homepage"
              className="h-12"
            />
          </Link>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4"
            data-testid="button-back-to-home"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

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
      </main>

      <footer className="border-t mt-12 py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Casurance Insurance Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
