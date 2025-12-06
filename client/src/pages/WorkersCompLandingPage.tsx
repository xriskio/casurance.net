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
  Factory,
  TrendingDown,
  DollarSign,
  Users,
  Star,
  Sparkles
} from "lucide-react";

import chubbLogo from "@assets/CHUBB_Logo_Black_RBG_1764999352545.jpg";
import cnaLogo from "@assets/CNA_FINANCIAL_CORPORATION_LOGO_1764999352544.jpg";
import guardLogo from "@assets/simple-insurance-carriers__0008_berkshire-hathaway-guard-insur_1764999352544.png";
import amtrustLogo from "@assets/simple-insurance-carriers__0012_AmTrust-insurance_1764999352544.png";
import pieLogo from "@assets/Pie_Insurance_Logo_1764999352544.jpg";
import biberkLogo from "@assets/biberk_logo_1764999352544.jpg";
import greatAmericanLogo from "@assets/gaig_logo_web_full_color_1764999352542.png";
import stateFundLogo from "@assets/9cK0r1ow_400x400_1764999352542.png";
import atlasLogo from "@assets/atlas_1764999352543.png";
import appliedLogo from "@assets/Applied_Underwriters_Logo_Logo_1764999352543.jpg";
import accreditedLogo from "@assets/accredited_1764999352543.png";
import nationalLogo from "@assets/logo_(1)_1764999352543.png";

const carrierPartners = [
  { name: "Chubb", logo: chubbLogo, rating: "A++", description: "World's Largest P&C Insurer" },
  { name: "CNA Insurance", logo: cnaLogo, rating: "A", description: "Fortune 500 Leader" },
  { name: "Guard Insurance", logo: guardLogo, rating: "A+", description: "Berkshire Hathaway Company" },
  { name: "AmTrust", logo: amtrustLogo, rating: "A-", description: "Workers' Comp Specialists" },
  { name: "PIE Insurance", logo: pieLogo, rating: "A-", description: "Simple & Fast WC" },
  { name: "biBERK", logo: biberkLogo, rating: "A++", description: "Berkshire Hathaway Company" },
  { name: "Great American", logo: greatAmericanLogo, rating: "A+", description: "Over 150 Years Strong" },
  { name: "State Fund", logo: stateFundLogo, rating: "A", description: "California's Largest WC Carrier" },
  { name: "Atlas General", logo: atlasLogo, rating: "A", description: "Specialty Insurance Solutions" },
  { name: "Applied Underwriters", logo: appliedLogo, rating: "A", description: "Integrated Risk Solutions" },
  { name: "Accredited", logo: accreditedLogo, rating: "A-", description: "Program Management Experts" },
  { name: "National Liability", logo: nationalLogo, rating: "A++", description: "Berkshire Hathaway Company" },
];

const creditBenefits = [
  { icon: Shield, title: "Drug-Free Workplace", credit: "5-10%" },
  { icon: Award, title: "Safety Program", credit: "5-15%" },
  { icon: TrendingDown, title: "Experience Mod", credit: "Up to 25%" },
  { icon: DollarSign, title: "Pay-As-You-Go", credit: "Flex Payment" },
  { icon: Users, title: "Group Discounts", credit: "5-10%" },
  { icon: CheckCircle, title: "Loss Control", credit: "5-10%" },
];

const industriesServed = [
  { icon: HardHat, name: "Construction", description: "General contractors, subcontractors, trades", highlight: true },
  { icon: Truck, name: "Transportation", description: "Trucking, delivery, logistics" },
  { icon: Store, name: "Retail & Hospitality", description: "Shops, restaurants, hotels" },
  { icon: Factory, name: "Manufacturing", description: "Factories, warehouses, production", highlight: true },
  { icon: Stethoscope, name: "Healthcare", description: "Medical offices, home health, clinics" },
  { icon: Building2, name: "Professional Services", description: "Offices, tech, consulting" },
];

const stats = [
  { value: "40%", label: "Max Credits Available", icon: Percent },
  { value: "12+", label: "A-Rated Carriers", icon: Shield },
  { value: "24hr", label: "Quote Turnaround", icon: Clock },
  { value: "$0", label: "Down Payment Options", icon: DollarSign },
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
        <link rel="canonical" href="https://casurance.net/workers-comp-california-nevada" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.net/workers-comp-california-nevada" />
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
              "email": "info@casurance.net",
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
        {/* MEGA Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1c33] to-[#0a1628] overflow-hidden" id="top">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            {/* Top Banner */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/30 to-emerald-500/20 backdrop-blur-sm border border-green-400/40 rounded-full px-6 py-3 mb-6 animate-pulse">
                <Sparkles className="h-5 w-5 text-green-300" />
                <span className="text-lg font-bold text-green-300">LIMITED TIME: Up to 40% Premium Credits Available!</span>
                <Sparkles className="h-5 w-5 text-green-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" data-testid="text-hero-headline">
                    Save <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 animate-pulse">Up to 40%</span> on{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                      Workers' Comp
                    </span>
                  </h1>
                  
                  <p className="text-xl text-white/80 mb-6 leading-relaxed" data-testid="text-hero-description">
                    California & Nevada businesses: Get quotes from <strong className="text-white">12+ A-rated carriers</strong> and maximize your premium credits with our expert team.
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                      >
                        <Icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Credit Types Grid */}
                <div>
                  <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Available Premium Credits:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {creditBenefits.map((credit, index) => {
                      const Icon = credit.icon;
                      return (
                        <div 
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-transparent backdrop-blur-sm rounded-lg px-4 py-3 border border-green-500/20"
                        >
                          <Icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-white">{credit.title}</div>
                            <div className="text-xs text-green-400">{credit.credit}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Call CTA */}
                <div className="flex flex-wrap gap-4 items-center pt-4">
                  <a href="tel:18882540089" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 hover:bg-white/20 transition-all">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold text-white">1-888-254-0089</span>
                  </a>
                  <span className="text-white/60 text-sm">Speak with a workers' comp specialist</span>
                </div>
              </div>

              {/* Right Column - Quote Form */}
              <div className="lg:pl-4">
                <Card className="bg-white shadow-2xl border-0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400"></div>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm font-medium mb-3">
                        <Zap className="h-4 w-4" />
                        Free Instant Quote
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-form-title">
                        Get Your Workers' Comp Quote
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
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 mt-2 shadow-lg shadow-green-500/25"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Get My Free Quote Now"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        <span>256-bit SSL</span>
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

        {/* MEGA Carrier Partners Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background border-y border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
                <Shield className="h-4 w-4" />
                Exclusive Carrier Access
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                12+ A-Rated Carrier Partners
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner with the nation's top workers' compensation carriers to get you the best rates and up to <span className="text-green-600 font-bold">40% in premium credits</span>
              </p>
            </div>

            {/* Featured Rotating Carrier */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center min-w-[400px] border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-primary to-green-500"></div>
                <div className="flex justify-center items-center h-24 mb-4">
                  <img 
                    src={carrierPartners[currentCarrierIndex].logo} 
                    alt={carrierPartners[currentCarrierIndex].name}
                    className="max-h-20 max-w-[280px] object-contain transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {carrierPartners[currentCarrierIndex].name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-600">AM Best: {carrierPartners[currentCarrierIndex].rating}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {carrierPartners[currentCarrierIndex].description}
                </p>
                <div className="mt-4 flex justify-center gap-1.5">
                  {carrierPartners.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentCarrierIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentCarrierIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* All Carriers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {carrierPartners.map((carrier, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentCarrierIndex(index)}
                  className={`bg-white rounded-xl p-4 text-center border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${index === currentCarrierIndex ? 'border-primary shadow-lg scale-105' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="h-12 flex items-center justify-center mb-2">
                    <img 
                      src={carrier.logo} 
                      alt={carrier.name}
                      className="max-h-10 max-w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-foreground truncate">{carrier.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-muted-foreground">{carrier.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big 40% Savings Banner */}
        <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:60px_60px]"></div>
          
          <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-black text-white/20 leading-none block">40%</span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white -mt-16 sm:-mt-24 lg:-mt-32 relative z-10">
                Maximum Premium Credits
              </div>
            </div>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Our expert team will analyze your business and identify ALL available credits to maximize your savings on workers' compensation insurance.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#top">
                <Button size="lg" variant="secondary" className="group text-lg px-10 py-6 shadow-xl">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-10 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
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
                  <Card 
                    key={index} 
                    className={`hover-elevate ${industry.highlight ? 'border-green-500/50 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20' : ''}`}
                    data-testid={`card-industry-${index}`}
                  >
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${industry.highlight ? 'bg-green-500/20' : 'bg-primary/10'}`}>
                        <Icon className={`h-7 w-7 ${industry.highlight ? 'text-green-600' : 'text-primary'}`} />
                      </div>
                      <h3 className="font-semibold text-xl text-foreground mb-2">{industry.name}</h3>
                      <p className="text-muted-foreground">{industry.description}</p>
                      {industry.highlight && (
                        <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                          <CheckCircle className="h-4 w-4" />
                          High-risk specialty
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
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
            <div className="inline-flex items-center gap-2 bg-green-500/20 rounded-full px-4 py-2 text-sm font-medium text-green-400 mb-6">
              <Zap className="h-4 w-4" />
              Get Started Today
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Save on Workers' Comp?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join California and Nevada businesses saving up to 40% on their workers' compensation premiums. Fast quotes from 12+ A-rated carriers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/quote/workers-compensation">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 group text-lg px-10 py-6 shadow-lg shadow-green-500/25">
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
              <a href="mailto:info@casurance.net" className="hover:text-white transition-colors">
                info@casurance.net
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
