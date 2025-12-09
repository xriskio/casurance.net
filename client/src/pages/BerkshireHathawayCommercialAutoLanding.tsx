import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  Truck, Shield, CheckCircle, Phone, Building2, ArrowRight, 
  CheckCircle2, MapPin, FileText, Users, Award, Star,
  HardHat, Utensils, TreePine, Wrench, Package, Leaf, Bus,
  Car, Ambulance, Home, Compass
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bhhcLogo from "@assets/image_1765258168209.png";

const quickQuoteSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  state: z.string().min(1, "Please select a state"),
  businessType: z.string().min(1, "Please select a business type"),
  vehicleCount: z.string().min(1, "Please enter number of vehicles"),
  message: z.string().optional(),
});

type QuickQuoteFormData = z.infer<typeof quickQuoteSchema>;

const availableStates = [
  { value: "CA", label: "California" },
  { value: "NV", label: "Nevada" },
  { value: "OH", label: "Ohio" },
];

const truckingClasses = [
  { value: "contractors", label: "Contractors", icon: HardHat, description: "General and specialty trade contractors" },
  { value: "caterers-mobile-concessions", label: "Caterers/Mobile Concessions", icon: Utensils, description: "Food trucks and catering vehicles" },
  { value: "dump-trucks", label: "Dump Trucks", icon: Truck, description: "Hauling dirt, sand, gravel, and debris" },
  { value: "farmers", label: "Farmers", icon: Leaf, description: "Agricultural operations and farm vehicles" },
  { value: "logging", label: "Logging", icon: TreePine, description: "Logging and timber transport operations" },
  { value: "tow-trucks-auto-haulers", label: "Tow Trucks/Auto Haulers", icon: Truck, description: "Vehicle towing and transport" },
  { value: "truckers", label: "Truckers", icon: Truck, description: "General trucking and freight operations" },
  { value: "wholesalers-manufacturers", label: "Wholesalers/Manufacturers", icon: Package, description: "Distribution and manufacturing delivery" },
];

const additionalClasses = [
  { value: "church-buses", label: "Church Buses", icon: Users },
  { value: "day-care-autos", label: "Day Care Center Autos", icon: Users },
  { value: "lawn-tree-service", label: "Lawn & Tree Service", icon: TreePine },
  { value: "mobile-concessions", label: "Mobile Concessions", icon: Utensils },
  { value: "salesperson-autos", label: "Salesperson's Autos", icon: Building2 },
  { value: "salvage-haulers", label: "Salvage Haulers", icon: Truck },
  { value: "school-buses", label: "School Buses", icon: Users },
  { value: "social-service-agencies", label: "Social Service Agencies", icon: Users },
  { value: "traveling-medical", label: "Traveling Medical Transportation", icon: Users },
  { value: "trucking-contingent", label: "Trucking Contingent Liability (Bobtail/Deadhead)", icon: Truck },
];

const publicAutoClasses = [
  { value: "church-buses", label: "Church Buses", icon: Bus, description: "Religious organization transportation" },
  { value: "day-care-centers", label: "Day Care Centers", icon: Users, description: "Childcare facility vehicles" },
  { value: "limousines", label: "Limousines", icon: Car, description: "Luxury passenger transportation" },
  { value: "social-service-nonprofits", label: "Social Service/Non-Profits", icon: Users, description: "Community organization vehicles" },
  { value: "group-home-autos", label: "Group Home Autos", icon: Home, description: "Residential care facility transport" },
  { value: "wilderness-expeditions", label: "Wilderness Expeditions", icon: Compass, description: "Adventure and outdoor tour vehicles" },
];

const publicAutoFeatures = [
  { name: "Liability Limits (up to $5,000,000)", description: "High liability limits for passenger transportation" },
  { name: "Drive Other Car", description: "Coverage when driving non-owned vehicles" },
  { name: "Hired Car and Non-owned", description: "Protection for rented or borrowed vehicles" },
  { name: "Waiver of Subrogation", description: "Contractual requirement coverage" },
  { name: "Additional Insured", description: "Add certificate holders as additional insureds" },
  { name: "State and Federal Filings", description: "Including MCS-90 for for-hire carriers" },
  { name: "Audio-visual Equipment Coverage", description: "Protection for entertainment systems in vehicles" },
];

const allOtherClasses = [
  { value: "emergency-ambulances", label: "Emergency Ambulances", icon: Ambulance },
  { value: "funeral-director-autos", label: "Funeral Director Autos", icon: Car },
  { value: "nemt", label: "Non-Emergency Medical Transportation", icon: Users },
  { value: "rental-operations", label: "Rental Operations", icon: Car },
  { value: "salesperson-autos", label: "Salesperson's Autos", icon: Building2 },
];

const coverageTypes = [
  "Auto Liability",
  "Physical Damage",
  "Medical Payments",
  "Uninsured/Underinsured Motorist",
  "On-hook/In-tow",
  "Cargo",
  "Hired / Non-Owned",
  "Garage Liability",
  "Garagekeepers Liability",
];

const productFeatures = [
  { name: "Combined Deductible", description: "Single deductible option for comprehensive and collision claims" },
  { name: "Trailer Interchange", description: "Coverage for trailers borrowed from or leased to others" },
  { name: "Drive Other Car", description: "Extends coverage when driving non-owned vehicles for business" },
  { name: "Hired Car and Non-owned", description: "Protection for rented, borrowed, or employee-owned vehicles" },
  { name: "Limited Pollution Liability", description: "Coverage for pollution incidents during transport" },
  { name: "Waiver of Subrogation", description: "Contractual requirement coverage for your business contracts" },
  { name: "Additional Insured", description: "Add certificate holders as additional insureds" },
  { name: "State and Federal Filings", description: "Including MCS-90 for interstate for-hire carriers" },
];

const coverageOptions = [
  { name: "Liability Coverage", description: "Bodily injury and property damage protection" },
  { name: "Collision Coverage", description: "Damage to your vehicles from accidents" },
  { name: "Comprehensive Coverage", description: "Theft, vandalism, weather, and other non-collision damage" },
  { name: "Medical Payments", description: "Medical expenses for occupants of insured vehicles" },
  { name: "Uninsured/Underinsured Motorist", description: "Protection when at-fault driver is uninsured" },
  { name: "Motor Truck Cargo", description: "Coverage for goods being transported" },
  { name: "Physical Damage", description: "Stated amount or actual cash value options" },
  { name: "Hired & Non-Owned Auto", description: "Coverage for vehicles you rent or don't own" },
];

const highlights = [
  "No radius or unit count restrictions",
  "Online rating & binding capabilities",
  "Competitive commissions",
  "Direct bill available",
  "New ventures & new CDLs acceptable",
  "A++ (Superior) Financial Strength Rating from A.M. Best",
];

const fleetInfo = {
  title: "Fleet Coverage (11+ Units)",
  features: [
    "Write virtually any type of auto risk with 11+ units",
    "No radius or unit count restrictions",
    "Telematics discount available",
    "Top fleet classes: Contractors, Dump Trucks, Truckers, Farmers, Lawn & Tree Service",
  ],
};

const faqs = [
  {
    question: "What states does Berkshire Hathaway Homestate Companies write commercial auto in?",
    answer: "BHHC writes commercial auto in over 35 states including California, Nevada, and Ohio."
  },
  {
    question: "What trucking classes does BHHC cover?",
    answer: "BHHC covers a wide range of trucking classes including Contractors, Caterers/Mobile Concessions, Dump Trucks (Non-For-Hire), Farmers, Logging, Tow Trucks/Auto Haulers, Truckers, and Wholesalers/Manufacturers. They also cover church buses, day care vehicles, lawn & tree service, school buses, social service agencies, and traveling medical transportation."
  },
  {
    question: "What product features are available with BHHC Commercial Auto?",
    answer: "BHHC offers comprehensive product features including Combined Deductible, Trailer Interchange, Drive Other Car coverage, Hired Car and Non-owned auto, Limited Pollution Liability, Waiver of Subrogation, Additional Insured endorsements, and State and Federal Filings including the MCS-90 for interstate for-hire carriers."
  },
  {
    question: "What is the MCS-90 filing?",
    answer: "The MCS-90 is a federal filing required by the FMCSA (Federal Motor Carrier Safety Administration) for motor carriers operating across state lines for-hire. It provides proof that the carrier has minimum levels of public liability insurance coverage. BHHC can provide MCS-90 filings for qualifying policies."
  },
  {
    question: "Does BHHC offer fleet coverage?",
    answer: "Yes, BHHC's Fleet Underwriting Division can write virtually any type of auto risk with 11+ power units. They have no radius or unit count restrictions and offer telematics discounts for fleet risks. BHHC writes commercial auto in over 35 states."
  },
  {
    question: "What is BHHC's financial strength rating?",
    answer: "Berkshire Hathaway Homestate Companies maintains an A++ (Superior) Financial Strength Rating from A.M. Best as of February 2024. This is the highest rating available and demonstrates exceptional financial security and stability."
  },
  {
    question: "What businesses should avoid BHHC?",
    answer: "BHHC declines certain exposures including trucking brokerage, risks hauling to landfills, anhydrous hauling, monoline physical damage, corrosive hazmat, coal haulers, ice cream trucks, interstate household goods movers, interstate charter & inter-city buses, and risks in-force with National Indemnity group of companies."
  },
];

export default function BerkshireHathawayCommercialAutoLanding() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuickQuoteFormData>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      state: "",
      businessType: "",
      vehicleCount: "",
      message: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuickQuoteFormData) => {
      const response = await fetch("/api/quick-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: data.businessName,
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          business_type: data.businessType,
          vehicle_count: data.vehicleCount,
          message: data.message || "",
          source: "Berkshire Hathaway Commercial Auto Landing Page",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit quote request");
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you shortly about Berkshire Hathaway Commercial Auto coverage.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuickQuoteFormData) => {
    submitQuoteMutation.mutate(data);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Berkshire Hathaway Homestate Companies Commercial Auto",
    "description": "Get Berkshire Hathaway Homestate Companies Commercial Auto insurance quotes for California, Nevada, and Ohio businesses. Trucking, contractors, and commercial vehicle coverage.",
    "url": "https://casurance.net/berkshire-hathaway-commercial-auto",
    "telephone": "1-888-254-0089",
    "areaServed": availableStates.map(state => ({
      "@type": "State",
      "name": state.label
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Berkshire Hathaway Commercial Auto Insurance",
      "itemListElement": truckingClasses.map(cls => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": cls.label + " Commercial Auto Insurance"
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Berkshire Hathaway Commercial Auto Insurance | CA, NV, OH | Casurance</title>
        <meta 
          name="description" 
          content="Get Berkshire Hathaway Homestate Companies Commercial Auto insurance in California, Nevada, and Ohio. A++ rated trucking insurance with MCS-90 filings. Call 1-888-254-0089." 
        />
        <meta name="keywords" content="Berkshire Hathaway commercial auto, BHHC trucking insurance, California commercial auto, Nevada commercial auto, Ohio commercial auto, MCS-90 filing, trucking insurance" />
        <link rel="canonical" href="https://casurance.net/berkshire-hathaway-commercial-auto" />
        <meta property="og:title" content="Berkshire Hathaway Commercial Auto Insurance | CA, NV, OH | Casurance" />
        <meta property="og:description" content="Get Berkshire Hathaway Homestate Companies Commercial Auto insurance in California, Nevada, and Ohio. A++ rated with trucking coverage." />
        <meta property="og:url" content="https://casurance.net/berkshire-hathaway-commercial-auto" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Berkshire Hathaway Commercial Auto Insurance | CA, NV, OH | Casurance" />
        <meta name="twitter:description" content="Get Berkshire Hathaway Commercial Auto insurance through Casurance." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#00264d] text-white py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={bhhcLogo} 
                      alt="Berkshire Hathaway Homestate Companies" 
                      className="h-14 bg-white rounded px-3 py-2"
                      data-testid="img-bhhc-logo"
                    />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Berkshire Hathaway Commercial Auto Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-4">
                    California | Nevada | Ohio
                  </p>
                  <p className="text-lg text-white/80 mb-6">
                    A++ rated commercial auto coverage for trucking, contractors, and businesses. The know-how to keep you moving.
                  </p>
                  <div className="flex items-center gap-2 mb-8">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white/90 font-medium">A++ (Superior) Financial Strength Rating - A.M. Best</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#quote-form">
                      <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-hero">
                        Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a href="tel:18882540089">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" data-testid="button-call-hero">
                        <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                      </Button>
                    </a>
                  </div>
                </div>

                <div id="quote-form" className="bg-white rounded-lg p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-form-title">
                    Request a Quote
                  </h2>
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="form-success">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600">A Casurance agent will contact you shortly about your Berkshire Hathaway Commercial Auto quote.</p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Business Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your Business Name" data-testid="input-business-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Contact Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Your Name" data-testid="input-contact-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Phone</FormLabel>
                                <FormControl>
                                  <Input {...field} type="tel" placeholder="(555) 555-5555" data-testid="input-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="you@business.com" data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">State</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-state">
                                      <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableStates.map((state) => (
                                      <SelectItem key={state.value} value={state.value}>
                                        {state.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleCount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700"># of Vehicles</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" min="1" placeholder="1" data-testid="input-vehicle-count" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Business Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-business-type">
                                    <SelectValue placeholder="Select Business Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[...truckingClasses, ...publicAutoClasses, ...allOtherClasses, ...additionalClasses].map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Additional Details (Optional)</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Tell us about your fleet..." rows={3} data-testid="input-message" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full bg-[#003366] hover:bg-[#00264d]" 
                          disabled={submitQuoteMutation.isPending}
                          data-testid="button-submit-quote"
                        >
                          {submitQuoteMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section className="py-8 bg-muted/50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2" data-testid={`highlight-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trucking Classes Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-trucking-classes-title">
                  Trucking Classes Offered
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our experience and knowledge about transportation coverages allow us to serve your trucking needs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {truckingClasses.map((cls, index) => {
                  const IconComponent = cls.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`trucking-class-${index}`}>
                      <CardContent className="p-6">
                        <IconComponent className="h-10 w-10 text-[#003366] mb-4" />
                        <h3 className="font-semibold mb-2">{cls.label}</h3>
                        <p className="text-sm text-muted-foreground">{cls.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Additional Target Classes</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {additionalClasses.map((cls, index) => {
                  const IconComponent = cls.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 bg-muted/50 rounded-lg p-3"
                      data-testid={`additional-class-${index}`}
                    >
                      <IconComponent className="h-5 w-5 text-[#003366] flex-shrink-0" />
                      <span className="text-sm font-medium">{cls.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Public Auto Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#003366]/10 text-[#003366] px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Bus className="h-4 w-4" />
                  <span>Public Auto Coverage</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-public-auto-title">
                  Auto Coverage for Those Who Transport Others
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  If your business is transporting people from one point to another, BHHC can lend a hand. Whether you need coverage for a daycare auto, limousine or a wilderness expedition, we've got you covered. We are the go-to market for your Public Auto needs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {publicAutoClasses.map((cls, index) => {
                  const IconComponent = cls.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`public-auto-class-${index}`}>
                      <CardContent className="p-6">
                        <IconComponent className="h-10 w-10 text-[#003366] mb-4" />
                        <h3 className="font-semibold mb-2">{cls.label}</h3>
                        <p className="text-sm text-muted-foreground">{cls.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="bg-[#003366] text-white border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">Public Auto Product Features</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {publicAutoFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3" data-testid={`public-auto-feature-${index}`}>
                        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-sm">{feature.name}</span>
                          <p className="text-white/60 text-xs">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* All Other Commercial Auto Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-all-other-title">
                  All-Around Auto Protection
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  If you are looking to cover a business class outside of Trucks and Public Auto, BHHC can handle your "All Other" accounts. Whether your business is adding a personal-type auto to its commercial policy, renting vehicles to the public, or performing medical transportation, our expansive product offering allows us to take a look at almost any commercial auto account.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                {allOtherClasses.map((cls, index) => {
                  const IconComponent = cls.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`all-other-class-${index}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <IconComponent className="h-6 w-6 text-[#003366] flex-shrink-0" />
                        <span className="text-sm font-medium">{cls.label}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Types of Coverage Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {coverageTypes.map((coverage, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 bg-muted/50 rounded-lg p-3"
                        data-testid={`coverage-type-${index}`}
                      >
                        <Shield className="h-4 w-4 text-[#003366] flex-shrink-0" />
                        <span className="text-sm">{coverage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Product Features Section */}
          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-features-title">
                  Additional Product Features
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Comprehensive coverage options including filings and endorsements for your business needs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {productFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur rounded-lg p-5"
                    data-testid={`product-feature-${index}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-green-400 flex-shrink-0" />
                      <span className="font-semibold">{feature.name}</span>
                    </div>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Coverage Options</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {coverageOptions.map((coverage, index) => (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur rounded-lg p-4"
                      data-testid={`coverage-option-${index}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="font-medium text-sm">{coverage.name}</span>
                      </div>
                      <p className="text-white/60 text-xs ml-6">{coverage.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 text-center">
                <a href="#quote-form">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#003366] hover:bg-white/90"
                    data-testid="button-get-quote-cta"
                  >
                    Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Fleet Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-fleet-title">
                    Fleet Coverage (11+ Power Units)
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Having trouble placing a fleet of 11+ power units? BHHC's Fleet Underwriting Division can write virtually any type of auto risk.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {fleetInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3" data-testid={`fleet-feature-${index}`}>
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#quote-form">
                    <Button className="bg-[#003366] hover:bg-[#00264d]" data-testid="button-fleet-quote">
                      Get Fleet Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-6 w-6 text-[#003366]" />
                      Keys to Fleet Success
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Declinations from Standard Markets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Unique and Unusual Risks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Last Minute Quote Requests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Mid-Term Cancellations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Non-Renewals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Claim Severity Issues/Shock Loss</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* State Availability Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-states-title">
                  State Availability
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Casurance offers Berkshire Hathaway Commercial Auto coverage in these states
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {availableStates.map((state, index) => (
                  <Card key={index} className="text-center hover-elevate" data-testid={`state-card-${index}`}>
                    <CardContent className="p-8">
                      <MapPin className="h-12 w-12 text-[#003366] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{state.label}</h3>
                      <p className="text-muted-foreground mb-4">Full commercial auto coverage available</p>
                      <a href="#quote-form">
                        <Button variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white">
                          Get {state.value} Quote
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`} 
                    className="bg-background rounded-lg px-6"
                    data-testid={`faq-${index}`}
                  >
                    <AccordionTrigger className="text-left hover:no-underline" data-testid={`button-faq-${index}`}>
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                <span className="text-lg">A++ (Superior) Rated by A.M. Best</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
                Ready to Protect Your Business with Berkshire Hathaway?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Get a commercial auto quote for California, Nevada, or Ohio today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90" data-testid="button-cta-quote">
                    Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="tel:18882540089">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-call">
                    <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
