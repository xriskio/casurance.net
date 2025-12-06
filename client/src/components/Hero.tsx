import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Phone, Shield, CheckCircle, Clock } from "lucide-react";
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
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ California Businesses</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Commercial Insurance Solutions for Your Business
            </h1>
            
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Protect your business with comprehensive coverage from California's most trusted independent insurance agency. Get competitive quotes in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/quote">
                <Button size="lg" variant="secondary" className="group" data-testid="button-request-quote">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:18882540089">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-call-us">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 1-888-254-0089
                </Button>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-3xl font-bold text-primary-foreground mb-1">15+</div>
                <div className="text-sm text-primary-foreground/80">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-foreground mb-1">50+</div>
                <div className="text-sm text-primary-foreground/80">Top Carriers</div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <Card className="overflow-hidden shadow-2xl" data-testid="quick-quote-form">
              <div className="bg-primary p-6 text-center">
                <h2 className="text-2xl font-bold text-primary-foreground mb-1">
                  Get Your Free Quote Now
                </h2>
                <p className="text-primary-foreground/80 text-sm">
                  No commitment required • Takes 2 minutes
                </p>
              </div>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="businessName" className="text-foreground font-medium">
                      Business Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="Your Company Name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="mt-1"
                      data-testid="input-business-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName" className="text-foreground font-medium">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        placeholder="John Smith"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="mt-1"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                      data-testid="input-email"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">
                        State <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger className="mt-1" data-testid="select-state">
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
                      <Label className="text-foreground font-medium">
                        Vehicles
                      </Label>
                      <Select
                        value={formData.vehicles}
                        onValueChange={(value) => setFormData({ ...formData, vehicles: value })}
                      >
                        <SelectTrigger className="mt-1" data-testid="select-vehicles">
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
                    <Label className="text-foreground font-medium">
                      Type of Insurance Needed <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.insuranceType}
                      onValueChange={(value) => setFormData({ ...formData, insuranceType: value })}
                    >
                      <SelectTrigger className="mt-1" data-testid="select-insurance-type">
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-6 mt-2"
                    disabled={quickQuoteMutation.isPending}
                    data-testid="button-submit-quick-quote"
                  >
                    {quickQuoteMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>No Spam</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>24hr Response</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
