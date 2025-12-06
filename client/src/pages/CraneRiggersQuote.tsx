import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import CraneRiggersQuoteForm from "@/components/CraneRiggersQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function CraneRiggersQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Crane & Riggers Insurance Quote"
        description="Get specialized crane and rigging insurance. Coverage for crane operators, rigging equipment, and heavy lifting operations."
        keywords="crane insurance, riggers insurance, heavy equipment insurance, crane operator coverage"
        canonical="/quote/crane-riggers"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Crane & Riggers Liability Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Specialized coverage for crane operations and rigging professionals.
              </p>
              <p className="text-sm text-muted-foreground">
                Our comprehensive crane and riggers liability insurance provides protection for crane rental operations, 
                rigging services, equipment operations, and related activities. Coverage includes general liability, 
                equipment coverage, and specialized protections for high-risk lifting operations across utilities, 
                construction, marine, and industrial sectors.
              </p>
            </CardContent>
          </Card>

          <CraneRiggersQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
