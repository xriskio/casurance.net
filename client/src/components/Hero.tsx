import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Phone, Shield, CheckCircle, TrendingUp, Sparkles, Zap, Clock, ShieldCheck, Ban } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const insuranceTypes = [
  { value: "general-liability", label: "General Liability" },
  { value: "commercial-auto", label: "Commercial Auto" },
  { value: "workers-compensation", label: "Workers Compensation" },
  { value: "commercial-property", label: "Commercial Property" },
  { value: "professional-liability", label: "Professional Liability" },
  { value: "cyber-liability", label: "Cyber Liability" },
  { value: "business-owners-policy", label: "Business Owners Policy (BOP)" },
  { value: "commercial-umbrella", label: "Commercial Umbrella" },
  { value: "employment-practices", label: "Employment Practices Liability" },
  { value: "other", label: "Other / Not Sure" },
];

export default function Hero() {
  const { toast } = useToast();
  const [insuranceType, setInsuranceType] = useState("");
  
  const handleQuickQuote = () => {
    if (!insuranceType) {
      toast({
        title: "Select Insurance Type",
        description: "Please select the type of insurance you need.",
        variant: "destructive"
      });
      return;
    }
    // Navigate to quote page with selected insurance type
    window.location.href = `/quote?type=${insuranceType}`;
  };

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-[#0a1628] via-[#0d2240] to-[#1a365d] overflow-hidden flex items-center">
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
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-cyan-300/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        
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
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero Content */}
          <div className="max-w-2xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-5 py-2.5 mb-8 shadow-lg shadow-blue-500/10">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-blue-200">
                Trusted by 500+ California Businesses
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Commercial Insurance</span>
              <br />
              <span className="text-white">Solutions for Your Business</span>
            </h1>
            
            {/* Tagline with Gradient */}
            <div className="mb-8">
              <span className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Insurance Reimagined
              </span>
            </div>
            
            <p className="text-lg sm:text-xl text-blue-100/80 leading-relaxed max-w-xl mb-10">
              Protect your business with comprehensive coverage from California's most trusted 
              independent insurance agency. Get competitive quotes in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/quote">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 px-8 py-6 text-lg"
                  data-testid="button-request-quote"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 px-8 py-6 text-lg"
                  data-testid="button-call-us"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1-888-254-0089
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-white/10">
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-white">15+</span>
                </div>
                <p className="text-sm text-blue-200/60 pl-[52px]">Years Experience</p>
              </div>
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-white">50+</span>
                </div>
                <p className="text-sm text-blue-200/60 pl-[52px]">Top Carriers</p>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Quote Widget */}
          <div className="lg:sticky lg:top-24">
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-center">
                <div className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium mb-1">
                  <Zap className="h-4 w-4" />
                  Free Instant Quote
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">GET YOUR FREE QUOTE NOW</h3>
                <p className="text-blue-100 text-sm mt-1">No commitment required • Takes 2 minutes</p>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">What type of insurance do you need? *</Label>
                    <Select value={insuranceType} onValueChange={setInsuranceType}>
                      <SelectTrigger className="h-12" data-testid="select-insurance-type">
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        {insuranceTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleQuickQuote}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold"
                    data-testid="button-get-quote-hero"
                  >
                    Get My Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ban className="h-3.5 w-3.5" />
                      <span>No Spam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>24hr Response</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
