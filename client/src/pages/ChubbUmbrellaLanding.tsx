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
  Umbrella, 
  Shield, 
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Building2,
  Car,
  Users,
  FileText,
  Scale,
  TrendingUp
} from "lucide-react";
import { SERVICE_STATES } from "@shared/constants/states";

const coverageFeatures = [
  {
    icon: DollarSign,
    title: "Excess Liability Limits",
    description: "Additional liability protection that kicks in when your primary policy limits are exhausted, often up to $25 million or more."
  },
  {
    icon: Shield,
    title: "Drop-Down Coverage",
    description: "Fills gaps in your underlying policies by covering claims that may be excluded from your primary coverage."
  },
  {
    icon: Scale,
    title: "Defense Costs",
    description: "Covers legal defense costs and court expenses beyond your primary policy limits."
  },
  {
    icon: Building2,
    title: "Property Damage",
    description: "Extended coverage for property damage claims that exceed your primary liability policy limits."
  },
  {
    icon: Users,
    title: "Bodily Injury",
    description: "Additional protection for bodily injury claims, including medical expenses and legal judgments."
  },
  {
    icon: Car,
    title: "Auto Liability",
    description: "Excess coverage over your commercial auto policy for accidents involving company vehicles."
  }
];

const underlyingPolicies = [
  "Commercial General Liability",
  "Commercial Auto Liability",
  "Employers Liability (Workers' Comp)",
  "Professional Liability",
  "Directors & Officers (D&O)",
  "Employment Practices Liability"
];

const whoNeeds = [
  "Businesses with significant assets to protect",
  "Companies with high liability exposure",
  "Contractors and construction firms",
  "Property owners and landlords",
  "Transportation and delivery businesses",
  "Professional service firms",
  "Manufacturing operations",
  "Hospitality and entertainment businesses"
];

const faqs = [
  {
    question: "What is commercial umbrella insurance?",
    answer: "Commercial umbrella insurance provides additional liability coverage above and beyond your underlying business policies. It kicks in when claims exceed the limits of your primary policies (like general liability or commercial auto) and can also provide coverage for claims that may not be covered by your primary policies."
  },
  {
    question: "How much umbrella coverage do I need?",
    answer: "The amount depends on your business's assets, industry risk, and potential liability exposure. Many businesses carry $1-5 million in umbrella coverage, while larger or higher-risk operations may need $10-25 million or more. Our agents can help you assess your needs."
  },
  {
    question: "What's the difference between umbrella and excess liability?",
    answer: "While often used interchangeably, umbrella policies typically provide broader coverage and can 'drop down' to cover claims excluded by underlying policies. Excess liability policies simply extend the limits of specific underlying policies without adding breadth of coverage."
  },
  {
    question: "What underlying policies do I need for umbrella coverage?",
    answer: "Most umbrella policies require you to have certain underlying policies in place, typically commercial general liability and commercial auto at minimum. The umbrella carrier will specify required minimum limits for each underlying policy."
  },
  {
    question: "Why choose Chubb for commercial umbrella?",
    answer: "Chubb offers some of the highest available limits, broad coverage forms, competitive rates, and the financial strength of an A++ rated carrier. Their umbrella policies can be customized to fit your specific risk profile and coordinated with other Chubb coverages."
  }
];

export default function ChubbUmbrellaLanding() {
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
    currentCoverage: "",
    desiredLimit: "",
    notes: ""
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
        insurance_type: "Chubb Commercial Umbrella",
        business_type: data.industry,
        notes: `Current Coverage: ${data.currentCoverage}\nDesired Limit: ${data.desiredLimit}\n${data.notes}`
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your Chubb Umbrella quote.",
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
        currentCoverage: "",
        desiredLimit: "",
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
    "name": "Chubb Commercial Umbrella Insurance",
    "description": "Excess liability protection that goes beyond your primary policies. High limits available from an A++ rated carrier.",
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
        <title>Chubb Commercial Umbrella Insurance | Excess Liability | Casurance</title>
        <meta name="description" content="Protect your business with Chubb Commercial Umbrella insurance. Excess liability coverage up to $25 million or more from an A++ rated carrier. Request a quote today." />
        <meta name="keywords" content="Chubb umbrella insurance, commercial umbrella, excess liability, high limit liability, business umbrella coverage" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-umbrella" />
        <meta property="og:title" content="Chubb Commercial Umbrella Insurance | Excess Liability | Casurance" />
        <meta property="og:description" content="Extra liability protection that goes beyond your primary policies. High limits available from Chubb." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex flex-col items-center gap-2 bg-white rounded-lg px-5 py-3 mb-6 w-fit">
                    <img src={chubbLogo} alt="Chubb Logo" className="h-12 w-auto" data-testid="img-chubb-logo" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Authorized Agent</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Chubb Commercial Umbrella Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Extra liability protection that goes beyond your primary policies. Safeguard your business assets with high-limit coverage from the world's leading commercial insurer.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <TrendingUp className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">$25M+</div>
                      <div className="text-sm text-white/70">Available Limits</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Shield className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-lg font-bold">A++ Rated</div>
                      <div className="text-sm text-white/70">AM Best Rating</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Excess Limits", "Drop-Down Coverage", "Defense Costs", "Broad Territory"].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-purple-300" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote Form */}
                <Card className="bg-white text-foreground shadow-2xl" data-testid="card-quote-form">
                  <CardHeader>
                    <CardTitle className="text-xl">Request an Umbrella Quote</CardTitle>
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

                      <div>
                        <Label htmlFor="address">Business Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="123 Main St, City, State ZIP"
                          data-testid="input-address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                            <SelectTrigger data-testid="select-state">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="effectiveDate">Desired Effective Date</Label>
                          <Input
                            id="effectiveDate"
                            type="date"
                            value={formData.effectiveDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
                            data-testid="input-effective-date"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                          placeholder="e.g., Construction, Manufacturing"
                          data-testid="input-industry"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentCoverage">Current Liability Limit</Label>
                          <Select value={formData.currentCoverage} onValueChange={(value) => setFormData(prev => ({ ...prev, currentCoverage: value }))}>
                            <SelectTrigger data-testid="select-current">
                              <SelectValue placeholder="Select Limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">$1 Million</SelectItem>
                              <SelectItem value="2m">$2 Million</SelectItem>
                              <SelectItem value="3m">$3 Million</SelectItem>
                              <SelectItem value="5m">$5 Million</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="desiredLimit">Desired Umbrella Limit</Label>
                          <Select value={formData.desiredLimit} onValueChange={(value) => setFormData(prev => ({ ...prev, desiredLimit: value }))}>
                            <SelectTrigger data-testid="select-desired">
                              <SelectValue placeholder="Select Limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">$1 Million</SelectItem>
                              <SelectItem value="2m">$2 Million</SelectItem>
                              <SelectItem value="5m">$5 Million</SelectItem>
                              <SelectItem value="10m">$10 Million</SelectItem>
                              <SelectItem value="25m">$25 Million</SelectItem>
                              <SelectItem value="higher">Higher</SelectItem>
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
                          placeholder="Tell us about your current coverage..."
                          className="resize-none"
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-purple-600 hover:bg-purple-700" 
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
                  What Does Commercial Umbrella Cover?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Umbrella insurance provides an additional layer of protection above your underlying liability policies.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageFeatures.map((feature, index) => (
                  <Card key={index} className="p-6" data-testid={`card-feature-${index}`}>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Underlying Policies */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6" data-testid="text-underlying-title">
                    Works With Your Underlying Policies
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Commercial umbrella insurance provides excess coverage over your existing business liability policies. Here are common underlying policies that work with umbrella coverage:
                  </p>
                  <div className="space-y-3">
                    {underlyingPolicies.map((policy, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span>{policy}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6" data-testid="text-who-needs-title">
                    Who Needs Commercial Umbrella?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Any business with significant assets or liability exposure should consider umbrella coverage. Common candidates include:
                  </p>
                  <div className="space-y-3">
                    {whoNeeds.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Umbrella className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
          <section className="py-16 bg-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Protect Your Business With Extra Coverage
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Don't let a major claim exhaust your liability limits. Get umbrella coverage from Chubb to protect your business assets.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-cta">
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
