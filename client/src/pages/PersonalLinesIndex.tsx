import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Home, Building2, Gem, Flame, Mountain, ArrowRight, Phone, CheckCircle2 } from "lucide-react";

const personalLinesProducts = [
  {
    title: "Personal Auto Insurance",
    slug: "personal-auto",
    icon: Car,
    description: "Comprehensive auto coverage for your personal vehicles with competitive rates and flexible options.",
    features: ["Liability & Collision Coverage", "Comprehensive Protection", "Uninsured Motorist", "Bundle Discounts"]
  },
  {
    title: "Homeowners Insurance",
    slug: "homeowners",
    icon: Home,
    description: "Complete protection for your home, belongings, and liability with customizable coverage options.",
    features: ["Dwelling Coverage", "Personal Property", "Liability Protection", "Loss of Use"]
  },
  {
    title: "Landlord Protector",
    slug: "landlord-protector",
    icon: Building2,
    description: "Specialized DP-3 coverage for rental property owners including dwelling, liability, and lost rental income.",
    features: ["Rental Dwelling Coverage", "Loss of Rents", "Landlord Liability", "Property Protection"]
  },
  {
    title: "High Value Home",
    slug: "high-value-home",
    icon: Gem,
    description: "Premium protection for luxury homes and estates with guaranteed replacement cost and concierge claims service.",
    features: ["Up to $30M Coverage", "Guaranteed Replacement", "Fine Arts & Jewelry", "Private Client Service"]
  },
  {
    title: "Wildfire & Brush Area",
    slug: "wildfire-brush-area",
    icon: Flame,
    description: "Specialized coverage for homes in high fire risk zones where standard policies may be unavailable.",
    features: ["High Fire Risk Areas", "E&S Market Solutions", "Brush Zone Coverage", "A-Rated Carriers"]
  },
  {
    title: "Residential Earthquake",
    slug: "residential-earthquake",
    icon: Mountain,
    description: "Stand-alone earthquake coverage with limits up to $15 million and deductibles as low as 2.5%.",
    features: ["Up to $15M Limits", "2.5% Deductible Options", "Personal Property", "Loss of Use"]
  }
];

export default function PersonalLinesIndex() {
  return (
    <>
      <SEOHead
        title="Personal Lines Insurance | Auto, Home & Specialty Coverage"
        description="Comprehensive personal insurance solutions including auto, homeowners, landlord, high value home, wildfire, and earthquake coverage. Protect what matters most with Casurance."
        canonical="/personal-lines"
        keywords="personal insurance, auto insurance, homeowners insurance, landlord insurance, high value home, wildfire insurance, earthquake insurance"
      />
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-primary font-medium mb-4">Personal Lines Insurance</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Protect What Matters Most
              </h1>
              <p className="text-xl text-white/80 mb-8">
                From your car and home to specialty coverage for luxury properties and hard-to-insure risks, we offer comprehensive personal insurance solutions tailored to your unique needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="tel:18882540089" data-testid="button-call-personal">
                    <Phone className="h-5 w-5 mr-2" />
                    1-888-254-0089
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/quote/personal-lines" data-testid="link-quote-personal">
                    Request a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Personal Insurance Products</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a complete range of personal insurance products to protect you, your family, and your assets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalLinesProducts.map((product) => (
                <Card key={product.slug} className="hover-elevate transition-all duration-200 h-full" data-testid={`card-coverage-${product.slug}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <product.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{product.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full" asChild>
                        <Link href="/quote/personal-lines" data-testid={`link-quote-${product.slug}`}>
                          Get a Quote
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/coverage/${product.slug}`} data-testid={`link-coverage-${product.slug}`}>
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Casurance for Personal Insurance?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Multiple Carrier Options</h3>
                      <p className="text-muted-foreground text-sm">
                        We work with top-rated carriers to find you the best coverage at competitive rates.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Hard-to-Place Risk Specialists</h3>
                      <p className="text-muted-foreground text-sm">
                        Access to E&S markets for wildfire zones, high-value homes, and other specialty risks.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Personalized Service</h3>
                      <p className="text-muted-foreground text-sm">
                        Work directly with experienced agents who understand your unique coverage needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Bundle & Save</h3>
                      <p className="text-muted-foreground text-sm">
                        Combine auto, home, and specialty coverages for multi-policy discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Get a Personal Lines Quote</h3>
                <p className="text-muted-foreground mb-6">
                  Contact us today to discuss your personal insurance needs. Our team is ready to help you find the right coverage.
                </p>
                <div className="space-y-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/quote/personal-lines" data-testid="button-quote-personal-lines">
                      Request a Quote Online
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="tel:18882540089" data-testid="button-call-quote">
                      <Phone className="h-5 w-5 mr-2" />
                      Call 1-888-254-0089
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Licensed in all 50 states. CA License #6005562
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
