import { useState } from "react";
import { Link } from "wouter";
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
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Award,
  BadgeCheck,
  Lock,
  Building2,
  DollarSign,
  ArrowLeft,
  Menu,
  X,
  Flame,
  Waves,
  Scale,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Home,
  Calendar,
  FileCheck
} from "lucide-react";

import apartmentImage from "@assets/stock_images/modern_apartment_bui_e315080d.jpg";

const carrierPartners = [
  { name: "Chubb", rating: "A++", description: "World's Largest P&C Insurer" },
  { name: "CNA Insurance", rating: "A", description: "Fortune 500 Leader" },
  { name: "AmTrust", rating: "A-", description: "Habitational Experts" },
  { name: "Great American", rating: "A+", description: "Over 150 Years Strong" },
  { name: "Markel", rating: "A", description: "Specialty Insurance" },
  { name: "Guard Insurance", rating: "A+", description: "Berkshire Hathaway Company" },
];

const coverageHighlights = [
  { icon: Building2, title: "Property Coverage", benefit: "Up to $100M" },
  { icon: Shield, title: "General Liability", benefit: "$1M/$2M Limits" },
  { icon: DollarSign, title: "Loss of Rents", benefit: "12 Months" },
  { icon: Scale, title: "Ordinance & Law", benefit: "Critical for Older Buildings" },
  { icon: Flame, title: "Earthquake", benefit: "California Coverage" },
  { icon: Wrench, title: "Equipment Breakdown", benefit: "HVAC, Electrical" },
];

const oldBuildingBenefits = [
  {
    icon: Calendar,
    title: "All Building Ages Welcome",
    description: "We insure buildings from 1900s to present. Age alone doesn't disqualify your property."
  },
  {
    icon: Wrench,
    title: "Updated Systems Eligible",
    description: "Buildings with updated electrical, plumbing, HVAC, and roofing qualify for competitive rates."
  },
  {
    icon: Scale,
    title: "Ordinance & Law Coverage",
    description: "Critical coverage for older buildings - covers costs to bring buildings up to current codes after a loss."
  },
  {
    icon: Zap,
    title: "Electrical System Coverage",
    description: "Protection for older wiring systems including knob & tube with proper inspections."
  },
  {
    icon: Droplets,
    title: "Plumbing Coverage",
    description: "Coverage for galvanized and cast iron plumbing systems with maintenance documentation."
  },
  {
    icon: Wind,
    title: "Roof Age Flexibility",
    description: "We work with various roof ages and conditions with proper inspection reports."
  },
];

const eligibilityRequirements = [
  "Buildings of any age with documented system updates",
  "Electrical updates within last 25-40 years (varies by carrier)",
  "Plumbing updates or maintenance documentation",
  "HVAC systems in working condition",
  "Roof in fair to good condition (inspection may be required)",
  "Regular maintenance records preferred",
  "No major claims in past 3-5 years (preferred)",
  "Minimum 10+ units for best rates",
];

const stats = [
  { value: "$100M", label: "Per Location Limit", icon: Building2 },
  { value: "100+", label: "Year Old Buildings", icon: Calendar },
  { value: "50+", label: "Years Experience", icon: Award },
  { value: "24hr", label: "Quote Turnaround", icon: Clock },
];

const faqs = [
  {
    question: "Do you insure old apartment buildings?",
    answer: "Yes! We specialize in insuring older apartment buildings. We work with buildings from the early 1900s to present day. The key factors are the condition of major systems (electrical, plumbing, HVAC, roof) and maintenance history."
  },
  {
    question: "What system updates are required for older buildings?",
    answer: "Requirements vary by carrier, but generally we look for electrical updates within 25-40 years, functioning plumbing (even galvanized with no history of claims), working HVAC, and a roof in fair to good condition. We can often find coverage even if not all systems are fully updated."
  },
  {
    question: "Why is Ordinance & Law coverage important for old buildings?",
    answer: "Ordinance & Law coverage is critical for older buildings because after a covered loss, you may be required to rebuild to current building codes. This can significantly increase repair costs. We offer limits up to $100K or more for this essential coverage."
  },
  {
    question: "Can you insure buildings with original electrical or plumbing?",
    answer: "In many cases, yes. While some carriers require system updates, we have markets that will consider buildings with older systems if they're in good working condition with no claims history related to those systems."
  },
  {
    question: "What coverage limits are available for older apartment buildings?",
    answer: "Our program offers property coverage up to $100 million per location, with general liability limits of $1 million per occurrence and $2 million aggregate. Older buildings in good condition qualify for the same high limits as newer properties."
  },
];

function LandingPageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-[#0a1628]/95 backdrop-blur-sm text-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <span className="text-xl font-bold tracking-wide cursor-pointer" style={{ letterSpacing: '0.15em' }}>
              CASURANCE
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/industry/apartments-industry" className="text-white/80 hover:text-white text-sm flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              All Apartments
            </Link>
            <a href="tel:18882540089" className="flex items-center gap-2 text-primary font-medium">
              <Phone className="h-4 w-4" />
              1-888-254-0089
            </a>
          </nav>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/industry/apartments-industry" className="text-white/80 hover:text-white text-sm flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                All Apartments
              </Link>
              <a href="tel:18882540089" className="flex items-center gap-2 text-primary font-medium">
                <Phone className="h-4 w-4" />
                1-888-254-0089
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function OldBuildingsLanding() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    buildingAge: "",
    totalUnits: "",
    propertyValue: "",
    state: "",
    systemUpdates: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("/api/quick-quote", "POST", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your older building insurance quote.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or call us directly.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      insuranceType: "Older Apartment Building Insurance",
      message: `Building Age: ${formData.buildingAge}, Total Units: ${formData.totalUnits}, Property Value: ${formData.propertyValue}, State: ${formData.state}, System Updates: ${formData.systemUpdates}`
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Older Apartment Building Insurance",
    "description": "Insurance for older apartment buildings. We insure buildings of all ages with coverage up to $100M. Specialists in vintage, historic, and legacy apartment properties.",
    "url": "https://casurance.com/industry/old-buildings",
    "telephone": "+1-888-254-0089",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "714 W. Olympic Blvd, Suite 906",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90015",
      "addressCountry": "US"
    },
    "areaServed": ["California", "United States"],
    "priceRange": "$$"
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
        <title>Old Apartment Building Insurance | Older Buildings Welcome | Casurance</title>
        <meta 
          name="description" 
          content="Insurance for older apartment buildings. We insure buildings of all ages - 1900s to present. Coverage up to $100M. Ordinance & Law coverage, system flexibility. California specialists." 
        />
        <meta 
          name="keywords" 
          content="old apartment building insurance, older building insurance, vintage apartment insurance, historic apartment insurance, old building property insurance, apartment insurance old buildings, insurance for old apartments, legacy building insurance, aged apartment coverage, older multifamily insurance, california old building insurance, ordinance and law coverage, older apartment insurance california" 
        />
        <meta property="og:title" content="Older Apartment Building Insurance | Buildings of All Ages | Casurance" />
        <meta property="og:description" content="Insurance for older apartment buildings. We welcome buildings of all ages with coverage up to $100M per location." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.com/industry/old-buildings" />
        <link rel="canonical" href="https://casurance.com/industry/old-buildings" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <main id="top" className="min-h-screen bg-background">
        <LandingPageHeader />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img 
              src={apartmentImage} 
              alt="Older apartment building" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Calendar className="h-4 w-4" />
                  We Insure Older Buildings
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-main-heading">
                  Old Apartment Building
                  <span className="text-yellow-400 block mt-2">Insurance Programs</span>
                </h1>
                
                <p className="text-xl text-white/80 mb-8 max-w-xl">
                  We welcome older apartment buildings of all ages. From 1900s vintage properties to modern builds - 
                  get comprehensive coverage up to $100M per location with Ordinance & Law protection.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:18882540089">
                    <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 gap-2">
                      <Phone className="h-4 w-4" /> 1-888-254-0089
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <Card className="bg-white/95 backdrop-blur shadow-2xl border-0">
                  <CardContent className="p-6">
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Quote Request Received!</h3>
                        <p className="text-muted-foreground">
                          An older building specialist will contact you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-foreground mb-2">Get Your Older Building Quote</h2>
                          <p className="text-muted-foreground">We insure buildings of all ages</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Smith"
                                required
                                data-testid="input-name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone" className="text-foreground">Phone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(555) 123-4567"
                                required
                                data-testid="input-phone"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="email" className="text-foreground">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com"
                              required
                              data-testid="input-email"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="company" className="text-foreground">Company/Entity Name</Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="ABC Properties LLC"
                              data-testid="input-company"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-foreground">Building Age</Label>
                              <Select value={formData.buildingAge} onValueChange={(v) => setFormData({ ...formData, buildingAge: v })}>
                                <SelectTrigger data-testid="select-building-age">
                                  <SelectValue placeholder="Year built" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pre-1920">Before 1920</SelectItem>
                                  <SelectItem value="1920-1950">1920 - 1950</SelectItem>
                                  <SelectItem value="1950-1970">1950 - 1970</SelectItem>
                                  <SelectItem value="1970-1990">1970 - 1990</SelectItem>
                                  <SelectItem value="1990-2000">1990 - 2000</SelectItem>
                                  <SelectItem value="2000-plus">2000 or newer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="units" className="text-foreground">Total Units</Label>
                              <Input
                                id="units"
                                value={formData.totalUnits}
                                onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                                placeholder="e.g., 50"
                                data-testid="input-units"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-foreground">Property Value</Label>
                              <Select value={formData.propertyValue} onValueChange={(v) => setFormData({ ...formData, propertyValue: v })}>
                                <SelectTrigger data-testid="select-value">
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="under-5m">Under $5M</SelectItem>
                                  <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                                  <SelectItem value="10m-25m">$10M - $25M</SelectItem>
                                  <SelectItem value="25m-50m">$25M - $50M</SelectItem>
                                  <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                                  <SelectItem value="over-100m">Over $100M</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-foreground">State</Label>
                              <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                                <SelectTrigger data-testid="select-state">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="AZ">Arizona</SelectItem>
                                  <SelectItem value="NV">Nevada</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                  <SelectItem value="other">Other State</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-foreground">System Updates</Label>
                            <Select value={formData.systemUpdates} onValueChange={(v) => setFormData({ ...formData, systemUpdates: v })}>
                              <SelectTrigger data-testid="select-updates">
                                <SelectValue placeholder="Select update status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all-updated">All systems updated (Electrical, Plumbing, HVAC, Roof)</SelectItem>
                                <SelectItem value="most-updated">Most systems updated</SelectItem>
                                <SelectItem value="some-updated">Some systems updated</SelectItem>
                                <SelectItem value="original">Mostly original systems</SelectItem>
                                <SelectItem value="not-sure">Not sure</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full bg-primary hover:bg-primary/90 gap-2"
                            disabled={submitMutation.isPending}
                            data-testid="button-submit-quote"
                          >
                            {submitMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                            <span className="flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              Secure & Confidential
                            </span>
                            <span className="flex items-center gap-1">
                              <BadgeCheck className="h-3 w-3" />
                              No Obligation
                            </span>
                          </div>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Highlights */}
        <section className="py-12 bg-[#1a2d4a]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {coverageHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                    <Icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-medium text-sm">{item.title}</div>
                    <div className="text-yellow-400 text-xs font-semibold">{item.benefit}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why We're Different for Older Buildings */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Casurance for <span className="text-primary">Older Buildings</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Many insurers decline older buildings. We specialize in finding coverage for properties others won't insure.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {oldBuildingBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="bg-card border-border hover-elevate">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="py-16 bg-[#0a1628] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Eligibility for <span className="text-yellow-400">Older Buildings</span>
                </h2>
                <p className="text-white/80 mb-8">
                  We work with buildings that many carriers decline. Here's what we look for when underwriting older apartment properties:
                </p>
                
                <div className="space-y-3">
                  {eligibilityRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Common Older Building Challenges We Solve</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="font-medium text-white">Older Electrical Systems</div>
                      <div className="text-white/60 text-sm">Coverage available with inspection documentation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="font-medium text-white">Original Plumbing</div>
                      <div className="text-white/60 text-sm">Galvanized and cast iron systems considered</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="font-medium text-white">Historic Buildings</div>
                      <div className="text-white/60 text-sm">Pre-1920 buildings welcome with proper documentation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="font-medium text-white">Code Compliance Gaps</div>
                      <div className="text-white/60 text-sm">Ordinance & Law coverage protects you</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrier Partners */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                A-Rated Insurance Carriers
              </h2>
              <p className="text-muted-foreground">
                We partner with top-rated carriers who understand older building risks
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {carrierPartners.map((partner, index) => (
                <Card key={index} className="bg-card text-center hover-elevate">
                  <CardContent className="p-4">
                    <div className="font-bold text-foreground mb-1">{partner.name}</div>
                    <div className="text-xs text-primary font-medium">Rated {partner.rating}</div>
                    <div className="text-xs text-muted-foreground mt-1">{partner.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Common questions about insuring older apartment buildings
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get a Quote for Your <span className="text-yellow-400">Older Building</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Don't let building age stop you from getting great coverage. Contact us today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:18882540089">
                <Button size="lg" className="bg-yellow-400 text-[#0a1628] hover:bg-yellow-300 gap-2 font-semibold">
                  <Phone className="h-5 w-5" /> Call 1-888-254-0089
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 gap-2"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <FileCheck className="h-5 w-5" /> Request Online Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0a1628] text-white py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <div className="text-xl font-bold tracking-wide mb-1" style={{ letterSpacing: '0.15em' }}>CASURANCE</div>
                <div className="text-white/60 text-sm">Older Apartment Building Insurance Specialists</div>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="tel:18882540089" className="flex items-center gap-2 text-primary">
                  <Phone className="h-4 w-4" />
                  1-888-254-0089
                </a>
                <Link href="/industry/apartments-industry" className="text-white/80 hover:text-white text-sm">
                  All Apartments
                </Link>
                <Link href="/" className="text-white/80 hover:text-white text-sm">
                  Home
                </Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
              <p>CA License #0N04509 | 714 W. Olympic Blvd, Suite 906, Los Angeles, CA 90015</p>
              <p className="mt-1">© {new Date().getFullYear()} Casurance Insurance Agency. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
