import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ArrowRight, Phone, Shield, Car, Umbrella, Building2, Briefcase, FileCheck, AlertTriangle, CheckCircle2, Home, Store, ShoppingBag, Landmark, Building, MapPin, DollarSign, Ban, Zap, ExternalLink, Truck, Bus, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import type { CoverageContent, PropertyTypeSection } from "@shared/content/coverages";
import { getIndustryImage } from "@shared/industryImages";
import californiaFairPlanLogo from "@assets/images_(5)_1765349979547.png";

const getPropertyTypeIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Building2': return Building2;
    case 'Home': return Home;
    case 'Building': return Building;
    case 'Store': return Store;
    case 'ShoppingBag': return ShoppingBag;
    case 'Landmark': return Landmark;
    default: return Building2;
  }
};

function FAQSchemaMarkup({ coverage }: { coverage: CoverageContent }) {
  const schemas = useMemo(() => {
    if (!coverage.faqs || coverage.faqs.length === 0) {
      return null;
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": coverage.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const areaServed = coverage.eligibleStates && coverage.eligibleStates.length > 0 
      ? coverage.eligibleStates.map(state => ({
          "@type": "State",
          "name": state
        }))
      : {
          "@type": "Country",
          "name": "United States"
        };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": coverage.title,
      "provider": {
        "@type": "InsuranceAgency",
        "name": "Casurance",
        "url": "https://casurance.net",
        "telephone": "1-888-254-0089",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "714 W Olympic Blvd Suite 906",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90015",
          "addressCountry": "US"
        }
      },
      "description": coverage.summary,
      "areaServed": areaServed
    };

    return { faqSchema, serviceSchema };
  }, [coverage.faqs, coverage.eligibleStates, coverage.title, coverage.summary]);

  if (!schemas) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemas.faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemas.serviceSchema)}
      </script>
    </Helmet>
  );
}

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
    if (coverage.slug === 'hospitality' || coverage.slug === 'hotel-insurance' || coverage.slug === 'hotel-motel-program') {
      return '/quote/hotel';
    }
    if (coverage.slug === 'healthcare-facilities-program') {
      return '/quote/healthcare';
    }
    if (coverage.slug === 'violent-attack-coverage') {
      return '/quote/violent-attack';
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
    if (coverage.slug === 'california-fair-plan') {
      return '/quote/fair-plan';
    }
    if (coverage.slug === 'commercial-umbrella') {
      return '/lp/commercial-umbrella';
    }
    
    // Personal Lines - all go to /personal-lines
    if (coverage.slug === 'personal-auto') {
      return '/personal-lines';
    }
    if (coverage.slug === 'homeowners') {
      return '/personal-lines';
    }
    if (coverage.slug === 'landlord-protector') {
      return '/personal-lines';
    }
    if (coverage.slug === 'wildfire-brush-area') {
      return '/personal-lines';
    }
    if (coverage.slug === 'residential-earthquake') {
      return '/personal-lines';
    }
    
    // Check by category for any other Personal Lines coverages
    if (coverage.category === 'Personal Lines') {
      return '/personal-lines';
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
              {/* California FAIR Plan Logo */}
              {coverage.slug === 'california-fair-plan' && (
                <div className="mb-6">
                  <img 
                    src={californiaFairPlanLogo} 
                    alt="California FAIR Plan Property Insurance" 
                    className="h-16 md:h-20 w-auto"
                    data-testid="img-california-fair-plan-logo"
                  />
                </div>
              )}
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

        {/* Property Types - Habitational Program Subsections */}
        {coverage.propertyTypes && coverage.propertyTypes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Property Types We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {coverage.propertyTypes.map((propertyType) => {
                const IconComponent = getPropertyTypeIcon(propertyType.icon);
                return (
                  <Card key={propertyType.id} className="hover-elevate cursor-pointer" data-testid={`card-property-type-${propertyType.id}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{propertyType.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{propertyType.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground">Eligibility:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {propertyType.eligibility.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Program Limits - Habitational Program */}
        {coverage.programLimits && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Program Limits & Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coverage.programLimits.blanketLimit && (
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Blanket Limit</p>
                    <p className="text-2xl font-bold text-primary">{coverage.programLimits.blanketLimit}</p>
                  </div>
                )}
                {coverage.programLimits.maxTIVPerBuilding && (
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Max TIV Per Building</p>
                    <p className="text-2xl font-bold text-primary">{coverage.programLimits.maxTIVPerBuilding}</p>
                  </div>
                )}
                {coverage.programLimits.minTIV && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Minimum TIV</p>
                    <p className="text-lg font-semibold text-foreground">{coverage.programLimits.minTIV}</p>
                  </div>
                )}
                {coverage.programLimits.floodSublimit && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Flood Sublimit</p>
                    <p className="text-lg font-semibold text-foreground">{coverage.programLimits.floodSublimit}</p>
                  </div>
                )}
                {coverage.programLimits.earthquakeSublimit && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Earthquake Sublimit</p>
                    <p className="text-lg font-semibold text-foreground">{coverage.programLimits.earthquakeSublimit}</p>
                  </div>
                )}
                {coverage.programLimits.terrorismSublimit && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Terrorism Sublimit (TRIA)</p>
                    <p className="text-lg font-semibold text-foreground">{coverage.programLimits.terrorismSublimit}</p>
                  </div>
                )}
                {coverage.programLimits.boilerMachinerySublimit && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Boiler & Machinery Sublimit</p>
                    <p className="text-lg font-semibold text-foreground">{coverage.programLimits.boilerMachinerySublimit}</p>
                  </div>
                )}
                {coverage.programLimits.ordinanceOrLaw && (
                  <div className="p-4 bg-muted/50 rounded-lg md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Ordinance or Law</p>
                    <div className="flex flex-wrap gap-4">
                      {coverage.programLimits.ordinanceOrLaw.coverageA && (
                        <div>
                          <p className="text-xs text-muted-foreground">Coverage A</p>
                          <p className="text-lg font-semibold text-foreground">{coverage.programLimits.ordinanceOrLaw.coverageA}</p>
                        </div>
                      )}
                      {coverage.programLimits.ordinanceOrLaw.coverageBC && (
                        <div>
                          <p className="text-xs text-muted-foreground">Coverage B & C</p>
                          <p className="text-lg font-semibold text-foreground">{coverage.programLimits.ordinanceOrLaw.coverageBC}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deductibles - Habitational Program */}
        {coverage.deductibles && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Deductible Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coverage.deductibles.aop && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">All Other Perils (AOP)</p>
                    <p className="text-muted-foreground text-sm">{coverage.deductibles.aop}</p>
                  </div>
                )}
                {coverage.deductibles.windHail && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Wind/Hail Deductible</p>
                    <p className="text-muted-foreground text-sm">{coverage.deductibles.windHail}</p>
                    {coverage.deductibles.windHailStates && coverage.deductibles.windHailStates.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Applies in: {coverage.deductibles.windHailStates.join(', ')}
                      </p>
                    )}
                  </div>
                )}
                {coverage.deductibles.namedStorm && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Named Storm Deductible</p>
                    <p className="text-muted-foreground text-sm">{coverage.deductibles.namedStorm}</p>
                  </div>
                )}
                {coverage.deductibles.floodEarthquake && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Flood & Earthquake</p>
                    <p className="text-muted-foreground text-sm">{coverage.deductibles.floodEarthquake}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Program Highlights */}
        {coverage.programHighlights && coverage.programHighlights.length > 0 && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Program Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coverage.programHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Excluded Areas */}
        {coverage.excludedAreas && coverage.excludedAreas.length > 0 && (
          <Card className="mb-8 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Ban className="h-5 w-5" />
                Excluded Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The following areas are not eligible for this program. Please contact us for alternative solutions.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {coverage.excludedAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-destructive/60 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Eligible States Map Indicator */}
        {coverage.eligibleStates && coverage.eligibleStates.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Available Nationwide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This program is available in {coverage.eligibleStates.length} states across the United States.
              </p>
              <div className="flex flex-wrap gap-2">
                {coverage.eligibleStates.map((state, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {state}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sister Companies Section */}
        {coverage.sisterCompanies && coverage.sisterCompanies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Casurance Family of Companies</h2>
            <p className="text-muted-foreground mb-6">
              For specialized transportation coverage, our sister agencies provide dedicated expertise in specific niches. All Casurance agencies share the same commitment to exceptional service and comprehensive coverage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverage.sisterCompanies.map((company, index) => (
                <Card key={index} className="border-2 border-primary/20 hover-elevate" data-testid={`card-sister-company-${company.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          {company.name === 'Truxsurance' ? (
                            <Truck className="h-6 w-6 text-primary" />
                          ) : (
                            <Bus className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <CardTitle className="text-xl">{company.name}</CardTitle>
                      </div>
                      <a 
                        href={company.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`link-sister-company-${company.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Button variant="outline" size="sm" className="gap-2">
                          Visit Site
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{company.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section - People Also Ask */}
        {coverage.faqs && coverage.faqs.length > 0 && (
          <Card className="mb-8" id="faq-section">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Common questions about {coverage.title.toLowerCase()} answered by our insurance experts.
              </p>
              <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
                {coverage.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} data-testid={`faq-item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline" data-testid={`faq-trigger-${index}`}>
                      <span className="font-medium text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-content-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* FAQPage and Service Schema Markup */}
        <FAQSchemaMarkup coverage={coverage} />

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
