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
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Zap,
  Home,
  Users,
  FileText,
  AlertTriangle,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Wrench,
  Flame,
  Droplets
} from "lucide-react";

const programHighlights = [
  {
    title: "California Admitted Program",
    description: "Package policies for habitational and mixed-use risks with A- (Excellent) AM Best rated carrier",
    features: [
      "TIV Limits up to $10M per location (single building)",
      "TIV Limits up to $15M for multi-building locations",
      "General Liability $1M/$2M aggregate",
      "Package with Habitability Exclusion available"
    ],
    territory: "California",
    icon: MapPin
  },
  {
    title: "California Non-Admitted Program",
    description: "Property-only coverage with no age or construction restrictions (except EIFS)",
    features: [
      "Limits up to $20M per location",
      "No age restrictions",
      "No construction class restrictions",
      "A-VIII AM Best rated carrier"
    ],
    territory: "California",
    icon: Building2
  },
  {
    title: "New York Commercial Program",
    description: "Comprehensive habitational coverage for apartment buildings and condominiums",
    features: [
      "TIV Limits up to $10M (single building)",
      "TIV Limits up to $15M (multi-building)",
      "Must be 11+ units per location",
      "A- (Excellent) AM Best rated carrier"
    ],
    territory: "New York",
    icon: Home
  }
];

const coveragesAvailable = [
  {
    name: "Building/Real Property",
    description: "Comprehensive protection for your building structure and improvements",
    icon: Building2
  },
  {
    name: "Personal Property",
    description: "Coverage for business personal property and contents",
    icon: Briefcase
  },
  {
    name: "Business Interruption",
    description: "Including Extra Expense & Rents with Extended Period of Indemnity up to 180 days",
    icon: Clock
  },
  {
    name: "General Liability",
    description: "$1,000,000 per occurrence / $2,000,000 annual aggregate",
    icon: Shield
  },
  {
    name: "Equipment Breakdown",
    description: "Protection against mechanical and electrical equipment failures",
    icon: Wrench
  },
  {
    name: "Backup of Sewers",
    description: "Coverage for damage from sewer and drain backup",
    icon: Droplets
  },
  {
    name: "Crime Coverage",
    description: "Limits up to $100,000 available for employee theft and related crimes",
    icon: AlertTriangle
  },
  {
    name: "Employee Benefits E&O",
    description: "$1M fixed limit for misadministration of company benefits",
    icon: Users
  },
  {
    name: "Terrorism Coverage",
    description: "Protection against certified acts of terrorism",
    icon: Flame
  },
  {
    name: "Ordinance or Law",
    description: "Up to $100K B&C Combined or 10% of Building Limit (non-admitted)",
    icon: FileText
  }
];

const eligibleClasses = [
  "Apartment Buildings (with or without retail)",
  "Condominium Associations (with or without retail)",
  "Mixed-Use Properties",
  "Multi-Family Residential",
  "Co-op Buildings (varies by program)"
];

const riskRequirements = [
  "Meets all local zoning codes",
  "Fire extinguishers per local ordinances",
  "Two means of egress for all living units",
  "Smoke detectors in every unit and common areas",
  "Exit signs properly located and illuminated",
  "Operating fire alarm system with posted evacuation procedures",
  "HVAC, plumbing, electrical and roofing systems current and adequate",
  "80%+ occupancy rate (120 days for newly built)",
  "Pools fully fenced (4'+ with self-latching gate)",
  "Buildings over 10 stories must be fire resistive, fully sprinklered with central station alarm"
];

const exclusions = [
  "Short-term rentals (Airbnb, VRBO, etc.)",
  "Student or senior housing",
  "Wood shake roofs",
  "EIFS cladding",
  "Aluminum wiring",
  "Federal Pacific Stab-Lok or similar electrical panels",
  "Buildings over 25 stories",
  "Historical landmark designated properties",
  "Single Room Occupancies (SROs)",
  "Armed security services"
];

const faqs = [
  {
    question: "What types of properties are eligible for Granada Habitational coverage?",
    answer: "Granada's habitational program covers apartment buildings, condominium associations, and mixed-use properties with retail components. Properties must have 11+ units (for NY program) and maintain an 80%+ occupancy rate. Both single-building and multi-building locations are eligible."
  },
  {
    question: "What are the property limits available?",
    answer: "For California and New York admitted programs, TIV limits are available up to $10M per location for single buildings and $15M for multi-building locations. The California non-admitted program offers limits up to $20M per location with no age or construction restrictions (except EIFS)."
  },
  {
    question: "Is coverage available for mixed-use properties with retail?",
    answer: "Yes, Granada's habitational programs cover apartment buildings and condominiums with retail components. The retail exposure should be documented on the submission, and COIs should be obtained from mercantile tenants with GL limits equal to or greater than the policy ($1M minimum)."
  },
  {
    question: "What is the Business Interruption coverage?",
    answer: "Business Interruption coverage includes Extra Expense and Rents protection. The non-admitted program offers an Extended Period of Indemnity up to 180 days, providing additional time to restore rental income after a covered loss."
  },
  {
    question: "Are there age restrictions on buildings?",
    answer: "The California non-admitted program has no age restrictions and no construction class restrictions (except EIFS). The admitted programs may have specific underwriting guidelines based on building age, condition, and updates to major systems."
  },
  {
    question: "What safety requirements must properties meet?",
    answer: "Properties must meet all local zoning codes, have proper fire safety equipment including extinguishers and smoke detectors, maintain two means of egress, have operating fire alarms, and keep HVAC, plumbing, electrical and roofing systems current. Buildings over 10 stories must be fire resistive and fully sprinklered."
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

export default function GranadaHabitationalLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    propertyType: "",
    numberOfUnits: "",
    totalInsuredValue: "",
    yearBuilt: "",
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
        insurance_types: ["Granada Habitational Program"],
        property_type: data.propertyType,
        number_of_units: data.numberOfUnits,
        total_insured_value: data.totalInsuredValue,
        year_built: data.yearBuilt,
        message: data.message,
        source: "granada-habitational-landing"
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "A Casurance agent will contact you shortly about your Granada Habitational quote."
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        propertyType: "",
        numberOfUnits: "",
        totalInsuredValue: "",
        yearBuilt: "",
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
    "name": "Granada Habitational Insurance Programs",
    "description": "Commercial package policies for habitational and mixed-use risks including apartments, condominiums, and multi-family residential properties in California and New York.",
    "brand": {
      "@type": "Brand",
      "name": "Granada Insurance Company"
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
        <title>Granada Habitational Insurance | Apartment & Condo Coverage | Casurance</title>
        <meta name="description" content="Granada Insurance Company habitational programs for apartments, condominiums, and mixed-use properties. Coverage up to $20M per location in California and New York. Get a quote today." />
        <meta name="keywords" content="Granada Insurance, habitational insurance, apartment insurance, condo insurance, mixed-use property insurance, commercial property, California habitational, New York habitational" />
        <link rel="canonical" href="https://casurance.net/partners/granada-habitational" />
        <meta property="og:title" content="Granada Habitational Insurance Programs | Casurance" />
        <meta property="og:description" content="Commercial package policies for apartments, condominiums, and mixed-use properties. Up to $20M coverage per location." />
        <meta property="og:url" content="https://casurance.net/partners/granada-habitational" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a5f2a] via-[#228b22] to-[#2e8b57] text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">A- (Excellent) AM Best Rated</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Granada Habitational Programs
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
                Commercial Package Policies for Habitational & Mixed-Use Risks
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Competitive pricing, comprehensive coverage, and boutique-level service for apartment buildings and condominium associations
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>Up to $20M per Location</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>California & New York</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>Mixed-Use Eligible</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-[#1a5f2a] hover:bg-white/90" asChild>
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

        {/* Program Options */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Available Programs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored habitational coverage options for California and New York properties
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {programHighlights.map((program, index) => (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-600/10 p-2 rounded-lg">
                        <program.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        {program.territory}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
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

        {/* Coverages Available */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Coverages Available</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive protection for your habitational investment
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coveragesAvailable.map((coverage, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                        <coverage.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{coverage.name}</h3>
                        <p className="text-sm text-muted-foreground">{coverage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligible Classes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Eligible Property Types</h2>
                <p className="text-muted-foreground mb-6">
                  Granada's habitational programs are designed for multi-family residential properties and associations.
                </p>
                <ul className="space-y-3">
                  {eligibleClasses.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Key Requirements</h2>
                <p className="text-muted-foreground mb-6">
                  Properties must meet safety and operational standards for coverage eligibility.
                </p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {riskRequirements.slice(0, 6).map((req, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Not Eligible */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ineligible Risks</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Certain property types and conditions are not eligible for Granada habitational coverage
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/30">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                  <span className="text-sm text-red-800 dark:text-red-200">{exclusion}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote-form" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Request a Quote</h2>
                <p className="text-muted-foreground">
                  Get competitive pricing for your habitational property. Quotes typically provided within 48-72 hours.
                </p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Property/Business Name</Label>
                        <Input
                          id="businessName"
                          data-testid="input-business-name"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          data-testid="input-contact-name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
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
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({...formData, state: value})}
                        >
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => setFormData({...formData, propertyType: value})}
                        >
                          <SelectTrigger data-testid="select-property-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment Building</SelectItem>
                            <SelectItem value="condo">Condominium Association</SelectItem>
                            <SelectItem value="mixed-use">Mixed-Use Property</SelectItem>
                            <SelectItem value="multi-family">Multi-Family Residential</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfUnits">Number of Units</Label>
                        <Input
                          id="numberOfUnits"
                          type="number"
                          data-testid="input-units"
                          placeholder="e.g., 50"
                          value={formData.numberOfUnits}
                          onChange={(e) => setFormData({...formData, numberOfUnits: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalInsuredValue">Total Insured Value</Label>
                        <Input
                          id="totalInsuredValue"
                          data-testid="input-tiv"
                          placeholder="e.g., $5,000,000"
                          value={formData.totalInsuredValue}
                          onChange={(e) => setFormData({...formData, totalInsuredValue: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearBuilt">Year Built</Label>
                        <Input
                          id="yearBuilt"
                          type="number"
                          data-testid="input-year-built"
                          placeholder="e.g., 1985"
                          value={formData.yearBuilt}
                          onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        data-testid="textarea-message"
                        placeholder="Describe your property, any special features, retail tenants, etc."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about Granada Habitational Programs
                </p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#1a5f2a] via-[#228b22] to-[#2e8b57] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Protect Your Property Investment?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get competitive pricing and comprehensive coverage for your apartment building or condominium association.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#1a5f2a] hover:bg-white/90" asChild>
                <a href="#quote-form">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/partners/chubb">
                  View Other Programs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Back to Partners */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4 text-center">
            <Link href="/coverages" className="text-primary hover:underline inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              View All Coverage Options
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
