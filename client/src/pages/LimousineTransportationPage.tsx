import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Car, 
  Users, 
  Building2, 
  Phone, 
  Mail,
  CheckCircle2,
  Clock,
  Award,
  Headphones,
  DollarSign,
  FileText,
  Truck,
  Bus,
  MapPin,
  Star,
  ChevronRight,
  AlertCircle,
  Briefcase,
  UserCheck,
  Scale,
  BadgeCheck,
  CalendarCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

import sedanImage1 from "@assets/stock_images/luxury_black_sedan_l_5863cf6f.jpg";
import sedanImage2 from "@assets/stock_images/luxury_black_sedan_l_17b441e0.jpg";
import suvImage from "@assets/stock_images/cadillac_escalade_lu_ac93e6a7.jpg";
import sprinterImage from "@assets/stock_images/mercedes_sprinter_bl_599e2123.jpg";
import limoImage from "@assets/stock_images/stretch_limousine_pa_6081117d.jpg";
import partyBusImage from "@assets/stock_images/stretch_limousine_pa_bcf9db20.jpg";

const fleetVehicles = [
  { name: "Cadillac Escalade ESV", description: "Premium Luxury SUV", image: suvImage },
  { name: "Mercedes Sprinter", description: "Executive Van Shuttle", image: sprinterImage },
  { name: "Lincoln Continental", description: "Executive Sedan", image: sedanImage1 },
  { name: "Stretch Limousine", description: "Special Events", image: limoImage },
];

const vehicleTypes = [
  { category: "Black Sedans", examples: "Lincoln Continental, Cadillac CT6, Mercedes S-Class" },
  { category: "Luxury SUVs", examples: "Cadillac Escalade, Lincoln Navigator, BMW X7" },
  { category: "Executive Sedans", examples: "BMW 7 Series, Audi A8, Genesis G90" },
  { category: "Premium Electric", examples: "Tesla Model S, Tesla Model X, Lucid Air" },
  { category: "Stretch Limousines", examples: "Lincoln MKT Stretch, Cadillac Escalade Stretch" },
  { category: "Sprinter Vans", examples: "Mercedes Sprinter, Ford Transit Executive" },
  { category: "High Value Imports", examples: "Bentley, Rolls Royce, Maybach" },
  { category: "Airport Black Cars", examples: "Town Cars, Premium Sedans, Chauffeur Vehicles" },
];

const whoNeedsThisCoverage = [
  "Luxury sedan and town car services",
  "Limousine fleet operators (1-50+ vehicles)",
  "Executive Sprinter fleet operators",
  "Executive and corporate transportation",
  "Airport shuttle and transfer services",
  "Wedding and special occasion operators",
  "Livery bus operators",
  "Tour and independent operators",
];

const coverageIncludes = {
  autoLiability: {
    title: "Auto Liability",
    items: [
      "Up to $1.5M Combined Single Limit",
      "Uninsured/under insured motorist coverage",
      "Personal Injury Protection (PIP) where required",
      "Passenger liability protection"
    ]
  },
  physicalDamage: {
    title: "Physical Damage",
    items: [
      "Comprehensive and Collision coverage",
      "Other auto physical damage including acts of war",
      "Total loss/gap coverage",
      "Single deductible per occurrence"
    ]
  },
  hiredNonOwned: {
    title: "Hired & Non-Owned",
    items: [
      "Covers non-owned and hired auto coverage",
      "Lease Gap coverage",
      "Towing and roadside assistance",
      "Electronic equipment coverage"
    ]
  },
  businessOperations: {
    title: "Business Operations",
    items: [
      "General liability for drivers operators",
      "Workers' compensation for chauffeurs",
      "Garagekeepers legal liability",
      "Cargo liability for carry-ons"
    ]
  }
};

const keyBenefits = [
  { 
    icon: <Car className="h-6 w-6" />, 
    title: "Driver Training", 
    description: "Free online Interactive Defensive Driver Training course and certification." 
  },
  { 
    icon: <FileText className="h-6 w-6" />, 
    title: "Risk Management", 
    description: "Proactive safety-net Rental Fleet Risk Management flat rate and regular reporting." 
  },
  { 
    icon: <UserCheck className="h-6 w-6" />, 
    title: "Background Checks", 
    description: "Strategic partnership with discounted background checks and MVR checks." 
  },
  { 
    icon: <DollarSign className="h-6 w-6" />, 
    title: "Competitive Rates", 
    description: "Value delivered to your operations with tiered payment options for fixed fleet premiums." 
  },
  { 
    icon: <Headphones className="h-6 w-6" />, 
    title: "24/7 Claims Support", 
    description: "Round the clock claims reporting and expert/local claims handling." 
  },
  { 
    icon: <Star className="h-6 w-6" />, 
    title: "Specialty Coverage", 
    description: "Coverage for specialty vehicles, antique/exotic, and local limousine/party buses." 
  },
];

const additionalBenefits = [
  "Specialized underwriting for chauffeured transportation",
  "Partnership with PRCT (Chauffeured Transportation category)",
  "Coverage for specialty vehicles and antique equipment",
  "Loss of income protection during covered repairs",
  "Passenger medical payments coverage",
  "Zero-deductible glass coverage",
  "Single deductible on comprehensive physical damage per occurrence",
  "Lease Gap coverage for financed vehicles",
];

const vehiclesWeInsure = [
  { name: "Luxury Sedans", icon: <Car className="h-6 w-6" /> },
  { name: "Town Cars", icon: <Car className="h-6 w-6" /> },
  { name: "Limousine Sprinters", icon: <Bus className="h-6 w-6" /> },
  { name: "Stretch Limousines", icon: <Truck className="h-6 w-6" /> },
  { name: "Party Buses", icon: <Bus className="h-6 w-6" /> },
  { name: "Executive SUVs", icon: <Car className="h-6 w-6" /> },
  { name: "Passenger Vans", icon: <Bus className="h-6 w-6" /> },
  { name: "Charter Vehicles", icon: <Truck className="h-6 w-6" /> },
];

const coverageOptions = [
  {
    title: "Auto Liability",
    description: "The foundation of any commercial auto policy. It protects against financial loss if you or your drivers are found at fault for an accident that injures others or damages their property.",
    details: "Mandatory by law for all commercial vehicles. Limits typically range from $750,000 to $5 Million depending on vehicle seating capacity and regulatory requirements (PUC/DOT).",
    cta: "Learn More"
  },
  {
    title: "Auto Physical Damage",
    description: "Covers the cost to repair or replace your vehicle if it's damaged in an accident, stolen, vandalized, or damaged by fire or weather.",
    details: "Includes Collision (accidents) and Comprehensive (theft, fire, glass, etc.) coverage. Essential for protecting your fleet investment.",
    cta: "Learn More"
  },
  {
    title: "Workers' Compensation",
    description: "Provides medical benefits and wage replacement to employees injured on the job. Mandatory for businesses with employees in California.",
    details: "Protects your business from lawsuits related to workplace injuries. Covers medical bills, rehabilitation costs, and lost wages.",
    cta: "Learn More"
  },
  {
    title: "General Liability",
    description: "Protects your business from third-party claims of bodily injury or property damage that occur on your premises or as a result of your operations (non-driving).",
    details: "Covers slip and falls at your office, advertising injury, or customer property damage not involving vehicles.",
    cta: "Learn More"
  },
  {
    title: "Garage Liability",
    description: "Essential for transportation companies that maintain their own fleet. Covers liability arising from garage operations.",
    details: "Includes Garagekeepers Legal Liability to protect customers' vehicles in your care, custody, and control. Hired & used car physical damage also available.",
    cta: "Learn More"
  },
  {
    title: "Excess Insurance",
    description: "Provides higher liability limits beyond your primary policy. Often important for high-profile contracts, airports, or municipalities.",
    details: "Can extend coverage limits to $5 Million, $10 Million or more. Acts as a safety net for catastrophic claims.",
    cta: "Learn More"
  },
  {
    title: "Commercial Property",
    description: "Protects your business location, including office building, furniture, computers, and tools.",
    details: "Can be bundled with General Liability in a Business Owners Policy (BOP) for cost savings.",
    cta: "Learn More"
  },
  {
    title: "Cyber Liability",
    description: "Protects against data breaches and cyber attacks. Essential for transportation companies handling sensitive client and payment information.",
    details: "Covers notification costs, credit monitoring, legal fees, and fines associated with data breaches.",
    cta: "Learn More"
  }
];

const coverageLimits = {
  autoLiability: [
    "$750,000 / $1M / $1.5M / $5M CSL",
    "Medical Payments: $5,000 to $50,000",
    "PIP where applicable",
    "$500,000 up to $5M available"
  ],
  physicalDamage: [
    "Stated Value/ACV up to $1,000",
    "Blanket: $750 aggregate/deductible",
    "Antique/exotic: $500 deductible",
    "Comp: repair, No deductible"
  ],
  generalLiability: [
    "Limits up to $1M/$2M",
    "Property damage included"
  ],
  excessLiability: [
    "Limits up to $5M+",
    "Follows form"
  ]
};

const faqs = [
  {
    question: "What insurance do I need to start a limousine business?",
    answer: "To start a limousine business, you'll need commercial auto liability insurance (typically $750,000 to $1.5M minimum), general liability insurance, and potentially workers' compensation if you have employees. Many states and airports also require additional permits and insurance certificates."
  },
  {
    question: "How much does limousine insurance cost per month?",
    answer: "Limousine insurance typically costs between $400-$800 per month per vehicle, depending on factors like vehicle type, driver experience, location, coverage limits, and claims history. Fleet discounts may apply for multiple vehicles."
  },
  {
    question: "Do I need a TCP permit to operate a limousine in California?",
    answer: "Yes, in California you need a Transportation Charter-Party (TCP) permit from the California Public Utilities Commission (CPUC) to operate a limousine service. This requires minimum liability coverage of $750,000 for vehicles seating 7 or fewer passengers, and $1.5M for vehicles seating 8-15 passengers."
  },
  {
    question: "What is the difference between livery and limousine insurance?",
    answer: "Livery insurance is a broader category covering any vehicle used to transport passengers for hire, including taxis, black cars, and ride-share vehicles. Limousine insurance is a specialized subset designed specifically for luxury ground transportation, often with higher coverage limits and specialized endorsements for high-value vehicles."
  },
  {
    question: "Can I use personal auto insurance for my limousine business?",
    answer: "No, personal auto insurance does not cover commercial transportation activities. Using personal insurance for limousine operations would likely result in claim denial and policy cancellation. You must have commercial auto insurance specifically rated for livery or limousine use."
  }
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const insuranceTypes = [
  "Auto Liability",
  "Physical Damage",
  "General Liability",
  "Workers' Compensation",
  "Excess/Umbrella",
  "Garage Liability",
  "Full Package"
];

export default function LimousineTransportationPage() {
  const { toast } = useToast();
  const [quoteForm, setQuoteForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "",
    vehicles: "",
    insuranceType: ""
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/limousine-quotes", {
        ...quoteForm,
        source: "limousine-transportation-page"
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "A specialist will contact you within 24 hours."
      });
      setQuoteForm({
        companyName: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        state: "",
        vehicles: "",
        insuranceType: ""
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Please try again or call us directly."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuoteMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Limousine & Chauffeured Transportation Insurance | Casurance"
        description="Comprehensive limousine insurance for luxury sedans, stretch limos, Sprinter vans, and party buses. Get competitive rates with coverage from $750K to $5M+. Free quotes for California, Nevada, Texas, and all 50 states."
        keywords="limousine insurance, limo insurance, chauffeured transportation insurance, black car insurance, livery insurance, TCP insurance, stretch limousine insurance, sprinter van insurance, party bus insurance"
        canonical="/industry/limousine-transportation"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section with Fleet & Quote Form */}
        <section className="bg-gradient-to-br from-[#0a1628] via-[#1a365d] to-[#0a1628] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Fleet Coverage - Left Side */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Badge className="bg-primary/20 text-primary-foreground mb-4">Specialized Coverage</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Limousine & Chauffeured Transportation Insurance
                  </h1>
                  <p className="text-xl text-gray-300 max-w-2xl">
                    Comprehensive coverage designed for luxury ground transportation operators. From single-vehicle operators to large fleet owners.
                  </p>
                </div>

                {/* Our Fleet Coverage */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Car className="h-6 w-6 text-primary" />
                    Our Fleet Coverage
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {fleetVehicles.map((vehicle, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden group">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.name}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                          <p className="text-sm text-gray-300">{vehicle.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Form - Right Side */}
              <div className="lg:col-span-1">
                <Card className="bg-white text-foreground sticky top-4">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-center">Get My Free Quote</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">Fill out the form for a fast, free quote</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <Label htmlFor="companyName" className="text-sm">Your Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="ABC Limousine"
                          value={quoteForm.companyName}
                          onChange={(e) => setQuoteForm({...quoteForm, companyName: e.target.value})}
                          required
                          data-testid="input-company-name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="firstName" className="text-sm">First Name *</Label>
                          <Input
                            id="firstName"
                            value={quoteForm.firstName}
                            onChange={(e) => setQuoteForm({...quoteForm, firstName: e.target.value})}
                            required
                            data-testid="input-first-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                          <Input
                            id="lastName"
                            value={quoteForm.lastName}
                            onChange={(e) => setQuoteForm({...quoteForm, lastName: e.target.value})}
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="phone" className="text-sm">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(888) 555-1234"
                            value={quoteForm.phone}
                            onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                            required
                            data-testid="input-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            value={quoteForm.email}
                            onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="state" className="text-sm">State *</Label>
                          <Select 
                            value={quoteForm.state} 
                            onValueChange={(value) => setQuoteForm({...quoteForm, state: value})}
                          >
                            <SelectTrigger id="state" data-testid="select-state">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {usStates.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicles" className="text-sm"># Vehicles</Label>
                          <Input
                            id="vehicles"
                            type="number"
                            placeholder="1"
                            min="1"
                            value={quoteForm.vehicles}
                            onChange={(e) => setQuoteForm({...quoteForm, vehicles: e.target.value})}
                            data-testid="input-vehicles"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="insuranceType" className="text-sm">Type of Insurance Desired *</Label>
                        <Select 
                          value={quoteForm.insuranceType} 
                          onValueChange={(value) => setQuoteForm({...quoteForm, insuranceType: value})}
                        >
                          <SelectTrigger id="insuranceType" data-testid="select-insurance-type">
                            <SelectValue placeholder="Select insurance type..." />
                          </SelectTrigger>
                          <SelectContent>
                            {insuranceTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={submitQuoteMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        {submitQuoteMutation.isPending ? "Submitting..." : "Get My Free Quote →"}
                      </Button>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> No Obligation</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Fast Response</span>
                      </div>
                    </form>
                    <div className="mt-4 pt-4 border-t text-center">
                      <p className="text-sm text-muted-foreground">Prefer to call?</p>
                      <a href="tel:1-888-254-0089" className="flex items-center justify-center gap-2 text-primary font-semibold">
                        <Phone className="h-4 w-4" />
                        1-888-254-0089
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Types Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
              {vehicleTypes.map((type, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{type.category}</h3>
                    <p className="text-xs text-muted-foreground">{type.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Needs This Coverage */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Who Needs This Coverage?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {whoNeedsThisCoverage.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Includes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Coverage Includes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive protection designed for the unique needs of limousine and chauffeured transportation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {Object.entries(coverageIncludes).map(([key, coverage]) => (
                <Card key={key} className="bg-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {key === 'autoLiability' && <Shield className="h-5 w-5 text-primary" />}
                      {key === 'physicalDamage' && <Car className="h-5 w-5 text-primary" />}
                      {key === 'hiredNonOwned' && <Truck className="h-5 w-5 text-primary" />}
                      {key === 'businessOperations' && <Briefcase className="h-5 w-5 text-primary" />}
                      {coverage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {coverage.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Key Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {keyBenefits.map((benefit, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Additional Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {additionalBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles We Insure */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Vehicles We Insure</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {vehiclesWeInsure.map((vehicle, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {vehicle.icon}
                  </div>
                  <span className="text-sm font-medium">{vehicle.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Options */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Coverage Options</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive insurance protection designed specifically for chauffeured transportation operations.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {coverageOptions.map((option, idx) => (
                  <AccordionItem key={idx} value={`coverage-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold">{option.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 pb-4">
                      <p className="text-muted-foreground mb-2">{option.description}</p>
                      <p className="text-sm mb-4">{option.details}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/quote/limousine">
                          {option.cta} <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Coverage Limits at a Glance */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Coverage Limits at a Glance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Auto Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coverageLimits.autoLiability.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Physical Damage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coverageLimits.physicalDamage.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    General Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coverageLimits.generalLiability.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Excess Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coverageLimits.excessLiability.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Limousine Insurance FAQs</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
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
        <section className="py-16 bg-gradient-to-br from-[#0a1628] to-[#1a365d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote for your limousine or chauffeured transportation business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/quote/limousine">
                  Get Your Free Quote <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <a href="tel:1-888-254-0089">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 1-888-254-0089
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
