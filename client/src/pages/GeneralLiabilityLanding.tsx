import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { SERVICE_STATES } from "@shared/constants/states";
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Award,
  BadgeCheck,
  Zap,
  Lock,
  Mail,
  Percent,
  Building2,
  HardHat,
  Store,
  Factory,
  DollarSign,
  Users,
  Star,
  Sparkles,
  Home,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  Wrench,
  FileCheck,
  Briefcase,
  ClipboardCheck
} from "lucide-react";

import constructionImage from "@assets/90941868-99d1-4f1f-a25c-48356e1bcdb4_1765780898435.png";

const carrierPartners = [
  { name: "Chubb", rating: "A++", description: "World's Largest P&C Insurer" },
  { name: "CNA Insurance", rating: "A", description: "Fortune 500 Leader" },
  { name: "Guard Insurance", rating: "A+", description: "Berkshire Hathaway Company" },
  { name: "AmTrust", rating: "A-", description: "Business Insurance Specialists" },
  { name: "Markel", rating: "A", description: "Specialty Insurance Solutions" },
  { name: "Great American", rating: "A+", description: "Over 150 Years Strong" },
];

const coverageHighlights = [
  { icon: HardHat, title: "Roofing Coverage", benefit: "Full Limits" },
  { icon: Shield, title: "Defense Outside Limits", benefit: "Available" },
  { icon: FileCheck, title: "Waiver of Subrogation", benefit: "Included" },
  { icon: Star, title: "A-Rated Carriers", benefit: "All Partners" },
  { icon: Wrench, title: "Prior Work Exclusion", benefit: "Removal Available" },
  { icon: ClipboardCheck, title: "ISO Forms", benefit: "CG 20 10 & 20 37" },
];

const contractorClasses = [
  "General Contractor",
  "Roofing Contractors",
  "Electrical Contractors",
  "Plumbing Contractors",
  "HVAC Installation",
  "Concrete Work",
  "Drywall Installation",
  "Painting Contractors",
  "Flooring Installation",
  "Landscaping",
  "Framing",
  "Masonry",
  "Solar Installation",
  "Remodeling",
  "Demolition",
  "Waterproofing",
];

const targetBusinesses = [
  { icon: HardHat, name: "Construction", description: "All contractor types, from GC to specialty trades", highlight: true },
  { icon: Store, name: "Retail & Service", description: "Shops, restaurants, professional services" },
  { icon: Factory, name: "Manufacturing", description: "Factories, warehouses, production facilities", highlight: true },
  { icon: Building2, name: "Real Estate", description: "Property management, building owners" },
  { icon: Briefcase, name: "Professional Services", description: "Consultants, tech companies, offices" },
  { icon: Users, name: "Small Business", description: "New ventures, startups, growing businesses" },
];

const stats = [
  { value: "$1M", label: "Per Occurrence", icon: Shield },
  { value: "$2M", label: "Aggregate Limits", icon: DollarSign },
  { value: "40+", label: "Contractor Classes", icon: HardHat },
  { value: "24hr", label: "Quote Turnaround", icon: Clock },
];

const faqs = [
  {
    question: "What is general liability insurance?",
    answer: "General liability insurance protects businesses from claims of bodily injury, property damage, and personal injury to third parties. It's essential for contractors, business owners, and service providers."
  },
  {
    question: "What limits are available?",
    answer: "We offer up to $1 million per occurrence, $2 million general aggregate, with excess capacity up to $5 million for qualified risks."
  },
  {
    question: "Do you cover roofing contractors?",
    answer: "Yes! We specialize in roofing coverage with Roofing Operations Warranty, removal of prior work exclusion, and full limits EIFS coverage."
  },
  {
    question: "Do you accept new businesses?",
    answer: "Yes, we accept new ventures and contractors who have had a lapse in coverage. Our underwriters work with businesses at all stages."
  },
];

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
              <span className="text-[10px] text-white/70 tracking-[0.2em] uppercase group-hover:text-white/90 transition-colors">
                Insurance Agency Services
              </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </span>
            </Link>
            <Link href="/quote">
              <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
                All Quote Forms
              </span>
            </Link>
            <Link href="/coverages">
              <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
                Coverages
              </span>
            </Link>
            <Link href="/industries">
              <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
                Industries
              </span>
            </Link>
            <a href="tel:18882540089" className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-white px-4 py-2 rounded-lg transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">1-888-254-0089</span>
            </a>
          </nav>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-white hover:text-primary py-2 flex items-center gap-2 cursor-pointer font-medium">
                  <Home className="h-4 w-4" />
                  Back to Main Site
                </span>
              </Link>
              <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-white/80 hover:text-white py-2 cursor-pointer">All Quote Forms</span>
              </Link>
              <Link href="/coverages" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-white/80 hover:text-white py-2 cursor-pointer">Coverages</span>
              </Link>
              <Link href="/industries" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-white/80 hover:text-white py-2 cursor-pointer">Industries</span>
              </Link>
              <a href="tel:18882540089" className="flex items-center gap-2 text-primary py-2">
                <Phone className="h-4 w-4" />
                <span>1-888-254-0089</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

interface ConfirmationProps {
  referenceNumber: string;
  contactName: string;
  email: string;
}

function QuoteConfirmation({ referenceNumber, contactName, email }: ConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1c33] to-[#0a1628]">
      <LandingPageHeader />
      
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Card className="bg-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Quote Request Received!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you, {contactName}! We've received your general liability insurance quote request.
            </p>
            
            <div className="bg-primary/5 border-2 border-primary rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Your Reference Number</p>
              <p className="text-3xl font-bold text-primary tracking-wider">{referenceNumber}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>A confirmation email has been sent to <strong className="text-foreground">{email}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Our team is reviewing your request and gathering quotes from our A-rated carriers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Expect to hear from us within 24-48 business hours</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Main Site
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
            </div>
            
            <p className="text-xs text-muted-foreground mt-8">
              Questions? Call us at 1-888-254-0089 or email info@casurance.net
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GeneralLiabilityLanding() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentCarrierIndex, setCurrentCarrierIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<ConfirmationProps | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    effectiveDate: "",
    businessType: "",
    employees: "",
    message: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarrierIndex((prev) => (prev + 1) % carrierPartners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        state: data.state,
        effective_date: data.effectiveDate,
        insurance_type: `General Liability - ${data.businessType || 'General'} - ${data.employees || 'Not specified'} employees`,
        message: data.message
      });
    },
    onSuccess: (data: any) => {
      setConfirmationData({
        referenceNumber: data.referenceNumber || 'QQT-PENDING',
        contactName: formData.contactName,
        email: formData.email
      });
      setShowConfirmation(true);
      window.scrollTo(0, 0);
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an error. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.email || !formData.state) {
      toast({
        title: "Please fill all required fields",
        description: "All fields are required to submit a quote request.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  if (showConfirmation && confirmationData) {
    return <QuoteConfirmation {...confirmationData} />;
  }

  return (
    <>
      <LandingPageHeader />
      <Helmet>
        <title>General Liability Insurance | Contractor & Business Coverage | Casurance</title>
        <meta name="title" content="General Liability Insurance | Contractor & Business Coverage | Casurance" />
        <meta name="description" content="Get general liability insurance for contractors and businesses. 40+ contractor classes covered. Up to $1M per occurrence, A-rated carriers only. Fast quotes, competitive rates." />
        <meta name="keywords" content="general liability insurance, contractor insurance, CGL insurance, commercial general liability, business liability insurance, contractor liability coverage" />
        <link rel="canonical" href="https://casurance.net/lp/general-liability" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.net/lp/general-liability" />
        <meta property="og:title" content="General Liability Insurance | Contractor & Business Coverage" />
        <meta property="og:description" content="Get general liability insurance for contractors and businesses. 40+ contractor classes, A-rated carriers, competitive rates." />
        <meta property="og:site_name" content="Casurance Insurance Agency" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="General Liability Insurance | Casurance" />
        <meta property="twitter:description" content="General liability insurance for contractors and businesses. 40+ classes covered, A-rated carriers." />

        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "General Liability Insurance",
            "description": "General liability insurance for contractors and businesses with coverage for 40+ contractor classes from A-rated carriers.",
            "provider": {
              "@type": "InsuranceAgency",
              "name": "Casurance Insurance Agency",
              "telephone": "+1-888-254-0089",
              "email": "info@casurance.net",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "714 W Olympic Blvd Suite 906",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90015",
                "addressCountry": "US"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "serviceType": "General Liability Insurance"
          })}
        </script>
      </Helmet>

      <main id="main-content" tabIndex={-1} className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1c33] to-[#0a1628] overflow-hidden" id="top">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/30 to-blue-500/20 backdrop-blur-sm border border-primary/40 rounded-full px-6 py-3 mb-6 animate-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold text-primary">Get Covered Today - Up to $1M Per Occurrence!</span>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" data-testid="text-hero-headline">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                      General Liability
                    </span>{" "}
                    Insurance for{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                      Contractors & Businesses
                    </span>
                  </h1>
                  
                  <p className="text-xl text-white/80 mb-6 leading-relaxed" data-testid="text-hero-description">
                    Protect your business from third-party claims with coverage from <strong className="text-white">A-rated carriers</strong>. 
                    40+ contractor classes covered including roofing.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                      >
                        <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Coverage Highlights:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {coverageHighlights.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20"
                        >
                          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-white">{item.title}</div>
                            <div className="text-xs text-primary">{item.benefit}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center pt-4">
                  <a href="tel:18882540089" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 hover:bg-white/20 transition-all">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold text-white">1-888-254-0089</span>
                  </a>
                  <span className="text-white/60 text-sm">Speak with a GL specialist</span>
                </div>
              </div>

              <div className="lg:pl-4">
                <Card className="bg-white shadow-2xl border-0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-3">
                        <Zap className="h-4 w-4" />
                        Free Instant Quote
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">Get Your GL Quote Now</h2>
                      <p className="text-sm text-muted-foreground mt-1">Most quotes in 24-48 hours</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName" className="text-sm font-medium">Business Name *</Label>
                          <Input
                            id="businessName"
                            placeholder="ABC Contractors LLC"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            className="mt-1"
                            data-testid="input-business-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactName" className="text-sm font-medium">Contact Name *</Label>
                          <Input
                            id="contactName"
                            placeholder="John Smith"
                            value={formData.contactName}
                            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                            className="mt-1"
                            data-testid="input-contact-name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium">Phone *</Label>
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
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="mt-1"
                            data-testid="input-email"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
                        <Input
                          id="address"
                          placeholder="123 Main St, City, ZIP"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="mt-1"
                          data-testid="input-address"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                          <SelectTrigger className="mt-1" data-testid="select-state">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map(state => (
                              <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessType" className="text-sm font-medium">Business Type</Label>
                          <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                            <SelectTrigger className="mt-1" data-testid="select-business-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="General Contractor">General Contractor</SelectItem>
                              <SelectItem value="Roofing">Roofing</SelectItem>
                              <SelectItem value="Electrical">Electrical</SelectItem>
                              <SelectItem value="Plumbing">Plumbing</SelectItem>
                              <SelectItem value="HVAC">HVAC</SelectItem>
                              <SelectItem value="Concrete">Concrete</SelectItem>
                              <SelectItem value="Drywall">Drywall</SelectItem>
                              <SelectItem value="Painting">Painting</SelectItem>
                              <SelectItem value="Flooring">Flooring</SelectItem>
                              <SelectItem value="Landscaping">Landscaping</SelectItem>
                              <SelectItem value="Solar">Solar</SelectItem>
                              <SelectItem value="Remodeling">Remodeling</SelectItem>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Restaurant">Restaurant</SelectItem>
                              <SelectItem value="Professional Services">Professional Services</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="employees" className="text-sm font-medium">Number of Employees</Label>
                          <Select value={formData.employees} onValueChange={(value) => setFormData({...formData, employees: value})}>
                            <SelectTrigger className="mt-1" data-testid="select-employees">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5</SelectItem>
                              <SelectItem value="6-10">6-10</SelectItem>
                              <SelectItem value="11-25">11-25</SelectItem>
                              <SelectItem value="26-50">26-50</SelectItem>
                              <SelectItem value="51-100">51-100</SelectItem>
                              <SelectItem value="100+">100+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="effectiveDate" className="text-sm font-medium">Desired Effective Date</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                          className="mt-1"
                          data-testid="input-effective-date"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-medium">Additional Comments</Label>
                        <Textarea
                          id="message"
                          placeholder="Any additional information about your business or coverage needs..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="mt-1"
                          rows={3}
                          data-testid="input-message"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full text-lg py-6"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? (
                          "Submitting..."
                        ) : (
                          <>
                            Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
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
                  </CardContent>
                </Card>

                <div className="mt-6 text-center">
                  <p className="text-white/60 text-sm mb-3">Trusted by contractors nationwide</p>
                  <div className="flex items-center justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-white/80 text-sm ml-2">4.9/5 from 500+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contractor Classes Section */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-classes-title">
                40+ Contractor Classes Covered
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From general contractors to specialty trades, we provide comprehensive coverage for virtually every type of contracting operation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {contractorClasses.map((cls, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 text-sm border"
                  data-testid={`text-class-${index}`}
                >
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="truncate">{cls}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Don't see your class? Contact us - we likely have coverage available.</p>
              <a href="tel:18882540089">
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call 1-888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Target Business Classes Section - Colorful Cards */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Target Business Classes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored solutions for businesses of all sizes and across various industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Small Business</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Tailored coverage for small contractors and service businesses</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Affordable premiums</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Quick quote turnaround</span>
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
                    <Building2 className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Mid-Market</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Comprehensive solutions for growing construction operations</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Higher limits available</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-location coverage</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Dedicated account management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                  <div className="flex items-center gap-3">
                    <Store className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Additional Industries</h3>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
                  <p className="text-muted-foreground mb-4">Coverage extends beyond construction to diverse business types</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Retail operations</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Professional services</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Manufacturing facilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Features & Limits Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Policy Features & Limits
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our comprehensive general liability policies provide robust protection with competitive limits and essential endorsements.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Per Occurrence</p>
                      <p className="text-2xl font-bold text-primary">Up to $1M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">General Aggregate</p>
                      <p className="text-2xl font-bold text-primary">Up to $2M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Products/Completed Operations</p>
                      <p className="text-2xl font-bold text-primary">Up to $2M</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Excess Capacity</p>
                      <p className="text-2xl font-bold text-primary">Up to $5M</p>
                    </CardContent>
                  </Card>
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Included in Every Policy</h3>
                  </div>
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
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
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
              Ready to Protect Your Business?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get your free general liability quote today. Our team of experts is ready to help you find the coverage you need.
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
