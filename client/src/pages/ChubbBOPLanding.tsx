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
  Building2, 
  Shield, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Zap,
  FileText,
  DollarSign,
  Briefcase,
  Stethoscope,
  Microscope,
  Calculator,
  Code,
  Store,
  Factory,
  Utensils,
  Users,
  Landmark,
  Wrench,
  Package
} from "lucide-react";

const expressQuoteClasses = {
  "Financial Services": [
    "Accounting Services",
    "Bookkeeping Services",
    "Commodity Brokers",
    "Consultant - Financial",
    "Certified Public Accountants",
    "Investment Companies",
    "Mortgage Brokers",
    "Auto Appraisers"
  ],
  "Professional Services": [
    "Lawyers",
    "Engineers or Architects",
    "Photographers",
    "Market Research Firm",
    "Notary Public"
  ],
  "Healthcare": [
    "Dental Offices",
    "General Health Practitioners",
    "Psychologists",
    "Chiropractors",
    "Optometrists",
    "Medical Office - Cardiologists",
    "Medical Office - Dermatologists",
    "Medical Office - Pediatricians",
    "Medical Office - Orthopedic Surgeons",
    "Medical Office - Psychiatrists",
    "Medical Office - Urologists",
    "Medical Diagnostic Centers",
    "Temporary Medical Staffing Agency",
    "Medical Supply Store"
  ],
  "Technology": [
    "Computer Software and Services",
    "Website Design and Online Marketing",
    "Data Processing Services",
    "Health Technology Software Development"
  ],
  "Life Sciences": [
    "Medical Device R&D",
    "Pharmaceutical R&D",
    "Biotechnology R&D",
    "Medical Device Manufacturing",
    "Medical Device Distributors",
    "Medical Device Retail",
    "Dietary Supplement Manufacturing"
  ],
  "Other Services": [
    "Printing - Quick Printers",
    "Shoe Repair",
    "Videographers",
    "Watch or Clock Repair",
    "Window Treatment Installation",
    "Upholstery Services - Shop Only",
    "Ticket Agencies - Theatrical"
  ],
  "Retailers": [
    "Florists",
    "Home Furnishings Stores",
    "Sporting Goods Stores",
    "Gift Shops",
    "Coffee Shops",
    "Clothing Stores",
    "Hardware Stores"
  ],
  "Wholesalers": [
    "Hardware and Tools",
    "Clothing",
    "Sporting Goods",
    "Home Furnishings",
    "Manufacturers Representatives"
  ],
  "Manufacturing": [
    "Furniture Manufacturing",
    "Jewelry Manufacturing",
    "Leather Goods Manufacturing",
    "Lighting Fixtures Manufacturing",
    "Paper Goods Manufacturing",
    "Clock Manufacturing",
    "Glass or Glassware Manufacturing",
    "Metal Goods Manufacturing"
  ],
  "Food Manufacturing": [
    "Bakery Plants",
    "Candy or Confectionery Products",
    "Dry Food Products",
    "Pet Food Manufacturing",
    "Coffee and Tea Manufacturing"
  ],
  "Clubs & Associations": [
    "Foundation - Charitable",
    "Library",
    "Museum - Not For Profit"
  ]
};

const coverageHighlights = [
  {
    icon: Shield,
    title: "Lawsuit Defense",
    description: "Covers you if sued for bodily injury, property damage, or personal and advertising injury."
  },
  {
    icon: DollarSign,
    title: "Damages Coverage",
    description: "Pays damages you're legally obligated to pay, including interest and attorney fees."
  },
  {
    icon: Building2,
    title: "Loss of Business Income",
    description: "Covers lost income and extra expenses while your business is recovering from covered damage."
  },
  {
    icon: FileText,
    title: "Electronic Data",
    description: "Pays to restore or replace electronic data destroyed by physical damage or computer virus."
  },
  {
    icon: Users,
    title: "Employee Dishonesty",
    description: "Covers losses from dishonest or criminal acts by employees."
  },
  {
    icon: Package,
    title: "Business Personal Property",
    description: "Protects all business property, fixtures, signs, and leased equipment."
  }
];

const whatsNotCovered = [
  "Expected or Intended Injury",
  "Pollution",
  "Liquor Liability",
  "Workers Compensation",
  "War",
  "Professional Services",
  "Aircraft, Auto, or Watercraft",
  "Vehicles"
];

const faqs = [
  {
    question: "What is a Business Owner's Policy (BOP)?",
    answer: "A Business Owner's Policy (BOP) combines property insurance, liability coverage, and business interruption insurance into one convenient package. It's designed for small to mid-sized businesses and provides broad protection at a competitive price."
  },
  {
    question: "What makes Chubb BOP Express Quote different?",
    answer: "Chubb BOP Express Quote uses third-party data to pre-populate commonly selected coverage options, reducing quote entry time by about half. You can get a bindable quote in minutes for nearly 400 eligible business classes."
  },
  {
    question: "Is my business eligible for Chubb BOP Express Quote?",
    answer: "Chubb BOP Express Quote is available for 9 of the top 10 quoted classes and nearly 400 total classes across financial services, healthcare, technology, retail, manufacturing, and more. Contact us to check your eligibility."
  },
  {
    question: "Can I customize the BOP coverage?",
    answer: "Yes! While Express Quote pre-populates common coverage options, you can easily edit any part of the quote, add optional coverages, or include additional lines of business to tailor protection to your needs."
  },
  {
    question: "What property is covered under a Chubb BOP?",
    answer: "Chubb BOP covers business personal property (owned or used in your business), other people's belongings, signs, fixtures, glass, tenant improvements, and leased equipment. You can choose actual cash value or replacement cost coverage."
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

export default function ChubbBOPLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    businessType: "",
    annualRevenue: "",
    employeeCount: "",
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
        insurance_type: "Chubb Business Owner's Policy (BOP)",
        business_type: data.businessType,
        notes: `Annual Revenue: ${data.annualRevenue}\nEmployees: ${data.employeeCount}\n${data.notes}`
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your Chubb BOP quote.",
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        businessType: "",
        annualRevenue: "",
        employeeCount: "",
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
    "name": "Chubb Business Owner's Policy (BOP)",
    "description": "Comprehensive property and liability protection bundled for small to mid-sized businesses. Get bindable quotes in minutes with Chubb Express Quote.",
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
        <title>Chubb Business Owner's Policy (BOP) | Express Quote | Casurance</title>
        <meta name="description" content="Get a bindable Chubb BOP quote in minutes. Property and liability coverage for nearly 400 business classes. Express Quote available for financial services, healthcare, technology, and more." />
        <meta name="keywords" content="Chubb BOP, business owners policy, commercial insurance, property liability, Chubb Express Quote, small business insurance" />
        <link rel="canonical" href="https://casurance.net/partners/chubb-bop" />
        <meta property="og:title" content="Chubb Business Owner's Policy (BOP) | Express Quote | Casurance" />
        <meta property="og:description" content="Get comprehensive property and liability coverage with Chubb BOP. Bindable quotes in minutes for nearly 400 eligible business classes." />
        <meta property="og:url" content="https://casurance.net/partners/chubb-bop" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex flex-col items-center gap-2 bg-white rounded-lg px-5 py-3">
                      <img src={chubbLogo} alt="Chubb Logo" className="h-12 w-auto" data-testid="img-chubb-logo" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Authorized Agent</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur rounded-full px-4 py-2">
                      <Zap className="h-5 w-5 text-green-300" />
                      <span className="text-sm font-medium">Express Quote</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Chubb Business Owner's Policy (BOP)
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Get bindable BOP quotes in minutes with Chubb Express Quote. Comprehensive property and liability protection for nearly 400 eligible business classes.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Clock className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-2xl font-bold">50%</div>
                      <div className="text-sm text-white/70">Faster Quotes</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Briefcase className="h-6 w-6 mb-2 text-white/80" />
                      <div className="text-2xl font-bold">400+</div>
                      <div className="text-sm text-white/70">Eligible Classes</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Property Coverage", "Liability Protection", "Business Income", "Fully Customizable"].map((benefit, index) => (
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
                    <CardTitle className="text-xl">Request a Chubb BOP Quote</CardTitle>
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
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input
                          id="businessType"
                          value={formData.businessType}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                          placeholder="e.g., Accounting Firm, Dental Office"
                          data-testid="input-business-type"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="annualRevenue">Annual Revenue</Label>
                          <Select value={formData.annualRevenue} onValueChange={(value) => setFormData(prev => ({ ...prev, annualRevenue: value }))}>
                            <SelectTrigger data-testid="select-revenue">
                              <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-250k">Under $250,000</SelectItem>
                              <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                              <SelectItem value="500k-1m">$500,000 - $1 Million</SelectItem>
                              <SelectItem value="1m-5m">$1 Million - $5 Million</SelectItem>
                              <SelectItem value="5m-plus">$5 Million+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="employeeCount">Employees</Label>
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
                              <SelectItem value="100-plus">100+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Tell us about your coverage needs..."
                          className="resize-none"
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
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

          {/* Coverage Highlights */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-coverage-title">
                  What's Covered in a Chubb BOP?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive protection for your business property, liability exposures, and business operations.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageHighlights.map((coverage, index) => (
                  <Card key={index} className="p-6" data-testid={`card-coverage-${index}`}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <coverage.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{coverage.title}</h3>
                    <p className="text-sm text-muted-foreground">{coverage.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Express Quote Classes */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full px-4 py-2 mb-4">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Express Quote Eligible</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-classes-title">
                  Eligible Business Classes
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Chubb BOP Express Quote is available for nearly 400 business classes. Here are some of the most common eligible segments.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {Object.entries(expressQuoteClasses).map(([category, classes], index) => (
                  <AccordionItem key={index} value={`category-${index}`} className="bg-background rounded-lg border px-4">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{category}</span>
                        <span className="text-sm text-muted-foreground">({classes.length} classes)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pb-4">
                        {classes.map((cls, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {cls}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">Don't see your business type? Contact us - we cover many additional classes.</p>
                <a href="tel:18882540089">
                  <Button variant="outline" data-testid="button-call-classes">
                    <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* What's Not Covered */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6 text-center" data-testid="text-exclusions-title">
                Common BOP Exclusions
              </h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  Like all insurance policies, a BOP has certain exclusions. These risks typically require separate coverage:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {whatsNotCovered.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Casurance can help you obtain additional coverage for these exposures. Contact us for a comprehensive risk assessment.
                </p>
              </Card>
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
          <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Get Your Chubb BOP Quote Today
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Protect your business with comprehensive coverage from the world's largest P&C insurer. Bindable quotes in minutes with Express Quote.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-cta">
                    Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="tel:18882540089">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" data-testid="button-call-cta">
                    <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Casurance | CA License #6005562 | Authorized Chubb Agent
              </p>
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
