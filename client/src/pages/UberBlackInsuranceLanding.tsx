import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_STATES } from "@shared/constants/states";
import { 
  Phone, 
  Shield, 
  Car, 
  FileCheck, 
  Clock, 
  Users, 
  CheckCircle2,
  Building2,
  Star,
  Award,
  Zap,
  FileText,
  HeadphonesIcon,
  MapPin,
  ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

import suburbanImage from "@assets/2017-Chevrolet-Suburban-COLOR-Black_1765266976772.png";
import teslaXImage from "@assets/modelX_1765267556294.png";
import teslaSImage from "@assets/Black-Model-S-P90D-Arachnid-Wheel-e1464681843999-1000x600-1_1765267556294.png";

const vehicleShowcase = [
  { image: suburbanImage, alt: "Black Chevrolet Suburban", category: "Premium SUV", name: "Black Chevrolet Suburban" },
  { image: teslaXImage, alt: "Black Tesla Model X", category: "Electric SUV", name: "Black Tesla Model X" },
  { image: teslaSImage, alt: "Black Tesla Model S", category: "Electric Sedan", name: "Black Tesla Model S" },
];

const highlightedStates = ["CA", "NV", "AZ"];


const vehicleTypes = [
  {
    title: "Luxury Sedans",
    examples: "Lincoln Continental, Cadillac CT6, Mercedes S-Class, BMW 7 Series",
    icon: Car
  },
  {
    title: "Premium SUVs",
    examples: "Cadillac Escalade, Lincoln Navigator, Mercedes GLS, BMW X7",
    icon: Car
  },
  {
    title: "Executive Vehicles",
    examples: "Audi A8, Genesis G90, Lexus LS, Mercedes E-Class",
    icon: Car
  },
  {
    title: "Electric Luxury",
    examples: "Tesla Model S, Tesla Model X, Lucid Air, Mercedes EQS",
    icon: Zap
  },
  {
    title: "Stretch Limousines",
    examples: "Lincoln MKT Stretch, Cadillac Escalade Stretch, Chrysler 300 Limo",
    icon: Car
  },
  {
    title: "Executive Sprinters",
    examples: "Mercedes Sprinter Executive, Luxury Sprinter Vans",
    icon: Car
  },
  {
    title: "Ultra-Luxury Imports",
    examples: "Bentley, Rolls-Royce, Maybach, Range Rover",
    icon: Star
  },
  {
    title: "Airport Black Cars",
    examples: "Town Cars, Executive Sedans, Chauffeur Vehicles",
    icon: Building2
  }
];

const coverages = [
  {
    title: "Commercial Auto Liability",
    description: "Comprehensive protection up to $1.5M combined single limit covering third-party bodily injury, property damage, and legal defense costs if you're involved in an at-fault accident.",
    icon: Shield
  },
  {
    title: "Comprehensive & Collision",
    description: "Full physical damage coverage for your luxury vehicle whether you own or lease. Covers collision damage, theft, vandalism, fire, weather events, and more with flexible deductible options.",
    icon: Car
  },
  {
    title: "Hired & Non-Owned Auto",
    description: "Essential coverage for substitute vehicles while your primary vehicle is being serviced. Protects you when using rental or borrowed vehicles for business purposes.",
    icon: FileCheck
  },
  {
    title: "Uninsured/Underinsured Motorist",
    description: "Protection when other drivers lack adequate insurance. Covers your medical expenses and vehicle damage when the at-fault party cannot pay.",
    icon: Users
  }
];

const whyChooseUs = [
  {
    title: "TCP Gap Coverage",
    description: "Complete protection from app-on to ride complete, covering gaps in Uber's commercial coverage",
    icon: Shield
  },
  {
    title: "Competitive Rates",
    description: "Affordable pricing specifically tailored for luxury rideshare and livery operators",
    icon: Award
  },
  {
    title: "Fast Quote Turnaround",
    description: "Receive your customized quote within 24 hours with quick policy binding available",
    icon: Clock
  },
  {
    title: "Next Day CPUC Filings",
    description: "California CPUC filings submitted the next business day once your policy is bound",
    icon: FileText
  },
  {
    title: "Same Day Certificates",
    description: "Certificates of Insurance and Auto ID cards issued same day for immediate compliance",
    icon: Zap
  },
  {
    title: "Fleet Discounts",
    description: "Multi-vehicle discounts available for operators with 2+ luxury vehicles",
    icon: Car
  },
  {
    title: "A-Rated Carriers",
    description: "Coverage through top-rated insurance carriers for maximum financial security",
    icon: Star
  },
  {
    title: "24/7 Claims Support",
    description: "Round-the-clock claims assistance to get you back on the road quickly",
    icon: HeadphonesIcon
  }
];

const requirements = [
  "Must carry commercial auto insurance (personal auto does not qualify)",
  "Vehicle must meet Uber Black luxury standards (black exterior, leather interior)",
  "Vehicle must be no more than 5 years old",
  "Drivers must maintain a high star rating (typically 4.85+)",
  "Vehicle must pass Uber's vehicle inspection requirements",
  "Valid TCP authority required in California"
];

const faqs = [
  {
    question: "How much does Uber Black insurance cost?",
    answer: "Rates vary based on your location, vehicle type, driving history, and coverage needs. Contact Casurance at 1-888-254-0089 for a personalized quote tailored to your specific situation. We work with multiple carriers to find you the most competitive rates available for your luxury vehicle."
  },
  {
    question: "Does Uber Black insurance qualify as commercial auto insurance?",
    answer: "Yes. Our Uber Black policies are full commercial auto insurance policies that meet all Uber requirements and state regulations. Unlike personal auto with a rideshare endorsement, our policies are specifically designed for professional livery operations and satisfy TCP requirements."
  },
  {
    question: "What vehicles qualify for Uber Black?",
    answer: "Uber Black requires luxury vehicles with black exterior and leather interior, typically no more than 5 years old. Popular qualifying vehicles include Cadillac CT6/Escalade, Lincoln Continental/Navigator, Mercedes S-Class, BMW 7 Series, Audi A8, Tesla Model S/X, and other premium vehicles."
  },
  {
    question: "How quickly can I get my CPUC or state filings?",
    answer: "Once your policy is bound, we submit CPUC filings (California) and other state filings the next business day. Certificates of Insurance and Auto ID cards are issued same day, so you can get on the road and start earning quickly."
  },
  {
    question: "Can I also drive for Uber Black SUV with this insurance?",
    answer: "Yes! Our commercial auto insurance covers both Uber Black (sedan) and Uber Black SUV services. Just ensure your vehicle meets the platform requirements for each service tier you want to operate."
  },
  {
    question: "Why can't I use personal auto insurance for Uber Black?",
    answer: "Unlike standard Uber X, personal auto insurance policies explicitly exclude coverage for commercial livery operations like Uber Black. This creates dangerous coverage gaps that could leave you personally liable. Commercial auto insurance is required by Uber and state regulations for professional transportation services."
  }
];

export default function UberBlackInsuranceLanding() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(0);

  // Auto-rotate vehicles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVehicle((prev) => (prev + 1) % vehicleShowcase.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    effectiveDate: "",
    vehicles: "",
    tcpNumber: "",
    dotNumber: "",
    message: ""
  });

  const handleQuickQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.state || !formData.vehicles) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/quick-quotes", {
        business_name: formData.businessName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        state: formData.state,
        effective_date: formData.effectiveDate,
        insurance_type: "Uber Black / Luxury Rideshare Commercial Auto",
        notes: `Vehicles: ${formData.vehicles}, TCP#: ${formData.tcpNumber || 'N/A'}, DOT#: ${formData.dotNumber || 'N/A'}, Message: ${formData.message || 'N/A'}, Source: Uber Black Quick Quote Form`
      });
      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with your personalized quote."
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        effectiveDate: "",
        vehicles: "",
        tcpNumber: "",
        dotNumber: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again or call us.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Uber Black Insurance | Commercial Auto Coverage for Luxury Rideshare | Casurance"
        description="Specialized commercial auto insurance for Uber Black and Uber Black SUV drivers in California, Nevada, and Arizona. Get comprehensive liability, collision, and TCP gap coverage for your luxury vehicle. Call 1-888-254-0089."
        keywords="Uber Black insurance, commercial auto insurance, luxury rideshare insurance, TCP insurance, livery insurance, black car insurance, Uber Black SUV insurance, California, Nevada, Arizona"
        canonical="https://casurance.com/uber-black-insurance"
        ogType="website"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section - Bold Black with Red Accents + Quick Quote Form */}
        <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#ef4444_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,_#dc2626_0%,_transparent_40%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-500/50 text-sm px-4 py-1.5 font-semibold" data-testid="badge-special-programs">
                  Special Programs - Commercial Auto
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
                  Uber Black Insurance for{" "}
                  <span className="text-red-500">Professional Drivers</span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 max-w-xl">
                  Drive with confidence knowing your luxury vehicle and livelihood are protected. 
                  Commercial auto coverage specifically designed for Uber Black, Uber Black SUV, 
                  and premium rideshare operators.
                </p>
                
                {/* State Availability */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  {SERVICE_STATES.filter(state => highlightedStates.includes(state.value)).map((state) => (
                    <Badge 
                      key={state.value}
                      variant="outline" 
                      className="text-base px-4 py-2 bg-red-600/10 border-red-500/40 text-white font-medium"
                      data-testid={`badge-state-${state.value}`}
                    >
                      <MapPin className="w-4 h-4 mr-2 text-red-400" />
                      {state.label}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 border-red-700"
                    onClick={() => document.getElementById('quick-quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-get-quote-hero"
                  >
                    <FileCheck className="mr-2 h-5 w-5" />
                    Get a Quick Quote
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
                    asChild
                    data-testid="button-call-hero"
                  >
                    <a href="tel:1-888-254-0089">
                      <Phone className="mr-2 h-5 w-5" />
                      Call 1-888-254-0089
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column - Quick Quote Form */}
              <div id="quick-quote-form" className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl overflow-hidden shadow-2xl">
                {/* Form Header */}
                <div className="bg-blue-900 text-center py-6 px-4">
                  <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Free Instant Quote</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" data-testid="text-quick-quote-title">
                    GET YOUR FREE QUOTE NOW
                  </h2>
                  <p className="text-blue-200 text-sm">No commitment required • Takes 2 minutes</p>
                  <div className="mt-3 inline-block bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    Save up to 20% - Professional Drivers
                  </div>
                </div>

                {/* Form Body */}
                <div className="bg-white p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4 text-blue-900">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">In a Hurry? Quick Quote Form</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">Complete the form below for a fast quote. All fields are required.</p>

                  <form onSubmit={handleQuickQuote} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName" className="text-gray-900 font-medium">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Company Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-business-name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-900 font-medium">Your Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="First"
                          value={formData.contactName.split(' ')[0] || ''}
                          onChange={(e) => {
                            const lastName = formData.contactName.split(' ').slice(1).join(' ');
                            setFormData({ ...formData, contactName: `${e.target.value} ${lastName}`.trim() });
                          }}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-900 font-medium invisible">Last</Label>
                        <Input
                          id="lastName"
                          placeholder="Last"
                          value={formData.contactName.split(' ').slice(1).join(' ') || ''}
                          onChange={(e) => {
                            const firstName = formData.contactName.split(' ')[0] || '';
                            setFormData({ ...formData, contactName: `${firstName} ${e.target.value}`.trim() });
                          }}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-gray-900 font-medium">Business Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St, City, State ZIP"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-gray-900 font-medium">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                          <SelectTrigger className="mt-1 bg-white border-gray-300" data-testid="select-state">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="effectiveDate" className="text-gray-900 font-medium">Effective Date</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-effective-date"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicles" className="text-gray-900 font-medium">Vehicles *</Label>
                        <Select value={formData.vehicles} onValueChange={(value) => setFormData({ ...formData, vehicles: value })}>
                          <SelectTrigger className="mt-1 bg-white border-gray-300" data-testid="select-vehicles">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Vehicle</SelectItem>
                            <SelectItem value="2">2 Vehicles</SelectItem>
                            <SelectItem value="3">3 Vehicles</SelectItem>
                            <SelectItem value="4">4 Vehicles</SelectItem>
                            <SelectItem value="5+">5+ Vehicles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tcpNumber" className="text-gray-900 font-medium">
                          TCP Number <span className="text-gray-400 font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="tcpNumber"
                          placeholder="TCP-XXXXX"
                          value={formData.tcpNumber}
                          onChange={(e) => setFormData({ ...formData, tcpNumber: e.target.value })}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-tcp"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-900 font-medium">Additional Comments</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your insurance needs..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        rows={3}
                        data-testid="textarea-message"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 font-semibold"
                      disabled={isSubmitting}
                      data-testid="button-quick-quote-submit"
                    >
                      {isSubmitting ? "Submitting..." : "In a Hurry? Submit Now →"}
                    </Button>
                  </form>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-around items-center text-center">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">Secure</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">No Spam</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">24hr Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Showcase Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Protect Your <span className="text-red-500">Luxury Vehicle</span> with Uber Black Insurance
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We cover multiple luxury vehicle types, including:
              </p>
            </div>
            
            {/* Rotating Vehicle Carousel */}
            <div className="max-w-4xl mx-auto">
              {/* Main Vehicle Display */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/30 bg-black">
                {vehicleShowcase.map((vehicle, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${
                      index === currentVehicle 
                        ? "opacity-100 relative" 
                        : "opacity-0 absolute inset-0"
                    }`}
                    data-testid={`vehicle-slide-${index}`}
                  >
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.alt}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-1">{vehicle.category}</p>
                      <p className="text-white font-bold text-2xl">{vehicle.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center gap-3 mt-6">
                {vehicleShowcase.map((vehicle, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVehicle(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentVehicle 
                        ? "bg-red-500 w-8" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`View ${vehicle.name}`}
                    data-testid={`carousel-indicator-${index}`}
                  />
                ))}
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                {vehicleShowcase.map((vehicle, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVehicle(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 w-24 h-16 ${
                      index === currentVehicle 
                        ? "border-red-500 ring-2 ring-red-500/50" 
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Vehicle Types */}
            <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Cadillac Escalade", "Lincoln Navigator", "BMW 7 Series", "Audi A8", "Genesis G90", "Lucid Air"].map((vehicle, i) => (
                <Badge 
                  key={i}
                  variant="outline"
                  className="text-sm px-4 py-2 bg-gray-800/50 border-gray-600 text-gray-300"
                >
                  {vehicle}
                </Badge>
              ))}
              <Badge 
                variant="outline"
                className="text-sm px-4 py-2 bg-red-600/20 border-red-500/40 text-red-400 font-semibold"
              >
                + Many More
              </Badge>
            </div>
            
            {/* CTA Below Vehicles */}
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-red-600 hover:bg-red-700"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="button-get-quote-vehicles"
              >
                Get Insurance for Uber Black Vehicle
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* What is Uber Black Insurance */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                What is Uber Black Insurance, and Do You Need It?
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Uber Black insurance is specialized commercial auto coverage designed for professional 
                  drivers using luxury vehicles on the Uber Black platform. Unlike standard rideshare services, 
                  <strong className="text-red-600"> your personal auto policy does not qualify you to drive for Uber Black</strong>—you 
                  must carry commercial auto insurance to meet platform and state requirements.
                </p>
                
                <p>
                  Personal auto insurance policies typically exclude coverage for commercial livery operations. 
                  This creates a dangerous gap that could leave you personally liable for accidents, vehicle damage, 
                  and passenger injuries while working. Without proper commercial coverage, a single incident could 
                  result in devastating financial consequences.
                </p>
                
                <p>
                  Casurance's Uber Black insurance bridges this gap completely. From the moment you turn on the app 
                  until the ride is complete, you're fully protected against third-party claims, vehicle damage, 
                  and liability—even if you're at fault. Our policies meet all Uber requirements and state 
                  regulations for TCP (Transportation Charter-Party) operations.
                </p>
              </div>
              
              {/* Coverage Includes Card */}
              <Card className="mt-10 border-blue-500/20 bg-slate-50 dark:bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    Coverage Includes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Commercial Auto Liability up to $1.5M CSL",
                    "Uninsured/Underinsured Motorist Coverage",
                    "Personal Injury Protection (PIP)",
                    "Comprehensive & Collision Coverage",
                    "Hired & Non-Owned Auto Coverage",
                    "Gap Coverage for Leased Vehicles",
                    "Zero Deductible Glass Coverage",
                    "24/7 Claims Support"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                  <Button 
                    size="lg" 
                    className="w-full mt-6 text-lg py-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    data-testid="button-start-quote-coverage"
                  >
                    Start Your Quote
                  </Button>
                </CardContent>
              </Card>

              {/* Requirements Card */}
              <Card className="mt-10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-red-500" />
                    Uber Black Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Includes */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Coverage for <span className="text-red-600">Luxury Rideshare</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our Uber Black insurance policies include everything you need to operate professionally and safely.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {coverages.map((coverage, index) => (
                <Card key={index} className="hover-elevate border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <coverage.icon className="h-6 w-6 text-red-500" />
                      </div>
                      {coverage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{coverage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Coverage List */}
            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-center">Additional Coverage Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Personal Injury Protection (PIP)",
                      "Gap Coverage for Leased Vehicles",
                      "Zero Deductible Glass Coverage",
                      "Medical Payments Coverage",
                      "Rental Reimbursement",
                      "Towing & Labor Coverage"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Luxury Vehicles We Insure */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                All <span className="text-red-600">Luxury Vehicles</span> We Insure
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We specialize in insuring premium vehicles that meet Uber Black and Uber Black SUV 
                platform requirements. Our policies cover a wide range of luxury and executive transportation vehicles.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {vehicleTypes.map((vehicle, index) => (
                <Card key={index} className="text-center hover-elevate group">
                  <CardHeader className="pb-2">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <vehicle.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{vehicle.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Casurance */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-red-500">Casurance</span> for Uber Black Coverage?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                With decades of experience insuring limousines, black cars, and transportation network companies, 
                we understand what it takes to keep you on the road and protected.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="bg-white/5 border-white/10 text-white hover-elevate">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                      <item.icon className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* State Availability */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Coverage Available in <span className="text-red-600">California, Nevada & Arizona</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Casurance provides Uber Black and luxury rideshare insurance across these western states. 
                Get protected no matter where you operate.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {availableStates.map((state) => (
                <Card key={state.abbr} className="text-center hover-elevate border-red-500/20">
                  <CardHeader>
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">{state.abbr}</span>
                    </div>
                    <CardTitle className="text-2xl">{state.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-500" />
                        Uber Black Coverage
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-500" />
                        Uber Black SUV Coverage
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-500" />
                        {state.abbr === "CA" ? "CPUC/TCP Filings" : "State Compliance"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Protect Your Uber Black Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a free, no-obligation quote for your Uber Black or luxury rideshare vehicle. 
                Our specialists understand the unique needs of premium transportation operators and 
                can help you find the right coverage at a competitive price.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-white text-red-600 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  data-testid="button-start-quote-cta"
                >
                  <FileCheck className="mr-2 h-5 w-5" />
                  Start Your Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                  asChild
                  data-testid="button-call-cta"
                >
                  <a href="tel:1-888-254-0089">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 1-888-254-0089
                  </a>
                </Button>
              </div>
              
              {/* License Info */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/80">CA License #6005562</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
