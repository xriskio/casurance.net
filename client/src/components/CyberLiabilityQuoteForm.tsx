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
import { CheckCircle, ChevronLeft, ChevronRight, Building, Shield, Users, FileText, Database, Lock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  // Step 1: General Information
  companyName: z.string().min(2, "Company name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  hasWebsite: z.boolean(),
  websiteUrl: z.string().optional(),
  emailHostedOnDomain: z.boolean().optional(),
  hasSubsidiaries: z.boolean(),
  subsidiariesList: z.string().optional(),

  // Step 2: Nature of Operations & Revenue
  hasProhibitedActivities: z.boolean(),
  prohibitedActivitiesDetails: z.string().optional(),
  isTechnologyCompany: z.boolean(),
  industry: z.string().min(2, "Industry is required"),
  mostRecentRevenue: z.string().min(1, "Revenue is required"),
  currentYearRevenue: z.string().min(1, "Projected revenue is required"),
  hasInternationalOperations: z.boolean(),
  internationalRevenuePercentage: z.string().optional(),
  isSubsidiary: z.boolean(),
  parentDomiciledOutsideUS: z.boolean().optional(),
  hasMergerOrAcquisition: z.boolean(),

  // Step 3: Cybersecurity Function & Contact
  hasCybersecurityTeam: z.boolean(),
  cybersecurityManagement: z.enum(["in_house", "third_party", "none"]).optional(),
  thirdPartyProvider: z.string().optional(),
  teamSize: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required"),
  contactTitle: z.string().min(2, "Contact title is required"),
  contactEmail: z.string().email("Invalid email address"),

  // Step 4: Current & Requested Coverage
  hasCurrentCyberCoverage: z.boolean(),
  currentAggregateLimit: z.string().optional(),
  currentRetention: z.string().optional(),
  currentCarrier: z.string().optional(),
  currentPremium: z.string().optional(),
  requestedLimit: z.string().min(1, "Requested limit is required"),
  requestedRetention: z.string().min(1, "Requested retention is required"),
  desiredEffectiveDate: z.string().min(1, "Effective date is required"),

  // Step 5: Data, Privacy & Security
  recordsVolume: z.enum(["under_50k", "50k_to_100k", "100k_to_1m", "1m_to_5m", "over_5m", "unknown"]),
  encryptedAtRest: z.boolean(),
  encryptedInTransit: z.boolean(),
  encryptedOnMobile: z.boolean(),
  backupFrequency: z.enum(["no_backup", "weekly", "monthly"]),
  backupsOffline: z.boolean().optional(),
  backupTestingFrequency: z.enum(["never", "monthly", "quarterly", "annually"]).optional(),
  hasIncidentResponsePlan: z.boolean(),
  planTestingFrequency: z.enum(["never", "monthly", "quarterly", "annually"]).optional(),
  hasMediaReviewProcess: z.boolean(),
  acquiredTrademarks: z.boolean(),
  trademarksScreened: z.boolean().optional(),

  // Step 6: Security Controls
  mfaForRemoteAccess: z.enum(["yes", "no", "no_remote_access", "unknown"]),
  remoteAccessControl: z.string().optional(),
  mfaForEmail: z.boolean(),
  hasDualAuthFundsTransfer: z.boolean(),
  acceptsFundTransfers: z.boolean(),
  validatesFundTransfers: z.boolean().optional(),
  hasAntivirusComputers: z.boolean(),
  hasAntivirusNetwork: z.boolean(),
  hasAntivirusMobile: z.boolean(),
  hasEDRorMDR: z.boolean(),
  edrProduct: z.string().optional(),
  hasSecureEmailGateway: z.boolean(),
  emailGatewayProduct: z.string().optional(),
  screensMaliciousAttachments: z.boolean(),
  screensMaliciousLinks: z.boolean(),
  tagsExternalEmails: z.boolean(),
  securityTrainingFrequency: z.enum(["never", "monthly", "quarterly", "annually"]),
  additionalComments: z.string().optional(),

  // Files
  lossRuns: z.instanceof(File).optional(),
  financialStatements: z.instanceof(File).optional(),
  additionalDocuments: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { title: "General Information", icon: Building },
  { title: "Operations & Revenue", icon: FileText },
  { title: "Cybersecurity Team", icon: Users },
  { title: "Coverage Details", icon: Shield },
  { title: "Data & Privacy", icon: Database },
  { title: "Security Controls", icon: Lock },
];

export default function CyberLiabilityQuoteForm() {
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
      hasWebsite: true,
      websiteUrl: "",
      hasSubsidiaries: false,
      hasProhibitedActivities: false,
      isTechnologyCompany: false,
      industry: "",
      mostRecentRevenue: "",
      currentYearRevenue: "",
      hasInternationalOperations: false,
      isSubsidiary: false,
      hasMergerOrAcquisition: false,
      hasCybersecurityTeam: false,
      contactName: "",
      contactTitle: "",
      contactEmail: "",
      hasCurrentCyberCoverage: false,
      requestedLimit: "",
      requestedRetention: "",
      desiredEffectiveDate: "",
      recordsVolume: "unknown",
      encryptedAtRest: false,
      encryptedInTransit: false,
      encryptedOnMobile: false,
      backupFrequency: "no_backup",
      hasIncidentResponsePlan: false,
      hasMediaReviewProcess: false,
      acquiredTrademarks: false,
      mfaForRemoteAccess: "unknown",
      mfaForEmail: false,
      hasDualAuthFundsTransfer: false,
      acceptsFundTransfers: false,
      hasAntivirusComputers: false,
      hasAntivirusNetwork: false,
      hasAntivirusMobile: false,
      hasEDRorMDR: false,
      hasSecureEmailGateway: false,
      screensMaliciousAttachments: false,
      screensMaliciousLinks: false,
      tagsExternalEmails: false,
      securityTrainingFrequency: "never",
      additionalComments: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        ...data,
        type: "cyber_liability",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with your cyber liability insurance quote.",
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

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ["companyName", "address", "city", "state", "zip"];
      case 1:
        return ["industry", "mostRecentRevenue", "currentYearRevenue"];
      case 2:
        return ["contactName", "contactTitle", "contactEmail"];
      case 3:
        return ["requestedLimit", "requestedRetention", "desiredEffectiveDate"];
      case 4:
        return [];
      case 5:
        return [];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Request Submitted Successfully</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for requesting a cyber liability insurance quote. Our team will review your information and contact you within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            Reference Number: CYB-{Date.now().toString().slice(-8)}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isCompleted ? "bg-primary text-primary-foreground" :
                  isActive ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs text-center ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative h-2 bg-muted rounded-full">
          <div 
            className="absolute h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Step 1: General Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">General Information</h2>
                    <p className="text-muted-foreground">Tell us about your company</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company, Inc." {...field} data-testid="input-company-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headquarters Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} data-testid="input-address" />
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
                            <Input placeholder="Los Angeles" {...field} data-testid="input-city" />
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
                          <Select onValueChange={field.onChange} value={field.value}>
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

                  <FormField
                    control={form.control}
                    name="hasWebsite"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-has-website"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Company has a website</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasWebsite") && (
                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.example.com" {...field} data-testid="input-website-url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch("hasWebsite") && (
                    <FormField
                      control={form.control}
                      name="emailHostedOnDomain"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-email-hosted"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Business email is hosted through this web domain</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

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
                      name="subsidiariesList"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List Subsidiaries</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List all subsidiary companies..."
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
              )}

              {/* Step 2: Operations & Revenue */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Operations & Revenue</h2>
                    <p className="text-muted-foreground">Information about your business operations</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasProhibitedActivities"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Does your business engage in any of the following activities?</FormLabel>
                        <FormDescription>
                          Adult media/entertainment, cryptocurrency/blockchain, cannabis, gambling, debt collection, payment processing, weapons/explosives, data aggregator/broker
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "yes")}
                            value={field.value ? "yes" : "no"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" data-testid="radio-prohibited-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" data-testid="radio-prohibited-no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasProhibitedActivities") && (
                    <FormField
                      control={form.control}
                      name="prohibitedActivitiesDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please describe the activities</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the nature of these activities..."
                              {...field}
                              data-testid="textarea-prohibited-details"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="isTechnologyCompany"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is more than 50% of revenue derived from technology products and services?</FormLabel>
                        <FormDescription>
                          E.g., software, electronics, telecommunications
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "yes")}
                            value={field.value ? "yes" : "no"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" data-testid="radio-tech-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" data-testid="radio-tech-no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry (NAIC or SIC Code)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 541511 - Software Development" {...field} data-testid="input-industry" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mostRecentRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Most Recent Fiscal Year Revenue</FormLabel>
                          <FormControl>
                            <Input placeholder="$10,000,000" {...field} data-testid="input-recent-revenue" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentYearRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Fiscal Year (Projected) Revenue</FormLabel>
                          <FormControl>
                            <Input placeholder="$12,000,000" {...field} data-testid="input-current-revenue" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="hasInternationalOperations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-international-ops"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Revenue-generating operations outside the country of domicile</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasInternationalOperations") && (
                    <FormField
                      control={form.control}
                      name="internationalRevenuePercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentage of revenue generated outside country of domicile</FormLabel>
                          <FormControl>
                            <Input placeholder="25%" {...field} data-testid="input-intl-revenue-pct" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="isSubsidiary"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-is-subsidiary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Company is a subsidiary of a parent company</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("isSubsidiary") && (
                    <FormField
                      control={form.control}
                      name="parentDomiciledOutsideUS"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-parent-outside-us"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Parent company is domiciled outside the United States</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasMergerOrAcquisition"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-merger-acquisition"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Experienced or anticipating a merger, acquisition, or sale of assets (past or next 12 months)</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Cybersecurity Team */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Cybersecurity Function & Contact</h2>
                    <p className="text-muted-foreground">Tell us about your cybersecurity operations</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasCybersecurityTeam"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is there a dedicated cybersecurity team monitoring the network?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "yes")}
                            value={field.value ? "yes" : "no"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" data-testid="radio-cybersec-team-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" data-testid="radio-cybersec-team-no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasCybersecurityTeam") && (
                    <>
                      <FormField
                        control={form.control}
                        name="cybersecurityManagement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Is cybersecurity managed in-house or outsourced?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-cybersec-management">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="in_house">In-House</SelectItem>
                                <SelectItem value="third_party">Third Party</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("cybersecurityManagement") === "third_party" && (
                        <FormField
                          control={form.control}
                          name="thirdPartyProvider"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Third Party Entity Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Provider name" {...field} data-testid="input-third-party-provider" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch("cybersecurityManagement") === "in_house" && (
                        <FormField
                          control={form.control}
                          name="teamSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of employees dedicated to cybersecurity team</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="5" {...field} data-testid="input-team-size" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  )}

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Cybersecurity Contact Person</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Chief Information Security Officer (CISO), Risk Manager, or equivalent
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Chief Information Security Officer" {...field} data-testid="input-contact-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@company.com" {...field} data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Coverage Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Coverage Details</h2>
                    <p className="text-muted-foreground">Current and requested coverage information</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hasCurrentCyberCoverage"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Does your company currently purchase cyber coverage?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "yes")}
                            value={field.value ? "yes" : "no"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" data-testid="radio-current-coverage-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" data-testid="radio-current-coverage-no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasCurrentCyberCoverage") && (
                    <div className="space-y-4 border p-4 rounded-lg">
                      <h3 className="font-semibold text-foreground">Current Coverage Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentAggregateLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Aggregate Limit</FormLabel>
                              <FormControl>
                                <Input placeholder="$1,000,000" {...field} data-testid="input-current-limit" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currentRetention"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Retention/Deductible</FormLabel>
                              <FormControl>
                                <Input placeholder="$25,000" {...field} data-testid="input-current-retention" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currentCarrier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Carrier</FormLabel>
                              <FormControl>
                                <Input placeholder="Carrier name" {...field} data-testid="input-current-carrier" />
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
                              <FormLabel>Annual Premium</FormLabel>
                              <FormControl>
                                <Input placeholder="$15,000" {...field} data-testid="input-current-premium" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Requested Coverage</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="requestedLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Requested Limit</FormLabel>
                            <FormControl>
                              <Input placeholder="$2,000,000" {...field} data-testid="input-requested-limit" />
                            </FormControl>
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
                            <FormControl>
                              <Input placeholder="$50,000" {...field} data-testid="input-requested-retention" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="desiredEffectiveDate"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Desired Effective Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-effective-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Data & Privacy */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Data, Privacy & Media</h2>
                    <p className="text-muted-foreground">Information about data handling and security</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="recordsVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How many nonpublic personal records are received, processed, stored, or transmitted?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-records-volume">
                              <SelectValue placeholder="Select volume" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under_50k">Under 50,000 records</SelectItem>
                            <SelectItem value="50k_to_100k">50,000 - 100,000 records</SelectItem>
                            <SelectItem value="100k_to_1m">100,000 - 1 million records</SelectItem>
                            <SelectItem value="1m_to_5m">1 million - 5 million records</SelectItem>
                            <SelectItem value="over_5m">Over 5 million records</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Are nonpublic personal records encrypted:</h3>
                    
                    <FormField
                      control={form.control}
                      name="encryptedAtRest"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-encrypted-at-rest"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>While at rest (stored)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="encryptedInTransit"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-encrypted-in-transit"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>While electronically in transit</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="encryptedOnMobile"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-encrypted-mobile"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>While on mobile devices</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Backups & Recovery</h3>
                    
                    <FormField
                      control={form.control}
                      name="backupFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Is critical data regularly backed up?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-backup-frequency">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_backup">No regular backups</SelectItem>
                              <SelectItem value="weekly">Yes, weekly</SelectItem>
                              <SelectItem value="monthly">Yes, monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(form.watch("backupFrequency") === "weekly" || form.watch("backupFrequency") === "monthly") && (
                      <>
                        <FormField
                          control={form.control}
                          name="backupsOffline"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-backups-offline"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Backups stored offline and/or isolated from production systems</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="backupTestingFrequency"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>How often is data recovery from backup tested?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-backup-testing">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="never">Never</SelectItem>
                                  <SelectItem value="monthly">At least monthly</SelectItem>
                                  <SelectItem value="quarterly">Quarterly</SelectItem>
                                  <SelectItem value="annually">Annually</SelectItem>
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
                      name="hasIncidentResponsePlan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-incident-plan"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Cyber Incident Response Plan or Business Continuity plan in place</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hasIncidentResponsePlan") && (
                      <FormField
                        control={form.control}
                        name="planTestingFrequency"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>How often is the plan tested?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-plan-testing">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="monthly">At least monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Media & Content</h3>
                    
                    <FormField
                      control={form.control}
                      name="hasMediaReviewProcess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-media-review"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Legal review process for all published content (including social media)</FormLabel>
                            <FormDescription>
                              Formal process to ensure no infringement of copyright, trademark, logo, or brand
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acquiredTrademarks"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-acquired-trademarks"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Acquired trademarks in the last 3 years</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("acquiredTrademarks") && (
                      <FormField
                        control={form.control}
                        name="trademarksScreened"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2 ml-6">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-trademarks-screened"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Trademarks were screened and cleared for infringement</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Security Controls */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Security Controls</h2>
                    <p className="text-muted-foreground">Technical security measures and controls</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="mfaForRemoteAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is Multi-Factor Authentication (MFA) required for ALL remote access?</FormLabel>
                        <FormDescription>
                          Including cloud-hosted, on-premises, and via VPNs
                        </FormDescription>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-mfa-remote">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="no_remote_access">Remote Access Not Permitted</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("mfaForRemoteAccess") === "no" && (
                    <FormField
                      control={form.control}
                      name="remoteAccessControl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How is remote access controlled?</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., User ID and strong password" {...field} data-testid="input-remote-access-control" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="mfaForEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-mfa-email"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>MFA required for access to email</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Funds Transfer Controls</h3>
                    
                    <FormField
                      control={form.control}
                      name="hasDualAuthFundsTransfer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-dual-auth"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Dual authentication protocol for confirming funds transfers</FormLabel>
                            <FormDescription>
                              Secondary method of communication before account changes or funds transfers
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acceptsFundTransfers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-accepts-transfers"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Accept fund transfer requests from customers</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("acceptsFundTransfers") && (
                      <FormField
                        control={form.control}
                        name="validatesFundTransfers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2 ml-6">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-validates-transfers"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Funds transfer instruction validated by alternate method</FormLabel>
                              <FormDescription>
                                E.g., if requested by email, follow-up with phone call confirmation
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Endpoint Protection</h3>
                    <p className="text-sm text-muted-foreground mb-4">Where is antimalware/antivirus/endpoint detection running?</p>
                    
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="hasAntivirusComputers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-antivirus-computers"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Computers</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasAntivirusNetwork"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-antivirus-network"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Networks</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasAntivirusMobile"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-antivirus-mobile"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Mobile Devices</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="hasEDRorMDR"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-edr-mdr"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Endpoint Detection and Response (EDR) or Managed Detection and Response (MDR) product in place</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hasEDRorMDR") && (
                      <FormField
                        control={form.control}
                        name="edrProduct"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>EDR/MDR Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., CrowdStrike Falcon, Microsoft Defender" {...field} data-testid="input-edr-product" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Email Security</h3>
                    
                    <FormField
                      control={form.control}
                      name="hasSecureEmailGateway"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-email-gateway"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Secure Email Gateway (SEG) in place</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("hasSecureEmailGateway") && (
                      <FormField
                        control={form.control}
                        name="emailGatewayProduct"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>SEG Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Proofpoint, Mimecast, Barracuda" {...field} data-testid="input-email-gateway-product" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="space-y-3 mt-4">
                      <FormField
                        control={form.control}
                        name="screensMaliciousAttachments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-screens-attachments"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Screening for malicious attachments</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="screensMaliciousLinks"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-screens-links"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Screening for malicious links</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tagsExternalEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-tags-external"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Tagging emails from external senders</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="securityTrainingFrequency"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>How often is anti-phishing and cybersecurity awareness training conducted?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-training-frequency">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="monthly">At least monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <FormField
                      control={form.control}
                      name="additionalComments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Comments or Information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information about your cybersecurity posture, controls, or specific coverage needs..."
                              className="min-h-32"
                              {...field}
                              data-testid="textarea-additional-comments"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Supporting Documents (Optional)</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="lossRuns"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Loss Runs (5-year history)</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="input-loss-runs"
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
                            <FormLabel>Financial Statements</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="input-financial-statements"
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
                            <FormLabel>Additional Documents</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                                data-testid="input-additional-documents"
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
                  data-testid="button-next"
                >
                  {currentStep === STEPS.length - 1 ? (
                    submitMutation.isPending ? "Submitting..." : "Submit Quote Request"
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
