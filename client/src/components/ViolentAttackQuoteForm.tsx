import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle2, ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";
import { SERVICE_STATES } from "@shared/constants/states";

const formSchema = z.object({
  applicantName: z.string().min(1, "Applicant name is required"),
  ein: z.string().optional(),
  dba: z.string().optional(),
  website: z.string().optional(),
  locationAddress: z.string().min(1, "Location address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  mailingAddress: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingState: z.string().optional(),
  mailingZipCode: z.string().optional(),
  natureOfBusiness: z.string().min(1, "Nature of business is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  hasBankruptcy: z.string().min(1, "Please indicate bankruptcy status"),
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  propertyManagerName: z.string().min(1, "Property manager name is required"),
  propertyManagerPhone: z.string().min(1, "Property manager phone is required"),
  propertyManagerEmail: z.string().email("Valid email is required"),
  hasPriorIncidents: z.string().min(1, "Please indicate prior incidents status"),
  priorIncidentsExplanation: z.string().optional(),
  
  propertyType: z.string().min(1, "Property type is required"),
  averageMonthlyVisitors: z.string().min(1, "Average monthly visitors is required"),
  numberOfEmployees: z.string().min(1, "Number of employees is required"),
  totalPropertyValue: z.string().min(1, "Total property value is required"),
  totalAreaOccupied: z.string().optional(),
  hasMultipleLocations: z.string().optional(),
  
  securityType: z.string().min(1, "Security type is required"),
  hasArmedSecurity: z.string().optional(),
  securityDetails: z.string().optional(),
  
  hasProgressiveDisciplinePolicy: z.string().min(1, "Required"),
  hasCustomerComplaintProcedure: z.string().min(1, "Required"),
  hasHostileEmployeeTraining: z.string().min(1, "Required"),
  hasBackgroundCheckProcedure: z.string().min(1, "Required"),
  hasEmergencyResponsePlan: z.string().min(1, "Required"),
  
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPosition: z.string().optional(),
  emergencyContactEmail: z.string().email("Valid email is required"),
  emergencyContactPhone: z.string().min(1, "Emergency contact phone is required"),
  
  effectiveDate: z.string().min(1, "Effective date is required"),
  
  additionalInformation: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const propertyTypes = [
  "Office Building",
  "Retail Store",
  "Shopping Mall",
  "Educational Institution",
  "Healthcare Facility",
  "Religious Organization",
  "Government Building",
  "Entertainment Venue",
  "Hotel/Motel",
  "Restaurant/Bar",
  "Manufacturing/Industrial",
  "Warehouse",
  "Multi-Family Residential",
  "Mixed Use Property",
  "Other",
];

const securityTypes = [
  "24/7 On-site Security Guard",
  "On-site Security (Business Hours)",
  "Alarm System Only",
  "Video Surveillance Only",
  "Access Control System",
  "Combination of Systems",
  "None",
  "Other",
];

export default function ViolentAttackQuoteForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false,
    defaultValues: {
      applicantName: "",
      ein: "",
      dba: "",
      website: "",
      locationAddress: "",
      city: "",
      state: "",
      zipCode: "",
      mailingAddress: "",
      mailingCity: "",
      mailingState: "",
      mailingZipCode: "",
      natureOfBusiness: "",
      yearsInBusiness: "",
      hasBankruptcy: "",
      annualRevenue: "",
      propertyManagerName: "",
      propertyManagerPhone: "",
      propertyManagerEmail: "",
      hasPriorIncidents: "",
      priorIncidentsExplanation: "",
      propertyType: "",
      averageMonthlyVisitors: "",
      numberOfEmployees: "",
      totalPropertyValue: "",
      totalAreaOccupied: "",
      hasMultipleLocations: "",
      securityType: "",
      hasArmedSecurity: "",
      securityDetails: "",
      hasProgressiveDisciplinePolicy: "",
      hasCustomerComplaintProcedure: "",
      hasHostileEmployeeTraining: "",
      hasBackgroundCheckProcedure: "",
      hasEmergencyResponsePlan: "",
      emergencyContactName: "",
      emergencyContactPosition: "",
      emergencyContactEmail: "",
      emergencyContactPhone: "",
      effectiveDate: "",
      additionalInformation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/violent-attack-quotes", {
        applicantName: data.applicantName,
        email: data.propertyManagerEmail,
        phone: data.propertyManagerPhone,
        propertyType: data.propertyType,
        effectiveDate: data.effectiveDate,
        annualRevenue: data.annualRevenue,
        numberOfEmployees: data.numberOfEmployees,
        averageMonthlyVisitors: data.averageMonthlyVisitors,
        status: "pending",
        payload: data,
      });
      return response;
    },
    onSuccess: (data: any) => {
      toast({
        title: "Application Submitted Successfully!",
        description: `Your reference number is ${data.referenceNumber}. We will contact you shortly.`,
      });
      setStep(6);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = [
          "applicantName", "locationAddress", "city", "state", "zipCode",
          "natureOfBusiness", "yearsInBusiness", "hasBankruptcy", "annualRevenue",
          "propertyManagerName", "propertyManagerPhone", "propertyManagerEmail",
          "hasPriorIncidents"
        ];
        break;
      case 2:
        fieldsToValidate = [
          "propertyType", "averageMonthlyVisitors", "numberOfEmployees", "totalPropertyValue"
        ];
        break;
      case 3:
        fieldsToValidate = [
          "securityType", "hasProgressiveDisciplinePolicy", "hasCustomerComplaintProcedure",
          "hasHostileEmployeeTraining", "hasBackgroundCheckProcedure", "hasEmergencyResponsePlan"
        ];
        break;
      case 4:
        fieldsToValidate = [
          "emergencyContactName", "emergencyContactEmail", "emergencyContactPhone"
        ];
        break;
      case 5:
        fieldsToValidate = ["effectiveDate"];
        break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasPriorIncidents = form.watch("hasPriorIncidents");

  if (step === 6) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for your Violent Attack Coverage application. Our team will review your information and contact you within 1-2 business days.
            </p>
            <Button onClick={() => window.location.href = "/coverages/violent-attack-coverage"} data-testid="button-back-coverage">
              Back to Coverage Information
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl">Violent Attack Coverage Application</CardTitle>
        </div>
        <CardDescription>
          Comprehensive protection against violent attacks, active shooter events, and terrorism incidents.
          Coverage includes up to $5M liability and $500K property damage.
        </CardDescription>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Step {step} of 5: {
            step === 1 ? "General Information" :
            step === 2 ? "Location Information" :
            step === 3 ? "Security & Policies" :
            step === 4 ? "Emergency Response" :
            "Review & Submit"
          }
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div key="step-1" className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">General Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Applicant / Business Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Legal business name" data-testid="input-applicant-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EIN</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="XX-XXXXXXX" data-testid="input-ein" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dba"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DBA (Doing Business As)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="DBA name if applicable" data-testid="input-dba" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://www.example.com" data-testid="input-website" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h4 className="font-medium pt-4">Location Address</h4>
                <FormField
                  control={form.control}
                  name="locationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main Street" data-testid="input-location-address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="City" data-testid="input-city" />
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
                          <Input {...field} placeholder="12345" data-testid="input-zipcode" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h4 className="font-medium pt-4">Mailing Address (if different)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mailingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mailing Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Mailing address" data-testid="input-mailing-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="mailingCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="City" data-testid="input-mailing-city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mailingState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-mailing-state">
                                <SelectValue placeholder="State" />
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
                      name="mailingZipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ZIP" data-testid="input-mailing-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <h4 className="font-medium pt-4">Business Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="natureOfBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nature of Business *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Describe your business operations" data-testid="input-nature-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsInBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years in Business *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 5" data-testid="input-years-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hasBankruptcy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has the applicant ever filed bankruptcy? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="bankruptcy-yes" data-testid="radio-bankruptcy-yes" />
                              <Label htmlFor="bankruptcy-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="bankruptcy-no" data-testid="radio-bankruptcy-no" />
                              <Label htmlFor="bankruptcy-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="annualRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Revenue *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="$1,000,000" data-testid="input-annual-revenue" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h4 className="font-medium pt-4">Property Manager / Primary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyManagerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Full name" data-testid="input-manager-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyManagerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="(555) 123-4567" data-testid="input-manager-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyManagerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="email@company.com" data-testid="input-manager-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="hasPriorIncidents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Has the entity suffered any violent acts, threats, attacks, or incidents at any locations during the last five years? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="incidents-yes" data-testid="radio-incidents-yes" />
                            <Label htmlFor="incidents-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="incidents-no" data-testid="radio-incidents-no" />
                            <Label htmlFor="incidents-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {hasPriorIncidents === "yes" && (
                  <FormField
                    control={form.control}
                    name="priorIncidentsExplanation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please explain the incidents:</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Provide details about any prior violent acts, threats, or incidents..."
                            className="min-h-[100px]"
                            data-testid="textarea-incidents-explanation"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            {step === 2 && (
              <div key="step-2" className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Location Information</h3>

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type *</FormLabel>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="averageMonthlyVisitors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Monthly Visitors *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 5,000" data-testid="input-monthly-visitors" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 50" data-testid="input-employees" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalPropertyValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Property Value *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="$5,000,000" data-testid="input-property-value" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalAreaOccupied"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Area Occupied (sq. ft.)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 25,000" data-testid="input-area-occupied" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="hasMultipleLocations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have multiple locations?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="locations-yes" data-testid="radio-locations-yes" />
                            <Label htmlFor="locations-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="locations-no" data-testid="radio-locations-no" />
                            <Label htmlFor="locations-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        If yes, please attach a Schedule of Values separated by location.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div key="step-3" className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Security, Policies & Procedures</h3>

                <FormField
                  control={form.control}
                  name="securityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Premises Security *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-security-type">
                            <SelectValue placeholder="Select security type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {securityTypes.map((type) => (
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

                {(form.watch("securityType")?.includes("Security Guard") || form.watch("securityType")?.includes("On-site Security")) && (
                  <FormField
                    control={form.control}
                    name="hasArmedSecurity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>If Security Guard, Armed?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="armed-yes" data-testid="radio-armed-yes" />
                              <Label htmlFor="armed-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="armed-no" data-testid="radio-armed-no" />
                              <Label htmlFor="armed-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="securityDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Premise Security Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Provide additional details about your security measures..."
                          className="min-h-[80px]"
                          data-testid="textarea-security-details"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h4 className="font-medium pt-4">Does the Applicant have:</h4>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hasProgressiveDisciplinePolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>A progressive discipline policy? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="discipline-yes" data-testid="radio-discipline-yes" />
                              <Label htmlFor="discipline-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="discipline-no" data-testid="radio-discipline-no" />
                              <Label htmlFor="discipline-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCustomerComplaintProcedure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>A customer complaint/grievance resolution procedure? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="complaint-yes" data-testid="radio-complaint-yes" />
                              <Label htmlFor="complaint-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="complaint-no" data-testid="radio-complaint-no" />
                              <Label htmlFor="complaint-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasHostileEmployeeTraining"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          A program to train supervisory and management personnel to recognize, report, and respond to all potential hostile employees or situations? *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="hostile-yes" data-testid="radio-hostile-yes" />
                              <Label htmlFor="hostile-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="hostile-no" data-testid="radio-hostile-no" />
                              <Label htmlFor="hostile-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasBackgroundCheckProcedure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>A background check procedure for all potential employees? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="background-yes" data-testid="radio-background-yes" />
                              <Label htmlFor="background-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="background-no" data-testid="radio-background-no" />
                              <Label htmlFor="background-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasEmergencyResponsePlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>A premises security/emergency response plan? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="response-yes" data-testid="radio-response-yes" />
                              <Label htmlFor="response-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="response-no" data-testid="radio-response-no" />
                              <Label htmlFor="response-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div key="step-4" className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Emergency Response Contact</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Response Contact Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Full name" data-testid="input-emergency-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position / Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Security Director" data-testid="input-emergency-position" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="emergency@company.com" data-testid="input-emergency-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="(555) 123-4567" data-testid="input-emergency-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div key="step-5" className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Review & Submit</h3>

                <FormField
                  control={form.control}
                  name="effectiveDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requested Effective Date *</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" data-testid="input-effective-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any additional information you'd like to provide..."
                          className="min-h-[100px]"
                          data-testid="textarea-additional-info"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Fraud Warning</h4>
                  <p className="text-sm text-muted-foreground">
                    Any person who knowingly and with intent to defraud any insurance company or other person files an application for insurance or statement or claim containing any materially false information or conceals for the purpose of misleading, information concerning any fact material thereto commits a fraudulent insurance act, which is a crime and subjects such person to criminal and civil penalties.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    I understand that the signing of this application does not bind me to complete or the underwriter to accept this insurance but agree that, should a contract of insurance be concluded, this application and the statements made therein shall form the basis and be incorporated into the contract.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} data-testid="button-prev-step">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={nextStep} className="ml-auto" data-testid="button-next-step">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto" 
                  disabled={mutation.isPending}
                  data-testid="button-submit-application"
                >
                  {mutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
