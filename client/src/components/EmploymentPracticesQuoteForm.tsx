import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ChevronLeft, ChevronRight, Building, Users, Shield, FileText, AlertTriangle, Upload } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Safe file schema that works in both browser and non-browser environments
const fileSchema = typeof File !== 'undefined' ? z.instanceof(File) : z.any();

const formSchema = z.object({
  // Step 1: Company Information
  companyName: z.string().min(2, "Company name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  phone: z.string().min(10, "Phone number is required"),
  website: z.string().optional(),
  riskManagementContact: z.string().min(2, "Contact name is required"),
  riskManagementPhone: z.string().min(10, "Contact phone is required"),
  riskManagementEmail: z.string().email("Valid email is required"),
  sicCode: z.string().optional(),
  fein: z.string().optional(),
  dateEstablished: z.string().min(1, "Date established is required"),
  stateOfIncorporation: z.string().min(2, "State of incorporation is required"),
  formOfIncorporation: z.string().min(1, "Form of incorporation is required"),
  businessDescription: z.string().min(10, "Please describe your business operations"),
  hasSubsidiaries: z.boolean(),
  subsidiaries: z.string().optional(),

  // Step 2: Employment Information
  eplContinuouslySince: z.string().optional(),
  totalFullTimeEmployees: z.string().min(1, "Number of full-time employees is required"),
  totalPartTimeEmployees: z.string().optional(),
  totalVolunteers: z.string().optional(),
  totalTemporary: z.string().optional(),
  totalLeased: z.string().optional(),
  totalNonUSEmployees: z.string().optional(),
  employeesInCA: z.string().optional(),
  employeesInFL: z.string().optional(),
  employeesInNJ: z.string().optional(),
  employeesInNY: z.string().optional(),
  employeesInTX: z.string().optional(),
  employeesOver100k: z.string().optional(),
  terminationsVoluntary: z.string().optional(),
  terminationsInvoluntary: z.string().optional(),
  terminationsLayoffs: z.string().optional(),
  anticipatedReductionsVoluntary: z.string().optional(),
  anticipatedReductionsInvoluntary: z.string().optional(),
  anticipatedLayoffs: z.string().optional(),
  anticipatedClosures: z.boolean(),
  closureDetails: z.string().optional(),

  // Step 3: HR Policies & Procedures
  hasEmploymentApplication: z.boolean(),
  hasEmploymentHandbook: z.boolean(),
  hasAtWillProvision: z.boolean(),
  hasSexualHarassmentPolicy: z.boolean(),
  hasDiscriminationPolicy: z.boolean(),
  hasWrittenEvaluations: z.boolean(),
  hasThirdPartyConduct: z.boolean(),
  hasComplaintProcedures: z.boolean(),
  policyExplanation: z.string().optional(),

  // Step 4: Current Coverage
  currentCarrier: z.string().optional(),
  currentLimit: z.string().optional(),
  currentDeductible: z.string().optional(),
  currentEffectiveDate: z.string().optional(),
  currentPremium: z.string().optional(),
  priorCarrier: z.string().optional(),
  priorLimit: z.string().optional(),
  priorDeductible: z.string().optional(),
  priorEffectiveDate: z.string().optional(),
  priorPremium: z.string().optional(),
  hadRefusalOrCancellation: z.boolean(),
  refusalDetails: z.string().optional(),
  hadNonRenewalIndication: z.boolean(),
  nonRenewalDetails: z.string().optional(),

  // Step 5: Claims & Compliance History
  hadDiscriminationLitigation: z.boolean(),
  discriminationDetails: z.string().optional(),
  hadRegulatoryAction: z.boolean(),
  regulatoryDetails: z.string().optional(),
  gaveNoticePriorClaims: z.boolean(),
  priorClaimsDetails: z.string().optional(),
  awareOfCircumstances: z.boolean(),
  circumstancesDetails: z.string().optional(),

  // Step 6: Requested Coverage & Documents
  requestedLimit: z.string().min(1, "Requested limit is required"),
  requestedRetention: z.string().min(1, "Requested retention is required"),
  desiredEffectiveDate: z.string().min(1, "Effective date is required"),
  additionalInformation: z.string().optional(),
  employeeHandbookFile: fileSchema.optional(),
  employmentApplicationFile: fileSchema.optional(),
  financialStatementsFile: fileSchema.optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { title: "Company Information", icon: Building },
  { title: "Employment Details", icon: Users },
  { title: "HR Policies", icon: FileText },
  { title: "Current Coverage", icon: Shield },
  { title: "Claims History", icon: AlertTriangle },
  { title: "Coverage Request", icon: Upload },
];

export default function EmploymentPracticesQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      address: "",
      city: "",
      state: "CA",
      zip: "",
      phone: "",
      website: "",
      riskManagementContact: "",
      riskManagementPhone: "",
      riskManagementEmail: "",
      sicCode: "",
      fein: "",
      dateEstablished: "",
      stateOfIncorporation: "CA",
      formOfIncorporation: "",
      businessDescription: "",
      hasSubsidiaries: false,
      subsidiaries: "",
      eplContinuouslySince: "",
      totalFullTimeEmployees: "",
      totalPartTimeEmployees: "",
      totalVolunteers: "",
      totalTemporary: "",
      totalLeased: "",
      totalNonUSEmployees: "",
      employeesInCA: "",
      employeesInFL: "",
      employeesInNJ: "",
      employeesInNY: "",
      employeesInTX: "",
      employeesOver100k: "",
      terminationsVoluntary: "",
      terminationsInvoluntary: "",
      terminationsLayoffs: "",
      anticipatedReductionsVoluntary: "",
      anticipatedReductionsInvoluntary: "",
      anticipatedLayoffs: "",
      anticipatedClosures: false,
      closureDetails: "",
      hasEmploymentApplication: false,
      hasEmploymentHandbook: false,
      hasAtWillProvision: false,
      hasSexualHarassmentPolicy: false,
      hasDiscriminationPolicy: false,
      hasWrittenEvaluations: false,
      hasThirdPartyConduct: false,
      hasComplaintProcedures: false,
      policyExplanation: "",
      currentCarrier: "",
      currentLimit: "",
      currentDeductible: "",
      currentEffectiveDate: "",
      currentPremium: "",
      priorCarrier: "",
      priorLimit: "",
      priorDeductible: "",
      priorEffectiveDate: "",
      priorPremium: "",
      hadRefusalOrCancellation: false,
      refusalDetails: "",
      hadNonRenewalIndication: false,
      nonRenewalDetails: "",
      hadDiscriminationLitigation: false,
      discriminationDetails: "",
      hadRegulatoryAction: false,
      regulatoryDetails: "",
      gaveNoticePriorClaims: false,
      priorClaimsDetails: "",
      awareOfCircumstances: false,
      circumstancesDetails: "",
      requestedLimit: "",
      requestedRetention: "",
      desiredEffectiveDate: "",
      additionalInformation: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        ...data,
        type: "employment_practices",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with your Employment Practices Liability insurance quote.",
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
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);
    
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ["companyName", "address", "city", "state", "zip", "phone", "riskManagementContact", "riskManagementPhone", "riskManagementEmail", "dateEstablished", "stateOfIncorporation", "formOfIncorporation", "businessDescription"];
      case 1:
        return ["totalFullTimeEmployees"];
      case 2:
        return [];
      case 3:
        return [];
      case 4:
        return [];
      case 5:
        return ["requestedLimit", "requestedRetention", "desiredEffectiveDate"];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-primary" data-testid="icon-success" />
            </div>
            <h2 className="text-2xl font-semibold" data-testid="text-success-title">Quote Request Submitted Successfully!</h2>
            <p className="text-muted-foreground" data-testid="text-success-message">
              Thank you for your Employment Practices Liability insurance quote request. 
              Our team will review your information and contact you within 24 business hours.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`step-indicator-${index}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs text-center hidden md:block ${isActive ? "font-semibold" : ""}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            data-testid="progress-bar"
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{STEPS[currentStep].title}</CardTitle>
              <CardDescription>
                {currentStep === 0 && "Provide your company details and contact information"}
                {currentStep === 1 && "Tell us about your workforce and employee demographics"}
                {currentStep === 2 && "Information about your HR policies and procedures"}
                {currentStep === 3 && "Details about your current and prior EPL coverage"}
                {currentStep === 4 && "Claims history and compliance information"}
                {currentStep === 5 && "Requested coverage details and supporting documents"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Company Information */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Corporation" {...field} data-testid="input-company-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} data-testid="input-address" />
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
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Los Angeles" {...field} data-testid="input-city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="NJ">New Jersey</SelectItem>
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
                            <Input placeholder="90001" {...field} data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
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
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="www.example.com" {...field} data-testid="input-website" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Risk Management Contact</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="riskManagementContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} data-testid="input-risk-contact" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="riskManagementPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} data-testid="input-risk-phone" />
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
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-risk-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Business Details</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="sicCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SIC Code (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="1234" {...field} data-testid="input-sic-code" />
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
                              <FormLabel>FEIN (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="12-3456789" {...field} data-testid="input-fein" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="dateEstablished"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Established</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} data-testid="input-date-established" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="stateOfIncorporation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State of Incorporation</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-incorporation-state">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="DE">Delaware</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                  <SelectItem value="NJ">New Jersey</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="formOfIncorporation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Form of Incorporation</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-incorporation-form">
                                  <SelectValue placeholder="Select form" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Inc.">Corporation (Inc.)</SelectItem>
                                <SelectItem value="LLC">Limited Liability Company (LLC)</SelectItem>
                                <SelectItem value="LLP">Limited Liability Partnership (LLP)</SelectItem>
                                <SelectItem value="S-Corp">S Corporation</SelectItem>
                                <SelectItem value="C-Corp">C Corporation</SelectItem>
                                <SelectItem value="Partnership">Partnership</SelectItem>
                                <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nature of Business Operations</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your company's primary business activities..." 
                                className="min-h-24"
                                {...field} 
                                data-testid="textarea-business-description" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasSubsidiaries"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-has-subsidiaries"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Company has subsidiaries</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      {form.watch("hasSubsidiaries") && (
                        <FormField
                          control={form.control}
                          name="subsidiaries"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subsidiary Information</FormLabel>
                              <FormDescription>
                                List subsidiary names, type of business, percent owned, and date created/acquired
                              </FormDescription>
                              <FormControl>
                                <Textarea 
                                  placeholder="Subsidiary 1: ABC Services, Technology Services, 100%, 2020&#10;Subsidiary 2: XYZ Solutions, Consulting, 75%, 2021"
                                  className="min-h-24"
                                  {...field} 
                                  data-testid="textarea-subsidiaries" 
                                />
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

              {/* Step 2: Employment Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="eplContinuouslySince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EPL Insurance Continuously in Force Since (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-epl-since" />
                        </FormControl>
                        <FormDescription>
                          Leave blank if this is your first EPL policy
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Current Employee Count</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="totalFullTimeEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Full-Time Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="50" {...field} data-testid="input-full-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalPartTimeEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Part-Time Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="10" {...field} data-testid="input-part-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalVolunteers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Volunteers</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-volunteers" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalTemporary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temporary Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-temporary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalLeased"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Leased Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-leased" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalNonUSEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Non-US Based Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-non-us" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Employees by State</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employeesInCA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>California (CA)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-ca" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesInFL"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Florida (FL)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-fl" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesInNJ"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Jersey (NJ)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-nj" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesInNY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New York (NY)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-ny" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesInTX"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texas (TX)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-tx" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeesOver100k"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employees earning over $100,000</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-employees-100k" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Terminations in Past 12 Months</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="terminationsVoluntary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Voluntary</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-term-voluntary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="terminationsInvoluntary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Involuntary</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-term-involuntary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="terminationsLayoffs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Laid Off</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-term-layoffs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Anticipated Changes in Next 12 Months</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="anticipatedReductionsVoluntary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Voluntary</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-anticipated-voluntary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="anticipatedReductionsInvoluntary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Involuntary</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-anticipated-involuntary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="anticipatedLayoffs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Layoffs</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} data-testid="input-anticipated-layoffs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="anticipatedClosures"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-anticipated-closures"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Anticipated plant, facility, branch, office, or department closing, consolidation, reorganization, or layoff within next 24 months
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("anticipatedClosures") && (
                    <FormField
                      control={form.control}
                      name="closureDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Closure Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about the anticipated changes..."
                              className="min-h-24"
                              {...field} 
                              data-testid="textarea-closure-details" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Step 3: HR Policies & Procedures */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Human Resource Policies</h3>
                    <p className="text-sm text-muted-foreground">Please indicate which policies and procedures your company has in place:</p>

                    <FormField
                      control={form.control}
                      name="hasEmploymentApplication"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-employment-application"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Standard employment application for all applicants</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasEmploymentHandbook"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-employment-handbook"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Employment handbook</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasAtWillProvision"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-at-will"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>"At Will" provision in employment application</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasSexualHarassmentPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-sexual-harassment"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Written policy with respect to sexual harassment</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasDiscriminationPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-discrimination"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Written policy with respect to discrimination</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasWrittenEvaluations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-written-evaluations"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Written annual evaluations for employees</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Third Party Policies</h3>
                    
                    <FormField
                      control={form.control}
                      name="hasThirdPartyConduct"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-third-party-conduct"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Policies outlining employee conduct when dealing with customers, clients, vendors, or third parties
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasComplaintProcedures"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-complaint-procedures"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Procedures for responding to complaints from customers, clients, vendors, or third parties
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="policyExplanation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Explanation for any "No" answers (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="If any policies are not in place, please explain..."
                            className="min-h-24"
                            {...field} 
                            data-testid="textarea-policy-explanation" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Current Coverage */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Current EPL Coverage</h3>
                    
                    <FormField
                      control={form.control}
                      name="currentCarrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Insurance Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC Insurance Company" {...field} data-testid="input-current-carrier" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Limit of Liability</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,000,000" {...field} data-testid="input-current-limit" />
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
                              <Input placeholder="$25,000" {...field} data-testid="input-current-deductible" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentEffectiveDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Effective Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-current-effective-date" />
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
                              <Input placeholder="$15,000" {...field} data-testid="input-current-premium" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Prior Year EPL Coverage</h3>
                    
                    <FormField
                      control={form.control}
                      name="priorCarrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prior Year Insurance Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="XYZ Insurance Company" {...field} data-testid="input-prior-carrier" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="priorLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prior Limit of Liability</FormLabel>
                            <FormControl>
                              <Input placeholder="$1,000,000" {...field} data-testid="input-prior-limit" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priorDeductible"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prior Deductible</FormLabel>
                            <FormControl>
                              <Input placeholder="$25,000" {...field} data-testid="input-prior-deductible" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="priorEffectiveDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prior Effective Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-prior-effective-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priorPremium"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prior Premium</FormLabel>
                            <FormControl>
                              <Input placeholder="$14,000" {...field} data-testid="input-prior-premium" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="hadRefusalOrCancellation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-refusal-cancellation"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Any underwriter refused, canceled, or non-renewed coverage?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hadRefusalOrCancellation") && (
                      <FormField
                        control={form.control}
                        name="refusalDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Refusal/Cancellation Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide details..."
                                className="min-h-24"
                                {...field} 
                                data-testid="textarea-refusal-details" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="hadNonRenewalIndication"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-non-renewal"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Any underwriter indicated intent not to offer renewal terms?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hadNonRenewalIndication") && (
                      <FormField
                        control={form.control}
                        name="nonRenewalDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Non-Renewal Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide details..."
                                className="min-h-24"
                                {...field} 
                                data-testid="textarea-non-renewal-details" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Claims & Compliance History */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100">Important Notice</h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                          Claims arising from any disclosed or undisclosed circumstances will be excluded from the proposed insurance. 
                          Please provide complete and accurate information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="hadDiscriminationLitigation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-discrimination-litigation"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Involved in any discriminatory practice violation or litigation?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hadDiscriminationLitigation") && (
                    <FormField
                      control={form.control}
                      name="discriminationDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discrimination/Litigation Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide full details including dates, parties involved, and current status..."
                              className="min-h-24"
                              {...field} 
                              data-testid="textarea-discrimination-details" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hadRegulatoryAction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-regulatory-action"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Any disciplinary action by regulatory agency (including EEOC)?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hadRegulatoryAction") && (
                    <FormField
                      control={form.control}
                      name="regulatoryDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Regulatory Action Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide full details including agency, dates, allegations, and resolution..."
                              className="min-h-24"
                              {...field} 
                              data-testid="textarea-regulatory-details" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="gaveNoticePriorClaims"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-prior-notice"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Given notice of claims or circumstances under any prior similar policies?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("gaveNoticePriorClaims") && (
                    <FormField
                      control={form.control}
                      name="priorClaimsDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prior Claims/Notice Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide full details of all claims and circumstances reported..."
                              className="min-h-24"
                              {...field} 
                              data-testid="textarea-prior-claims-details" 
                            />
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
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-aware-circumstances"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Aware of any facts or circumstances that might give rise to a future claim?
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
                        <FormItem>
                          <FormLabel>Circumstances Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide complete details of known circumstances..."
                              className="min-h-24"
                              {...field} 
                              data-testid="textarea-circumstances-details" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Step 6: Requested Coverage & Documents */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Requested Coverage Terms</h3>
                    
                    <FormField
                      control={form.control}
                      name="requestedLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requested Limit of Liability</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-requested-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="$500,000">$500,000</SelectItem>
                              <SelectItem value="$1,000,000">$1,000,000</SelectItem>
                              <SelectItem value="$2,000,000">$2,000,000</SelectItem>
                              <SelectItem value="$3,000,000">$3,000,000</SelectItem>
                              <SelectItem value="$5,000,000">$5,000,000</SelectItem>
                              <SelectItem value="$10,000,000">$10,000,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requestedRetention"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requested Retention/Deductible</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-requested-retention">
                                <SelectValue placeholder="Select retention" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="$0">$0</SelectItem>
                              <SelectItem value="$5,000">$5,000</SelectItem>
                              <SelectItem value="$10,000">$10,000</SelectItem>
                              <SelectItem value="$25,000">$25,000</SelectItem>
                              <SelectItem value="$50,000">$50,000</SelectItem>
                              <SelectItem value="$100,000">$100,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="desiredEffectiveDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Effective Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-desired-effective-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Required Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please upload the following documents if available. Financial statements are required for companies with over 300 employees and all California submissions.
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="employeeHandbookFile"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Employee Handbook</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...field}
                                data-testid="input-employee-handbook"
                              />
                            </FormControl>
                            <FormDescription>
                              Upload your current employee handbook (PDF or Word)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employmentApplicationFile"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Employment Application</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...field}
                                data-testid="input-employment-application"
                              />
                            </FormControl>
                            <FormDescription>
                              Upload your standard employment application form
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="financialStatementsFile"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Financial Statements (if required)</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...field}
                                data-testid="input-financial-statements"
                              />
                            </FormControl>
                            <FormDescription>
                              Latest fiscal year-end CPA prepared financial statements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide any additional information that may be helpful for your quote..."
                            className="min-h-24"
                            {...field} 
                            data-testid="textarea-additional-info" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    data-testid="button-previous"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                {currentStep < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="ml-auto"
                    data-testid="button-submit"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Quote Request"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
