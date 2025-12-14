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
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Car, 
  Users, 
  Phone, 
  CheckCircle2,
  Clock,
  Award,
  DollarSign,
  Star,
  ChevronRight,
  Briefcase,
  Scale,
  FileCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

import sedanImage from "@assets/stock_images/luxury_black_sedan_l_5863cf6f.jpg";
import suvImage from "@assets/stock_images/cadillac_escalade_lu_ac93e6a7.jpg";
import sprinterImage from "@assets/stock_images/mercedes_sprinter_bl_599e2123.jpg";
import limoImage from "@assets/stock_images/stretch_limousine_pa_6081117d.jpg";

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const vehicleTypes = [
  "Sedan / Town Car",
  "Luxury SUV (Escalade, Navigator)",
  "Stretch Limousine",
  "Mercedes Sprinter",
  "Party Bus",
  "Motorcoach / Charter Bus",
  "Mixed Fleet"
];

const features = [
  { icon: <Shield className="h-6 w-6" />, title: "TCP/PUC Compliant", description: "Policies that meet all California CPUC and state PUC requirements" },
  { icon: <DollarSign className="h-6 w-6" />, title: "Competitive Rates", description: "Fleet discounts and flexible payment options available" },
  { icon: <FileCheck className="h-6 w-6" />, title: "Fast Certificates", description: "Same-day certificate issuance for airport and venue requirements" },
  { icon: <Clock className="h-6 w-6" />, title: "24/7 Claims", description: "Round-the-clock claims support when you need it most" },
  { icon: <Award className="h-6 w-6" />, title: "A-Rated Carriers", description: "Coverage backed by top-rated insurance companies" },
  { icon: <Users className="h-6 w-6" />, title: "Expert Support", description: "Specialized agents who understand limousine operations" }
];

const coverageTypes = [
  { title: "Auto Liability", limit: "$750K - $5M+", description: "Required coverage for passenger transportation" },
  { title: "Physical Damage", limit: "Stated Value", description: "Comprehensive & collision for your fleet" },
  { title: "General Liability", limit: "$1M/$2M", description: "Protection for non-driving operations" },
  { title: "Workers' Comp", limit: "Statutory", description: "Coverage for your chauffeurs and staff" }
];

export default function LimousineInsuranceLanding() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    state: "",
    numVehicles: "",
    vehicleType: "",
    currentInsurance: ""
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/limousine-quotes", {
        ...form,
        source: "limousine-landing-page"
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received!",
        description: "A limousine insurance specialist will contact you within 1 business day."
      });
      setForm({
        companyName: "",
        contactName: "",
        phone: "",
        email: "",
        state: "",
        numVehicles: "",
        vehicleType: "",
        currentInsurance: ""
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Please try again or call us at 1-888-254-0089."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Limousine Insurance Quotes | TCP & PUC Compliant Coverage | Casurance"
        description="Get competitive limousine insurance quotes. TCP compliant coverage for luxury sedans, stretch limos, Sprinter vans, and party buses. Fast certificates, A-rated carriers, fleet discounts."
        keywords="limousine insurance quote, TCP insurance, PUC insurance, limo insurance California, black car insurance, livery insurance, stretch limousine coverage"
        canonical="/limo-insurance"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a365d] to-[#0a1628] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={sedanImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-transparent" />
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-white">TCP Compliant</Badge>
                  <Badge className="bg-white/20 text-white">PUC Approved</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Limousine & Chauffeured Transportation Insurance
                </h1>
                <p className="text-xl text-gray-300">
                  Comprehensive coverage for luxury ground transportation. From single-vehicle operators to large fleet owners across all 50 states.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>$750,000 to $5M+ liability limits available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Same-day certificates for airports & venues</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Competitive rates with fleet discounts</span>
                  </li>
                </ul>
                <div className="flex items-center gap-4 pt-4">
                  <a href="tel:1-888-254-0089" className="flex items-center gap-2 text-lg font-semibold">
                    <Phone className="h-5 w-5" />
                    1-888-254-0089
                  </a>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">Licensed in all 50 states</span>
                </div>
              </div>

              {/* Quote Form */}
              <Card className="bg-white text-foreground shadow-2xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Get Your Free Quote</CardTitle>
                  <p className="text-sm text-muted-foreground">Fast, free, no-obligation quotes</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your Limousine Company"
                        value={form.companyName}
                        onChange={(e) => setForm({...form, companyName: e.target.value})}
                        required
                        data-testid="input-company-name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={form.contactName}
                          onChange={(e) => setForm({...form, contactName: e.target.value})}
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={form.phone}
                          onChange={(e) => setForm({...form, phone: e.target.value})}
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={form.state} onValueChange={(v) => setForm({...form, state: v})}>
                          <SelectTrigger id="state" data-testid="select-state">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="numVehicles"># of Vehicles *</Label>
                        <Input
                          id="numVehicles"
                          type="number"
                          min="1"
                          placeholder="1"
                          value={form.numVehicles}
                          onChange={(e) => setForm({...form, numVehicles: e.target.value})}
                          required
                          data-testid="input-num-vehicles"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <Select value={form.vehicleType} onValueChange={(v) => setForm({...form, vehicleType: v})}>
                        <SelectTrigger id="vehicleType" data-testid="select-vehicle-type">
                          <SelectValue placeholder="Select vehicle type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={submitMutation.isPending}
                      data-testid="button-get-quote"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Get My Free Quote →"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to be contacted about insurance options.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vehicle Gallery */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Vehicles We Insure</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative rounded-lg overflow-hidden group">
                <img src={sedanImage} alt="Luxury Sedan" className="w-full h-40 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-semibold text-white">Black Car Sedans</h3>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group">
                <img src={suvImage} alt="Luxury SUV" className="w-full h-40 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-semibold text-white">Executive SUVs</h3>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group">
                <img src={sprinterImage} alt="Mercedes Sprinter" className="w-full h-40 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-semibold text-white">Sprinter Vans</h3>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group">
                <img src={limoImage} alt="Stretch Limousine" className="w-full h-40 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-semibold text-white">Stretch Limousines</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Casurance?</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Specialized limousine insurance from experts who understand your business
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Coverage Options</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {coverageTypes.map((c, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                    <Badge variant="secondary">{c.limit}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TCP/PUC Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">TCP & PUC Compliant Coverage</h2>
                <p className="text-white/80 mb-6">
                  Our policies meet all California CPUC Transportation Charter-Party (TCP) requirements and PUC regulations in all states.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>$750K-$1.5M CSL for TCP vehicles (7-15 passengers)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>Automatic CPUC/PUC certificate filings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>MCS-90 endorsements for interstate carriers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>Workers' compensation included</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/industry/limousine-transportation">
                    Learn More About Coverage <ChevronRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-4">Liability Limits by Vehicle Type</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>Taxi & Livery</span>
                    <span className="font-semibold">$100K-$1M CSL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>Limousine & Black Car</span>
                    <span className="font-semibold">$750K-$1.5M CSL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>NEMT & Paratransit</span>
                    <span className="font-semibold">$750K-$1.5M CSL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Motorcoach & Charter</span>
                    <span className="font-semibold">$5M+ CSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get a free, no-obligation quote for your limousine or chauffeured transportation business in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#top">
                  Get Your Free Quote <ChevronRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
