import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_STATES } from "@shared/constants/states";
import TrustedCarriers from "@/components/TrustedCarriers";
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
  Award,
  BadgeCheck,
  MessageSquare,
  Zap,
  Globe,
  FileCheck,
  Lock,
  Mail,
  Timer,
  Building,
  Store,
  Home
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
    answer: "We partner with 50+ top-rated carriers including Chubb, Berkshire Hathaway, AmTrust, CNA, Philadelphia Insurance, Tokio Marine, and many more."
  }
];

const weInsureProducts = [
  { icon: Building, label: "Apartments" },
  { icon: Home, label: "Habitational" },
  { icon: Store, label: "Retail Stores" },
  { icon: Shield, label: "General Liability" },
  { icon: Building2, label: "Commercial Property" },
  { icon: Truck, label: "Commercial Auto" },
  { icon: Users, label: "Workers Comp" },
  { icon: HardHat, label: "Contractors" },
];

const insuranceTypes = [
  "General Liability",
  "Commercial Property",
  "Commercial Auto",
  "Workers Compensation",
  "Builders Risk",
  "Professional Liability",
  "Business Owners Policy (BOP)",
  "Apartment/Habitational",
  "Retail Store Insurance",
  "Other"
];

export default function AdvertisingLandingPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    state: "",
    insuranceType: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        phone: data.phone,
        email: data.email,
        state: data.state,
        insurance_type: data.insuranceType
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "Our team will contact you within 24 hours with your personalized quote.",
      });
      navigate("/quote/thank-you");
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again or call us.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.email || !formData.state || !formData.insuranceType) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit a quote request.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

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

      <main id="main-content" className="min-h-screen">
        {/* Hero Section with Quote Form */}
        <section className="relative bg-[#0a1628] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                    CASURANCE
                  </span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
                    Save Up To <span className="text-primary">20%</span> On Commercial Property Insurance
                  </h1>
                  
                  <p className="text-lg text-white/80 mb-8 leading-relaxed" data-testid="text-hero-description">
                    Get a free, no-obligation quote in under 2 minutes. We specialize in hard-to-place risks that other insurers won't touch.
                  </p>
                </div>

                {/* Feature Badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">Same-Day Quotes</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">A-Rated Carriers</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">50+ Carriers</span>
                  </div>
                </div>

                {/* We Insure Section */}
                <div>
                  <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">We Insure:</p>
                  <div className="flex flex-wrap gap-2">
                    {weInsureProducts.map((product, index) => {
                      const Icon = product.icon;
                      return (
                        <div 
                          key={index}
                          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white text-sm"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {product.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Call CTA */}
                <div className="pt-4">
                  <a href="tel:18882540089" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="text-lg font-semibold">1-888-254-0089</span>
                  </a>
                </div>
              </div>

              {/* Right Column - Quote Form */}
              <div className="lg:pl-8">
                <Card className="bg-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-form-title">
                        Get Your Free Quote Now
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        No commitment required • Takes 2 minutes
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="businessName" className="text-foreground">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="Your Company Name"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          className="mt-1"
                          data-testid="input-business-name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactName" className="text-foreground">Your Name *</Label>
                          <Input
                            id="contactName"
                            placeholder="John Smith"
                            value={formData.contactName}
                            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                            className="mt-1"
                            data-testid="input-contact-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-foreground">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="mt-1"
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1"
                          data-testid="input-email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-foreground">State *</Label>
                        <Select 
                          value={formData.state} 
                          onValueChange={(value) => setFormData({...formData, state: value})}
                        >
                          <SelectTrigger className="mt-1" data-testid="select-state">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="insuranceType" className="text-foreground">Type of Insurance Needed *</Label>
                        <Select 
                          value={formData.insuranceType} 
                          onValueChange={(value) => setFormData({...formData, insuranceType: value})}
                        >
                          <SelectTrigger className="mt-1" data-testid="select-insurance-type">
                            <SelectValue placeholder="Select Insurance Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {insuranceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 mt-2"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <span>No Spam</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Timer className="h-3.5 w-3.5" />
                        <span>24hr Response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Trusted By Banner */}
          <div className="relative bg-[#0d1c33] py-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-center text-sm font-medium text-white/80">
                Trusted By Businesses Nationwide
              </p>
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

        <TrustedCarriers />

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
              Join businesses that trust Casurance for their commercial insurance needs. Fast quotes, competitive rates, and expert service.
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
