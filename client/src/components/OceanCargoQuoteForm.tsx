import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Applicant Information
  applicantName: z.string().min(1, "Applicant name is required"),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  descriptionOfOperations: z.string().min(1, "Description of operations is required"),
  website: z.string().optional(),
  hadCancellationOrBankruptcy: z.boolean(),
  proposedEffectiveDate: z.string().min(1, "Effective date is required"),
  agentBrokerName: z.string().optional(),
  currentlyControl: z.boolean(),
  currentInsurer: z.string().optional(),
  reasonForMarketing: z.string().optional(),
  
  // Contact Information
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  
  // International Transit - Imports
  importCommodity1: z.string().optional(),
  importCountry1: z.string().optional(),
  importAirPercent1: z.string().optional(),
  importOceanPercent1: z.string().optional(),
  
  importCommodity2: z.string().optional(),
  importCountry2: z.string().optional(),
  importAirPercent2: z.string().optional(),
  importOceanPercent2: z.string().optional(),
  
  importCommodity3: z.string().optional(),
  importCountry3: z.string().optional(),
  importAirPercent3: z.string().optional(),
  importOceanPercent3: z.string().optional(),
  
  // International Transit - Exports
  exportCommodity1: z.string().optional(),
  exportCountry1: z.string().optional(),
  exportAirPercent1: z.string().optional(),
  exportOceanPercent1: z.string().optional(),
  
  exportCommodity2: z.string().optional(),
  exportCountry2: z.string().optional(),
  exportAirPercent2: z.string().optional(),
  exportOceanPercent2: z.string().optional(),
  
  exportCommodity3: z.string().optional(),
  exportCountry3: z.string().optional(),
  exportAirPercent3: z.string().optional(),
  exportOceanPercent3: z.string().optional(),
  
  // Annual Volume
  importAnnualVolume: z.string().optional(),
  exportAnnualVolume: z.string().optional(),
  importResponsiblePercent: z.string().optional(),
  exportResponsiblePercent: z.string().optional(),
  importAirShippedPercent: z.string().optional(),
  exportAirShippedPercent: z.string().optional(),
  importOceanShippedPercent: z.string().optional(),
  exportOceanShippedPercent: z.string().optional(),
  importTruckShippedPercent: z.string().optional(),
  exportTruckShippedPercent: z.string().optional(),
  
  importAirAverage: z.string().optional(),
  exportAirAverage: z.string().optional(),
  importAirMaximum: z.string().optional(),
  exportAirMaximum: z.string().optional(),
  
  importOceanContainerAverage: z.string().optional(),
  exportOceanContainerAverage: z.string().optional(),
  importOceanContainerMaximum: z.string().optional(),
  exportOceanContainerMaximum: z.string().optional(),
  importOceanConveyanceMaximum: z.string().optional(),
  exportOceanConveyanceMaximum: z.string().optional(),
  
  // Shipping Methods
  importDoorToDoorPercent: z.string().optional(),
  exportDoorToDoorPercent: z.string().optional(),
  importConsolidatedPercent: z.string().optional(),
  exportConsolidatedPercent: z.string().optional(),
  importRefrigeratedOceanPercent: z.string().optional(),
  exportRefrigeratedOceanPercent: z.string().optional(),
  importBulkPercent: z.string().optional(),
  exportBulkPercent: z.string().optional(),
  importBreakBulkPercent: z.string().optional(),
  exportBreakBulkPercent: z.string().optional(),
  importRefrigeratedAirPercent: z.string().optional(),
  exportRefrigeratedAirPercent: z.string().optional(),
  
  // Packing Description
  importPackingDescription: z.string().optional(),
  exportPackingDescription: z.string().optional(),
  
  // Valuation
  valuationCIFPercentage: z.string().optional(),
  valuationOther: z.string().optional(),
  
  // Coverage Details
  vesselLimit: z.string().min(1, "Vessel limit is required"),
  aircraftLimit: z.string().min(1, "Aircraft limit is required"),
  deductible: z.string().min(1, "Deductible is required"),
  grossSales: z.string().min(1, "Gross sales is required"),
  
  // Optional Coverages
  inlandTransit: z.boolean(),
  exhibitions: z.boolean(),
  exhibitionLimit: z.string().optional(),
  exhibitionNumber: z.string().optional(),
  salespersonsSamples: z.boolean(),
  samplesLimit: z.string().optional(),
  salesPersonsNumber: z.string().optional(),
  storageProcessing: z.boolean(),
  war: z.boolean(),
  
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function OceanCargoQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hadCancellationOrBankruptcy: false,
      currentlyControl: false,
      inlandTransit: false,
      exhibitions: false,
      salespersonsSamples: false,
      storageProcessing: false,
      war: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/ocean-cargo-quotes", {
        applicantName: data.applicantName,
        email: data.email,
        phone: data.phone,
        effectiveDate: data.proposedEffectiveDate,
        vesselLimit: data.vesselLimit,
        aircraftLimit: data.aircraftLimit,
        optionalCoverages: [
          data.inlandTransit && "Inland Transit",
          data.exhibitions && "Exhibitions",
          data.salespersonsSamples && "Salespersons Samples",
          data.storageProcessing && "Storage/Processing",
          data.war && "War"
        ].filter(Boolean),
        status: "pending",
        payload: data,
      });
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/ocean-cargo-quotes"] });
      setReferenceNumber(response.referenceNumber);
      setSubmitted(true);
      toast({
        title: "Quote request submitted!",
        description: `Reference number: ${response.referenceNumber}`,
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
          <h3 className="text-2xl font-bold mb-4">Ocean Cargo Quote Request Submitted!</h3>
          {referenceNumber && (
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Your Reference Number</p>
              <p className="text-2xl font-mono font-bold text-primary" data-testid="text-reference-number">
                {referenceNumber}
              </p>
            </div>
          )}
          <p className="text-muted-foreground mb-6">
            Thank you for your Ocean Cargo insurance quote request. Our underwriting team will review your information and contact you within 24-48 hours. Please save your reference number for tracking purposes.
          </p>
          <Button onClick={() => { setSubmitted(false); setReferenceNumber(null); setCurrentStep(1); form.reset(); }} data-testid="button-submit-another">
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
            <CardTitle>Ocean Cargo Insurance Application - Step {currentStep} of 4</CardTitle>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${s <= currentStep ? 'bg-primary' : 'bg-muted'}`}
                  data-testid={`progress-step-${s}`}
                />
              ))}
            </div>
          </CardHeader>

          {/* Step 1: Applicant Information */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="applicantName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Name of Applicant *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-applicant-name" />
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
                            <Input {...field} data-testid="input-mailing-address" />
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
                            <Input type="number" {...field} data-testid="input-years-business" />
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
                            <Input {...field} placeholder="https://" data-testid="input-website" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="descriptionOfOperations"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description of Operations *</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} data-testid="textarea-operations" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="proposedEffectiveDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed Effective Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-effective-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="grossSales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gross Sales *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-gross-sales" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Insurance History</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hadCancellationOrBankruptcy"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-cancellation"
                            />
                          </FormControl>
                          <FormLabel>Had Ocean Cargo policy cancelled or filed for Bankruptcy in past 5 years?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentInsurer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Insurer</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-current-insurer" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reasonForMarketing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Marketing</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-reason-marketing" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-contact-name" />
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
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: International Transit - Shipments */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipments to be Insured - Imports</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`importCommodity${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Commodity {num}</FormLabel>
                              <FormControl>
                                <Input 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-import-commodity-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`importCountry${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-import-country-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`importAirPercent${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Air</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-import-air-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`importOceanPercent${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Ocean</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-import-ocean-${num}`} 
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
                  <h3 className="text-lg font-semibold mb-4">Shipments to be Insured - Exports</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`exportCommodity${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Commodity {num}</FormLabel>
                              <FormControl>
                                <Input 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-export-commodity-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`exportCountry${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-export-country-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`exportAirPercent${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Air</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-export-air-${num}`} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`exportOceanPercent${num}` as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Ocean</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  value={field.value as string || ""} 
                                  onChange={field.onChange}
                                  data-testid={`input-export-ocean-${num}`} 
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
                  <h3 className="text-lg font-semibold mb-4">Annual Volume Shipped</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Imports</h4>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="importAnnualVolume"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Volume</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} data-testid="input-import-volume" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="importResponsiblePercent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Applicant Responsible to Insure</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} data-testid="input-import-responsible" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Exports</h4>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="exportAnnualVolume"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Volume</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} data-testid="input-export-volume" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="exportResponsiblePercent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>% Applicant Responsible to Insure</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} data-testid="input-export-responsible" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Coverage Details & Shipping Methods */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Requested Coverage Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="vesselLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vessel Limit *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-vessel-limit" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aircraftLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aircraft Limit *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-aircraft-limit" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deductible"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deductible *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-deductible" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Packing Description</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="importPackingDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Imports Packing</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} placeholder="e.g. Shrink Wrapped, Pallets, Cartons, temperature controlled" data-testid="textarea-import-packing" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="exportPackingDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exports Packing</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} placeholder="e.g. Shrink Wrapped, Pallets, Cartons, temperature controlled" data-testid="textarea-export-packing" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Valuation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="valuationCIFPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost, Insurance and Freight + %</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} data-testid="input-cif-percentage" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="valuationOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Valuation (Please explain)</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-valuation-other" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Optional Coverages & Review */}
          {currentStep === 4 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Optional Coverage Desired</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="inlandTransit"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-inland-transit"
                            />
                          </FormControl>
                          <FormLabel>Inland Transit</FormLabel>
                        </FormItem>
                      )}
                    />

                    <div className="ml-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="exhibitions"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-exhibitions"
                              />
                            </FormControl>
                            <FormLabel>Exhibitions</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch("exhibitions") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                          <FormField
                            control={form.control}
                            name="exhibitionLimit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Exhibition Limit</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} data-testid="input-exhibition-limit" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="exhibitionNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Exhibitions</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} data-testid="input-exhibition-number" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="salespersonsSamples"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-samples"
                              />
                            </FormControl>
                            <FormLabel>Salespersons Samples</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch("salespersonsSamples") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                          <FormField
                            control={form.control}
                            name="samplesLimit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Samples Limit</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} data-testid="input-samples-limit" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="salesPersonsNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Sales Persons</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} data-testid="input-salespersons-number" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="storageProcessing"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-storage"
                            />
                          </FormControl>
                          <FormLabel>Storage or Processing</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="war"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-war"
                            />
                          </FormControl>
                          <FormLabel>War Coverage</FormLabel>
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
                          <Textarea {...field} rows={4} placeholder="Any additional information about your cargo shipping operations..." data-testid="textarea-additional-info" />
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
                    before providing a formal quote.
                  </p>
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

            {currentStep < 4 ? (
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
