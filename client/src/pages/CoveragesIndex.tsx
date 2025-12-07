import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getCoveragesByCategory } from "@shared/content/coverages";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { 
  ArrowRight, 
  Car, 
  Truck, 
  Shield, 
  Building2, 
  HardHat, 
  Umbrella, 
  FileText, 
  Users, 
  Briefcase,
  Home,
  Ship,
  Plane,
  Heart,
  Scale,
  Lock,
  Flame,
  Droplets,
  Mountain,
  Warehouse,
  Store,
  UtensilsCrossed,
  Hotel,
  Film,
  Wrench,
  Hammer,
  AlertTriangle,
  ShieldCheck,
  Building,
  Factory,
  Stethoscope,
  GraduationCap,
  Church,
  Landmark,
  Package,
  Zap,
  Globe,
  Leaf,
  CircleDollarSign,
  HandshakeIcon,
  ScrollText,
  BadgeCheck,
  LifeBuoy,
  Compass,
  Anchor,
  TreePine,
  Tractor,
  Wine,
  Bike,
  Bus,
  Ambulance,
  type LucideIcon
} from "lucide-react";

const coverageIcons: Record<string, LucideIcon> = {
  "commercial-auto": Car,
  "trucking": Truck,
  "general-liability": Shield,
  "commercial-property": Building2,
  "workers-compensation": HardHat,
  "umbrella-excess": Umbrella,
  "professional-liability": FileText,
  "directors-officers": Users,
  "employment-practices": Briefcase,
  "cyber-liability": Lock,
  "ocean-marine-cargo": Ship,
  "inland-marine": Package,
  "aviation": Plane,
  "medical-malpractice": Stethoscope,
  "product-liability": AlertTriangle,
  "builders-risk": Hammer,
  "contractors-equipment": Wrench,
  "crime-fidelity": Scale,
  "boiler-machinery": Factory,
  "environmental": Leaf,
  "fiduciary": CircleDollarSign,
  "garage-liability": Car,
  "liquor-liability": Wine,
  "special-events": Compass,
  "surety-bonds": HandshakeIcon,
  "business-owners-policy": Briefcase,
  "commercial-package": Package,
  "self-storage": Warehouse,
  "restaurant-bop": UtensilsCrossed,
  "hotel-motel": Hotel,
  "hospitality": Hotel,
  "film-production": Film,
  "real-estate": Building,
  "manufacturing": Factory,
  "technology": Zap,
  "healthcare": Heart,
  "education": GraduationCap,
  "religious-organizations": Church,
  "non-profit": Landmark,
  "agricultural": Tractor,
  "golf-country-club": TreePine,
  "nemt": Ambulance,
  "tnc-rideshare": Car,
  "limousine": Car,
  "taxi-black-car": Car,
  "public-transportation": Bus,
  "ambulance": Ambulance,
  "flood-coverage": Droplets,
  "earthquake": Mountain,
  "fire-coverage": Flame,
  "high-value-home": Home,
  "management-liability": Users,
  "construction-casualty": HardHat,
  "franchised-dealer": Store,
  "garage-service": Wrench,
  "auto-dealer-garage": Car,
  "vacant-building": Building,
  "crane-riggers": Anchor,
  "security-services": ShieldCheck,
  "shared-economy": Globe,
};

function getCoverageIcon(slug: string): LucideIcon {
  return coverageIcons[slug] || Shield;
}

export default function CoveragesIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Insurance Coverage Types"
        description="Explore our comprehensive range of commercial insurance products including general liability, property, auto, workers compensation, cyber liability, and specialty coverages."
        keywords="commercial insurance coverage, business insurance types, liability insurance, property insurance, workers comp, cyber insurance"
        canonical="/coverages"
      />
      <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Commercial Insurance Coverage
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our comprehensive range of commercial insurance products tailored to protect your business.
            </p>
          </div>
        </div>
      </div>
      <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {categories.map((category) => {
            const coverages = getCoveragesByCategory(category);
            if (coverages.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coverages.map((coverage) => {
                    const IconComponent = getCoverageIcon(coverage.slug);
                    return (
                      <Link key={coverage.slug} href={`/coverage/${coverage.slug}`}>
                        <Card className="h-full cursor-pointer group border hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`card-coverage-${coverage.slug}`}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                                  {coverage.title}
                                </h3>
                                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded mb-2">
                                  {category}
                                </span>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {coverage.summary}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center text-primary text-sm font-medium mt-4 group-hover:translate-x-1 transition-transform">
                              Learn More
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
