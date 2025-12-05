import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ArrowLeft, ArrowRight, Car, Home, Building2, Gem, Flame, AlertTriangle } from "lucide-react";
import { SERVICE_STATES } from "@shared/constants/states";

const personalLinesFormSchema = z.object({
  coverageType: z.string().min(1, "Please select a coverage type"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  effectiveDate: z.string().optional(),
  currentInsurer: z.string().optional(),
  propertyType: z.string().optional(),
  yearBuilt: z.string().optional(),
  squareFootage: z.string().optional(),
  dwellingValue: z.string().optional(),
  numberOfVehicles: z.string().optional(),
  vehicleInfo: z.string().optional(),
  driverInfo: z.string().optional(),
  additionalCoverages: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
  payload: z.object({}).passthrough(),
});

type FormData = z.infer<typeof personalLinesFormSchema>;

const coverageTypes = [
  { value: "personal-auto", label: "Personal Auto Insurance", icon: Car, description: "Coverage for your personal vehicles" },
  { value: "homeowners", label: "Homeowners Insurance", icon: Home, description: "Protect your home and belongings" },
  { value: "landlord-protector", label: "Landlord/Rental Property", icon: Building2, description: "Coverage for rental properties" },
  { value: "high-value-home", label: "High Value Home (up to $30M)", icon: Gem, description: "Premium coverage for luxury homes" },
  { value: "wildfire-brush-area", label: "Wildfire & Brush Area", icon: Flame, description: "Specialized fire zone coverage" },
  { value: "residential-earthquake", label: "Residential Earthquake", icon: AlertTriangle, description: "Earthquake damage protection" },
];

const propertyTypes = [
  "Single Family Home",
  "Condo/Townhome",
  "Multi-Family (2-4 units)",
  "Mobile/Manufactured Home",
  "Rental Property",
  "Vacation Home",
  "High-Rise Condo",
];

const dwellingValueRanges = [
  "Under $250,000",
  "$250,000 - $500,000",
  "$500,000 - $750,000",
  "$750,000 - $1,000,000",
  "$1,000,000 - $2,000,000",
  "$2,000,000 - $5,000,000",
  "$5,000,000 - $10,000,000",
  "$10,000,000 - $20,000,000",
  "$20,000,000 - $30,000,000",
  "Over $30,000,000",
];

const additionalCoverageOptions = [
  { id: "umbrella", label: "Personal Umbrella Liability" },
  { id: "jewelry", label: "Scheduled Jewelry & Valuables" },
  { id: "fine-art", label: "Fine Art & Collections" },
  { id: "flood", label: "Flood Insurance" },
  { id: "earthquake", label: "Earthquake Coverage" },
  { id: "identity-theft", label: "Identity Theft Protection" },
  { id: "home-warranty", label: "Home Warranty" },
  { id: "rental-income", label: "Loss of Rental Income" },
];

export default function PersonalLinesQuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(personalLinesFormSchema),
    defaultValues: {
      coverageType: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      effectiveDate: "",
      currentInsurer: "",
      propertyType: "",
      yearBuilt: "",
      squareFootage: "",
      dwellingValue: "",
      numberOfVehicles: "",
      vehicleInfo: "",
      driverInfo: "",
      additionalCoverages: [],
      additionalInfo: "",
      payload: {},
    },
    shouldUnregister: false,
  });

  const selectedCoverageType = form.watch("coverageType");
  const isAutoInsurance = selectedCoverageType === "personal-auto";
  const isPropertyInsurance = ["homeowners", "landlord-protector", "high-value-home", "wildfire-brush-area", "residential-earthquake"].includes(selectedCoverageType);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("POST", "/api/personal-lines-quotes", {
        ...data,
        payload: data,
      });
    },
    onSuccess: (data) => {
      setReferenceNumber(data.referenceNumber);
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24-48 hours with your quote.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFieldsForStep = (stepNum: number): string[] => {
    switch (stepNum) {
      case 1:
        return ["coverageType"];
      case 2:
        return ["firstName", "lastName", "email", "phone"];
      case 3:
        if (isAutoInsurance) {
          return [];
        }
        return [];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Quote Request Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Your reference number is: <span className="font-semibold text-primary">{referenceNumber}</span>
          </p>
          <p className="text-muted-foreground mb-8">
            One of our personal insurance specialists will review your information and contact you within 24-48 hours with a competitive quote.
          </p>
          <Button onClick={() => window.location.href = "/personal-lines"} data-testid="button-back-personal-lines">
            Back to Personal Lines
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalSteps = 4;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 4 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 ${s < step ? "bg-green-500" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <CardTitle>
          {step === 1 && "Select Coverage Type"}
          {step === 2 && "Contact Information"}
          {step === 3 && (isAutoInsurance ? "Vehicle Information" : "Property Details")}
          {step === 4 && "Additional Information"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Choose the type of personal insurance you need"}
          {step === 2 && "Tell us how to reach you"}
          {step === 3 && (isAutoInsurance ? "Provide details about your vehicles" : "Tell us about your property")}
          {step === 4 && "Any additional details or coverage needs"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div key="step-1" className="space-y-6">
                <FormField
                  control={form.control}
                  name="coverageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What type of coverage do you need?</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {coverageTypes.map((coverage) => {
                          const Icon = coverage.icon;
                          return (
                            <div
                              key={coverage.value}
                              onClick={() => field.onChange(coverage.value)}
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover-elevate ${
                                field.value === coverage.value
                                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                                  : "border-border hover:border-primary/50"
                              }`}
                              data-testid={`coverage-type-${coverage.value}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${field.value === coverage.value ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">{coverage.label}</h4>
                                  <p className="text-sm text-muted-foreground">{coverage.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div key="step-2" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" data-testid="input-first-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" data-testid="input-last-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="john@example.com" data-testid="input-email" />
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
                          <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main Street" data-testid="input-address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Los Angeles" data-testid="input-city" />
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
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-state">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICE_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.value}
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
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="90210" data-testid="input-zip" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div key="step-3" className="space-y-6">
                {isAutoInsurance ? (
                  <>
                    <FormField
                      control={form.control}
                      name="numberOfVehicles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Vehicles</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-vehicles">
                                <SelectValue placeholder="Select number of vehicles" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["1", "2", "3", "4", "5+"].map((num) => (
                                <SelectItem key={num} value={num}>
                                  {num} {num === "1" ? "Vehicle" : "Vehicles"}
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
                      name="vehicleInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Information</FormLabel>
                          <FormDescription>
                            Please list each vehicle (Year, Make, Model, VIN if available)
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Example:
2022 Toyota Camry LE
2020 Honda CR-V EX"
                              rows={4}
                              data-testid="textarea-vehicle-info"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="driverInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver Information</FormLabel>
                          <FormDescription>
                            List all drivers (Name, Date of Birth, License Number if available)
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Example:
John Doe, DOB: 01/15/1985
Jane Doe, DOB: 03/22/1988"
                              rows={4}
                              data-testid="textarea-driver-info"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-property-type">
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
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
                        name="yearBuilt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Built</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 1995" data-testid="input-year-built" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="squareFootage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Square Footage</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 2,500" data-testid="input-sqft" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dwellingValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Dwelling Value</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-dwelling-value">
                                  <SelectValue placeholder="Select value range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dwellingValueRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="currentInsurer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Insurance Company</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., State Farm" data-testid="input-current-insurer" />
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
                            <FormLabel>Desired Effective Date</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" data-testid="input-effective-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 4 && (
              <div key="step-4" className="space-y-6">
                <FormField
                  control={form.control}
                  name="additionalCoverages"
                  render={() => (
                    <FormItem>
                      <FormLabel>Additional Coverage Options</FormLabel>
                      <FormDescription>
                        Select any additional coverages you're interested in
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {additionalCoverageOptions.map((coverage) => (
                          <FormField
                            key={coverage.id}
                            control={form.control}
                            name="additionalCoverages"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(coverage.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, coverage.id]);
                                      } else {
                                        field.onChange(current.filter((v: string) => v !== coverage.id));
                                      }
                                    }}
                                    data-testid={`checkbox-${coverage.id}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {coverage.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormDescription>
                        Any other details that would help us provide an accurate quote
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about any claims history, special features of your home/vehicle, or specific coverage needs..."
                          rows={5}
                          data-testid="textarea-additional-info"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} data-testid="button-previous">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} data-testid="button-next">
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-quote">
                  {mutation.isPending ? "Submitting..." : "Submit Quote Request"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
