import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ChevronLeft, ChevronRight, Building, Shield, Users, Heart, Briefcase, FileText } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  // Step 1: General Information
  applicantName: z.string().min(2, "Organization name is required"),
  denomination: z.string().min(2, "Denomination is required"),
  numberOfMembers: z.string().min(1, "Number of members is required"),
  numberOfVolunteers: z.string().min(1, "Number of volunteers is required"),
  mailingAddress: z.string().min(5, "Mailing address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  is501c3: z.boolean(),
  websiteAddress: z.string().optional(),
  riskManagementContact: z.string().min(2, "Contact name is required"),
  contactPhone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 555-555-5555"),
  contactEmail: z.string().email("Invalid email address"),

  // Step 2: Life Safety & Property
  hasFireAlarms: z.boolean(),
  smokeDetectorType: z.enum(["hardwired", "battery", "both"]),
  hasEmergencyLighting: z.boolean(),
  hasSprinklers: z.boolean(),
  evacuationRoutesPosted: z.boolean(),
  hasMultipleExits: z.boolean(),
  buildingsRepurposed: z.boolean(),
  repurposeDescription: z.string().optional(),
  historicalRegister: z.boolean(),
  historicalDetails: z.string().optional(),
  cookingOnPremises: z.boolean(),
  cookingProtection: z.string().optional(),
  hasAluminumWiring: z.boolean(),
  wiringRetrofitted: z.boolean().optional(),

  // Step 3: Special Property & Inland Marine
  hasStainedGlass: z.boolean(),
  stainedGlassValue: z.string().optional(),
  stainedGlassIncludedInBuilding: z.boolean().optional(),
  hasReligiousArtifacts: z.boolean(),
  artifactsDescription: z.string().optional(),
  hasOrgan: z.boolean(),
  organValue: z.string().optional(),
  organDescription: z.string().optional(),

  // Step 4: Programs & Services
  hasNursery: z.boolean(),
  nurseryDaysPerWeek: z.string().optional(),
  nurseryAverageChildren: z.string().optional(),
  nurseryStaffType: z.enum(["employees", "volunteers", "both"]).optional(),
  hasYouthProgram: z.boolean(),
  youthAgeRange: z.string().optional(),
  youthAttendance: z.string().optional(),
  youthActivities: z.string().optional(),
  operatesShelters: z.boolean(),
  shelterDetails: z.string().optional(),
  communityServices: z.string().optional(),
  leasePremises: z.boolean(),
  leaseEntities: z.string().optional(),
  hasIndemnificationClause: z.boolean().optional(),
  requiresCertificateOfInsurance: z.boolean().optional(),

  // Step 5: Liability & Risk Management
  hasForeignTravel: z.boolean(),
  foreignCountry: z.string().optional(),
  travelDuration: z.string().optional(),
  travelParticipants: z.string().optional(),
  sponsorsAthleticLeagues: z.boolean(),
  athleticSports: z.string().optional(),
  athleticParticipants: z.string().optional(),
  requiresWaivers: z.boolean().optional(),
  hasSwimmingFacilities: z.boolean(),
  poolOwnership: z.enum(["owned", "operated_by_other", "none"]).optional(),
  hasCPRStaff: z.boolean().optional(),
  hasLifeguards: z.boolean().optional(),
  poolFenced: z.boolean().optional(),
  hasDivingBoard: z.boolean().optional(),
  hasPoolSlide: z.boolean().optional(),
  virginiaGraemeCompliant: z.boolean().optional(),
  hasPlayground: z.boolean(),
  playgroundFenced: z.boolean().optional(),
  playgroundDescription: z.string().optional(),

  // Step 6: Professional Liability & Additional Info
  hasProfessionalLiability: z.boolean(),
  professionalLiabilityLimit: z.string().optional(),
  liabilityType: z.enum(["occurrence", "claims_made"]).optional(),
  counselingTypes: z.array(z.string()).optional(),
  clergyAccredited: z.boolean(),
  clergyTraining: z.string().optional(),
  verifiesCredentials: z.boolean(),
  usesContractedCounselors: z.boolean(),
  maintainsCertificates: z.boolean().optional(),
  additionalComments: z.string().optional(),
  
  // Files
  photographsFront: z.instanceof(File).optional(),
  photographsRear: z.instanceof(File).optional(),
  financialDocuments: z.instanceof(File).optional(),
  lossRuns: z.instanceof(File).optional(),
  additionalDocuments: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { title: "General Information", icon: Building },
  { title: "Life Safety & Property", icon: Shield },
  { title: "Special Property", icon: Heart },
  { title: "Programs & Services", icon: Users },
  { title: "Liability & Risk", icon: Briefcase },
  { title: "Additional Information", icon: FileText },
];

export default function ReligiousOrgQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      denomination: "",
      numberOfMembers: "",
      numberOfVolunteers: "",
      mailingAddress: "",
      city: "",
      state: "",
      zip: "",
      is501c3: true,
      websiteAddress: "",
      riskManagementContact: "",
      contactPhone: "",
      contactEmail: "",
      hasFireAlarms: true,
      smokeDetectorType: "hardwired",
      hasEmergencyLighting: true,
      hasSprinklers: false,
      evacuationRoutesPosted: true,
      hasMultipleExits: true,
      buildingsRepurposed: false,
      historicalRegister: false,
      cookingOnPremises: false,
      hasAluminumWiring: false,
      hasStainedGlass: false,
      hasReligiousArtifacts: false,
      hasOrgan: false,
      hasNursery: false,
      hasYouthProgram: false,
      operatesShelters: false,
      leasePremises: false,
      hasForeignTravel: false,
      sponsorsAthleticLeagues: false,
      hasSwimmingFacilities: false,
      hasPlayground: false,
      hasProfessionalLiability: false,
      clergyAccredited: true,
      verifiesCredentials: true,
      usesContractedCounselors: false,
      counselingTypes: [],
      additionalComments: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        ...data,
        type: "religious_organization",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with your religious organization insurance quote.",
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

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0:
        return ['applicantName', 'denomination', 'numberOfMembers', 'numberOfVolunteers', 'mailingAddress', 'city', 'state', 'zip', 'riskManagementContact', 'contactPhone', 'contactEmail'];
      case 1:
        return ['hasFireAlarms', 'smokeDetectorType', 'hasEmergencyLighting', 'hasSprinklers'];
      case 2:
        return [];
      case 3:
        return [];
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
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Quote Request Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for requesting a religious organization insurance quote. Our team will review your information and contact you within 24 hours.
            </p>
            <Button onClick={() => window.location.href = "/"} data-testid="button-return-home">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-full h-1 mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                }`} style={{ width: '100px' }} />
              )}
            </div>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">{STEPS[currentStep].title}</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="First Baptist Church" data-testid="input-applicant-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="denomination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Denomination</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Baptist, Catholic, Methodist, etc." data-testid="input-denomination" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numberOfMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Members/Parishioners</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="500" data-testid="input-members" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfVolunteers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Volunteers</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="50" data-testid="input-volunteers" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="mailingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mailing Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123 Church Street" data-testid="input-address" />
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
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger data-testid="select-state">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CA">California</SelectItem>
                                <SelectItem value="TX">Texas</SelectItem>
                                <SelectItem value="FL">Florida</SelectItem>
                                <SelectItem value="NY">New York</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
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
                            <Input {...field} placeholder="90001" data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="is501c3"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-501c3"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>501(c)(3) Tax-Exempt Organization</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="websiteAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Address (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://www.yourchurch.org" data-testid="input-website" />
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
                          <Input {...field} placeholder="John Smith" data-testid="input-contact-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="555-555-5555" data-testid="input-phone" />
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
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="contact@church.org" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="hasFireAlarms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-fire-alarms"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Fire alarms installed in all facilities</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smokeDetectorType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoke Detector Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hardwired" id="hardwired" data-testid="radio-hardwired" />
                              <label htmlFor="hardwired">Hard Wired</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="battery" id="battery" data-testid="radio-battery" />
                              <label htmlFor="battery">Battery Operated</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both" id="both" data-testid="radio-both" />
                              <label htmlFor="both">Both Types</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasEmergencyLighting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-emergency-lighting"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Emergency lighting installed</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasSprinklers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-sprinklers"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sprinkler system installed</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="evacuationRoutesPosted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-evacuation-routes"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Evacuation routes posted throughout buildings</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasMultipleExits"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-multiple-exits"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Minimum of 2 means of egress per building</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="buildingsRepurposed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-repurposed"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Buildings used for different purpose than originally built</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("buildingsRepurposed") && (
                    <FormField
                      control={form.control}
                      name="repurposeDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe Renovation Work</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe the renovation..." data-testid="textarea-repurpose" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="historicalRegister"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-historical"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Buildings on historical register</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("historicalRegister") && (
                    <FormField
                      control={form.control}
                      name="historicalDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Historical Building Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="List locations and provide appraisal..." data-testid="textarea-historical" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="cookingOnPremises"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-cooking"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Cooking on premises</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("cookingOnPremises") && (
                    <FormField
                      control={form.control}
                      name="cookingProtection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cooking Exposure and Protections</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe kitchen facilities and fire suppression..." data-testid="textarea-cooking" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasAluminumWiring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-aluminum-wiring"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Property has aluminum wiring</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasAluminumWiring") && (
                    <FormField
                      control={form.control}
                      name="wiringRetrofitted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-retrofitted"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Wiring retrofitted with approved connectors</FormLabel>
                            <FormDescription>COPALUM or Alumiconn connectors installed by licensed electrician</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="hasStainedGlass"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-stained-glass"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Buildings with stained glass</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasStainedGlass") && (
                    <>
                      <FormField
                        control={form.control}
                        name="stainedGlassValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value of Stained Glass</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="$50000" data-testid="input-glass-value" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stainedGlassIncludedInBuilding"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-glass-included"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Stained glass included in building limits</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="hasReligiousArtifacts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-artifacts"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Religious artifacts or artwork</FormLabel>
                          <FormDescription>Including items over $5,000 per item</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasReligiousArtifacts") && (
                    <FormField
                      control={form.control}
                      name="artifactsDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description and Value of Artifacts</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="List artifacts with descriptions and values..." data-testid="textarea-artifacts" />
                          </FormControl>
                          <FormDescription>Include appraisals for items over $5,000</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasOrgan"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-organ"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Organ or other musical instruments</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasOrgan") && (
                    <>
                      <FormField
                        control={form.control}
                        name="organValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value of Organ/Instruments</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="$100000" data-testid="input-organ-value" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="organDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description of Organ/Instruments</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Type, make, model, year..." data-testid="textarea-organ" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}

              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="hasNursery"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-nursery"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Nursery available during worship activities</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasNursery") && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nurseryDaysPerWeek"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Days Per Week</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="3" data-testid="input-nursery-days" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="nurseryAverageChildren"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Average Number of Children</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="20" data-testid="input-nursery-children" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="nurseryStaffType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nursery Staff Type</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger data-testid="select-nursery-staff">
                                  <SelectValue placeholder="Select staff type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="employees">Employees</SelectItem>
                                  <SelectItem value="volunteers">Volunteers</SelectItem>
                                  <SelectItem value="both">Both</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="hasYouthProgram"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-youth-program"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Youth group program offered</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasYouthProgram") && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="youthAgeRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age Range</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="6-18" data-testid="input-youth-age" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="youthAttendance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weekly Attendance</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="30" data-testid="input-youth-attendance" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="youthActivities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Youth Activities</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="List activities..." data-testid="textarea-youth-activities" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="operatesShelters"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-shelters"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Operates shelters</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("operatesShelters") && (
                    <FormField
                      control={form.control}
                      name="shelterDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shelter Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Number of beds, hours, staff/volunteer operated..." data-testid="textarea-shelter" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="communityServices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Community Services Provided</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Food bank, counseling, AA meetings, etc." data-testid="textarea-services" />
                        </FormControl>
                        <FormDescription>List all community services</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leasePremises"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-lease"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Lease premises to members or public</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("leasePremises") && (
                    <>
                      <FormField
                        control={form.control}
                        name="leaseEntities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Entities Using Premises</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Boy Scouts, other religious organizations, etc." data-testid="textarea-lease-entities" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasIndemnificationClause"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-indemnification"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Lease contains indemnification clause</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="requiresCertificateOfInsurance"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-certificate"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Requires certificate of insurance from lessees</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}

              {currentStep === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="hasForeignTravel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-foreign-travel"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Foreign travel exposure within next 12 months</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasForeignTravel") && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="foreignCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Mexico" data-testid="input-country" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="travelDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length of Stay</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="7 days" data-testid="input-duration" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="travelParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Participants</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="20" data-testid="input-participants" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="sponsorsAthleticLeagues"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-athletic"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sponsors athletic leagues</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("sponsorsAthleticLeagues") && (
                    <>
                      <FormField
                        control={form.control}
                        name="athleticSports"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sports Played</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Basketball, Softball, Volleyball" data-testid="input-sports" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="athleticParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number and Age of Participants</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="50 participants, ages 18-65" data-testid="input-athletic-participants" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="requiresWaivers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-waivers"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Requires liability waivers from participants</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="hasSwimmingFacilities"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-swimming"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Uses swimming facilities</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasSwimmingFacilities") && (
                    <>
                      <FormField
                        control={form.control}
                        name="poolOwnership"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pool Ownership</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger data-testid="select-pool-ownership">
                                  <SelectValue placeholder="Select ownership" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="owned">Owned/Operated by Applicant</SelectItem>
                                  <SelectItem value="operated_by_other">Operated by Others</SelectItem>
                                  <SelectItem value="none">No Pool</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="hasCPRStaff"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-cpr"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>CPR certified staff present</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasLifeguards"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-lifeguards"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Lifeguards present</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="poolFenced"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-pool-fence"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Pool completely fenced with self-locking gate</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasDivingBoard"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-diving"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Diving board present</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasPoolSlide"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-slide"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Slide into pool</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="virginiaGraemeCompliant"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-virginia-graeme"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Compliant with Virginia Graeme Baker Pool and Spa Safety Act</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="hasPlayground"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-playground"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Own or have access to playground area</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasPlayground") && (
                    <>
                      <FormField
                        control={form.control}
                        name="playgroundFenced"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-playground-fence"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Playground area fenced</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="playgroundDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Playground Equipment and Surfaces</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Describe equipment and ground surfaces..." data-testid="textarea-playground" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}

              {currentStep === 5 && (
                <>
                  <FormField
                    control={form.control}
                    name="hasProfessionalLiability"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-professional-liability"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Current insurance includes Professional Liability</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasProfessionalLiability") && (
                    <>
                      <FormField
                        control={form.control}
                        name="professionalLiabilityLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Liability Limit</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="$1000000" data-testid="input-liability-limit" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="liabilityType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Liability Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="occurrence" id="occurrence" data-testid="radio-occurrence" />
                                  <label htmlFor="occurrence">Occurrence</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="claims_made" id="claims_made" data-testid="radio-claims-made" />
                                  <label htmlFor="claims_made">Claims Made</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="counselingTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Types of Counseling Performed</FormLabel>
                        <div className="space-y-2">
                          {["Alcohol", "Marriage", "Religious", "Drugs", "Pregnancy", "Other"].map((type) => (
                            <div key={type} className="flex flex-row items-start space-x-3 space-y-0">
                              <Checkbox
                                checked={field.value?.includes(type) || false}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), type]
                                    : field.value?.filter((v) => v !== type) || [];
                                  field.onChange(updatedValue);
                                }}
                                data-testid={`checkbox-counseling-${type.toLowerCase()}`}
                              />
                              <div className="space-y-1 leading-none">
                                <label>{type}</label>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clergyAccredited"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-clergy-accredited"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>All clergy completed degree at accredited theological seminary</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {!form.watch("clergyAccredited") && (
                    <FormField
                      control={form.control}
                      name="clergyTraining"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe Clergy Training</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe training undergone..." data-testid="textarea-clergy-training" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="verifiesCredentials"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-verifies-credentials"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Verifies license, education and credentials for counselors</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usesContractedCounselors"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-contracted-counselors"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Uses contracted counselors</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("usesContractedCounselors") && (
                    <FormField
                      control={form.control}
                      name="maintainsCertificates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-maintains-certificates"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Maintains certificates of malpractice liability insurance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Any additional information..." data-testid="textarea-comments" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold">Upload Supporting Documents</h3>
                    
                    <FormField
                      control={form.control}
                      name="photographsFront"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Front Photograph of Building</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-photo-front"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="photographsRear"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Rear Photograph of Building</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-photo-rear"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="financialDocuments"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Financial Documents</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-financial"
                            />
                          </FormControl>
                          <FormDescription>Latest audited financials or approved budget</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lossRuns"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Loss Runs</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-loss-runs"
                            />
                          </FormControl>
                          <FormDescription>3 years plus current partial</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalDocuments"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Additional Documents</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.xls,.xlsx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-additional"
                            />
                          </FormControl>
                          <FormDescription>Any other relevant documents</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-4">
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