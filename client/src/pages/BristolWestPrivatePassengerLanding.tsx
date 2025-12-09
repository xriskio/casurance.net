import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  Car, Shield, CheckCircle, Phone, ArrowRight, 
  CheckCircle2, MapPin, Clock, FileText, Users, Award,
  Umbrella, Heart, DollarSign, AlertTriangle, Key, Truck
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
import bristolWestLogo from "@assets/BristolWest_1765259973928.png";

const quickQuoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  state: z.string().min(1, "Please select a state"),
  vehicleYear: z.string().min(4, "Vehicle year is required"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  priorInsurance: z.string().min(1, "Please select an option"),
  message: z.string().optional(),
});

type QuickQuoteFormData = z.infer<typeof quickQuoteSchema>;

const availableStates = [
  { value: "CA", label: "California" },
  { value: "NV", label: "Nevada" },
  { value: "OH", label: "Ohio" },
];

const coverageTypes = [
  { 
    icon: Shield, 
    title: "Liability Insurance", 
    description: "Helps cover the cost of the other driver's property and bodily injury expenses if you're found at fault in an accident.",
  },
  { 
    icon: Umbrella, 
    title: "Comprehensive Insurance", 
    description: "Provides coverage for physical damage from events that are out of your control, like theft or vandalism and weather events.",
  },
  { 
    icon: Car, 
    title: "Collision Insurance", 
    description: "Helps cover damage when your vehicle collides with another car or object.",
  },
  { 
    icon: Heart, 
    title: "Medical Payments", 
    description: "Covers medical expenses for you and your passengers after an accident, regardless of who is at fault.",
  },
  { 
    icon: Users, 
    title: "Uninsured/Underinsured Motorist", 
    description: "Protects you when hit by a driver without adequate insurance coverage.",
  },
  { 
    icon: DollarSign, 
    title: "Rental Reimbursement", 
    description: "Covers the cost of a rental car while your vehicle is being repaired after a covered claim.",
  },
];

const customerBenefits = [
  {
    icon: Users,
    title: "Permissive User Coverage",
    description: "By providing a driver permission to use your vehicle, they are covered under your vehicle's insurance.",
  },
  {
    icon: Truck,
    title: "$500 Trailer Physical Damage",
    description: "Liability coverage is provided for a trailer you own that is attached to a covered vehicle.",
  },
  {
    icon: Car,
    title: "Rental Car Coverage",
    description: "If you rent a car, you'll enjoy the same coverage as your personal, Bristol West insured vehicle.",
  },
  {
    icon: Key,
    title: "Rideshare Coverage Option",
    description: "Extends your personal auto policy limits and coverage if you conduct Rideshare activities, including Uber Eats.",
  },
];

const commonNeeds = [
  {
    title: "No Prior Insurance?",
    subtitle: "We can help:",
    description: "If you never had car insurance, or you let your car insurance lapse, Bristol West can help. We accept nearly all customers with, or without, prior car insurance at competitive rates.",
    icon: FileText,
  },
  {
    title: "Received a DUI/DWI or OWI?",
    subtitle: "We can help:",
    description: "Bristol West offers reasonably priced coverage if you are convicted of driving under the influence (DUI), driving while intoxicated (DWI), or operating while intoxicated (OWI). We also can provide an SR-22/FR-44 certificate of financial responsibility, if needed.",
    icon: AlertTriangle,
  },
  {
    title: "Need an SR-22/FR-44?",
    subtitle: "Same Day Filings Available:",
    description: "An SR-22 is a certificate of financial responsibility, required by your state or court order. This form serves as proof that your auto insurance policy meets the minimum Liability coverage required by state law. Same Day Filings for SR-22 available for California, Nevada, and Ohio.",
    icon: FileText,
  },
  {
    title: "Need Rideshare Coverage?",
    subtitle: "We provide coverage:",
    description: "Bristol West offers Rideshare coverage as an optional endorsement. It's a smart choice if you drive under a ridesharing platform like Uber or Lyft. Rideshare coverage fills the gaps between your personal insurance and any insurance provided by the ridesharing company.",
    icon: Car,
  },
  {
    title: "Don't Own a Car?",
    subtitle: "Non-Owner Insurance Available:",
    description: "If you don't own a car, or don't have regular access to a vehicle, a Non-Owner Auto insurance policy might be right for you. If you cause an accident while borrowing a vehicle, a Non-Owner policy provides Liability coverage for bodily injury and property damage.",
    icon: Key,
  },
];

const faqs = [
  {
    question: "What states offer Bristol West private passenger auto through Casurance?",
    answer: "Casurance offers Bristol West private passenger auto insurance in California, Nevada, and Ohio. Contact us to get a quote and learn about coverage options available in your state."
  },
  {
    question: "Can I get coverage with a less-than-perfect driving record?",
    answer: "Yes! Bristol West specializes in providing quality auto insurance for drivers with less-than-perfect records, including those with traffic violations, no prior insurance, or even a DUI/DWI conviction."
  },
  {
    question: "What is an SR-22 and do I need one?",
    answer: "An SR-22 is a certificate of financial responsibility that proves you carry the minimum required auto liability insurance. It's often required after serious traffic violations or if you've been caught driving without insurance. Bristol West offers same-day SR-22 filings for California, Nevada, and Ohio."
  },
  {
    question: "Does Bristol West offer rideshare coverage?",
    answer: "Yes! Bristol West offers rideshare coverage as an optional endorsement. This coverage extends your personal auto policy limits if you drive for platforms like Uber, Lyft, or Uber Eats, filling gaps between your personal insurance and the ridesharing company's coverage."
  },
  {
    question: "What if I don't have prior insurance?",
    answer: "Bristol West accepts nearly all customers with or without prior car insurance at competitive rates. We understand that not everyone has had continuous coverage, and we're here to help you get the protection you need."
  },
  {
    question: "How do I file a claim?",
    answer: "You can file a claim through Bristol West's 24/7 claims service online at BristolWest.com or by calling their claims hotline. Casurance is also available to assist you throughout the claims process as your local agent."
  },
];

const stats = [
  { value: "3", label: "States Available", icon: MapPin },
  { value: "A", label: "AM Best Rating", icon: Award },
  { value: "24/7", label: "Claims Service", icon: Clock },
  { value: "Same Day", label: "SR-22 Filings", icon: FileText },
];

export default function BristolWestPrivatePassengerLanding() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuickQuoteFormData>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      priorInsurance: "",
      message: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuickQuoteFormData) => {
      const response = await fetch("/api/quick-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`,
          contact_name: data.fullName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          coverage_type: "Bristol West Private Passenger Auto",
          message: `Prior Insurance: ${data.priorInsurance}. ${data.message || ""}`,
          source: "bristol-west-private-passenger",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit quote");
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "A Casurance agent will contact you shortly about your Bristol West auto quote.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
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
    "name": "Casurance - Bristol West Private Passenger Auto",
    "description": "Get Bristol West Private Passenger Auto insurance quotes for California, Nevada, and Ohio. Coverage for all drivers including those with DUI, no prior insurance, or traffic violations.",
    "url": "https://casurance.net/bristol-west-private-passenger",
    "telephone": "1-888-254-0089",
    "areaServed": availableStates.map(state => ({
      "@type": "State",
      "name": state.label
    })),
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "InsuranceProduct",
        "name": "Bristol West Private Passenger Auto Insurance",
        "provider": {
          "@type": "Organization",
          "name": "Bristol West Insurance Group"
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Bristol West Private Passenger Auto Insurance | CA, NV, OH | Casurance</title>
        <meta 
          name="description" 
          content="Get Bristol West auto insurance for California, Nevada, and Ohio. Coverage for all drivers - DUI, no prior insurance, SR-22 filings. Same day SR-22. Call 1-888-254-0089." 
        />
        <meta name="keywords" content="Bristol West auto insurance, private passenger auto, California auto insurance, Nevada auto insurance, Ohio auto insurance, SR-22 filing, DUI insurance, no prior insurance" />
        <link rel="canonical" href="https://casurance.net/bristol-west-private-passenger" />
        <meta property="og:title" content="Bristol West Private Passenger Auto Insurance | CA, NV, OH | Casurance" />
        <meta property="og:description" content="Quality auto insurance at affordable rates for all drivers. Same day SR-22 filings available." />
        <meta property="og:url" content="https://casurance.net/bristol-west-private-passenger" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#0055a5] text-white py-16 lg:py-24">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={bristolWestLogo} 
                      alt="Bristol West - A Farmers Insurance Company" 
                      className="h-16 bg-white rounded px-3 py-2"
                      data-testid="img-bristol-west-logo"
                    />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                    Bristol West Private Passenger Auto Insurance
                  </h1>
                  <p className="text-xl text-white/90 mb-4">
                    California | Nevada | Ohio
                  </p>
                  <p className="text-lg text-white/80 mb-6">
                    Quality auto insurance at affordable rates for a wide range of drivers. Whether you have a less-than-perfect driving record, no prior insurance, or traffic violations — even a DUI — we've got you covered.
                  </p>
                  <div className="flex items-center gap-2 mb-8">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="text-white/90 font-medium">A Farmers Insurance Company</span>
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
                    Get Your Free Quote
                  </h2>
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="form-success">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600">A Casurance agent will contact you shortly about your Bristol West auto insurance quote.</p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your Full Name" data-testid="input-full-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Email</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" placeholder="you@email.com" data-testid="input-email" />
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
                        <div className="grid grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name="vehicleYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Year</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="2024" data-testid="input-vehicle-year" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleMake"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Make</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Toyota" data-testid="input-vehicle-make" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Model</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Camry" data-testid="input-vehicle-model" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="priorInsurance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Do you currently have auto insurance?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-prior-insurance">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes, I have current coverage</SelectItem>
                                  <SelectItem value="no">No, I don't have coverage</SelectItem>
                                  <SelectItem value="lapsed">My coverage has lapsed</SelectItem>
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
                                <Textarea {...field} placeholder="Need SR-22? DUI/DWI? Tell us more..." rows={2} data-testid="input-message" />
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

          {/* Stats Section */}
          <section className="py-8 bg-muted/50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center" data-testid={`stat-${index}`}>
                      <IconComponent className="h-8 w-8 mx-auto mb-2 text-[#003366]" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Coverage Types Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-coverage-title">
                  Coverage Options
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  You can be confident knowing Bristol West has coverage for you
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageTypes.map((coverage, index) => {
                  const IconComponent = coverage.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`coverage-${index}`}>
                      <CardContent className="p-6">
                        <IconComponent className="h-10 w-10 text-[#003366] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{coverage.title}</h3>
                        <p className="text-sm text-muted-foreground">{coverage.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Customer Benefits Section */}
          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="text-benefits-title">
                  As a Bristol West Customer, You'll Enjoy
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {customerBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur rounded-lg p-5"
                      data-testid={`benefit-${index}`}
                    >
                      <IconComponent className="h-8 w-8 text-white mb-4" />
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-white/70 text-sm">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Common Needs Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-needs-title">
                  Common Car Insurance Needs
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Bristol West specializes in helping drivers with unique situations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonNeeds.map((need, index) => {
                  const IconComponent = need.icon;
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`need-${index}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-[#003366]/10 p-3 rounded-lg flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-[#003366]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{need.title}</h3>
                            <p className="text-sm text-primary font-medium mb-2">{need.subtitle}</p>
                            <p className="text-sm text-muted-foreground">{need.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="text-why-choose-title">
                    Why Choose Bristol West?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Bristol West offers flexible, hassle-free car insurance to fit most budgets. We offer competitive rates and payment options, including lower down payments to meet your needs.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Same Day SR-22 Filings for California, Nevada, and Ohio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Coverage for drivers with less-than-perfect records</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Competitive rates for drivers without prior insurance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>DUI/DWI coverage available at reasonable rates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Rideshare coverage for Uber, Lyft, and delivery drivers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible payment options with lower down payments</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-8">
                  <div className="text-center mb-6">
                    <img 
                      src={bristolWestLogo} 
                      alt="Bristol West" 
                      className="h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-foreground">A Farmers Insurance Company</h3>
                    <p className="text-muted-foreground">Backed by one of America's largest insurance groups</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {availableStates.map((state) => (
                      <div key={state.value} className="bg-background rounded-lg p-4">
                        <MapPin className="h-6 w-6 mx-auto mb-2 text-[#003366]" />
                        <div className="font-bold text-lg">{state.value}</div>
                        <div className="text-xs text-muted-foreground">{state.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
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
                    className="bg-background rounded-lg px-6 border"
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
              <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
                Ready to Get Covered?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Get a Bristol West auto insurance quote for California, Nevada, or Ohio today
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
