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
  Building2,
  HardHat,
  Hammer,
  Home,
  FileText,
  AlertTriangle,
  Flame,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Scale,
  Package,
  Star,
  Umbrella,
  DollarSign,
  Calendar,
  Wrench,
  Truck,
  Construction,
  Ruler
} from "lucide-react";

import constructionImg1 from "@assets/stock_images/construction_site_bu_a8e01729.jpg";
import constructionImg2 from "@assets/stock_images/construction_site_bu_463f1021.jpg";

const coverageTypes = [
  { 
    icon: Building2, 
    title: "Ground-Up Construction", 
    description: "Up to $3.5M TIV for frame construction, up to $5M TIV for superior construction types. Primary layers up to $2.5M for projects of $10M or less.",
    highlight: true
  },
  { 
    icon: Hammer, 
    title: "Renovation Coverage", 
    description: "Up to $3.5M TIV for frame, $4M for Joisted Masonry or Masonry Non-Combustible. Option to cover building materials only.",
    highlight: true
  },
  { 
    icon: Shield, 
    title: "General Liability", 
    description: "GL limits up to $1M per occurrence / $2M aggregate for construction operations.",
    highlight: false
  },
  { 
    icon: Scale, 
    title: "Excess Builders Risk", 
    description: "For larger projects: up to $250M capacity with $100M per project, $50M wood frame, and $25M high hazard CAT perils. Lead or follow market capabilities.",
    highlight: true
  },
  { 
    icon: Flame, 
    title: "Hard-to-Insure Locations", 
    description: "Coverage available for locations prone to wildfires, severe weather, and other extreme exposures.",
    highlight: false
  },
  { 
    icon: Clock, 
    title: "Delay in Completion", 
    description: "Business income and soft costs coverage for construction delays.",
    highlight: false
  },
  { 
    icon: Truck, 
    title: "Equipment Coverage", 
    description: "Contractors equipment bundle, installation floater, and equipment rental reimbursement options.",
    highlight: false
  },
  { 
    icon: Package, 
    title: "Existing Structure", 
    description: "Coverage for existing building or structural coverage during renovations.",
    highlight: false
  },
];

const projectTypes = [
  "Ground-Up Construction - Commercial",
  "Ground-Up Construction - Residential",
  "Addition/Minor Remodel",
  "Significant Non-Structural Renovation",
  "Structural Renovation",
  "New Build - Custom Home",
  "Mixed-Use Development",
];

const constructionTypes = [
  "Frame",
  "Joisted Masonry",
  "Non-Combustible",
  "Masonry Non-Combustible",
  "Fire-Resistive",
];

const interestTypes = [
  "Owner",
  "General Contractor",
  "Owner and Contractor",
  "Developer",
  "Tenant/Occupant",
];

const policyTerms = [
  "3 months",
  "6 months",
  "8 months",
  "10 months",
  "12 months",
  "More than 12 months",
];

const stats = [
  { value: "$25M", label: "Primary TIV", icon: DollarSign },
  { value: "47", label: "States Covered", icon: MapPin },
  { value: "$250M", label: "Excess Capacity", icon: Scale },
  { value: "3-36mo", label: "Flexible Terms", icon: Calendar },
];

const faqs = [
  {
    question: "What is Builders Risk Insurance?",
    answer: "Builders Risk Insurance (also called Course of Construction insurance) protects buildings and structures during construction or renovation. It covers the structure, materials, and equipment against damage from fire, theft, vandalism, weather, and other covered perils during the construction phase."
  },
  {
    question: "What's the difference between ground-up and renovation coverage?",
    answer: "Ground-up construction covers new buildings from foundation to completion, with limits up to $5M TIV for superior construction. Renovation coverage protects existing buildings during remodeling or updates, with limits up to $4M depending on construction type, plus an option to cover the existing structure."
  },
  {
    question: "Can I get coverage for a project already started?",
    answer: "Yes, we can consider 'prior starts' - projects where construction has already begun. You'll need to provide details about the percentage completed, current project status, and any prior coverage in place."
  },
  {
    question: "What locations are covered?",
    answer: "Coverage is available in all 50 states excluding Hawaii, Idaho, and Louisiana. We specialize in hard-to-insure locations prone to wildfires, severe weather, hurricanes, and other extreme exposures."
  },
  {
    question: "What policy term lengths are available?",
    answer: "We offer flexible policy terms of 3, 6, 8, 10, or 12 months. For longer construction projects exceeding one year, extended term options are available."
  },
  {
    question: "What additional coverages are available?",
    answer: "Optional enhancements include Contractors Equipment Bundle, Installation Floater, Delay in Completion Coverage, Business Income, Soft Costs, Ordinance or Law (A, B, C), and equipment rental reimbursement."
  },
];

const keyFeatures = [
  "Commercial and residential projects up to $5M TIV per location",
  "New construction and renovation coverage",
  "Policy written on Inland Marine forms",
  "Monoline Property, Monoline GL, or Package available",
  "Existing structure coverage available for renovations",
  "Premises liability including or excluding construction operations",
  "Coverage for owner, general contractor, developer, or tenant",
];

interface ConfirmationProps {
  referenceNumber: string;
  contactName: string;
  email: string;
}

function LandingPageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-[#0a1628] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div className="cursor-pointer group">
              <span className="text-2xl font-bold text-white tracking-wide block" style={{ letterSpacing: '0.15em' }}>
                CASURANCE
              </span>
              <span className="text-xs text-white/60 uppercase tracking-widest block">
                Insurance Agency
              </span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/coverages">
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Coverages</span>
            </Link>
            <Link href="/industries">
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Industries</span>
            </Link>
            <Link href="/quote">
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Get Quote</span>
            </Link>
            <Link href="/contact">
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</span>
            </Link>
            <a href="tel:13235463030" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-colors">
              <Phone className="h-4 w-4" />
              1-323-546-3030
            </a>
          </nav>
          
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link href="/coverages">
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer block py-2">Coverages</span>
              </Link>
              <Link href="/industries">
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer block py-2">Industries</span>
              </Link>
              <Link href="/quote">
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer block py-2">Get Quote</span>
              </Link>
              <Link href="/contact">
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer block py-2">Contact</span>
              </Link>
              <a href="tel:13235463030" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg font-semibold transition-colors w-fit">
                <Phone className="h-4 w-4" />
                1-323-546-3030
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function LandingPageFooter() {
  return (
    <footer className="bg-[#0a1628] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold tracking-wide block mb-4" style={{ letterSpacing: '0.15em' }}>
              CASURANCE
            </span>
            <p className="text-white/60 text-sm">
              California License #0L41392
            </p>
            <p className="text-white/60 text-sm mt-2">
              Specialized commercial insurance solutions for businesses nationwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/coverages"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Coverages</span></Link>
              <Link href="/industries"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Industries</span></Link>
              <Link href="/quote"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Get Quote</span></Link>
              <Link href="/about"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">About Us</span></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Related Coverage</h4>
            <div className="space-y-2">
              <Link href="/coverage/commercial-property"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Commercial Property</span></Link>
              <Link href="/coverage/construction-casualty"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Construction Casualty</span></Link>
              <Link href="/coverage/general-liability"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">General Liability</span></Link>
              <Link href="/coverage/workers-compensation"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Workers Compensation</span></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="tel:13235463030" className="text-white/60 hover:text-white transition-colors block">
                1-323-546-3030
              </a>
              <a href="mailto:info@casurance.com" className="text-white/60 hover:text-white transition-colors block">
                info@casurance.com
              </a>
              <p className="text-white/60">
                714 W. Olympic Blvd, Suite 906<br />
                Los Angeles, CA 90015
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Casurance Insurance Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function QuoteConfirmation({ referenceNumber, contactName, email }: ConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628]">
      <LandingPageHeader />
      
      <div className="max-w-2xl mx-auto py-16 px-6">
        <Card className="bg-white shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Quote Request Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you, {contactName}! Your builders risk insurance quote request has been received.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your Reference Number</p>
              <p className="text-2xl font-bold text-primary">{referenceNumber}</p>
            </div>
            
            <div className="space-y-4 text-left">
              <h3 className="font-semibold text-foreground">What happens next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Confirmation email sent to <strong>{email}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    A licensed agent will review your project details within 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    We'll contact you with competitive builders risk quotes from our carrier partners
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-4">Need immediate assistance?</p>
              <a href="tel:13235463030" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <Phone className="h-4 w-4" />
                Call 1-323-546-3030
              </a>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <LandingPageFooter />
    </div>
  );
}

export default function BuildersRiskLanding() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [confirmationData, setConfirmationData] = useState<ConfirmationProps | null>(null);
  
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    state: "CA",
    projectType: "",
    constructionType: "",
    interestType: "",
    totalInsuredValue: "",
    policyTerm: "",
    projectStartDate: "",
    projectEndDate: "",
    priorStart: "no",
    additionalInfo: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        insurance_type: "Builders Risk Insurance",
        message: `
Project Type: ${data.projectType}
Construction Type: ${data.constructionType}
Interest: ${data.interestType}
City: ${data.city}, ${data.state}
Total Insured Value: ${data.totalInsuredValue}
Policy Term: ${data.policyTerm}
Project Start Date: ${data.projectStartDate}
Project End Date: ${data.projectEndDate}
Prior Start (Already Begun): ${data.priorStart}
Additional Info: ${data.additionalInfo}
        `.trim(),
      });
      return response;
    },
    onSuccess: (data: any) => {
      setConfirmationData({
        referenceNumber: data.referenceNumber || "BR-" + Date.now(),
        contactName: formData.contactName,
        email: formData.email,
      });
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    mutation.mutate(formData);
  };

  if (submitted && confirmationData) {
    return <QuoteConfirmation {...confirmationData} />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Builders Risk Insurance",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Casurance Insurance Agency",
      "telephone": "+1-323-546-3030",
      "url": "https://casurance.net"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "Builders Risk Insurance",
      "Construction Insurance",
      "Course of Construction Coverage",
      "Renovation Insurance",
      "General Liability Insurance"
    ],
    "description": "Comprehensive builders risk insurance for ground-up construction and renovations. Primary coverage up to $25M TIV with excess capacity up to $250M for larger projects. Hard-to-insure locations accepted."
  };

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://casurance.net" },
      { "@type": "ListItem", "position": 2, "name": "Coverages", "item": "https://casurance.net/coverages" },
      { "@type": "ListItem", "position": 3, "name": "Builders Risk Insurance", "item": "https://casurance.net/builders-risk-insurance" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Builders Risk Insurance | Construction Coverage Up to $250M | Casurance</title>
        <meta name="description" content="Get builders risk insurance for ground-up construction and renovations. Primary coverage up to $25M TIV, excess capacity to $250M for larger projects. GL limits $1M/$2M. Hard-to-insure locations accepted." />
        <meta name="keywords" content="builders risk insurance, construction insurance, course of construction, building under construction, renovation insurance, contractor insurance, ground-up construction, hard to insure locations, wildfire construction insurance" />
        <link rel="canonical" href="https://casurance.net/builders-risk-insurance" />
        
        <meta property="og:title" content="Builders Risk Insurance | Construction Coverage Up to $250M | Casurance" />
        <meta property="og:description" content="Comprehensive builders risk insurance for ground-up construction and renovations. Primary coverage up to $25M TIV with excess capacity to $250M for larger projects. Available for hard-to-insure locations." />
        <meta property="og:url" content="https://casurance.net/builders-risk-insurance" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <LandingPageHeader />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${constructionImg1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#1e3a5f]/90 to-[#0a1628]/95"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6">
                <HardHat className="h-4 w-4" />
                Expanded Primary Solutions
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Builders Risk
                <span className="block text-white">Insurance</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                <strong>Bigger AND Better:</strong> Customized builders risk coverage for ground-up construction and renovations with <strong>higher limits</strong> and coverage for <strong>hard-to-insure locations</strong> prone to wildfires, severe weather, and extreme exposures.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <stat.icon className="h-6 w-6 text-primary mb-2" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a href="tel:13235463030" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                  <Phone className="h-5 w-5" />
                  Call 1-323-546-3030
                </a>
                <Link href="/quote/builders-risk">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-6 py-3 h-auto">
                    <FileText className="h-5 w-5 mr-2" />
                    Full Application
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Quote Form */}
            <div className="lg:sticky lg:top-24">
              <Card className="bg-white shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Get Your Free Quote
                  </CardTitle>
                  <p className="text-sm text-primary-foreground/80">
                    Quick response within 24 hours
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="businessName">Business / Project Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Your Company or Project Name"
                          required
                          data-testid="input-business-name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="Your Name"
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
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
                      
                      <div className="col-span-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@business.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">Project City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Los Angeles"
                          data-testid="input-city"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger data-testid="select-state">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="AR">Arkansas</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="CT">Connecticut</SelectItem>
                            <SelectItem value="DE">Delaware</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="IN">Indiana</SelectItem>
                            <SelectItem value="IA">Iowa</SelectItem>
                            <SelectItem value="KS">Kansas</SelectItem>
                            <SelectItem value="KY">Kentucky</SelectItem>
                            <SelectItem value="LA">Louisiana</SelectItem>
                            <SelectItem value="ME">Maine</SelectItem>
                            <SelectItem value="MD">Maryland</SelectItem>
                            <SelectItem value="MA">Massachusetts</SelectItem>
                            <SelectItem value="MI">Michigan</SelectItem>
                            <SelectItem value="MN">Minnesota</SelectItem>
                            <SelectItem value="MS">Mississippi</SelectItem>
                            <SelectItem value="MO">Missouri</SelectItem>
                            <SelectItem value="MT">Montana</SelectItem>
                            <SelectItem value="NE">Nebraska</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                            <SelectItem value="NH">New Hampshire</SelectItem>
                            <SelectItem value="NJ">New Jersey</SelectItem>
                            <SelectItem value="NM">New Mexico</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="NC">North Carolina</SelectItem>
                            <SelectItem value="ND">North Dakota</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="OK">Oklahoma</SelectItem>
                            <SelectItem value="OR">Oregon</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="RI">Rhode Island</SelectItem>
                            <SelectItem value="SC">South Carolina</SelectItem>
                            <SelectItem value="SD">South Dakota</SelectItem>
                            <SelectItem value="TN">Tennessee</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="UT">Utah</SelectItem>
                            <SelectItem value="VT">Vermont</SelectItem>
                            <SelectItem value="VA">Virginia</SelectItem>
                            <SelectItem value="WA">Washington</SelectItem>
                            <SelectItem value="WV">West Virginia</SelectItem>
                            <SelectItem value="WI">Wisconsin</SelectItem>
                            <SelectItem value="WY">Wyoming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                        >
                          <SelectTrigger data-testid="select-project-type">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="constructionType">Construction Type</Label>
                        <Select
                          value={formData.constructionType}
                          onValueChange={(value) => setFormData({ ...formData, constructionType: value })}
                        >
                          <SelectTrigger data-testid="select-construction-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {constructionTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="interestType">Your Interest</Label>
                        <Select
                          value={formData.interestType}
                          onValueChange={(value) => setFormData({ ...formData, interestType: value })}
                        >
                          <SelectTrigger data-testid="select-interest-type">
                            <SelectValue placeholder="Select interest" />
                          </SelectTrigger>
                          <SelectContent>
                            {interestTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="totalInsuredValue">Total Insured Value</Label>
                        <Select
                          value={formData.totalInsuredValue}
                          onValueChange={(value) => setFormData({ ...formData, totalInsuredValue: value })}
                        >
                          <SelectTrigger data-testid="select-tiv">
                            <SelectValue placeholder="Select TIV" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Under $500K">Under $500K</SelectItem>
                            <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                            <SelectItem value="$1M - $2M">$1M - $2M</SelectItem>
                            <SelectItem value="$2M - $3M">$2M - $3M</SelectItem>
                            <SelectItem value="$3M - $5M">$3M - $5M</SelectItem>
                            <SelectItem value="Over $5M">Over $5M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="policyTerm">Policy Term Needed</Label>
                        <Select
                          value={formData.policyTerm}
                          onValueChange={(value) => setFormData({ ...formData, policyTerm: value })}
                        >
                          <SelectTrigger data-testid="select-policy-term">
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            {policyTerms.map((term) => (
                              <SelectItem key={term} value={term}>{term}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="additionalInfo">Additional Project Details</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          placeholder="Describe your project, any special exposures (wildfire area, coastal, etc.), or specific coverage needs..."
                          className="min-h-[80px]"
                          data-testid="textarea-additional-info"
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={mutation.isPending}
                      data-testid="button-submit-quote"
                    >
                      {mutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          Get Free Quote
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to be contacted about your insurance needs.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Coverage Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Higher capacity for ground-up construction and renovations with flexible policy terms and coverage for challenging locations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  Ground-Up Construction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$3.5M TIV</strong> for frame construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$5M TIV</strong> for superior construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$2.5M limits</strong> on primary layers for projects of $10M or less</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>Prior starts</strong> considered for projects already underway</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Hammer className="h-6 w-6 text-primary" />
                  </div>
                  Renovation Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$3.5M TIV</strong> for renovation projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$3.5M limits</strong> for frame construction renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Up to <strong>$4M limits</strong> for Joisted Masonry or Masonry Non-Combustible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Option to cover <strong>building materials only</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Scale className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">GL Limits & Excess</h3>
                <p className="text-muted-foreground text-sm">
                  General liability limits up to <strong>$1M/$2M</strong> with excess builders risk capacity up to <strong>$250 Million</strong> for larger projects.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Flame className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Hard-to-Insure Locations</h3>
                <p className="text-muted-foreground text-sm">
                  Coverage for locations prone to <strong>wildfires, severe weather, hurricanes</strong>, and other extreme exposures.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Flexible Policy Terms</h3>
                <p className="text-muted-foreground text-sm">
                  <strong>3, 6, 8, 10, or 12-month</strong> policies available. Options for construction projects greater than one year.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Types Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Builders Risk Coverage Options</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive protection for your construction project from groundbreaking to completion.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageTypes.map((coverage, index) => (
              <Card 
                key={index} 
                className={coverage.highlight ? "border-2 border-primary/30 bg-primary/5" : ""}
              >
                <CardContent className="pt-6">
                  <coverage.icon className={`h-10 w-10 mb-4 ${coverage.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="font-semibold text-lg mb-2">{coverage.title}</h3>
                  <p className="text-muted-foreground text-sm">{coverage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Program Features</h2>
              <p className="text-muted-foreground mb-8">
                Our builders risk program offers comprehensive coverage written on Inland Marine forms, 
                with options for monoline property, monoline GL, or package policies.
              </p>
              
              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-900 flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  Projects Requiring Review
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>Construction already started (prior starts)</li>
                  <li>Project delayed or occupied before completion</li>
                  <li>Existing structural damage</li>
                  <li>Prior claims in past 3 years</li>
                  <li>Protection class 5 or higher</li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={constructionImg1} 
                alt="Commercial construction project with crane" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">47 States</p>
                    <p className="text-sm text-muted-foreground">Coverage Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Enhancements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Optional Enhancements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Customize your builders risk policy with additional coverages to meet your specific project needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Contractors Equipment Bundle", desc: "Equipment and miscellaneous tools coverage" },
              { icon: Package, title: "Installation Floater", desc: "Materials in transit and storage" },
              { icon: Wrench, title: "Equipment Rental Reimbursement", desc: "Coverage for rental equipment costs" },
              { icon: Clock, title: "Delay in Completion", desc: "Business income and rental value" },
              { icon: DollarSign, title: "Soft Costs", desc: "Extended overhead expenses" },
              { icon: Building2, title: "Existing Building Coverage", desc: "Protect the existing structure" },
              { icon: Ruler, title: "Ordinance or Law", desc: "Coverage A, B, and C available" },
              { icon: Shield, title: "Premises Liability", desc: "Including or excluding construction operations" },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about builders risk insurance coverage.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect Your Construction Project?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Get a customized builders risk quote today. Our experienced team specializes in construction insurance 
            and can help find the right coverage for your project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:13235463030" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              <Phone className="h-5 w-5" />
              Call 1-323-546-3030
            </a>
            <Link href="/quote/builders-risk">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 h-auto text-lg">
                <FileText className="h-5 w-5 mr-2" />
                Complete Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
}
