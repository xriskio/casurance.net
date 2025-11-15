import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Phone, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { getCoverageBySlug } from "@shared/content/coverages";

export default function MiddleMarket() {
  const coverage = getCoverageBySlug("middle-market");

  if (!coverage) {
    return <div>Coverage not found</div>;
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-home">Home</span>
          </Link>
          <span className="mx-2">/</span>
          <Link href="/coverages">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-coverages">Coverage</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Middle Market</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {coverage.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {coverage.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {coverage.summary}
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {coverage.description}
            </p>
          </CardContent>
        </Card>

        {/* Eligibility Criteria */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-3 mb-6">
              <AlertCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Eligibility Criteria</h2>
                <p className="text-muted-foreground">
                  Benchmarq Package is designed for businesses that meet the following requirements:
                </p>
              </div>
            </div>
            <div className="space-y-4 bg-muted/30 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Total Insurable Value</h3>
                  <p className="text-muted-foreground">Up to $25,000,000</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Annual Revenue</h3>
                  <p className="text-muted-foreground">Up to $75,000,000</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Annual Payroll</h3>
                  <p className="text-muted-foreground">Up to $30,000,000</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Auto Fleet Size</h3>
                  <p className="text-muted-foreground">Up to 20 vehicles</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Industry-Specific Exceptions</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Manufacturing (MFGR): Up to $7,500,000 payroll</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Food Service & Hospitality: Up to $7,500,000 payroll</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Wholesalers: Up to $7,500,000 payroll</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Expertise */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Industry Expertise</h2>
            <p className="text-muted-foreground mb-6">
              Benchmarq Package provides specialized solutions across diverse industries with expert underwriting and risk management:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coverage.whoNeeds.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coverage Highlights */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Coverage Highlights</h2>
            <div className="space-y-4">
              {coverage.coverageIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Why Choose Benchmarq</h2>
            <div className="space-y-3">
              {coverage.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 bg-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to Experience the Benchmarq Difference?
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Get a customized quote for Benchmarq Package and discover why it's the package product of choice for growing middle market businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2"
                data-testid="button-get-quote"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                data-testid="button-contact"
              >
                <Phone className="h-4 w-4" />
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
