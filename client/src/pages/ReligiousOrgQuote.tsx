import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import ReligiousOrgQuoteForm from "@/components/ReligiousOrgQuoteForm";

export default function ReligiousOrgQuote() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-4">Religious Organization Insurance Quote</h1>
              <p className="text-muted-foreground mb-2">
                Comprehensive coverage for churches, mosques, temples, synagogues, and all places of worship.
              </p>
              <p className="text-sm text-muted-foreground">
                Our religious organization insurance provides specialized protection for faith-based institutions, 
                including property coverage, general liability, professional liability for counseling services, 
                and coverage for special events, youth programs, and community outreach activities. We understand 
                the unique risks faced by religious organizations and offer tailored solutions to protect your 
                ministry and congregation.
              </p>
            </CardContent>
          </Card>

          <ReligiousOrgQuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
