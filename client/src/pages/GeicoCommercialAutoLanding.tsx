import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Award,
  BadgeCheck,
  Car,
  Truck,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Star,
  DollarSign,
  Users,
  Building2,
  Warehouse,
  Wrench,
  Package
} from "lucide-react";

import geicoLogoBlue from "@assets/heritage-blue-logo_1765255910834.png";
import geicoLogoWhite from "@assets/white-logo_1765255910834.png";

const commercialAutoStates = [
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "Colorado", abbr: "CO" },
  { name: "Florida", abbr: "FL" },
  { name: "Illinois", abbr: "IL" },
  { name: "Kansas", abbr: "KS" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "South Carolina", abbr: "SC" },
  { name: "Texas", abbr: "TX" },
];

const vehicleTypes = [
  { 
    icon: Car, 
    title: "Passenger Vehicles", 
    description: "Sedans, SUVs, and vans used for business purposes including sales, deliveries, and client visits.",
    examples: ["Company Cars", "Fleet Vehicles", "Sales Vehicles"]
  },
  { 
    icon: Truck, 
    title: "Light & Medium Trucks", 
    description: "Pickup trucks, box trucks, and cargo vans for commercial operations and deliveries.",
    examples: ["Pickup Trucks", "Box Trucks", "Cargo Vans"]
  },
  { 
    icon: Wrench, 
    title: "Service Vehicles", 
    description: "Specialized vehicles for contractors, technicians, and service professionals.",
    examples: ["Service Trucks", "Utility Vehicles", "Work Vans"]
  },
  { 
    icon: Package, 
    title: "Delivery Vehicles", 
    description: "Vehicles dedicated to product delivery and distribution operations.",
    examples: ["Delivery Vans", "Route Trucks", "Courier Vehicles"]
  },
  { 
    icon: Building2, 
    title: "Business Fleet", 
    description: "Multiple vehicles operated as part of a commercial fleet operation.",
    examples: ["Corporate Fleets", "Small Business Fleets", "Rental Fleets"]
  },
  { 
    icon: Warehouse, 
    title: "Specialty Commercial", 
    description: "Unique commercial vehicles requiring specialized coverage solutions.",
    examples: ["Food Trucks", "Mobile Services", "Specialty Haulers"]
  },
];

const coverageOptions = [
  "Liability Coverage",
  "Collision Coverage",
  "Comprehensive Coverage",
  "Medical Payments",
  "Uninsured/Underinsured Motorist",
  "Hired & Non-Owned Auto",
];

const businessTypes = [
  "Contractor/Construction",
  "Delivery/Courier Service",
  "Food Service/Catering",
  "HVAC/Plumbing/Electrical",
  "Landscaping/Lawn Care",
  "Real Estate/Property Management",
  "Retail/Wholesale",
  "Sales/Marketing",
  "Transportation/Logistics",
  "Other Service Business",
];

const stats = [
  { value: "14", label: "States Available", icon: MapPin },
  { value: "A++", label: "AM Best Rating", icon: Award },
  { value: "85+", label: "Years Experience", icon: Clock },
  { value: "24/7", label: "Claims Service", icon: Phone },
];

const faqs = [
  {
    question: "What is commercial auto insurance?",
    answer: "Commercial auto insurance protects vehicles used primarily for business purposes. It covers liability for accidents, physical damage to your vehicles, medical payments, and protection against uninsured drivers. Unlike personal auto policies, commercial coverage is designed for the unique risks businesses face on the road."
  },
  {
    question: "Which states offer GEICO commercial auto through Casurance?",
    answer: "As a Local Agent with GEICO, Casurance offers commercial auto coverage in 14 states: Arizona, Arkansas, Colorado, Florida, Illinois, Kansas, Nevada, New Jersey, New Mexico, Ohio, Oregon, Pennsylvania, South Carolina, and Texas."
  },
  {
    question: "What types of vehicles can be covered?",
    answer: "GEICO commercial auto covers a wide range of business vehicles including passenger cars, pickup trucks, vans, box trucks, service vehicles, delivery vehicles, and specialty commercial vehicles. Coverage is available for single vehicles or entire business fleets."
  },
  {
    question: "What coverage options are available?",
    answer: "Coverage options include liability, collision, comprehensive, medical payments, uninsured/underinsured motorist, and hired & non-owned auto coverage. Your policy can be customized based on your specific business needs and vehicle usage."
  },
  {
    question: "How do I file a claim?",
    answer: "GEICO offers 24/7 claims service. You can file a claim online, through the GEICO mobile app, or by calling the claims hotline. As your local agent, Casurance is also available to assist you throughout the claims process."
  },
  {
    question: "What discounts are available?",
    answer: "Available discounts may include multi-vehicle, safe driver, defensive driving course completion, anti-theft devices, and bundling with other commercial policies. Contact Casurance to discuss which discounts apply to your business."
  },
];

const keyBenefits = [
  "Competitive rates from a trusted national carrier",
  "24/7 claims service with fast resolution",
  "Flexible coverage options for your business needs",
  "Local agent support from Casurance experts",
  "Easy online policy management",
  "Multi-vehicle and fleet discounts available",
  "Coverage for hired and non-owned vehicles",
  "Medical payments and liability protection",
];

export default function GeicoCommercialAutoLanding() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    businessType: "",
    vehicleCount: "",
    vehicleTypes: "",
    currentCoverage: "",
    notes: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        type: "geico-commercial-auto",
        businessName: data.businessName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        businessType: data.businessType,
        vehicleCount: data.vehicleCount,
        vehicleTypes: data.vehicleTypes,
        currentCoverage: data.currentCoverage,
        notes: data.notes,
        source: "geico-commercial-auto-landing",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your GEICO commercial auto quote.",
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        businessType: "",
        vehicleCount: "",
        vehicleTypes: "",
        currentCoverage: "",
        notes: "",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Required Fields Missing",
        description: "Please complete all required fields to submit your quote request.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Local Agent with GEICO",
    "description": "Casurance is a Local Agent with GEICO offering commercial auto insurance in 14 states. Get competitive quotes for business vehicles, trucks, vans, and commercial fleets.",
    "url": "https://casurance.net/geico-commercial-auto",
    "telephone": "+1-833-522-7872",
    "areaServed": commercialAutoStates.map(s => ({
      "@type": "State",
      "name": s.name
    })),
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "GEICO Commercial Auto Insurance",
        "description": "Commercial auto coverage for business vehicles through GEICO"
      }
    }
  };

  const faqStructuredData = {
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

  return (
    <>
      <Helmet>
        <title>GEICO Commercial Auto Insurance | Local Agent with GEICO | Casurance</title>
        <meta name="description" content="Casurance is a Local Agent with GEICO offering commercial auto insurance in AZ, AR, CO, FL, IL, KS, NV, NJ, NM, OH, OR, PA, SC, TX. Get quotes for business vehicles, trucks, vans, and fleets." />
        <meta name="keywords" content="GEICO commercial auto, local agent with GEICO, commercial auto insurance, business vehicle insurance, fleet insurance, commercial truck insurance" />
        <link rel="canonical" href="https://casurance.net/geico-commercial-auto" />
        <meta property="og:title" content="GEICO Commercial Auto Insurance | Local Agent with GEICO | Casurance" />
        <meta property="og:description" content="Get commercial auto insurance through GEICO. Casurance is your Local Agent with GEICO serving 14 states." />
        <meta property="og:url" content="https://casurance.net/geico-commercial-auto" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <span className="text-xl font-bold text-[#003366] cursor-pointer" data-testid="link-home">
                    Casurance
                  </span>
                </Link>
                <span className="text-muted-foreground text-sm hidden sm:inline">|</span>
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6 hidden sm:block"
                  data-testid="img-geico-logo"
                />
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/coverages">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-coverages">
                    Coverages
                  </span>
                </Link>
                <Link href="/industries">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-industries">
                    Industries
                  </span>
                </Link>
                <Link href="/quote">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-quote">
                    Get a Quote
                  </span>
                </Link>
                <a 
                  href="tel:+18335227872" 
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                  data-testid="link-phone"
                >
                  <Phone className="h-4 w-4" />
                  (833) 522-7872
                </a>
              </nav>

              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-4 py-4 space-y-3">
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6 mb-4"
                />
                <Link href="/coverages">
                  <span className="block py-2 text-foreground" data-testid="link-coverages-mobile">Coverages</span>
                </Link>
                <Link href="/industries">
                  <span className="block py-2 text-foreground" data-testid="link-industries-mobile">Industries</span>
                </Link>
                <Link href="/quote">
                  <span className="block py-2 text-foreground" data-testid="link-quote-mobile">Get a Quote</span>
                </Link>
                <a 
                  href="tel:+18335227872" 
                  className="flex items-center gap-2 py-2 text-primary font-medium"
                  data-testid="link-phone-mobile"
                >
                  <Phone className="h-4 w-4" />
                  (833) 522-7872
                </a>
              </div>
            </div>
          )}
        </header>

        <main id="main-content">
          <section className="relative bg-[#003366] text-white py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#004080]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={geicoLogoWhite} 
                      alt="GEICO" 
                      className="h-10"
                      data-testid="img-geico-logo-hero"
                    />
                    <span className="text-white/80">Commercial Auto</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Commercial Auto Insurance from GEICO
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Casurance is your Local Agent with GEICO, offering competitive commercial auto coverage for businesses across 14 states. Protect your vehicles, drivers, and business with trusted coverage.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-white/10 backdrop-blur rounded-lg p-4 text-center"
                        data-testid={`stat-${index}`}
                      >
                        <stat.icon className="h-6 w-6 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {keyBenefits.slice(0, 4).map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm"
                        data-testid={`benefit-${index}`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-white text-foreground shadow-2xl" data-testid="card-quote-form">
                  <CardHeader className="bg-[#003366] text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Car className="h-5 w-5" />
                      Get Your Commercial Auto Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) => updateField("businessName", e.target.value)}
                            placeholder="Your Business Name"
                            required
                            data-testid="input-business-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactName">Contact Name</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => updateField("contactName", e.target.value)}
                            placeholder="Your Name"
                            data-testid="input-contact-name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@business.com"
                            required
                            data-testid="input-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="(555) 123-4567"
                            required
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">Business State *</Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => updateField("state", value)}
                          >
                            <SelectTrigger id="state" data-testid="select-state">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              {commercialAutoStates.map((state) => (
                                <SelectItem key={state.abbr} value={state.abbr}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="businessType">Business Type</Label>
                          <Select
                            value={formData.businessType}
                            onValueChange={(value) => updateField("businessType", value)}
                          >
                            <SelectTrigger id="businessType" data-testid="select-business-type">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {businessTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="vehicleCount">Number of Vehicles</Label>
                          <Select
                            value={formData.vehicleCount}
                            onValueChange={(value) => updateField("vehicleCount", value)}
                          >
                            <SelectTrigger id="vehicleCount" data-testid="select-vehicle-count">
                              <SelectValue placeholder="How many?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Vehicle</SelectItem>
                              <SelectItem value="2-5">2-5 Vehicles</SelectItem>
                              <SelectItem value="6-10">6-10 Vehicles</SelectItem>
                              <SelectItem value="11-25">11-25 Vehicles</SelectItem>
                              <SelectItem value="26+">26+ Vehicles</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="currentCoverage">Currently Insured?</Label>
                          <Select
                            value={formData.currentCoverage}
                            onValueChange={(value) => updateField("currentCoverage", value)}
                          >
                            <SelectTrigger id="currentCoverage" data-testid="select-current-coverage">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, currently insured</SelectItem>
                              <SelectItem value="no">No current coverage</SelectItem>
                              <SelectItem value="expiring">Coverage expiring soon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Information</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => updateField("notes", e.target.value)}
                          placeholder="Tell us about your vehicles and coverage needs..."
                          rows={3}
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[#003366] hover:bg-[#004080]"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit"
                      >
                        {submitMutation.isPending ? (
                          "Submitting..."
                        ) : (
                          <>
                            Request Your Quote <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to be contacted about your insurance quote.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-states-title">
                  Available in 14 States
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  As a Local Agent with GEICO, Casurance provides commercial auto insurance across these states
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {commercialAutoStates.map((state, index) => (
                  <Card 
                    key={state.abbr} 
                    className="text-center hover-elevate"
                    data-testid={`card-state-${state.abbr}`}
                  >
                    <CardContent className="p-4">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-[#003366]" />
                      <div className="font-bold text-lg">{state.abbr}</div>
                      <div className="text-sm text-muted-foreground">{state.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-vehicles-title">
                  Commercial Vehicles We Cover
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From single work trucks to entire business fleets, GEICO commercial auto covers your operations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicleTypes.map((vehicle, index) => (
                  <Card key={index} className="hover-elevate" data-testid={`card-vehicle-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#003366]/10 p-3 rounded-lg">
                          <vehicle.icon className="h-6 w-6 text-[#003366]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{vehicle.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{vehicle.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.examples.map((example, i) => (
                              <span 
                                key={i} 
                                className="text-xs bg-muted px-2 py-1 rounded"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-coverage-title">
                  Coverage Options
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Customize your commercial auto policy with the coverage your business needs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4"
                    data-testid={`coverage-option-${index}`}
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="font-medium">{option}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-white/80 mb-6">
                  Ready to protect your business vehicles with GEICO?
                </p>
                <a href="#main-content">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#003366] hover:bg-white/90"
                    data-testid="button-get-quote-cta"
                  >
                    Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-benefits-title">
                  Why Choose Casurance as Your Local Agent with GEICO?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {keyBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 bg-background rounded-lg p-4 shadow-sm"
                    data-testid={`key-benefit-${index}`}
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden"
                    data-testid={`faq-${index}`}
                  >
                    <button
                      className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      aria-expanded={expandedFaq === index}
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="font-semibold text-lg">{faq.question}</span>
                      <ArrowRight 
                        className={`h-5 w-5 transition-transform flex-shrink-0 ${
                          expandedFaq === index ? "rotate-90" : ""
                        }`} 
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <img 
                src={geicoLogoWhite} 
                alt="GEICO" 
                className="h-12 mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
                Get Your GEICO Commercial Auto Quote Today
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                As your Local Agent with GEICO, Casurance is here to help you find the right coverage for your business vehicles at competitive rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+18335227872">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#003366] hover:bg-white/90 w-full sm:w-auto"
                    data-testid="button-call-cta"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (833) 522-7872
                  </Button>
                </a>
                <a href="#main-content">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    data-testid="button-quote-cta"
                  >
                    Request a Quote Online <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-background border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-[#003366]">Casurance</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Local Agent with GEICO providing commercial auto insurance across 14 states.
                </p>
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6"
                />
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/coverages"><span className="text-muted-foreground hover:text-foreground cursor-pointer">All Coverages</span></Link></li>
                  <li><Link href="/industries"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Industries</span></Link></li>
                  <li><Link href="/quote"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Get a Quote</span></Link></li>
                  <li><Link href="/about"><span className="text-muted-foreground hover:text-foreground cursor-pointer">About Us</span></Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">GEICO Products</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-primary font-medium">Commercial Auto</span></li>
                  <li><Link href="/geico-private-passenger"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Private Passenger Auto</span></Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="tel:+18335227872" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Phone className="h-4 w-4" />
                      (833) 522-7872
                    </a>
                  </li>
                  <li>
                    <Link href="/contact">
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Contact Form</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>
                GEICO and its affiliates. Coverage is subject to underwriting approval. 
                Not all products are available in all states. © {new Date().getFullYear()} Casurance. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
