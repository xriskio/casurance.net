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
  Users, 
  Shield, 
  Heart,
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  FileText,
  HardHat,
  Briefcase,
  Activity,
  Clock,
  DollarSign,
  TrendingUp
} from "lucide-react";

const coverageFeatures = [
  {
    icon: Heart,
    title: "Medical Coverage",
    description: "Covers medical expenses for work-related injuries and illnesses, including doctor visits, surgery, and rehabilitation."
  },
  {
    icon: DollarSign,
    title: "Wage Replacement",
    description: "Provides partial wage replacement when employees are unable to work due to a covered injury or illness."
  },
  {
    icon: Activity,
    title: "Rehabilitation Services",
    description: "Covers physical therapy, vocational rehabilitation, and other services to help employees return to work."
  },
  {
    icon: FileText,
    title: "Death Benefits",
    description: "Provides benefits to dependents if an employee dies as a result of a work-related injury or illness."
  },
  {
    icon: Shield,
    title: "Employer's Liability",
    description: "Protects your business from lawsuits by injured employees or their families beyond workers' comp benefits."
  },
  {
    icon: TrendingUp,
    title: "Risk Management",
    description: "Access to Chubb's loss control services to help prevent workplace injuries and reduce claims."
  }
];

const industries = [
  { name: "Manufacturing", icon: HardHat },
  { name: "Construction", icon: HardHat },
  { name: "Healthcare", icon: Heart },
  { name: "Professional Services", icon: Briefcase },
  { name: "Retail & Wholesale", icon: Briefcase },
  { name: "Technology", icon: Briefcase },
  { name: "Hospitality", icon: Briefcase },
  { name: "Financial Services", icon: Briefcase }
];

const benefits = [
  "A++ AM Best rated carrier",
  "Dedicated claims adjusters",
  "Risk management services",
  "Return-to-work programs",
  "Competitive rates",
  "Loss control expertise",
  "24/7 claims reporting",
  "Experienced underwriting"
];

const faqs = [
  {
    question: "What does workers' compensation insurance cover?",
    answer: "Workers' compensation covers medical expenses, wage replacement, rehabilitation costs, and death benefits for employees who are injured or become ill as a result of their job. It also provides employer's liability coverage to protect your business from related lawsuits."
  },
  {
    question: "Is workers' compensation insurance required?",
    answer: "In most states, workers' compensation is required by law for businesses with employees. Requirements vary by state, so contact us to understand your obligations and find the right coverage."
  },
  {
    question: "How are workers' comp premiums calculated?",
    answer: "Premiums are based on several factors including your industry classification, payroll, claims history (experience modification), and state requirements. Chubb's risk management services can help you reduce premiums over time."
  },
  {
    question: "What makes Chubb workers' comp different?",
    answer: "Chubb offers dedicated claims adjusters, proactive risk management services, return-to-work programs, and the financial strength of an A++ rated carrier. Their goal is to help you prevent claims and manage costs effectively."
  },
  {
    question: "How do I file a workers' comp claim with Chubb?",
    answer: "Chubb offers 24/7 claims reporting. You can file claims online, by phone, or through your Casurance agent. Dedicated claims adjusters will guide you through the process and work to resolve claims quickly."
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

export default function ChubbWorkersCompLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    industry: "",
    employeeCount: "",
    annualPayroll: "",
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
        insurance_type: "Chubb Workers' Compensation",
        business_type: data.industry,
        notes: `Employees: ${data.employeeCount}\nAnnual Payroll: ${data.annualPayroll}\n${data.notes}`
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your Chubb Workers' Comp quote.",
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        industry: "",
        employeeCount: "",
        annualPayroll: "",
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
    "name": "Chubb Workers' Compensation Insurance",
    "description": "Comprehensive workers' compensation coverage backed by Chubb's claims expertise, risk management services, and A++ financial strength.",
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
        <title>Chubb Workers' Compensation Insurance | Casurance</title>
        <meta name="description" content="Protect your employees and business with Chubb Workers' Compensation insurance. A++ rated carrier with dedicated claims adjusters, risk management services, and return-to-work programs." />
        <meta name="keywords" content="Chubb workers comp, workers compensation insurance, employee injury coverage, workplace insurance, Chubb authorized agent" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-workers-comp" />
        <meta property="og:title" content="Chubb Workers' Compensation Insurance | Casurance" />
        <meta property="og:description" content="Comprehensive workers' compensation coverage backed by Chubb's A++ financial strength and claims expertise." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex flex-col items-center gap-2 bg-white rounded-lg px-5 py-3 mb-6 w-fit">
                    <img src={chubbLogo} alt="Chubb Logo" className="h-12 w-auto" data-testid="img-chubb-logo" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Authorized Agent</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Chubb Workers' Compensation Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Protect your employees and your business with comprehensive workers' comp coverage backed by Chubb's industry-leading claims expertise and risk management services.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Users className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">Employee Protection</div>
                      <div className="text-sm text-white/70">Medical & Wage Coverage</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Shield className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">Employer's Liability</div>
                      <div className="text-sm text-white/70">Lawsuit Protection</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-300" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote Form */}
                <Card className="bg-white text-foreground shadow-2xl" data-testid="card-quote-form">
                  <CardHeader>
                    <CardTitle className="text-xl">Request a Workers' Comp Quote</CardTitle>
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
                              {industries.map((ind) => (
                                <SelectItem key={ind.name} value={ind.name}>{ind.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employeeCount">Number of Employees</Label>
                          <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                            <SelectTrigger data-testid="select-employees">
                              <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5</SelectItem>
                              <SelectItem value="6-10">6-10</SelectItem>
                              <SelectItem value="11-25">11-25</SelectItem>
                              <SelectItem value="26-50">26-50</SelectItem>
                              <SelectItem value="51-100">51-100</SelectItem>
                              <SelectItem value="100-250">100-250</SelectItem>
                              <SelectItem value="250-plus">250+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="annualPayroll">Annual Payroll</Label>
                          <Select value={formData.annualPayroll} onValueChange={(value) => setFormData(prev => ({ ...prev, annualPayroll: value }))}>
                            <SelectTrigger data-testid="select-payroll">
                              <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-100k">Under $100,000</SelectItem>
                              <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                              <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                              <SelectItem value="500k-1m">$500,000 - $1 Million</SelectItem>
                              <SelectItem value="1m-5m">$1 Million - $5 Million</SelectItem>
                              <SelectItem value="5m-plus">$5 Million+</SelectItem>
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
                          placeholder="Tell us about your business operations..."
                          className="resize-none"
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700" 
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
                  Comprehensive Workers' Compensation Coverage
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Protect your employees and business with coverage that goes beyond the basics.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageFeatures.map((feature, index) => (
                  <Card key={index} className="p-6" data-testid={`card-feature-${index}`}>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Chubb */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-why-title">
                    Why Chubb for Workers' Compensation?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Chubb brings unmatched financial strength, claims expertise, and risk management resources to protect your workforce and your bottom line.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="p-8 bg-green-600 text-white">
                  <div className="text-center">
                    <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">A++ (Superior)</h3>
                    <p className="text-white/80 mb-4">AM Best Financial Strength Rating</p>
                    <p className="text-sm text-white/70">
                      Chubb is the world's largest publicly traded property and casualty insurer, providing unmatched financial security for your workers' compensation claims.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 rounded-lg border px-4">
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
          <section className="py-16 bg-green-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Protect Your Workforce Today
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Get comprehensive workers' compensation coverage backed by Chubb's A++ financial strength and claims expertise.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-cta">
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
                <Link href="/partners/chubb-umbrella">
                  <Button variant="ghost" data-testid="link-umbrella">
                    Commercial Umbrella <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/partners/chubb-cyber">
                  <Button variant="ghost" data-testid="link-cyber">
                    Cyber Liability <ArrowRight className="ml-2 h-4 w-4" />
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
