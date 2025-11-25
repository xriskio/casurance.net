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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { SERVICE_STATES } from "@shared/constants/states";

const formSchema = z.object({
  namedInsured: z.string().min(1, "Company name is required"),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  telephone: z.string().min(1, "Telephone is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().optional(),
  fein: z.string().optional(),
  dateEstablished: z.string().min(1, "Date established is required"),
  licenseNumber: z.string().optional(),
  effectiveDate: z.string().min(1, "Effective date is required"),
  expirationDate: z.string().min(1, "Expiration date is required"),
  
  currentCarrier: z.string().optional(),
  currentLimitOfInsurance: z.string().optional(),
  currentDeductible: z.string().optional(),
  currentPremium: z.string().optional(),
  currentOfferingRenewal: z.string().optional(),
  currentClaimsMade: z.string().optional(),
  currentRetroactiveDate: z.string().optional(),
  
  revenueUpcomingYear: z.string().optional(),
  revenueLast12Months: z.string().optional(),
  revenueOneYearPrior: z.string().optional(),
  revenueTwoYearsPrior: z.string().optional(),
  revenueThreeYearsPrior: z.string().optional(),
  
  payrollUpcomingYear: z.string().optional(),
  payrollLast12Months: z.string().optional(),
  payrollOneYearPrior: z.string().optional(),
  payrollTwoYearsPrior: z.string().optional(),
  payrollThreeYearsPrior: z.string().optional(),
  
  employeesUpcomingYear: z.string().optional(),
  employeesLast12Months: z.string().optional(),
  employeesOneYearPrior: z.string().optional(),
  employeesTwoYearsPrior: z.string().optional(),
  employeesThreeYearsPrior: z.string().optional(),
  
  operationAirportSecurityArmed: z.string().optional(),
  operationAirportSecurityUnarmed: z.string().optional(),
  operationApartmentPatrolArmed: z.string().optional(),
  operationApartmentPatrolUnarmed: z.string().optional(),
  operationAlarmMonitoringArmed: z.string().optional(),
  operationAlarmMonitoringUnarmed: z.string().optional(),
  operationArmoredCarArmed: z.string().optional(),
  operationArmoredCarUnarmed: z.string().optional(),
  operationBankSecurityArmed: z.string().optional(),
  operationBankSecurityUnarmed: z.string().optional(),
  operationChurchSecurityArmed: z.string().optional(),
  operationChurchSecurityUnarmed: z.string().optional(),
  operationConstructionSiteArmed: z.string().optional(),
  operationConstructionSiteUnarmed: z.string().optional(),
  operationDetentionCenterArmed: z.string().optional(),
  operationDetentionCenterUnarmed: z.string().optional(),
  operationDetectiveWorkArmed: z.string().optional(),
  operationDetectiveWorkUnarmed: z.string().optional(),
  operationEventSecurityArmed: z.string().optional(),
  operationEventSecurityUnarmed: z.string().optional(),
  operationFastFoodArmed: z.string().optional(),
  operationFastFoodUnarmed: z.string().optional(),
  operationGeneralSecurityArmed: z.string().optional(),
  operationGeneralSecurityUnarmed: z.string().optional(),
  operationGasStationArmed: z.string().optional(),
  operationGasStationUnarmed: z.string().optional(),
  operationHospitalSecurityArmed: z.string().optional(),
  operationHospitalSecurityUnarmed: z.string().optional(),
  operationHotelMotelArmed: z.string().optional(),
  operationHotelMotelUnarmed: z.string().optional(),
  operationLiquorStoreArmed: z.string().optional(),
  operationLiquorStoreUnarmed: z.string().optional(),
  operationMallSecurityArmed: z.string().optional(),
  operationMallSecurityUnarmed: z.string().optional(),
  operationNightclubArmed: z.string().optional(),
  operationNightclubUnarmed: z.string().optional(),
  operationOfficeSecurityArmed: z.string().optional(),
  operationOfficeSecurityUnarmed: z.string().optional(),
  operationParkingLotArmed: z.string().optional(),
  operationParkingLotUnarmed: z.string().optional(),
  operationBodyguardArmed: z.string().optional(),
  operationBodyguardUnarmed: z.string().optional(),
  operationResidentialSecurityArmed: z.string().optional(),
  operationResidentialSecurityUnarmed: z.string().optional(),
  operationTrafficControlArmed: z.string().optional(),
  operationTrafficControlUnarmed: z.string().optional(),
  operationOtherArmed: z.string().optional(),
  operationOtherUnarmed: z.string().optional(),
  operationOtherDescription: z.string().optional(),
  
  yearsInOperation: z.string().min(1, "Years in operation is required"),
  priorEntitiesOrDbas: z.string().optional(),
  hiresOffDutyOfficers: z.string().min(1, "Required"),
  officersCarryServiceFirearms: z.string().optional(),
  contractsK9Units: z.string().optional(),
  numberOfStateLicensedInvestigators: z.string().optional(),
  
  hiresSubcontractors: z.string().min(1, "Required"),
  subcontractorsHaveHarmlessClause: z.string().optional(),
  subcontractorOperations: z.string().optional(),
  annualSubcontractorCosts: z.string().optional(),
  
  utilizesDogs: z.string().min(1, "Required"),
  
  weaponryFirearms: z.boolean(),
  weaponryBatons: z.boolean(),
  weaponryStunGuns: z.boolean(),
  weaponryMace: z.boolean(),
  weaponryProjectiles: z.boolean(),
  weaponryGrenades: z.boolean(),
  weaponryOther: z.boolean(),
  weaponryOtherDescription: z.string().optional(),
  
  largestClient1: z.string().optional(),
  largestClient1Work: z.string().optional(),
  largestClient2: z.string().optional(),
  largestClient2Work: z.string().optional(),
  largestClient3: z.string().optional(),
  largestClient3Work: z.string().optional(),
  largestClient4: z.string().optional(),
  largestClient4Work: z.string().optional(),
  largestClient5: z.string().optional(),
  largestClient5Work: z.string().optional(),
  
  hasSignedWrittenContracts: z.string().min(1, "Required"),
  
  hasFormalTrainingProgram: z.string().min(1, "Required"),
  trainingHasWrittenManual: z.string().optional(),
  trainingEmployeesTestOnManual: z.string().optional(),
  trainingRoadTest: z.string().optional(),
  trainingFirearmsProficiency: z.string().optional(),
  trainingDeEscalation: z.string().optional(),
  trainingRestraintTechniques: z.string().optional(),
  trainingHandcuffsOrZipTies: z.string().optional(),
  trainingChokeholds: z.string().optional(),
  trainingDetainmentFalseArrest: z.string().optional(),
  trainingCallLawEnforcement: z.string().optional(),
  trainingAlertLawEnforcementAltercations: z.string().optional(),
  trainingFirstAidCPR: z.string().optional(),
  trainingHeadInjuryRecognition: z.string().optional(),
  trainingFirstAidKits: z.string().optional(),
  trainingNarcan: z.string().optional(),
  trainingCall911Medical: z.string().optional(),
  
  screeningPsychologicalTesting: z.boolean(),
  screeningPolygraph: z.boolean(),
  screeningPriorEmployersWritten: z.boolean(),
  screeningPriorEmployersPhone: z.boolean(),
  screeningCriminalBackgroundState: z.boolean(),
  screeningCriminalBackgroundFederal: z.boolean(),
  screeningDriversLicense: z.boolean(),
  screeningMVR: z.boolean(),
  screeningDrugScreening: z.boolean(),
  screeningAlcoholScreening: z.boolean(),
  screeningAbuseScreening: z.boolean(),
  screeningReferenceVerification: z.boolean(),
  screeningLicenseVerification: z.boolean(),
  screeningDisciplinaryActions: z.boolean(),
  screeningOther: z.boolean(),
  screeningOtherDescription: z.string().optional(),
  
  totalGuardHoursUnarmed: z.string().optional(),
  totalGuardHoursArmed: z.string().optional(),
  averageGuardsPerSupervisor: z.string().optional(),
  usesPatrolEquipment: z.string().optional(),
  patrolEquipmentCount: z.string().optional(),
  providesTransportation: z.string().optional(),
  checksDrivingRecords: z.string().optional(),
  anticipatesUsingDogs: z.string().optional(),
  dogsWithHandlers: z.string().optional(),
  dogsWithoutHandlers: z.string().optional(),
  dogsPurpose: z.string().optional(),
  armedEmployeesLicensed: z.string().optional(),
  recertificationFrequency: z.string().optional(),
  hiredAsPoliceOfficers: z.string().optional(),
  providesPDRServices: z.string().optional(),
  
  numberFullTimeArmedGuards: z.string().optional(),
  numberPartTimeArmedGuards: z.string().optional(),
  payScaleArmedGuardsMin: z.string().optional(),
  payScaleArmedGuardsMax: z.string().optional(),
  
  numberFullTimeUnarmedGuards: z.string().optional(),
  numberPartTimeUnarmedGuards: z.string().optional(),
  payScaleUnarmedGuardsMin: z.string().optional(),
  payScaleUnarmedGuardsMax: z.string().optional(),
  
  numberFullTimeSupervisors: z.string().optional(),
  numberPartTimeSupervisors: z.string().optional(),
  payScaleSupervisorsMin: z.string().optional(),
  payScaleSupervisorsMax: z.string().optional(),
  
  numberFullTimeAdministrative: z.string().optional(),
  numberPartTimeAdministrative: z.string().optional(),
  payScaleAdministrativeMin: z.string().optional(),
  payScaleAdministrativeMax: z.string().optional(),
  
  numberFullTimeSales: z.string().optional(),
  numberPartTimeSales: z.string().optional(),
  payScaleSalesMin: z.string().optional(),
  payScaleSalesMax: z.string().optional(),
  
  totalGuardPayrollYear1: z.string().optional(),
  totalBillableHoursYear1: z.string().optional(),
  totalGuardPayrollYear2: z.string().optional(),
  totalBillableHoursYear2: z.string().optional(),
  totalGuardPayrollYear3: z.string().optional(),
  totalBillableHoursYear3: z.string().optional(),
  totalGuardPayrollYear4: z.string().optional(),
  totalBillableHoursYear4: z.string().optional(),
  totalGuardPayrollYear5: z.string().optional(),
  totalBillableHoursYear5: z.string().optional(),
  
  hadLiabilityClaims: z.string().min(1, "Required"),
  liabilityClaimsDetails: z.string().optional(),
  
  hadCancellationNonRenewal: z.string().min(1, "Required"),
  cancellationDetails: z.string().optional(),
  
  awareOfCircumstances: z.string().min(1, "Required"),
  circumstancesDetails: z.string().optional(),
  
  additionalComments: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hiresOffDutyOfficers === "yes") {
    if (!data.officersCarryServiceFirearms) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if officers carry service firearms", path: ["officersCarryServiceFirearms"] });
    }
    if (!data.contractsK9Units) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if you contract K9 units", path: ["contractsK9Units"] });
    }
  }
  if (data.hiresSubcontractors === "yes") {
    if (!data.subcontractorsHaveHarmlessClause) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required when hiring subcontractors", path: ["subcontractorsHaveHarmlessClause"] });
    }
  }
  if (data.hasFormalTrainingProgram === "yes") {
    if (!data.trainingHasWrittenManual) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required when having formal training", path: ["trainingHasWrittenManual"] });
    }
  }
  if (data.hadLiabilityClaims === "yes" && !data.liabilityClaimsDetails) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please provide details about claims", path: ["liabilityClaimsDetails"] });
  }
  if (data.hadCancellationNonRenewal === "yes" && !data.cancellationDetails) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please provide details about cancellation", path: ["cancellationDetails"] });
  }
  if (data.awareOfCircumstances === "yes" && !data.circumstancesDetails) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please provide details about circumstances", path: ["circumstancesDetails"] });
  }
});

type FormData = z.infer<typeof formSchema>;

export default function SecurityServicesQuoteForm() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namedInsured: "",
      mailingAddress: "",
      city: "",
      state: "",
      zip: "",
      telephone: "",
      email: "",
      website: "",
      fein: "",
      dateEstablished: "",
      licenseNumber: "",
      effectiveDate: "",
      expirationDate: "",
      weaponryFirearms: false,
      weaponryBatons: false,
      weaponryStunGuns: false,
      weaponryMace: false,
      weaponryProjectiles: false,
      weaponryGrenades: false,
      weaponryOther: false,
      screeningPsychologicalTesting: false,
      screeningPolygraph: false,
      screeningPriorEmployersWritten: false,
      screeningPriorEmployersPhone: false,
      screeningCriminalBackgroundState: false,
      screeningCriminalBackgroundFederal: false,
      screeningDriversLicense: false,
      screeningMVR: false,
      screeningDrugScreening: false,
      screeningAlcoholScreening: false,
      screeningAbuseScreening: false,
      screeningReferenceVerification: false,
      screeningLicenseVerification: false,
      screeningDisciplinaryActions: false,
      screeningOther: false,
    },
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/security-services-quotes", {
        namedInsured: data.namedInsured,
        email: data.email,
        phone: data.telephone,
        effectiveDate: data.effectiveDate,
        totalGuardHours: `Armed: ${data.totalGuardHoursArmed || "0"}, Unarmed: ${data.totalGuardHoursUnarmed || "0"}`,
        limitOfInsurance: data.currentLimitOfInsurance || "",
        yearsInBusiness: data.yearsInOperation,
        status: "pending",
        payload: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll review your Security Services application and contact you within 1-2 business days.",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createQuoteMutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsPerStep: Record<number, (keyof FormData)[]> = {
      1: ["namedInsured", "mailingAddress", "city", "state", "zip", "telephone", "email", "dateEstablished", "effectiveDate", "expirationDate"],
      2: [],
      3: ["yearsInOperation", "hiresOffDutyOfficers", "hiresSubcontractors", "utilizesDogs"],
      4: [],
      5: ["hasFormalTrainingProgram"],
      6: ["hasSignedWrittenContracts"],
      7: ["hadLiabilityClaims", "hadCancellationNonRenewal", "awareOfCircumstances"],
      8: [],
    };

    const fields = fieldsPerStep[currentStep] || [];
    const isValid = await form.trigger(fields as any);
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Security Services / Security Guard Quote Request</CardTitle>
            <CardDescription>Complete application for comprehensive security services coverage</CardDescription>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
              data-testid={`progress-step-${i + 1}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Step {currentStep} of {totalSteps}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="namedInsured"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Applicant Name *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Company Name" data-testid="input-named-insured" />
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
                            <Input {...field} placeholder="www.example.com" data-testid="input-website" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mailingAddress"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Mailing Address *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Street Address" data-testid="input-address" />
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
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="12345" data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telephone *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(555) 555-5555" data-testid="input-telephone" />
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
                      name="fein"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FEIN</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="12-3456789" data-testid="input-fein" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateEstablished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Established *</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" data-testid="input-date-established" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="State License #" data-testid="input-license" />
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
                          <FormLabel>Policy Effective Date *</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" data-testid="input-effective-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expirationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy Expiration Date *</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" data-testid="input-expiration-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Current Carrier Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentCarrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Carrier</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Insurance Company Name" data-testid="input-current-carrier" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentLimitOfInsurance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Limit of Insurance</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$1,000,000" data-testid="input-current-limit" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentDeductible"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Deductible</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$5,000" data-testid="input-current-deductible" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentPremium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Premium</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$25,000" data-testid="input-current-premium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentOfferingRenewal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Offering Renewal?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-offering-renewal">
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
                      name="currentClaimsMade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Claims Made Policy?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-claims-made">
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
                      name="currentRetroactiveDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Retroactive Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" data-testid="input-retroactive-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Information (5-Year History)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Category</th>
                          <th className="text-left p-2 font-medium">Upcoming Year</th>
                          <th className="text-left p-2 font-medium">Last 12 Months</th>
                          <th className="text-left p-2 font-medium">1 Year Prior</th>
                          <th className="text-left p-2 font-medium">2 Years Prior</th>
                          <th className="text-left p-2 font-medium">3 Years Prior</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Revenue</td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="revenueUpcomingYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-revenue-upcoming" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="revenueLast12Months"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-revenue-last12" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="revenueOneYearPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-revenue-1year" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="revenueTwoYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-revenue-2years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="revenueThreeYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-revenue-3years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Payroll</td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="payrollUpcomingYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-payroll-upcoming" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="payrollLast12Months"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-payroll-last12" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="payrollOneYearPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-payroll-1year" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="payrollTwoYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-payroll-2years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="payrollThreeYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="$" data-testid="input-payroll-3years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Employees</td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="employeesUpcomingYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="#" data-testid="input-employees-upcoming" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="employeesLast12Months"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="#" data-testid="input-employees-last12" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="employeesOneYearPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="#" data-testid="input-employees-1year" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="employeesTwoYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="#" data-testid="input-employees-2years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <FormField
                              control={form.control}
                              name="employeesThreeYearsPrior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="#" data-testid="input-employees-3years" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Operations Breakdown</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For each operation type, provide percentage of business (armed vs unarmed). Total should equal 100%.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Airport Security", nameArmed: "operationAirportSecurityArmed", nameUnarmed: "operationAirportSecurityUnarmed" },
                      { label: "Apartment/Condo Patrol", nameArmed: "operationApartmentPatrolArmed", nameUnarmed: "operationApartmentPatrolUnarmed" },
                      { label: "Alarm Monitoring", nameArmed: "operationAlarmMonitoringArmed", nameUnarmed: "operationAlarmMonitoringUnarmed" },
                      { label: "Armored Car", nameArmed: "operationArmoredCarArmed", nameUnarmed: "operationArmoredCarUnarmed" },
                      { label: "Bank Security", nameArmed: "operationBankSecurityArmed", nameUnarmed: "operationBankSecurityUnarmed" },
                      { label: "Church Security", nameArmed: "operationChurchSecurityArmed", nameUnarmed: "operationChurchSecurityUnarmed" },
                      { label: "Construction Site Security", nameArmed: "operationConstructionSiteArmed", nameUnarmed: "operationConstructionSiteUnarmed" },
                      { label: "Detention Center", nameArmed: "operationDetentionCenterArmed", nameUnarmed: "operationDetentionCenterUnarmed" },
                      { label: "Detective/Investigative Work", nameArmed: "operationDetectiveWorkArmed", nameUnarmed: "operationDetectiveWorkUnarmed" },
                      { label: "Event Security/Crowd Control", nameArmed: "operationEventSecurityArmed", nameUnarmed: "operationEventSecurityUnarmed" },
                      { label: "Fast Food Restaurant Security", nameArmed: "operationFastFoodArmed", nameUnarmed: "operationFastFoodUnarmed" },
                      { label: "For-Hire General Security", nameArmed: "operationGeneralSecurityArmed", nameUnarmed: "operationGeneralSecurityUnarmed" },
                      { label: "Gas Station Security", nameArmed: "operationGasStationArmed", nameUnarmed: "operationGasStationUnarmed" },
                      { label: "Hospital Security", nameArmed: "operationHospitalSecurityArmed", nameUnarmed: "operationHospitalSecurityUnarmed" },
                      { label: "Hotel/Motel Security", nameArmed: "operationHotelMotelArmed", nameUnarmed: "operationHotelMotelUnarmed" },
                      { label: "Liquor Store Security", nameArmed: "operationLiquorStoreArmed", nameUnarmed: "operationLiquorStoreUnarmed" },
                      { label: "Mall/Shopping Center Security", nameArmed: "operationMallSecurityArmed", nameUnarmed: "operationMallSecurityUnarmed" },
                      { label: "Nightclub or Bar Security/Bouncers", nameArmed: "operationNightclubArmed", nameUnarmed: "operationNightclubUnarmed" },
                      { label: "Office Security", nameArmed: "operationOfficeSecurityArmed", nameUnarmed: "operationOfficeSecurityUnarmed" },
                      { label: "Parking Lot/Deck Security or Patrol", nameArmed: "operationParkingLotArmed", nameUnarmed: "operationParkingLotUnarmed" },
                      { label: "Personal Security - Bodyguard", nameArmed: "operationBodyguardArmed", nameUnarmed: "operationBodyguardUnarmed" },
                      { label: "Personal Security - Residential", nameArmed: "operationResidentialSecurityArmed", nameUnarmed: "operationResidentialSecurityUnarmed" },
                      { label: "Vehicle Traffic Control", nameArmed: "operationTrafficControlArmed", nameUnarmed: "operationTrafficControlUnarmed" },
                    ].map((operation) => (
                      <div key={operation.label} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                        <div className="font-medium">{operation.label}</div>
                        <FormField
                          control={form.control}
                          name={operation.nameArmed as any}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Armed %</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="0" data-testid={`input-${operation.nameArmed}`} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={operation.nameUnarmed as any}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Unarmed %</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="0" data-testid={`input-${operation.nameUnarmed}`} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <FormField
                        control={form.control}
                        name="operationOtherDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other (specify)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Description" data-testid="input-operation-other-desc" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="operationOtherArmed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Armed %</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" data-testid="input-operation-other-armed" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="operationOtherUnarmed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Unarmed %</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0" data-testid="input-operation-other-unarmed" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Operations Information</h3>
                  <FormField
                    control={form.control}
                    name="yearsInOperation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How long have you been in operation? *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Years" data-testid="input-years-operation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priorEntitiesOrDbas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prior entities or DBAs to be covered</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="List any previous business names or DBAs" data-testid="input-prior-entities" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hiresOffDutyOfficers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you hire or contract with off-duty law officers (moonlighting)? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-off-duty-officers">
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
                  {form.watch("hiresOffDutyOfficers") === "yes" && (
                    <>
                      <FormField
                        control={form.control}
                        name="officersCarryServiceFirearms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do officers carry their service firearms?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-firearms">
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
                        name="contractsK9Units"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do you contract K9 unit officers who bring their dog on the job?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-k9-units">
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
                    name="numberOfStateLicensedInvestigators"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How many employees are state licensed private investigators?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Number" data-testid="input-investigators" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hiresSubcontractors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you hire subcontractors? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-subcontractors">
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
                  {form.watch("hiresSubcontractors") === "yes" && (
                    <>
                      <FormField
                        control={form.control}
                        name="subcontractorsHaveHarmlessClause"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are all subcontractors required by contract to hold you harmless and provide a COI evidencing Liability coverage under which you are granted Additional Insured status?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-harmless-clause">
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
                        name="subcontractorOperations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What operations do you hire subcontractors for?</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Describe operations" data-testid="input-subcontractor-operations" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="annualSubcontractorCosts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What are your typical annual subcontractor costs?</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="$" data-testid="input-subcontractor-costs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <FormField
                    control={form.control}
                    name="utilizesDogs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you utilize dogs in your operations? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-dogs">
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
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Guard Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="totalGuardHoursUnarmed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Guard Hours Billed Annually (Unarmed)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Hours" data-testid="input-hours-unarmed" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalGuardHoursArmed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Guard Hours Billed Annually (Armed)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Hours" data-testid="input-hours-armed" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="averageGuardsPerSupervisor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Number of Guards Per Supervisor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Number" data-testid="input-guards-per-supervisor" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="usesPatrolEquipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you use equipment or golf carts for patrol?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-patrol-equipment">
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
                    {form.watch("usesPatrolEquipment") === "yes" && (
                      <FormField
                        control={form.control}
                        name="patrolEquipmentCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How many?</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Number" data-testid="input-patrol-equipment-count" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="providesTransportation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Will you provide transportation services for the public?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-transportation">
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
                    {form.watch("providesTransportation") === "yes" && (
                      <FormField
                        control={form.control}
                        name="checksDrivingRecords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are driving records checked on drivers?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-driving-records">
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
                    <FormField
                      control={form.control}
                      name="anticipatesUsingDogs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you anticipate using dogs?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-anticipate-dogs">
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
                    {form.watch("anticipatesUsingDogs") === "yes" && (
                      <>
                        <FormField
                          control={form.control}
                          name="dogsWithHandlers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Dogs with Handlers</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-dogs-with-handlers" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dogsWithoutHandlers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Dogs without Handlers</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-dogs-without-handlers" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dogsPurpose"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>For what purpose will the dogs be used?</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="e.g., Bombs, Drugs, Airports, Other" data-testid="input-dogs-purpose" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name="armedEmployeesLicensed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Are all armed employees licensed by the state to carry firearms?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-armed-licensed">
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
                    {form.watch("armedEmployeesLicensed") === "yes" && (
                      <FormField
                        control={form.control}
                        name="recertificationFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How often will they have to be re-certified?</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., Annually" data-testid="input-recertification" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="hiredAsPoliceOfficers"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Has a law enforcement agency or municipality hired your firm to act as police officers, sheriffs, constables or correction officers?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-hired-as-police">
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
                      name="providesPDRServices"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Does the applicant provide any type of PDR, SWAT, ERS, or Repatriation services?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-pdr-services">
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

                <div>
                  <h3 className="text-lg font-semibold mb-4">Weaponry Permitted</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    What weaponry are employees or contractors permitted to carry on duty?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weaponryFirearms"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-firearms"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Firearms</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryBatons"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-batons"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Batons</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryStunGuns"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-stun-guns"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Stun Guns/Tasers</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryMace"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-mace"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Mace/Pepper Spray</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryProjectiles"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-projectiles"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Less-than-lethal Projectiles</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryGrenades"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-grenades"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Irritant Smoke Grenades</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weaponryOther"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-weaponry-other"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      )}
                    />
                    {form.watch("weaponryOther") && (
                      <FormField
                        control={form.control}
                        name="weaponryOtherDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Please specify other weaponry</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Description" data-testid="input-weaponry-other-desc" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Employee Training Program</h3>
                  <FormField
                    control={form.control}
                    name="hasFormalTrainingProgram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have a formal training program? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-training-program">
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
                  {form.watch("hasFormalTrainingProgram") === "yes" && (
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="trainingHasWrittenManual"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Does training include a written procedural manual?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-manual">
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
                        {form.watch("trainingHasWrittenManual") === "yes" && (
                          <FormField
                            control={form.control}
                            name="trainingEmployeesTestOnManual"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Are employees tested on their understanding of this manual?</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-training-test">
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
                        <FormField
                          control={form.control}
                          name="trainingRoadTest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you conduct a road test for anyone operating a vehicle?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-road-test">
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
                          name="trainingFirearmsProficiency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you conduct a proficiency test for anyone carrying a firearm?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-firearms">
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
                          name="trainingDeEscalation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you train employees in de-escalation techniques?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-deescalation">
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
                          name="trainingRestraintTechniques"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Are employees trained in restraint techniques?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-restraint">
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
                        {form.watch("trainingRestraintTechniques") === "yes" && (
                          <>
                            <FormField
                              control={form.control}
                              name="trainingHandcuffsOrZipTies"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Are employees provided or allowed to carry handcuffs or zip ties?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-training-handcuffs">
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
                              name="trainingChokeholds"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Do you train on or allow the use of chokeholds/airway constrictive holds?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-training-chokeholds">
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
                          name="trainingDetainmentFalseArrest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Are employees trained on detainment and false arrest?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-detainment">
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
                          name="trainingCallLawEnforcement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Are employees trained on when to call law enforcement to the scene?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-call-police">
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
                        {form.watch("trainingCallLawEnforcement") === "yes" && (
                          <FormField
                            control={form.control}
                            name="trainingAlertLawEnforcementAltercations"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Does this training require employees to alert law enforcement of all physical altercations and threats of violence?</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-training-alert-police">
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
                        <FormField
                          control={form.control}
                          name="trainingFirstAidCPR"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you train employees in first aid and CPR?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-training-first-aid">
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
                        {form.watch("trainingFirstAidCPR") === "yes" && (
                          <>
                            <FormField
                              control={form.control}
                              name="trainingHeadInjuryRecognition"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Are employees trained in recognizing signs of head injury?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-training-head-injury">
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
                              name="trainingFirstAidKits"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Are employees provided first aid kits and regular kit maintenance?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-training-kits">
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
                            {form.watch("trainingFirstAidKits") === "yes" && (
                              <FormField
                                control={form.control}
                                name="trainingNarcan"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Do first aid kits contain Narcan/Naloxone which the employee is trained to use?</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-training-narcan">
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
                            <FormField
                              control={form.control}
                              name="trainingCall911Medical"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Are employees instructed to call 911 for all medical emergencies and injuries?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-training-call-911">
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
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Pre-Employment Screening Procedures</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Which of the following procedures do you use for hiring/screening employees?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="screeningPsychologicalTesting"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-psych"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Psychological Testing</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningPolygraph"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-polygraph"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Polygraph Test</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningPriorEmployersWritten"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-employers-written"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Check Previous Employers - In Writing</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningPriorEmployersPhone"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-employers-phone"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Check Previous Employers - By Telephone</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningCriminalBackgroundState"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-criminal-state"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Criminal Background Check - State</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningCriminalBackgroundFederal"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-criminal-federal"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Criminal Background Check - Federal</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningDriversLicense"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-license"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Driver's License Verification</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningMVR"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-mvr"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">MVR Check</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningDrugScreening"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-drug"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Drug Screening</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningAlcoholScreening"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-alcohol"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Alcohol Screening</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningAbuseScreening"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-abuse"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Abuse Screening</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningReferenceVerification"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-references"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Reference Verification</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningLicenseVerification"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-license-verification"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Verification of License Validity, Suspensions, Revocations</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningDisciplinaryActions"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-disciplinary"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Verification of Pending Disciplinary Actions</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="screeningOther"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-screening-other"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      )}
                    />
                    {form.watch("screeningOther") && (
                      <FormField
                        control={form.control}
                        name="screeningOtherDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Please specify other screening procedures</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Description" data-testid="input-screening-other-desc" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payroll Information</h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Armed Guards</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="numberFullTimeArmedGuards"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-armed-fulltime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberPartTimeArmedGuards"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-armed-parttime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleArmedGuardsMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-armed-min" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleArmedGuardsMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-armed-max" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Unarmed Guards</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="numberFullTimeUnarmedGuards"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-unarmed-fulltime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberPartTimeUnarmedGuards"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-unarmed-parttime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleUnarmedGuardsMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-unarmed-min" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleUnarmedGuardsMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-unarmed-max" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Guard Supervisors</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="numberFullTimeSupervisors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-supervisors-fulltime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberPartTimeSupervisors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-supervisors-parttime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleSupervisorsMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-supervisors-min" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleSupervisorsMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-supervisors-max" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Administrative Staff</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="numberFullTimeAdministrative"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-admin-fulltime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberPartTimeAdministrative"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-admin-parttime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleAdministrativeMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-admin-min" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleAdministrativeMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-admin-max" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Sales Staff</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="numberFullTimeSales"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-sales-fulltime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberPartTimeSales"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Time</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Number" data-testid="input-sales-parttime" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleSalesMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-sales-min" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="payScaleSalesMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Hourly</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$" data-testid="input-sales-max" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please provide information about your five largest revenue-producing clients.
                  </p>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Client {num}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`largestClient${num}` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Company Name" data-testid={`input-client-${num}-name`} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`largestClient${num}Work` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description of Work</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Services provided" data-testid={`input-client-${num}-work`} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="hasSignedWrittenContracts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have a signed, written contract with all customers? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-written-contracts">
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
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Loss History</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hadLiabilityClaims"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Have you had any Liability claims that were or were not covered by insurance? *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-liability-claims">
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
                    {form.watch("hadLiabilityClaims") === "yes" && (
                      <FormField
                        control={form.control}
                        name="liabilityClaimsDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please provide details about the claims</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={4} placeholder="Include dates, amounts, and descriptions" data-testid="input-claims-details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="hadCancellationNonRenewal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>During the past five years, has any insurer ever canceled or non-renewed similar insurance to any applicant or has your insurance been canceled for nonpayment of premium by any insurance or finance company? *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-cancellation">
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
                    {form.watch("hadCancellationNonRenewal") === "yes" && (
                      <FormField
                        control={form.control}
                        name="cancellationDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please provide details about the cancellation or non-renewal</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={4} placeholder="Include carrier, date, and reason" data-testid="input-cancellation-details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="awareOfCircumstances"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Is your company aware of any occurrences, facts, circumstances, incidents, situations, damages or accidents arising out of or related to your operations that a reasonably prudent person might expect to give rise to a claim or lawsuit, whether valid or not, which might directly or indirectly involve the company? *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-circumstances">
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
                    {form.watch("awareOfCircumstances") === "yes" && (
                      <FormField
                        control={form.control}
                        name="circumstancesDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please provide details about these circumstances</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={4} placeholder="Include dates and descriptions" data-testid="input-circumstances-details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Application Complete</p>
                        <p className="text-sm text-muted-foreground">
                          You've completed all sections of the Security Services application. Please review your information before submitting.
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Summary:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Applicant: {form.watch("namedInsured") || "Not provided"}</li>
                        <li>• Email: {form.watch("email") || "Not provided"}</li>
                        <li>• Effective Date: {form.watch("effectiveDate") || "Not provided"}</li>
                        <li>• Years in Operation: {form.watch("yearsInOperation") || "Not provided"}</li>
                        <li>• Total Guard Hours (Armed): {form.watch("totalGuardHoursArmed") || "0"}</li>
                        <li>• Total Guard Hours (Unarmed): {form.watch("totalGuardHoursUnarmed") || "0"}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="additionalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments or Information</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} placeholder="Any additional information you'd like to provide..." data-testid="input-additional-comments" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    By submitting this application, you certify that the information provided is accurate and complete to the best of your knowledge.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} data-testid="button-previous">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep} className="ml-auto" data-testid="button-next">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={createQuoteMutation.isPending}
                  data-testid="button-submit-quote"
                >
                  {createQuoteMutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
