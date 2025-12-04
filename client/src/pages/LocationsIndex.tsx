import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, MapPin, Building2, Shield } from "lucide-react";
import { 
  californiaLocations, 
  nevadaLocations, 
  insuranceTypes,
  type CityLocation 
} from "@shared/content/locations";

function CityCard({ city }: { city: CityLocation }) {
  return (
    <Link href={`/location/${city.slug}/general-liability`}>
      <Card className="h-full cursor-pointer group border hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`card-city-${city.slug}`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {city.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{city.region}</p>
              {city.businessHighlights && (
                <div className="flex flex-wrap gap-1">
                  {city.businessHighlights.slice(0, 2).map((highlight, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-primary text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform">
            View Insurance Options
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function LocationsIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Commercial Insurance by Location | California & Nevada | Casurance</title>
        <meta name="description" content="Find commercial insurance coverage for your business location. Casurance serves businesses across California and Nevada with general liability, workers' comp, restaurant insurance, and more." />
        <meta property="og:title" content="Commercial Insurance by Location | Casurance" />
        <meta property="og:description" content="Find commercial insurance coverage for your business location across California and Nevada." />
        <link rel="canonical" href="https://casurance.com/locations" />
      </Helmet>
      
      <Header />
      
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-white/80" />
              <span className="text-white/80">Serving Businesses Nationwide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-page-title">
              Insurance by Location
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Find commercial insurance tailored to your business location. 
              We provide coverage across California, Nevada, and all 50 states.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b">
              California Locations
            </h2>
            <p className="text-muted-foreground mb-6">
              Serving businesses throughout the Golden State with comprehensive commercial insurance solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {californiaLocations.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b">
              Nevada Locations
            </h2>
            <p className="text-muted-foreground mb-6">
              Protecting businesses across the Silver State with tailored insurance coverage.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nevadaLocations.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b">
              Insurance Types Available
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceTypes.map((type) => (
                <Card key={type.slug} className="h-full" data-testid={`card-insurance-type-${type.slug}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {type.description.split('.')[0]}.
                        </p>
                        {type.avgCost && (
                          <p className="text-sm font-medium text-primary">
                            Avg: {type.avgCost}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Don't See Your City Listed?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Casurance provides commercial insurance coverage for businesses in all 50 US states. 
              Contact us for a personalized quote for your location.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quote">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              <a href="tel:888-254-0089" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Call 888-254-0089
              </a>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
