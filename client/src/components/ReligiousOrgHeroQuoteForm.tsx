import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CheckCircle, Clock, ShieldCheck, Mail, Zap } from "lucide-react";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const WORSHIP_TYPES = [
  "Church",
  "Mosque",
  "Synagogue",
  "Temple",
  "Cathedral",
  "Chapel",
  "Religious School",
  "Faith-Based Nonprofit",
  "Other"
];

export default function ReligiousOrgHeroQuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    worshipType: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("POST", "/api/quote-requests", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your quote.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organizationName || !formData.firstName || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    submitMutation.mutate({
      insuranceType: "Religious Organization Insurance",
      businessName: formData.organizationName,
      contactName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      additionalInfo: {
        worshipType: formData.worshipType
      }
    });
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Quote Request Submitted!</h3>
              <p className="text-muted-foreground text-lg">
                Thank you! One of our religious organization insurance specialists will contact you within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-amber-400 mb-3">
            <Zap className="h-5 w-5" />
            <span className="font-semibold uppercase tracking-wide text-sm">Free Instant Quote</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            GET YOUR FREE QUOTE NOW
          </h2>
          <p className="text-white/80">
            No commitment required - Takes 2 minutes
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Quick Quote Form</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Complete the form below for a fast quote.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="Your Church/Temple/Mosque Name"
                  required
                  data-testid="input-organization-name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First"
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@organization.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  required
                  data-testid="input-phone"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger id="state" data-testid="select-state">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="worshipType">Organization Type</Label>
                  <Select
                    value={formData.worshipType}
                    onValueChange={(value) => setFormData({ ...formData, worshipType: value })}
                  >
                    <SelectTrigger id="worshipType" data-testid="select-worship-type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {WORSHIP_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6 text-lg"
                disabled={submitMutation.isPending}
                data-testid="button-get-free-quote"
              >
                {submitMutation.isPending ? "Submitting..." : "Get My Free Quote"}
              </Button>

              <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>No Spam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>24hr Response</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
