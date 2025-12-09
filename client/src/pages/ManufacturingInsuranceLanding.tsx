import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Scale, 
  BadgeCheck,
  ShieldCheck,
  Factory,
  Cog,
  Wrench,
  Truck,
  Package,
  Zap,
  Globe,
  Star,
  Users,
  FileText,
  Leaf,
  HardHat
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import manufacturingImage from "@assets/stock_images/manufacturing_factor_2d8c3c4e.jpg";
import chubbLogo from "@assets/CHUBB_Logo_Black_RBG_(1)_1765300717619.jpg";

export default function ManufacturingInsuranceLanding() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    state: "",
    businessType: "",
    annualRevenue: "",
    employees: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/quote-requests", {
        ...formData,
        insuranceType: "Manufacturing Insurance",
        source: "manufacturing-insurance-landing"
      });
      
      toast({
        title: "Quote Request Submitted!",
        description: "A manufacturing insurance specialist will contact you within 24 hours.",
      });
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        state: "",
        businessType: "",
        annualRevenue: "",
        employees: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuote = () => {
    document.getElementById("quick-quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const chubbSolutions = [
    "Primary Casualty",
    "Property",
    "Umbrella",
    "Accident & Health",
    "Cyber",
    "Environmental",
    "Financial Lines",
    "Multinational",
    "Product Recall",
    "E&O",
    "Foreign",
    "Marine",
    "Aviation"
  ];

  const propertyCasualtyProducts = [
    { name: "Commercial Property", description: "Buildings, equipment, inventory protection" },
    { name: "Equipment Breakdown", description: "Coverage for machinery and production equipment" },
    { name: "Business Interruption", description: "Lost income from covered events" },
    { name: "Workers Compensation", description: "Employee injury and illness coverage" },
    { name: "Commercial Auto", description: "Fleet and delivery vehicle coverage" },
    { name: "Umbrella & Excess", description: "Additional liability limits" },
    { name: "Environmental", description: "Pollution and contamination liability" },
    { name: "Marine & Cargo", description: "Transit and shipping coverage" }
  ];

  const financialLinesProducts = [
    { name: "Product Liability", description: "Protection for product-related claims" },
    { name: "Product Recall", description: "Costs to recall defective products" },
    { name: "Directors & Officers", description: "Executive liability protection" },
    { name: "Cyber Liability", description: "Data breach and network security" },
    { name: "Employment Practices", description: "HR-related claims coverage" },
    { name: "Crime/Fidelity", description: "Employee theft and fraud" }
  ];

  const targetClasses = [
    { icon: Cog, name: "Machinery", description: "Industrial equipment manufacturing" },
    { icon: Wrench, name: "Fabricated Metal", description: "Metal parts and products" },
    { icon: Truck, name: "Auto Parts", description: "Automotive components" },
    { icon: Package, name: "Plastic Products", description: "Plastic manufacturing" },
    { icon: Factory, name: "Chemical", description: "Chemical production" },
    { icon: Leaf, name: "Sustainability", description: "Green manufacturing" }
  ];

  const advancedVsTraditional = {
    advanced: {
      title: "Advanced Manufacturing",
      description: "Utilizes cutting-edge technologies and automation to improve efficiency, flexibility, and product quality, enabling customization and rapid adaptation to market demands.",
      examples: ["Wafer Fabrication", "Robotics & Automation", "Alternative Energy Storage", "Defense Contractors"]
    },
    traditional: {
      title: "Traditional Manufacturing",
      description: "Relies on conventional methods with proven processes, standard production lines, and established quality control.",
      examples: ["Machine Shops", "Plastic Packaging", "Swimming Pool Manufacturing", "Athletic Apparel"]
    }
  };

  const claimExamples = [
    {
      title: "Imported Product Fire",
      description: "A manufacturer imported a pump from China that caught fire, causing $2.45mm in damages. No subrogation was possible. Claim settled in excess of $1.1mm plus $150K defense expenses."
    },
    {
      title: "Environmental Remediation",
      description: "After a fire destroyed a facility, pollutants were identified requiring state-mandated cleanup. Chubb's Environmental policy covered approximately $5mm for site remediation."
    },
    {
      title: "Fire Suppression Discovery",
      description: "During a site survey, an inactive deluge fire suppression system was discovered over bulk ammonia storage. Immediate re-activation prevented potential catastrophic loss."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Manufacturing Insurance | Industrial Coverage | Casurance</title>
        <meta name="description" content="Comprehensive insurance for manufacturers including machinery, fabricated metal, auto parts, plastics, and chemicals. Authorized Chubb Agent with 50+ years manufacturing expertise. Get a free quote." />
        <meta name="keywords" content="manufacturing insurance, industrial insurance, product liability, equipment breakdown, factory insurance, Chubb agent, manufacturing coverage" />
        <link rel="canonical" href="https://casurance.com/manufacturing-insurance" />
        <meta property="og:title" content="Manufacturing Insurance | Casurance - Authorized Chubb Agent" />
        <meta property="og:description" content="Comprehensive insurance solutions for manufacturers. Property, Product Liability, Environmental, Workers Comp from an Authorized Chubb Agent." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src={manufacturingImage} 
              alt="Manufacturing factory production line" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Authorized Chubb Agent</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
                  Manufacturing
                  <span className="text-orange-400 block">Insurance Solutions</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  From advanced robotics to traditional production lines - we provide comprehensive 
                  insurance solutions for manufacturers of all types and sizes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    onClick={scrollToQuote}
                    data-testid="button-hero-quote"
                  >
                    Get a Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:888-254-0089" data-testid="link-call-hero">
                      <Phone className="mr-2 w-5 h-5" />
                      888-254-0089
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    <span>50+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    <span>A++ Rated Carrier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    <span>Global Capabilities</span>
                  </div>
                </div>
              </div>

              {/* Quick Quote Form */}
              <div id="quick-quote-form" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Free Instant Quote</h2>
                      <p className="text-orange-200 text-sm mt-1">Manufacturing Insurance</p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">24hr Response</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-900 font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="John"
                          required
                          className="mt-1"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-900 font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Doe"
                          required
                          className="mt-1"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="companyName" className="text-gray-900 font-medium">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Acme Manufacturing Inc."
                        required
                        className="mt-1"
                        data-testid="input-company-name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          required
                          className="mt-1"
                          data-testid="input-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-900 font-medium">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          required
                          className="mt-1"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-gray-900 font-medium">State</Label>
                        <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                          <SelectTrigger className="mt-1" data-testid="select-state">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="MI">Michigan</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="IN">Indiana</SelectItem>
                            <SelectItem value="WI">Wisconsin</SelectItem>
                            <SelectItem value="NC">North Carolina</SelectItem>
                            <SelectItem value="other">Other State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessType" className="text-gray-900 font-medium">Manufacturing Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                          <SelectTrigger className="mt-1" data-testid="select-business-type">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="machinery">Machinery</SelectItem>
                            <SelectItem value="fabricated-metal">Fabricated Metal</SelectItem>
                            <SelectItem value="auto-parts">Auto Parts</SelectItem>
                            <SelectItem value="plastics">Plastic Products</SelectItem>
                            <SelectItem value="chemicals">Chemicals</SelectItem>
                            <SelectItem value="food">Food Manufacturing</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="aerospace">Aerospace</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                      disabled={isSubmitting}
                      data-testid="button-quick-quote-submit"
                    >
                      {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                    </Button>
                  </form>

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

        {/* Chubb Partnership Banner */}
        <section className="py-8 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white text-center">
              <div className="bg-white p-3 rounded-lg">
                <img src={chubbLogo} alt="Chubb Logo" className="h-8 w-auto" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Authorized Chubb Agent</h3>
                <p className="text-orange-200">50+ Years Manufacturing Expertise | A++ (Superior) AM Best Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Classes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Manufacturing Industries We Insure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From small machine shops to multinational manufacturing operations, we have specialized coverage for every type.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {targetClasses.map((type, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced vs Traditional */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Coverage for All Manufacturing Types
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Advanced Manufacturing */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{advancedVsTraditional.advanced.title}</h3>
                </div>
                <p className="text-blue-200 mb-6">{advancedVsTraditional.advanced.description}</p>
                <div className="space-y-2">
                  {advancedVsTraditional.advanced.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Manufacturing */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{advancedVsTraditional.traditional.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{advancedVsTraditional.traditional.description}</p>
                <div className="space-y-2">
                  {advancedVsTraditional.traditional.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Solutions */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Chubb Manufacturing Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive protection designed specifically for the unique risks facing manufacturers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Property & Casualty */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">Property & Casualty</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {propertyCasualtyProducts.map((product, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">{product.name}</span>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Financial Lines */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Scale className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">Financial Lines & Specialty</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {financialLinesProducts.map((product, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">{product.name}</span>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Claims Examples */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Claims We've Handled
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Examples of how comprehensive manufacturing insurance protects your business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {claimExamples.map((claim, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{claim.title}</h3>
                  <p className="text-gray-400 text-sm">{claim.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Casurance */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Casurance for Manufacturing Insurance
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Authorized Chubb Agent</h3>
                <p className="text-gray-600 text-sm">Access to A++ rated carrier with 50+ years manufacturing expertise</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HardHat className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Risk Engineering</h3>
                <p className="text-gray-600 text-sm">500+ global risk engineers with deep manufacturing knowledge</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Global Capabilities</h3>
                <p className="text-gray-600 text-sm">Multinational coverage for international manufacturing operations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Claims Excellence</h3>
                <p className="text-gray-600 text-sm">2,100+ claims professionals with specialized industry experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Protect Your Manufacturing Business?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a customized quote from our manufacturing insurance specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-100 font-semibold"
                onClick={scrollToQuote}
                data-testid="button-cta-quote"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:888-254-0089" data-testid="link-cta-call">
                  <Phone className="mr-2 w-5 h-5" />
                  888-254-0089
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
