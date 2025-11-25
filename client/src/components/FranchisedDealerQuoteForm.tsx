import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertFranchisedDealerQuoteSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

const formSchema = insertFranchisedDealerQuoteSchema.extend({
  applicantName: z.string().min(2, "Please enter the applicant name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  mailingAddress: z.string().min(5, "Please enter the mailing address"),
  city: z.string().min(2, "Please enter the city"),
  state: z.string().min(2, "Please select a state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  effectiveDate: z.string().min(1, "Please select an effective date"),
  dealershipType: z.string().min(1, "Please select dealership type"),
});

type FormData = z.infer<typeof formSchema>;

export default function FranchisedDealerQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      effectiveDate: "",
      mailingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      yearsInBusiness: "",
      dealershipType: "",
      numberOfLocations: "",
      newAutoSalesPercent: "",
      usedAutoSalesPercent: "",
      serviceRepairPercent: "",
      numberOfDealerPlates: "",
      status: "pending",
      payload: {},
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/franchised-dealer-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to submit quote request");
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote request submitted!",
        description: "We'll contact you within 24-48 hours with your quote.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const submissionData = {
      ...data,
      payload: data,
    };
    submitMutation.mutate(submissionData);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for your franchised dealer insurance quote request. Our specialists will review your application and contact you within 24-48 hours with a comprehensive quote.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Applicant Information</CardTitle>
            <CardDescription>Primary contact and dealership details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applicantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Named Insured / DBA *</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Motors Inc." {...field} data-testid="input-applicant-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effectiveDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effective Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-effective-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@dealership.com" {...field} data-testid="input-email" />
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
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mailingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mailing Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} data-testid="input-mailing-address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles" {...field} data-testid="input-city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICE_STATES.map((state) => (
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

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="90001" {...field} data-testid="input-zip-code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Operations</CardTitle>
            <CardDescription>Dealership type and operational details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dealershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealership Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-dealership-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new_car">New Car Dealer</SelectItem>
                        <SelectItem value="new_truck">New Truck Dealer</SelectItem>
                        <SelectItem value="rv_dealer">RV Dealer</SelectItem>
                        <SelectItem value="multi_line">Multi-Line Dealer (Cars/Trucks/RVs)</SelectItem>
                        <SelectItem value="luxury">Luxury Vehicle Dealer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Business</FormLabel>
                    <FormControl>
                      <Input placeholder="10" {...field} value={field.value ?? ""} data-testid="input-years-in-business" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="numberOfLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Locations</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} value={field.value ?? ""} data-testid="input-number-of-locations" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="newAutoSalesPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Auto Sales %</FormLabel>
                    <FormControl>
                      <Input placeholder="60%" {...field} value={field.value ?? ""} data-testid="input-new-auto-sales-percent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usedAutoSalesPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Used Auto Sales %</FormLabel>
                    <FormControl>
                      <Input placeholder="25%" {...field} value={field.value ?? ""} data-testid="input-used-auto-sales-percent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceRepairPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service/Repair %</FormLabel>
                    <FormControl>
                      <Input placeholder="15%" {...field} value={field.value ?? ""} data-testid="input-service-repair-percent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="numberOfDealerPlates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Dealer Plates</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} value={field.value ?? ""} data-testid="input-number-of-dealer-plates" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={submitMutation.isPending}
          data-testid="button-submit"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Quote Request"
          )}
        </Button>
      </form>
    </Form>
  );
}
