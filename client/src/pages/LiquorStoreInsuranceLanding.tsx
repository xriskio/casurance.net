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
  Wine,
  Store,
  Building2,
  Users,
  Car,
  FileText,
  AlertTriangle,
  Flame,
  Briefcase,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Home,
  Scale,
  HeartPulse,
  ShieldCheck,
  Package,
  Percent,
  Star,
  Umbrella
} from "lucide-react";

import liquorStoreImg1 from "@assets/stock_images/liquor_store_interio_cee056af.jpg";
import convenienceStoreImg1 from "@assets/stock_images/convenience_store_ex_9295097d.jpg";
import gasStationImg from "@assets/stock_images/modern_gas_station_w_61ad46d8.jpg";
import packageStoreImg from "@assets/stock_images/package_store_liquor_5111a83b.jpg";

const coverageTypes = [
  { 
    icon: Wine, 
    title: "Liquor Liability (Dram Shop)", 
    description: "Protects against claims from bodily injury or property damage caused by intoxicated patrons. Covers legal defense, settlements, and third-party medical bills.",
    highlight: true
  },
  { 
    icon: Shield, 
    title: "General Liability", 
    description: "Covers customer injuries like slip-and-falls and property damage on your premises. Essential for daily operations.",
    highlight: false
  },
  { 
    icon: Building2, 
    title: "Property Insurance", 
    description: "Covers your building, inventory, fixtures, and equipment from fire, theft, vandalism, and other covered perils.",
    highlight: false
  },
  { 
    icon: Users, 
    title: "Workers Compensation", 
    description: "Mandatory in California if you have employees. Covers work-related injuries and illnesses for your staff.",
    highlight: true
  },
  { 
    icon: Flame, 
    title: "Business Interruption", 
    description: "Covers lost income if your store closes due to a covered loss like fire or natural disaster.",
    highlight: false
  },
  { 
    icon: Car, 
    title: "Commercial Auto", 
    description: "Essential if you offer delivery services. Covers accidents, property damage, and liability while driving company vehicles.",
    highlight: false
  },
  { 
    icon: Scale, 
    title: "Excess Liability", 
    description: "Provides additional coverage above your primary policy limits for catastrophic claims.",
    highlight: false
  },
  { 
    icon: HeartPulse, 
    title: "Medical Payments", 
    description: "Pays medical expenses for customers injured on your premises regardless of fault.",
    highlight: false
  },
];

const citiesServed = [
  { name: "Los Angeles", state: "CA", population: "4M+", highlight: true },
  { name: "San Diego", state: "CA", population: "1.4M+" },
  { name: "San Jose", state: "CA", population: "1M+" },
  { name: "San Francisco", state: "CA", population: "870K+" },
  { name: "Fresno", state: "CA", population: "540K+" },
  { name: "Sacramento", state: "CA", population: "520K+", highlight: true },
  { name: "Las Vegas", state: "NV", population: "640K+" },
  { name: "Henderson", state: "NV", population: "320K+" },
  { name: "Reno", state: "NV", population: "270K+" },
  { name: "North Las Vegas", state: "NV", population: "260K+" },
];

const businessTypes = [
  "Liquor Store / Package Store",
  "Convenience Store with Liquor",
  "Gas Station with Liquor Sales",
  "C-Store (Convenience Store)",
  "Wine Shop",
  "Beer & Wine Store",
  "Grocery Store with Liquor",
  "24-Hour Store",
];

const legalEntityTypes = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "S-Corporation",
  "Other",
];

const buildingConstructionTypes = [
  "Frame",
  "Joisted Masonry",
  "Non-Combustible",
  "Masonry Non-Combustible",
  "Modified Fire Resistive",
  "Fire Resistive",
];

const roofTypes = [
  "Built-Up",
  "Composition Shingle",
  "Metal",
  "Tile",
  "Membrane/Rubber",
  "Wood Shake/Shingle",
  "Other",
];

const deductibleOptions = [
  "$500",
  "$1,000",
  "$2,500",
  "$5,000",
  "$10,000",
];

const liquorLiabilityLimits = [
  "$300,000/$600,000",
  "$500,000/$1,000,000",
  "$1,000,000/$2,000,000",
];

const stats = [
  { value: "Multi", label: "Location Coverage", icon: Building2 },
  { value: "A+", label: "Rated Carriers", icon: Shield },
  { value: "$10M", label: "Liquor Liability", icon: Scale },
  { value: "50 States", label: "Chain Store Coverage", icon: MapPin },
];

const faqs = [
  {
    question: "What is Liquor Liability Insurance (Dram Shop Coverage)?",
    answer: "Liquor Liability Insurance protects your liquor store against claims arising from selling alcohol to someone who later causes injury or property damage. California's Dram Shop laws can hold sellers liable for harm caused by intoxicated individuals, making this coverage essential."
  },
  {
    question: "Is Liquor Liability covered under General Liability?",
    answer: "No. Standard General Liability policies specifically exclude alcohol-related claims. You need a separate Liquor Liability policy to cover incidents related to alcohol sales, over-serving, or selling to minors."
  },
  {
    question: "What are California's Dram Shop laws?",
    answer: "California Business and Professions Code Section 25602 can hold liquor sellers liable if they sell alcohol to an obviously intoxicated person who then causes injury to others. Liquor Liability insurance protects against these claims."
  },
  {
    question: "Do I need Workers' Comp for my liquor store?",
    answer: "Yes, if you have employees in California, Workers' Compensation insurance is mandatory. It covers work-related injuries and illnesses your employees may sustain during employment."
  },
  {
    question: "What's included in a Business Owners Policy (BOP)?",
    answer: "A BOP bundles General Liability, Property Insurance, and Business Interruption coverage into one policy. For liquor stores, you'll still need separate Liquor Liability and Workers' Comp policies."
  },
  {
    question: "How much Liquor Liability coverage do I need?",
    answer: "Most liquor stores need at least $500,000 to $1,000,000 per occurrence. Your landlord, licensing requirements, or specific business needs may require higher limits. We can help determine the right coverage for your situation."
  },
];

const keyRisks = [
  "Over-serving alcohol to intoxicated patrons",
  "Selling to minors or without proper ID verification",
  "Patron injuries from drunk driving after leaving your store",
  "Third-party property damage caused by intoxicated customers",
  "Negligence claims related to alcohol distribution",
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
            <a href="tel:13235463030" className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-white px-4 py-2 rounded-lg transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">1-323-546-3030</span>
            </a>
          </nav>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-liquor"
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
              <a href="tel:13235463030" className="flex items-center gap-2 text-primary py-2">
                <Phone className="h-4 w-4" />
                <span>1-323-546-3030</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function LandingPageFooter() {
  return (
    <footer className="bg-[#0a1628] text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ letterSpacing: '0.1em' }}>CASURANCE</h3>
            <p className="text-white/70 text-sm">
              California's trusted commercial insurance agency specializing in liquor store and retail insurance.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Coverage Types</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Liquor Liability</li>
              <li>General Liability</li>
              <li>Property Insurance</li>
              <li>Workers Compensation</li>
              <li>Commercial Auto</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">States Served</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>California</li>
              <li>Nevada</li>
              <li>All 50 States</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1-323-546-3030
              </li>
              <li>info@casurance.net</li>
              <li>License #6005562</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Casurance Insurance Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
              Thank you, {contactName}! We've received your liquor store insurance quote request.
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
                    A licensed agent will review your request within 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    We'll contact you with competitive quotes from multiple carriers
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

export default function LiquorStoreInsuranceLanding() {
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
    businessType: "",
    annualRevenue: "",
    employeeCount: "",
    liquorLicenseType: "",
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
        insurance_type: "Liquor Store Insurance",
        message: `
Business Type: ${data.businessType}
City: ${data.city}, ${data.state}
Annual Revenue: ${data.annualRevenue}
Number of Employees: ${data.employeeCount}
Liquor License Type: ${data.liquorLicenseType}
Additional Info: ${data.additionalInfo}
        `.trim(),
      });
      return response;
    },
    onSuccess: (data: any) => {
      setConfirmationData({
        referenceNumber: data.referenceNumber || "RFQ-" + Date.now(),
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
    "name": "Liquor Store Insurance",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Casurance Insurance Agency",
      "telephone": "+1-323-546-3030",
      "url": "https://casurance.net"
    },
    "areaServed": [
      { "@type": "State", "name": "California" },
      { "@type": "State", "name": "Nevada" }
    ],
    "serviceType": [
      "Liquor Liability Insurance",
      "General Liability Insurance",
      "Property Insurance",
      "Workers Compensation Insurance",
      "Commercial Auto Insurance"
    ],
    "description": "Comprehensive liquor store insurance including Liquor Liability, General Liability, Property, Workers Comp, and Commercial Auto coverage for California and Nevada."
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
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://casurance.net/industries" },
      { "@type": "ListItem", "position": 3, "name": "Liquor Store Insurance", "item": "https://casurance.net/liquor-store-insurance" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Liquor Store Insurance California & Nevada | Casurance</title>
        <meta name="description" content="Get liquor store insurance in California and Nevada. Liquor Liability, General Liability, Property, Workers Comp coverage for liquor stores, convenience stores, and gas stations. Free quotes." />
        <meta name="keywords" content="liquor store insurance, liquor liability insurance, dram shop coverage, California liquor insurance, Nevada liquor store insurance, convenience store insurance, package store insurance, C-store insurance" />
        <link rel="canonical" href="https://casurance.net/liquor-store-insurance" />
        
        <meta property="og:title" content="Liquor Store Insurance California & Nevada | Casurance" />
        <meta property="og:description" content="Comprehensive liquor store insurance including Liquor Liability, General Liability, Property Insurance, and Workers Comp. Serving Los Angeles, San Diego, San Francisco, Las Vegas, and all CA/NV cities." />
        <meta property="og:url" content="https://casurance.net/liquor-store-insurance" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <LandingPageHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6">
                <Wine className="h-4 w-4" />
                California & Nevada Specialists
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Liquor Store Insurance
                <span className="block text-white">California & Nevada</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Protect your liquor store, convenience store, or gas station with comprehensive coverage including <strong>Liquor Liability</strong>, General Liability, Property Insurance, and Workers Compensation. <strong>We insure multiple locations and chain stores across multiple states.</strong>
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
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Your Liquor Store Name"
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
                        <Label htmlFor="city">City</Label>
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
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                        >
                          <SelectTrigger data-testid="select-business-type">
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="annualRevenue">Annual Revenue</Label>
                        <Select
                          value={formData.annualRevenue}
                          onValueChange={(value) => setFormData({ ...formData, annualRevenue: value })}
                        >
                          <SelectTrigger data-testid="select-revenue">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-250k">Under $250,000</SelectItem>
                            <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                            <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                            <SelectItem value="1m-2m">$1,000,000 - $2,000,000</SelectItem>
                            <SelectItem value="over-2m">Over $2,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="employeeCount">Employees</Label>
                        <Select
                          value={formData.employeeCount}
                          onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                        >
                          <SelectTrigger data-testid="select-employees">
                            <SelectValue placeholder="Select count" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">1-3</SelectItem>
                            <SelectItem value="4-10">4-10</SelectItem>
                            <SelectItem value="11-25">11-25</SelectItem>
                            <SelectItem value="26-50">26-50</SelectItem>
                            <SelectItem value="50+">50+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          placeholder="Tell us about your coverage needs, current policies, or any questions..."
                          rows={3}
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
                          Get My Free Quote
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to be contacted by a licensed agent. No spam, ever.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1}>
        {/* Why Liquor Liability Matters */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Liquor Liability Insurance is Essential
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                California's Dram Shop laws hold liquor sellers liable for harm caused by intoxicated customers. Standard General Liability policies exclude these risks.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Key Risks You Face
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {keyRisks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <X className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                      What Liquor Liability Covers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Legal defense costs for alcohol-related claims</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Settlements and judgments for bodily injury</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Third-party property damage claims</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Medical expenses for injured parties</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Protection against Dram Shop lawsuits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Business Types We Insure - Image Gallery */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Businesses We Insure
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From liquor stores to convenience stores, gas stations, and package stores - we provide specialized coverage for your retail operation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden rounded-xl">
                <img 
                  src={liquorStoreImg1} 
                  alt="Liquor store interior with wine and spirits" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">Liquor Stores</h3>
                  <p className="text-white/80 text-sm">Wine, spirits, and beer retailers</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl">
                <img 
                  src={packageStoreImg} 
                  alt="Package store liquor retail storefront" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">Package Stores</h3>
                  <p className="text-white/80 text-sm">Off-premise alcohol retailers</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl">
                <img 
                  src={convenienceStoreImg1} 
                  alt="Convenience store exterior" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">Convenience Stores</h3>
                  <p className="text-white/80 text-sm">C-stores with liquor sales</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl">
                <img 
                  src={gasStationImg} 
                  alt="Modern gas station with fuel pumps" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">Gas Stations</h3>
                  <p className="text-white/80 text-sm">Fuel stations with liquor licenses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Structure - Kinsale Program */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Liquor Store Insurance Program
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Access comprehensive coverage with General Liability up to $1M and Liquor Liability up to $10M with approval, plus specialized endorsements for liquor retailers.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Policy Structure */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Policy Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">General Liability up to $1M</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Liquor Liability up to $10M (with approval)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Multiple locations & chain stores</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Per location aggregate endorsement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Coverage in all 50 states</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* General Liability Features */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    General Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Commercial General Liability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Blanket additional insured</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Hired & non-owned auto</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Employee Benefits Liability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Stop Gap Liability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Additional Coverages */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Umbrella className="h-5 w-5 text-primary" />
                    Additional Coverages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Business Personal Property</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Building Coverage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Business Income & Extra Expense</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Equipment Breakdown</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Employee Dishonesty</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Types */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Complete Coverage for Liquor Stores
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From Liquor Liability to Workers Comp, we provide all the coverages your liquor store needs.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coverageTypes.map((coverage, index) => (
                <Card key={index} className={coverage.highlight ? "border-primary shadow-lg" : ""}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${coverage.highlight ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <coverage.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{coverage.title}</h3>
                    <p className="text-sm text-muted-foreground">{coverage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Served */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Serving California & Nevada
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Local expertise for liquor stores in major cities across California and Nevada.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {citiesServed.map((city, index) => (
                <Card key={index} className={city.highlight ? "border-primary" : ""}>
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold text-foreground">{city.name}</h3>
                    <p className="text-xs text-muted-foreground">{city.state}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground mt-8">
              Plus all other cities and counties in California and Nevada
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about liquor store insurance in California and Nevada
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm shrink-0">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-9">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Wine className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Liquor Store Insured Today
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Protect your business with comprehensive coverage from trusted carriers. Same-day quotes available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:13235463030" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                <Phone className="h-5 w-5" />
                Call 1-323-546-3030
              </a>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="button-scroll-to-form"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Get Free Quote
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Licensed in All 50 States</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>A+ Rated Carriers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Same-Day Quotes</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingPageFooter />
    </div>
  );
}
