import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertHighValueHomeQuoteSchema } from "@shared/schema";
import { SERVICE_STATES } from "@shared/constants/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = insertHighValueHomeQuoteSchema.extend({
  primaryNamedInsured: z.string().min(2, "Please enter the primary named insured"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dwellingAddress: z.string().min(5, "Please enter the dwelling address"),
  city: z.string().min(2, "Please enter the city"),
  state: z.string().min(2, "Please select a state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  effectiveDate: z.string().min(1, "Please select an effective date"),
  constructionType: z.string().min(1, "Please select construction type"),
  yearConstructed: z.string().min(4, "Please enter the year constructed"),
  squareFootage: z.string().min(1, "Please enter square footage"),
  dwellingValue: z.string().min(1, "Please enter estimated dwelling value"),
});

type FormData = z.infer<typeof formSchema>;

export default function HighValueHomeQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [highRiskAreas, setHighRiskAreas] = useState({
    brushZone: false,
    fireZone: false,
    floodArea: false,
  });
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryNamedInsured: "",
      secondaryNamedInsured: "",
      email: "",
      phone: "",
      dwellingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      effectiveDate: "",
      constructionType: "",
      yearConstructed: "",
      squareFootage: "",
      roofingType: "",
      protectionClass: "",
      dwellingValue: "",
      requestedValuation: "",
      status: "pending",
      payload: {},
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/high-value-home-quotes", data);
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
      payload: { ...data, highRiskAreas },
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
            Thank you for your high value homeowners insurance quote request. Our high-value home specialists will review your property information and contact you within 24-48 hours with a comprehensive quote.
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
            <CardTitle>Named Insured Information</CardTitle>
            <CardDescription>Property owner and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primaryNamedInsured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Named Insured *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} data-testid="input-primary-named-insured" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryNamedInsured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Named Insured</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe (optional)" {...field} data-testid="input-secondary-named-insured" />
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
            <CardTitle>Dwelling Location</CardTitle>
            <CardDescription>Address of the property to be insured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="dwellingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dwelling Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Estate Lane" {...field} data-testid="input-dwelling-address" />
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
                      <Input placeholder="Beverly Hills" {...field} data-testid="input-city" />
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
                      <Input placeholder="90210" {...field} data-testid="input-zip-code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 mt-6">
              <FormLabel>High-Risk Area Considerations</FormLabel>
              <FormDescription>Select all that apply to your property location</FormDescription>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="brushZone"
                    checked={highRiskAreas.brushZone}
                    onCheckedChange={(checked) => 
                      setHighRiskAreas({ ...highRiskAreas, brushZone: checked as boolean })
                    }
                    data-testid="checkbox-brush-zone"
                  />
                  <label htmlFor="brushZone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Property in brush zone
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fireZone"
                    checked={highRiskAreas.fireZone}
                    onCheckedChange={(checked) => 
                      setHighRiskAreas({ ...highRiskAreas, fireZone: checked as boolean })
                    }
                    data-testid="checkbox-fire-zone"
                  />
                  <label htmlFor="fireZone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Property in designated fire zone
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="floodArea"
                    checked={highRiskAreas.floodArea}
                    onCheckedChange={(checked) => 
                      setHighRiskAreas({ ...highRiskAreas, floodArea: checked as boolean })
                    }
                    data-testid="checkbox-flood-area"
                  />
                  <label htmlFor="floodArea" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Property in flood area
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Construction and valuation information</CardDescription>
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

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="constructionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Construction Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-construction-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="frame">Frame / Wood</SelectItem>
                        <SelectItem value="masonry">Masonry</SelectItem>
                        <SelectItem value="brick">Brick</SelectItem>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="steel">Steel Frame</SelectItem>
                        <SelectItem value="log">Log Home</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearConstructed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Constructed *</FormLabel>
                    <FormControl>
                      <Input placeholder="2020" {...field} data-testid="input-year-constructed" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="squareFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Footage *</FormLabel>
                    <FormControl>
                      <Input placeholder="5000" {...field} data-testid="input-square-footage" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roofingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roofing Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-roofing-type">
                          <SelectValue placeholder="Select type (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
                        <SelectItem value="tile">Tile</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="slate">Slate</SelectItem>
                        <SelectItem value="cedar">Cedar Shake</SelectItem>
                        <SelectItem value="composite">Composite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="protectionClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protection Class (ISO)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-protection-class">
                        <SelectValue placeholder="Select class (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          Class {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Fire protection rating (1 = best, 10 = lowest)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valuation</CardTitle>
            <CardDescription>Estimated replacement cost and coverage needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dwellingValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Dwelling Value *</FormLabel>
                    <FormControl>
                      <Input placeholder="$2,000,000" {...field} data-testid="input-dwelling-value" />
                    </FormControl>
                    <FormDescription>Estimated replacement cost</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requestedValuation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requested Coverage Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="$2,500,000 (optional)" {...field} data-testid="input-requested-valuation" />
                    </FormControl>
                    <FormDescription>If different from dwelling value</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
