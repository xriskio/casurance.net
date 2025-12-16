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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  CheckCircle, 
  Award,
  BadgeCheck,
  Building2,
  Factory,
  Warehouse,
  Ship,
  Cpu,
  Lock,
  Briefcase,
  FileText,
  Users,
  Globe,
  Zap,
  Target,
  TrendingUp,
  Package,
  HardDrive
} from "lucide-react";
import { SERVICE_STATES } from "@shared/constants/states";

import chubbLogo from "@assets/CHUBB_Logo_Black_RBG_(1)_1765300717619.jpg";
import techHeroImg from "@assets/stock_images/pexels-divinetechygirl-1181354.jpg";


const specialPrograms = [
  {
    icon: Cpu,
    title: "Technology Companies",
    subtitle: "DigiTech ERM",
    description: "Comprehensive coverage for software developers, SaaS providers, IT consultants, and tech startups. Includes E&O, Cyber, D&O, and Media Liability.",
    coverages: ["DigiTech ERM", "Cyber Insurance", "E&O Coverage", "Media Liability", "D&O Insurance"],
    link: "/technology-insurance",
    color: "blue"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    subtitle: "Chubb Benchmarq",
    description: "Tailored property and casualty solutions for manufacturers including food processing, electronics, industrial equipment, and consumer products.",
    coverages: ["Property Coverage", "Products Liability", "Workers' Compensation", "Supply Chain", "Equipment Breakdown"],
    link: "/manufacturing-insurance",
    color: "slate"
  },
  {
    icon: Warehouse,
    title: "Self Storage Facilities",
    subtitle: "Storage Operators Program",
    description: "Specialized coverage for self-storage operators including property, liability, and customer goods protection programs.",
    coverages: ["Building Coverage", "Business Income", "Customer Goods", "General Liability", "Tenant Legal Liability"],
    link: "/industry/self-storage",
    color: "amber"
  },
  {
    icon: Ship,
    title: "Ocean Cargo",
    subtitle: "Marine Cargo Insurance",
    description: "Protect goods in transit across international waters with comprehensive marine cargo coverage for importers and exporters.",
    coverages: ["All-Risk Coverage", "Named Perils", "Warehouse-to-Warehouse", "General Average", "Duty Coverage"],
    link: "/quote/ocean-cargo",
    color: "cyan"
  },
  {
    icon: Lock,
    title: "Cyber Insurance",
    subtitle: "Cyber Enterprise Risk Management",
    description: "Robust cyber protection for businesses of all sizes including data breach response, business interruption, and cyber extortion.",
    coverages: ["Data Breach Response", "Network Security", "Cyber Extortion", "Business Interruption", "Regulatory Defense"],
    link: "/quote/cyber-liability",
    color: "purple"
  },
  {
    icon: Briefcase,
    title: "Professional Liability",
    subtitle: "E&O / Management Liability",
    description: "Protect professionals and executives with errors & omissions, directors & officers, and employment practices liability coverage.",
    coverages: ["E&O Insurance", "D&O Coverage", "EPL Insurance", "Fiduciary Liability", "Crime Coverage"],
    link: "/quote/professional-liability",
    color: "emerald"
  },
  {
    icon: Shield,
    title: "Commercial Umbrella",
    subtitle: "Excess Liability Coverage",
    description: "High-limit umbrella coverage from $1M to $50M+ for businesses requiring enhanced liability protection above primary policies.",
    coverages: ["Excess GL Liability", "Excess Auto Liability", "Excess Employer's Liability", "Drop-Down Coverage", "Defense Costs"],
    link: "/lp/commercial-umbrella",
    color: "indigo"
  }
];

const whyChubb = [
  {
    icon: Award,
    title: "A++ AM Best Rating",
    description: "Chubb maintains the highest financial strength rating, ensuring claims-paying ability and long-term stability."
  },
  {
    icon: Globe,
    title: "World's Largest P&C Insurer",
    description: "Global reach with local expertise across 54 countries and territories, serving businesses of all sizes."
  },
  {
    icon: Target,
    title: "Specialized Expertise",
    description: "Industry-specific underwriters who understand your unique risks and tailor coverage accordingly."
  },
  {
    icon: Zap,
    title: "Superior Claims Service",
    description: "Dedicated claims professionals and rapid response teams to minimize business disruption."
  },
  {
    icon: TrendingUp,
    title: "Risk Engineering",
    description: "Complimentary risk assessments and loss prevention services to help reduce exposures."
  },
  {
    icon: Users,
    title: "Authorized Agent Network",
    description: "Work with authorized Chubb agents like Casurance for personalized service and competitive pricing."
  }
];

const chubbCapabilities = [
  "Property & Casualty up to $100M+",
  "Excess & Umbrella to $25M",
  "Cyber liability up to $15M",
  "D&O / E&O / EPL coverage",
  "International programs",
  "Manuscript policy forms"
];

export default function ChubbSpecialProgramsLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    effectiveDate: "",
    programInterest: "",
    annualRevenue: "",
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quote-requests", {
        insuranceType: "chubb-special-programs",
        businessName: data.businessName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        effectiveDate: data.effectiveDate,
        annualRevenue: data.annualRevenue,
        additionalInfo: JSON.stringify({
          state: data.state,
          programInterest: data.programInterest,
          message: data.message,
          source: "Chubb Special Programs Landing Page"
        })
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "A Chubb specialist will contact you within 24 hours."
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        effectiveDate: "",
        programInterest: "",
        annualRevenue: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "Please try again or call us at 1-888-254-0089.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <>
      <Helmet>
        <title>Chubb Special Programs | Authorized Chubb Agent | Casurance</title>
        <meta name="description" content="Casurance is an Authorized Chubb Agent offering specialized insurance programs for technology companies, manufacturing, self storage, ocean cargo, cyber, and professional liability. A++ rated coverage nationwide." />
        <meta name="keywords" content="Chubb insurance, authorized Chubb agent, DigiTech ERM, Chubb Benchmarq, technology insurance, manufacturing insurance, cyber insurance, professional liability" />
        <link rel="canonical" href="https://casurance.com/chubb-special-programs" />
        <meta property="og:title" content="Chubb Special Programs | Authorized Chubb Agent | Casurance" />
        <meta property="og:description" content="Access Chubb's A++ rated specialized insurance programs through Casurance, your Authorized Chubb Agent. Technology, Manufacturing, Cyber, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casurance.com/chubb-special-programs" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Chubb Partnership Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <BadgeCheck className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">Authorized Chubb Agent</span>
                <img src={chubbLogo} alt="Chubb Logo" className="h-6 w-auto bg-white rounded px-2 py-1" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Chubb Special Programs
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Access the world's largest P&C insurer through Casurance. A++ rated specialized coverage for technology, manufacturing, cyber, and more.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>A++ AM Best Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span>54 Countries</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>$100M+ Capacity</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8" asChild>
                  <a href="#quote-form">
                    Get a Chubb Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8" asChild>
                  <a href="tel:1-888-254-0089">
                    <Phone className="mr-2 h-5 w-5" /> 1-888-254-0089
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Special Programs Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Chubb Specialized Programs</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                As an Authorized Chubb Agent, Casurance offers access to these industry-leading specialty programs with tailored coverage and competitive pricing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialPrograms.map((program) => (
                <Card key={program.title} className="hover-elevate group">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-xl bg-${program.color}-100 dark:bg-${program.color}-900/30 flex items-center justify-center mb-4`}>
                      <program.icon className={`h-7 w-7 text-${program.color}-600 dark:text-${program.color}-400`} />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">{program.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{program.description}</p>
                    <ul className="space-y-2 mb-6">
                      {program.coverages.map((coverage) => (
                        <li key={coverage} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{coverage}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                      <Link href={program.link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Chubb Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <img src={chubbLogo} alt="Chubb" className="h-10 w-auto" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Chubb?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Chubb is the world's largest publicly traded property and casualty insurer, known for exceptional claims service and specialized expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChubb.map((item) => (
                <Card key={item.title} className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Chubb Capabilities */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Chubb Capacity & Capabilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {chubbCapabilities.map((capability) => (
                  <div key={capability} className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="quote-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  {/* Form Info */}
                  <div className="lg:col-span-2 bg-slate-900 text-white p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={chubbLogo} alt="Chubb" className="h-8 w-auto bg-white rounded px-2 py-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Request a Chubb Quote</h3>
                    <p className="text-slate-300 mb-6">
                      As an Authorized Chubb Agent, we'll connect you with the right specialist for your industry and coverage needs.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        <span>Response within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        <span>Competitive Chubb pricing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        <span>Industry specialists</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-700 pt-6">
                      <p className="text-sm text-slate-400 mb-2">Prefer to call?</p>
                      <a href="tel:1-888-254-0089" className="text-xl font-semibold text-blue-400 hover:text-blue-300">
                        1-888-254-0089
                      </a>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-3 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            data-testid="input-business-name"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Name *</Label>
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
                          <Label htmlFor="email">Email *</Label>
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
                          <Label htmlFor="phone">Phone *</Label>
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
                          <Label htmlFor="state">State *</Label>
                          <Select 
                            value={formData.state} 
                            onValueChange={(v) => setFormData({ ...formData, state: v })}
                          >
                            <SelectTrigger data-testid="select-state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
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
                        <Label htmlFor="programInterest">Program Interest *</Label>
                        <Select 
                          value={formData.programInterest} 
                          onValueChange={(v) => setFormData({ ...formData, programInterest: v })}
                        >
                          <SelectTrigger data-testid="select-program">
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology Companies (DigiTech)</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing (Benchmarq)</SelectItem>
                            <SelectItem value="self-storage">Self Storage Facilities</SelectItem>
                            <SelectItem value="ocean-cargo">Ocean Cargo</SelectItem>
                            <SelectItem value="cyber">Cyber Insurance</SelectItem>
                            <SelectItem value="professional-liability">Professional Liability</SelectItem>
                            <SelectItem value="multiple">Multiple Programs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualRevenue">Annual Revenue</Label>
                        <Select 
                          value={formData.annualRevenue} 
                          onValueChange={(v) => setFormData({ ...formData, annualRevenue: v })}
                        >
                          <SelectTrigger data-testid="select-revenue">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1m">Under $1 Million</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5 Million</SelectItem>
                            <SelectItem value="5m-25m">$5M - $25 Million</SelectItem>
                            <SelectItem value="25m-100m">$25M - $100 Million</SelectItem>
                            <SelectItem value="over-100m">Over $100 Million</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          data-testid="textarea-message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your business and coverage needs..."
                          rows={4}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Request Chubb Quote"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Access Chubb Coverage?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              As your Authorized Chubb Agent, Casurance provides direct access to Chubb's specialized programs with personalized service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <a href="#quote-form">Get Started Today</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                <a href="tel:1-888-254-0089">
                  <Phone className="mr-2 h-5 w-5" /> Call Now
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
