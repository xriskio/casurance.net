import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";
import type { CoverageContent } from "@shared/content/coverages";
import { getIndustryImage } from "@shared/industryImages";

interface CoverageDetailProps {
  coverage: CoverageContent;
}

export default function CoverageDetail({ coverage }: CoverageDetailProps) {
  const getQuoteLink = () => {
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
    return '/quote';
  };

  const industryImage = coverage.category === "Industries" ? getIndustryImage(coverage.slug) : undefined;

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
