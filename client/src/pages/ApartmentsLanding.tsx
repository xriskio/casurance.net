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
  Users,
  Star,
  Home,
  ArrowLeft,
  Menu,
  X,
  MapPin,
  Flame,
  Waves,
  FileCheck,
  Building,
  GraduationCap,
  Heart,
  Landmark,
  Scale,
  Wrench
} from "lucide-react";

import apartmentImage from "@assets/stock_images/modern_apartment_bui_e315080d.jpg";

const carrierPartners = [
  { name: "Chubb", rating: "A++", description: "World's Largest P&C Insurer" },
  { name: "CNA Insurance", rating: "A", description: "Fortune 500 Leader" },
  { name: "Travelers", rating: "A++", description: "Property Specialists" },
  { name: "AmTrust", rating: "A-", description: "Habitational Experts" },
  { name: "Great American", rating: "A+", description: "Over 150 Years Strong" },
  { name: "Nationwide", rating: "A+", description: "Multi-Family Leaders" },
];

const coverageHighlights = [
  { icon: Building2, title: "Property Coverage", benefit: "Up to $100M" },
  { icon: Shield, title: "General Liability", benefit: "$1M/$2M Limits" },
  { icon: DollarSign, title: "Loss of Rents", benefit: "12 Months" },
  { icon: Waves, title: "Flood Coverage", benefit: "Available" },
  { icon: Flame, title: "Earthquake", benefit: "California Coverage" },
  { icon: Scale, title: "Ordinance & Law", benefit: "Up to $100K" },
];

const apartmentTypes = [
  "Garden Style Apartments",
  "Mid-Rise Buildings (3-14 Stories)",
  "Mixed-Use with Retail",
  "Student Housing",
  "Senior Housing",
  "Affordable Housing",
  "Market Rate Apartments",
  "Older Buildings (All Ages)",
];

const coveragesAvailable = [
  { title: "Building/Real Property", description: "Full replacement cost coverage" },
  { title: "Personal Property", description: "Contents and equipment protection" },
  { title: "Business Interruption", description: "Including Extra Expense & Loss of Rents" },
  { title: "General Liability", description: "$1,000,000 per occurrence / $2,000,000 aggregate" },
  { title: "Equipment Breakdown", description: "HVAC, electrical, plumbing systems" },
  { title: "Backup of Sewers", description: "Available upon request" },
  { title: "Crime Coverage", description: "Limits up to $100,000 available" },
  { title: "Employee Benefits", description: "E&O Coverage ($1M fixed limit)" },
  { title: "Terrorism Coverage", description: "Optional certified acts coverage" },
  { title: "Ordinance or Law", description: "Up to $100K B&C combined limit" },
];

const stats = [
  { value: "$100M", label: "Per Location Limit", icon: Building2 },
  { value: "$6M", label: "Per Building", icon: DollarSign },
  { value: "50+", label: "Years Experience", icon: Award },
  { value: "24hr", label: "Quote Turnaround", icon: Clock },
];

const faqs = [
  {
    question: "What types of apartment buildings do you insure?",
    answer: "We insure all types of apartment buildings including garden-style apartments, mid-rise buildings (3-14 stories), mixed-use properties with retail, student housing, senior housing, affordable housing, and older buildings of all ages with updates."
  },
  {
    question: "What coverage limits are available for apartment buildings?",
    answer: "Our apartment insurance program offers property coverage up to $100 million per location and $6 million per building, with general liability limits of $1 million per occurrence and $2 million aggregate."
  },
  {
    question: "Do you offer earthquake and flood coverage in California?",
    answer: "Yes! We provide comprehensive earthquake coverage for California apartment buildings and flood coverage where eligible. These are critical coverages for California property owners."
  },
  {
    question: "What is loss of rents coverage?",
    answer: "Loss of rents coverage protects your rental income if a covered loss makes units uninhabitable. We offer up to 12 months of lost rental income protection."
  },
  {
    question: "Do you insure older apartment buildings?",
    answer: "Yes, we specialize in older apartment buildings. Properties of all ages are eligible with appropriate updates to electrical, plumbing, HVAC, and roofing systems."
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
            <Link href="/" className="text-white/80 hover:text-white text-sm flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <a href="tel:18882540089" className="flex items-center gap-2 text-primary font-medium">
              <Phone className="h-4 w-4" />
              1-888-254-0089
            </a>
          </nav>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-white/80 hover:text-white text-sm flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
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

export default function ApartmentsLanding() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    propertyType: "",
    totalUnits: "",
    propertyValue: "",
    state: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("/api/quick-quote", "POST", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your apartment insurance quote.",
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
      insuranceType: "Apartment Building Insurance",
      message: `Property Type: ${formData.propertyType}, Total Units: ${formData.totalUnits}, Property Value: ${formData.propertyValue}, State: ${formData.state}`
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Apartment Building Insurance",
    "description": "Comprehensive apartment building insurance programs for owners, investors & managers. Coverage up to $100M per location in California and nationwide.",
    "url": "https://casurance.com/industry/apartments-industry",
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
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "450"
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
        <title>Apartment Building Insurance California | Coverage Up to $100M | Casurance</title>
        <meta 
          name="description" 
          content="Apartment building insurance programs for owners, investors & managers. Property, liability, loss of rents, flood & earthquake coverage. Limits up to $100M per location. California apartment insurance specialists." 
        />
        <meta 
          name="keywords" 
          content="apartment building insurance, apartment property insurance, apartment owner insurance, apartment building insurance california, multifamily property insurance, multi family apartment insurance, apartment complex insurance, apartment landlord insurance, commercial apartment insurance, garden style apartment insurance, mid rise apartment insurance, mixed use apartment insurance, student housing insurance, senior housing insurance, apartment insurance california, apartment building insurance los angeles, multifamily insurance california" 
        />
        <meta property="og:title" content="Apartment Building Insurance Programs | Coverage Up to $100M | Casurance" />
        <meta property="og:description" content="Comprehensive apartment building insurance for owners, investors & managers. Property, liability, loss of rents coverage up to $100M per location." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.com/industry/apartments-industry" />
        <link rel="canonical" href="https://casurance.com/industry/apartments-industry" />
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
              alt="Modern apartment building" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Building2 className="h-4 w-4" />
                  Apartment Building Insurance Programs
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-main-heading">
                  Apartment Building Insurance
                  <span className="text-primary block mt-2">Coverage Up to $100M</span>
                </h1>
                
                <p className="text-xl text-white/80 mb-8 max-w-xl">
                  Comprehensive multifamily property insurance for owners, investors & property managers. 
                  Specialized coverage for garden style, mid-rise, mixed-use, and older apartment buildings in California and nationwide.
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
                          An apartment insurance specialist will contact you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-foreground mb-2">Get Your Apartment Insurance Quote</h2>
                          <p className="text-muted-foreground">Fast quotes for apartment owners & investors</p>
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
                              <Label className="text-foreground">Property Type</Label>
                              <Select value={formData.propertyType} onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                                <SelectTrigger data-testid="select-property-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="garden-style">Garden Style</SelectItem>
                                  <SelectItem value="mid-rise">Mid-Rise (3-14 stories)</SelectItem>
                                  <SelectItem value="high-rise">High-Rise (15+ stories)</SelectItem>
                                  <SelectItem value="mixed-use">Mixed-Use with Retail</SelectItem>
                                  <SelectItem value="student">Student Housing</SelectItem>
                                  <SelectItem value="senior">Senior Housing</SelectItem>
                                  <SelectItem value="affordable">Affordable Housing</SelectItem>
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

                <div className="mt-6 text-center">
                  <p className="text-white/60 text-sm mb-3">Trusted by property owners nationwide</p>
                  <div className="flex items-center justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-white/80 text-sm ml-2">4.9/5 from 450+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Highlights */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {coverageHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-background rounded-lg p-4 text-center border shadow-sm">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-primary font-medium">{item.benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Apartment Types Section */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-types-title">
                Apartment Building Types We Insure
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From garden-style apartments to mid-rise buildings, we provide comprehensive coverage for all multifamily property types in California and nationwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {apartmentTypes.map((type, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-background rounded-lg px-4 py-3 border shadow-sm"
                  data-testid={`text-type-${index}`}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Market Cards - Colorful */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Apartment Insurance for Every Owner
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored multifamily property insurance solutions for investors, owners & property managers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Individual Owners</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Protection for individual apartment building owners and small investors</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Single building coverage</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Loss of rents protection</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Flexible payment options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-primary to-blue-700 p-4">
                  <div className="flex items-center gap-3">
                    <Landmark className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Real Estate Investors</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Portfolio coverage for apartment investment properties</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-property portfolios</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Blanket coverage available</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Property Managers</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Coverage solutions for property management companies</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>E&O liability protection</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Crime & fidelity bonds</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Tenant discrimination coverage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialized Housing Cards */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Specialized Apartment Insurance Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Coverage for garden style, mid-rise, mixed-use & specialized housing communities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
                  <div className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-bold text-white">Garden Style</h3>
                  </div>
                </div>
                <CardContent className="p-5 bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/20 dark:to-background">
                  <p className="text-sm text-muted-foreground mb-3">2+ buildings, 3 stories or less</p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Property up to $10M/location</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Multi-building complexes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-bold text-white">Mid-Rise</h3>
                  </div>
                </div>
                <CardContent className="p-5 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background">
                  <p className="text-sm text-muted-foreground mb-3">3-14 story apartment buildings</p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Property up to $15M/location</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Fire-resistive construction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-bold text-white">Student Housing</h3>
                  </div>
                </div>
                <CardContent className="p-5 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
                  <p className="text-sm text-muted-foreground mb-3">Up to 25% student occupancy</p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Near university locations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Vandalism coverage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-bold text-white">Senior Housing</h3>
                  </div>
                </div>
                <CardContent className="p-5 bg-gradient-to-b from-rose-50 to-white dark:from-rose-950/20 dark:to-background">
                  <p className="text-sm text-muted-foreground mb-3">Unassisted senior living facilities</p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Independent living coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Common area liability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverages Available Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Coverage Areas & Limits
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Comprehensive apartment building insurance with industry-leading limits and specialized endorsements.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">TIV Per Location</p>
                      <p className="text-2xl font-bold text-primary">Up to $100M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Per Building Limit</p>
                      <p className="text-2xl font-bold text-primary">Up to $6M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background border-green-100 dark:border-green-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">General Liability</p>
                      <p className="text-2xl font-bold text-green-600">$1M/$2M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-background border-amber-100 dark:border-amber-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Loss of Rents</p>
                      <p className="text-2xl font-bold text-amber-600">12 Months</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    California Apartment Insurance Specialists
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We specialize in apartment building insurance in California including Los Angeles, San Francisco, San Diego, and Southern California. 
                    Our program includes earthquake coverage and brush/wildfire protection where available.
                  </p>
                </div>
                
                <a href="#top">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    Get Your Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Coverages Available</h3>
                  </div>
                  <ul className="space-y-3">
                    {coveragesAvailable.map((coverage, index) => (
                      <li key={index} className="border-b border-muted pb-2 last:border-0">
                        <div className="font-semibold text-foreground text-sm">{coverage.title}</div>
                        <div className="text-xs text-muted-foreground">{coverage.description}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Carrier Partners */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">A-Rated Insurance Carriers</h2>
              <p className="text-muted-foreground">Backed by the nation's top property insurers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {carrierPartners.map((carrier, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <div className="font-bold text-foreground">{carrier.name}</div>
                    <div className="text-xs text-primary font-medium">{carrier.rating} Rated</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Apartment Insurance FAQ
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Protect Your Apartment Investment Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get comprehensive apartment building insurance with coverage up to $100 million per location. 
              Our team of habitational specialists is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#top">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 gap-2">
                  <Phone className="h-4 w-4" /> 1-888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0a1628] text-white py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xl font-bold tracking-wide" style={{ letterSpacing: '0.15em' }}>CASURANCE</span>
                <p className="text-sm text-white/60 mt-1">Insurance Agency Services | License #6005562</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
                <span>714 W. Olympic Blvd, Suite 906, Los Angeles, CA 90015</span>
                <a href="tel:18882540089" className="text-primary hover:text-primary/80">1-888-254-0089</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/40">
              <p>&copy; 2025 Casurance Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
