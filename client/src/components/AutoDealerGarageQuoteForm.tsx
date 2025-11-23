import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { insertAutoDealerGarageQuoteSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const formSchema = insertAutoDealerGarageQuoteSchema.extend({
  applicantName: z.string().min(1, "Applicant name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  effectiveDate: z.string().min(1, "Effective date is required"),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  businessType: z.string().min(1, "Business type is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  operationType: z.enum(["dealer", "service", "mixed"]),
});

interface AutoDealerGarageQuoteFormProps {
  onSuccess?: () => void;
}

export default function AutoDealerGarageQuoteForm({ onSuccess }: AutoDealerGarageQuoteFormProps) {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const totalSteps = 8;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false,
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      effectiveDate: "",
      mailingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      businessType: "",
      yearsInBusiness: "",
      numberOfLocations: "",
      operationType: "dealer",
      dealershipType: "",
      numberOfDealerPlates: "",
      payload: {},
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const formData = { ...form.getValues() };
      return await apiRequest("POST", "/api/auto-dealer-garage-quotes", {
        ...values,
        payload: formData,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We've received your Auto Dealer/Garage insurance quote request. Our team will review and contact you shortly.",
      });
      form.reset();
      setStep(1);
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitMutation.mutate(values);
  };

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getFieldsForStep = (currentStep: number): string[] => {
    switch (currentStep) {
      case 1:
        return ["applicantName", "email", "phone", "effectiveDate", "businessType", "operationType"];
      case 2:
        return ["mailingAddress", "city", "state", "zipCode", "yearsInBusiness", "numberOfLocations"];
      default:
        return [];
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > index + 1 ? "bg-primary text-primary-foreground" : step === index + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-12 h-0.5 ${step > index + 1 ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6" key="step-1">
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
        <CardDescription>Please provide basic information about your business</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="applicantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Applicant (include DBA) *</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-applicant-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant is *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-business-type">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="joint-venture">Joint Venture</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} data-testid="input-phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="effectiveDate"
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
          name="operationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Operations *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2" data-testid="radiogroup-operation-type">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dealer" id="dealer" data-testid="radio-dealer" />
                    <label htmlFor="dealer" className="text-sm font-medium cursor-pointer">
                      Auto Dealer (New/Used Car Dealer)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" data-testid="radio-service" />
                    <label htmlFor="service" className="text-sm font-medium cursor-pointer">
                      Garage/Service Operations (Body Shop, Repair Shop, Service Center)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="mixed" data-testid="radio-mixed" />
                    <label htmlFor="mixed" className="text-sm font-medium cursor-pointer">
                      Mixed Operations (Dealer + Service/Repair)
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6" key="step-2">
      <CardHeader>
        <CardTitle>Business Location & Experience</CardTitle>
        <CardDescription>Tell us about your business location and history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="mailingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mailing Address *</FormLabel>
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
                <FormLabel>City *</FormLabel>
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
                <FormLabel>State *</FormLabel>
                <FormControl>
                  <Input {...field} data-testid="input-state" maxLength={2} />
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
                  <Input {...field} data-testid="input-zip-code" maxLength={10} />
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
                <FormLabel>Number of Years in Business *</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    data-testid="input-years-in-business" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfLocations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Locations</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    data-testid="input-number-of-locations" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </div>
  );

  const operationType = form.watch("operationType");

  const renderStep3 = () => {
    const isDealer = operationType === "dealer" || operationType === "mixed";
    return (
      <div className="space-y-6" key="step-3">
        <CardHeader>
          <CardTitle>{isDealer ? "Dealer Operations" : "Service Operations"}</CardTitle>
          <CardDescription>
            {isDealer ? "Provide details about your dealership operations" : "Provide details about your service and repair operations"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDealer && (
            <>
              <FormField
                control={form.control}
                name="dealershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealership Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value || ""} className="flex flex-col space-y-2" data-testid="radiogroup-dealership-type">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="franchised" id="franchised" data-testid="radio-franchised" />
                          <label htmlFor="franchised" className="text-sm font-medium cursor-pointer">
                            New Auto / Franchised Dealership
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-franchised" id="non-franchised" data-testid="radio-non-franchised" />
                          <label htmlFor="non-franchised" className="text-sm font-medium cursor-pointer">
                            Non-Franchised / Used Car Dealership
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfDealerPlates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Dealer Plates</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        data-testid="input-dealer-plates" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="space-y-3">
            <FormLabel>Description of Operations *</FormLabel>
            <Textarea placeholder="Describe your business operations in detail" className="min-h-[100px]" data-testid="textarea-operations-description" />
          </div>
        </CardContent>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6" key="step-4">
      <CardHeader>
        <CardTitle>Vehicle Types Sold/Repaired</CardTitle>
        <CardDescription>Indicate percentage of the following type of autos sold or repaired</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Private Passenger Vehicles</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-passenger-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-passenger-repair" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Light & Medium Trucks</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-truck-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-truck-repair" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Heavy Trucks (over 26,000 GVW)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-heavy-truck-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-heavy-truck-repair" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Motorcycles</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-motorcycle-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-motorcycle-repair" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">RVs / Motor Coaches</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-rv-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-rv-repair" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Other Vehicles</label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Sales %" type="number" min="0" max="100" data-testid="input-other-sales" />
              <Input placeholder="Repair %" type="number" min="0" max="100" data-testid="input-other-repair" />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Note: Heavy trucks, motorcycles, boats, buses, and specialty vehicles may require supplemental applications
        </p>
      </CardContent>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6" key="step-5">
      <CardHeader>
        <CardTitle>Underwriting Information</CardTitle>
        <CardDescription>Answer the following questions about your operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium">Do you:</p>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <span className="text-sm">Engage in any other operations?</span>
            <RadioGroup className="flex gap-4" data-testid="radiogroup-other-ops">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="other-ops-yes" data-testid="radio-other-ops-yes" />
                <label htmlFor="other-ops-yes" className="text-sm cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="other-ops-no" data-testid="radio-other-ops-no" />
                <label htmlFor="other-ops-no" className="text-sm cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <span className="text-sm">Loan, Lease or Rent autos to others?</span>
            <RadioGroup className="flex gap-4" data-testid="radiogroup-loan-lease">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="loan-yes" data-testid="radio-loan-yes" />
                <label htmlFor="loan-yes" className="text-sm cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="loan-no" data-testid="radio-loan-no" />
                <label htmlFor="loan-no" className="text-sm cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <span className="text-sm">Engage in performance enhancements?</span>
            <RadioGroup className="flex gap-4" data-testid="radiogroup-performance">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="perf-yes" data-testid="radio-perf-yes" />
                <label htmlFor="perf-yes" className="text-sm cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="perf-no" data-testid="radio-perf-no" />
                <label htmlFor="perf-no" className="text-sm cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <span className="text-sm">Dismantle autos or have salvage operations?</span>
            <RadioGroup className="flex gap-4" data-testid="radiogroup-salvage">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="salvage-yes" data-testid="radio-salvage-yes" />
                <label htmlFor="salvage-yes" className="text-sm cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="salvage-no" data-testid="radio-salvage-no" />
                <label htmlFor="salvage-no" className="text-sm cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <p className="text-sm font-medium mt-6">Safety & Security Practices:</p>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <span className="text-sm">Secure all keys in a lock box or secure cabinet away from vehicle?</span>
          <RadioGroup className="flex gap-4" data-testid="radiogroup-keys">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="keys-yes" data-testid="radio-keys-yes" />
              <label htmlFor="keys-yes" className="text-sm cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="keys-no" data-testid="radio-keys-no" />
              <label htmlFor="keys-no" className="text-sm cursor-pointer">No</label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <span className="text-sm">Obtain certificates of insurance from all sub-contractors?</span>
          <RadioGroup className="flex gap-4" data-testid="radiogroup-certificates">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="certs-yes" data-testid="radio-certs-yes" />
              <label htmlFor="certs-yes" className="text-sm cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="certs-no" data-testid="radio-certs-no" />
              <label htmlFor="certs-no" className="text-sm cursor-pointer">No</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="na" id="certs-na" data-testid="radio-certs-na" />
              <label htmlFor="certs-na" className="text-sm cursor-pointer">N/A</label>
            </div>
          </RadioGroup>
        </div>

        {operationType !== "dealer" && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <span className="text-sm">Confine all spray painting operations to an UL approved booth?</span>
            <RadioGroup className="flex gap-4" data-testid="radiogroup-spray-booth">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="booth-yes" data-testid="radio-booth-yes" />
                <label htmlFor="booth-yes" className="text-sm cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="booth-no" data-testid="radio-booth-no" />
                <label htmlFor="booth-no" className="text-sm cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6" key="step-6">
      <CardHeader>
        <CardTitle>Prior Insurance & Loss History</CardTitle>
        <CardDescription>Provide information about your insurance history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <FormLabel>Current Insurance Carrier</FormLabel>
          <Input placeholder="Carrier name" data-testid="input-current-carrier" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <FormLabel>Current Policy Period</FormLabel>
            <Input placeholder="MM/DD/YYYY - MM/DD/YYYY" data-testid="input-current-period" />
          </div>

          <div className="space-y-3">
            <FormLabel>Current Annual Premium</FormLabel>
            <Input placeholder="$" type="number" data-testid="input-current-premium" />
          </div>
        </div>

        <div className="space-y-3">
          <FormLabel>Prior Insurance Carrier (if applicable)</FormLabel>
          <Input placeholder="Carrier name" data-testid="input-prior-carrier" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <FormLabel>Prior Policy Period</FormLabel>
            <Input placeholder="MM/DD/YYYY - MM/DD/YYYY" data-testid="input-prior-period" />
          </div>

          <div className="space-y-3">
            <FormLabel>Prior Annual Premium</FormLabel>
            <Input placeholder="$" type="number" data-testid="input-prior-premium" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Loss History (past 3 years)</p>
          <Textarea placeholder="List any claims, losses, or incidents. Include date, amount, and description." className="min-h-[100px]" data-testid="textarea-loss-history" />
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="no-losses" data-testid="checkbox-no-losses" />
            <label htmlFor="no-losses" className="text-sm cursor-pointer">
              No Prior Losses
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Any policy or coverage Declined, Cancelled or Non-Renewed during the prior 3 years?</p>
          <RadioGroup data-testid="radiogroup-declined">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="declined-yes" data-testid="radio-declined-yes" />
              <label htmlFor="declined-yes" className="text-sm cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="declined-no" data-testid="radio-declined-no" />
              <label htmlFor="declined-no" className="text-sm cursor-pointer">No</label>
            </div>
          </RadioGroup>
          <Textarea placeholder="If yes, please explain" className="min-h-[80px]" data-testid="textarea-declined-explanation" />
        </div>
      </CardContent>
    </div>
  );

  const renderStep7 = () => {
    const isDealer = operationType === "dealer" || operationType === "mixed";
    return (
      <div className="space-y-6" key="step-7">
        <CardHeader>
          <CardTitle>{isDealer ? "Dealer-Specific Questions" : "Service-Specific Questions"}</CardTitle>
          <CardDescription>Additional details about your operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDealer ? (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium">Sales Distribution</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Retail Sales %</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-retail-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Wholesale/Brokers %</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-wholesale-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Auction %</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-auction-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Consigned %</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-consigned-percent" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Dealer Plate Information</p>
                <FormLabel>Plate Numbers</FormLabel>
                <Input placeholder="Enter plate numbers" data-testid="input-plate-numbers" />
                <FormLabel>Where do you store plates when not in use?</FormLabel>
                <Input placeholder="Storage location" data-testid="input-plate-storage" />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Test Drive Policies</p>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <span className="text-sm">Obtain Driver's License and Proof of Insurance before all test drives?</span>
                  <RadioGroup className="flex gap-4" data-testid="radiogroup-test-drive-check">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="test-check-yes" data-testid="radio-test-check-yes" />
                      <label htmlFor="test-check-yes" className="text-sm cursor-pointer">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="test-check-no" data-testid="radio-test-check-no" />
                      <label htmlFor="test-check-no" className="text-sm cursor-pointer">No</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <span className="text-sm">Accompany all test drives?</span>
                  <RadioGroup className="flex gap-4" data-testid="radiogroup-accompany">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="accompany-yes" data-testid="radio-accompany-yes" />
                      <label htmlFor="accompany-yes" className="text-sm cursor-pointer">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="accompany-no" data-testid="radio-accompany-no" />
                      <label htmlFor="accompany-no" className="text-sm cursor-pointer">No</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <span className="text-sm">Offer In-house financing or Buy Here / Pay Here?</span>
                  <RadioGroup className="flex gap-4" data-testid="radiogroup-financing">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="finance-yes" data-testid="radio-finance-yes" />
                      <label htmlFor="finance-yes" className="text-sm cursor-pointer">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="finance-no" data-testid="radio-finance-no" />
                      <label htmlFor="finance-no" className="text-sm cursor-pointer">No</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium">Service Operations (Indicate % of Total Operations)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Auto Maintenance / Repair</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-maintenance-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Body & Paint Shop</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-body-paint-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Tire Sales / Service</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-tire-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Oil/Lube Service</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-oil-lube-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Auto Parts Sales</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-parts-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Auto Detailing</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-detailing-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Windshield Installation/Repair</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-windshield-percent" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Towing Services</FormLabel>
                    <Input type="number" min="0" max="100" data-testid="input-towing-percent" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <FormLabel>Other Services (Please specify)</FormLabel>
                <Textarea placeholder="List any other services not mentioned above" className="min-h-[80px]" data-testid="textarea-other-services" />
              </div>
            </>
          )}
        </CardContent>
      </div>
    );
  };

  const renderStep8 = () => (
    <div className="space-y-6" key="step-8">
      <CardHeader>
        <CardTitle>Coverage Requirements & Additional Information</CardTitle>
        <CardDescription>Final details and coverage preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium">Desired Coverage Limits</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel>General Liability Limit</FormLabel>
              <Select>
                <SelectTrigger data-testid="select-liability-limit">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500000">$500,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                  <SelectItem value="2000000">$2,000,000</SelectItem>
                  <SelectItem value="3000000">$3,000,000</SelectItem>
                  <SelectItem value="5000000">$5,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FormLabel>Garagekeepers Limit (if applicable)</FormLabel>
              <Select>
                <SelectTrigger data-testid="select-garagekeepers-limit">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="250000">$250,000</SelectItem>
                  <SelectItem value="500000">$500,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <FormLabel>Radius of Pickup & Delivery</FormLabel>
          <RadioGroup data-testid="radiogroup-radius">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-300" id="radius-300" data-testid="radio-radius-300" />
              <label htmlFor="radius-300" className="text-sm cursor-pointer">0 - 300 Miles</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="301-500" id="radius-500" data-testid="radio-radius-500" />
              <label htmlFor="radius-500" className="text-sm cursor-pointer">301 - 500 Miles</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="501-1000" id="radius-1000" data-testid="radio-radius-1000" />
              <label htmlFor="radius-1000" className="text-sm cursor-pointer">501 - 1,000 Miles</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlimited" id="radius-unlimited" data-testid="radio-radius-unlimited" />
              <label htmlFor="radius-unlimited" className="text-sm cursor-pointer">Unlimited</label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <FormLabel>Additional Information or Special Requests</FormLabel>
          <Textarea placeholder="Please provide any additional information about your business, special coverage needs, or questions" className="min-h-[120px]" data-testid="textarea-additional-info" />
        </div>

        <div className="rounded-md bg-muted p-4 mt-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Notice:</strong> All information provided in this application is subject to verification. Any person who knowingly and with intent to defraud any insurance company files an application for insurance containing any materially false information commits a fraudulent insurance act, which is a crime.
          </p>
        </div>
      </CardContent>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      case 8:
        return renderStep8();
      default:
        return renderStep1();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {renderStepIndicator()}

        <Card>
          {renderCurrentStep()}
        </Card>

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={handlePrevStep} data-testid="button-previous">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}

          {step < totalSteps ? (
            <Button type="button" onClick={handleNextStep} className="ml-auto" data-testid="button-next">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto" disabled={submitMutation.isPending} data-testid="button-submit">
              {submitMutation.isPending ? "Submitting..." : "Submit Quote Request"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
