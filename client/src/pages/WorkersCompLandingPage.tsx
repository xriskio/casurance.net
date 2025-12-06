import { useState, useEffect } from "react";
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
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Users, 
  Award,
  BadgeCheck,
  Zap,
  Lock,
  Mail,
  Timer,
  Percent,
  Building2,
  HardHat,
  Truck,
  Stethoscope,
  Store,
  Factory
} from "lucide-react";

const carrierPartners = [
  { name: "Chubb Insurance", description: "A+ Rated Global Leader" },
  { name: "CNA Insurance", description: "Fortune 500 Carrier" },
  { name: "Guard Insurance", description: "Small Business Specialists" },
  { name: "AmTrust Insurance", description: "Workers Comp Experts" },
  { name: "PIE Insurance", description: "Simple & Fast Workers Comp" },
  { name: "Three Insurance", description: "Modern Coverage Solutions" },
  { name: "biBerk", description: "Berkshire Hathaway Company" },
];

const creditBenefits = [
  "Drug-Free Workplace Credit",
  "Safety Program Credit",
  "Experience Modification Credit",
  "Pay-As-You-Go Options",
  "Multi-Policy Discounts",
  "Loss Control Services",
];

const industriesServed = [
  { icon: HardHat, name: "Construction", description: "General contractors, subcontractors, trades" },
  { icon: Truck, name: "Transportation", description: "Trucking, delivery, logistics" },
  { icon: Store, name: "Retail", description: "Shops, restaurants, hospitality" },
  { icon: Factory, name: "Manufacturing", description: "Factories, warehouses, production" },
  { icon: Stethoscope, name: "Healthcare", description: "Medical offices, home health, clinics" },
  { icon: Building2, name: "Professional Services", description: "Offices, tech, consulting" },
];

const faqs = [
  {
    question: "How can I get up to 40% credits on workers' comp?",
    answer: "Credits are applied based on your safety programs, claims history, drug-free workplace policies, and experience modification rate. Our carriers offer various credit programs that can significantly reduce your premium."
  },
  {
    question: "What is the experience modification rate (EMR)?",
    answer: "Your EMR compares your business's claims history to similar businesses. An EMR below 1.0 can result in premium discounts, while above 1.0 means higher premiums. We help you understand and improve your EMR."
  },
  {
    question: "Do you offer pay-as-you-go workers' comp?",
    answer: "Yes! Several of our carrier partners offer pay-as-you-go options where you pay based on actual payroll, improving cash flow and eliminating large down payments and year-end audits."
  },
  {
    question: "How quickly can I get a workers' comp quote?",
    answer: "Most quotes are delivered within 24-48 hours. For straightforward risks, we can often provide same-day quotes from multiple carriers."
  },
];

export default function WorkersCompLandingPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentCarrierIndex, setCurrentCarrierIndex] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    state: "",
    industry: "",
    employees: ""
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
        state: data.state,
        insurance_type: `Workers Compensation - ${data.industry} - ${data.employees} employees`
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "Our workers' comp specialists will contact you within 24 hours.",
      });
      navigate("/quote/thank-you");
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

  return (
    <>
      <Helmet>
        <title>Workers Compensation Insurance California & Nevada | Up to 40% Credits | Casurance</title>
        <meta name="title" content="Workers Compensation Insurance California & Nevada | Up to 40% Credits | Casurance" />
        <meta name="description" content="Get workers comp insurance in California and Nevada with up to 40% premium credits. Quotes from Chubb, CNA, Guard, AmTrust, PIE Insurance and more. Fast quotes, competitive rates." />
        <meta name="keywords" content="workers compensation insurance California, workers comp Nevada, workers comp credits, workers compensation quotes, business insurance California, workers comp premium discounts" />
        <link rel="canonical" href="https://casurance.com/workers-comp-california-nevada" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.com/workers-comp-california-nevada" />
        <meta property="og:title" content="Workers Comp Insurance CA & NV | Up to 40% Premium Credits" />
        <meta property="og:description" content="Get workers compensation insurance with up to 40% premium credits from top-rated carriers. Free quotes for California and Nevada businesses." />
        <meta property="og:site_name" content="Casurance Insurance Agency" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Workers Comp Insurance CA & NV | Up to 40% Credits" />
        <meta property="twitter:description" content="Get workers compensation insurance with up to 40% premium credits from top-rated carriers." />

        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.region" content="US-NV" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Workers Compensation Insurance",
            "description": "Workers compensation insurance for California and Nevada businesses with up to 40% premium credits from top-rated carriers.",
            "provider": {
              "@type": "InsuranceAgency",
              "name": "Casurance Insurance Agency",
              "telephone": "+1-888-254-0089",
              "email": "info@casurance.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "addressCountry": "US"
              }
            },
            "areaServed": [
              { "@type": "State", "name": "California" },
              { "@type": "State", "name": "Nevada" }
            ],
            "serviceType": "Workers Compensation Insurance"
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1c33] to-[#0a1628] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2">
                  <Percent className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">Up to 40% Premium Credits Available</span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
                    Workers' Comp Insurance for{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                      California & Nevada
                    </span>
                  </h1>
                  
                  <p className="text-xl text-white/80 mb-8 leading-relaxed" data-testid="text-hero-description">
                    Get up to <strong className="text-green-400">40% credits</strong> on your workers' compensation premium from our A-rated carrier partners. Fast quotes, competitive rates, pay-as-you-go options.
                  </p>
                </div>

                {/* Feature Badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Percent className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-white">Up to 40% Credits</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">Same-Day Quotes</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">A-Rated Carriers</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">Pay-As-You-Go</span>
                  </div>
                </div>

                {/* Credit Types */}
                <div>
                  <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Available Premium Credits:</p>
                  <div className="flex flex-wrap gap-2">
                    {creditBenefits.map((credit, index) => (
                      <div 
                        key={index}
                        className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/20 text-green-300 text-sm"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {credit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call CTA */}
                <div className="pt-4">
                  <a href="tel:18882540089" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="text-lg font-semibold">1-888-254-0089</span>
                  </a>
                  <p className="text-white/60 text-sm mt-1">Speak with a workers' comp specialist</p>
                </div>
              </div>

              {/* Right Column - Quote Form */}
              <div className="lg:pl-8">
                <Card className="bg-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-form-title">
                        Get Your Free Quote
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        California & Nevada • Takes 2 minutes
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
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="industry" className="text-foreground">Industry</Label>
                          <Select 
                            value={formData.industry} 
                            onValueChange={(value) => setFormData({...formData, industry: value})}
                          >
                            <SelectTrigger className="mt-1" data-testid="select-industry">
                              <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="construction">Construction</SelectItem>
                              <SelectItem value="transportation">Transportation</SelectItem>
                              <SelectItem value="retail">Retail/Restaurant</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="professional">Professional Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="employees" className="text-foreground"># of Employees</Label>
                          <Select 
                            value={formData.employees} 
                            onValueChange={(value) => setFormData({...formData, employees: value})}
                          >
                            <SelectTrigger className="mt-1" data-testid="select-employees">
                              <SelectValue placeholder="Select" />
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

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 mt-2"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Get My Workers' Comp Quote"}
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
        </section>

        {/* Rotating Carrier Partners */}
        <section className="py-12 bg-muted/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Our Workers' Comp Carrier Partners
              </p>
              <p className="text-lg text-foreground">
                A-Rated carriers offering up to <span className="text-green-600 font-bold">40% premium credits</span>
              </p>
            </div>

            {/* Rotating Featured Carrier */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center min-w-[300px] transition-all duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {carrierPartners[currentCarrierIndex].name}
                </h3>
                <p className="text-muted-foreground">
                  {carrierPartners[currentCarrierIndex].description}
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  {carrierPartners.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-colors ${idx === currentCarrierIndex ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* All Carriers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {carrierPartners.map((carrier, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg p-4 text-center border transition-all duration-300 ${index === currentCarrierIndex ? 'border-primary shadow-md scale-105' : 'border-border'}`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{carrier.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-industries-heading">
                Industries We Serve in CA & NV
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized workers' compensation coverage for every type of business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industriesServed.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <Card key={index} className="hover-elevate" data-testid={`card-industry-${index}`}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-xl text-foreground mb-2">{industry.name}</h3>
                      <p className="text-muted-foreground">{industry.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why 40% Credits */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-green-600 to-green-700">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Percent className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">Premium Savings</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              How to Qualify for Up to 40% Credits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-8">
              {creditBenefits.map((credit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white font-medium">{credit}</span>
                </div>
              ))}
            </div>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our experts will analyze your business and identify all available credits to maximize your savings. Many California and Nevada businesses qualify for multiple credits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#top">
                <Button size="lg" variant="secondary" className="group text-lg px-8">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  1-888-254-0089
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Workers' Comp FAQ
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about workers' compensation in California & Nevada
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} data-testid={`faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-7">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Your Workers' Comp Quote Today
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join California and Nevada businesses saving up to 40% on their workers' compensation premiums. Fast quotes from A-rated carriers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/quote/workers-compensation">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 group text-lg px-10 py-6">
                  Request Full Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
              <a href="tel:18882540089" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
                <span>1-888-254-0089</span>
              </a>
              <span className="hidden sm:block">|</span>
              <a href="mailto:info@casurance.com" className="hover:text-white transition-colors">
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
