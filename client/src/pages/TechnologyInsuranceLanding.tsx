import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  Cpu,
  Server,
  Cloud,
  Code,
  Monitor,
  Laptop,
  Lock,
  FileText,
  Users,
  Zap,
  Globe,
  Star
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import techImage from "@assets/stock_images/modern_technology_co_5b102fea.jpg";
import chubbLogo from "@assets/CHUBB_Logo_Black_RBG_(1)_1765300717619.jpg";

export default function TechnologyInsuranceLanding() {
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
        businessName: formData.companyName,
        contactName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        insuranceType: "Technology Companies Insurance",
        industry: formData.businessType,
        employeeCount: formData.employees,
        annualRevenue: formData.annualRevenue,
        additionalInfo: JSON.stringify({
          state: formData.state,
          message: formData.message,
          source: "technology-insurance-landing"
        })
      });
      
      toast({
        title: "Quote Request Submitted!",
        description: "A technology insurance specialist will contact you within 24 hours.",
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

  const propertyCasualtyProducts = [
    { name: "Commercial Package (CMP)", description: "Bundled property and liability protection" },
    { name: "Commercial Property", description: "Protection for buildings, equipment, inventory" },
    { name: "Commercial Auto", description: "Fleet and business vehicle coverage" },
    { name: "Workers Compensation", description: "Employee injury and illness coverage" },
    { name: "Umbrella & Excess Casualty", description: "Additional liability limits" },
    { name: "Equipment Breakdown", description: "Coverage for critical tech equipment" },
    { name: "Builders Risk", description: "Coverage for construction projects" },
    { name: "Environmental", description: "Pollution and environmental liability" },
    { name: "Marine", description: "Cargo and transit coverage" }
  ];

  const financialLinesProducts = [
    { name: "Cyber Liability", description: "Data breach, ransomware, network security" },
    { name: "Errors & Omissions (E&O)", description: "Professional liability for tech services" },
    { name: "Directors & Officers (D&O)", description: "Executive and board protection" },
    { name: "Employment Practices Liability", description: "HR-related claims coverage" },
    { name: "Crime/Financial Fidelity", description: "Employee theft and fraud protection" },
    { name: "Fiduciary Liability", description: "Benefit plan administration coverage" },
    { name: "Kidnap Ransom & Extortion", description: "Executive security protection" },
    { name: "Media Liability", description: "IP and content-related claims" }
  ];

  const targetClasses = [
    { icon: Code, name: "Software Developers", description: "Packaged & custom software" },
    { icon: Server, name: "Hardware Manufacturers", description: "Electronics & components" },
    { icon: Cloud, name: "Cloud & SaaS Providers", description: "Hosted services & platforms" },
    { icon: Monitor, name: "IT Services & Consulting", description: "Tech support & integration" },
    { icon: Globe, name: "Telecom Providers", description: "Network & communications" },
    { icon: Cpu, name: "System Integrators", description: "Enterprise solutions" }
  ];

  const riskScenarios = [
    {
      title: "M&A Exposure",
      description: "Your directors agree to acquire a smaller competitor, but could that put your directors at risk of a lawsuit?"
    },
    {
      title: "SaaS System Failure",
      description: "Your company offers software as a service (SaaS); any failure of your systems could have a significant ripple effect for your customers."
    },
    {
      title: "Disaster Recovery",
      description: "If your data centers are down following a natural disaster, does your disaster recovery plan help you minimize this disruption?"
    },
    {
      title: "Employment Practices",
      description: "Your company operates in a highly competitive environment. Could you be at higher risk for employee claims of discrimination, wrongful termination, or retaliation?"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Technology Companies Insurance | Software Developer Coverage | Casurance</title>
        <meta name="description" content="Comprehensive insurance for technology companies, software developers, hardware manufacturers, and IT services. Authorized Chubb Agent offering E&O, Cyber, D&O, and Property coverage. Get a free quote." />
        <meta name="keywords" content="technology insurance, software developer insurance, tech company insurance, cyber liability, E&O insurance, IT services insurance, Chubb agent" />
        <link rel="canonical" href="https://casurance.com/technology-insurance" />
        <meta property="og:title" content="Technology Companies Insurance | Casurance - Authorized Chubb Agent" />
        <meta property="og:description" content="Comprehensive insurance solutions for tech companies. E&O, Cyber, D&O, Property coverage from an Authorized Chubb Agent." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src={techImage} 
              alt="Modern technology company office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Authorized Chubb Agent</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
                  Technology Companies
                  <span className="text-blue-400 block">Insurance Solutions</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  From software developers to hardware manufacturers, cloud providers to IT consultants - 
                  we provide comprehensive insurance solutions tailored for the technology industry.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
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
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span>A++ Rated Carriers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span>30+ Years Tech Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span>Nationwide Coverage</span>
                  </div>
                </div>
              </div>

              {/* Quick Quote Form */}
              <div id="quick-quote-form" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Free Instant Quote</h2>
                      <p className="text-blue-200 text-sm mt-1">Technology Companies Insurance</p>
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
                        placeholder="Acme Technologies Inc."
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
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="WA">Washington</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                            <SelectItem value="OR">Oregon</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="other">Other State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessType" className="text-gray-900 font-medium">Business Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                          <SelectTrigger className="mt-1" data-testid="select-business-type">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="software-developer">Software Developer</SelectItem>
                            <SelectItem value="hardware-manufacturer">Hardware Manufacturer</SelectItem>
                            <SelectItem value="saas-provider">SaaS Provider</SelectItem>
                            <SelectItem value="it-consulting">IT Consulting</SelectItem>
                            <SelectItem value="cloud-services">Cloud Services</SelectItem>
                            <SelectItem value="system-integrator">System Integrator</SelectItem>
                            <SelectItem value="telecom">Telecom Provider</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
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
        <section className="py-8 bg-gradient-to-r from-blue-900 to-blue-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white text-center">
              <div className="bg-white p-3 rounded-lg">
                <img src={chubbLogo} alt="Chubb Logo" className="h-8 w-auto" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Authorized Chubb Agent</h3>
                <p className="text-blue-200">World's largest publicly traded P&C insurer | A++ (Superior) AM Best Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Classes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Technology Companies We Insure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From startups to Fortune 500, we have specialized coverage for every type of technology business.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {targetClasses.map((type, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Solutions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Software & Technology Coverage Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive protection designed specifically for the unique risks facing technology companies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Property & Casualty */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">Property & Casualty Solutions</CardTitle>
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
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Lock className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">Financial Lines Liability</CardTitle>
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

        {/* Risk Scenarios */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Manage Technology Company Risks
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Consider these common risk scenarios facing technology companies today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskScenarios.map((scenario, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{scenario.title}</h3>
                  <p className="text-gray-400 text-sm">{scenario.description}</p>
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
                Why Choose Casurance for Technology Insurance
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Authorized Chubb Agent</h3>
                <p className="text-gray-600 text-sm">Access to A++ rated carrier with 30+ years tech expertise</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Tech Specialists</h3>
                <p className="text-gray-600 text-sm">Underwriters who understand complex technology exposures</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Global Capabilities</h3>
                <p className="text-gray-600 text-sm">Multinational coverage for international operations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Claims Excellence</h3>
                <p className="text-gray-600 text-sm">#1 rated claims service in property and casualty</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Protect Your Technology Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a customized quote from our technology insurance specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold"
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
