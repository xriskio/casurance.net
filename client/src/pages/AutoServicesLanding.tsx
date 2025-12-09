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
  Building2,
  Car,
  Wrench,
  Home,
  FileText,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Scale,
  DollarSign,
  Users,
  Settings,
  Sparkles,
  Zap,
  BadgeCheck,
  Package,
  AlertTriangle
} from "lucide-react";

import autoShopImg from "@assets/stock_images/modern_auto_repair_s_15972b56.jpg";
import autoShopImg2 from "@assets/stock_images/modern_auto_repair_s_8327e52a.jpg";

const targetClasses = [
  { name: "Alarm Installation & Repairs", highlight: true },
  { name: "Automotive Glass Replacement & Tinting", highlight: true },
  { name: "Oil Changes & Lubrication (Quick Lube)", highlight: true },
  { name: "Body & Paint Shops", highlight: true },
  { name: "Construction & Farm Equipment Service", highlight: false },
  { name: "Dry-Docked Boat Services", highlight: false },
  { name: "Full-Service Car Wash & Detailing", highlight: true },
  { name: "Gas Stations with Repair Operations", highlight: true },
  { name: "General Automotive Repair & Service", highlight: true },
  { name: "Heavy Truck Service", highlight: false },
  { name: "Mobile Auto Detailing", highlight: true },
  { name: "Mobile Mechanic & Roadside Assistance", highlight: true },
  { name: "Valet Parking Operations", highlight: true },
  { name: "Light & Medium-Duty Auto Repair", highlight: true },
  { name: "Trailer Repair & Service", highlight: false },
  { name: "Auto Upholstery Shops", highlight: false },
  { name: "Tire Sales & Service", highlight: true },
  { name: "Auto Parts Stores", highlight: false },
];

const eligibleClasses = [
  "Auto Glass Repair",
  "Auto Parts Stores", 
  "Quick Lube Shops",
  "Car Washes",
  "Auto Body Shops",
  "Light-Duty Auto Repair and Service Shops",
  "Medium-Duty Auto Repair and Service Shops",
  "Trailer Repair and Service Shops",
  "Auto Upholstery Shops",
  "New Tire Sales and Tire Service Shops",
];

const excludedOperations = [
  "Antique Auto Restoration",
  "Boat Repair",
  "Offroad Vehicle Repair",
  "Mobile Equipment Repair",
  "Motorcycle Repair",
];

const ineligibleOperations = [
  "Auto Dealers",
  "Dismantlers",
  "Manufacturers",
  "Renters & Leasers",
  "Custom Fabrication",
  "Fuel Conversion",
  "Gas Stations (without repair)",
  "Valet (standalone)",
  "Towing",
];

const businessTypes = [
  "General Automotive Repair",
  "Auto Body & Paint Shop",
  "Quick Lube / Oil Change",
  "Tire Shop & Service",
  "Auto Glass Replacement",
  "Car Wash & Detailing",
  "Heavy Truck Service",
  "Mobile Mechanic",
  "Valet Parking",
  "Gas Station with Repair",
  "Construction Equipment Service",
  "Other Auto Service",
];

const stats = [
  { value: "$5M", label: "Max Building TIV", icon: Building2 },
  { value: "USA", label: "Nationwide", icon: MapPin },
  { value: "$1,500", label: "Min Premium", icon: DollarSign },
  { value: "$5M", label: "Excess Available", icon: Scale },
];

const coverageHighlights = [
  { 
    icon: Shield, 
    title: "Full Garage Liability", 
    description: "Occurrence basis coverage for non-dealer service & repair operations with up to $5M excess available.",
    highlight: true
  },
  { 
    icon: Car, 
    title: "Garagekeepers Coverage", 
    description: "Up to $300K per location, $100K per vehicle protection for customer vehicles in your care.",
    highlight: true
  },
  { 
    icon: Users, 
    title: "General Liability", 
    description: "Premises & Operations up to $2M aggregate, Products & Completed Operations up to $2M.",
    highlight: false
  },
  { 
    icon: Building2, 
    title: "Property Coverage", 
    description: "Building coverage up to $5M TIV per location, plus BPP, Business Income, and Tenant Improvements.",
    highlight: false
  },
  { 
    icon: Scale, 
    title: "Limited Non-Owned Auto", 
    description: "$1M coverage specific to on-premises exposure for customer autos only.",
    highlight: false
  },
  { 
    icon: Zap, 
    title: "Stop Gap Liability", 
    description: "$1M coverage available in ND, OH, WA, and WY monopolistic states.",
    highlight: false
  },
];

const faqs = [
  {
    question: "What is Non-Dealer Garage Liability insurance?",
    answer: "Non-Dealer Garage Liability is specialized coverage for automotive service and repair businesses that don't sell vehicles. It combines general liability with garagekeepers coverage to protect your operations and customer vehicles in your care, custody, or control."
  },
  {
    question: "What is Garagekeepers Legal Liability?",
    answer: "Garagekeepers coverage protects customer vehicles while they're in your care for service, repair, or storage. Our program offers up to $300K per location and $100K per vehicle, with separate deductibles for Covered Autos, Other Than Covered Autos, and Garagekeepers."
  },
  {
    question: "What businesses are NOT eligible for this program?",
    answer: "Auto dealers, manufacturers, dismantlers, renters/leasers, custom fabrication shops, fuel conversion operations, standalone towing companies, and standalone gas stations without repair operations are not eligible. This program is specifically for service and repair operations."
  },
  {
    question: "What states is this coverage available in?",
    answer: "Coverage is available nationwide. Contact us to discuss coverage in your state."
  },
  {
    question: "What are the minimum premium and deductible requirements?",
    answer: "The minimum premium is $1,500. Deductibles start at $500, with separate deductibles for Covered Autos, Other Than Covered Autos, and Garagekeepers claims."
  },
  {
    question: "Is Hired Auto coverage included?",
    answer: "No, Hired Auto coverage is not available with this program. However, Limited Non-Owned Auto coverage is included for on-premises exposure for customer autos only at $1M."
  },
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
              <Link href="/coverage/general-liability"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">General Liability</span></Link>
              <Link href="/industry/garage-service-centers"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Garage & Service Centers</span></Link>
              <Link href="/coverage/commercial-property"><span className="text-white/60 hover:text-white transition-colors block cursor-pointer">Commercial Property</span></Link>
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
              Thank you, {contactName}! Your auto services insurance quote request has been received.
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
                    Our team will review your business details within 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    We'll contact you with competitive garage liability and garagekeepers quotes
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

export default function AutoServicesLanding() {
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
    yearsInBusiness: "",
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
        insurance_type: "Auto Services - Garagekeepers",
        message: `
Business Type: ${data.businessType}
City: ${data.city}, ${data.state}
Annual Revenue: ${data.annualRevenue}
Number of Employees: ${data.employeeCount}
Years in Business: ${data.yearsInBusiness}
Additional Info: ${data.additionalInfo}
        `.trim(),
      });
      return response;
    },
    onSuccess: (data: any) => {
      setConfirmationData({
        referenceNumber: data.referenceNumber || "AS-" + Date.now(),
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
    "name": "Auto Services Insurance with Garagekeepers",
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
      "Garage Liability Insurance",
      "Garagekeepers Legal Liability",
      "General Liability Insurance",
      "Property Insurance",
      "Commercial Auto Insurance"
    ],
    "description": "Full garage liability and garagekeepers coverage for auto repair shops, body shops, oil change centers, and automotive service businesses. Tech-enabled underwriting nationwide."
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
      { "@type": "ListItem", "position": 3, "name": "Auto Services Insurance", "item": "https://casurance.net/auto-services-insurance" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Auto Services Insurance with Garagekeepers | Non-Dealer Garage Liability | Casurance</title>
        <meta name="description" content="Full garage liability and garagekeepers coverage for auto repair shops, body shops, oil change centers, and automotive service businesses. Tech-enabled underwriting. Min premium $1,500. Nationwide coverage." />
        <meta name="keywords" content="garage liability insurance, garagekeepers coverage, auto repair shop insurance, body shop insurance, oil change insurance, car wash insurance, non-dealer garage, automotive service insurance" />
        <link rel="canonical" href="https://casurance.net/auto-services-insurance" />
        
        <meta property="og:title" content="Auto Services Insurance with Garagekeepers | Non-Dealer Garage Liability | Casurance" />
        <meta property="og:description" content="Full garage liability and garagekeepers coverage for auto repair shops, body shops, and automotive service businesses. Tech-enabled underwriting. Nationwide coverage." />
        <meta property="og:url" content="https://casurance.net/auto-services-insurance" />
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
                <Wrench className="h-4 w-4" />
                Non-Dealer Garage Liability
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Auto Services Insurance
                <span className="block text-white">with Garagekeepers</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                <strong>Tech-enabled coverage</strong> for repair shops, service centers, and automotive businesses nationwide. Full Garage Liability with <strong>Garagekeepers up to $300K/location</strong>. Streamlined underwriting removes E&S friction.
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
                <Link href="/quote/garage-service-centers">
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
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Your Shop or Business Name"
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
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="AR">Arkansas</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="CT">Connecticut</SelectItem>
                            <SelectItem value="DE">Delaware</SelectItem>
                            <SelectItem value="DC">Washington D.C.</SelectItem>
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
                        <Label htmlFor="businessType">Type of Business</Label>
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
                            <SelectItem value="Under $500K">Under $500K</SelectItem>
                            <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                            <SelectItem value="$1M - $3M">$1M - $3M</SelectItem>
                            <SelectItem value="$3M - $5M">$3M - $5M</SelectItem>
                            <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                            <SelectItem value="$10M - $15M">$10M - $15M</SelectItem>
                            <SelectItem value="Over $15M">Over $15M</SelectItem>
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
                            <SelectItem value="1-5">1-5</SelectItem>
                            <SelectItem value="6-10">6-10</SelectItem>
                            <SelectItem value="11-25">11-25</SelectItem>
                            <SelectItem value="26-50">26-50</SelectItem>
                            <SelectItem value="51-100">51-100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="additionalInfo">Additional Details</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          placeholder="Describe your services, number of bays, customer vehicle volume..."
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

      {/* Coverage Highlights Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coverage Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full Garage Liability for non-dealer service and repair operations with Garagekeepers coverage and up to $5M excess available.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageHighlights.map((coverage, index) => (
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

      {/* GL & Property Limits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  General Liability Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Premises & Operations: <strong>$1M or $2M Aggregate</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Products & Completed Operations: <strong>$1M or $2M Aggregate</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Personal and Advertising Injury: <strong>$1M Occurrence</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Medical Payments: <strong>$5,000</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Fire Damage to Premises Rented: <strong>$100K to $1M</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Stop Gap (ND, OH, WA, WY): <strong>$1M</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Limited Non-Owned Auto (on-premises only): <strong>$1M</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  Property Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Building: <strong>Max TIV $5M per location</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Business Personal Property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Business Income with Extra Expense</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Tenant Improvements</span>
                  </li>
                  <li className="mt-4 pt-4 border-t">
                    <p className="font-semibold mb-2">Property Extensions Include:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Accounts Receivable", "Back-up Sewage", "Door Damage", "Employee Dishonesty", "Money & Securities", "Outdoor Property"].map((ext) => (
                        <span key={ext} className="bg-muted px-2 py-1 rounded text-xs">{ext}</span>
                      ))}
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Classes Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Target Classes</h2>
              <p className="text-muted-foreground mb-8">
                Our non-dealer garage liability program is designed specifically for these automotive service operations.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {targetClasses.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 p-2 rounded ${item.highlight ? "bg-primary/10" : ""}`}
                  >
                    <CheckCircle2 className={`h-4 w-4 shrink-0 ${item.highlight ? "text-primary" : "text-green-600"}`} />
                    <span className={`text-sm ${item.highlight ? "font-medium" : ""}`}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="h-5 w-5" />
                    Excluded Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-800 mb-3">These operations are not covered under this program:</p>
                  <div className="flex flex-wrap gap-2">
                    {excludedOperations.map((op) => (
                      <span key={op} className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">{op}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-900">
                    <X className="h-5 w-5" />
                    Ineligible Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800 mb-3">These businesses are not eligible for this program:</p>
                  <div className="flex flex-wrap gap-2">
                    {ineligibleOperations.map((op) => (
                      <span key={op} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">{op}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="relative">
                <img 
                  src={autoShopImg} 
                  alt="Modern auto repair shop" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Endorsements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Customize your policy with these endorsements at no additional premium.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BadgeCheck, title: "Blanket Additional Insureds", desc: "Available at $0 premium" },
              { icon: Users, title: "Scheduled Additional Insureds", desc: "Available at $0 premium" },
              { icon: Shield, title: "Primary & Noncontributory", desc: "Available at $0 premium" },
              { icon: Scale, title: "Waiver of Subrogation", desc: "Available at $0 premium" },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-green-600 font-medium">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 bg-muted/50 rounded-lg p-4">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Maximum Exposures</p>
                <p className="font-bold">Up to $15M in sales, $3M in payroll</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Minimum Premium</p>
                <p className="font-bold">$1,500</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Deductibles Starting</p>
                <p className="font-bold">$500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about auto services and garagekeepers coverage.
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect Your Auto Service Business?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Get a customized garage liability quote with garagekeepers coverage today. Our streamlined 
            underwriting means faster quotes and reliable protection.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:13235463030" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              <Phone className="h-5 w-5" />
              Call 1-323-546-3030
            </a>
            <Link href="/quote/garage-service-centers">
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
