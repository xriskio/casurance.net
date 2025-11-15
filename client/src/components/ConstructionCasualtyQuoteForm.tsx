import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { CheckCircle, ChevronLeft, ChevronRight, Building2, Users, ClipboardList, Shield } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  // Step 1: General Information
  applicantName: z.string().min(2, "Applicant name is required"),
  contractorLicenseNumber: z.string().min(1, "Contractor's license number is required"),
  website: z.string().url("Invalid website URL").or(z.literal("")),
  riskManagementContact: z.string().min(2, "Risk management contact is required"),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 555-555-5555"),
  email: z.string().email("Invalid email address"),
  operationsDescription: z.string().min(10, "Please describe your operations (minimum 10 characters)"),
  yearsInBusinessCurrentName: z.string().min(1, "Years in business is required"),
  yearsExperienceField: z.string().min(1, "Years of experience is required"),
  otherBusinessNames: z.string().optional(),
  statesOperate: z.string().min(2, "States of operation required"),
  coloradoOperations: z.boolean(),
  newYorkOperations: z.boolean(),
  nyPercentNYC: z.string().optional(),
  nyPercentRemainder: z.string().optional(),

  // Work Breakdown Percentages
  residentialPercent: z.string().min(1, "Required"),
  commercialPercent: z.string().min(1, "Required"),
  
  // Residential breakdown
  resNewConstruction: z.string().optional(),
  resStructuralRemodel: z.string().optional(),
  resNonStructuralRemodel: z.string().optional(),
  
  // Commercial breakdown
  commNewConstruction: z.string().optional(),
  commStructuralRemodel: z.string().optional(),
  commNonStructuralRemodel: z.string().optional(),
  
  // Interior vs Exterior
  interiorPercent: z.string().optional(),
  exteriorPercent: z.string().optional(),
  
  // GC vs Direct
  generalContractorPercent: z.string().optional(),
  constructionManagerPercent: z.string().optional(),
  developerSpecBuilderPercent: z.string().optional(),
  directContractorPercent: z.string().optional(),

  newResidentialConstruction: z.boolean(),
  workInWrapUp: z.boolean(),
  wrapUpWorkDescription: z.string().optional(),

  // Step 2: Operations
  payrollNext12Months: z.string().min(1, "Payroll amount required"),
  subcontractorCostsNext12Months: z.string().min(1, "Subcontractor costs required"),
  grossReceiptsNext12Months: z.string().min(1, "Gross receipts required"),
  payrollPrior1: z.string().optional(),
  subCostsPrior1: z.string().optional(),
  grossReceiptsPrior1: z.string().optional(),

  percentWorkSubcontracted: z.string().min(1, "Required"),
  collectCertificates: z.boolean(),
  minGLLimit: z.string().optional(),
  writtenAgreementSubcontractors: z.boolean(),
  subcontractorsHoldHarmless: z.boolean(),
  subcontractorsNameAsAI: z.boolean(),
  recordsRetentionPeriod: z.string().optional(),

  // Work type percentages (sample key ones)
  carpentryDirect: z.string().optional(),
  carpentrySub: z.string().optional(),
  concreteDirect: z.string().optional(),
  concreteSub: z.string().optional(),
  electricalDirect: z.string().optional(),
  electricalSub: z.string().optional(),
  hvacDirect: z.string().optional(),
  hvacSub: z.string().optional(),
  plumbingDirect: z.string().optional(),
  plumbingSub: z.string().optional(),
  roofingDirect: z.string().optional(),
  roofingSub: z.string().optional(),

  useEIFS: z.boolean(),
  eifsDetails: z.string().optional(),
  workAsConstructionManager: z.boolean(),
  cmAtRisk: z.boolean(),
  workOnHillsides: z.boolean(),
  hillsidePrecautions: z.string().optional(),
  workOverThreeStories: z.boolean(),
  maxStories: z.string().optional(),
  percentOverThreeStories: z.string().optional(),
  workBelowGrade: z.boolean(),
  maxDepthBelowGrade: z.string().optional(),
  percentBelowGrade: z.string().optional(),
  trenchCollapsePrecautions: z.string().optional(),

  blastingActivities: z.boolean(),
  buildingDemolition: z.boolean(),
  hazardousRemoval: z.boolean(),
  scaffolding: z.boolean(),
  fuelTankWork: z.boolean(),
  shoringUnderpinning: z.boolean(),
  seismicRetrofit: z.boolean(),
  soilRemediation: z.boolean(),
  environmentalResponse: z.boolean(),
  dredgingMining: z.boolean(),
  hazardousWorkDetails: z.string().optional(),
  moldRemediation: z.boolean(),
  ownLeaseEquipment: z.enum(["own", "lease", "both", "never"]),
  formalSafetyPlan: z.boolean(),
  safetyMeetingFrequency: z.enum(["weekly", "monthly", "quarterly", "annually", "none"]),

  // Step 3: Projects & Claims
  largestProject1Name: z.string().optional(),
  largestProject1Value: z.string().optional(),
  largestProject2Name: z.string().optional(),
  largestProject2Value: z.string().optional(),
  largestProject3Name: z.string().optional(),
  largestProject3Value: z.string().optional(),
  
  completedProject1Name: z.string().optional(),
  completedProject1Value: z.string().optional(),
  completedProject2Name: z.string().optional(),
  completedProject2Value: z.string().optional(),
  completedProject3Name: z.string().optional(),
  completedProject3Value: z.string().optional(),

  awareOfCircumstances: z.boolean(),
  circumstancesDetails: z.string().optional(),
  
  additionalInfo: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validate residential + commercial = 100%
  const resPercent = parseFloat(data.residentialPercent) || 0;
  const commPercent = parseFloat(data.commercialPercent) || 0;
  if (Math.abs(resPercent + commPercent - 100) > 0.01) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Residential and Commercial percentages must total 100%",
      path: ["residentialPercent"],
    });
  }

  // If work over three stories, require details
  if (data.workOverThreeStories && !data.maxStories) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Maximum stories required when work is over three stories",
      path: ["maxStories"],
    });
  }

  // If work below grade, require details
  if (data.workBelowGrade && !data.maxDepthBelowGrade) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Maximum depth required when work is below grade",
      path: ["maxDepthBelowGrade"],
    });
  }

  // If NY operations, require breakdown
  if (data.newYorkOperations && (!data.nyPercentNYC || !data.nyPercentRemainder)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "New York percentages required for NY operations",
      path: ["nyPercentNYC"],
    });
  }

  // If use EIFS, require details
  if (data.useEIFS && !data.eifsDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "EIFS details required",
      path: ["eifsDetails"],
    });
  }

  // If aware of circumstances, require details
  if (data.awareOfCircumstances && !data.circumstancesDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please describe the circumstances",
      path: ["circumstancesDetails"],
    });
  }
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { number: 1, title: "General Information", icon: Building2 },
  { number: 2, title: "Operations & Workforce", icon: Users },
  { number: 3, title: "Projects & Safety", icon: Shield },
  { number: 4, title: "Review & Submit", icon: ClipboardList },
];

export default function ConstructionCasualtyQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      contractorLicenseNumber: "",
      website: "",
      riskManagementContact: "",
      phone: "",
      email: "",
      operationsDescription: "",
      yearsInBusinessCurrentName: "",
      yearsExperienceField: "",
      otherBusinessNames: "",
      statesOperate: "",
      coloradoOperations: false,
      newYorkOperations: false,
      nyPercentNYC: "",
      nyPercentRemainder: "",
      residentialPercent: "50",
      commercialPercent: "50",
      newResidentialConstruction: false,
      workInWrapUp: false,
      payrollNext12Months: "",
      subcontractorCostsNext12Months: "",
      grossReceiptsNext12Months: "",
      percentWorkSubcontracted: "",
      collectCertificates: true,
      writtenAgreementSubcontractors: true,
      subcontractorsHoldHarmless: true,
      subcontractorsNameAsAI: true,
      useEIFS: false,
      workAsConstructionManager: false,
      cmAtRisk: false,
      workOnHillsides: false,
      workOverThreeStories: false,
      workBelowGrade: false,
      blastingActivities: false,
      buildingDemolition: false,
      hazardousRemoval: false,
      scaffolding: false,
      fuelTankWork: false,
      shoringUnderpinning: false,
      seismicRetrofit: false,
      soilRemediation: false,
      environmentalResponse: false,
      dredgingMining: false,
      moldRemediation: false,
      ownLeaseEquipment: "never",
      formalSafetyPlan: true,
      safetyMeetingFrequency: "monthly",
      awareOfCircumstances: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        businessName: data.applicantName,
        contactName: data.riskManagementContact,
        email: data.email,
        phone: data.phone,
        insuranceType: "Construction Casualty",
        additionalInfo: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
      toast({
        title: "Quote request submitted!",
        description: "We'll review your information and contact you shortly with a customized quote.",
      });
      setCurrentStep(5);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleNext = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return [
          "applicantName", "contractorLicenseNumber", "website", "riskManagementContact",
          "phone", "email", "operationsDescription", "yearsInBusinessCurrentName",
          "yearsExperienceField", "statesOperate", "residentialPercent", "commercialPercent"
        ];
      case 2:
        return [
          "payrollNext12Months", "subcontractorCostsNext12Months", "grossReceiptsNext12Months",
          "percentWorkSubcontracted"
        ];
      case 3:
        return [];
      default:
        return [];
    }
  };

  if (currentStep === 5) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4" data-testid="text-success-title">Thank You!</h2>
          <p className="text-muted-foreground mb-6" data-testid="text-success-message">
            Your construction casualty insurance quote request has been submitted successfully. 
            Our specialized contractors insurance team will review your information and contact you within 1-2 business days with a customized quote.
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            data-testid="button-back-home"
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`step-indicator-${step.number}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-sm text-center ${
                  currentStep >= step.number ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: General Information */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Applicant Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Construction Inc." {...field} data-testid="input-applicant-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contractorLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contractor's License Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="License #123456" {...field} data-testid="input-license-number" />
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
                          <Input placeholder="https://www.yourcompany.com" {...field} data-testid="input-website" />
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
                        <FormLabel>Risk Management Contact *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Name" {...field} data-testid="input-risk-contact" />
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
                          <Input placeholder="555-555-5555" {...field} data-testid="input-phone" />
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
                          <Input type="email" placeholder="contact@company.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="operationsDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe Your Operations *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your construction operations, specialties, and typical project types..."
                          className="min-h-24"
                          {...field}
                          data-testid="textarea-operations"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="yearsInBusinessCurrentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years in Business (Current Name) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10" {...field} data-testid="input-years-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsExperienceField"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience in This Field *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="15" {...field} data-testid="input-years-experience" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="otherBusinessNames"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Business Names (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="Former business names" {...field} data-testid="input-other-names" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="statesOperate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>States Where You Operate *</FormLabel>
                        <FormControl>
                          <Input placeholder="CA, NV, AZ" {...field} data-testid="input-states" />
                        </FormControl>
                        <FormDescription>List all states (comma-separated)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="coloradoOperations"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-colorado"
                          />
                        </FormControl>
                        <FormLabel>Any operations in Colorado?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newYorkOperations"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-newyork"
                          />
                        </FormControl>
                        <FormLabel>Any operations in New York State?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("newYorkOperations") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
                    <FormField
                      control={form.control}
                      name="nyPercentNYC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>% in NYC, Long Island, Westchester *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="30" {...field} data-testid="input-ny-metro" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nyPercentRemainder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>% in Remainder of State *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="70" {...field} data-testid="input-ny-remainder" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Work Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="residentialPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Residential Work % *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="50" {...field} data-testid="input-residential-percent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="commercialPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commercial Work % *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="50" {...field} data-testid="input-commercial-percent" />
                          </FormControl>
                          <FormDescription>Must total 100% with Residential</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="newResidentialConstruction"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-new-residential"
                          />
                        </FormControl>
                        <div>
                          <FormLabel>New residential construction in tracts/condos/townhomes?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workInWrapUp"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-wrapup"
                          />
                        </FormControl>
                        <FormLabel>Was this work performed in a wrap-up?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Operations & Workforce */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="payrollNext12Months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payroll (Next 12 Months) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="500000" {...field} data-testid="input-payroll" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcontractorCostsNext12Months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcontractor Costs (Next 12 Months) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1000000" {...field} data-testid="input-sub-costs" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="grossReceiptsNext12Months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gross Receipts (Next 12 Months) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="2000000" {...field} data-testid="input-gross-receipts" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Subcontractor Management</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="percentWorkSubcontracted"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentage of Work Subcontracted *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="60" {...field} data-testid="input-percent-subcontracted" />
                          </FormControl>
                          <FormDescription>Percentage of total work performed by subcontractors</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collectCertificates"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-certificates"
                            />
                          </FormControl>
                          <FormLabel>Always collect certificates of insurance from subcontractors?</FormLabel>
                        </FormItem>
                      )}
                    />

                    {form.watch("collectCertificates") && (
                      <FormField
                        control={form.control}
                        name="minGLLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum General Liability Limit Required</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,000,000" {...field} data-testid="input-min-gl-limit" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="writtenAgreementSubcontractors"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-written-agreement"
                            />
                          </FormControl>
                          <FormLabel>Obtain standard written agreement from all subcontractors?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcontractorsHoldHarmless"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-hold-harmless"
                            />
                          </FormControl>
                          <FormLabel>Each subcontractor holds the Applicant harmless?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcontractorsNameAsAI"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-additional-insured"
                            />
                          </FormControl>
                          <div>
                            <FormLabel>Each subcontractor names Applicant as additional insured?</FormLabel>
                            <FormDescription>Including completed operations on their GL policy</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recordsRetentionPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How long do you maintain records of certificates and agreements?</FormLabel>
                          <FormControl>
                            <Input placeholder="5 years" {...field} data-testid="input-records-retention" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Specialized Work Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="useEIFS"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-eifs"
                            />
                          </FormControl>
                          <FormLabel>Use Exterior Insulation and Finish Systems (EIFS)?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workAsConstructionManager"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-construction-manager"
                            />
                          </FormControl>
                          <FormLabel>Work as construction manager?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="moldRemediation"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-mold"
                            />
                          </FormControl>
                          <FormLabel>Perform mold remediation work?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("useEIFS") && (
                    <FormField
                      control={form.control}
                      name="eifsDetails"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>EIFS Details *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your EIFS work and certifications..."
                              {...field}
                              data-testid="textarea-eifs-details"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Equipment & Safety</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ownLeaseEquipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heavy Equipment *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="select-equipment">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="own">Own</SelectItem>
                              <SelectItem value="lease">Lease</SelectItem>
                              <SelectItem value="both">Both Own and Lease</SelectItem>
                              <SelectItem value="never">Never Use</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="formalSafetyPlan"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0 pt-8">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-safety-plan"
                            />
                          </FormControl>
                          <FormLabel>Formal job-site safety plan in place?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("formalSafetyPlan") && (
                    <FormField
                      control={form.control}
                      name="safetyMeetingFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Safety Meeting Frequency *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="select-safety-frequency">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Projects & Safety */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Largest Projects Planned (Upcoming Term)</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`largestProject${num}Name` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project {num} Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Project name or description" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-project-${num}-name`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`largestProject${num}Value` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contract Value</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-project-${num}-value`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Largest Completed Projects (Past 3 Years)</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`completedProject${num}Name` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project {num} Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Project name or description" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-completed-${num}-name`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`completedProject${num}Value` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contract Value</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-completed-${num}-value`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">High-Risk Operations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="workOverThreeStories"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-three-stories"
                            />
                          </FormControl>
                          <FormLabel>Work over three stories in height?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workBelowGrade"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-below-grade"
                            />
                          </FormControl>
                          <FormLabel>Work below grade?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="blastingActivities"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-blasting"
                            />
                          </FormControl>
                          <FormLabel>Blasting activities?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="buildingDemolition"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-demolition"
                            />
                          </FormControl>
                          <FormLabel>Building demolition?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hazardousRemoval"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-hazardous"
                            />
                          </FormControl>
                          <div>
                            <FormLabel>Hazardous material removal/remediation?</FormLabel>
                            <FormDescription>Lead, asbestos, radon, PCBs</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scaffolding"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-scaffolding"
                            />
                          </FormControl>
                          <FormLabel>Use of scaffolding?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {(form.watch("workOverThreeStories") || form.watch("workBelowGrade")) && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-4">
                      {form.watch("workOverThreeStories") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="maxStories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maximum Number of Stories *</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="5" {...field} data-testid="input-max-stories" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="percentOverThreeStories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Percentage of Total Work</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="25" {...field} data-testid="input-percent-stories" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {form.watch("workBelowGrade") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="maxDepthBelowGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maximum Depth (feet) *</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="10" {...field} data-testid="input-max-depth" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="percentBelowGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Percentage of Total Work</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="15" {...field} data-testid="input-percent-below" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="trenchCollapsePrecautions"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Trench Collapse Precautions</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe precautions taken to prevent trench collapse..."
                                    {...field}
                                    data-testid="textarea-trench-precautions"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <FormField
                    control={form.control}
                    name="awareOfCircumstances"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-circumstances"
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel>
                            Are you aware of any circumstance, incident, or accusation arising out of your operations that may result in a claim?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("awareOfCircumstances") && (
                    <FormField
                      control={form.control}
                      name="circumstancesDetails"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Please Describe Circumstances *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide details of the circumstance, incident, or accusation..."
                              className="min-h-24"
                              {...field}
                              data-testid="textarea-circumstances"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you'd like to provide..."
                          className="min-h-24"
                          {...field}
                          data-testid="textarea-additional-info"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Review Your Information</h3>
                  <p className="text-muted-foreground mb-6">
                    Please review your information before submitting. You can go back to edit any section.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Business Information</h4>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Applicant Name:</dt>
                        <dd className="font-medium" data-testid="review-applicant-name">{form.getValues("applicantName")}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">License Number:</dt>
                        <dd className="font-medium" data-testid="review-license">{form.getValues("contractorLicenseNumber")}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Email:</dt>
                        <dd className="font-medium" data-testid="review-email">{form.getValues("email")}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Phone:</dt>
                        <dd className="font-medium" data-testid="review-phone">{form.getValues("phone")}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Financial Summary</h4>
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Annual Payroll:</dt>
                        <dd className="font-medium" data-testid="review-payroll">${form.getValues("payrollNext12Months") ? Number(form.getValues("payrollNext12Months")).toLocaleString() : "0"}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Subcontractor Costs:</dt>
                        <dd className="font-medium" data-testid="review-sub-costs">${form.getValues("subcontractorCostsNext12Months") ? Number(form.getValues("subcontractorCostsNext12Months")).toLocaleString() : "0"}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Gross Receipts:</dt>
                        <dd className="font-medium" data-testid="review-gross-receipts">${form.getValues("grossReceiptsNext12Months") ? Number(form.getValues("grossReceiptsNext12Months")).toLocaleString() : "0"}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Work Distribution</h4>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Residential Work:</dt>
                        <dd className="font-medium" data-testid="review-residential">{form.getValues("residentialPercent")}%</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Commercial Work:</dt>
                        <dd className="font-medium" data-testid="review-commercial">{form.getValues("commercialPercent")}%</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Work Subcontracted:</dt>
                        <dd className="font-medium" data-testid="review-subcontracted">{form.getValues("percentWorkSubcontracted")}%</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Note:</strong> Submission of this quote request does not bind coverage. 
                      Our underwriting team will review your information and may request additional documentation 
                      before providing a formal quote.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || mutation.isPending}
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={mutation.isPending}
              data-testid={currentStep === 4 ? "button-submit" : "button-next"}
            >
              {mutation.isPending ? (
                "Submitting..."
              ) : currentStep === 4 ? (
                <>
                  Submit Quote Request
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
    </div>
  );
}
