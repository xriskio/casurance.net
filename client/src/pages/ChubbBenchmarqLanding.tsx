import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import chubbLogo from "@assets/Chubb-Logo_1765401512648.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Package, 
  Shield, 
  Building2, 
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Zap,
  Scale,
  Globe,
  FileText,
  DollarSign,
  Briefcase,
  TrendingUp,
  Factory,
  Store,
  Code,
  Utensils,
  GraduationCap,
  Palette,
  Home,
  Grape,
  Settings
} from "lucide-react";

const blanketTiers = [
  {
    tier: "$50,000",
    label: "Small Business",
    features: [
      "Accounts Receivable included",
      "Fine Arts coverage included",
      "Ocean Cargo $50K automatic",
      "Employee Theft $25K",
      "Debris Removal $25K",
      "Newly Acquired Buildings $500K"
    ]
  },
  {
    tier: "$100,000",
    label: "Growing Business",
    features: [
      "All Small Business features",
      "Any Other Location $25K",
      "Exhibition/Trade Show $15K",
      "Debris Removal $50K",
      "Loss Prevention $10K",
      "Newly Acquired Buildings $1M"
    ]
  },
  {
    tier: "$250,000",
    label: "Established Business",
    features: [
      "All Growing Business features",
      "Any Other Location $50K",
      "Exhibition/Trade Show $50K",
      "Debris Removal $100K",
      "Mobile Communications $15K",
      "Newly Acquired Buildings $2.5M"
    ]
  },
  {
    tier: "$500,000",
    label: "Large Business",
    features: [
      "All Established features",
      "Any Other Location $75K",
      "Exhibition/Trade Show $75K",
      "Debris Removal $500K",
      "Mobile Communications $25K",
      "Newly Acquired Buildings $5M"
    ]
  }
];

const propertyHighlights = [
  {
    title: "Automatic Blanket Limits",
    description: "Applies separately at each premises shown in declarations, starting at $50,000 with higher options available",
    standard: "Policy Level only"
  },
  {
    title: "Building Foundations",
    description: "Definition includes foundation or supports below the surface of the lowest floor or basement",
    standard: "Requires endorsement"
  },
  {
    title: "Mechanical Breakdown",
    description: "Provided at full policy limits - no sublimit",
    standard: "Requires endorsement"
  },
  {
    title: "Ordinance or Law",
    description: "Included in valuation with no sub-limit; also included in period of restoration for business income",
    standard: "Sub-limited, not included"
  },
  {
    title: "Utility Interruption",
    description: "No sub-limit due to direct damage from utility interruption",
    standard: "Sub-limited"
  },
  {
    title: "Total Loss Rebuild Time",
    description: "Two years from date of loss to decide to rebuild at existing or new location",
    standard: "180-day limitation"
  },
  {
    title: "Global Extension",
    description: "Extends domestic policy features and benefits to overseas locations",
    standard: "Not available"
  },
  {
    title: "Ocean Cargo",
    description: "Automatically includes endorsement for $50K limit of insurance",
    standard: "Varies by insurer"
  }
];

const liabilityHighlights = [
  {
    title: "Personal & Advertising Injury Limits",
    description: "Subject to a separate aggregate limit, not part of General Aggregate",
    standard: "Reduces General Aggregate"
  },
  {
    title: "Property Damage to Rented Premises",
    description: "Provided on an all-risk basis up to Each Occurrence Limit",
    standard: "Limited to fire with sublimit"
  },
  {
    title: "Non-Owned Watercraft",
    description: "No exclusion for non-owned watercraft less than 55 feet",
    standard: "Limited to under 26 feet"
  },
  {
    title: "Non-Owned Aircraft",
    description: "No exclusion when rented with paid, trained crew",
    standard: "Varies by insurer"
  },
  {
    title: "Automatic Additional Insureds",
    description: "Lessors, Vendors, Controlling Interests, Trade Show Lessors automatically included",
    standard: "Requires endorsement"
  },
  {
    title: "Existing & New Subsidiaries",
    description: "Automatically included through end of policy period, including partnerships and LLCs",
    standard: "Limited coverage"
  },
  {
    title: "Primary Non-Contributory",
    description: "Automatically included where required by contract",
    standard: "Endorsement available"
  },
  {
    title: "Product Withdrawal Expense",
    description: "Up to $50,000 for product withdrawal expenses due to defects",
    standard: "Varies by insurer"
  }
];

const eligibleIndustries = [
  { name: "Art Gallery", icon: Palette },
  { name: "Education", icon: GraduationCap },
  { name: "Food Manufacturing", icon: Utensils },
  { name: "Manufacturing", icon: Factory },
  { name: "Professional Services", icon: Briefcase },
  { name: "Real Estate", icon: Home },
  { name: "Retail", icon: Store },
  { name: "Technology", icon: Code },
  { name: "Wholesale", icon: Package },
  { name: "Wine Industry", icon: Grape }
];

const faqs = [
  {
    question: "What is Chubb Benchmarq Package?",
    answer: "Benchmarq Package is Chubb's industry-leading package product that sets a new benchmark for commercial package policies. It offers broader coverage than standard industry policies with automatic blanket limits, enhanced property coverage, and a comprehensive General Liability Enhancement Endorsement."
  },
  {
    question: "How does Benchmarq compare to standard package policies?",
    answer: "Benchmarq offers superior coverage including: automatic blanket limits at each premises, mechanical breakdown at policy limits (not sublimited), ordinance or law with no sublimits, global extension to overseas locations, and automatic additional insured endorsements that typically require separate endorsements with standard policies."
  },
  {
    question: "What are the automatic blanket limit options?",
    answer: "Benchmarq offers four tiers of automatic blanket limits: $50,000 for smaller businesses, $100,000 for growing businesses, $250,000 for established businesses, and $500,000 for larger accounts. Each tier includes progressively higher automatic limits for key coverages."
  },
  {
    question: "What industries are eligible for Benchmarq?",
    answer: "Benchmarq is available for a wide range of industries including Art Gallery, Education, Food Manufacturing, Manufacturing, Professional Services, Real Estate, Retail, Technology, Wholesale, and Wine industries. Contact us to verify your specific business class eligibility."
  },
  {
    question: "Does Benchmarq include Business Income coverage?",
    answer: "Yes, Benchmarq includes comprehensive Business Income coverage with Extra Expense included up to the full Business Income limit with no waiting period. Business Income can be provided on a valued limit or actual loss sustained basis depending on industry and account size."
  },
  {
    question: "What makes the liability coverage special?",
    answer: "Benchmarq includes a General Liability Enhancement Endorsement with features like blanket additional insureds, employees covered for incidental healthcare services, primary non-contributory coverage where required by contract, $50K product withdrawal expense, and $50K crisis assistance coverage - all automatic."
  }
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

export default function ChubbBenchmarqLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    industry: "",
    annualRevenue: "",
    propertyValue: "",
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        insurance_types: ["Chubb Benchmarq Package"],
        industry: data.industry,
        annual_revenue: data.annualRevenue,
        property_value: data.propertyValue,
        message: data.message,
        source: "chubb-benchmarq-landing"
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "A Casurance agent will contact you shortly about your Chubb Benchmarq Package quote."
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        industry: "",
        annualRevenue: "",
        propertyValue: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Chubb Benchmarq Package Insurance",
    "description": "Industry-leading commercial package insurance with superior property and liability coverage. Automatic blanket limits, enhanced coverages, and broader protection than standard policies.",
    "brand": {
      "@type": "Brand",
      "name": "Chubb"
    },
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Casurance",
      "telephone": "+1-888-254-0089",
      "url": "https://casurance.net"
    }
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

  return (
    <>
      <Helmet>
        <title>Chubb Benchmarq Package Insurance | Superior Commercial Coverage | Casurance</title>
        <meta name="description" content="Chubb Benchmarq Package sets a new industry benchmark for commercial package policies. Broader property and liability coverage with automatic blanket limits starting at $50,000. Get a quote today." />
        <meta name="keywords" content="Chubb Benchmarq, commercial package insurance, business insurance, property coverage, liability coverage, BOP alternative, Chubb insurance" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-benchmarq" />
        <meta property="og:title" content="Chubb Benchmarq Package Insurance | Casurance" />
        <meta property="og:description" content="Industry-leading package policy with superior coverage. Automatic blanket limits, enhanced property and liability protection." />
        <meta property="og:url" content="https://casurance.net/partners/chubb-benchmarq" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#003366] via-[#004488] to-[#0055aa] text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <img src={chubbLogo} alt="Chubb Insurance" className="h-12" />
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">The "Marq" of Excellence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Benchmarq Package
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Setting a new industry benchmark for package policies with superior property and liability coverage
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Broader Than Standard</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Automatic Blanket Limits</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Scalable Coverage</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90" asChild>
                  <a href="#quote-form">
                    Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="tel:1-888-254-0089">
                    <Phone className="mr-2 h-5 w-5" /> 1-888-254-0089
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Benchmarq?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unmatched scalability, superior insurance protection, and faster quote times
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Unmatched Scalability</h3>
                  <p className="text-sm text-muted-foreground">
                    From small businesses to large accounts, Benchmarq scales with your needs
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Superior Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Broader coverage than standard industry package policies
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Industry-Leading Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive policy structure with enhanced coverages built-in
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Fast & Easy</h3>
                  <p className="text-sm text-muted-foreground">
                    Faster quote times make it easier to do business
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Blanket Limit Tiers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Automatic Blanket Limit Options</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the tier that fits your business size and coverage needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blanketTiers.map((tier, index) => (
                <Card key={tier.tier} className={`relative overflow-hidden ${index === 2 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 2 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                      Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-primary">{tier.tier}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tier.label}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
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

        {/* Property Coverage Comparison */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Property Coverage Comparison</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how Benchmarq Property coverage exceeds standard industry policies
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {propertyHighlights.map((item, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-muted px-2 py-1 rounded">Standard:</span>
                          <span className="text-muted-foreground">{item.standard}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Liability Coverage Comparison */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">General Liability Enhancement</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A masterful blend of proprietary and ISO features with key coverages automatically included
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {liabilityHighlights.map((item, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-600/10 p-2 rounded-lg shrink-0">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-muted px-2 py-1 rounded">Standard:</span>
                          <span className="text-muted-foreground">{item.standard}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligible Industries */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligible Industries</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Benchmarq provides industry-specific protection across a wide range of business types
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {eligibleIndustries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <Card key={industry.name} className="text-center hover-elevate">
                    <CardContent className="pt-6">
                      <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                      <p className="text-sm font-medium">{industry.name}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote-form" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <img src={chubbLogo} alt="Chubb Insurance" className="h-10" />
                  </div>
                  <CardTitle className="text-2xl">Request a Benchmarq Quote</CardTitle>
                  <p className="text-muted-foreground">
                    Get superior commercial package coverage for your business
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          data-testid="input-business-name"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          data-testid="input-contact-name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          data-testid="input-email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          data-testid="input-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => setFormData({ ...formData, industry: value })}
                        >
                          <SelectTrigger data-testid="select-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {eligibleIndustries.map((ind) => (
                              <SelectItem key={ind.name} value={ind.name}>{ind.name}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other Industry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
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
                            <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                            <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                            <SelectItem value="$10M+">$10M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyValue">Total Property Value</Label>
                        <Select
                          value={formData.propertyValue}
                          onValueChange={(value) => setFormData({ ...formData, propertyValue: value })}
                        >
                          <SelectTrigger data-testid="select-property-value">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Under $100K">Under $100K</SelectItem>
                            <SelectItem value="$100K - $500K">$100K - $500K</SelectItem>
                            <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                            <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                            <SelectItem value="$5M+">$5M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        data-testid="input-message"
                        placeholder="Tell us about your business and coverage needs..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      data-testid="button-submit-quote"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? "Submitting..." : "Request Quote"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg px-6">
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

        {/* Other Chubb Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Explore More Chubb Products</h2>
              <p className="text-muted-foreground">Complete your business insurance portfolio</p>
            </div>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link href="/partners/chubb-bop">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Business Owner's Policy</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partners/chubb-workers-comp">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Workers' Comp</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partners/chubb-umbrella">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Commercial Umbrella</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partners/chubb-cyber">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Cyber Liability</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#003366] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Superior Coverage?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact Casurance today to learn how Chubb Benchmarq Package can provide better protection for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90" asChild>
                <a href="#quote-form">Get Your Quote</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="tel:1-888-254-0089">
                  <Phone className="mr-2 h-5 w-5" /> Call 1-888-254-0089
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
