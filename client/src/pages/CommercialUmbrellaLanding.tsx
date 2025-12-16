import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Umbrella,
  Phone, 
  CheckCircle2,
  Building2,
  DollarSign,
  Award,
  Clock,
  Users,
  ArrowRight,
  Factory,
  Truck,
  Home,
  Briefcase,
  HardHat,
  Warehouse,
  Store,
  Utensils,
  Cpu,
  Stethoscope
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_STATES } from "@shared/constants/states";

import liabilityClaimImg from "@assets/413464f7-4f80-45bd-86eb-9576beefcec5_1765777516722.png";
import industriesImg from "@assets/a9e85735-3c00-4b1e-8025-9f476723756f_1765777516722.png";
import executiveImg from "@assets/e8e0a599-ab6e-41a8-9b29-a3867add4e70_1765777516723.png";
import buildingImg from "@assets/506746e6-69d7-4491-83aa-92032d6891c1_1765777516723.png";
import fleetImg from "@assets/82fdf331-23ca-415a-bb7e-19017c56193c_1765777516723.png";
import constructionImg from "@assets/c43e8bd7-9068-4bb6-a761-4bd8875ee179_1765777516723.png";

const desiredLimits = [
  "$1 Million",
  "$2 Million",
  "$5 Million",
  "$10 Million",
  "$15 Million",
  "$25 Million",
  "$50 Million+",
  "Not Sure - Need Guidance"
];

const industryTypes = [
  "Artisan Contractors",
  "Construction / General Contractors",
  "Real Estate / Property Management",
  "Manufacturing",
  "Transportation / Trucking",
  "Healthcare / Medical",
  "Professional Services",
  "Technology",
  "Retail / Wholesale",
  "Hospitality / Restaurants",
  "Energy / Oil & Gas",
  "Financial Services",
  "Other"
];

const features = [
  { icon: <DollarSign className="h-6 w-6" />, title: "Limits to $50M+", description: "Standard limits $1M-$25M, enterprise limits up to $100M for large corporations" },
  { icon: <Shield className="h-6 w-6" />, title: "Drop-Down Coverage", description: "Protection when underlying policies are exhausted or don't respond" },
  { icon: <Award className="h-6 w-6" />, title: "A-Rated Carriers", description: "Coverage backed by financially strong, top-rated insurance companies" },
  { icon: <Clock className="h-6 w-6" />, title: "Fast Turnaround", description: "Quick quotes and same-day certificates when you need them" },
  { icon: <Building2 className="h-6 w-6" />, title: "Multi-Line Coverage", description: "Excess protection over GL, Auto, and Employer's Liability" },
  { icon: <Users className="h-6 w-6" />, title: "Expert Guidance", description: "Specialists who understand your industry's unique umbrella needs" }
];

const industries = [
  { icon: HardHat, name: "Artisan Contractors", description: "Carpenters, electricians, plumbers" },
  { icon: Building2, name: "Real Estate", description: "Property management, developers" },
  { icon: Factory, name: "Manufacturing", description: "Product liability exposure" },
  { icon: Truck, name: "Transportation", description: "Trucking and fleet operations" },
  { icon: Stethoscope, name: "Healthcare", description: "Medical facilities, providers" },
  { icon: Briefcase, name: "Professional Services", description: "Consultants, advisors" },
  { icon: Cpu, name: "Technology", description: "Tech companies, SaaS" },
  { icon: Utensils, name: "Restaurants", description: "Food service operations" },
  { icon: Store, name: "Retail", description: "Stores and shopping centers" },
  { icon: Warehouse, name: "Wholesale", description: "Distributors and warehouses" }
];

const coverageBenefits = [
  "Limits from $1M to $25M per occurrence/aggregate (standard)",
  "Higher limits up to $50M+ for qualified risks",
  "Enterprise limits to $100M for major corporations",
  "Separate aggregate limits feature",
  "Defense costs outside the limit (select policies)",
  "Minimum underlying: $1M-$2M GL/Auto/EL required"
];

export default function CommercialUmbrellaLanding() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    effectiveDate: "",
    industry: "",
    desiredLimit: "",
    currentUmbrellaLimit: "",
    annualRevenue: "",
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/quote-requests", {
        insuranceType: "commercial-umbrella",
        businessName: form.businessName,
        contactName: form.contactName,
        phone: form.phone,
        email: form.email,
        industry: form.industry,
        annualRevenue: form.annualRevenue,
        additionalInfo: JSON.stringify({
          address: form.address,
          state: form.state,
          effectiveDate: form.effectiveDate,
          desiredLimit: form.desiredLimit,
          currentUmbrellaLimit: form.currentUmbrellaLimit,
          message: form.message,
          source: "commercial-umbrella-landing-page"
        })
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received!",
        description: "An umbrella insurance specialist will contact you within 1 business day."
      });
      setForm({
        businessName: "",
        contactName: "",
        phone: "",
        email: "",
        address: "",
        state: "",
        effectiveDate: "",
        industry: "",
        desiredLimit: "",
        currentUmbrellaLimit: "",
        annualRevenue: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Please try again or call us at 1-888-254-0089."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Commercial Umbrella Insurance | Excess Liability Coverage to $50M+ | Casurance"
        description="Get commercial umbrella insurance quotes with limits from $1M to $50M+. Excess liability protection above general liability, auto liability, and employer's liability. Fast quotes, A-rated carriers."
        keywords="commercial umbrella insurance, excess liability insurance, umbrella policy, business umbrella coverage, excess coverage, high limit liability"
        canonical="/lp/commercial-umbrella"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section with Liability Claim Image */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a365d] to-[#0a1628] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src={liabilityClaimImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]/70" />
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-primary text-white">Excess Liability</Badge>
                  <Badge className="bg-white/20 text-white">Limits to $50M+</Badge>
                  <Badge className="bg-white/20 text-white">All 50 States</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Commercial Umbrella Insurance
                </h1>
                <p className="text-xl text-gray-300">
                  Protect your business from catastrophic liability claims with excess coverage above your primary policies. Limits from $1M to $100M for qualified businesses.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span>Standard limits: $1M - $25M per occurrence/aggregate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span>Higher limits up to $50M+ for qualified risks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span>Enterprise limits to $100M for large corporations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span>Separate aggregate limits feature available</span>
                  </li>
                </ul>
                <div className="flex items-center gap-4 pt-4">
                  <a href="tel:1-888-254-0089" className="flex items-center gap-2 text-lg font-semibold">
                    <Phone className="h-5 w-5" />
                    1-888-254-0089
                  </a>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">CA License #6005562</span>
                </div>
              </div>

              {/* Quote Form */}
              <Card className="bg-white text-foreground shadow-2xl">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Umbrella className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Get Your Umbrella Quote</CardTitle>
                  <p className="text-sm text-muted-foreground">Fast, free, no-obligation quotes</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Company Name"
                        value={form.businessName}
                        onChange={(e) => setForm({...form, businessName: e.target.value})}
                        required
                        data-testid="input-business-name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={form.contactName}
                          onChange={(e) => setForm({...form, contactName: e.target.value})}
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={form.phone}
                          onChange={(e) => setForm({...form, phone: e.target.value})}
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Business Ave, Suite 200"
                        value={form.address}
                        onChange={(e) => setForm({...form, address: e.target.value})}
                        data-testid="input-address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={form.state} onValueChange={(v) => setForm({...form, state: v})}>
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map(state => (
                              <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <Select value={form.industry} onValueChange={(v) => setForm({...form, industry: v})}>
                          <SelectTrigger data-testid="select-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryTypes.map(ind => (
                              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="desiredLimit">Desired Umbrella Limit</Label>
                        <Select value={form.desiredLimit} onValueChange={(v) => setForm({...form, desiredLimit: v})}>
                          <SelectTrigger data-testid="select-desired-limit">
                            <SelectValue placeholder="Select limit" />
                          </SelectTrigger>
                          <SelectContent>
                            {desiredLimits.map(limit => (
                              <SelectItem key={limit} value={limit}>{limit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="annualRevenue">Annual Revenue</Label>
                        <Input
                          id="annualRevenue"
                          placeholder="e.g., $5M"
                          value={form.annualRevenue}
                          onChange={(e) => setForm({...form, annualRevenue: e.target.value})}
                          data-testid="input-annual-revenue"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="effectiveDate">Desired Effective Date</Label>
                      <Input
                        id="effectiveDate"
                        type="date"
                        value={form.effectiveDate}
                        onChange={(e) => setForm({...form, effectiveDate: e.target.value})}
                        data-testid="input-effective-date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        placeholder="Current coverage, specific requirements, etc."
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        rows={3}
                        data-testid="textarea-message"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-quote"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Get My Umbrella Quote"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to be contacted about your insurance inquiry.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Umbrella Insurance Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Commercial Umbrella Insurance?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                When a claim exceeds your primary policy limits, your business assets are at risk. Commercial umbrella insurance provides an additional layer of protection.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={liabilityClaimImg} 
                  alt="Large liability claim example showing $12.5M estimated claim"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-6">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">The Reality of Large Claims</h3>
                  <p className="text-muted-foreground mb-4">
                    Major liability claims can easily exceed $1 million. Construction accidents, auto incidents, and product liability cases regularly result in multi-million dollar judgments.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Medical expenses can reach millions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Lost wages and damages add up quickly
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Legal fees alone can exceed $500K
                    </li>
                  </ul>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Your Protection Solution</h3>
                    <p className="text-muted-foreground mb-4">
                      Commercial umbrella insurance kicks in when your underlying policies are exhausted, protecting your business from catastrophic financial loss.
                    </p>
                    <ul className="space-y-2">
                      {coverageBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Commercial Umbrella Program</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive excess liability coverage backed by A-rated carriers with limits tailored to your business needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Cover */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Industries We Cover</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Commercial umbrella coverage for diverse industries with specialized underwriting for your unique exposures.
              </p>
            </div>
            
            <div className="mb-8">
              <img 
                src={industriesImg} 
                alt="Excess Casualty Umbrella Insurance - Comprehensive Protection Across Diverse Industries"
                className="rounded-lg shadow-lg mx-auto max-w-4xl w-full"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {industries.map((ind, idx) => {
                const Icon = ind.icon;
                return (
                  <Card key={idx} className="hover-elevate text-center">
                    <CardContent className="p-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{ind.name}</h3>
                      <p className="text-muted-foreground text-xs">{ind.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Visual Examples Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Protecting Diverse Operations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From construction sites to commercial fleets to high-rise properties, umbrella coverage protects against large-scale liability exposures.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <img src={constructionImg} alt="Construction site with cranes" className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Construction & Contractors</h3>
                  <p className="text-muted-foreground text-sm">High-limit umbrella for general contractors, artisan contractors, and construction operations.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <img src={fleetImg} alt="Commercial truck fleet" className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Transportation & Fleet</h3>
                  <p className="text-muted-foreground text-sm">Excess auto liability for trucking companies, delivery fleets, and transportation operations.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <img src={buildingImg} alt="Commercial real estate building" className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Real Estate & Property</h3>
                  <p className="text-muted-foreground text-sm">Umbrella coverage for property owners, managers, and real estate developers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Executive Image Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={executiveImg} 
                  alt="Business executive reviewing commercial umbrella liability policy"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Peace of Mind for Business Leaders</h2>
                <p className="text-muted-foreground">
                  As a business owner or executive, you understand the importance of protecting your company's assets. Commercial umbrella insurance provides the additional layer of security that safeguards your business from potentially devastating liability claims.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Meet Contract Requirements</h4>
                      <p className="text-muted-foreground text-sm">Many large clients require higher liability limits than standard policies provide.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Protect Personal Assets</h4>
                      <p className="text-muted-foreground text-sm">Shield your personal wealth from business liability claims that exceed primary coverage.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Cost-Effective Coverage</h4>
                      <p className="text-muted-foreground text-sm">Get millions in additional protection for a fraction of the cost of increasing primary limits.</p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/quote">
                    <Button size="lg" data-testid="button-get-quote-cta">
                      Get Your Umbrella Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Business?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get a commercial umbrella insurance quote today. Our specialists will help you find the right coverage limits for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-888-254-0089">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 1-888-254-0089
                </Button>
              </a>
              <Link href="/coverage/commercial-umbrella">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Learn More About Coverage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
