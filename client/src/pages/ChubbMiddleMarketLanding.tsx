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
  Building2, 
  Shield, 
  Factory, 
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Globe,
  FileText,
  Briefcase,
  TrendingUp,
  Users,
  Umbrella,
  Lock,
  Truck,
  Ship,
  Plane,
  HardHat,
  Zap,
  Flame,
  Droplets,
  Car,
  Scale
} from "lucide-react";
import { SERVICE_STATES } from "@shared/constants/states";

const productLines = [
  {
    title: "Commercial Property",
    icon: Building2,
    description: "Comprehensive property protection for buildings, equipment, inventory, and business personal property.",
    features: ["Equipment Breakdown", "Business Income", "Extra Expense", "Ordinance or Law"]
  },
  {
    title: "General Liability",
    icon: Shield,
    description: "Third-party liability coverage for bodily injury, property damage, and advertising injury.",
    features: ["Products/Completed Operations", "Personal & Advertising Injury", "Medical Payments"]
  },
  {
    title: "Workers' Compensation",
    icon: Users,
    description: "Employee injury and illness coverage with dedicated claims management and return-to-work programs.",
    features: ["Medical Benefits", "Lost Wages", "Rehabilitation", "Employers Liability"]
  },
  {
    title: "Commercial Auto",
    icon: Car,
    description: "Fleet and commercial vehicle coverage for owned, hired, and non-owned autos.",
    features: ["Liability", "Physical Damage", "Uninsured Motorist", "Hired Auto"]
  },
  {
    title: "Commercial Umbrella",
    icon: Umbrella,
    description: "Excess liability protection above primary policies with broad coverage territory.",
    features: ["Excess Limits", "Drop-Down Coverage", "Defense Costs", "Worldwide Territory"]
  },
  {
    title: "D&O / Management Liability",
    icon: Briefcase,
    description: "Directors and Officers liability, Employment Practices, and Fiduciary coverage for management exposures.",
    features: ["D&O Liability", "EPL Coverage", "Fiduciary Liability", "Crime Coverage"]
  },
  {
    title: "Professional Liability / E&O",
    icon: FileText,
    description: "Errors & Omissions coverage for professional services and advice.",
    features: ["Professional Services", "Negligent Acts", "Defense Costs", "Regulatory Coverage"]
  },
  {
    title: "Cyber Liability",
    icon: Lock,
    description: "Data breach, cyber extortion, and business interruption coverage for digital risks.",
    features: ["Data Breach Response", "Cyber Extortion", "Business Interruption", "Regulatory Defense"]
  },
  {
    title: "Marine & Cargo",
    icon: Ship,
    description: "Ocean cargo, inland marine, and transportation coverage for goods in transit.",
    features: ["Ocean Cargo", "Inland Marine", "Stock Throughput", "Warehouse Coverage"]
  },
  {
    title: "Environmental",
    icon: Droplets,
    description: "Pollution liability and environmental impairment coverage for contamination risks.",
    features: ["Pollution Liability", "Cleanup Costs", "Third-Party Claims", "Regulatory Defense"]
  }
];

const targetIndustries = [
  {
    category: "Manufacturing & Industrial",
    industries: [
      "Aerospace & Defense",
      "Automotive Parts & Components",
      "Chemical Manufacturing",
      "Electronics Manufacturing",
      "Food & Beverage Processing",
      "Industrial Machinery",
      "Metal Fabrication",
      "Plastics & Rubber Products",
      "Textile Manufacturing"
    ]
  },
  {
    category: "Technology & Life Sciences",
    industries: [
      "Software Development",
      "IT Services & Consulting",
      "Biotechnology",
      "Medical Devices",
      "Pharmaceutical Distribution",
      "Healthcare Technology",
      "Data Centers"
    ]
  },
  {
    category: "Real Estate & Construction",
    industries: [
      "Commercial Real Estate",
      "Property Management",
      "General Contractors",
      "Specialty Trade Contractors",
      "Engineering Services",
      "Architecture Firms"
    ]
  },
  {
    category: "Financial & Professional Services",
    industries: [
      "Accounting Firms",
      "Law Firms",
      "Investment Advisors",
      "Insurance Agencies",
      "Consulting Services",
      "Staffing Agencies"
    ]
  },
  {
    category: "Distribution & Logistics",
    industries: [
      "Wholesale Distribution",
      "Logistics & Warehousing",
      "Transportation Services",
      "Import/Export Operations",
      "E-Commerce Fulfillment"
    ]
  },
  {
    category: "Healthcare & Education",
    industries: [
      "Hospitals & Health Systems",
      "Physician Groups",
      "Senior Living Facilities",
      "Private Schools",
      "Higher Education",
      "Non-Profit Organizations"
    ]
  }
];

const whyChubbMiddleMarket = [
  {
    icon: Award,
    title: "Deep Industry Expertise",
    description: "Specialized underwriters with extensive knowledge across diverse industries and complex risk profiles."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Operations in 54 countries with local expertise and multinational program capabilities."
  },
  {
    icon: Shield,
    title: "Claims Excellence",
    description: "#1 rated in claims satisfaction by brokers and risk managers in industry surveys."
  },
  {
    icon: TrendingUp,
    title: "Risk Engineering",
    description: "Cutting-edge risk engineering services to help identify, assess, and mitigate exposures."
  },
  {
    icon: Scale,
    title: "Financial Strength",
    description: "A++ (Superior) AM Best rating - the highest level of financial security for your coverage."
  },
  {
    icon: Zap,
    title: "Customized Solutions",
    description: "Tailored programs designed to address your specific industry and business requirements."
  }
];

const faqs = [
  {
    question: "What qualifies as a Middle Market account?",
    answer: "Chubb Middle Market typically serves businesses with annual revenues from $10 million to $1 billion, complex operations, multiple locations, and sophisticated insurance needs. These accounts require customized solutions beyond standard package policies."
  },
  {
    question: "What industries does Chubb Middle Market specialize in?",
    answer: "Chubb has deep expertise across manufacturing, technology, life sciences, financial services, real estate, construction, healthcare, distribution, and many more industries. Our specialized underwriters understand the unique risks of each sector."
  },
  {
    question: "Can Chubb handle multinational operations?",
    answer: "Yes, Chubb operates in 54 countries and offers multinational insurance programs that provide coordinated coverage across your global operations, with local policies where required and master policy structures."
  },
  {
    question: "What product lines are available?",
    answer: "Chubb Middle Market offers comprehensive coverage including Property, General Liability, Workers' Compensation, Commercial Auto, Umbrella/Excess, D&O, EPL, Professional Liability, Cyber, Marine, and Environmental coverage."
  },
  {
    question: "How does Chubb's claims service differ?",
    answer: "Chubb is consistently ranked #1 in claims satisfaction by both brokers and risk managers. We provide dedicated adjusters, proactive communication, and fast resolution to minimize business disruption."
  },
  {
    question: "Does Chubb provide risk engineering services?",
    answer: "Yes, Chubb offers comprehensive risk engineering services including loss control surveys, hazard assessments, safety training, and recommendations to help reduce your total cost of risk."
  }
];

export default function ChubbMiddleMarketLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    effectiveDate: "",
    industry: "",
    annualRevenue: "",
    employeeCount: "",
    coverageNeeds: [] as string[],
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        state: data.state,
        effective_date: data.effectiveDate,
        insurance_types: ["Chubb Middle Market", ...data.coverageNeeds],
        industry: data.industry,
        annual_revenue: data.annualRevenue,
        employee_count: data.employeeCount,
        message: data.message,
        source: "chubb-middle-market-landing"
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "A Casurance Middle Market specialist will contact you shortly."
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        effectiveDate: "",
        industry: "",
        annualRevenue: "",
        employeeCount: "",
        coverageNeeds: [],
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
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
    "name": "Chubb Middle Market Insurance",
    "description": "Comprehensive commercial insurance solutions for mid-sized businesses with complex operations. Property, Liability, Workers' Comp, Auto, Umbrella, D&O, Cyber, and specialty coverages.",
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
        <title>Chubb Middle Market Insurance | Complex Business Solutions | Casurance</title>
        <meta name="description" content="Chubb Middle Market insurance for businesses with $10M-$1B revenue. Comprehensive Property, Liability, Workers' Comp, D&O, Cyber coverage. Deep industry expertise across manufacturing, tech, healthcare." />
        <meta name="keywords" content="Chubb Middle Market, commercial insurance, business insurance, middle market insurance, D&O insurance, cyber insurance, workers compensation" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-middle-market" />
        <meta property="og:title" content="Chubb Middle Market Insurance | Casurance" />
        <meta property="og:description" content="Comprehensive insurance solutions for mid-sized businesses with complex operations and sophisticated needs." />
        <meta property="og:url" content="https://casurance.net/partners/chubb-middle-market" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a365d] via-[#2c5282] to-[#2b6cb0] text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <img src={chubbLogo} alt="Chubb Insurance" className="h-12" />
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Many Risks. One Chubb.</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Middle Market Solutions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Comprehensive insurance programs for growing businesses with complex operations
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Deep Industry Expertise</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Global Capabilities</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>#1 Claims Service</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-[#1a365d] hover:bg-white/90" asChild>
                  <a href="#quote-form">
                    Request Consultation <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Why Chubb Middle Market */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Chubb Middle Market?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Industry-leading expertise, financial strength, and service excellence for complex accounts
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChubbMiddleMarket.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="hover-elevate">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Product Lines */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Product Suite</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full range of coverage solutions to address all your commercial insurance needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productLines.map((product) => {
                const Icon = product.icon;
                return (
                  <Card key={product.title} className="hover-elevate h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Target Industries */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Industry Expertise</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized knowledge across a wide range of business sectors
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetIndustries.map((category) => (
                <Card key={category.category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.industries.map((industry, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full shrink-0" />
                          <span>{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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
                  <CardTitle className="text-2xl">Request a Middle Market Consultation</CardTitle>
                  <p className="text-muted-foreground">
                    Connect with our specialists to discuss your complex insurance needs
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

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                        id="address"
                        data-testid="input-address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">Primary State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Desired Effective Date</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          data-testid="input-effective-date"
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                        />
                      </div>
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
                          {targetIndustries.flatMap(cat => cat.industries).map((ind) => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
                            <SelectItem value="$10M - $25M">$10M - $25M</SelectItem>
                            <SelectItem value="$25M - $50M">$25M - $50M</SelectItem>
                            <SelectItem value="$50M - $100M">$50M - $100M</SelectItem>
                            <SelectItem value="$100M - $250M">$100M - $250M</SelectItem>
                            <SelectItem value="$250M - $500M">$250M - $500M</SelectItem>
                            <SelectItem value="$500M - $1B">$500M - $1B</SelectItem>
                            <SelectItem value="$1B+">$1B+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeCount">Employee Count</Label>
                        <Select
                          value={formData.employeeCount}
                          onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                        >
                          <SelectTrigger data-testid="select-employees">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50-100">50-100</SelectItem>
                            <SelectItem value="100-250">100-250</SelectItem>
                            <SelectItem value="250-500">250-500</SelectItem>
                            <SelectItem value="500-1000">500-1,000</SelectItem>
                            <SelectItem value="1000-5000">1,000-5,000</SelectItem>
                            <SelectItem value="5000+">5,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell Us About Your Needs</Label>
                      <Textarea
                        id="message"
                        data-testid="input-message"
                        placeholder="Describe your business operations, current coverage, and what you're looking for..."
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
                      {submitMutation.isPending ? "Submitting..." : "Request Consultation"}
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
              <h2 className="text-2xl font-bold text-foreground mb-2">Explore More Chubb Solutions</h2>
              <p className="text-muted-foreground">Coverage options for businesses of all sizes</p>
            </div>
            <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <Link href="/partners/chubb-benchmarq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Factory className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Benchmarq Package</p>
                  </CardContent>
                </Card>
              </Link>
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
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Workers' Comp</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partners/chubb-umbrella">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Umbrella className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Commercial Umbrella</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partners/chubb-cyber">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Cyber Liability</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a365d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Enterprise-Level Protection?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let our Middle Market specialists design a comprehensive insurance program tailored to your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#1a365d] hover:bg-white/90" asChild>
                <a href="#quote-form">Request Consultation</a>
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
