import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { 
  Shield, 
  CheckCircle, 
  Phone, 
  ArrowRight, 
  Building2, 
  HardHat, 
  Home, 
  Briefcase,
  Users,
  FileCheck,
  DollarSign,
  Star,
  Wrench,
  Hammer,
  Zap,
  Droplets,
  Wind,
  Paintbrush,
  Shovel,
  Factory,
  Store,
  Package,
  ClipboardCheck,
  Award
} from "lucide-react";
import officeImage from "@assets/066faf8c-7f20-48af-a9d5-679652025966_1765780898434.png";
import constructionImage from "@assets/90941868-99d1-4f1f-a25c-48356e1bcdb4_1765780898435.png";
import retailImage from "@assets/fa318424-349c-4375-84d6-19442cf39b72_1765780898435.png";
import contractorImage from "@assets/42c667d5-e4ed-4f7b-b6a3-fd8b0d06a79e_1765780898435.png";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const aboutProductFeatures = [
  { label: "Wide class coverage options, including roofing", icon: HardHat },
  { label: "All carriers are A rated", icon: Star },
  { label: "Waiver of subrogation included", icon: FileCheck },
  { label: "Primary wording included", icon: ClipboardCheck },
  { label: "New venture and lapse in coverage accepted", icon: Briefcase },
  { label: "Online self-rater for all classes", icon: Zap },
  { label: "Full limits EIFS coverage available", icon: Building2 },
];

const keyBenefits = [
  { label: "Roofing Operations Warranty available", icon: Home },
  { label: "Removal of prior work exclusion available", icon: Wrench },
  { label: "Defense outside limits available", icon: Shield },
  { label: "Full limits townhome & condominium coverage", icon: Building2 },
  { label: "Non-admitted with ISO occurrence forms", icon: FileCheck },
  { label: "ISO coverage forms (CG 20 10 and CG 20 37)", icon: ClipboardCheck },
];

const contractorClasses = [
  "General Contractor (GC)",
  "Carpet & Flooring Installation",
  "Carpet Cleaning",
  "Concrete Work",
  "Debris Removal",
  "Drywall Installation",
  "Electrical Contractors",
  "Excavation",
  "Fencing Installation",
  "Flooring Installation",
  "Framing",
  "Grading",
  "Guniting",
  "HVAC Installation",
  "Insulation Installation",
  "Janitorial Services",
  "Landscaping",
  "Masonry",
  "Metal Erection",
  "Painting Contractors",
  "Paving",
  "Plastering",
  "Plumbing Contractors",
  "Refrigeration",
  "Remodeling",
  "Roofing Contractors",
  "Sandblasting",
  "Septic System Installation",
  "Siding Installation",
  "Sign Installation",
  "Solar Installation",
  "Swimming Pool Contractors",
  "Tile Installation",
  "Window & Door Installation",
  "Welding",
  "Cabinet Installation",
  "Demolition",
  "Waterproofing",
  "Stucco Application",
  "Gutter Installation",
];

const businessClasses = [
  {
    title: "Small Business",
    description: "Tailored coverage for small contractors and service businesses",
    features: ["Affordable premiums", "Quick quote turnaround", "Flexible payment options"],
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Mid-Market",
    description: "Comprehensive solutions for growing construction operations",
    features: ["Higher limits available", "Multi-location coverage", "Dedicated account management"],
    icon: Building2,
    color: "bg-primary",
  },
  {
    title: "Additional Industries",
    description: "Coverage extends beyond construction to diverse business types",
    features: ["Retail operations", "Professional services", "Manufacturing facilities"],
    icon: Store,
    color: "bg-green-600",
  },
];

const policyLimits = [
  { label: "Per Occurrence", value: "Up to $1M" },
  { label: "General Aggregate", value: "Up to $2M" },
  { label: "Products/Completed Operations Aggregate", value: "Up to $2M" },
  { label: "Excess Capacity", value: "Up to $5M" },
];

const sectorContractors = [
  {
    title: "Commercial Sector Contractors",
    description: "Coverage for contractors working on commercial projects including office buildings, retail centers, and industrial facilities.",
    image: officeImage,
    examples: ["Office building construction", "Retail center buildouts", "Industrial facilities", "Commercial renovations"],
    icon: Building2,
  },
  {
    title: "Artisan Contractors",
    description: "Specialized coverage for skilled tradespeople including electricians, plumbers, HVAC technicians, and specialty contractors.",
    image: contractorImage,
    examples: ["Electrical contractors", "Plumbing specialists", "HVAC technicians", "Specialty trades"],
    icon: Wrench,
  },
  {
    title: "Residential Sector Contractors",
    description: "Protection for contractors focused on residential construction, remodeling, and home improvement projects.",
    image: retailImage,
    examples: ["Home builders", "Remodeling contractors", "Kitchen & bath specialists", "Roofing contractors"],
    icon: Home,
  },
];

const faqs = [
  {
    question: "What is general liability insurance and who needs it?",
    answer: "General liability insurance protects businesses from claims of bodily injury, property damage, and personal injury to third parties. Every contractor, business owner, or service provider that interacts with customers, vendors, or the public needs this coverage. Most landlords and clients require it before signing contracts."
  },
  {
    question: "What classes of contractors are eligible for coverage?",
    answer: "We cover 40+ contractor classes including general contractors, roofing, electrical, plumbing, HVAC, concrete, drywall, painting, landscaping, flooring, fencing, solar installation, and many more specialty trades. Contact us for a complete list of eligible classes."
  },
  {
    question: "What limits are available?",
    answer: "We offer up to $1 million per occurrence, $2 million general aggregate and products/completed operations aggregate, with excess capacity up to $5 million for qualified risks."
  },
  {
    question: "Do you cover new ventures or contractors with lapsed coverage?",
    answer: "Yes, we accept new ventures and contractors who have had a lapse in coverage. Our underwriters work with businesses at all stages to find appropriate coverage solutions."
  },
  {
    question: "What special coverages are available for roofing contractors?",
    answer: "We offer specialized roofing coverage including Roofing Operations Warranty, removal of prior work exclusion, and full limits EIFS coverage. Our program is designed specifically for the unique risks roofing contractors face."
  },
  {
    question: "Are your carriers A rated?",
    answer: "Yes, all of our carrier partners maintain A ratings from AM Best, providing you with financial stability and reliable claims handling when you need it most."
  },
];

export default function GeneralLiabilityPage() {
  const faqSchema = {
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
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "General Liability Insurance",
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
    "description": "Comprehensive general liability insurance for contractors, small businesses, and commercial operations across all 50 states.",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="General Liability Insurance | Contractor & Business Coverage"
        description="Comprehensive general liability insurance for 40+ contractor classes. A-rated carriers, up to $1M per occurrence, roofing coverage, waiver of subrogation included. Get a quote today."
        keywords="general liability insurance, contractor insurance, CGL insurance, commercial general liability, business liability insurance, contractor liability coverage"
        canonical="/coverage/general-liability"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      <Header />
      
      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={constructionImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-transparent" />
          
          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-white/20 text-white border-white/30" data-testid="badge-category">
                  Casualty Coverage
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
                  General Liability Insurance
                </h1>
                <p className="text-xl text-white/90 max-w-xl" data-testid="text-hero-description">
                  Comprehensive protection for contractors and businesses against third-party claims. 
                  Coverage for 40+ contractor classes with A-rated carriers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote/general-liability">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2" data-testid="button-get-quote">
                      Get a Quote <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="tel:18882540089">
                    <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 gap-2" data-testid="button-call">
                      <Phone className="h-4 w-4" /> 1-888-254-0089
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-6 w-6" />
                      Quick Policy Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Up to $1M per occurrence", "40+ contractor classes covered", "A-rated carriers only", "Waiver of subrogation included", "New ventures accepted"].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="text-sm text-muted-foreground">
              <Link href="/">
                <span className="hover:text-foreground cursor-pointer">Home</span>
              </Link>
              <span className="mx-2">/</span>
              <Link href="/coverages">
                <span className="hover:text-foreground cursor-pointer">Coverage</span>
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">General Liability</span>
            </div>
          </div>
        </div>

        {/* About the Product */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">
                About the Product
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our General Liability program provides comprehensive coverage with industry-leading features 
                designed specifically for contractors and businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutProductFeatures.map((feature, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{feature.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-benefits-title">
                Key Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enhanced coverage options that set our program apart from standard general liability policies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-primary" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{benefit.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Class Coverage */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-classes-title">
                40+ Contractor Classes Covered
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From general contractors to specialty trades, we provide comprehensive coverage 
                for virtually every type of contracting operation.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {contractorClasses.map((cls, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm"
                      data-testid={`text-class-${index}`}
                    >
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{cls}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Don't see your class? Contact us - we likely have coverage available.
                  </p>
                  <Link href="/quote/general-liability">
                    <Button className="gap-2" data-testid="button-request-quote">
                      Request a Quote <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Target Business Classes */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-business-title">
                Target Business Classes
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Tailored solutions for businesses of all sizes and across various industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessClasses.map((business, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-business-${index}`}>
                  <div className={`${business.color} p-4`}>
                    <div className="flex items-center gap-3">
                      <business.icon className="h-8 w-8 text-white" />
                      <h3 className="text-xl font-bold text-white">{business.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{business.description}</p>
                    <ul className="space-y-2">
                      {business.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Policy Features & Limits */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-limits-title">
                  Policy Features & Limits
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our comprehensive general liability policies provide robust protection 
                  with competitive limits and essential endorsements.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {policyLimits.map((limit, index) => (
                    <Card key={index} className="bg-primary/5" data-testid={`card-limit-${index}`}>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">{limit.label}</p>
                        <p className="text-2xl font-bold text-primary">{limit.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Link href="/quote/general-liability">
                  <Button size="lg" className="gap-2" data-testid="button-get-quote-limits">
                    Get Your Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Included in Every Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Bodily injury liability",
                        "Property damage liability",
                        "Personal & advertising injury",
                        "Products & completed operations",
                        "Medical payments coverage",
                        "Contractual liability",
                        "Legal defense costs"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sector Contractors */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-sectors-title">
                Coverage by Sector
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Specialized coverage solutions for contractors across commercial, artisan, and residential sectors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sectorContractors.map((sector, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-sector-${index}`}>
                  <div className="h-48 relative">
                    <img 
                      src={sector.image} 
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <sector.icon className="h-6 w-6" />
                      <h3 className="text-xl font-bold">{sector.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{sector.description}</p>
                    <ul className="space-y-2">
                      {sector.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about our general liability insurance program.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border rounded-lg px-4"
                    data-testid={`accordion-faq-${index}`}
                  >
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Quick Quote Form Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-quick-quote-title">
                  Get a Quick Quote
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out this simple form and we'll get back to you within 24 hours with a competitive quote.
                </p>
              </div>
              <QuickQuoteForm insuranceType="General Liability" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get a competitive general liability quote in minutes. Our team is ready to help 
              find the right coverage for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote/general-liability">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2" data-testid="button-cta-quote">
                  Get a Quote Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 gap-2" data-testid="button-cta-call">
                  <Phone className="h-4 w-4" /> Call 1-888-254-0089
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/70">
              714 W Olympic Blvd Suite 906, Los Angeles, CA 90015 | CA License #6005562
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
