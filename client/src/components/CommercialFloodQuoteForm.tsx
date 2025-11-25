import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertCommercialFloodQuoteSchema } from "@shared/schema";
import { SERVICE_STATES } from "@shared/constants/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = insertCommercialFloodQuoteSchema.extend({
  namedInsured: z.string().min(2, "Please enter the named insured"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  propertyAddress: z.string().min(5, "Please enter the property address"),
  city: z.string().min(2, "Please enter the city"),
  state: z.string().min(2, "Please select a state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  effectiveDate: z.string().min(1, "Please select an effective date"),
  floodZone: z.string().min(1, "Please specify the flood zone"),
  buildingCoverage: z.string().min(1, "Please enter building coverage amount"),
  yearBuilt: z.string().min(4, "Please enter the year built"),
  numberOfStories: z.string().min(1, "Please enter number of stories"),
  constructionType: z.string().min(1, "Please select construction type"),
});

type FormData = z.infer<typeof formSchema>;

export default function CommercialFloodQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namedInsured: "",
      email: "",
      phone: "",
      propertyAddress: "",
      city: "",
      state: "",
      zipCode: "",
      effectiveDate: "",
      floodZone: "",
      buildingCoverage: "",
      contentsCoverage: "",
      yearBuilt: "",
      numberOfStories: "",
      constructionType: "",
      status: "pending",
      payload: {},
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("/api/commercial-flood-quotes", {
        method: "POST",
        body: JSON.stringify(data),
      });
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
            Thank you for your commercial flood insurance quote request. Our specialists will review your property information and contact you within 24-48 hours with a comprehensive quote.
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
            <CardDescription>Primary contact and business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="namedInsured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Named Insured / Business Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Corporation" {...field} data-testid="input-named-insured" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} data-testid="input-email" />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Location</CardTitle>
            <CardDescription>Address of the property to be insured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="propertyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Business Park Dr" {...field} data-testid="input-property-address" />
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
                      <Input placeholder="San Francisco" {...field} data-testid="input-city" />
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
                      <Input placeholder="94102" {...field} data-testid="input-zip-code" />
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
            <CardTitle>Coverage Details</CardTitle>
            <CardDescription>Flood insurance coverage requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Effective Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} data-testid="input-effective-date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floodZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FEMA Flood Zone *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-flood-zone">
                        <SelectValue placeholder="Select flood zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">Zone A - High Risk (No BFE)</SelectItem>
                      <SelectItem value="AE">Zone AE - High Risk (With BFE)</SelectItem>
                      <SelectItem value="AO">Zone AO - High Risk (Sheet Flow)</SelectItem>
                      <SelectItem value="V">Zone V - Coastal High Risk</SelectItem>
                      <SelectItem value="VE">Zone VE - Coastal High Risk (With BFE)</SelectItem>
                      <SelectItem value="X">Zone X - Moderate to Low Risk</SelectItem>
                      <SelectItem value="unknown">Unknown / Need Determination</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buildingCoverage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Coverage Amount *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-building-coverage">
                          <SelectValue placeholder="Select coverage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="150000">$150,000</SelectItem>
                        <SelectItem value="200000">$200,000</SelectItem>
                        <SelectItem value="250000">$250,000</SelectItem>
                        <SelectItem value="300000">$300,000</SelectItem>
                        <SelectItem value="400000">$400,000</SelectItem>
                        <SelectItem value="500000">$500,000 (Maximum)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contentsCoverage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contents Coverage Amount</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-contents-coverage">
                          <SelectValue placeholder="Select coverage (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="50000">$50,000</SelectItem>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="150000">$150,000</SelectItem>
                        <SelectItem value="200000">$200,000</SelectItem>
                        <SelectItem value="250000">$250,000</SelectItem>
                        <SelectItem value="500000">$500,000 (Maximum)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Building Information</CardTitle>
            <CardDescription>Property construction and characteristics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built *</FormLabel>
                    <FormControl>
                      <Input placeholder="2020" {...field} data-testid="input-year-built" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfStories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Stories *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-number-of-stories">
                          <SelectValue placeholder="Select stories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Story</SelectItem>
                        <SelectItem value="2">2 Stories</SelectItem>
                        <SelectItem value="3">3 Stories</SelectItem>
                        <SelectItem value="4">4+ Stories</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="constructionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Construction Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-construction-type">
                        <SelectValue placeholder="Select construction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="masonry">Masonry / Concrete Block</SelectItem>
                      <SelectItem value="frame">Frame / Wood</SelectItem>
                      <SelectItem value="steel">Steel Frame</SelectItem>
                      <SelectItem value="concrete">Reinforced Concrete</SelectItem>
                      <SelectItem value="mixed">Mixed Construction</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={submitMutation.isPending} data-testid="button-submit">
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
