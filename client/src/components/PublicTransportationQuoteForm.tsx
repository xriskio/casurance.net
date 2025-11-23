import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

const vehicleSchema = z.object({
  year: z.string().min(1, "Year required"),
  make: z.string().min(1, "Make required"),
  model: z.string().min(1, "Model required"),
  vin: z.string().min(1, "VIN required"),
  gvw: z.string().min(1, "GVW required"),
  seatingCapacity: z.string().min(1, "Seating capacity required"),
  valueStated: z.string().min(1, "Value required"),
  vehicleUse: z.string().min(1, "Usage required"),
});

const formSchema = z.object({
  // Step 1: Business Information
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
  
  // Step 2: Coverage Information
  autoLiabilityLimit: z.string().min(1, "Auto liability limit is required"),
  uninsuredMotoristCoverage: z.enum(["yes", "no"]),
  uninsuredMotoristLimit: z.string().optional(),
  pipMedpayCoverage: z.enum(["yes", "no"]),
  pipMedpayLimit: z.string().optional(),
  physicalDamageCoverage: z.enum(["yes", "no"]),
  physicalDamageDeductible: z.string().optional(),
  comprehensiveDeductible: z.string().optional(),
  generalLiability: z.enum(["yes", "no"]),
  generalLiabilityLimit: z.string().optional(),
  garageLiability: z.enum(["yes", "no"]),
  garageKeepersLiability: z.enum(["yes", "no"]),
  hiredNonOwnedLiability: z.enum(["yes", "no"]),
  
  // Step 3: Operations Details
  operationType: z.array(z.string()).min(1, "Select at least one operation type"),
  charterDestinations: z.string().optional(),
  schoolContracts: z.string().optional(),
  disabledPassengerPercent: z.string().optional(),
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
  radiusLocal: z.string().optional(),
  radiusIntermediate: z.string().optional(),
  radiusLongDistance: z.string().optional(),
  transportCommodities: z.enum(["yes", "no"]),
  commoditiesDescription: z.string().optional(),
  transportAthletes: z.enum(["yes", "no"]),
  athletesTeams: z.string().optional(),
  utilizeTNC: z.enum(["yes", "no"]),
  useOwnerOperators: z.enum(["yes", "no"]),
  numberOwnerOperators: z.string().optional(),
  leaseVehiclesWithoutDrivers: z.enum(["yes", "no"]),
  authorityWithdrawn: z.enum(["yes", "no"]),
  authorityWithdrawnExplanation: z.string().optional(),
  mexicoOperations: z.enum(["yes", "no"]),
  safetyProgramWritten: z.enum(["yes", "no"]),
  safetyMeetingsRegular: z.enum(["yes", "no"]),
  safetyMeetingsFrequency: z.string().optional(),
  postHiringTraining: z.enum(["yes", "no"]),
  postHiringTrainingDescription: z.string().optional(),
  accidentReviewCommittee: z.enum(["yes", "no"]),
  drugAlcoholProgram: z.enum(["yes", "no"]),
  drugTestingPolicy: z.enum(["pre-employment", "random", "post-accident", "reasonable-suspicion", "all"]).optional(),
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
  
  // Step 4: Driver Information
  totalDrivers: z.string().min(1, "Total drivers is required"),
  driversReplaced12Months: z.string().optional(),
  driversAdded12Months: z.string().optional(),
  driversUnion: z.enum(["yes", "no"]),
  driverPayType: z.enum(["hourly", "trip", "mileage", "other"]),
  driverPayTypeOther: z.string().optional(),
  overnightDrivingPercent: z.string().optional(),
  workersCompProvided: z.enum(["yes", "no"]),
  driverMinimumAge: z.string().optional(),
  driverMinimumExperience: z.string().optional(),
  mvrReviewFrequency: z.enum(["annually", "biannually", "other"]).optional(),
  
  // Step 5: Prior Insurance & Loss History
  currentCarrier: z.string().optional(),
  currentPolicyExpiration: z.string().optional(),
  currentAutoLiabilityPremium: z.string().optional(),
  currentPhysicalDamagePremium: z.string().optional(),
  cancelledOrNonRenewed: z.enum(["yes", "no"]),
  cancelledExplanation: z.string().optional(),
  accidentsLast3Years: z.string().optional(),
  claimsLast3Years: z.string().optional(),
  lossHistory: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Step 6: Vehicle Schedule
  vehicles: z.array(vehicleSchema).min(1, "At least one vehicle is required"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  "Business Information",
  "Coverage Selection",
  "Operations Details",
  "Driver Information",
  "Prior Insurance",
  "Vehicle Schedule"
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
  "$500",
  "$1,000",
  "$2,500",
  "$5,000",
  "$10,000"
];

export default function PublicTransportationQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false,
    defaultValues: {
      namedInsured: "",
      mailingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      entityType: "llc",
      yearsEstablished: "",
      autoLiabilityLimit: "$1,000,000",
      uninsuredMotoristCoverage: "yes",
      pipMedpayCoverage: "yes",
      physicalDamageCoverage: "yes",
      generalLiability: "yes",
      garageLiability: "no",
      garageKeepersLiability: "no",
      hiredNonOwnedLiability: "yes",
      operationType: [],
      fleetSize: "",
      annualMileage: "",
      annualRevenue: "",
      transportCommodities: "no",
      transportAthletes: "no",
      utilizeTNC: "no",
      useOwnerOperators: "no",
      leaseVehiclesWithoutDrivers: "no",
      authorityWithdrawn: "no",
      mexicoOperations: "no",
      safetyProgramWritten: "yes",
      safetyMeetingsRegular: "yes",
      postHiringTraining: "yes",
      accidentReviewCommittee: "yes",
      drugAlcoholProgram: "yes",
      camerasInVehicles: "no",
      telematicsDevices: "no",
      gpsTracking: "yes",
      maintenanceProgramWritten: "yes",
      mechanicsASECertified: "yes",
      totalDrivers: "",
      driversUnion: "no",
      driverPayType: "hourly",
      workersCompProvided: "yes",
      cancelledOrNonRenewed: "no",
      vehicles: [],
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
      return await apiRequest("/api/public-transportation-quotes", "POST", payload);
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
        return ["autoLiabilityLimit"];
      case 2:
        return ["operationType", "fleetSize", "annualMileage", "annualRevenue"];
      case 3:
        return ["totalDrivers", "driversUnion", "driverPayType", "workersCompProvided"];
      case 4:
        return [];
      case 5:
        return ["vehicles"];
      default:
        return [];
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              
              {/* Step 1: Business Information */}
              {currentStep === 0 && (
                <div className="space-y-6" key="step-0">
                  <FormField
                    control={form.control}
                    name="namedInsured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Named Insured / Company Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your Company Name" data-testid="input-named-insured" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mailingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mailing Address *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Street address" data-testid="input-mailing-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="CA" data-testid="input-state" />
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
                            <Input {...field} placeholder="90210" data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Principal Garaging Address (if different)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="principalGaragingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Garaging Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Street address" data-testid="input-garaging-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="garagingCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Garaging City</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="City" data-testid="input-garaging-city" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="garagingState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Garaging State</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="CA" data-testid="input-garaging-state" />
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
                            <FormLabel>Garaging ZIP</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="90210" data-testid="input-garaging-zip" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(555) 555-5555" data-testid="input-phone" />
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
                            <Input {...field} placeholder="(555) 555-5555" data-testid="input-fax" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="email@company.com" data-testid="input-email" />
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
                            <Input {...field} placeholder="www.company.com" data-testid="input-website" />
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
                            <Input {...field} placeholder="12-3456789" data-testid="input-fein" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="entityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entity Type *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
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
                  </div>

                  <FormField
                    control={form.control}
                    name="yearsEstablished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years Established *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="10" data-testid="input-years-established" />
                        </FormControl>
                        <FormDescription>How many years has your organization been in business?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Coverage Selection */}
              {currentStep === 1 && (
                <div className="space-y-6" key="step-1">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Coverage Selection</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the insurance coverages you need. Public transportation operations typically require comprehensive protection.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="autoLiabilityLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auto Liability Limit *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-liability-limit">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {liabilityLimits.map((limit) => (
                              <SelectItem key={limit} value={limit}>{limit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Combined Single Limit for Bodily Injury and Property Damage</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="uninsuredMotoristCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Uninsured/Underinsured Motorist Coverage *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="um-yes" data-testid="radio-um-yes" />
                              <label htmlFor="um-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="um-no" data-testid="radio-um-no" />
                              <label htmlFor="um-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("uninsuredMotoristCoverage") === "yes" && (
                    <FormField
                      control={form.control}
                      name="uninsuredMotoristLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UM/UIM Limit</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-um-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {liabilityLimits.map((limit) => (
                                <SelectItem key={limit} value={limit}>{limit}</SelectItem>
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
                    name="pipMedpayCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Injury Protection (PIP) / Medical Payments *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="pip-yes" data-testid="radio-pip-yes" />
                              <label htmlFor="pip-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="pip-no" data-testid="radio-pip-no" />
                              <label htmlFor="pip-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("pipMedpayCoverage") === "yes" && (
                    <FormField
                      control={form.control}
                      name="pipMedpayLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIP/MedPay Limit</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-pip-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="$5,000">$5,000</SelectItem>
                              <SelectItem value="$10,000">$10,000</SelectItem>
                              <SelectItem value="$25,000">$25,000</SelectItem>
                              <SelectItem value="$50,000">$50,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="physicalDamageCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Damage Coverage (Comprehensive & Collision) *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="pd-yes" data-testid="radio-pd-yes" />
                              <label htmlFor="pd-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="pd-no" data-testid="radio-pd-no" />
                              <label htmlFor="pd-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("physicalDamageCoverage") === "yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="physicalDamageDeductible"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collision Deductible</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-collision-deductible">
                                  <SelectValue placeholder="Select deductible" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {deductibles.map((ded) => (
                                  <SelectItem key={ded} value={ded}>{ded}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="comprehensiveDeductible"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comprehensive Deductible</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-comprehensive-deductible">
                                  <SelectValue placeholder="Select deductible" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {deductibles.map((ded) => (
                                  <SelectItem key={ded} value={ded}>{ded}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="generalLiability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>General Liability Coverage *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="gl-yes" data-testid="radio-gl-yes" />
                              <label htmlFor="gl-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="gl-no" data-testid="radio-gl-no" />
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
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-gl-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {liabilityLimits.map((limit) => (
                                <SelectItem key={limit} value={limit}>{limit}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="garageLiability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Garage Liability *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="garage-yes" data-testid="radio-garage-yes" />
                                <label htmlFor="garage-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="garage-no" data-testid="radio-garage-no" />
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
                          <FormLabel>Garagekeepers Liability *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="gk-yes" data-testid="radio-gk-yes" />
                                <label htmlFor="gk-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="gk-no" data-testid="radio-gk-no" />
                                <label htmlFor="gk-no">No</label>
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
                          <FormLabel>Hired & Non-Owned Auto *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="hno-yes" data-testid="radio-hno-yes" />
                                <label htmlFor="hno-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="hno-no" data-testid="radio-hno-no" />
                                <label htmlFor="hno-no">No</label>
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

              {/* Continue to Part 2 of the form... */}
              
              {/* Step 3: Operations Details */}
              {currentStep === 2 && (
                <div className="space-y-6" key="step-2">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Operations Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide detailed information about your transportation operations, fleet composition, and safety programs.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="operationType"
                    render={() => (
                      <FormItem>
                        <FormLabel>Type of Operations * (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                          {operationTypes.map((type) => (
                            <FormField
                              key={type}
                              control={form.control}
                              name="operationType"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked
                                          ? [...(field.value || []), type]
                                          : field.value?.filter((v) => v !== type) || [];
                                        field.onChange(newValue);
                                      }}
                                      data-testid={`checkbox-operation-${type.toLowerCase().replace(/\s+/g, '-')}`}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {type}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="charterDestinations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Charter Destinations (if applicable)</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="List primary charter destinations and routes" rows={3} data-testid="textarea-charter-destinations" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="schoolContracts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Contracts (if applicable)</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="List school districts and contract details" rows={3} data-testid="textarea-school-contracts" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Fleet Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="fleetSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Fleet Size *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="50" type="number" data-testid="input-fleet-size" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="charterBus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Charter Buses</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-charter-bus" />
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
                            <FormLabel>Charter Mini-Buses</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-charter-minibus" />
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
                            <FormLabel>Charter Vans</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-charter-van" />
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
                            <FormLabel>Transit Buses</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-transit-bus" />
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
                            <FormLabel>Transit Vans</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-transit-van" />
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
                            <FormLabel>School Buses</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-school-bus" />
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
                            <FormLabel>School Vans</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-school-van" />
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
                            <FormLabel>Limousines</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" type="number" data-testid="input-limousine" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="annualMileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Annual Mileage *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="500,000" data-testid="input-annual-mileage" />
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
                            <Input {...field} placeholder="$2,500,000" data-testid="input-annual-revenue" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Radius of Operations</h3>
                    <FormDescription>Percentage of miles driven within each radius (should total 100%)</FormDescription>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="radiusLocal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local (0-50 miles)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="60%" data-testid="input-radius-local" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="radiusIntermediate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Intermediate (51-200 miles)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="30%" data-testid="input-radius-intermediate" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="radiusLongDistance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Long Distance (201+ miles)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="10%" data-testid="input-radius-long" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="transportCommodities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transport Commodities (Freight, Packages, Mail)? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                          <FormLabel>Describe Commodities Transported</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Type of commodities, frequency, typical cargo value" rows={3} data-testid="textarea-commodities" />
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
                        <FormLabel>Transport Professional/College Athletic Teams? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                          <FormLabel>List Teams/Organizations</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Team names and frequency of service" rows={3} data-testid="textarea-athletes-teams" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="utilizeTNC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Utilize TNC Platforms (Uber, Lyft)? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
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
                      name="mexicoOperations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operations in Mexico? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="useOwnerOperators"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Use Owner-Operators? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="owner-op-yes" data-testid="radio-owner-op-yes" />
                              <label htmlFor="owner-op-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="owner-op-no" data-testid="radio-owner-op-no" />
                              <label htmlFor="owner-op-no">No</label>
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
                            <Input {...field} placeholder="5" type="number" data-testid="input-owner-operators" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Safety Programs</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="safetyProgramWritten"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Written Safety Program? *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="safety-yes" data-testid="radio-safety-yes" />
                                  <label htmlFor="safety-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="safety-no" data-testid="radio-safety-no" />
                                  <label htmlFor="safety-no">No</label>
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
                            <FormLabel>Regular Safety Meetings? *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="meetings-yes" data-testid="radio-meetings-yes" />
                                  <label htmlFor="meetings-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="meetings-no" data-testid="radio-meetings-no" />
                                  <label htmlFor="meetings-no">No</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("safetyMeetingsRegular") === "yes" && (
                      <FormField
                        control={form.control}
                        name="safetyMeetingsFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meeting Frequency</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Monthly" data-testid="input-meeting-frequency" />
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
                          <FormLabel>Post-Hiring Driver Training? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
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
                            <FormLabel>Training Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Describe your driver training program" rows={2} data-testid="textarea-training" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="accidentReviewCommittee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Accident Review Committee? *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="committee-yes" data-testid="radio-committee-yes" />
                                  <label htmlFor="committee-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="committee-no" data-testid="radio-committee-no" />
                                  <label htmlFor="committee-no">No</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="drugAlcoholProgram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drug & Alcohol Testing Program? *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="drug-yes" data-testid="radio-drug-yes" />
                                  <label htmlFor="drug-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="drug-no" data-testid="radio-drug-no" />
                                  <label htmlFor="drug-no">No</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("drugAlcoholProgram") === "yes" && (
                      <FormField
                        control={form.control}
                        name="drugTestingPolicy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drug Testing Policy</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-drug-policy">
                                  <SelectValue placeholder="Select testing policy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pre-employment">Pre-Employment Only</SelectItem>
                                <SelectItem value="random">Random Testing</SelectItem>
                                <SelectItem value="post-accident">Post-Accident</SelectItem>
                                <SelectItem value="reasonable-suspicion">Reasonable Suspicion</SelectItem>
                                <SelectItem value="all">All of the Above</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Technology & Equipment</h3>
                    
                    <FormField
                      control={form.control}
                      name="camerasInVehicles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dash Cams / Event Recorders in Vehicles? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="camera-yes" data-testid="radio-camera-yes" />
                                <label htmlFor="camera-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="camera-no" data-testid="radio-camera-no" />
                                <label htmlFor="camera-no">No</label>
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
                            <FormLabel>Camera System/Provider</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., Lytx, SmartDrive, Samsara" data-testid="input-camera-system" />
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
                          <FormLabel>Telematics Devices? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
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
                            <FormLabel>Telematics System/Provider</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., Geotab, Verizon Connect" data-testid="input-telematics-system" />
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
                          <FormLabel>GPS Tracking System? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
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
                            <FormLabel>GPS System/Provider</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., GPS Insight, Fleet Complete" data-testid="input-gps-system" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Maintenance Program</h3>
                    
                    <FormField
                      control={form.control}
                      name="maintenanceProgramWritten"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Written Maintenance Program? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="maintenance-yes" data-testid="radio-maintenance-yes" />
                                <label htmlFor="maintenance-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="maintenance-no" data-testid="radio-maintenance-no" />
                                <label htmlFor="maintenance-no">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="maintenancePerformedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maintenance Performed By</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="In-house / Third-party" data-testid="input-maintenance-by" />
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
                            <FormLabel>Number of Mechanics</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="3" type="number" data-testid="input-mechanics" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="mechanicsASECertified"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mechanics ASE Certified? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="ase-yes" data-testid="radio-ase-yes" />
                                <label htmlFor="ase-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="ase-no" data-testid="radio-ase-no" />
                                <label htmlFor="ase-no">No</label>
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

              {/* Step 4: Driver Information */}
              {currentStep === 3 && (
                <div className="space-y-6" key="step-3">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Driver Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide information about your drivers, qualifications, and employment structure.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="totalDrivers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Number of Drivers *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="25" type="number" data-testid="input-total-drivers" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driversReplaced12Months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drivers Replaced (Last 12 Months)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2" type="number" data-testid="input-drivers-replaced" />
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
                          <FormLabel>Drivers Added (Last 12 Months)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="3" type="number" data-testid="input-drivers-added" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="driversUnion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are Drivers Unionized? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                        <FormLabel>Driver Pay Structure *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-pay-type">
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
                          <FormLabel>Describe Pay Structure</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Describe compensation method" data-testid="input-pay-other" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="overnightDrivingPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overnight Driving (% of total miles)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10%" data-testid="input-overnight-percent" />
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
                          <FormLabel>Workers Compensation Coverage? *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="wc-yes" data-testid="radio-wc-yes" />
                                <label htmlFor="wc-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="wc-no" data-testid="radio-wc-no" />
                                <label htmlFor="wc-no">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="driverMinimumAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Driver Age</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="21" type="number" data-testid="input-min-age" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverMinimumExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Experience (years)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="3" data-testid="input-min-experience" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="mvrReviewFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MVR Review Frequency</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-mvr-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="annually">Annually</SelectItem>
                            <SelectItem value="biannually">Bi-Annually</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Prior Insurance & Loss History */}
              {currentStep === 4 && (
                <div className="space-y-6" key="step-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Prior Insurance & Loss History</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide details about your current coverage and claims history.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentCarrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Insurance Carrier</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ABC Insurance Company" data-testid="input-current-carrier" />
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
                            <Input {...field} type="date" data-testid="input-expiration" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentAutoLiabilityPremium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Auto Liability Premium</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$50,000" data-testid="input-auto-premium" />
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
                            <Input {...field} placeholder="$25,000" data-testid="input-pd-premium" />
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
                        <FormLabel>Coverage Cancelled or Non-Renewed in Past 3 Years? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                          <FormLabel>Explanation</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Please explain the circumstances" rows={3} data-testid="textarea-cancelled" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accidentsLast3Years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Accidents (Last 3 Years)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2" type="number" data-testid="input-accidents" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="claimsLast3Years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Claims (Last 3 Years)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2" type="number" data-testid="input-claims" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lossHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loss History Details</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Describe any accidents, claims, or losses in the past 3 years including dates, amounts, and circumstances" rows={4} data-testid="textarea-loss-history" />
                        </FormControl>
                        <FormDescription>Include dates, loss amounts, and brief descriptions</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Any other information that may be relevant to your application" rows={4} data-testid="textarea-additional-info" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 6: Vehicle Schedule */}
              {currentStep === 5 && (
                <div className="space-y-6" key="step-5">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Vehicle Schedule</h3>
                    <p className="text-sm text-muted-foreground">
                      List all vehicles to be insured. Add one entry per vehicle.
                    </p>
                  </div>

                  {form.watch("vehicles").map((_, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Vehicle #{index + 1}</h4>
                        {form.watch("vehicles").length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const current = form.getValues("vehicles");
                              form.setValue("vehicles", current.filter((_, i) => i !== index));
                            }}
                            data-testid={`button-remove-vehicle-${index}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="2024" data-testid={`input-vehicle-year-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.make`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Make *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ford" data-testid={`input-vehicle-make-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.model`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Model *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Transit" data-testid={`input-vehicle-model-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.vin`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>VIN *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="1FTBW3XM0GKA12345" data-testid={`input-vehicle-vin-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.gvw`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gross Vehicle Weight (GVW) *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="26,000 lbs" data-testid={`input-vehicle-gvw-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.seatingCapacity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Seating Capacity *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="45" data-testid={`input-vehicle-seating-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.valueStated`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stated Value *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$75,000" data-testid={`input-vehicle-value-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`vehicles.${index}.vehicleUse`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Use *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Charter, School, Transit, etc." data-testid={`input-vehicle-use-${index}`} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const current = form.getValues("vehicles");
                      form.setValue("vehicles", [
                        ...current,
                        {
                          year: "",
                          make: "",
                          model: "",
                          vin: "",
                          gvw: "",
                          seatingCapacity: "",
                          valueStated: "",
                          vehicleUse: "",
                        },
                      ]);
                    }}
                    className="w-full"
                    data-testid="button-add-vehicle"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vehicle
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  data-testid="button-previous"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    data-testid="button-next"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
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
