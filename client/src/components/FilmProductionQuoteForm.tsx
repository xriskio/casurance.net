import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronLeft, ChevronRight, AlertCircle, Film } from "lucide-react";
import { useLocation } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";

const filmProductionSchema = z.object({
  applicantName: z.string().min(1, "Applicant name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  mailingAddress: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingState: z.string().optional(),
  mailingZipCode: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  fax: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email("Valid email is required"),
  businessType: z.string().min(1, "Business type is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerTitle: z.string().min(1, "Owner title is required"),
  riskManagementContact: z.string().optional(),
  riskManagementEmail: z.string().optional(),
  riskManagementPhone: z.string().optional(),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  yearEstablished: z.string().min(1, "Year established is required"),
  
  productionTypes: z.object({
    musicVideo: z.string().optional(),
    commercials: z.string().optional(),
    computerEffects: z.string().optional(),
    infomercials: z.string().optional(),
    secondUnit: z.string().optional(),
    travelLogs: z.string().optional(),
    exerciseVideos: z.string().optional(),
    stillShots: z.string().optional(),
    industrial: z.string().optional(),
    cdRom: z.string().optional(),
    animation: z.string().optional(),
    other: z.string().optional(),
  }).optional(),
  
  majorProductions: z.string().optional(),
  productionsLastYear: z.string().optional(),
  anticipatedProductions: z.object({
    commercial: z.string().optional(),
    editing: z.string().optional(),
    educational: z.string().optional(),
    industrial: z.string().optional(),
    infomercial: z.string().optional(),
    miscellaneous: z.string().optional(),
    photography: z.string().optional(),
    prePostProduction: z.string().optional(),
    psa: z.string().optional(),
    realityTV: z.string().optional(),
    sagProduction: z.string().optional(),
    shortFilm: z.string().optional(),
    specProduction: z.string().optional(),
    tvPilot: z.string().optional(),
    tvSeries: z.string().optional(),
  }).optional(),
  
  distributesItems: z.string().optional(),
  distributionDescription: z.string().optional(),
  distributionAnnualReceipts: z.string().optional(),
  usesDrones: z.string().optional(),
  hasClaims: z.string().optional(),
  claimsDescription: z.string().optional(),
  previousInsurer: z.string().optional(),
  previousPolicyNumber: z.string().optional(),
  coProduces: z.string().optional(),
  
  productionName: z.string().min(1, "Production name is required"),
  productionDescription: z.string().min(1, "Production description is required"),
  productionStartDate: z.string().min(1, "Start date is required"),
  productionEndDate: z.string().min(1, "End date is required"),
  locationFilmingPercent: z.string().optional(),
  studioFilmingPercent: z.string().optional(),
  grossProductionCost: z.string().min(1, "Gross production cost is required"),
  crewPayroll: z.string().optional(),
  castPayroll: z.string().optional(),
  usesIndependentContractors: z.string().optional(),
  requiresCertificates: z.string().optional(),
  independentContractorCost: z.string().optional(),
  insuranceCancelled: z.string().optional(),
  cancellationExplanation: z.string().optional(),
  
  stuntsAndHazards: z.object({
    watercraft: z.boolean().optional(),
    underwaterFilming: z.boolean().optional(),
    filmingNearWater: z.boolean().optional(),
    trains: z.boolean().optional(),
    animals: z.boolean().optional(),
    pyrotechnics: z.boolean().optional(),
    expensiveAntiques: z.boolean().optional(),
    autoChase: z.boolean().optional(),
    autoCrash: z.boolean().optional(),
    dangerousAutoScenes: z.boolean().optional(),
    filmingAboveFiftyFeet: z.boolean().optional(),
    undergroundFilming: z.boolean().optional(),
    aircraft: z.boolean().optional(),
    otherStunts: z.boolean().optional(),
  }).optional(),
  stuntsDescription: z.string().optional(),
  
  includesChildren: z.string().optional(),
  childrenAges: z.string().optional(),
  childrenScenes: z.string().optional(),
  parentsOnSet: z.string().optional(),
  backgroundChecksAllowed: z.string().optional(),
  performsBackgroundChecks: z.string().optional(),
  verifiesReferences: z.string().optional(),
  formalSupervision: z.string().optional(),
  verifiesConvictions: z.string().optional(),
  abuseIncidents: z.string().optional(),
  abuseDetails: z.string().optional(),
  
  needsFilmCoverage: z.string().optional(),
  ownedCamerasLimit: z.string().optional(),
  ownedCamerasDeductible: z.string().optional(),
  propsSetsLimit: z.string().optional(),
  propsSetsDeductible: z.string().optional(),
  fineArtsLimit: z.string().optional(),
  fineArtsDeductible: z.string().optional(),
  extraExpenseLimit: z.string().optional(),
  extraExpenseDeductible: z.string().optional(),
  thirdPartyDamageLimit: z.string().optional(),
  thirdPartyDamageDeductible: z.string().optional(),
  rentedEquipmentLimit: z.string().optional(),
  rentedEquipmentDeductible: z.string().optional(),
  borrowedEquipmentLimit: z.string().optional(),
  borrowedEquipmentDeductible: z.string().optional(),
  edpHardwareLimit: z.string().optional(),
  edpHardwareDeductible: z.string().optional(),
  edpSoftwareLimit: z.string().optional(),
  edpSoftwareDeductible: z.string().optional(),
  edpExtraExpenseLimit: z.string().optional(),
  edpExtraExpenseDeductible: z.string().optional(),
  negativeVideoLimit: z.string().optional(),
  negativeVideoDeductible: z.string().optional(),
  faultyProcessingLimit: z.string().optional(),
  faultyProcessingDeductible: z.string().optional(),
  
  filmType35mm: z.string().optional(),
  filmType16mm: z.string().optional(),
  filmType70mm: z.string().optional(),
  videoType: z.string().optional(),
  discType: z.string().optional(),
  cdRomType: z.string().optional(),
  type3D: z.string().optional(),
  otherType: z.string().optional(),
  usesSpecializedSoftware: z.string().optional(),
  softwareName: z.string().optional(),
  softwareValue: z.string().optional(),
  labStudioName: z.string().optional(),
  labStudioAddress: z.string().optional(),
  processingLabName: z.string().optional(),
  processingLabAddress: z.string().optional(),
  
  securityControls: z.string().optional(),
  securityType: z.string().optional(),
  securityCost: z.string().optional(),
  securityPayroll: z.string().optional(),
  dailyInventoryCheck: z.string().optional(),
  removeLockedVehicle: z.string().optional(),
  needsWorldwideCoverage: z.string().optional(),
  worldwideCountries: z.string().optional(),
  worldwideShootDuration: z.string().optional(),
  worldwideFrequency: z.string().optional(),
  worldwideProductions: z.string().optional(),
  
  hasOwnedAutos: z.string().optional(),
  employeesUsePersonalVehicles: z.string().optional(),
  employeesWithVehicles: z.string().optional(),
  vehicleUseFrequency: z.string().optional(),
  obtainsMVRs: z.string().optional(),
  mvrFrequency: z.string().optional(),
  confirmsMinimumLimits: z.string().optional(),
  minimumLimits: z.string().optional(),
  hiredAutosCost: z.string().optional(),
  carsHiredAnnually: z.string().optional(),
  needsPhysicalDamage: z.string().optional(),
  maxVehicleValue: z.string().optional(),
  rentsGripTrucks: z.string().optional(),
  maxGripTruckValue: z.string().optional(),
  
  canMaintain45Degrees: z.string().optional(),
  freezeProtectionMeasures: z.array(z.string()).optional(),
  hasFireSprinklers: z.string().optional(),
  sprinklerType: z.string().optional(),
  sprinklerPercentage: z.string().optional(),
  sprinklerTested: z.string().optional(),
  alarmsMonitored: z.string().optional(),
  shutoffValvesMarked: z.string().optional(),
  shutoffValvesExercised: z.string().optional(),
  staffQualified: z.string().optional(),
  automaticShutoff: z.string().optional(),
  drainUnusedSpaces: z.string().optional(),
  hasCaretaker: z.string().optional(),
  caretakerDuties: z.array(z.string()).optional(),
  walkthroughFrequency: z.string().optional(),
  requiredProcedures: z.string().optional(),
  properlyWinterized: z.string().optional(),
  
  additionalInfo: z.string().optional(),
});

type FilmProductionFormData = z.infer<typeof filmProductionSchema>;

export default function FilmProductionQuoteForm() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const totalSteps = 6;

  const form = useForm<FilmProductionFormData>({
    resolver: zodResolver(filmProductionSchema),
    defaultValues: {
      applicantName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      businessType: "",
      ownerName: "",
      ownerTitle: "",
      yearsInBusiness: "",
      yearEstablished: "",
      productionName: "",
      productionDescription: "",
      productionStartDate: "",
      productionEndDate: "",
      grossProductionCost: "",
      stuntsAndHazards: {},
      productionTypes: {},
      anticipatedProductions: {},
      freezeProtectionMeasures: [],
      caretakerDuties: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FilmProductionFormData) => {
      return apiRequest("POST", "/api/film-production-quotes", {
        applicantName: data.applicantName,
        email: data.email,
        phone: data.phone,
        productionStartDate: data.productionStartDate,
        productionEndDate: data.productionEndDate,
        grossProductionCost: data.grossProductionCost,
        numberOfProductions: data.anticipatedProductions ? 
          Object.values(data.anticipatedProductions).filter(v => v).length.toString() : "0",
        status: "pending",
        payload: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/film-production-quotes"] });
      toast({
        title: "Quote Request Submitted",
        description: "We'll review your film production application and contact you shortly.",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Please try again.",
      });
    },
  });

  const onSubmit = (data: FilmProductionFormData) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FilmProductionFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["applicantName", "streetAddress", "city", "state", "zipCode", "phone", 
        "email", "businessType", "ownerName", "ownerTitle", "yearsInBusiness", "yearEstablished"];
    } else if (step === 2) {
      fieldsToValidate = ["productionName", "productionDescription", "productionStartDate", 
        "productionEndDate", "grossProductionCost"];
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid && step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              s < step ? "bg-primary border-primary text-primary-foreground" :
              s === step ? "border-primary text-primary" :
              "border-muted-foreground/30 text-muted-foreground"
            }`}>
              {s < step ? <Check className="h-4 w-4" /> : s}
            </div>
            <div className="text-xs mt-2 text-center hidden sm:block">
              {s === 1 && "General Info"}
              {s === 2 && "Liability"}
              {s === 3 && "Equipment"}
              {s === 4 && "Auto"}
              {s === 5 && "Protection"}
              {s === 6 && "Review"}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Film className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Film Production Insurance Application</h1>
          <p className="text-muted-foreground">Complete all sections for comprehensive coverage</p>
        </div>

        {renderStepIndicator()}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Section I - General Information"}
                  {step === 2 && "Section II - General Liability"}
                  {step === 3 && "Section III - Inland Marine Equipment"}
                  {step === 4 && "Section IV - Hired & Non-Owned Auto"}
                  {step === 5 && "Winter Weather Freeze Protection"}
                  {step === 6 && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Applicant and business information"}
                  {step === 2 && "Production details and liability coverage"}
                  {step === 3 && "Equipment and property coverage"}
                  {step === 4 && "Vehicle and transportation coverage"}
                  {step === 5 && "Freeze protection and fire safety"}
                  {step === 6 && "Review your application before submitting"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        This application is for Annual Productions, D.I.C.E. Annual Programs, or Film Schools
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="applicantName"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Applicant Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Company Name" data-testid="input-applicant-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Street Address *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123 Main St" data-testid="input-street-address" />
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
                              <Input {...field} placeholder="90001" data-testid="input-zip-code" />
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
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-phone" />
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
                              <Input {...field} type="tel" placeholder="(555) 123-4568" data-testid="input-fax" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="contact@company.com" data-testid="input-email" />
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

                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Business Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-business-type">
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="corporation">Corporation</SelectItem>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
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
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner's Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Doe" data-testid="input-owner-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ownerTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner's Title *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="CEO" data-testid="input-owner-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="riskManagementContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Management Contact</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Jane Smith" data-testid="input-risk-contact" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="riskManagementPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Management Phone</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="(555) 123-4569" data-testid="input-risk-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="riskManagementEmail"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Risk Management Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="risk@company.com" data-testid="input-risk-email" />
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
                              <Input {...field} type="number" placeholder="10" data-testid="input-years-business" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearEstablished"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Established *</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="2010" data-testid="input-year-established" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-3 block">Type of Productions (% of activity)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { key: "musicVideo", label: "Music Video" },
                          { key: "commercials", label: "Commercials" },
                          { key: "computerEffects", label: "Computer Effects" },
                          { key: "infomercials", label: "Infomercials" },
                          { key: "secondUnit", label: "2nd Unit Filming" },
                          { key: "travelLogs", label: "Travel Logs" },
                          { key: "exerciseVideos", label: "Exercise Videos" },
                          { key: "stillShots", label: "Still Shots" },
                          { key: "industrial", label: "Industrial" },
                          { key: "cdRom", label: "CD ROM" },
                          { key: "animation", label: "Animation" },
                          { key: "other", label: "Other" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <Label className="text-sm mb-1">{label}</Label>
                            <Input
                              type="number"
                              placeholder="%"
                              {...form.register(`productionTypes.${key}` as any)}
                              data-testid={`input-production-${key}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="majorProductions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name Three Major Productions (or last three productions)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="1. Production Name One&#10;2. Production Name Two&#10;3. Production Name Three"
                              rows={4}
                              data-testid="input-major-productions"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="productionsLastYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Productions Completed Last Year</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="0" data-testid="input-productions-last-year" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="usesDrones"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uses Drones/UAVs?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-uses-drones">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasClaims"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Any Claims in Past 3 Years?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-has-claims">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coProduces"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Co-produce with Independent Producers?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-co-produces">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("hasClaims") === "yes" && (
                      <FormField
                        control={form.control}
                        name="claimsDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Claims Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Describe claims including dates and amounts paid"
                                rows={3}
                                data-testid="input-claims-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="previousInsurer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Insurer</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Insurance Company Name" data-testid="input-previous-insurer" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="previousPolicyNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Policy Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="POL-123456" data-testid="input-previous-policy" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="productionName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Production Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Film/Production Title" data-testid="input-production-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productionDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Production Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Describe the production, synopsis, and type"
                                rows={4}
                                data-testid="input-production-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="productionStartDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Production Start Date *</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" data-testid="input-production-start-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="productionEndDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Production End Date *</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" data-testid="input-production-end-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="locationFilmingPercent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location Filming %</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="60" data-testid="input-location-filming" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="studioFilmingPercent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Studio Filming %</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="40" data-testid="input-studio-filming" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="grossProductionCost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gross Production Cost *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$1,000,000" data-testid="input-gross-cost" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="crewPayroll"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Crew Payroll</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$500,000" data-testid="input-crew-payroll" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="castPayroll"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cast Payroll</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$300,000" data-testid="input-cast-payroll" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="usesIndependentContractors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Uses Independent Contractors?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-uses-contractors">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch("usesIndependentContractors") === "yes" && (
                          <>
                            <FormField
                              control={form.control}
                              name="requiresCertificates"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Requires Certificates of Insurance?</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-requires-certificates">
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="independentContractorCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Total Cost of Independent Contractors</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="$200,000" data-testid="input-contractor-cost" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="insuranceCancelled"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Insurance Ever Cancelled/Declined?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-insurance-cancelled">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {form.watch("insuranceCancelled") === "yes" && (
                        <FormField
                          control={form.control}
                          name="cancellationExplanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cancellation Explanation</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Please explain"
                                  rows={3}
                                  data-testid="input-cancellation-explanation"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-3 block">Stunts, Hazards, and Special Effects</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select all that apply. Note: Some activities may require separate stunt questionnaire.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { key: "watercraft", label: "Use of Watercraft" },
                          { key: "underwaterFilming", label: "Underwater Filming" },
                          { key: "filmingNearWater", label: "Filming Near/On Water" },
                          { key: "trains", label: "Use of Trains/Railroads" },
                          { key: "animals", label: "Use of Animals" },
                          { key: "pyrotechnics", label: "Use of Pyrotechnics" },
                          { key: "expensiveAntiques", label: "Expensive Antiques/Autos" },
                          { key: "autoChase", label: "Auto Chase Scenes" },
                          { key: "autoCrash", label: "Auto Crash Scenes" },
                          { key: "dangerousAutoScenes", label: "Other Dangerous Auto Scenes" },
                          { key: "filmingAboveFiftyFeet", label: "Filming Above 50 Feet" },
                          { key: "undergroundFilming", label: "Underground Filming" },
                          { key: "aircraft", label: "Use of Aircraft/Helicopters/Balloons" },
                          { key: "otherStunts", label: "Other Stunts or Hazards" },
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`stunt-${key}`}
                              checked={form.watch(`stuntsAndHazards.${key}` as any)}
                              onCheckedChange={(checked) => 
                                form.setValue(`stuntsAndHazards.${key}` as any, checked)
                              }
                              data-testid={`checkbox-stunt-${key}`}
                            />
                            <label
                              htmlFor={`stunt-${key}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {form.watch("stuntsAndHazards.otherStunts") && (
                      <FormField
                        control={form.control}
                        name="stuntsDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Describe Other Stunts/Hazards</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Provide details about other stunts or hazards"
                                rows={3}
                                data-testid="input-stunts-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="includesChildren"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Will Children (Under 18) Be Included?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-includes-children">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("includesChildren") === "yes" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="childrenAges"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Children's Ages</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="8, 10, 12" data-testid="input-children-ages" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="childrenScenes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Scenes with Children</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Describe scenes" data-testid="input-children-scenes" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-semibold mb-3 block">Abuse & Molestation Coverage Questions</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="parentsOnSet"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Parents Required On-Set?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-parents-on-set">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="backgroundChecksAllowed"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>State Allows Background Checks?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-background-allowed">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="performsBackgroundChecks"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Performs Background Checks?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-performs-checks">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="verifiesReferences"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Verifies Employment References?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-verifies-references">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="formalSupervision"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Formal Employee Supervision?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-formal-supervision">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="verifiesConvictions"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Verifies Criminal Convictions?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-verifies-convictions">
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Individual items valued over $25,000 require a separate schedule
                      </AlertDescription>
                    </Alert>

                    <FormField
                      control={form.control}
                      name="needsFilmCoverage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Need Coverage for Damaged Film or Media?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-needs-film-coverage">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Equipment Coverage Limits & Deductibles</Label>
                      <div className="space-y-4">
                        {[
                          { key: "ownedCameras", label: "Owned Cameras & Equipment (Min $2,500 deductible)" },
                          { key: "propsSets", label: "Props, Sets & Wardrobe" },
                          { key: "fineArts", label: "Fine Arts, Jewelry, etc." },
                          { key: "extraExpense", label: "Extra Expense" },
                          { key: "thirdPartyDamage", label: "Third Party Property Damage" },
                          { key: "rentedEquipment", label: "Rented Miscellaneous Equipment (Min $1,000 deductible)" },
                          { key: "borrowedEquipment", label: "Borrowed Miscellaneous Equipment (Min $1,000 deductible)" },
                        ].map(({ key, label }) => (
                          <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">{label}</Label>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Limit of Liability</Label>
                              <Input
                                placeholder="$100,000"
                                {...form.register(`${key}Limit` as any)}
                                data-testid={`input-${key}-limit`}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Deductible</Label>
                              <Input
                                placeholder="$5,000"
                                {...form.register(`${key}Deductible` as any)}
                                data-testid={`input-${key}-deductible`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Electronic Data Processing</Label>
                      <div className="space-y-4">
                        {[
                          { key: "edpHardware", label: "Hardware" },
                          { key: "edpSoftware", label: "Software" },
                          { key: "edpExtraExpense", label: "Extra Expense" },
                          { key: "negativeVideo", label: "Negative/Video/Sound/Disc" },
                          { key: "faultyProcessing", label: "Faulty Processing" },
                        ].map(({ key, label }) => (
                          <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">{label}</Label>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Limit</Label>
                              <Input
                                placeholder="$50,000"
                                {...form.register(`${key}Limit` as any)}
                                data-testid={`input-${key}-limit`}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Deductible</Label>
                              <Input
                                placeholder="$2,500"
                                {...form.register(`${key}Deductible` as any)}
                                data-testid={`input-${key}-deductible`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-3 block">Film/Media Type (% distribution)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { key: "filmType35mm", label: "35mm Film" },
                          { key: "filmType16mm", label: "16mm Film" },
                          { key: "filmType70mm", label: "70mm Film" },
                          { key: "videoType", label: "Video" },
                          { key: "discType", label: "Disc" },
                          { key: "cdRomType", label: "CD-ROM" },
                          { key: "type3D", label: "3D" },
                          { key: "otherType", label: "Other" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <Label className="text-sm mb-1">{label}</Label>
                            <Input
                              type="number"
                              placeholder="%"
                              {...form.register(key as any)}
                              data-testid={`input-${key}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="usesSpecializedSoftware"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uses Specialized Computer Programs?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-uses-software">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("usesSpecializedSoftware") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="softwareName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Software Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Software name" data-testid="input-software-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="softwareValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Software Value</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="$10,000" data-testid="input-software-value" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="labStudioName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lab/Studio Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Lab name" data-testid="input-lab-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="labStudioAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lab/Studio Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Address" data-testid="input-lab-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="processingLabName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Processing Lab Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Processing lab name" data-testid="input-processing-lab-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="processingLabAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Processing Lab Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Address" data-testid="input-processing-lab-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="securityControls"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Controls for Equipment</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe security measures while on set or location"
                              rows={3}
                              data-testid="input-security-controls"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="securityType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Security Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-security-type">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hired">Hired Firm</SelectItem>
                                <SelectItem value="employed">Employed</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("securityType") === "hired" && (
                        <FormField
                          control={form.control}
                          name="securityCost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Security Cost</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$5,000" data-testid="input-security-cost" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch("securityType") === "employed" && (
                        <FormField
                          control={form.control}
                          name="securityPayroll"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Security Payroll</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$8,000" data-testid="input-security-payroll" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="dailyInventoryCheck"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Equipment Inventory Check?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-daily-inventory">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="removeLockedVehicle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Remove Locked Vehicle Warranty?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-remove-locked-vehicle">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="needsWorldwideCoverage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Need Worldwide Coverage?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-worldwide-coverage">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("needsWorldwideCoverage") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="worldwideCountries"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Countries for Filming</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="France, Italy, Japan" data-testid="input-worldwide-countries" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="worldwideShootDuration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shoot Duration</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="2 weeks" data-testid="input-shoot-duration" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="worldwideFrequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Annual Frequency</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="3 times per year" data-testid="input-worldwide-frequency" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="worldwideProductions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Productions to Produce</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Documentary series" data-testid="input-worldwide-productions" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hasOwnedAutos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Has Owned Automobiles?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-has-owned-autos">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesUsePersonalVehicles"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employees Use Personal Vehicles?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-employees-personal-vehicles">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("employeesUsePersonalVehicles") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="employeesWithVehicles"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Employees with Vehicles</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="5" data-testid="input-employees-with-vehicles" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="vehicleUseFrequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>How Often?</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Daily, weekly, monthly" data-testid="input-vehicle-frequency" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <FormField
                        control={form.control}
                        name="obtainsMVRs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Obtains Motor Vehicle Reports?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-obtains-mvrs">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("obtainsMVRs") === "yes" && (
                        <FormField
                          control={form.control}
                          name="mvrFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>MVR Frequency</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Annually, bi-annually" data-testid="input-mvr-frequency" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="confirmsMinimumLimits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirms Minimum Auto Limits?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-confirms-limits">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("confirmsMinimumLimits") === "yes" && (
                        <FormField
                          control={form.control}
                          name="minimumLimits"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Limits Required</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$1,000,000" data-testid="input-minimum-limits" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="hiredAutosCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost of Hired/Leased Autos</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="$20,000" data-testid="input-hired-autos-cost" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="carsHiredAnnually"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cars Hired/Borrowed Annually</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="10" data-testid="input-cars-hired" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="needsPhysicalDamage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hired Auto Physical Damage Required?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-physical-damage">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("needsPhysicalDamage") === "yes" && (
                        <FormField
                          control={form.control}
                          name="maxVehicleValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Vehicle Value</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$50,000" data-testid="input-max-vehicle-value" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="rentsGripTrucks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rents Gear/Grip Trucks?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-rents-grip-trucks">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("rentsGripTrucks") === "yes" && (
                        <FormField
                          control={form.control}
                          name="maxGripTruckValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Grip Truck Value (incl. equipment)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$100,000" data-testid="input-max-grip-truck" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Required for locations in states experiencing freezing temperatures or with prior freeze losses
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="canMaintain45Degrees"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Can Maintain 45°F or Higher in All Areas?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-maintain-temp">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasFireSprinklers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Automatic Fire Sprinklers?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-fire-sprinklers">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("hasFireSprinklers") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="sprinklerType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sprinkler Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-sprinkler-type">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="wet-pipe">Wet-Pipe</SelectItem>
                                    <SelectItem value="dry-pipe">Dry-Pipe</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sprinklerPercentage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>% of Building Sprinklered</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="100" data-testid="input-sprinkler-percentage" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sprinklerTested"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tested in Past 12 Months?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-sprinkler-tested">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="alarmsMonitored"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Alarms Monitored 24/7?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-alarms-monitored">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <FormField
                        control={form.control}
                        name="shutoffValvesMarked"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shutoff Valves Marked & Accessible?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-shutoff-marked">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="shutoffValvesExercised"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shutoff Valves Exercised Annually?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-shutoff-exercised">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="staffQualified"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Staff Qualified to Shut Off Water?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-staff-qualified">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="automaticShutoff"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Automatic Water Shutoff Devices?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-automatic-shutoff">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="drainUnusedSpaces"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drain Water Lines in Unused Spaces?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-drain-unused">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasCaretaker"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full-time Caretaker? (Seasonal Only)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-has-caretaker">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("hasCaretaker") === "no" && (
                        <FormField
                          control={form.control}
                          name="properlyWinterized"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Building Properly Winterized?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-winterized">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </>
                )}

                {step === 6 && (
                  <>
                    <Alert className="mb-6">
                      <Check className="h-4 w-4" />
                      <AlertDescription>
                        Please review your application before submitting. You can go back to make changes if needed.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Applicant Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Company:</span> {form.watch("applicantName")}</div>
                          <div><span className="font-medium">Email:</span> {form.watch("email")}</div>
                          <div><span className="font-medium">Phone:</span> {form.watch("phone")}</div>
                          <div><span className="font-medium">Business Type:</span> {form.watch("businessType")}</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Production Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Production:</span> {form.watch("productionName")}</div>
                          <div><span className="font-medium">Start Date:</span> {form.watch("productionStartDate")}</div>
                          <div><span className="font-medium">End Date:</span> {form.watch("productionEndDate")}</div>
                          <div><span className="font-medium">Budget:</span> {form.watch("grossProductionCost")}</div>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Any additional information you'd like to provide..."
                                rows={4}
                                data-testid="input-additional-info"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    data-testid="button-previous"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {step < totalSteps ? (
                    <Button type="button" onClick={nextStep} data-testid="button-next">
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
