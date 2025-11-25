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
import { Shield, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { SERVICE_STATES } from "@shared/constants/states";

const productTypeLabels: Record<string, string> = {
  "general-manufacturing": "General Manufacturing & Distribution",
  "cannabis-hemp": "Cannabis - Hemp/CBD Products",
  "cannabis-thc": "Cannabis - Marijuana/THC Products",
  "firearms": "Firearms Retail & Manufacturing",
  "ecig-tobacco": "Electronic Cigarette & Tobacco Products",
  "machine-shop": "Machine Shop Operations",
  "amusement-device": "Amusement Device Products",
  "discontinued": "Discontinued Products/Operations"
};

export default function ProductLiabilityQuoteForm({ productType }: { productType: string }) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const productTypeLabel = productTypeLabels[productType] || productType;

  const formSchema = z.object({
    namedInsured: z.string().min(1, "Company name is required"),
    mailingAddress: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    contactName: z.string().min(1, "Contact name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone is required"),
    effectiveDate: z.string().min(1, "Effective date is required"),
    policyTerm: z.string().min(1, "Policy term is required"),
    limitOfInsurance: z.string().min(1, "Limit of insurance is required"),
    deductible: z.string().min(1, "Deductible is required"),
    currentAnnualSales: z.string().min(1, "Current annual sales is required"),
    projectedAnnualSales: z.string().min(1, "Projected annual sales is required"),
    yearsInBusiness: z.string().min(1, "Years in business is required"),
    numberOfEmployees: z.string().min(1, "Number of employees is required"),
    productsManufactured: z.string().min(1, "Products description is required"),
    distributionChannels: z.string().min(1, "Distribution channels is required"),
    productTesting: z.string().min(1, "Product testing information is required"),
    qualityControl: z.string().min(1, "Quality control procedures is required"),
    anyClaimsHistory: z.string().min(1, "Claims history response is required"),
    claimsDetails: z.string().optional(),
    anyPriorDenials: z.string().min(1, "Prior denials response is required"),
    priorDenialsDetails: z.string().optional(),
    additionalInfo: z.string().optional(),
    thcContent: z.string().optional(),
    cannabisLicense: z.string().optional(),
    labTesting: z.string().optional(),
    productTypes: z.string().optional(),
    federalLicense: z.string().optional(),
    firearmsTypes: z.string().optional(),
    backgroundChecks: z.string().optional(),
    storageSecurityMeasures: z.string().optional(),
    nicotineContent: z.string().optional(),
    productCategories: z.string().optional(),
    complianceStandards: z.string().optional(),
    ageVerification: z.string().optional(),
    machineTypes: z.string().optional(),
    materialsWorked: z.string().optional(),
    toleranceSpecs: z.string().optional(),
    certifications: z.string().optional(),
    deviceTypes: z.string().optional(),
    safetyInspections: z.string().optional(),
    maintenanceSchedule: z.string().optional(),
    operatorTraining: z.string().optional(),
    discontinuedDate: z.string().optional(),
    productsDiscontinued: z.string().optional(),
    remainingInventory: z.string().optional(),
    tailCoverageNeeded: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (productType === "cannabis-hemp" || productType === "cannabis-thc") {
      if (!data.thcContent) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "THC content is required", path: ["thcContent"] });
      if (!data.cannabisLicense) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "License information is required", path: ["cannabisLicense"] });
      if (!data.labTesting) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Lab testing information is required", path: ["labTesting"] });
      if (!data.productTypes) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Product types is required", path: ["productTypes"] });
    }
    if (productType === "firearms") {
      if (!data.federalLicense) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Federal license information is required", path: ["federalLicense"] });
      if (!data.firearmsTypes) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Types of firearms is required", path: ["firearmsTypes"] });
      if (!data.backgroundChecks) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Background check process is required", path: ["backgroundChecks"] });
      if (!data.storageSecurityMeasures) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Storage and security measures is required", path: ["storageSecurityMeasures"] });
    }
    if (productType === "ecig-tobacco") {
      if (!data.nicotineContent) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nicotine content is required", path: ["nicotineContent"] });
      if (!data.productCategories) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Product categories is required", path: ["productCategories"] });
      if (!data.complianceStandards) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Compliance standards is required", path: ["complianceStandards"] });
      if (!data.ageVerification) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Age verification process is required", path: ["ageVerification"] });
    }
    if (productType === "machine-shop") {
      if (!data.machineTypes) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Machine types is required", path: ["machineTypes"] });
      if (!data.materialsWorked) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Materials worked is required", path: ["materialsWorked"] });
      if (!data.toleranceSpecs) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tolerance specifications is required", path: ["toleranceSpecs"] });
      if (!data.certifications) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Certifications is required", path: ["certifications"] });
    }
    if (productType === "amusement-device") {
      if (!data.deviceTypes) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Device types is required", path: ["deviceTypes"] });
      if (!data.safetyInspections) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Safety inspection information is required", path: ["safetyInspections"] });
      if (!data.maintenanceSchedule) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Maintenance schedule is required", path: ["maintenanceSchedule"] });
      if (!data.operatorTraining) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Operator training is required", path: ["operatorTraining"] });
    }
    if (productType === "discontinued") {
      if (!data.discontinuedDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Discontinued date is required", path: ["discontinuedDate"] });
      if (!data.productsDiscontinued) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Products discontinued is required", path: ["productsDiscontinued"] });
      if (!data.remainingInventory) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Remaining inventory is required", path: ["remainingInventory"] });
      if (!data.tailCoverageNeeded) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tail coverage needs is required", path: ["tailCoverageNeeded"] });
    }
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namedInsured: "",
      mailingAddress: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      email: "",
      phone: "",
      effectiveDate: "",
      policyTerm: "12",
      limitOfInsurance: "",
      deductible: "",
      currentAnnualSales: "",
      projectedAnnualSales: "",
      yearsInBusiness: "",
      numberOfEmployees: "",
      productsManufactured: "",
      distributionChannels: "",
      productTesting: "",
      qualityControl: "",
      anyClaimsHistory: "",
      claimsDetails: "",
      anyPriorDenials: "",
      priorDenialsDetails: "",
      additionalInfo: "",
      thcContent: "",
      cannabisLicense: "",
      labTesting: "",
      productTypes: "",
      federalLicense: "",
      firearmsTypes: "",
      backgroundChecks: "",
      storageSecurityMeasures: "",
      nicotineContent: "",
      productCategories: "",
      complianceStandards: "",
      ageVerification: "",
      machineTypes: "",
      materialsWorked: "",
      toleranceSpecs: "",
      certifications: "",
      deviceTypes: "",
      safetyInspections: "",
      maintenanceSchedule: "",
      operatorTraining: "",
      discontinuedDate: "",
      productsDiscontinued: "",
      remainingInventory: "",
      tailCoverageNeeded: "",
    },
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/product-liability-quotes", {
        namedInsured: data.namedInsured,
        email: data.email,
        phone: data.phone,
        productType: productType,
        effectiveDate: data.effectiveDate,
        annualSales: data.currentAnnualSales,
        limitOfInsurance: data.limitOfInsurance,
        status: "pending",
        payload: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll review your application and contact you within 1-2 business days.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createQuoteMutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ["namedInsured", "mailingAddress", "city", "state", "zip", "contactName", "email", "phone"];
      case 2:
        return ["effectiveDate", "policyTerm", "limitOfInsurance", "deductible"];
      case 3:
        return ["currentAnnualSales", "projectedAnnualSales", "yearsInBusiness", "numberOfEmployees"];
      case 4:
        return ["productsManufactured", "distributionChannels", "productTesting", "qualityControl"];
      case 5:
        return ["anyClaimsHistory", "claimsDetails", "anyPriorDenials", "priorDenialsDetails"];
      case 6:
        return ["additionalInfo"];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="text-form-title">
            <Shield className="h-8 w-8 text-primary" />
            {productTypeLabel}
          </h1>
          <p className="text-muted-foreground" data-testid="text-form-description">
            Complete this comprehensive application to receive your customized quote
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium" data-testid="text-step-counter">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground" data-testid="text-step-progress">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <Card data-testid="card-step-1">
                <CardHeader>
                  <CardTitle>Applicant Information</CardTitle>
                  <CardDescription>Tell us about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="namedInsured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Named Insured (Company Name)</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-named-insured" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mailingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mailing Address</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-mailing-address" />
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
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-city" />
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-contact-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-email" />
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
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card data-testid="card-step-2">
                <CardHeader>
                  <CardTitle>Coverage Information</CardTitle>
                  <CardDescription>Select your coverage preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="effectiveDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Effective Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-effective-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="policyTerm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy Term (Months)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-policy-term">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="12">12 Months</SelectItem>
                              <SelectItem value="24">24 Months</SelectItem>
                              <SelectItem value="36">36 Months</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="limitOfInsurance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limit of Insurance</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-limit-of-insurance">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1000000">$1,000,000</SelectItem>
                              <SelectItem value="2000000">$2,000,000</SelectItem>
                              <SelectItem value="3000000">$3,000,000</SelectItem>
                              <SelectItem value="5000000">$5,000,000</SelectItem>
                              <SelectItem value="10000000">$10,000,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deductible"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deductible</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-deductible">
                                <SelectValue placeholder="Select deductible" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1000">$1,000</SelectItem>
                              <SelectItem value="2500">$2,500</SelectItem>
                              <SelectItem value="5000">$5,000</SelectItem>
                              <SelectItem value="10000">$10,000</SelectItem>
                              <SelectItem value="25000">$25,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card data-testid="card-step-3">
                <CardHeader>
                  <CardTitle>Business Operations</CardTitle>
                  <CardDescription>Provide details about your business operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentAnnualSales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Annual Sales</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$" data-testid="input-current-annual-sales" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectedAnnualSales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Projected Annual Sales (Next 12 Months)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="$" data-testid="input-projected-annual-sales" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="yearsInBusiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years in Business</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-years-in-business" />
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
                          <FormLabel>Number of Employees</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-number-of-employees" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card data-testid="card-step-4">
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Describe your products and operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productsManufactured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Products Manufactured/Distributed</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} data-testid="input-products-manufactured" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="distributionChannels"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distribution Channels</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} placeholder="Retail, wholesale, online, etc." data-testid="input-distribution-channels" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productTesting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Testing Procedures</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} data-testid="input-product-testing" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualityControl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quality Control Procedures</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} data-testid="input-quality-control" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(productType === "cannabis-hemp" || productType === "cannabis-thc") && (
                    <>
                      <FormField
                        control={form.control}
                        name="thcContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>THC Content Range</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., <0.3%, 5-10%, etc." data-testid="input-thc-content" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cannabisLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State License Information</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-cannabis-license" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="labTesting"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Third-Party Lab Testing</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-lab-testing" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Types</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="Oils, edibles, topicals, flower, etc." data-testid="input-product-types" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {productType === "firearms" && (
                    <>
                      <FormField
                        control={form.control}
                        name="federalLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Firearms License (FFL) Number</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-federal-license" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="firearmsTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Types of Firearms</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="Handguns, rifles, shotguns, etc." data-testid="input-firearms-types" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="backgroundChecks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Background Check Procedures</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-background-checks" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="storageSecurityMeasures"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Storage and Security Measures</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-storage-security" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {productType === "ecig-tobacco" && (
                    <>
                      <FormField
                        control={form.control}
                        name="nicotineContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nicotine Content Range</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 0mg, 3mg, 6mg, etc." data-testid="input-nicotine-content" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productCategories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Categories</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="E-liquids, devices, tobacco products, etc." data-testid="input-product-categories" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="complianceStandards"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compliance Standards</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-compliance-standards" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ageVerification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Verification Process</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-age-verification" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {productType === "machine-shop" && (
                    <>
                      <FormField
                        control={form.control}
                        name="machineTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Types of Machines</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="CNC, lathes, mills, etc." data-testid="input-machine-types" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="materialsWorked"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Materials Worked</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="Steel, aluminum, plastics, etc." data-testid="input-materials-worked" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="toleranceSpecs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tolerance Specifications</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., +/- 0.001 inches" data-testid="input-tolerance-specs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="certifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certifications (ISO, AS9100, etc.)</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-certifications" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {productType === "amusement-device" && (
                    <>
                      <FormField
                        control={form.control}
                        name="deviceTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Types of Amusement Devices</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="Rides, games, inflatables, etc." data-testid="input-device-types" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="safetyInspections"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Safety Inspection Frequency</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Daily, weekly, monthly, etc." data-testid="input-safety-inspections" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maintenanceSchedule"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maintenance Schedule</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-maintenance-schedule" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operatorTraining"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operator Training Program</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-operator-training" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {productType === "discontinued" && (
                    <>
                      <FormField
                        control={form.control}
                        name="discontinuedDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date Products Were Discontinued</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-discontinued-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productsDiscontinued"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products That Were Discontinued</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} data-testid="input-products-discontinued" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="remainingInventory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Remaining Inventory</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} data-testid="input-remaining-inventory" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tailCoverageNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tail Coverage Period Needed</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 5 years, 10 years" data-testid="input-tail-coverage" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 5 && (
              <Card data-testid="card-step-5">
                <CardHeader>
                  <CardTitle>Claims History</CardTitle>
                  <CardDescription>Provide information about past claims</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="anyClaimsHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Product Liability Claims in the Last 5 Years?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-claims-history">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("anyClaimsHistory") === "yes" && (
                    <FormField
                      control={form.control}
                      name="claimsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Claims Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} placeholder="Provide details about each claim including date, amount, and outcome" data-testid="input-claims-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="anyPriorDenials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Prior Denials or Non-Renewals?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-prior-denials">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("anyPriorDenials") === "yes" && (
                    <FormField
                      control={form.control}
                      name="priorDenialsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prior Denials Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} placeholder="Provide details about denials or non-renewals" data-testid="input-prior-denials-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 6 && (
              <Card data-testid="card-step-6">
                <CardHeader>
                  <CardTitle>Review and Submit</CardTitle>
                  <CardDescription>Additional information and final review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Anything else we should know about your operations or coverage needs?" data-testid="input-additional-info" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <h3 className="font-semibold">Application Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Product Type:</span>
                      <span data-testid="text-summary-product-type">{productTypeLabel}</span>
                      
                      <span className="text-muted-foreground">Named Insured:</span>
                      <span data-testid="text-summary-named-insured">{form.watch("namedInsured") || "—"}</span>
                      
                      <span className="text-muted-foreground">Email:</span>
                      <span data-testid="text-summary-email">{form.watch("email") || "—"}</span>
                      
                      <span className="text-muted-foreground">Effective Date:</span>
                      <span data-testid="text-summary-effective-date">{form.watch("effectiveDate") || "—"}</span>
                      
                      <span className="text-muted-foreground">Limit of Insurance:</span>
                      <span data-testid="text-summary-limit">
                        {form.watch("limitOfInsurance") ? `$${parseInt(form.watch("limitOfInsurance")).toLocaleString()}` : "—"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between gap-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  data-testid="button-previous"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto"
                  data-testid="button-next"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={createQuoteMutation.isPending}
                  className="ml-auto"
                  data-testid="button-submit"
                >
                  {createQuoteMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
