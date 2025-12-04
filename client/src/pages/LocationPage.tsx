import { useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Shield, 
  Users, 
  Clock,
  Star,
  FileText
} from "lucide-react";
import { 
  getLocationBySlug, 
  getInsuranceTypeBySlug, 
  insuranceTypes,
  allLocations,
  type CityLocation,
  type LocationInsuranceType
} from "@shared/content/locations";
import NotFound from "./not-found";

function generateSeoContent(city: CityLocation, insurance: LocationInsuranceType): {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whyChoose: string[];
  localContext: string;
} {
  const cityName = city.name;
  const stateName = city.state;
  const insuranceName = insurance.name;
  
  return {
    title: `${cityName}, ${city.stateAbbr} ${insuranceName} | Casurance`,
    metaDescription: `Get ${insuranceName.toLowerCase()} quotes for your ${cityName}, ${stateName} business. Casurance offers competitive rates, expert guidance, and fast coverage for ${city.region} businesses. Call 888-254-0089.`,
    h1: `${cityName}, ${city.stateAbbr} ${insuranceName}`,
    intro: `Casurance is your trusted partner for ${insuranceName.toLowerCase()} in ${cityName}, ${stateName}. We understand the unique challenges facing businesses in ${city.region} and provide tailored insurance solutions to protect your operations.`,
    whyChoose: [
      `Local expertise serving ${cityName} and ${city.region} businesses`,
      `Competitive rates from top-rated insurance carriers`,
      `Fast quotes and quick policy issuance`,
      `Dedicated support team available Monday-Friday`,
      `Coverage tailored to ${stateName} regulations`,
      `Easy claims process with 24/7 support`
    ],
    localContext: `${cityName} is home to ${city.population} residents and a thriving business community. ${city.businessHighlights ? `Key industries in the area include ${city.businessHighlights.join(', ').toLowerCase()}.` : ''} Whether you're a startup or an established business, Casurance has the insurance expertise to protect your ${cityName} operations.`
  };
}

export default function LocationPage() {
  const [, params] = useRoute("/location/:citySlug/:insuranceSlug");
  const citySlug = params?.citySlug;
  const insuranceSlug = params?.insuranceSlug;

  if (!citySlug || !insuranceSlug) {
    return <NotFound />;
  }

  const city = getLocationBySlug(citySlug);
  const insurance = getInsuranceTypeBySlug(insuranceSlug);

  if (!city || !insurance) {
    return <NotFound />;
  }

  const seoContent = generateSeoContent(city, insurance);
  const otherInsuranceTypes = insuranceTypes.filter(t => t.slug !== insurance.slug).slice(0, 4);
  const nearbyCities = allLocations
    .filter(c => c.stateAbbr === city.stateAbbr && c.slug !== city.slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.metaDescription} />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://casurance.com/location/${citySlug}/${insuranceSlug}`} />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Casurance",
              "description": seoContent.metaDescription,
              "areaServed": {
                "@type": "City",
                "name": city.name,
                "containedInPlace": {
                  "@type": "State",
                  "name": city.state
                }
              },
              "telephone": "+1-888-254-0089",
              "email": "info@casurance.com"
            })
          }}
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-white/80" />
              <span className="text-white/80">{city.name}, {city.stateAbbr} • {city.region}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="text-page-title">
              {seoContent.h1}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mb-8">
              {seoContent.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={insurance.quoteLink}>
                <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-white/90" data-testid="button-get-quote">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:888-254-0089">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-call">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  About {insurance.name} in {city.name}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {insurance.description}
                </p>
                <p className="text-muted-foreground mb-8">
                  {seoContent.localContext}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  What's Covered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {insurance.coveragePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{point}</span>
                    </div>
                  ))}
                </div>

                {insurance.avgCost && (
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average Cost in {city.stateAbbr}</p>
                          <p className="text-2xl font-bold text-foreground">{insurance.avgCost}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Why Choose Casurance for Your {city.name} Business
                </h3>
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {seoContent.whyChoose.map((reason, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Get Your Free Quote
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Request a personalized {insurance.name.toLowerCase()} quote for your {city.name} business today.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Fast Quotes</p>
                          <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Top Carriers</p>
                          <p className="text-sm text-muted-foreground">A-rated insurance companies</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Expert Support</p>
                          <p className="text-sm text-muted-foreground">Licensed agents ready to help</p>
                        </div>
                      </div>
                    </div>

                    <Link href={insurance.quoteLink}>
                      <Button className="w-full mb-3" size="lg" data-testid="button-sidebar-quote">
                        Request a Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Or call us directly:</p>
                      <a href="tel:888-254-0089" className="text-lg font-semibold text-primary hover:underline">
                        888-254-0089
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {otherInsuranceTypes.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Other Insurance Solutions in {city.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherInsuranceTypes.map((type) => (
                  <Link key={type.slug} href={`/location/${city.slug}/${type.slug}`}>
                    <Card className="h-full cursor-pointer group border hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`card-insurance-${type.slug}`}>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {type.description.split('.')[0]}.
                        </p>
                        <span className="text-sm text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {nearbyCities.length > 0 && (
          <section className="py-12 lg:py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {insurance.name} in Nearby Cities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {nearbyCities.map((nearbyCity) => (
                  <Link key={nearbyCity.slug} href={`/location/${nearbyCity.slug}/${insurance.slug}`}>
                    <Card className="h-full cursor-pointer group border hover:border-primary/30 hover:shadow-md transition-all duration-300" data-testid={`card-city-${nearbyCity.slug}`}>
                      <CardContent className="p-4 text-center">
                        <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                          {nearbyCity.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{nearbyCity.stateAbbr}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 lg:py-16 bg-[#0a1628] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Protect Your {city.name} Business?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Get a free, no-obligation quote for {insurance.name.toLowerCase()} today. 
              Our licensed agents are here to help find the right coverage at the best price.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={insurance.quoteLink}>
                <Button size="lg" className="bg-white text-[#0a1628] hover:bg-white/90" data-testid="button-cta-quote">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:888-254-0089">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
