import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Mail, ArrowRight, Clock, FileText, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function QuoteThankYou() {
  return (
    <>
      <SEOHead
        title="Quote Request Received | Casurance Insurance Agency"
        description="Thank you for your quote request. Our licensed agents will contact you within 24 hours with competitive insurance options."
        canonical="/quote/thank-you"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main id="main-content" tabIndex={-1} className="flex-1 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-thank-you-title">
                  Thank You for Your Quote Request!
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  We've received your request and one of our licensed insurance professionals will contact you within 24 hours with personalized quote options.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Fast Response</h3>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Multiple Quotes</h3>
                    <p className="text-sm text-muted-foreground">Compare top carriers</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Expert Guidance</h3>
                    <p className="text-sm text-muted-foreground">Licensed professionals</p>
                  </div>
                </div>
                
                <div className="border-t border-border pt-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Need Immediate Assistance?</h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                    <a href="tel:18882540089" className="flex items-center gap-2 text-primary font-medium hover:underline">
                      <Phone className="h-5 w-5" />
                      1-888-254-0089
                    </a>
                    <span className="hidden sm:block text-muted-foreground">|</span>
                    <a href="mailto:info@casurance.net" className="flex items-center gap-2 text-primary font-medium hover:underline">
                      <Mail className="h-5 w-5" />
                      info@casurance.net
                    </a>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button variant="outline" size="lg" data-testid="button-back-home">
                        Back to Home
                      </Button>
                    </Link>
                    <Link href="/coverages">
                      <Button size="lg" data-testid="button-explore-coverage">
                        Explore Coverage Options
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
