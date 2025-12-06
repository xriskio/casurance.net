import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Phone, Shield, CheckCircle, Clock, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_STATES } from "@shared/constants/states";

const insuranceTypes = [
  { value: "commercial-auto", label: "Commercial Auto" },
  { value: "general-liability", label: "General Liability" },
  { value: "workers-compensation", label: "Workers Compensation" },
  { value: "commercial-property", label: "Commercial Property" },
  { value: "professional-liability", label: "Professional Liability" },
  { value: "business-owners-policy", label: "Business Owners Policy (BOP)" },
  { value: "cyber-liability", label: "Cyber Liability" },
  { value: "umbrella-excess", label: "Umbrella / Excess Liability" },
  { value: "other", label: "Other" },
];

const vehicleOptions = [
  { value: "1-5", label: "1-5 Vehicles" },
  { value: "6-10", label: "6-10 Vehicles" },
  { value: "11-25", label: "11-25 Vehicles" },
  { value: "26-50", label: "26-50 Vehicles" },
  { value: "51+", label: "51+ Vehicles" },
  { value: "none", label: "No Vehicles" },
];

export default function Hero() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    state: "",
    vehicles: "",
    insuranceType: "",
  });

  const quickQuoteMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quick-quote", data);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received!",
        description: "We'll contact you within 24 hours with your personalized quote.",
      });
      navigate("/thank-you");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us at 1-888-254-0089.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.email || !formData.state || !formData.insuranceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    quickQuoteMutation.mutate(formData);
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-[#0a1628] via-[#0d2240] to-[#1a365d] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-indigo-400/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-5 py-2.5 shadow-lg shadow-blue-500/10">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                AI-Powered Insurance Solutions
              </span>
            </div>

            {/* Main Heading with Gradient */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Commercial Insurance</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100/80 leading-relaxed max-w-xl">
                Experience the future of business protection. Smart quotes, seamless coverage, 
                powered by technology and backed by 50+ top carriers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/quote">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                  data-testid="button-request-quote"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  data-testid="button-call-us"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  1-888-254-0089
                </Button>
              </a>
            </div>

            {/* Stats with Icons */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left group">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">15+</span>
                </div>
                <p className="text-sm text-blue-200/60">Years Experience</p>
              </div>
              <div className="text-center lg:text-left group">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">50+</span>
                </div>
                <p className="text-sm text-blue-200/60">Top Carriers</p>
              </div>
              <div className="text-center lg:text-left group">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">50</span>
                </div>
                <p className="text-sm text-blue-200/60">States Covered</p>
              </div>
            </div>
          </div>

          {/* Right Side - Glassmorphism Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative">
              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl opacity-70"></div>
              
              <Card className="relative overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-black/20 rounded-2xl" data-testid="quick-quote-form">
                {/* Form Header with Gradient */}
                <div className="relative bg-gradient-to-r from-[#0d2240] via-[#1a365d] to-[#0d2240] p-6 text-center overflow-hidden">
                  {/* Subtle animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 animate-pulse"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-cyan-400" />
                      <h2 className="text-2xl font-bold text-white">
                        Get Your Free Quote
                      </h2>
                    </div>
                    <p className="text-blue-200/80 text-sm">
                      No commitment required • Takes 2 minutes
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName" className="text-slate-700 font-medium text-sm">
                        Business Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Your Company Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                        data-testid="input-business-name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="contactName" className="text-slate-700 font-medium text-sm">
                          Your Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactName"
                          placeholder="John Smith"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-slate-700 font-medium text-sm">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                        data-testid="input-email"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-slate-700 font-medium text-sm">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" data-testid="select-state">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-700 font-medium text-sm">
                          Vehicles
                        </Label>
                        <Select
                          value={formData.vehicles}
                          onValueChange={(value) => setFormData({ ...formData, vehicles: value })}
                        >
                          <SelectTrigger className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" data-testid="select-vehicles">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicleOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium text-sm">
                        Type of Insurance <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.insuranceType}
                        onValueChange={(value) => setFormData({ ...formData, insuranceType: value })}
                      >
                        <SelectTrigger className="mt-1.5 bg-slate-50/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" data-testid="select-insurance-type">
                          <SelectValue placeholder="Select Insurance Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {insuranceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-base py-6 mt-3 shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] border-0"
                      disabled={quickQuoteMutation.isPending}
                      data-testid="button-submit-quick-quote"
                    >
                      {quickQuoteMutation.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get My Free Quote
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Trust Badges */}
                  <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Shield className="h-3.5 w-3.5 text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>No Spam</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                      <span>24hr Response</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.8; }
          75% { transform: translateY(-25px) translateX(15px); opacity: 1; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
