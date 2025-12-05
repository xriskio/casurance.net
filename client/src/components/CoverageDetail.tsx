import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Phone, Shield, Car, Umbrella, Building2, Briefcase, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { CoverageContent } from "@shared/content/coverages";
import { getIndustryImage } from "@shared/industryImages";

interface CoverageDetailProps {
  coverage: CoverageContent;
}

export default function CoverageDetail({ coverage }: CoverageDetailProps) {
  const getQuoteLink = () => {
    // Industry-specific quote forms
    if (coverage.slug === 'nemt-paratransit') {
      return '/apply/nemt';
    }
    if (coverage.slug === 'limousine-insurance' || coverage.slug === 'limousine-transportation') {
      return '/quote/limousine';
    }
    if (coverage.slug === 'golf-country-club') {
      return '/quote/golf-country-club';
    }
    if (coverage.slug === 'franchised-dealers') {
      return '/quote/franchised-dealers';
    }
    if (coverage.slug === 'auto-dealer-garage') {
      return '/quote/auto-dealer-garage';
    }
    if (coverage.slug === 'garage-service-centers') {
      return '/quote/garage-service-centers';
    }
    if (coverage.slug === 'public-transportation') {
      return '/quote/public-transportation';
    }
    if (coverage.slug === 'public-self-storage') {
      return '/quote/self-storage';
    }
    
    // Coverage-specific quote forms
    if (coverage.slug === 'cyber-liability') {
      return '/quote/cyber-liability';
    }
    if (coverage.slug === 'employment-practices-liability') {
      return '/quote/employment-practices';
    }
    if (coverage.slug === 'management-liability' || coverage.slug === 'professional-liability') {
      return '/quote/professional-liability';
    }
    if (coverage.slug === 'construction-casualty') {
      return '/quote/construction-casualty';
    }
    if (coverage.slug === 'commercial-auto-insurance') {
      return '/quote/commercial-auto';
    }
    if (coverage.slug === 'general-liability') {
      return '/quote/general-liability';
    }
    if (coverage.slug === 'workers-compensation') {
      return '/quote/workers-compensation';
    }
    if (coverage.slug === 'trucking') {
      return '/quote/trucking';
    }
    if (coverage.slug === 'ocean-cargo') {
      return '/quote/ocean-cargo';
    }
    if (coverage.slug === 'film-production') {
      return '/quote/film-production';
    }
    if (coverage.slug === 'product-liability') {
      return '/quote/product-liability';
    }
    if (coverage.slug === 'security-services') {
      return '/quote/security-services';
    }
    if (coverage.slug === 'hospitality' || coverage.slug === 'hotel-insurance') {
      return '/quote/hotel';
    }
    if (coverage.slug === 'restaurant-insurance') {
      return '/quote/restaurant';
    }
    if (coverage.slug === 'habitational-insurance' || coverage.slug === 'habitational-program' || coverage.slug === 'apartments' || coverage.slug === 'condominiums') {
      return '/quote/habitational';
    }
    if (coverage.slug === 'office-buildings') {
      return '/quote/office-building';
    }
    if (coverage.slug === 'builders-risk') {
      return '/quote/builders-risk';
    }
    if (coverage.slug === 'vacant-building') {
      return '/quote/vacant-building';
    }
    if (coverage.slug === 'crane-riggers') {
      return '/quote/crane-riggers';
    }
    if (coverage.slug === 'religious-organizations') {
      return '/quote/religious-organization';
    }
    if (coverage.slug === 'commercial-property') {
      return '/quote/commercial-property';
    }
    if (coverage.slug === 'high-value-home') {
      return '/quote/high-value-home';
    }
    if (coverage.slug === 'commercial-flood') {
      return '/quote/commercial-flood';
    }
    if (coverage.slug === 'commercial-earthquake') {
      return '/quote/commercial-earthquake';
    }
    if (coverage.slug === 'taxi-black-car') {
      return '/quote/taxi';
    }
    if (coverage.slug === 'tnc-shared-economy') {
      return '/quote/tnc';
    }
    
    return '/quote';
  };

  // Show industry image if one exists for this coverage (regardless of category)
  const industryImage = getIndustryImage(coverage.slug);

  return (
    <div>
      {/* Hero Image for Industries */}
      {industryImage && (
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <img 
            src={industryImage} 
            alt={coverage.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative h-full max-w-4xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-8">
            <div className="inline-block px-3 py-1 bg-white/90 text-primary text-sm font-medium rounded-full mb-3 self-start">
              {coverage.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {coverage.title}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {coverage.summary}
            </p>
          </div>
        </div>
      )}

      <div className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/coverages">
              <span className="hover:text-foreground cursor-pointer">Coverage</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{coverage.title}</span>
          </div>

          {/* Header - Only show if not an industry (industries have hero image) */}
          {!industryImage && (
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
          )}

        {/* Overview */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {coverage.description}
            </p>
          </CardContent>
        </Card>

        {/* Who Needs This Coverage */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Who Needs This Coverage</h2>
            <div className="space-y-3">
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

        {/* Coverage Includes */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Coverage Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <h2 className="text-2xl font-semibold text-foreground mb-6">Key Benefits</h2>
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

        {/* Coverage Services - Extended Content */}
        {coverage.coverageServices && coverage.coverageServices.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Coverage and Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {coverage.coverageServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Product Basics - Extended Content */}
        {coverage.productBasics && coverage.productBasics.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Product Basics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {coverage.productBasics.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span>{item.label}</span>
                      {item.subItems && item.subItems.length > 0 && (
                        <ul className="mt-1 ml-4 space-y-1 text-muted-foreground">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>- {subItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Risk Control Services - Extended Content */}
        {coverage.riskControlServices && coverage.riskControlServices.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Risk Control Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coverage.riskControlServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Coverages - Extended Content */}
        {coverage.enhancedCoverages && coverage.enhancedCoverages.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Enhanced Coverages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {coverage.enhancedCoverages.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to Get Coverage?
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Get a customized quote for {coverage.title.toLowerCase()} from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={getQuoteLink()}>
              <Button size="lg" variant="secondary" className="group" data-testid="button-get-quote-detail">
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:18882540089">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-call-detail">
                <Phone className="mr-2 h-4 w-4" />
                Call 1-888-254-0089
              </Button>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
