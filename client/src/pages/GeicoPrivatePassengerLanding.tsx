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
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  Award,
  Car,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Star,
  Users,
  Home,
  Umbrella,
  DollarSign,
  Heart
} from "lucide-react";

import geicoLogoBlue from "@assets/heritage-blue-logo_1765255910834.png";
import geicoLogoWhite from "@assets/white-logo_1765255910834.png";

const ppaStates = [
  { name: "Montana", abbr: "MT" },
  { name: "Oregon", abbr: "OR" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Indiana", abbr: "IN" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Ohio", abbr: "OH" },
  { name: "Virginia", abbr: "VA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Georgia", abbr: "GA" },
];

const coverageTypes = [
  { 
    icon: Shield, 
    title: "Liability Coverage", 
    description: "Protection when you're at fault for an accident. Covers bodily injury and property damage to others.",
  },
  { 
    icon: Car, 
    title: "Collision Coverage", 
    description: "Repairs or replaces your vehicle after an accident, regardless of who's at fault.",
  },
  { 
    icon: Umbrella, 
    title: "Comprehensive Coverage", 
    description: "Protection against theft, vandalism, weather damage, and other non-collision incidents.",
  },
  { 
    icon: Heart, 
    title: "Medical Payments", 
    description: "Covers medical expenses for you and your passengers, regardless of fault.",
  },
  { 
    icon: Users, 
    title: "Uninsured Motorist", 
    description: "Protection when hit by a driver without insurance or in a hit-and-run accident.",
  },
  { 
    icon: DollarSign, 
    title: "Rental Reimbursement", 
    description: "Covers rental car costs while your vehicle is being repaired after a covered claim.",
  },
];

const vehicleTypes = [
  "Sedan/Coupe",
  "SUV/Crossover",
  "Pickup Truck",
  "Minivan",
  "Sports Car",
  "Electric/Hybrid",
  "Motorcycle",
  "Classic/Antique",
];

const stats = [
  { value: "10+", label: "States Available", icon: MapPin },
  { value: "A++", label: "AM Best Rating", icon: Award },
  { value: "85+", label: "Years Experience", icon: Clock },
  { value: "24/7", label: "Claims Service", icon: Phone },
];

const faqs = [
  {
    question: "What is private passenger auto insurance?",
    answer: "Private passenger auto insurance provides coverage for personal vehicles used for everyday driving. This includes commuting, errands, family trips, and recreational driving. It protects you, your passengers, and your vehicle from accidents, theft, and other covered incidents."
  },
  {
    question: "Which states offer GEICO private passenger auto through Casurance?",
    answer: "As a Local Agent with GEICO, Casurance offers private passenger auto coverage in select states including Montana, Oregon, Minnesota, Indiana, Kentucky, Pennsylvania, Ohio, Virginia, West Virginia, and Georgia. Contact us to confirm availability in your state."
  },
  {
    question: "What coverage options are available?",
    answer: "Coverage options include liability (bodily injury and property damage), collision, comprehensive, medical payments, uninsured/underinsured motorist, rental reimbursement, and roadside assistance. You can customize your policy based on your needs and budget."
  },
  {
    question: "What discounts are available?",
    answer: "GEICO offers various discounts including multi-vehicle, good driver, good student, defensive driving course, anti-theft device, multi-policy bundle, military, federal employee, and more. Contact Casurance to learn which discounts apply to you."
  },
  {
    question: "How do I file a claim?",
    answer: "GEICO provides 24/7 claims service. You can file online, through the GEICO mobile app, or by calling the claims hotline. Casurance is also available to assist you throughout the claims process as your local agent."
  },
  {
    question: "Can I manage my policy online?",
    answer: "Yes, GEICO offers easy online policy management through their website and mobile app. You can view policy details, make payments, update coverage, and access ID cards anytime."
  },
];

const keyBenefits = [
  "Competitive rates from a trusted national carrier",
  "24/7 claims service with fast resolution",
  "Flexible coverage options for your needs",
  "Local agent support from Casurance",
  "Easy online and mobile policy management",
  "Wide range of available discounts",
  "Roadside assistance available",
  "Multiple payment options",
];

export default function GeicoPrivatePassengerLanding() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    currentInsurer: "",
    notes: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quotes", {
        business_name: `${data.firstName} ${data.lastName}`,
        contact_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        state: data.state,
        insurance_type: "GEICO Private Passenger Auto",
        vehicle_info: `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`.trim(),
        notes: data.notes,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you within 24 hours with your GEICO auto quote.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        vehicleType: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        currentInsurer: "",
        notes: "",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Required Fields Missing",
        description: "Please complete all required fields to submit your quote request.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Local Agent with GEICO",
    "description": "Casurance is a Local Agent with GEICO offering private passenger auto insurance. Get competitive quotes for personal vehicles, cars, trucks, and SUVs.",
    "url": "https://casurance.net/geico-private-passenger",
    "telephone": "+1-833-522-7872",
    "areaServed": ppaStates.map(s => ({
      "@type": "State",
      "name": s.name
    })),
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "GEICO Private Passenger Auto Insurance",
        "description": "Personal auto coverage for individual vehicles through GEICO"
      }
    }
  };

  const faqStructuredData = {
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <>
      <Helmet>
        <title>GEICO Personal Auto Insurance | Local Agent with GEICO | Casurance</title>
        <meta name="description" content="Casurance is a Local Agent with GEICO offering personal auto insurance. Get competitive quotes for cars, trucks, SUVs, and more. 24/7 claims service and discounts available." />
        <meta name="keywords" content="GEICO auto insurance, local agent with GEICO, personal auto insurance, car insurance, vehicle insurance, auto insurance quotes" />
        <link rel="canonical" href="https://casurance.net/geico-private-passenger" />
        <meta property="og:title" content="GEICO Personal Auto Insurance | Local Agent with GEICO | Casurance" />
        <meta property="og:description" content="Get personal auto insurance through GEICO. Casurance is your Local Agent with GEICO." />
        <meta property="og:url" content="https://casurance.net/geico-private-passenger" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <span className="text-xl font-bold text-[#003366] cursor-pointer" data-testid="link-home">
                    Casurance
                  </span>
                </Link>
                <span className="text-muted-foreground text-sm hidden sm:inline">|</span>
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6 hidden sm:block"
                  data-testid="img-geico-logo"
                />
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/coverages">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-coverages">
                    Coverages
                  </span>
                </Link>
                <Link href="/industries">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-industries">
                    Industries
                  </span>
                </Link>
                <Link href="/quote">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer" data-testid="link-quote">
                    Get a Quote
                  </span>
                </Link>
                <a 
                  href="tel:+18335227872" 
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                  data-testid="link-phone"
                >
                  <Phone className="h-4 w-4" />
                  (833) 522-7872
                </a>
              </nav>

              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-4 py-4 space-y-3">
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6 mb-4"
                />
                <Link href="/coverages">
                  <span className="block py-2 text-foreground" data-testid="link-coverages-mobile">Coverages</span>
                </Link>
                <Link href="/industries">
                  <span className="block py-2 text-foreground" data-testid="link-industries-mobile">Industries</span>
                </Link>
                <Link href="/quote">
                  <span className="block py-2 text-foreground" data-testid="link-quote-mobile">Get a Quote</span>
                </Link>
                <a 
                  href="tel:+18335227872" 
                  className="flex items-center gap-2 py-2 text-primary font-medium"
                  data-testid="link-phone-mobile"
                >
                  <Phone className="h-4 w-4" />
                  (833) 522-7872
                </a>
              </div>
            </div>
          )}
        </header>

        <main id="main-content">
          <section className="relative bg-gradient-to-br from-[#00703c] to-[#004d29] text-white py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={geicoLogoWhite} 
                      alt="GEICO" 
                      className="h-10"
                      data-testid="img-geico-logo-hero"
                    />
                    <span className="text-white/80">Private Passenger Auto</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Personal Auto Insurance from GEICO
                  </h1>
                  <p className="text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
                    Casurance is your Local Agent with GEICO, offering competitive personal auto coverage with outstanding service. Protect yourself and your family on the road.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-white/10 backdrop-blur rounded-lg p-4 text-center"
                        data-testid={`stat-${index}`}
                      >
                        <stat.icon className="h-6 w-6 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {keyBenefits.slice(0, 4).map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm"
                        data-testid={`benefit-${index}`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-300" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-white text-foreground shadow-2xl" data-testid="card-quote-form">
                  <CardHeader className="bg-[#00703c] text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Car className="h-5 w-5" />
                      Get Your Personal Auto Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            placeholder="First Name"
                            required
                            data-testid="input-first-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            placeholder="Last Name"
                            required
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@email.com"
                            required
                            data-testid="input-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="(555) 123-4567"
                            required
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => updateField("state", value)}
                          >
                            <SelectTrigger id="state" data-testid="select-state">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              {ppaStates.map((state) => (
                                <SelectItem key={state.abbr} value={state.abbr}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicleType">Vehicle Type</Label>
                          <Select
                            value={formData.vehicleType}
                            onValueChange={(value) => updateField("vehicleType", value)}
                          >
                            <SelectTrigger id="vehicleType" data-testid="select-vehicle-type">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {vehicleTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="vehicleYear">Year</Label>
                          <Select
                            value={formData.vehicleYear}
                            onValueChange={(value) => updateField("vehicleYear", value)}
                          >
                            <SelectTrigger id="vehicleYear" data-testid="select-vehicle-year">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicleMake">Make</Label>
                          <Input
                            id="vehicleMake"
                            value={formData.vehicleMake}
                            onChange={(e) => updateField("vehicleMake", e.target.value)}
                            placeholder="e.g. Toyota"
                            data-testid="input-vehicle-make"
                          />
                        </div>
                        <div>
                          <Label htmlFor="vehicleModel">Model</Label>
                          <Input
                            id="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={(e) => updateField("vehicleModel", e.target.value)}
                            placeholder="e.g. Camry"
                            data-testid="input-vehicle-model"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="currentInsurer">Current Insurance Company</Label>
                        <Input
                          id="currentInsurer"
                          value={formData.currentInsurer}
                          onChange={(e) => updateField("currentInsurer", e.target.value)}
                          placeholder="Current insurer (if any)"
                          data-testid="input-current-insurer"
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Information</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => updateField("notes", e.target.value)}
                          placeholder="Any additional details about your coverage needs..."
                          rows={3}
                          data-testid="textarea-notes"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[#00703c] hover:bg-[#005a30]"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit"
                      >
                        {submitMutation.isPending ? (
                          "Submitting..."
                        ) : (
                          <>
                            Request Your Quote <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to be contacted about your insurance quote.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-states-title">
                  Available in Select States
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  As a Local Agent with GEICO, Casurance provides private passenger auto insurance in these states
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {ppaStates.map((state) => (
                  <Card 
                    key={state.abbr} 
                    className="text-center hover-elevate"
                    data-testid={`card-state-${state.abbr}`}
                  >
                    <CardContent className="p-4">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-[#00703c]" />
                      <div className="font-bold text-lg">{state.abbr}</div>
                      <div className="text-sm text-muted-foreground">{state.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-coverage-title">
                  Coverage Options
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Customize your GEICO auto policy with the coverage you need
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageTypes.map((coverage, index) => (
                  <Card key={index} className="hover-elevate" data-testid={`card-coverage-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#00703c]/10 p-3 rounded-lg">
                          <coverage.icon className="h-6 w-6 text-[#00703c]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{coverage.title}</h3>
                          <p className="text-muted-foreground text-sm">{coverage.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#00703c] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-benefits-title">
                  Why Choose Casurance as Your Local Agent with GEICO?
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4"
                    data-testid={`key-benefit-${index}`}
                  >
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-white/80 mb-6">
                  Ready to get a quote for your personal vehicle?
                </p>
                <a href="#main-content">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#00703c] hover:bg-white/90"
                    data-testid="button-get-quote-cta"
                  >
                    Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden"
                    data-testid={`faq-${index}`}
                  >
                    <button
                      className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      aria-expanded={expandedFaq === index}
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="font-semibold text-lg">{faq.question}</span>
                      <ArrowRight 
                        className={`h-5 w-5 transition-transform flex-shrink-0 ${
                          expandedFaq === index ? "rotate-90" : ""
                        }`} 
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-[#00703c] to-[#004d29] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <img 
                src={geicoLogoWhite} 
                alt="GEICO" 
                className="h-12 mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
                Get Your GEICO Auto Quote Today
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                As your Local Agent with GEICO, Casurance is here to help you find the right coverage for your personal vehicle at competitive rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+18335227872">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#00703c] hover:bg-white/90 w-full sm:w-auto"
                    data-testid="button-call-cta"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (833) 522-7872
                  </Button>
                </a>
                <a href="#main-content">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    data-testid="button-quote-cta"
                  >
                    Request a Quote Online <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-background border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-[#00703c]">Casurance</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Local Agent with GEICO providing personal auto insurance.
                </p>
                <img 
                  src={geicoLogoBlue} 
                  alt="GEICO" 
                  className="h-6"
                />
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/coverages"><span className="text-muted-foreground hover:text-foreground cursor-pointer">All Coverages</span></Link></li>
                  <li><Link href="/industries"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Industries</span></Link></li>
                  <li><Link href="/quote"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Get a Quote</span></Link></li>
                  <li><Link href="/about"><span className="text-muted-foreground hover:text-foreground cursor-pointer">About Us</span></Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">GEICO Products</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/geico-commercial-auto"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Commercial Auto</span></Link></li>
                  <li><span className="text-primary font-medium">Private Passenger Auto</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="tel:+18335227872" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Phone className="h-4 w-4" />
                      (833) 522-7872
                    </a>
                  </li>
                  <li>
                    <Link href="/contact">
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Contact Form</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>
                GEICO and its affiliates. Coverage is subject to underwriting approval. 
                Not all products are available in all states. © {new Date().getFullYear()} Casurance. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
