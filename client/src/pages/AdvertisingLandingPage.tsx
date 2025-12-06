import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Building2, 
  Truck, 
  HardHat, 
  Users, 
  Star,
  Award,
  BadgeCheck,
  MessageSquare,
  Zap,
  Globe,
  FileCheck
} from "lucide-react";

const coverageTypes = [
  { 
    icon: Truck, 
    title: "Commercial Auto", 
    description: "Fleet vehicles, trucks, and business autos", 
    link: "/quote/commercial-auto" 
  },
  { 
    icon: Shield, 
    title: "General Liability", 
    description: "Protection for your business operations", 
    link: "/quote/general-liability" 
  },
  { 
    icon: Users, 
    title: "Workers Compensation", 
    description: "Employee injury and illness coverage", 
    link: "/quote/workers-compensation" 
  },
  { 
    icon: Building2, 
    title: "Commercial Property", 
    description: "Buildings, equipment, and inventory", 
    link: "/quote/commercial-property" 
  },
  { 
    icon: HardHat, 
    title: "Builders Risk", 
    description: "Construction project protection", 
    link: "/quote/builders-risk" 
  },
  { 
    icon: FileCheck, 
    title: "Professional Liability", 
    description: "E&O coverage for professionals", 
    link: "/quote/professional-liability" 
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fast Quotes",
    description: "Get competitive quotes in minutes, not days. Our streamlined process saves you time."
  },
  {
    icon: Award,
    title: "50+ Carriers",
    description: "Access to top-rated insurance companies for the best coverage at competitive rates."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Licensed insurance professionals with 15+ years of commercial insurance experience."
  },
  {
    icon: Globe,
    title: "Nationwide",
    description: "Licensed and operating across all 50 US states to serve your business anywhere."
  }
];

const testimonials = [
  {
    quote: "Casurance found us better coverage at a lower price. The process was quick and professional.",
    name: "Michael R.",
    company: "Fleet Transport Inc.",
    rating: 5
  },
  {
    quote: "Outstanding service! They understood our unique needs and delivered exactly what we needed.",
    name: "Sarah T.",
    company: "Bay Area Construction",
    rating: 5
  },
  {
    quote: "Switching to Casurance saved our restaurant group over $15,000 annually on insurance.",
    name: "David L.",
    company: "Pacific Restaurant Group",
    rating: 5
  }
];

const faqs = [
  {
    question: "How quickly can I get a commercial insurance quote?",
    answer: "Most quotes are provided within 24-48 hours. For simpler policies, you may receive options the same day."
  },
  {
    question: "What types of businesses do you insure?",
    answer: "We insure businesses of all sizes across all 50 states, including transportation, construction, hospitality, retail, manufacturing, and professional services."
  },
  {
    question: "Are you licensed to sell insurance in my state?",
    answer: "Yes, Casurance is licensed to provide commercial insurance in all 50 US states."
  },
  {
    question: "How do I file a claim?",
    answer: "Contact our team directly at 1-888-254-0089 or email claims@casurance.com. We'll guide you through the entire claims process."
  },
  {
    question: "What carriers do you work with?",
    answer: "We partner with 50+ top-rated carriers including Travelers, Hartford, Progressive, Chubb, Liberty Mutual, and many more."
  }
];

export default function AdvertisingLandingPage() {
  return (
    <>
      <Helmet>
        <title>Commercial Business Insurance Quotes | Casurance Insurance Agency</title>
        <meta name="title" content="Commercial Business Insurance Quotes | Casurance Insurance Agency" />
        <meta name="description" content="Get fast commercial insurance quotes from 50+ top carriers. General liability, commercial auto, workers comp, and more. Licensed in all 50 states. Free quotes in minutes." />
        <meta name="keywords" content="commercial insurance, business insurance, general liability, commercial auto insurance, workers compensation, business insurance quotes, commercial insurance quotes" />
        <link rel="canonical" href="https://casurance.com/get-quote" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.com/get-quote" />
        <meta property="og:title" content="Get Commercial Business Insurance Quotes | Casurance" />
        <meta property="og:description" content="Get fast commercial insurance quotes from 50+ top carriers. Free quotes in minutes. Licensed in all 50 states." />
        <meta property="og:image" content="https://casurance.com/og-image.jpg" />
        <meta property="og:site_name" content="Casurance Commercial Insurance" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://casurance.com/get-quote" />
        <meta property="twitter:title" content="Get Commercial Business Insurance Quotes | Casurance" />
        <meta property="twitter:description" content="Get fast commercial insurance quotes from 50+ top carriers. Free quotes in minutes." />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Casurance Insurance Agency" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "InsuranceAgency",
            "name": "Casurance Insurance Agency",
            "description": "Leading commercial insurance agency providing business insurance solutions across all 50 US states. Get fast quotes from 50+ top-rated carriers.",
            "url": "https://casurance.com",
            "telephone": "+1-888-254-0089",
            "email": "info@casurance.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "714 W. Olympic Blvd, Suite 906",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "postalCode": "90015",
              "addressCountry": "US"
            },
            "areaServed": "US",
            "serviceType": ["Commercial Insurance", "Business Insurance", "General Liability Insurance", "Commercial Auto Insurance", "Workers Compensation Insurance"],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            },
            "openingHours": "Mo-Fr 09:00-17:00",
            "sameAs": [
              "https://www.linkedin.com/company/casurance"
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary-foreground" data-testid="text-trust-badge">Trusted by 500+ Businesses Nationwide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight" data-testid="text-hero-headline">
                Get Commercial Insurance Quotes in Minutes
              </h1>
              
              <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl" data-testid="text-hero-description">
                Compare quotes from 50+ top-rated insurance carriers. General liability, commercial auto, workers comp, and more. Licensed in all 50 states.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/quote">
                  <Button size="lg" variant="secondary" className="group text-lg px-8" data-testid="button-get-quote-hero">
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="tel:18882540089">
                  <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8" data-testid="button-call-hero">
                    <Phone className="mr-2 h-5 w-5" />
                    1-888-254-0089
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Free Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>No Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Compare 50+ Carriers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>All 50 States</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 bg-muted/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div data-testid="stat-carriers">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Insurance Carriers</div>
              </div>
              <div data-testid="stat-states">
                <div className="text-3xl font-bold text-primary mb-1">50</div>
                <div className="text-sm text-muted-foreground">States Licensed</div>
              </div>
              <div data-testid="stat-experience">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div data-testid="stat-rating">
                <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-coverage-heading">
                Commercial Insurance Coverage
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive protection for businesses of all sizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coverageTypes.map((coverage, index) => {
                const Icon = coverage.icon;
                return (
                  <Link key={index} href={coverage.link}>
                    <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-coverage-${index}`}>
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">{coverage.title}</h3>
                        <p className="text-muted-foreground">{coverage.description}</p>
                        <div className="mt-4 text-primary font-medium flex items-center gap-1">
                          Get Quote <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/coverages">
                <Button variant="outline" size="lg" data-testid="button-view-all-coverage">
                  View All Coverage Types
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-benefits-heading">
                Why Choose Casurance?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We make getting commercial insurance simple and affordable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4" data-testid="text-cta-middle">
              Ready to Protect Your Business?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get customized quotes from our expert team. Quick, easy, and competitive rates guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="secondary" className="group text-lg px-8" data-testid="button-get-quote-cta">
                  Request Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8" data-testid="button-call-cta">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1-888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-heading">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of satisfied businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-faq-heading">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} data-testid={`faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-7">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Partnered with Top-Rated Carriers
              </p>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {["Travelers", "Hartford", "Progressive", "Chubb", "Liberty Mutual", "CNA", "Zurich"].map((carrier, index) => (
                  <div key={index} className="text-muted-foreground/60 font-semibold text-sm" data-testid={`carrier-${index}`}>
                    {carrier}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <BadgeCheck className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-primary-foreground">Licensed in All 50 States</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4" data-testid="text-final-cta">
              Get Your Commercial Insurance Quote Today
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join 500+ businesses that trust Casurance for their commercial insurance needs. Fast quotes, competitive rates, and expert service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/quote">
                <Button size="lg" variant="secondary" className="group text-lg px-10 py-6" data-testid="button-get-quote-final">
                  Get Your Free Quote Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-primary-foreground/80">
              <a href="tel:18882540089" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
                <span>1-888-254-0089</span>
              </a>
              <span className="hidden sm:block">|</span>
              <a href="mailto:info@casurance.com" className="hover:text-primary-foreground transition-colors">
                info@casurance.com
              </a>
              <span className="hidden sm:block">|</span>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Mon-Fri 9AM-5PM PST</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
