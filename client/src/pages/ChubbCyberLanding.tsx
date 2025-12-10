import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import chubbLogo from "@assets/Chubb-Logo_1765399296913.jpg";
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
  Lock, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Server,
  Users,
  FileText,
  Clock,
  DollarSign,
  Globe,
  Database,
  Mail,
  CreditCard
} from "lucide-react";

const coverageFeatures = [
  {
    icon: Database,
    title: "Data Breach Response",
    description: "Covers costs to investigate, notify affected parties, and provide credit monitoring services after a data breach."
  },
  {
    icon: Clock,
    title: "Business Interruption",
    description: "Covers lost income and extra expenses when a cyber incident disrupts your operations."
  },
  {
    icon: AlertTriangle,
    title: "Cyber Extortion",
    description: "Covers ransom payments and related expenses in response to ransomware and cyber extortion threats."
  },
  {
    icon: Shield,
    title: "Network Security Liability",
    description: "Covers claims arising from security failures that result in data theft or system damage to third parties."
  },
  {
    icon: FileText,
    title: "Regulatory Defense",
    description: "Covers legal defense costs and fines from regulatory investigations following a cyber incident."
  },
  {
    icon: Globe,
    title: "24/7 Incident Response",
    description: "Access to Chubb's expert cyber incident response team around the clock."
  }
];

const cyberRisks = [
  { icon: Lock, title: "Ransomware Attacks", description: "Malicious software that encrypts your data and demands payment" },
  { icon: Mail, title: "Phishing Scams", description: "Fraudulent emails designed to steal credentials or funds" },
  { icon: Database, title: "Data Breaches", description: "Unauthorized access to sensitive customer or business data" },
  { icon: Server, title: "System Outages", description: "Cyber attacks that disable your business operations" },
  { icon: CreditCard, title: "Payment Card Fraud", description: "Theft of payment card information from your systems" },
  { icon: Users, title: "Social Engineering", description: "Manipulation of employees to gain access or transfer funds" }
];

const eligibleBusinesses = [
  "Professional Services",
  "Healthcare & Medical",
  "Financial Services",
  "Technology Companies",
  "Retail & E-commerce",
  "Manufacturing",
  "Educational Institutions",
  "Non-Profit Organizations",
  "Hospitality",
  "Real Estate"
];

const faqs = [
  {
    question: "What is cyber liability insurance?",
    answer: "Cyber liability insurance protects businesses from financial losses caused by data breaches, cyber attacks, and other digital threats. It covers costs like data breach response, business interruption, cyber extortion, regulatory fines, and legal defense."
  },
  {
    question: "Do small businesses need cyber insurance?",
    answer: "Yes. Small businesses are often targeted by cybercriminals because they typically have fewer security resources. A single cyber attack can be devastating for a small business. Cyber insurance provides essential protection and access to expert response resources."
  },
  {
    question: "What does Chubb cyber insurance cover?",
    answer: "Chubb cyber insurance covers data breach response costs, business interruption losses, cyber extortion payments, regulatory defense and fines, network security liability, and media liability. You also get 24/7 access to Chubb's cyber incident response team."
  },
  {
    question: "How much cyber coverage do I need?",
    answer: "Coverage needs depend on your business size, industry, data you handle, and regulatory requirements. Most small to mid-sized businesses carry $1-5 million in coverage. Our agents can help you assess your risk and recommend appropriate limits."
  },
  {
    question: "What makes Chubb cyber insurance different?",
    answer: "Chubb offers comprehensive coverage, competitive rates, and access to their world-class cyber incident response team. Their policies include proactive risk management resources and the financial backing of an A++ rated carrier."
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

export default function ChubbCyberLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    industry: "",
    annualRevenue: "",
    recordsStored: "",
    notes: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        insurance_type: "Chubb Cyber Liability",
        business_type: data.industry,
        notes: `Annual Revenue: ${data.annualRevenue}\nRecords Stored: ${data.recordsStored}\n${data.notes}`
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your Chubb Cyber quote.",
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        industry: "",
        annualRevenue: "",
        recordsStored: "",
        notes: ""
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Required Fields Missing",
        description: "Please complete all required fields to submit your quote request.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Chubb Cyber Liability Insurance",
    "description": "Comprehensive cyber insurance protecting businesses from data breaches, ransomware, and digital threats with 24/7 incident response.",
    "brand": {
      "@type": "Brand",
      "name": "Chubb"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "InsuranceAgency",
        "name": "Casurance",
        "telephone": "+1-888-254-0089"
      }
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
        <title>Chubb Cyber Liability Insurance | Data Breach Coverage | Casurance</title>
        <meta name="description" content="Protect your business from cyber attacks with Chubb Cyber Liability insurance. Data breach response, ransomware coverage, and 24/7 incident response from an A++ rated carrier." />
        <meta name="keywords" content="Chubb cyber insurance, cyber liability, data breach coverage, ransomware insurance, cyber security insurance" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-cyber" />
        <meta property="og:title" content="Chubb Cyber Liability Insurance | Data Breach Coverage | Casurance" />
        <meta property="og:description" content="Comprehensive cyber protection with 24/7 incident response from Chubb. Protect against data breaches, ransomware, and digital threats." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex flex-col items-center gap-1 bg-white rounded-lg px-4 py-2">
                      <img src={chubbLogo} alt="Chubb Logo" className="h-8 w-auto" data-testid="img-chubb-logo" />
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Authorized Agent</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/30 backdrop-blur rounded-full px-4 py-2">
                      <Clock className="h-5 w-5 text-red-200" />
                      <span className="text-sm font-medium">24/7 Response</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Chubb Cyber Liability Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Protect your business from cyber attacks, data breaches, and digital threats with comprehensive coverage and 24/7 incident response from the world's leading insurer.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Lock className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">Data Breach</div>
                      <div className="text-sm text-white/70">Response Coverage</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <AlertTriangle className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">Ransomware</div>
                      <div className="text-sm text-white/70">Extortion Coverage</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["24/7 Response Team", "Business Interruption", "Regulatory Defense", "A++ Rated"].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-red-300" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote Form */}
                <Card className="bg-white text-foreground shadow-2xl" data-testid="card-quote-form">
                  <CardHeader>
                    <CardTitle className="text-xl">Request a Cyber Quote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                            placeholder="Your Business"
                            required
                            data-testid="input-business-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactName">Contact Name *</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                            placeholder="Your Name"
                            required
                            data-testid="input-contact-name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@example.com"
                            required
                            data-testid="input-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="(555) 123-4567"
                            required
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                            <SelectTrigger data-testid="select-state">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              {usStates.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                            <SelectTrigger data-testid="select-industry">
                              <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {eligibleBusinesses.map((ind) => (
                                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="annualRevenue">Annual Revenue</Label>
                          <Select value={formData.annualRevenue} onValueChange={(value) => setFormData(prev => ({ ...prev, annualRevenue: value }))}>
                            <SelectTrigger data-testid="select-revenue">
                              <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-500k">Under $500,000</SelectItem>
                              <SelectItem value="500k-1m">$500,000 - $1 Million</SelectItem>
                              <SelectItem value="1m-5m">$1 Million - $5 Million</SelectItem>
                              <SelectItem value="5m-25m">$5 Million - $25 Million</SelectItem>
                              <SelectItem value="25m-plus">$25 Million+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="recordsStored">Records Stored</Label>
                          <Select value={formData.recordsStored} onValueChange={(value) => setFormData(prev => ({ ...prev, recordsStored: value }))}>
                            <SelectTrigger data-testid="select-records">
                              <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1k">Under 1,000</SelectItem>
                              <SelectItem value="1k-10k">1,000 - 10,000</SelectItem>
                              <SelectItem value="10k-100k">10,000 - 100,000</SelectItem>
                              <SelectItem value="100k-1m">100,000 - 1 Million</SelectItem>
                              <SelectItem value="1m-plus">1 Million+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Information</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Tell us about your data security concerns..."
                          className="resize-none"
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700" 
                        size="lg"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Request Quote"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Or call us at <a href="tel:18882540089" className="text-primary font-medium">1-888-254-0089</a>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Coverage Features */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-coverage-title">
                  Comprehensive Cyber Protection
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Chubb cyber insurance covers the full spectrum of cyber risks your business faces in today's digital world.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageFeatures.map((feature, index) => (
                  <Card key={index} className="p-6" data-testid={`card-feature-${index}`}>
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Cyber Risks */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-risks-title">
                  Cyber Threats We Protect Against
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Cyber attacks are becoming more sophisticated and costly. Chubb helps you stay protected.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cyberRisks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-4 bg-background rounded-lg p-4 border">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <risk.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{risk.title}</h3>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-industries-title">
                  Industries We Protect
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every business that uses technology is at risk. Chubb provides cyber coverage tailored to your industry.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {eligibleBusinesses.map((industry, index) => (
                  <div 
                    key={index} 
                    className="bg-muted/50 rounded-lg p-4 text-center hover:bg-muted transition-colors"
                    data-testid={`industry-${index}`}
                  >
                    <Lock className="h-6 w-6 mx-auto mb-2 text-red-500" />
                    <span className="text-sm font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-4">
                    <AccordionTrigger className="hover:no-underline text-left py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-red-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Protect Your Business From Cyber Threats
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Don't wait for a cyber attack to realize you need protection. Get comprehensive coverage from Chubb today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-cta">
                    Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="tel:18882540089">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" data-testid="button-call-cta">
                    <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Back to Chubb Products */}
          <section className="py-8 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/partners/chubb">
                  <Button variant="ghost" data-testid="link-back-chubb">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> All Chubb Products
                  </Button>
                </Link>
                <Link href="/partners/chubb-bop">
                  <Button variant="ghost" data-testid="link-bop">
                    Business Owner's Policy <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/partners/chubb-workers-comp">
                  <Button variant="ghost" data-testid="link-workers-comp">
                    Workers' Compensation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/partners/chubb-umbrella">
                  <Button variant="ghost" data-testid="link-umbrella">
                    Commercial Umbrella <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
