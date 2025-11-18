import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  // Step 1: General Information
  namedInsured: z.string().min(1, "Company name is required"),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  principalGaragingAddress: z.string().optional(),
  garagingCity: z.string().optional(),
  garagingState: z.string().optional(),
  garagingZip: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  fax: z.string().optional(),
  email: z.string().email("Valid email is required"),
  website: z.string().optional(),
  federalEmployeeId: z.string().optional(),
  entityType: z.enum(["corporation", "partnership", "sole-proprietor", "llc", "other"]),
  yearsEstablished: z.string().min(1, "Years established is required"),
  
  // Step 2: Operations Information
  operationType: z.array(z.string()).min(1, "Select at least one operation type"),
  charterDestinations: z.string().optional(),
  schoolContracts: z.string().optional(),
  disabledPassengerPercent: z.string().optional(),
  utilizeTNC: z.enum(["yes", "no"]),
  useOwnerOperators: z.enum(["yes", "no"]),
  numberOwnerOperators: z.string().optional(),
  leaseVehiclesWithoutDrivers: z.enum(["yes", "no"]),
  authorityWithdrawn: z.enum(["yes", "no"]),
  authorityWithdrawnExplanation: z.string().optional(),
  mexicoOperations: z.enum(["yes", "no"]),
  transportCommodities: z.enum(["yes", "no"]),
  commoditiesDescription: z.string().optional(),
  transportAthletes: z.enum(["yes", "no"]),
  athletesTeams: z.string().optional(),
  
  // Step 3: Fleet Information
  fleetSize: z.string().min(1, "Fleet size is required"),
  charterBus: z.string().optional(),
  charterMiniBus: z.string().optional(),
  charterVan: z.string().optional(),
  transitBus: z.string().optional(),
  transitVan: z.string().optional(),
  paraTransitVan: z.string().optional(),
  schoolBus: z.string().optional(),
  schoolVan: z.string().optional(),
  limousine: z.string().optional(),
  annualMileage: z.string().min(1, "Annual mileage is required"),
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  
  // Step 4: Driver Information
  totalDrivers: z.string().min(1, "Total drivers is required"),
  driversReplaced12Months: z.string().optional(),
  driversAdded12Months: z.string().optional(),
  driversUnion: z.enum(["yes", "no"]),
  driverPayType: z.enum(["hourly", "trip", "mileage", "other"]),
  driverPayTypeOther: z.string().optional(),
  overnightDrivingPercent: z.string().optional(),
  workersCompProvided: z.enum(["yes", "no"]),
  
  // Step 5: Safety & Maintenance
  safetyProgramWritten: z.enum(["yes", "no"]),
  safetyMeetingsRegular: z.enum(["yes", "no"]),
  safetyMeetingsFrequency: z.string().optional(),
  postHiringTraining: z.enum(["yes", "no"]),
  postHiringTrainingDescription: z.string().optional(),
  accidentReviewCommittee: z.enum(["yes", "no"]),
  drugAlcoholFreeWorkplace: z.enum(["yes", "no"]),
  camerasInVehicles: z.enum(["yes", "no"]),
  cameraSystem: z.string().optional(),
  telematicsDevices: z.enum(["yes", "no"]),
  telematicsSystem: z.string().optional(),
  gpsTracking: z.enum(["yes", "no"]),
  gpsSystem: z.string().optional(),
  maintenanceProgramWritten: z.enum(["yes", "no"]),
  maintenancePerformedBy: z.string().optional(),
  numberOfMechanics: z.string().optional(),
  mechanicsASECertified: z.enum(["yes", "no"]),
  
  // Step 6: Coverage & Prior Insurance
  autoLiabilityLimit: z.string().min(1, "Auto liability limit is required"),
  physicalDamageDeductible: z.string().optional(),
  generalLiability: z.enum(["yes", "no"]),
  generalLiabilityLimit: z.string().optional(),
  garageLiability: z.enum(["yes", "no"]),
  garageKeepersLiability: z.enum(["yes", "no"]),
  hiredNonOwnedLiability: z.enum(["yes", "no"]),
  currentCarrier: z.string().optional(),
  currentPolicyExpiration: z.string().optional(),
  currentAutoLiabilityPremium: z.string().optional(),
  currentPhysicalDamagePremium: z.string().optional(),
  cancelledOrNonRenewed: z.enum(["yes", "no"]),
  cancelledExplanation: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  "General Information",
  "Operations",
  "Fleet Information",
  "Drivers",
  "Safety & Maintenance",
  "Coverage & Insurance"
];

const operationTypes = [
  "Charter & Tour Operations",
  "Municipal Transit Authority",
  "Limousine Services",
  "School District",
  "School Bus Contractor",
  "Paratransit / Demand Response",
  "Airport Shuttle",
  "Hotel Shuttle",
  "Corporate Shuttle"
];

const liabilityLimits = [
  "$1,000,000",
  "$2,000,000",
  "$3,000,000",
  "$5,000,000",
  "$10,000,000"
];

const deductibles = [
  "$1,000",
  "$2,500",
  "$5,000",
  "$10,000",
  "$25,000"
];

export default function PublicTransportationQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityType: "corporation",
      operationType: [],
      utilizeTNC: "no",
      useOwnerOperators: "no",
      leaseVehiclesWithoutDrivers: "no",
      authorityWithdrawn: "no",
      mexicoOperations: "no",
      transportCommodities: "no",
      transportAthletes: "no",
      driversUnion: "no",
      driverPayType: "hourly",
      workersCompProvided: "yes",
      safetyProgramWritten: "no",
      safetyMeetingsRegular: "no",
      postHiringTraining: "no",
      accidentReviewCommittee: "no",
      drugAlcoholFreeWorkplace: "yes",
      camerasInVehicles: "no",
      telematicsDevices: "no",
      gpsTracking: "no",
      maintenanceProgramWritten: "no",
      mechanicsASECertified: "no",
      generalLiability: "yes",
      garageLiability: "no",
      garageKeepersLiability: "no",
      hiredNonOwnedLiability: "yes",
      cancelledOrNonRenewed: "no",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        companyName: data.namedInsured,
        contactEmail: data.email,
        contactPhone: data.phone,
        mailingAddress: `${data.mailingAddress}, ${data.city}, ${data.state} ${data.zipCode}`,
        yearsEstablished: data.yearsEstablished,
        fleetSize: data.fleetSize,
        autoLiabilityLimit: data.autoLiabilityLimit,
        status: "pending",
        payload: data,
      };
      return await apiRequest("/api/public-transportation-quotes", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/public-transportation-quotes"] });
      toast({
        title: "Application Submitted!",
        description: "We've received your Public Transportation insurance application. Our team will review it and contact you within 24-48 hours with a competitive quote.",
      });
      form.reset();
      setCurrentStep(0);
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    submitMutation.mutate(data);
  };

  function getFieldsForStep(step: number): (keyof FormData)[] {
    switch (step) {
      case 0:
        return ["namedInsured", "mailingAddress", "city", "state", "zipCode", "phone", "email", "entityType", "yearsEstablished"];
      case 1:
        return ["operationType"];
      case 2:
        return ["fleetSize", "annualMileage", "annualRevenue"];
      case 3:
        return ["totalDrivers", "driversUnion", "driverPayType", "workersCompProvided"];
      case 4:
        return [];
      case 5:
        return ["autoLiabilityLimit"];
      default:
        return [];
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : index < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 w-12 mx-2 ${
                          index < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </div>
          <CardTitle>{steps[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {currentStep === 0 && (
                <Step1GeneralInfo form={form} />
              )}
              {currentStep === 1 && (
                <Step2Operations form={form} />
              )}
              {currentStep === 2 && (
                <Step3Fleet form={form} />
              )}
              {currentStep === 3 && (
                <Step4Drivers form={form} />
              )}
              {currentStep === 4 && (
                <Step5SafetyMaintenance form={form} />
              )}
              {currentStep === 5 && (
                <Step6CoverageInsurance form={form} />
              )}

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  data-testid="button-previous-step"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    data-testid="button-next-step"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="button-submit-application"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function Step1GeneralInfo({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Company Information</h3>
        
        <FormField
          control={form.control}
          name="namedInsured"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Named Insured (Company Name) *</FormLabel>
              <FormControl>
                <Input placeholder="ABC Transportation Company" {...field} data-testid="input-company-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="entityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Entity *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-entity-type">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsEstablished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Business Established *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2010" {...field} data-testid="input-years-established" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="federalEmployeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Federal Employee ID (FEIN)</FormLabel>
                <FormControl>
                  <Input placeholder="12-3456789" {...field} data-testid="input-fein" />
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
                  <Input placeholder="www.example.com" {...field} data-testid="input-website" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mailing Address</h3>
        
        <FormField
          control={form.control}
          name="mailingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} data-testid="input-mailing-address" />
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
                <FormControl>
                  <Input placeholder="CA" {...field} data-testid="input-state" />
                </FormControl>
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
                  <Input placeholder="90001" {...field} data-testid="input-zip" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Principal Garaging Address (if different)</h3>
        
        <FormField
          control={form.control}
          name="principalGaragingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="456 Garage Street" {...field} data-testid="input-garaging-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="garagingCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Los Angeles" {...field} data-testid="input-garaging-city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="garagingState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} data-testid="input-garaging-state" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="garagingZip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="90001" {...field} data-testid="input-garaging-zip" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fax</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4568" {...field} data-testid="input-fax" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="info@example.com" {...field} data-testid="input-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function Step2Operations({ form }: { form: any }) {
  const operationTypeValue = form.watch("operationType") || [];
  
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="operationType"
        render={() => (
          <FormItem>
            <FormLabel>Type of Operations * (Select all that apply)</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {operationTypes.map((type) => (
                <FormField
                  key={type}
                  control={form.control}
                  name="operationType"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={type}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== type
                                    )
                                  );
                            }}
                            data-testid={`checkbox-operation-${type.toLowerCase().replace(/\s+/g, '-')}`}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {type}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {operationTypeValue.includes("Charter & Tour Operations") && (
        <FormField
          control={form.control}
          name="charterDestinations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Most Frequent Charter Destinations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List cities and states with approximate percentage of trips..."
                  className="min-h-24"
                  {...field}
                  data-testid="textarea-charter-destinations"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {(operationTypeValue.includes("School District") || operationTypeValue.includes("School Bus Contractor")) && (
        <FormField
          control={form.control}
          name="schoolContracts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Schools or School Districts Under Contract</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List school names, districts, and locations..."
                  className="min-h-24"
                  {...field}
                  data-testid="textarea-school-contracts"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Operations Questions</h3>
        
        <FormField
          control={form.control}
          name="disabledPassengerPercent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percent of Disabled/Handicapped Ridership</FormLabel>
              <FormControl>
                <Input type="number" placeholder="25" {...field} data-testid="input-disabled-percent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="utilizeTNC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you or any drivers utilize Transportation Network Company (TNC) apps like Uber or Lyft? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="tnc-yes" data-testid="radio-tnc-yes" />
                    <label htmlFor="tnc-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="tnc-no" data-testid="radio-tnc-no" />
                    <label htmlFor="tnc-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="useOwnerOperators"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you utilize owner-operators in your business? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="owner-ops-yes" data-testid="radio-owner-operators-yes" />
                    <label htmlFor="owner-ops-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="owner-ops-no" data-testid="radio-owner-operators-no" />
                    <label htmlFor="owner-ops-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("useOwnerOperators") === "yes" && (
          <FormField
            control={form.control}
            name="numberOwnerOperators"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Owner-Operators</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" {...field} data-testid="input-number-owner-operators" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="leaseVehiclesWithoutDrivers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you lease vehicles without drivers to others? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="lease-yes" data-testid="radio-lease-vehicles-yes" />
                    <label htmlFor="lease-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="lease-no" data-testid="radio-lease-vehicles-no" />
                    <label htmlFor="lease-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorityWithdrawn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you ever lost or had any authority withdrawn by a regulatory authority? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="authority-yes" data-testid="radio-authority-withdrawn-yes" />
                    <label htmlFor="authority-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="authority-no" data-testid="radio-authority-withdrawn-no" />
                    <label htmlFor="authority-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("authorityWithdrawn") === "yes" && (
          <FormField
            control={form.control}
            name="authorityWithdrawnExplanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please explain in detail</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide details about authority withdrawal..."
                    className="min-h-24"
                    {...field}
                    data-testid="textarea-authority-explanation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="mexicoOperations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you operate trips into Mexico with your vehicles? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="mexico-yes" data-testid="radio-mexico-yes" />
                    <label htmlFor="mexico-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="mexico-no" data-testid="radio-mexico-no" />
                    <label htmlFor="mexico-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <p className="text-sm text-muted-foreground">Note: There is no coverage for Mexico operations</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transportCommodities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do your vehicles transport any commodities other than passenger baggage? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="commodities-yes" data-testid="radio-commodities-yes" />
                    <label htmlFor="commodities-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="commodities-no" data-testid="radio-commodities-no" />
                    <label htmlFor="commodities-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("transportCommodities") === "yes" && (
          <FormField
            control={form.control}
            name="commoditiesDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe types of commodities transported</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List commodities and approximate frequency..."
                    className="min-h-24"
                    {...field}
                    data-testid="textarea-commodities-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="transportAthletes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you transport professional or collegiate athletic groups? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="athletes-yes" data-testid="radio-athletes-yes" />
                    <label htmlFor="athletes-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="athletes-no" data-testid="radio-athletes-no" />
                    <label htmlFor="athletes-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("transportAthletes") === "yes" && (
          <FormField
            control={form.control}
            name="athletesTeams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>List teams/groups and number of annual trips</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Team name - Number of trips per year..."
                    className="min-h-24"
                    {...field}
                    data-testid="textarea-athletes-teams"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}

function Step3Fleet({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fleet Size and Composition</h3>
        
        <FormField
          control={form.control}
          name="fleetSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Number of Vehicles *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="25" {...field} data-testid="input-fleet-size" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border rounded-lg p-4 space-y-4">
          <p className="text-sm text-muted-foreground">Breakdown by vehicle type (enter number of units for each applicable type):</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="charterBus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charter Bus (Full-size)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-charter-bus" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charterMiniBus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charter Mini-Bus</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-charter-minibus" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charterVan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charter Van</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-charter-van" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transitBus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transit Bus</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-transit-bus" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transitVan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transit Van</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-transit-van" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paraTransitVan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paratransit Van (Wheelchair-equipped)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-paratransit-van" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolBus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Bus</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-school-bus" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolVan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Van</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-school-van" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="limousine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limousine/Sedan</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} data-testid="input-limousine" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fleet Operations</h3>
        
        <FormField
          control={form.control}
          name="annualMileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Fleet Mileage *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500000" {...field} data-testid="input-annual-mileage" />
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
                <Input type="number" placeholder="1000000" {...field} data-testid="input-annual-revenue" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> After submission, we will request a detailed vehicle schedule including year, make, model, VIN, seating capacity, stated value, and garaging location for each vehicle.
        </p>
      </div>
    </div>
  );
}

function Step4Drivers({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Driver Information</h3>
        
        <FormField
          control={form.control}
          name="totalDrivers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Number of Drivers *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="30" {...field} data-testid="input-total-drivers" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="driversReplaced12Months"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drivers Replaced (Past 12 Months)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="3" {...field} data-testid="input-drivers-replaced" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="driversAdded12Months"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drivers Added (Past 12 Months)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" {...field} data-testid="input-drivers-added" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Driver Employment</h3>
        
        <FormField
          control={form.control}
          name="driversUnion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are drivers union members? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="union-yes" data-testid="radio-union-yes" />
                    <label htmlFor="union-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="union-no" data-testid="radio-union-no" />
                    <label htmlFor="union-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driverPayType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver's Pay Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-driver-pay-type">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="trip">Per Trip</SelectItem>
                  <SelectItem value="mileage">Per Mile</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("driverPayType") === "other" && (
          <FormField
            control={form.control}
            name="driverPayTypeOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify pay type</FormLabel>
                <FormControl>
                  <Input placeholder="Describe pay structure..." {...field} data-testid="input-driver-pay-other" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="overnightDrivingPercent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage of Overnight Driving</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} data-testid="input-overnight-percent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workersCompProvided"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you provide Workers' Compensation for ALL drivers? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="workers-comp-yes" data-testid="radio-workers-comp-yes" />
                    <label htmlFor="workers-comp-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="workers-comp-no" data-testid="radio-workers-comp-no" />
                    <label htmlFor="workers-comp-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> After submission, we will request a driver list including names, dates of birth, license numbers, hire dates, and years of experience. Motor vehicle records (MVRs) will be required for all drivers.
        </p>
      </div>
    </div>
  );
}

function Step5SafetyMaintenance({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Safety Program</h3>
        
        <FormField
          control={form.control}
          name="safetyProgramWritten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have a formal written safety program? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="safety-program-yes" data-testid="radio-safety-program-yes" />
                    <label htmlFor="safety-program-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="safety-program-no" data-testid="radio-safety-program-no" />
                    <label htmlFor="safety-program-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="safetyMeetingsRegular"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are regular safety meetings held? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="safety-meetings-yes" data-testid="radio-safety-meetings-yes" />
                    <label htmlFor="safety-meetings-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="safety-meetings-no" data-testid="radio-safety-meetings-no" />
                    <label htmlFor="safety-meetings-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("safetyMeetingsRegular") === "yes" && (
          <FormField
            control={form.control}
            name="safetyMeetingsFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How often are safety meetings held?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Monthly, Quarterly" {...field} data-testid="input-safety-frequency" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="postHiringTraining"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is there post-hiring driver training? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="training-yes" data-testid="radio-training-yes" />
                    <label htmlFor="training-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="training-no" data-testid="radio-training-no" />
                    <label htmlFor="training-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("postHiringTraining") === "yes" && (
          <FormField
            control={form.control}
            name="postHiringTrainingDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe post-hiring training</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the training program..."
                    className="min-h-20"
                    {...field}
                    data-testid="textarea-training-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="accidentReviewCommittee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have an Accident Review Committee? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="accident-committee-yes" data-testid="radio-accident-committee-yes" />
                    <label htmlFor="accident-committee-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="accident-committee-no" data-testid="radio-accident-committee-no" />
                    <label htmlFor="accident-committee-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drugAlcoholFreeWorkplace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you provide a drug/alcohol-free workplace? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="drug-free-yes" data-testid="radio-drug-free-yes" />
                    <label htmlFor="drug-free-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="drug-free-no" data-testid="radio-drug-free-no" />
                    <label htmlFor="drug-free-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technology & Safety Equipment</h3>
        
        <FormField
          control={form.control}
          name="camerasInVehicles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have cameras in any vehicles? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cameras-yes" data-testid="radio-cameras-yes" />
                    <label htmlFor="cameras-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cameras-no" data-testid="radio-cameras-no" />
                    <label htmlFor="cameras-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("camerasInVehicles") === "yes" && (
          <FormField
            control={form.control}
            name="cameraSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What camera system(s) are in use?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Lytx, Samsara, etc." {...field} data-testid="input-camera-system" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="telematicsDevices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you use telematics devices? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="telematics-yes" data-testid="radio-telematics-yes" />
                    <label htmlFor="telematics-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="telematics-no" data-testid="radio-telematics-no" />
                    <label htmlFor="telematics-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("telematicsDevices") === "yes" && (
          <FormField
            control={form.control}
            name="telematicsSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What telematics system(s) are in use?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Geotab, Verizon Connect, etc." {...field} data-testid="input-telematics-system" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="gpsTracking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have GPS tracking systems? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="gps-yes" data-testid="radio-gps-yes" />
                    <label htmlFor="gps-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="gps-no" data-testid="radio-gps-no" />
                    <label htmlFor="gps-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("gpsTracking") === "yes" && (
          <FormField
            control={form.control}
            name="gpsSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What GPS system(s) are in use?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Fleet Complete, GPS Trackit, etc." {...field} data-testid="input-gps-system" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Maintenance Program</h3>
        
        <FormField
          control={form.control}
          name="maintenanceProgramWritten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have a written maintenance program? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="maintenance-program-yes" data-testid="radio-maintenance-program-yes" />
                    <label htmlFor="maintenance-program-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="maintenance-program-no" data-testid="radio-maintenance-program-no" />
                    <label htmlFor="maintenance-program-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maintenancePerformedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who services your vehicles?</FormLabel>
              <FormControl>
                <Input placeholder="e.g., In-house mechanics, Third-party shop" {...field} data-testid="input-maintenance-by" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfMechanics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many mechanics are employed?</FormLabel>
              <FormControl>
                <Input type="number" placeholder="3" {...field} data-testid="input-number-mechanics" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mechanicsASECertified"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are mechanics trained or ASE certified? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="mechanics-certified-yes" data-testid="radio-mechanics-certified-yes" />
                    <label htmlFor="mechanics-certified-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="mechanics-certified-no" data-testid="radio-mechanics-certified-no" />
                    <label htmlFor="mechanics-certified-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function Step6CoverageInsurance({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Coverage Requirements</h3>
        
        <FormField
          control={form.control}
          name="autoLiabilityLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auto Liability Limit Requested *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-auto-liability-limit">
                    <SelectValue placeholder="Select liability limit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {liabilityLimits.map((limit) => (
                    <SelectItem key={limit} value={limit}>
                      {limit}
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
          name="physicalDamageDeductible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Damage Deductible</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-physical-damage-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deductibles.map((ded) => (
                    <SelectItem key={ded} value={ded}>
                      {ded}
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
          name="generalLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>General Liability Coverage *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="gl-yes" data-testid="radio-general-liability-yes" />
                    <label htmlFor="gl-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="gl-no" data-testid="radio-general-liability-no" />
                    <label htmlFor="gl-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("generalLiability") === "yes" && (
          <FormField
            control={form.control}
            name="generalLiabilityLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Liability Limit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-general-liability-limit">
                      <SelectValue placeholder="Select GL limit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {liabilityLimits.map((limit) => (
                      <SelectItem key={limit} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="garageLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Garage Liability *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="garage-yes" data-testid="radio-garage-liability-yes" />
                    <label htmlFor="garage-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="garage-no" data-testid="radio-garage-liability-no" />
                    <label htmlFor="garage-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="garageKeepersLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Garagekeepers Legal Liability *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="garagekeepers-yes" data-testid="radio-garagekeepers-yes" />
                    <label htmlFor="garagekeepers-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="garagekeepers-no" data-testid="radio-garagekeepers-no" />
                    <label htmlFor="garagekeepers-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hiredNonOwnedLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hired and Non-Owned Liability *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hired-yes" data-testid="radio-hired-nonowned-yes" />
                    <label htmlFor="hired-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hired-no" data-testid="radio-hired-nonowned-no" />
                    <label htmlFor="hired-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Prior Insurance History</h3>
        
        <FormField
          control={form.control}
          name="currentCarrier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Insurance Carrier</FormLabel>
              <FormControl>
                <Input placeholder="ABC Insurance Company" {...field} data-testid="input-current-carrier" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentPolicyExpiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Policy Expiration Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} data-testid="input-policy-expiration" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currentAutoLiabilityPremium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Auto Liability Premium</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50000" {...field} data-testid="input-auto-premium" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentPhysicalDamagePremium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Physical Damage Premium</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25000" {...field} data-testid="input-physical-damage-premium" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cancelledOrNonRenewed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has any company cancelled or refused to renew your insurance in the past 3 years? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cancelled-yes" data-testid="radio-cancelled-yes" />
                    <label htmlFor="cancelled-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cancelled-no" data-testid="radio-cancelled-no" />
                    <label htmlFor="cancelled-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("cancelledOrNonRenewed") === "yes" && (
          <FormField
            control={form.control}
            name="cancelledExplanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please explain</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide details about cancellation or non-renewal..."
                    className="min-h-24"
                    {...field}
                    data-testid="textarea-cancelled-explanation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information or Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide any additional information about your operation..."
                  className="min-h-32"
                  {...field}
                  data-testid="textarea-additional-info"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> After submission, we will request:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
          <li>Financial statements for the past 2 years</li>
          <li>Loss runs for current and 4 prior policy years (valued within 90 days)</li>
          <li>Complete vehicle schedule with values</li>
          <li>Driver list with MVRs</li>
          <li>Copy of safety and maintenance programs</li>
        </ul>
      </div>
    </div>
  );
}
