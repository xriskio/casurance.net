import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

interface QuickQuoteFormProps {
  insuranceType: string;
}

export default function QuickQuoteForm({ insuranceType }: QuickQuoteFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("POST", "/api/quick-quotes", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quick Quote Request Submitted",
        description: "We'll contact you within 24 hours with a quote.",
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
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    submitMutation.mutate({
      business_name: formData.name,
      contact_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      insurance_type: insuranceType,
      notes: formData.message
    });
  };

  if (submitted) {
    return (
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Quick Quote Request Submitted!</h3>
          <p className="text-muted-foreground">
            Thank you! One of our agents will contact you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Prefer a Quick Quote?</CardTitle>
        <CardDescription>
          Don't have time for the full application? Leave your details and we'll reach out to discuss your insurance needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quick-name">Full Name *</Label>
              <Input
                id="quick-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                data-testid="input-quick-name"
              />
            </div>
            <div>
              <Label htmlFor="quick-email">Email Address *</Label>
              <Input
                id="quick-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                data-testid="input-quick-email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quick-phone">Phone Number *</Label>
              <Input
                id="quick-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                required
                data-testid="input-quick-phone"
              />
            </div>
            <div>
              <Label htmlFor="quick-insurance-type">Insurance Type</Label>
              <Input
                id="quick-insurance-type"
                value={insuranceType}
                disabled
                className="bg-muted"
                data-testid="input-quick-insurance-type"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="quick-message">Additional Information (Optional)</Label>
            <Textarea
              id="quick-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us briefly about your insurance needs..."
              rows={3}
              data-testid="textarea-quick-message"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={submitMutation.isPending}
            data-testid="button-quick-quote-submit"
          >
            {submitMutation.isPending ? "Submitting..." : "Request Quick Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
