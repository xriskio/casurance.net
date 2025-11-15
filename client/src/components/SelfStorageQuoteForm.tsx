import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Basic Information
  effectiveDate: z.string().min(1, "Effective date is required"),
  namedInsured: z.string().min(1, "Named insured is required"),
  lossControlContact: z.string().min(1, "Loss control contact is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  tradeName: z.string().optional(),
  hadBankruptcy: z.boolean(),
  hadCancellation: z.boolean(),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  yearsCurrentOwnership: z.string().min(1, "Years under current ownership is required"),
  managerOnPremises: z.boolean(),
  ownerAsManager: z.boolean(),
  
  // Additional Interest
  additionalInterest: z.string().optional(),
  
  // Liability Coverages
  generalLiabilityLimit: z.string().min(1, "General liability limit is required"),
  totalGrossSales: z.string().min(1, "Total gross sales is required"),
  customerGoodsLimit: z.string().optional(),
  customerGoodsDeductible: z.string().optional(),
  saleDisposalLimit: z.string().optional(),
  saleDisposalDeductible: z.string().optional(),
  residentManagerLiability: z.boolean(),
  otherLiabilityCoverages: z.string().optional(),
  
  // Hired Non-Owned
  hiredNonOwnedLiability: z.boolean(),
  numberOfEmployees: z.string().optional(),
  hasBusinessAutoPolicy: z.boolean(),
  ownsBusinessVehicles: z.boolean(),
  collectsMVRsPriorEmployment: z.boolean(),
  collectsMVRsYearly: z.boolean(),
  requiresStateMinimumInsurance: z.boolean(),
  securesEvidenceOfInsurance: z.boolean(),
  
  // Sale & Disposal
  hasWrittenProcedures: z.boolean(),
  stateLienLaw: z.string().optional(),
  numberSalesLast12Months: z.string().optional(),
  totalRecoveredFromSales: z.string().optional(),
  hasClaimsFromSales: z.boolean(),
  
  // Location 1
  location1Address: z.string().optional(),
  location1BuildingCoverage: z.string().optional(),
  location1Buildings: z.string().optional(),
  location1PersonalProperty: z.string().optional(),
  location1BusinessIncome: z.string().optional(),
  location1StorageUnits: z.string().optional(),
  location1Occupancy: z.string().optional(),
  location1YearBuilt: z.string().optional(),
  location1DistanceBetween: z.string().optional(),
  location1SquareFeet: z.string().optional(),
  location1Stories: z.string().optional(),
  location1Construction: z.string().optional(),
  location1RoofMaterial: z.string().optional(),
  location1Sprinkler: z.string().optional(),
  location1Alarm: z.string().optional(),
  location1ClimateControlled: z.boolean(),
  
  // Operations
  rentalOfficeOnPremises: z.boolean(),
  officeAddress: z.string().optional(),
  originallyDesignedForStorage: z.boolean(),
  originalDesignPurpose: z.string().optional(),
  buildingsNotSelfStorage: z.boolean(),
  nonStorageDetails: z.string().optional(),
  nonStorageOperations: z.boolean(),
  nonStorageOperationsDetails: z.string().optional(),
  habitationalExposures: z.boolean(),
  habitationalDetails: z.string().optional(),
  otherBusinessActivities: z.boolean(),
  otherActivitiesDetails: z.string().optional(),
  truckTrailerRentals: z.boolean(),
  rentalCompanyName: z.string().optional(),
  movingServices: z.boolean(),
  
  // Indoor Storage
  indoorRVStorage: z.boolean(),
  indoorStorageUnits: z.string().optional(),
  indoorStoragePercent: z.string().optional(),
  ownersHaveInsurance: z.boolean(),
  specialVehicles: z.boolean(),
  fuelStoredInside: z.boolean(),
  batteriesDisconnected: z.boolean(),
  
  // Outdoor Storage
  outdoorRVStorage: z.boolean(),
  outdoorSpaces: z.string().optional(),
  outdoorStoragePercent: z.string().optional(),
  
  // Additional Services
  carWashes: z.boolean(),
  recordsStorage: z.boolean(),
  auctionsOnSite: z.boolean(),
  auctionFrequency: z.string().optional(),
  mobileContainers: z.boolean(),
  cellTowers: z.boolean(),
  forkliftsLoaders: z.boolean(),
  elevatorsLifts: z.boolean(),
  
  // Security & Keys
  padlocksSold: z.boolean(),
  duplicateKeysRetained: z.boolean(),
  keyRetainer: z.string().optional(),
  keyAccess: z.string().optional(),
  keyStorage: z.string().optional(),
  
  // Security Measures
  positiveIDRequired: z.boolean(),
  backgroundChecks: z.boolean(),
  premisesPatrolled: z.boolean(),
  patrolledBy: z.string().optional(),
  armedSecurity: z.boolean(),
  securityDogs: z.boolean(),
  fullyLitNight: z.boolean(),
  fullyFenced: z.boolean(),
  controlledGateAccess: z.boolean(),
  surveillanceCameras: z.boolean(),
  individualDoorAlarms: z.boolean(),
  
  // Lease Agreement
  hasHoldHarmless: z.boolean(),
  prohibitsHazardous: z.boolean(),
  prohibitsOperationsLiving: z.boolean(),
  
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SelfStorageQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hadBankruptcy: false,
      hadCancellation: false,
      managerOnPremises: false,
      ownerAsManager: false,
      residentManagerLiability: false,
      hiredNonOwnedLiability: false,
      hasBusinessAutoPolicy: false,
      ownsBusinessVehicles: false,
      collectsMVRsPriorEmployment: false,
      collectsMVRsYearly: false,
      requiresStateMinimumInsurance: false,
      securesEvidenceOfInsurance: false,
      hasWrittenProcedures: false,
      hasClaimsFromSales: false,
      location1ClimateControlled: false,
      rentalOfficeOnPremises: true,
      originallyDesignedForStorage: true,
      buildingsNotSelfStorage: false,
      nonStorageOperations: false,
      habitationalExposures: false,
      otherBusinessActivities: false,
      truckTrailerRentals: false,
      movingServices: false,
      indoorRVStorage: false,
      ownersHaveInsurance: false,
      specialVehicles: false,
      fuelStoredInside: false,
      batteriesDisconnected: false,
      outdoorRVStorage: false,
      carWashes: false,
      recordsStorage: false,
      auctionsOnSite: false,
      mobileContainers: false,
      cellTowers: false,
      forkliftsLoaders: false,
      elevatorsLifts: false,
      padlocksSold: false,
      duplicateKeysRetained: false,
      positiveIDRequired: true,
      backgroundChecks: true,
      premisesPatrolled: false,
      armedSecurity: false,
      securityDogs: false,
      fullyLitNight: true,
      fullyFenced: true,
      controlledGateAccess: true,
      surveillanceCameras: true,
      individualDoorAlarms: false,
      hasHoldHarmless: true,
      prohibitsHazardous: true,
      prohibitsOperationsLiving: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/self-storage-quotes", {
        namedInsured: data.namedInsured,
        email: data.email,
        phone: data.phone,
        effectiveDate: data.effectiveDate,
        totalLocations: "1",
        generalLiabilityLimit: data.generalLiabilityLimit,
        totalGrossSales: data.totalGrossSales,
        status: "pending",
        payload: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/self-storage-quotes"] });
      setSubmitted(true);
      toast({
        title: "Quote request submitted!",
        description: "We'll review your information and contact you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting quote",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Self Storage Quote Request Submitted!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your Self Storage insurance quote request. Our underwriting team will review your information and contact you within 24-48 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setCurrentStep(1); form.reset(); }} data-testid="button-submit-another">
            Submit Another Quote Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Self-Storage Insurance Application - Step {currentStep} of 5</CardTitle>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${s <= currentStep ? 'bg-primary' : 'bg-muted'}`}
                  data-testid={`progress-step-${s}`}
                />
              ))}
            </div>
          </CardHeader>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="effectiveDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-effective-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="namedInsured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Named Insured *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-named-insured" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tradeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trade Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-trade-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lossControlContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loss Control Contact Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-loss-control-contact" />
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
                          <Input type="tel" {...field} data-testid="input-phone" />
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
                          <Input type="email" {...field} data-testid="input-email" />
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
                        <FormLabel>Years in Self-Storage Business *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-years-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsCurrentOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years Under Current Ownership *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-years-ownership" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="hadBankruptcy"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-bankruptcy"
                          />
                        </FormControl>
                        <FormLabel>Has the applicant, a majority owner, or member filed for bankruptcy in the past 5 years?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hadCancellation"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-cancellation"
                          />
                        </FormControl>
                        <FormLabel>Has any policy or coverage been declined, cancelled or non-renewed during the prior 3 years?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="managerOnPremises"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-manager-premises"
                          />
                        </FormControl>
                        <FormLabel>Does the manager reside on premises?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownerAsManager"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-owner-manager"
                          />
                        </FormControl>
                        <FormLabel>Does owner act as manager?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="additionalInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Interest (Loss Payee, Mortgagee, Additional Insured)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} placeholder="Name & Address" data-testid="textarea-additional-interest" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 2: Liability Coverages */}
          {currentStep === 2 && (
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Liability Coverages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="generalLiabilityLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>General Liability Limit *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $1,000,000" {...field} data-testid="input-gl-limit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalGrossSales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Gross Sales *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} data-testid="input-gross-sales" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerGoodsLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Goods Legal Liability Limit</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $50,000, $100,000, $250,000" {...field} data-testid="input-customer-goods-limit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerGoodsDeductible"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Goods Deductible</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} data-testid="input-customer-goods-deductible" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saleDisposalLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale and Disposal Liability Limit</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $10,000, $25,000, $50,000" {...field} data-testid="input-sale-disposal-limit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saleDisposalDeductible"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale and Disposal Deductible</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} data-testid="input-sale-disposal-deductible" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="residentManagerLiability"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-resident-manager"
                          />
                        </FormControl>
                        <FormLabel>Resident Manager Liability</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="otherLiabilityCoverages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Liability Coverages</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Specify any other coverages" data-testid="input-other-coverages" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Hired Non-Owned Liability</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hiredNonOwnedLiability"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-hired-non-owned"
                          />
                        </FormControl>
                        <FormLabel>Hired Non-Owned Liability Requested</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("hiredNonOwnedLiability") && (
                    <FormField
                      control={form.control}
                      name="numberOfEmployees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Employees</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} data-testid="input-num-employees" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasBusinessAutoPolicy"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-business-auto"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant have a Business Auto Policy?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownsBusinessVehicles"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-owns-vehicles"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant own any vehicles used for business purposes?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collectsMVRsPriorEmployment"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-mvr-prior"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant collect MVRs for employees prior to employment?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collectsMVRsYearly"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-mvr-yearly"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant continue to collect MVRs on a yearly basis during employment?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiresStateMinimumInsurance"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-state-minimum"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant require employees to maintain at least state minimum auto insurance limits?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securesEvidenceOfInsurance"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-evidence-insurance"
                          />
                        </FormControl>
                        <FormLabel>Does the applicant secure evidence from all drivers of personal auto liability insurance who use their personal vehicle for business use?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Sale & Disposal Liability</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hasWrittenProcedures"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-written-procedures"
                          />
                        </FormControl>
                        <FormLabel>Are written procedures in place for reclaiming space?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stateLienLaw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What state lien law is followed?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. California" data-testid="input-state-lien" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberSalesLast12Months"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of sales of individual tenant's property occurring within the past 12 months</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-sales-12months" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalRecoveredFromSales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What was the total recovered from these sales?</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="0" data-testid="input-total-recovered" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasClaimsFromSales"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-claims-sales"
                          />
                        </FormControl>
                        <FormLabel>Have there been any claims or court actions in the past 3 years by tenants claiming damage as a result of sale and disposal of their property?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 3: Location Information */}
          {currentStep === 3 && (
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Location Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If there are multiple buildings at any location or more than three locations, please provide a Statement of Values or completed Property Accord.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location1Address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location Address</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-location-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1BuildingCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Blanket Building Coverage</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} data-testid="input-building-coverage" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Buildings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Number of Buildings</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-num-buildings" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1PersonalProperty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Property Limit</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} data-testid="input-personal-property" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1BusinessIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Income and Rental Limit</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} data-testid="input-business-income" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1StorageUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Storage Units</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-storage-units" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Occupancy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupancy Rate (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0-100" {...field} data-testid="input-occupancy" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1YearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-year-built" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1DistanceBetween"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance Between Buildings (ft)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-distance-between" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1SquareFeet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Square Feet</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-square-feet" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Stories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Stories</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} data-testid="input-stories" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Construction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Construction Type</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Frame, Masonry, Steel" data-testid="input-construction-type" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1RoofMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roof Material</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Metal, Raised Seam Metal, Asphalt, TPO, Shingle" data-testid="input-roof-material" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Sprinkler"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sprinkler System / % Protected</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Yes - 100%" data-testid="input-sprinkler" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location1Alarm"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Alarm System (1. C/S fire & burglary, 2. C/S fire only, 3. C/S burglary only, 4. local 5. none)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. 1" data-testid="input-alarm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="location1ClimateControlled"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-climate-controlled"
                          />
                        </FormControl>
                        <FormLabel>Climate Controlled Storage?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 4: Operations */}
          {currentStep === 4 && (
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Self-Storage Operations</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rentalOfficeOnPremises"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-office-premises"
                          />
                        </FormControl>
                        <FormLabel>Is the rental office on premises?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {!form.watch("rentalOfficeOnPremises") && (
                    <FormField
                      control={form.control}
                      name="officeAddress"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Office Physical Address</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-office-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="originallyDesignedForStorage"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-designed-storage"
                          />
                        </FormControl>
                        <FormLabel>Was facility originally designed for self-storage?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {!form.watch("originallyDesignedForStorage") && (
                    <FormField
                      control={form.control}
                      name="originalDesignPurpose"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>What was facility originally designed for?</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-original-purpose" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="buildingsNotSelfStorage"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-buildings-not-storage"
                          />
                        </FormControl>
                        <FormLabel>Are there any buildings not occupied as self-storage?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("buildingsNotSelfStorage") && (
                    <FormField
                      control={form.control}
                      name="nonStorageDetails"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Provide location and/or building # and occupancy</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} data-testid="textarea-non-storage-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="nonStorageOperations"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-non-storage-ops"
                          />
                        </FormControl>
                        <FormLabel>Are any tenants conducting non-storage operations on the premises?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("nonStorageOperations") && (
                    <FormField
                      control={form.control}
                      name="nonStorageOperationsDetails"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Describe the specific occupancy including the building where the operations are located and square footage</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} data-testid="textarea-non-storage-ops-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="habitationalExposures"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-habitational"
                          />
                        </FormControl>
                        <FormLabel>Are there any habitational exposures?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("habitationalExposures") && (
                    <FormField
                      control={form.control}
                      name="habitationalDetails"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Provide the type of structure, who occupies, and square footage</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} data-testid="textarea-habitational-details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="otherBusinessActivities"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-other-activities"
                          />
                        </FormControl>
                        <FormLabel>Does the insured have any business activities other than self-storage operations occurring on the premises?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("otherBusinessActivities") && (
                    <FormField
                      control={form.control}
                      name="otherActivitiesDetails"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Please explain</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} data-testid="textarea-other-activities" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="truckTrailerRentals"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-truck-rentals"
                          />
                        </FormControl>
                        <FormLabel>Are there truck/trailer rentals?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("truckTrailerRentals") && (
                    <FormField
                      control={form.control}
                      name="rentalCompanyName"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>Name of the company providing such rentals</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-rental-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="movingServices"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-moving-services"
                          />
                        </FormControl>
                        <FormLabel>Are there any moving services provided?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="indoorRVStorage"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-indoor-rv"
                          />
                        </FormControl>
                        <FormLabel>Is there any indoor storage of RVs, Watercraft, or Vehicles?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("indoorRVStorage") && (
                    <div className="ml-6 space-y-3">
                      <FormField
                        control={form.control}
                        name="indoorStorageUnits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How many units total of indoor storage?</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-indoor-units" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="indoorStoragePercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What is the % of Gross Sales from indoor storage?</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-indoor-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ownersHaveInsurance"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-owners-insurance"
                              />
                            </FormControl>
                            <FormLabel>Do the owners of the RV, Watercraft, Vehicles have sufficient insurance? ($500k or higher liability limits & Other than Collision Coverage with facility owner as AI)</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialVehicles"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-special-vehicles"
                              />
                            </FormControl>
                            <FormLabel>Are there any electric vehicles, antique vehicles, or special vehicles stored? (ATV, Motorcycles, etc.)</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch("specialVehicles") && (
                        <div className="ml-6 space-y-2">
                          <FormField
                            control={form.control}
                            name="fuelStoredInside"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    data-testid="checkbox-fuel-inside"
                                  />
                                </FormControl>
                                <FormLabel>Is fuel stored inside the unit?</FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="batteriesDisconnected"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    data-testid="checkbox-batteries-disconnected"
                                  />
                                </FormControl>
                                <FormLabel>Are batteries disconnected when stored in the unit?</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="outdoorRVStorage"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-outdoor-rv"
                          />
                        </FormControl>
                        <FormLabel>Is there any outdoor storage of RVs, Watercraft, or Vehicles?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("outdoorRVStorage") && (
                    <div className="ml-6 space-y-3">
                      <FormField
                        control={form.control}
                        name="outdoorSpaces"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What is the total number of open lot spaces at the facility?</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-outdoor-spaces" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="outdoorStoragePercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What is the % of Gross Sales from outdoor storage?</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-outdoor-percent" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <FormField
                      control={form.control}
                      name="carWashes"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-car-washes"
                            />
                          </FormControl>
                          <FormLabel>Are there car washes?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recordsStorage"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-records-storage"
                            />
                          </FormControl>
                          <FormLabel>Are there any records storage/management or valuable items storage?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobileContainers"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-mobile-containers"
                            />
                          </FormControl>
                          <FormLabel>Are there any mobile storage containers?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cellTowers"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-cell-towers"
                            />
                          </FormControl>
                          <FormLabel>Are there any cell towers on premises?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="forkliftsLoaders"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-forklifts"
                            />
                          </FormControl>
                          <FormLabel>Are forklifts or loaders used?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="elevatorsLifts"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-elevators"
                            />
                          </FormControl>
                          <FormLabel>Are elevators or lifts used?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="auctionsOnSite"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-auctions"
                          />
                        </FormControl>
                        <FormLabel>Do any auctions of units take place at the facility?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("auctionsOnSite") && (
                    <FormField
                      control={form.control}
                      name="auctionFrequency"
                      render={({ field }) => (
                        <FormItem className="ml-6">
                          <FormLabel>How often do they occur?</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Monthly, Quarterly" data-testid="input-auction-frequency" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 5: Security & Lease Agreement */}
          {currentStep === 5 && (
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Keys & Access Control</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="padlocksSold"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-padlocks"
                          />
                        </FormControl>
                        <FormLabel>Are padlocks sold at the rental office?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duplicateKeysRetained"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-duplicate-keys"
                          />
                        </FormControl>
                        <FormLabel>Are duplicate keys retained?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("duplicateKeysRetained") && (
                    <div className="ml-6 space-y-3">
                      <FormField
                        control={form.control}
                        name="keyRetainer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Who retains the duplicate keys?</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-key-retainer" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="keyAccess"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Who has access to the duplicate keys?</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-key-access" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="keyStorage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Where are the duplicate keys kept?</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-key-storage" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Security Measures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="positiveIDRequired"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-positive-id"
                          />
                        </FormControl>
                        <FormLabel>Is a positive ID required when leasing?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="backgroundChecks"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-background-checks"
                          />
                        </FormControl>
                        <FormLabel>Are background checks performed for employees and the manager?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="premisesPatrolled"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-patrolled"
                          />
                        </FormControl>
                        <FormLabel>Are the premises patrolled?</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("premisesPatrolled") && (
                    <FormField
                      control={form.control}
                      name="patrolledBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>By whom?</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-patrolled-by" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="armedSecurity"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-armed-security"
                          />
                        </FormControl>
                        <FormLabel>Are there any armed security personnel?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityDogs"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-security-dogs"
                          />
                        </FormControl>
                        <FormLabel>Are security dogs used?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullyLitNight"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-lit-night"
                          />
                        </FormControl>
                        <FormLabel>Are the premises fully lighted at night?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullyFenced"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-fenced"
                          />
                        </FormControl>
                        <FormLabel>Is the complex fully fenced or enclosed?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="controlledGateAccess"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-gate-access"
                          />
                        </FormControl>
                        <FormLabel>Is there a controlled gate access system?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surveillanceCameras"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-cameras"
                          />
                        </FormControl>
                        <FormLabel>Are there surveillance cameras and monitors?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="individualDoorAlarms"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-door-alarms"
                          />
                        </FormControl>
                        <FormLabel>Are there individual door alarms?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Lease Agreement</h3>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="hasHoldHarmless"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-hold-harmless"
                          />
                        </FormControl>
                        <FormLabel>Does the lease agreement include a Hold Harmless Agreement?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prohibitsHazardous"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-prohibits-hazardous"
                          />
                        </FormControl>
                        <FormLabel>Does the lease prohibit storage of hazardous and/or flammable items?</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prohibitsOperationsLiving"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-prohibits-living"
                          />
                        </FormControl>
                        <FormLabel>Does the lease prohibit conducting operations or living in storage units?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments or Information</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} placeholder="Any additional information about your self-storage facility..." data-testid="textarea-additional-info" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>Note:</strong> Submission of this quote request does not bind coverage. 
                  Our underwriting team will review your information and may request additional documentation 
                  (such as a Statement of Values or completed Property Accord 125) before providing a formal quote.
                </p>
              </div>
            </CardContent>
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

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                data-testid="button-next"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={mutation.isPending}
                data-testid="button-submit"
              >
                {mutation.isPending ? "Submitting..." : "Submit Quote Request"}
              </Button>
            )}
          </div>
        </Card>
      </form>
    </Form>
  );
}
