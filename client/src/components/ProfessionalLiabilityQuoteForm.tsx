import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ChevronLeft, ChevronRight, Building2, Users, FileText, Shield, AlertTriangle, Upload } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const fileSchema = typeof File !== 'undefined' ? z.instanceof(File) : z.any();

const formSchema = z.object({
  // Step 1: General Information
  firmName: z.string().min(2, "Firm name is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  website: z.string().optional(),
  email: z.string().email("Invalid email address"),
  riskManagementContact: z.string().min(2, "Risk management contact is required"),
  riskManagementPhone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 555-555-5555"),
  riskManagementEmail: z.string().email("Invalid email address"),
  dateEstablished: z.string().min(1, "Date established is required"),
  telephone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 555-555-5555"),
  natureOfBusiness: z.string().min(10, "Please describe your business (minimum 10 characters)"),
  hasAffiliations: z.boolean(),
  affiliationsExplanation: z.string().optional(),
  branchOffices: z.string().optional(),
  subsidiaries: z.string().optional(),
  hasNameChange: z.boolean(),
  nameChangeDetails: z.string().optional(),

  // Step 2: Staffing & Revenue
  principals: z.string().min(1, "Number of principals is required"),
  professionals: z.string().min(1, "Number of professionals is required"),
  supportStaff: z.string().optional(),
  partTimeProfessionals: z.string().optional(),
  hasLicensedProfessionals: z.boolean(),
  licensedProfessionalsDetails: z.string().optional(),
  fiscalPeriodFrom: z.string().min(1, "Fiscal period start date is required"),
  fiscalPeriodTo: z.string().min(1, "Fiscal period end date is required"),
  pastFiscalYearRevenue: z.string().min(1, "Past fiscal year revenue is required"),
  currentFiscalYearRevenue: z.string().min(1, "Current fiscal year revenue is required"),
  nextYearEstimateRevenue: z.string().min(1, "Next year revenue estimate is required"),
  federalGovernmentPercent: z.string().optional(),
  stateLocalGovernmentPercent: z.string().optional(),
  institutionalPercent: z.string().optional(),
  lendingInstitutionsPercent: z.string().optional(),
  manufacturingPercent: z.string().optional(),
  otherClientPercent: z.string().optional(),
  otherClientSpecify: z.string().optional(),

  // Step 3: Client Relationships & Contracts
  hasRelatedPartyClients: z.boolean(),
  relatedPartyClientName: z.string().optional(),
  relatedPartyRelationship: z.string().optional(),
  relatedPartyRevenue: z.string().optional(),
  hasSingleClientOver50Percent: z.boolean(),
  singleClientName: z.string().optional(),
  singleClientServices: z.string().optional(),
  singleClientDuration: z.string().optional(),
  largestProject1Client: z.string().optional(),
  largestProject1Services: z.string().optional(),
  largestProject1Billings: z.string().optional(),
  largestProject2Client: z.string().optional(),
  largestProject2Services: z.string().optional(),
  largestProject2Billings: z.string().optional(),
  largestProject3Client: z.string().optional(),
  largestProject3Services: z.string().optional(),
  largestProject3Billings: z.string().optional(),
  usesIndependentContractors: z.boolean(),
  contractorBillingsPercent: z.string().optional(),
  hasContingentFees: z.boolean(),
  contingentFeesDetails: z.string().optional(),
  hasWrittenContracts: z.boolean(),
  writtenContractsPercent: z.string().optional(),
  contractHasHoldHarmlessInFavor: z.boolean().optional(),
  contractHasHoldHarmlessInClientFavor: z.boolean().optional(),
  contractHasGuarantees: z.boolean().optional(),
  contractHasPaymentTerms: z.boolean().optional(),
  contractHasServiceDescription: z.boolean().optional(),
  riskMinimizationSteps: z.string().min(10, "Please describe your risk management approach"),

  // Step 4: Insurance History
  hadPolicyDeclined: z.boolean(),
  policyDeclinedDetails: z.string().optional(),
  hasCurrentGLInsurance: z.boolean(),
  hasSuedForFees: z.boolean(),
  suedForFeesDetails: z.string().optional(),
  currentInsurer1: z.string().optional(),
  currentLimit1: z.string().optional(),
  currentDeductible1: z.string().optional(),
  currentPremium1: z.string().optional(),
  currentPeriod1: z.string().optional(),
  priorInsurer1: z.string().optional(),
  priorLimit1: z.string().optional(),
  priorDeductible1: z.string().optional(),
  priorPremium1: z.string().optional(),
  priorPeriod1: z.string().optional(),
  priorInsurer2: z.string().optional(),
  priorLimit2: z.string().optional(),
  priorDeductible2: z.string().optional(),
  priorPremium2: z.string().optional(),
  priorPeriod2: z.string().optional(),
  retroactiveDate: z.string().optional(),

  // Step 5: Claims History
  hasClaimsOrSuits: z.boolean(),
  claimsDetails: z.string().optional(),
  awareOfPotentialClaims: z.boolean(),
  potentialClaimsDetails: z.string().optional(),
  numberOfClaimSupplements: z.string().optional(),

  // Step 6: Coverage Requested
  requestedLimit: z.enum([
    "250000", "300000", "500000", "1000000", "2000000",
    "3000000", "4000000", "5000000", "6000000", "7000000",
    "8000000", "9000000", "10000000"
  ]),
  requestedDeductible: z.string().min(1, "Deductible is required"),
  additionalComments: z.string().optional(),

  // Required Documents
  statementOfQualifications: fileSchema.optional(),
  clientContract: fileSchema.optional(),
  qaQcManual: fileSchema.optional(),
  financialStatements: fileSchema.optional(),
  lossRuns: fileSchema.optional(),
  additionalDocuments: fileSchema.optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { title: "General Information", icon: Building2 },
  { title: "Staffing & Revenue", icon: Users },
  { title: "Clients & Contracts", icon: FileText },
  { title: "Insurance History", icon: Shield },
  { title: "Claims History", icon: AlertTriangle },
  { title: "Coverage & Documents", icon: Upload },
];

function getFieldsForStep(step: number): (keyof FormData)[] {
  const fieldMap: Record<number, (keyof FormData)[]> = {
    0: ["firmName", "streetAddress", "city", "state", "zipCode", "email", "riskManagementContact", "riskManagementPhone", "riskManagementEmail", "dateEstablished", "telephone", "natureOfBusiness"],
    1: ["principals", "professionals", "fiscalPeriodFrom", "fiscalPeriodTo", "pastFiscalYearRevenue", "currentFiscalYearRevenue", "nextYearEstimateRevenue"],
    2: ["riskMinimizationSteps"],
    3: [],
    4: [],
    5: ["requestedLimit", "requestedDeductible"],
  };
  return fieldMap[step] || [];
}

export default function ProfessionalLiabilityQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firmName: "",
      streetAddress: "",
      city: "",
      state: "CA",
      zipCode: "",
      website: "",
      email: "",
      riskManagementContact: "",
      riskManagementPhone: "",
      riskManagementEmail: "",
      dateEstablished: "",
      telephone: "",
      natureOfBusiness: "",
      hasAffiliations: false,
      affiliationsExplanation: "",
      branchOffices: "",
      subsidiaries: "",
      hasNameChange: false,
      nameChangeDetails: "",
      principals: "",
      professionals: "",
      supportStaff: "",
      partTimeProfessionals: "",
      hasLicensedProfessionals: false,
      licensedProfessionalsDetails: "",
      fiscalPeriodFrom: "",
      fiscalPeriodTo: "",
      pastFiscalYearRevenue: "",
      currentFiscalYearRevenue: "",
      nextYearEstimateRevenue: "",
      federalGovernmentPercent: "",
      stateLocalGovernmentPercent: "",
      institutionalPercent: "",
      lendingInstitutionsPercent: "",
      manufacturingPercent: "",
      otherClientPercent: "",
      otherClientSpecify: "",
      hasRelatedPartyClients: false,
      relatedPartyClientName: "",
      relatedPartyRelationship: "",
      relatedPartyRevenue: "",
      hasSingleClientOver50Percent: false,
      singleClientName: "",
      singleClientServices: "",
      singleClientDuration: "",
      largestProject1Client: "",
      largestProject1Services: "",
      largestProject1Billings: "",
      largestProject2Client: "",
      largestProject2Services: "",
      largestProject2Billings: "",
      largestProject3Client: "",
      largestProject3Services: "",
      largestProject3Billings: "",
      usesIndependentContractors: false,
      contractorBillingsPercent: "",
      hasContingentFees: false,
      contingentFeesDetails: "",
      hasWrittenContracts: true,
      writtenContractsPercent: "",
      contractHasHoldHarmlessInFavor: false,
      contractHasHoldHarmlessInClientFavor: false,
      contractHasGuarantees: false,
      contractHasPaymentTerms: false,
      contractHasServiceDescription: false,
      riskMinimizationSteps: "",
      hadPolicyDeclined: false,
      policyDeclinedDetails: "",
      hasCurrentGLInsurance: false,
      hasSuedForFees: false,
      suedForFeesDetails: "",
      currentInsurer1: "",
      currentLimit1: "",
      currentDeductible1: "",
      currentPremium1: "",
      currentPeriod1: "",
      priorInsurer1: "",
      priorLimit1: "",
      priorDeductible1: "",
      priorPremium1: "",
      priorPeriod1: "",
      priorInsurer2: "",
      priorLimit2: "",
      priorDeductible2: "",
      priorPremium2: "",
      priorPeriod2: "",
      retroactiveDate: "",
      hasClaimsOrSuits: false,
      claimsDetails: "",
      awareOfPotentialClaims: false,
      potentialClaimsDetails: "",
      numberOfClaimSupplements: "",
      requestedLimit: "1000000",
      requestedDeductible: "",
      additionalComments: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        ...data,
        type: "professional_liability",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with your professional liability insurance quote.",
      });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);
    
    if (isValid) {
      if (currentStep === STEPS.length - 1) {
        form.handleSubmit(onSubmit)();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" data-testid="icon-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Professional Liability Quote Request Received!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your professional liability insurance quote request. Our underwriting team will review your information and contact you within 24 hours with a competitive quote tailored to your professional services firm.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                form.reset();
              }}
              data-testid="button-submit-another"
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        index === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : index < currentStep
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      data-testid={`step-indicator-${index + 1}`}
                    >
                      <StepIcon className="h-6 w-6" />
                    </div>
                    <span className={`text-xs text-center ${index === currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                data-testid="progress-bar"
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: General Information */}
              {currentStep === 0 && (
                <div className="space-y-6" data-testid="step-general-info">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">General Information</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please provide basic information about your firm. This professional liability coverage is provided on a claims-made basis.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="firmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of Applicant Firm *</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Consulting Group" {...field} data-testid="input-firm-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} data-testid="input-street" />
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
                            <Input placeholder="Los Angeles" {...field} data-testid="input-city" />
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
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-state">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
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
                            <Input placeholder="90001" {...field} data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="www.yourfirm.com" {...field} data-testid="input-website" />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@yourfirm.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Risk Management Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="riskManagementContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} data-testid="input-risk-contact" />
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
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input placeholder="555-555-5555" {...field} data-testid="input-risk-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="riskManagementEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="risk@yourfirm.com" {...field} data-testid="input-risk-email" />
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
                      name="dateEstablished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Established *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-date-established" />
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
                            <Input placeholder="555-555-5555" {...field} data-testid="input-telephone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="natureOfBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe the Applicant's Nature of Business *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a detailed description of your firm's professional services, specialties, and industries served..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-nature-business"
                          />
                        </FormControl>
                        <FormDescription>
                          Include your firm's professional services, specialties, and industries you serve
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAffiliations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-affiliations"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Is the Applicant Firm controlled, owned, affiliated or associated with any other firm, corporation or company?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasAffiliations") && (
                    <FormField
                      control={form.control}
                      name="affiliationsExplanation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please Provide an Explanation</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-affiliations" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="branchOffices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Office(s)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List addresses of all branch offices, brief description of operations, and indicate if coverage is desired..."
                            {...field}
                            data-testid="textarea-branch-offices"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subsidiaries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subsidiary(ies)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Note: Our policy does not provide automatic coverage for subsidiaries..."
                            {...field}
                            data-testid="textarea-subsidiaries"
                          />
                        </FormControl>
                        <FormDescription>
                          Our policy does not provide automatic coverage for subsidiaries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasNameChange"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-name-change"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            During the past five (5) years has the name of the firm been changed or has any other business(es) been acquired, merged into or consolidated with the Applicant firm?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasNameChange") && (
                    <FormField
                      control={form.control}
                      name="nameChangeDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Complete Explanation Detailing Any Liabilities Assumed</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-name-change" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Step 2: Staffing & Revenue */}
              {currentStep === 1 && (
                <div className="space-y-6" data-testid="step-staffing-revenue">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Staffing & Revenue</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please provide information about your firm's staffing and financial information.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-4">Staff Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="principals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Principals, Partners or Officers *</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="5" {...field} data-testid="input-principals" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="professionals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professionals (not included above) *</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="10" {...field} data-testid="input-professionals" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="supportStaff"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Support Staff (including part-time)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="8" {...field} data-testid="input-support-staff" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="partTimeProfessionals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Part-time Professionals (less than 20 hr/wk)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="2" {...field} data-testid="input-part-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasLicensedProfessionals"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-licensed"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Are any staff members considered "Licensed Professionals" or do any staff members hold any professional designations or belong to any professional societies/associations?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasLicensedProfessionals") && (
                    <FormField
                      control={form.control}
                      name="licensedProfessionalsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Individual's Name and Designation/Affiliation</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List names, licenses, and professional affiliations..."
                              {...field}
                              data-testid="textarea-licensed-details"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Fiscal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="fiscalPeriodFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fiscal Period From *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-fiscal-from" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fiscalPeriodTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fiscal Period To *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-fiscal-to" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="pastFiscalYearRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Past Fiscal Year Revenue *</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,000,000" {...field} data-testid="input-past-revenue" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentFiscalYearRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Fiscal Year Revenue *</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,200,000" {...field} data-testid="input-current-revenue" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nextYearEstimateRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Year Estimate *</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,500,000" {...field} data-testid="input-next-revenue" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Revenue Breakdown by Client Type (%)</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Provide the percentage of your gross annual revenue from the last fiscal period attributable to each client type:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="federalGovernmentPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Government (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-federal-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stateLocalGovernmentPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State, County or Local Government (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-state-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="institutionalPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institutional (schools, hospitals, etc.) (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-institutional-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lendingInstitutionsPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lending Institutions (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-lending-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="manufacturingPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturing (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-manufacturing-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="otherClientPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-other-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {(form.watch("otherClientPercent") && parseInt(form.watch("otherClientPercent") || "0") > 0) && (
                      <FormField
                        control={form.control}
                        name="otherClientSpecify"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Specify Other Client Types</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-other-specify" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Client Relationships & Contracts */}
              {currentStep === 2 && (
                <div className="space-y-6" data-testid="step-clients-contracts">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Client Relationships & Contracts</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please provide information about your major clients, projects, and contract practices.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasRelatedPartyClients"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-related-party"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Does the Applicant provide services for any clients in which a principal, partner, officer or employee of your firm is also a principal, partner, officer, employee or a more than three (3)% shareholder of said client?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasRelatedPartyClients") && (
                    <div className="space-y-4 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="relatedPartyClientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-related-client" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="relatedPartyRelationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applicant's Relationship with the Client</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-related-relationship" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="relatedPartyRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Approximate Annual Gross Revenue Generated from this Client</FormLabel>
                            <FormControl>
                              <Input placeholder="$100,000" {...field} data-testid="input-related-revenue" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="hasSingleClientOver50Percent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-single-client"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Were more than fifty (50)% of the Applicant's total gross annual billings for any one year derived from a single client or contract?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasSingleClientOver50Percent") && (
                    <div className="space-y-4 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="singleClientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-single-client-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="singleClientServices"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Services Rendered</FormLabel>
                            <FormControl>
                              <Textarea {...field} data-testid="textarea-single-services" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="singleClientDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How Long Do You Expect This Relationship to Continue?</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-single-duration" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Three Largest Jobs/Projects (Past 3 Years)</h4>
                    
                    <div className="space-y-4 mb-6">
                      <h5 className="font-medium text-foreground">Largest Project #1</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="largestProject1Client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-project1-client" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="largestProject1Billings"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Gross Billings</FormLabel>
                              <FormControl>
                                <Input placeholder="$250,000" {...field} data-testid="input-project1-billings" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="largestProject1Services"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Services Rendered</FormLabel>
                            <FormControl>
                              <Textarea {...field} data-testid="textarea-project1-services" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4 mb-6">
                      <h5 className="font-medium text-foreground">Largest Project #2</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="largestProject2Client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-project2-client" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="largestProject2Billings"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Gross Billings</FormLabel>
                              <FormControl>
                                <Input placeholder="$200,000" {...field} data-testid="input-project2-billings" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="largestProject2Services"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Services Rendered</FormLabel>
                            <FormControl>
                              <Textarea {...field} data-testid="textarea-project2-services" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium text-foreground">Largest Project #3</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="largestProject3Client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-project3-client" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="largestProject3Billings"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Gross Billings</FormLabel>
                              <FormControl>
                                <Input placeholder="$150,000" {...field} data-testid="input-project3-billings" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="largestProject3Services"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Services Rendered</FormLabel>
                            <FormControl>
                              <Textarea {...field} data-testid="textarea-project3-services" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Contractors & Fee Arrangements</h4>
                    
                    <FormField
                      control={form.control}
                      name="usesIndependentContractors"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-contractors"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Does the Applicant utilize the services of independent contractors or sub-consultants?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("usesIndependentContractors") && (
                      <FormField
                        control={form.control}
                        name="contractorBillingsPercent"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Approximate Percentage of Billings Attributable to Independent Contractors/Sub-consultants (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="15" {...field} data-testid="input-contractor-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="hasContingentFees"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-contingent-fees"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Does the Applicant ever enter into contracts where their fees for services provided are contingent upon the client achieving cost reductions or improved operating results?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hasContingentFees") && (
                      <FormField
                        control={form.control}
                        name="contingentFeesDetails"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Provide Detailed Description of Such Arrangements</FormLabel>
                            <FormControl>
                              <Textarea {...field} data-testid="textarea-contingent-details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Written Contracts</h4>
                    
                    <FormField
                      control={form.control}
                      name="hasWrittenContracts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-written-contracts"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Does the Applicant secure a written contract or agreement for every project?
                            </FormLabel>
                            <FormDescription>
                              Please attach a sample copy with your application
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {!form.watch("hasWrittenContracts") && (
                      <FormField
                        control={form.control}
                        name="writtenContractsPercent"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Percentage of Gross Annual Revenue Where a Written Contract is Secured (%)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="75" {...field} data-testid="input-written-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-medium text-foreground">Does the Applicant's contract contain any of the following?</p>
                      
                      <FormField
                        control={form.control}
                        name="contractHasHoldHarmlessInFavor"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-hold-harmless-favor"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Hold harmless or indemnification clauses in your favor
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contractHasHoldHarmlessInClientFavor"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-hold-harmless-client"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Hold harmless or indemnification clauses in your clients favor
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contractHasGuarantees"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-guarantees"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Guarantees or warranties
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contractHasPaymentTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-payment-terms"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Payment terms
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contractHasServiceDescription"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-service-description"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              A specific description of the services you will provide
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="riskMinimizationSteps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe Steps Taken to Minimize/Manage Business Risks *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detail your risk management procedures, quality control processes, professional development programs, etc..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-risk-steps"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Insurance History */}
              {currentStep === 3 && (
                <div className="space-y-6" data-testid="step-insurance-history">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Insurance History</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please provide information about your current and prior professional liability insurance.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hadPolicyDeclined"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-policy-declined"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Has any policy or application for similar insurance on your behalf or on behalf of any of your principals, partners, officers, employees, or on behalf of any predecessors in business ever been declined, canceled, or renewal refused?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hadPolicyDeclined") && (
                    <FormField
                      control={form.control}
                      name="policyDeclinedDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-declined-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasCurrentGLInsurance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-current-gl"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Does the Applicant currently carry commercial general liability insurance?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasSuedForFees"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-sued-fees"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Has the Applicant sued to collect past or overdue fees from clients within the past 2 years?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasSuedForFees") && (
                    <FormField
                      control={form.control}
                      name="suedForFeesDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-sued-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Professional Liability (E&O) Insurance - Past Three (3) Years</h4>
                    
                    <div className="space-y-6">
                      <div className="border p-4 rounded-md">
                        <h5 className="font-medium text-foreground mb-4">Current Policy</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="currentInsurer1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name of Insurer</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-current-insurer" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="currentLimit1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Limit of Liability</FormLabel>
                                <FormControl>
                                  <Input placeholder="$1,000,000" {...field} data-testid="input-current-limit" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="currentDeductible1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Deductible</FormLabel>
                                <FormControl>
                                  <Input placeholder="$10,000" {...field} data-testid="input-current-deductible" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="currentPremium1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Premium</FormLabel>
                                <FormControl>
                                  <Input placeholder="$15,000" {...field} data-testid="input-current-premium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="currentPeriod1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Policy Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="01/01/2024 - 01/01/2025" {...field} data-testid="input-current-period" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="border p-4 rounded-md">
                        <h5 className="font-medium text-foreground mb-4">Prior Policy #1</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="priorInsurer1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name of Insurer</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-prior1-insurer" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorLimit1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Limit of Liability</FormLabel>
                                <FormControl>
                                  <Input placeholder="$1,000,000" {...field} data-testid="input-prior1-limit" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorDeductible1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Deductible</FormLabel>
                                <FormControl>
                                  <Input placeholder="$10,000" {...field} data-testid="input-prior1-deductible" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorPremium1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Premium</FormLabel>
                                <FormControl>
                                  <Input placeholder="$12,000" {...field} data-testid="input-prior1-premium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorPeriod1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Policy Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="01/01/2023 - 01/01/2024" {...field} data-testid="input-prior1-period" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="border p-4 rounded-md">
                        <h5 className="font-medium text-foreground mb-4">Prior Policy #2</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="priorInsurer2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name of Insurer</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-prior2-insurer" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorLimit2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Limit of Liability</FormLabel>
                                <FormControl>
                                  <Input placeholder="$1,000,000" {...field} data-testid="input-prior2-limit" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorDeductible2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Deductible</FormLabel>
                                <FormControl>
                                  <Input placeholder="$10,000" {...field} data-testid="input-prior2-deductible" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorPremium2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Premium</FormLabel>
                                <FormControl>
                                  <Input placeholder="$10,000" {...field} data-testid="input-prior2-premium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priorPeriod2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Policy Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="01/01/2022 - 01/01/2023" {...field} data-testid="input-prior2-period" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="retroactiveDate"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel>Retro-active Date on Current Policy</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-retroactive-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Claims History */}
              {currentStep === 4 && (
                <div className="space-y-6" data-testid="step-claims-history">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Claims History</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please provide complete and accurate information about any claims or potential claims.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                    <p className="text-sm text-amber-900">
                      <strong>Important Notice:</strong> It is understood and agreed that if any claims, acts, errors, omissions, disputes or circumstances exist, then such claims and/or claims arising from such circumstances are excluded from coverage and failure to disclose may result in the proposed insurance being void or subject to rescission.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasClaimsOrSuits"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-claims"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Have any claims, suits, or demands for arbitration been made against the Applicant, its predecessor(s) or any past or present principal, partner, officer or employee within the past five (5) years?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasClaimsOrSuits") && (
                    <FormField
                      control={form.control}
                      name="claimsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Details (Complete a Claim Supplement Form for Each Incident)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe each claim, suit, or demand including dates, amounts, and current status..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-claims-details"
                            />
                          </FormControl>
                          <FormDescription>
                            You must complete a separate Claim Supplement form for each incident
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="awareOfPotentialClaims"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-potential-claims"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Having inquired all principals, partners and officers, are you aware of any act, error, omission, unresolved job dispute or any other circumstance that is or could be a basis for a claim under the proposed insurance?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("awareOfPotentialClaims") && (
                    <FormField
                      control={form.control}
                      name="potentialClaimsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provide Details (Complete a Claim Supplement Form for Each Circumstance)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe each potential claim including relevant dates, parties involved, and nature of the issue..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-potential-details"
                            />
                          </FormControl>
                          <FormDescription>
                            You must complete a separate Claim Supplement form for each circumstance
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="numberOfClaimSupplements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Claim Supplemental Forms Attached to This Application</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} data-testid="input-supplements" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 6: Coverage Requested & Documents */}
              {currentStep === 5 && (
                <div className="space-y-6" data-testid="step-coverage-documents">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Coverage Requested & Required Documents</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please specify your desired coverage limits and upload required documentation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="requestedLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limit of Liability *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="250000">$250,000</SelectItem>
                              <SelectItem value="300000">$300,000</SelectItem>
                              <SelectItem value="500000">$500,000</SelectItem>
                              <SelectItem value="1000000">$1,000,000</SelectItem>
                              <SelectItem value="2000000">$2,000,000</SelectItem>
                              <SelectItem value="3000000">$3,000,000</SelectItem>
                              <SelectItem value="4000000">$4,000,000</SelectItem>
                              <SelectItem value="5000000">$5,000,000</SelectItem>
                              <SelectItem value="6000000">$6,000,000</SelectItem>
                              <SelectItem value="7000000">$7,000,000</SelectItem>
                              <SelectItem value="8000000">$8,000,000</SelectItem>
                              <SelectItem value="9000000">$9,000,000</SelectItem>
                              <SelectItem value="10000000">$10,000,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requestedDeductible"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deductible *</FormLabel>
                          <FormControl>
                            <Input placeholder="$10,000" {...field} data-testid="input-deductible" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments or Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information you'd like to provide..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-additional-comments"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-foreground mb-4">Required Documents</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please attach the following documents to support your application:
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="statementOfQualifications"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              1. Statement of Qualifications
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                (including resumes of key personnel and marketing materials)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-qualifications"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clientContract"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              2. Copy of Standard Client Contract
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-contract"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="qaQcManual"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              3. Outline from QA/QC Manual
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                (Quality Assurance / Quality Control)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-qaqc"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="financialStatements"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              4. Financial Statements
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                (Most recent fiscal year)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.xlsx,.xls"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-financials"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lossRuns"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              5. Loss Runs (Past 5 Years)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.xlsx,.xls"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-loss-runs"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalDocuments"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>
                              Additional Supporting Documents
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx,.xlsx,.xls"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="file-additional"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={submitMutation.isPending}
                  data-testid={currentStep === STEPS.length - 1 ? "button-submit" : "button-next"}
                >
                  {submitMutation.isPending ? (
                    "Submitting..."
                  ) : currentStep === STEPS.length - 1 ? (
                    <>
                      Submit Application
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
