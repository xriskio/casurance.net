import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  Truck, Shield, CheckCircle, Phone, Building2, ArrowRight, 
  CheckCircle2, MapPin, Clock, FileText, Users, Award,
  HardHat, Utensils, TreePine, Wrench, Package
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import bristolWestLogo from "@assets/BristolWest_1765259973928.png";

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

const businessTypes = [
  { value: "construction-special-trade", label: "Construction - Special Trade Contractors", icon: HardHat },
  { value: "construction-builders", label: "Construction - Builders & General Contractors", icon: Building2 },
  { value: "courier-delivery", label: "Courier, Mail & Newspaper Delivery", icon: Package },
  { value: "dirt-sand-gravel", label: "Dirt, Sand & Gravel", icon: Truck },
  { value: "farming-livestock", label: "Farming & Livestock", icon: TreePine },
  { value: "food-delivery", label: "Food Delivery", icon: Utensils },
  { value: "for-hire-livery", label: "For-Hire Livery: Black Car/Limo/Taxi", icon: Users },
  { value: "landscaping", label: "Landscaping, Lawn, Garden & Tree", icon: TreePine },
  { value: "logging", label: "Logging & Log Transport", icon: TreePine },
  { value: "manufacturing", label: "Manufacturing", icon: Building2 },
  { value: "restaurants", label: "Restaurants", icon: Utensils },
  { value: "retail", label: "Retail Trade Operations", icon: Package },
  { value: "services", label: "Services", icon: Wrench },
  { value: "towing", label: "Towing Services, Gas Stations & Auto Repair", icon: Truck },
  { value: "trucking-for-hire", label: "Trucking For-Hire", icon: Truck },
  { value: "waste-haulers", label: "Waste Haulers", icon: Truck },
  { value: "wholesale", label: "Wholesale Trade", icon: Package },
];

const coverageOptions = [
  { name: "Liability Coverage", description: "Bodily injury and property damage protection for your business operations" },
  { name: "Collision Coverage", description: "Covers damage to your vehicles from collisions regardless of fault" },
  { name: "Comprehensive Coverage", description: "Protection against theft, vandalism, weather damage, and more" },
  { name: "Medical Payments", description: "Covers medical expenses for you and your passengers" },
  { name: "Uninsured/Underinsured Motorist", description: "Protection when the at-fault driver lacks adequate coverage" },
  { name: "Hired Auto Coverage", description: "Covers vehicles you rent or hire for business use" },
  { name: "Non-Owned Auto", description: "Protection for employee-owned vehicles used for business" },
  { name: "Cargo Coverage", description: "Protects goods and materials being transported" },
];

const vehicleTypes = [
  "Cars, SUVs & Pick-Ups",
  "Small Specialty Trucks",
  "Buses & Livery Vehicles",
  "Box Trucks & Straight Trucks",
  "Vans (Cargo & Passenger)",
  "Trailers",
  "Dump Trucks",
  "Flatbed Trucks",
];

const filingTypes = [
  { name: "State Filing", description: "Required state-specific filings for commercial vehicle operations" },
  { name: "Federal Filing", description: "FMCSA filings for interstate commercial operations" },
  { name: "SR-22 Filing", description: "Proof of financial responsibility filing" },
  { name: "Certificates of Insurance", description: "COIs for contracts and business requirements" },
];

const faqs = [
  {
    question: "What types of businesses does Bristol West cover in California?",
    answer: "Bristol West covers a wide range of commercial auto needs in California including construction contractors (special trade and general), courier and delivery services, dirt/sand/gravel haulers, farming operations, food delivery, for-hire livery (black car, limo, taxi), landscaping, logging and log transport, manufacturing, restaurants, retail operations, services, towing, trucking for-hire, waste haulers, and wholesale trade."
  },
  {
    question: "How do I get a quote for Bristol West Commercial Auto?",
    answer: "Simply fill out the quick quote form on this page or call Casurance at 1-888-254-0089. As an authorized Bristol West agent, we can provide quotes and bind coverage quickly."
  },
  {
    question: "What vehicle types can be insured with Bristol West?",
    answer: "Bristol West covers cars, SUVs, pick-ups, small specialty trucks, buses, livery vehicles, box trucks, straight trucks, cargo and passenger vans, trailers, dump trucks, and flatbed trucks. Certain vehicle types may have restrictions based on use and business type."
  },
  {
    question: "Does Bristol West offer filing services?",
    answer: "Yes, Bristol West provides state filings, federal filings for interstate operations, SR-22 filings, and Certificates of Insurance (COIs) for your business contracts and requirements."
  },
  {
    question: "What discounts are available with Bristol West Commercial Auto?",
    answer: "Bristol West offers several discounts including Multi-Product Discount, Proof of Prior Insurance discount, and Electronic Funds Transfer (EFT) discount for automatic payments."
  },
  {
    question: "Who underwrites Bristol West Commercial Auto in California?",
    answer: "Bristol West Commercial Auto in California is underwritten by Coast National Insurance Company. Bristol West is a Farmers Insurance Company, providing the backing and stability of a major insurer."
  },
];

export default function BristolWestCommercialAutoLanding() {
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
          source: "Bristol West Commercial Auto Landing Page",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit quote request");
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you shortly about Bristol West Commercial Auto coverage.",
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
    "name": "Casurance - Bristol West Commercial Auto Insurance",
    "description": "Get Bristol West Commercial Auto insurance quotes for California businesses. Coverage for contractors, trucking, delivery, and more through Casurance.",
    "url": "https://casurance.net/bristol-west-commercial-auto",
    "telephone": "1-888-254-0089",
    "areaServed": {
      "@type": "State",
      "name": "California"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bristol West Commercial Auto Insurance",
      "itemListElement": businessTypes.map(type => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": type.label + " Commercial Auto Insurance"
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Bristol West Commercial Auto Insurance California | Casurance</title>
        <meta 
          name="description" 
          content="Get Bristol West Commercial Auto insurance in California. Coverage for contractors, trucking, delivery, landscaping, and more. Underwritten by Coast National Insurance Company. Call 1-888-254-0089." 
        />
        <meta name="keywords" content="Bristol West commercial auto, California commercial auto insurance, trucking insurance, contractor vehicle insurance, delivery insurance, Coast National Insurance" />
        <link rel="canonical" href="https://casurance.net/bristol-west-commercial-auto" />
        <meta property="og:title" content="Bristol West Commercial Auto Insurance California | Casurance" />
        <meta property="og:description" content="Get Bristol West Commercial Auto insurance in California. Coverage for contractors, trucking, delivery, landscaping, and more." />
        <meta property="og:url" content="https://casurance.net/bristol-west-commercial-auto" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bristol West Commercial Auto Insurance California | Casurance" />
        <meta name="twitter:description" content="Get Bristol West Commercial Auto insurance in California through Casurance." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-[#00529B] via-[#003d73] to-[#002a4f] text-white py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={bristolWestLogo} 
                      alt="Bristol West - A Farmers Insurance Company" 
                      className="h-12 bg-white rounded px-3 py-2"
                      data-testid="img-bristol-west-logo"
                    />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Bristol West Commercial Auto Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-4">
                    California Commercial Auto Coverage
                  </p>
                  <p className="text-lg text-white/80 mb-8">
                    Comprehensive commercial vehicle protection for California businesses. Underwritten by Coast National Insurance Company, backed by Farmers Insurance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#quote-form">
                      <Button size="lg" className="bg-white text-[#00529B] hover:bg-white/90 w-full sm:w-auto" data-testid="button-get-quote-hero">
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
                      <p className="text-gray-600">A Casurance agent will contact you shortly about your Bristol West Commercial Auto quote.</p>
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
                                    <SelectItem value="CA">California</SelectItem>
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
                                  {businessTypes.map((type) => (
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
                          className="w-full bg-[#00529B] hover:bg-[#003d73]" 
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

          {/* Business Types Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-business-types-title">
                  Business Types We Cover
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Bristol West provides commercial auto coverage for a wide range of California businesses
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {businessTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`business-type-${index}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <IconComponent className="h-5 w-5 text-[#00529B] flex-shrink-0" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Vehicle Types Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-vehicle-types-title">
                  Vehicle Types Covered
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From cars and SUVs to heavy trucks and trailers
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {vehicleTypes.map((vehicle, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-muted/50 rounded-lg p-4"
                    data-testid={`vehicle-type-${index}`}
                  >
                    <Truck className="h-5 w-5 text-[#00529B] flex-shrink-0" />
                    <span className="font-medium">{vehicle}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coverage Options Section */}
          <section className="py-16 bg-[#00529B] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-coverage-title">
                  Coverage Options
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Customize your Bristol West commercial auto policy with the coverage your business needs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {coverageOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur rounded-lg p-4"
                    data-testid={`coverage-option-${index}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="font-semibold">{option.name}</span>
                    </div>
                    <p className="text-white/70 text-sm ml-8">{option.description}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Filings & Certificates</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {filingTypes.map((filing, index) => (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur rounded-lg p-4"
                      data-testid={`filing-type-${index}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">{filing.name}</span>
                      </div>
                      <p className="text-white/70 text-sm ml-8">{filing.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 text-center">
                <a href="#quote-form">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#00529B] hover:bg-white/90"
                    data-testid="button-get-quote-cta"
                  >
                    Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Why Bristol West Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-why-title">
                  Why Choose Bristol West
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Trusted commercial auto coverage backed by Farmers Insurance
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card data-testid="why-card-0">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-[#00529B] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Farmers Insurance Backing</h3>
                    <p className="text-muted-foreground">Bristol West is a Farmers Insurance Company, providing the financial strength and stability you need.</p>
                  </CardContent>
                </Card>
                <Card data-testid="why-card-1">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-12 w-12 text-[#00529B] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Quick Online Quoting</h3>
                    <p className="text-muted-foreground">Get fast quotes and bind coverage quickly through our efficient quoting process.</p>
                  </CardContent>
                </Card>
                <Card data-testid="why-card-2">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-[#00529B] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                    <p className="text-muted-foreground">Access producer-dedicated services at IAProducers.com and customer support at BristolWest.com.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-background">
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
                    className="bg-muted/30 rounded-lg px-6"
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
          <section className="py-16 bg-[#00529B] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
                Ready to Protect Your California Business?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Get a Bristol West Commercial Auto quote today through Casurance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#quote-form">
                  <Button size="lg" className="bg-white text-[#00529B] hover:bg-white/90" data-testid="button-cta-quote">
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
