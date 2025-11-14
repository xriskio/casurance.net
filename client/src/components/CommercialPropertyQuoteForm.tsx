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
import { CheckCircle, ChevronLeft, ChevronRight, Building2, Shield, Home, Car, Briefcase, FileText } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  // Step 1: General Information
  applicantName: z.string().min(2, "Property owner/manager name is required"),
  coName: z.string().optional(),
  websiteAddress: z.string().optional(),
  riskManagementContact: z.string().min(2, "Contact name is required"),
  contactPhone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 555-555-5555"),
  contactEmail: z.string().email("Invalid email address"),
  
  // Step 2: Property & Occupancy
  occupancyTypes: z.array(z.string()).min(1, "Select at least one occupancy type"),
  hasElevator: z.boolean(),
  numberOfElevators: z.string().optional(),
  elevatorMaintenanceAgreement: z.boolean().optional(),
  hasRestaurantBar: z.boolean(),
  hasAnsulSystem: z.boolean().optional(),
  hasServiceAgreement: z.boolean().optional(),
  
  // Step 3: Fire Protection & Safety
  smokeDetectorsCommon: z.enum(["hardwired", "battery", "na"]),
  smokeDetectorsUnits: z.enum(["hardwired", "battery", "both"]),
  hasCODetectors: z.boolean(),
  hasLocalFireAlarm: z.boolean(),
  hasCentralStationAlarm: z.boolean(),
  hasAnnunciatorPanel: z.boolean(),
  hasMasonryFirewalls: z.boolean(),
  unitsPerFirewall: z.string().optional(),
  has2HourFirewalls: z.boolean(),
  unitsPerFirewall2Hour: z.string().optional(),
  firewallsExtendToRoof: z.boolean(),
  firewallDescription: z.string().optional(),
  hasSprinklerSystem: z.boolean(),
  sprinklerType: z.enum(["nfpa13", "nfpa13r", "other"]).optional(),
  sprinklerCoverage: z.array(z.string()).optional(),
  
  // Step 4: Building Details
  roofMaterial: z.enum(["asphalt", "tile_clay", "tile_concrete", "metal", "wood", "flat_tar", "flat_membrane", "other"]),
  hasTLockShingles: z.boolean().optional(),
  roofManufacturer: z.string().optional(),
  roofProduct: z.string().optional(),
  roofWarrantyYears: z.string().optional(),
  yearLastRoofUpdate: z.string().optional(),
  roofInspectedAnnually: z.boolean(),
  roofInspectedBy: z.string().optional(),
  roofReplacementsScheduled: z.boolean(),
  roofReplacementDetails: z.string().optional(),
  hasIceShields: z.enum(["na", "yes", "no"]),
  iceShieldFeet: z.string().optional(),
  iceDammingHistory: z.enum(["na", "yes", "no"]),
  iceDammingCorrectiveActions: z.string().optional(),
  hvacInAttic: z.enum(["na", "yes", "no"]),
  dryersVentedToAttic: z.enum(["na", "yes", "no"]),
  
  // Step 5: Winter Weather & Risk Management  
  canMaintain45Degrees: z.enum(["yes", "no", "na"]),
  freezeProtectionMeasures: z.array(z.string()).optional(),
  hasAutomaticSprinkler: z.enum(["yes", "no", "na"]),
  sprinklerSystemType: z.enum(["wet", "dry", "both"]).optional(),
  percentageSprinklered: z.string().optional(),
  systemTestedLastYear: z.enum(["yes", "no", "na"]).optional(),
  alarmsToULMonitoring: z.enum(["yes", "no", "na"]).optional(),
  waterShutoffsMarked: z.enum(["yes", "no", "na"]),
  shutoffsExercisedAnnually: z.enum(["yes", "no", "na"]),
  staffQualifiedForShutoff: z.enum(["yes", "no", "na"]),
  hasAutomaticWaterShutoff: z.enum(["yes", "no", "na"]),
  hasVacantSpaceProcess: z.enum(["yes", "no", "na"]),
  
  // Step 6: Additional Information
  additionalComments: z.string().optional(),
  // Files
  rentRolls: z.instanceof(File).optional(),
  leaseAgreements: z.instanceof(File).optional(),
  contractSamples: z.instanceof(File).optional(),
  lossRuns: z.instanceof(File).optional(),
  additionalDocuments: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { title: "General Information", icon: Building2 },
  { title: "Property & Occupancy", icon: Home },
  { title: "Fire Protection & Safety", icon: Shield },
  { title: "Building Details", icon: Building2 },
  { title: "Winter Weather & Risk", icon: Shield },
  { title: "Additional Information", icon: FileText },
];

const occupancyOptions = [
  "Bank",
  "Bar/Tavern/Night Club",
  "Gas Station",
  "Hotel/Motel",
  "Indoor Shopping Mall",
  "Land",
  "Manufacturing/Industrial",
  "Medical Facility",
  "Mercantile-Single Occupant",
  "Nursing Home/Group Home/Assisted Living",
  "Offices",
  "Outdoor Market",
  "Residential Parking Garage",
  "Restaurant",
  "Strip Mall",
  "Other"
];

const freezeProtectionOptions = [
  "Temperature monitoring and remote heating control",
  "PHLYSense",
  "Other water detection/notification/alarm system",
  "Backup electrical generator",
  "Insulation around water pipes",
  "Heat tracing for water pipes",
  "Antifreeze fire sprinkler system",
  "Space heaters in cold areas",
];

const sprinklerCoverageOptions = [
  "Entire Building",
  "Units",
  "Common Areas",
  "Attic",
  "Basement",
  "Garage"
];

export default function CommercialPropertyQuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      coName: "",
      websiteAddress: "",
      riskManagementContact: "",
      contactPhone: "",
      contactEmail: "",
      occupancyTypes: [],
      hasElevator: false,
      hasRestaurantBar: false,
      smokeDetectorsCommon: "hardwired",
      smokeDetectorsUnits: "hardwired",
      hasCODetectors: true,
      hasLocalFireAlarm: true,
      hasCentralStationAlarm: false,
      hasAnnunciatorPanel: false,
      hasMasonryFirewalls: false,
      has2HourFirewalls: false,
      firewallsExtendToRoof: false,
      hasSprinklerSystem: false,
      roofMaterial: "asphalt",
      roofInspectedAnnually: true,
      roofReplacementsScheduled: false,
      hasIceShields: "na",
      iceDammingHistory: "na",
      hvacInAttic: "na",
      dryersVentedToAttic: "na",
      canMaintain45Degrees: "yes",
      hasAutomaticSprinkler: "no",
      waterShutoffsMarked: "yes",
      shutoffsExercisedAnnually: "yes",
      staffQualifiedForShutoff: "yes",
      hasAutomaticWaterShutoff: "no",
      hasVacantSpaceProcess: "yes",
      freezeProtectionMeasures: [],
      sprinklerCoverage: [],
      additionalComments: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/quote-requests", {
        ...data,
        type: "commercial_property",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with your commercial property insurance quote.",
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
        return ['applicantName', 'riskManagementContact', 'contactPhone', 'contactEmail'];
      case 1:
        return ['occupancyTypes'];
      case 2:
        return ['smokeDetectorsCommon', 'smokeDetectorsUnits'];
      case 3:
        return ['roofMaterial'];
      case 4:
        return ['canMaintain45Degrees'];
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
              Thank you for requesting a commercial property insurance quote. Our team will review your information and contact you within 24 hours.
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
                        <FormLabel>Property Owner/Manager Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="ABC Property Management LLC" data-testid="input-applicant-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>C/O (if applicable)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Optional" data-testid="input-co-name" />
                        </FormControl>
                        <FormMessage />
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
                          <Input {...field} placeholder="https://www.yourproperty.com" data-testid="input-website" />
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
                          <FormLabel>Cell Phone</FormLabel>
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="contact@property.com" data-testid="input-email" />
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
                    name="occupancyTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Occupancy (Check all that apply)</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {occupancyOptions.map((type) => (
                            <div key={type} className="flex flex-row items-start space-x-3 space-y-0">
                              <Checkbox
                                checked={field.value?.includes(type) || false}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), type]
                                    : field.value?.filter((v) => v !== type) || [];
                                  field.onChange(updatedValue);
                                }}
                                data-testid={`checkbox-occupancy-${type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
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
                    name="hasElevator"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-elevator"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Is there an elevator?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasElevator") && (
                    <>
                      <FormField
                        control={form.control}
                        name="numberOfElevators"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Elevators</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="2" data-testid="input-elevators" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="elevatorMaintenanceAgreement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-elevator-maintenance"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Elevator maintenance agreement with additional insured & hold harmless</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="hasRestaurantBar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-restaurant-bar"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Any restaurant or bar?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasRestaurantBar") && (
                    <>
                      <FormField
                        control={form.control}
                        name="hasAnsulSystem"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-ansul-system"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Ansul System?</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasServiceAgreement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-service-agreement"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Service Agreement?</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="smokeDetectorsCommon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoke Detectors in Common Areas</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hardwired" id="common-hardwired" data-testid="radio-common-hardwired" />
                              <label htmlFor="common-hardwired">Hardwired</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="battery" id="common-battery" data-testid="radio-common-battery" />
                              <label htmlFor="common-battery">Battery</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="common-na" data-testid="radio-common-na" />
                              <label htmlFor="common-na">N/A (no common areas)</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smokeDetectorsUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoke Detectors in Units</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hardwired" id="units-hardwired" data-testid="radio-units-hardwired" />
                              <label htmlFor="units-hardwired">Hardwired</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="battery" id="units-battery" data-testid="radio-units-battery" />
                              <label htmlFor="units-battery">Battery</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both" id="units-both" data-testid="radio-units-both" />
                              <label htmlFor="units-both">Both</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCODetectors"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-co-detectors"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>CO Detectors?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasLocalFireAlarm"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-local-fire-alarm"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Local Fire Alarm?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCentralStationAlarm"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-central-station"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Central Station Fire Alarm?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAnnunciatorPanel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-annunciator"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Annunciator Panel?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasMasonryFirewalls"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-masonry-firewalls"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Are there masonry firewalls?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasMasonryFirewalls") && (
                    <FormField
                      control={form.control}
                      name="unitsPerFirewall"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of units per firewall</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="4" data-testid="input-units-per-firewall" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="has2HourFirewalls"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-2hour-firewalls"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Are there 2-hour firewalls?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("has2HourFirewalls") && (
                    <FormField
                      control={form.control}
                      name="unitsPerFirewall2Hour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of units per 2-hour firewall</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="4" data-testid="input-units-per-2hour" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="firewallsExtendToRoof"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-firewalls-to-roof"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Do all firewalls extend to underside of roof?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {!form.watch("firewallsExtendToRoof") && (form.watch("hasMasonryFirewalls") || form.watch("has2HourFirewalls")) && (
                    <FormField
                      control={form.control}
                      name="firewallDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please describe firewall configuration</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe firewall details..." data-testid="textarea-firewall" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasSprinklerSystem"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-sprinkler"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Does Applicant have a sprinkler system?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasSprinklerSystem") && (
                    <>
                      <FormField
                        control={form.control}
                        name="sprinklerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of sprinkler system</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="nfpa13" id="nfpa13" data-testid="radio-nfpa13" />
                                  <label htmlFor="nfpa13">NFPA 13</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="nfpa13r" id="nfpa13r" data-testid="radio-nfpa13r" />
                                  <label htmlFor="nfpa13r">NFPA 13R</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id="other" data-testid="radio-other" />
                                  <label htmlFor="other">Other</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sprinklerCoverage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Areas of Coverage</FormLabel>
                            <div className="grid grid-cols-2 gap-2">
                              {sprinklerCoverageOptions.map((area) => (
                                <div key={area} className="flex flex-row items-start space-x-3 space-y-0">
                                  <Checkbox
                                    checked={field.value?.includes(area) || false}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...(field.value || []), area]
                                        : field.value?.filter((v) => v !== area) || [];
                                      field.onChange(updatedValue);
                                    }}
                                    data-testid={`checkbox-coverage-${area.toLowerCase().replace(/\s+/g, '-')}`}
                                  />
                                  <div className="space-y-1 leading-none">
                                    <label>{area}</label>
                                  </div>
                                </div>
                              ))}
                            </div>
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
                    name="roofMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roof Material</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger data-testid="select-roof-material">
                              <SelectValue placeholder="Select roof material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asphalt">Asphalt/Composition Shingle</SelectItem>
                              <SelectItem value="tile_clay">Tile (clay)</SelectItem>
                              <SelectItem value="tile_concrete">Tile (concrete)</SelectItem>
                              <SelectItem value="metal">Metal</SelectItem>
                              <SelectItem value="wood">Wood Shake/Shingle</SelectItem>
                              <SelectItem value="flat_tar">Flat (tar and gravel)</SelectItem>
                              <SelectItem value="flat_membrane">Flat (membrane)</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("roofMaterial") === "asphalt" && (
                    <FormField
                      control={form.control}
                      name="hasTLockShingles"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-tlock"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Are any T-lock shingles used?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="roofManufacturer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roof Manufacturer</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="GAF" data-testid="input-roof-manufacturer" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="roofProduct"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roof Product</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Timberline HD" data-testid="input-roof-product" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="roofWarrantyYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roof Warranty (years)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="30" data-testid="input-warranty" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearLastRoofUpdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Last Roof Update</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2020" data-testid="input-last-update" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="roofInspectedAnnually"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-annual-inspection"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Are roofs inspected annually?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("roofInspectedAnnually") && (
                    <FormField
                      control={form.control}
                      name="roofInspectedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inspected by whom?</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Licensed roofing contractor" data-testid="input-inspected-by" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="roofReplacementsScheduled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-replacements-scheduled"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Are roof replacements scheduled?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("roofReplacementsScheduled") && (
                    <FormField
                      control={form.control}
                      name="roofReplacementDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Replacement Details/Schedule</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Provide details or attach replacement schedule..." data-testid="textarea-replacement" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasIceShields"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do the roofs have ice shields installed?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="ice-na" data-testid="radio-ice-na" />
                              <label htmlFor="ice-na">N/A</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="ice-yes" data-testid="radio-ice-yes" />
                              <label htmlFor="ice-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="ice-no" data-testid="radio-ice-no" />
                              <label htmlFor="ice-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasIceShields") === "yes" && (
                    <FormField
                      control={form.control}
                      name="iceShieldFeet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How many feet?</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="6" data-testid="input-ice-feet" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="iceDammingHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any ice damming history?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="dam-na" data-testid="radio-dam-na" />
                              <label htmlFor="dam-na">N/A</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="dam-yes" data-testid="radio-dam-yes" />
                              <label htmlFor="dam-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="dam-no" data-testid="radio-dam-no" />
                              <label htmlFor="dam-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("iceDammingHistory") === "yes" && (
                    <FormField
                      control={form.control}
                      name="iceDammingCorrectiveActions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Corrective actions taken</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe corrective actions..." data-testid="textarea-corrective" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hvacInAttic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any HVAC equipment in the attic space?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="hvac-na" data-testid="radio-hvac-na" />
                              <label htmlFor="hvac-na">N/A</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="hvac-yes" data-testid="radio-hvac-yes" />
                              <label htmlFor="hvac-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="hvac-no" data-testid="radio-hvac-no" />
                              <label htmlFor="hvac-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dryersVentedToAttic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are clothes dryers vented into attic space?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="dryers-na" data-testid="radio-dryers-na" />
                              <label htmlFor="dryers-na">N/A</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="dryers-yes" data-testid="radio-dryers-yes" />
                              <label htmlFor="dryers-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="dryers-no" data-testid="radio-dryers-no" />
                              <label htmlFor="dryers-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="canMaintain45Degrees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Can all areas with water lines be maintained at 45°F or higher?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="temp-yes" data-testid="radio-temp-yes" />
                              <label htmlFor="temp-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="temp-no" data-testid="radio-temp-no" />
                              <label htmlFor="temp-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="temp-na" data-testid="radio-temp-na" />
                              <label htmlFor="temp-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Including sprinkler riser rooms, attics, crawl spaces, and stairwells with water lines
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("canMaintain45Degrees") === "no" && (
                    <FormField
                      control={form.control}
                      name="freezeProtectionMeasures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select all freeze protection measures in place</FormLabel>
                          <div className="space-y-2">
                            {freezeProtectionOptions.map((measure) => (
                              <div key={measure} className="flex flex-row items-start space-x-3 space-y-0">
                                <Checkbox
                                  checked={field.value?.includes(measure) || false}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), measure]
                                      : field.value?.filter((v) => v !== measure) || [];
                                    field.onChange(updatedValue);
                                  }}
                                  data-testid={`checkbox-freeze-${measure.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20)}`}
                                />
                                <div className="space-y-1 leading-none">
                                  <label>{measure}</label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasAutomaticSprinkler"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is the building provided with an Automatic Fire Sprinkler System?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="sprinkler-yes" data-testid="radio-sprinkler-yes" />
                              <label htmlFor="sprinkler-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="sprinkler-no" data-testid="radio-sprinkler-no" />
                              <label htmlFor="sprinkler-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="sprinkler-na" data-testid="radio-sprinkler-na" />
                              <label htmlFor="sprinkler-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasAutomaticSprinkler") === "yes" && (
                    <>
                      <FormField
                        control={form.control}
                        name="sprinklerSystemType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What type of sprinkler system is installed?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="wet" id="wet-pipe" data-testid="radio-wet-pipe" />
                                  <label htmlFor="wet-pipe">Wet-Pipe</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="dry" id="dry-pipe" data-testid="radio-dry-pipe" />
                                  <label htmlFor="dry-pipe">Dry-Pipe</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="both" id="both-pipe" data-testid="radio-both-pipe" />
                                  <label htmlFor="both-pipe">Both</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="percentageSprinklered"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Percentage (%) of building sprinklered</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="100" data-testid="input-percentage-sprinklered" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="systemTestedLastYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System tested & inspected within past 12 months?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="tested-yes" data-testid="radio-tested-yes" />
                                  <label htmlFor="tested-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="tested-no" data-testid="radio-tested-no" />
                                  <label htmlFor="tested-no">No</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="na" id="tested-na" data-testid="radio-tested-na" />
                                  <label htmlFor="tested-na">N/A</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              Including formal winterization review by qualified sprinkler contractor
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="alarmsToULMonitoring"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are alarms tied to 24 hour UL listed monitoring company?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="ul-yes" data-testid="radio-ul-yes" />
                                  <label htmlFor="ul-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="ul-no" data-testid="radio-ul-no" />
                                  <label htmlFor="ul-no">No</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="na" id="ul-na" data-testid="radio-ul-na" />
                                  <label htmlFor="ul-na">N/A</label>
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
                    name="waterShutoffsMarked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are water shutoff valves marked and readily accessible?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="shutoffs-yes" data-testid="radio-shutoffs-yes" />
                              <label htmlFor="shutoffs-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="shutoffs-no" data-testid="radio-shutoffs-no" />
                              <label htmlFor="shutoffs-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="shutoffs-na" data-testid="radio-shutoffs-na" />
                              <label htmlFor="shutoffs-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>Domestic and AS water lines</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shutoffsExercisedAnnually"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are water shutoff valves exercised at least annually?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="exercised-yes" data-testid="radio-exercised-yes" />
                              <label htmlFor="exercised-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="exercised-no" data-testid="radio-exercised-no" />
                              <label htmlFor="exercised-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="exercised-na" data-testid="radio-exercised-na" />
                              <label htmlFor="exercised-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>Closed and reopened</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="staffQualifiedForShutoff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is staff qualified to shut off water main during/off hours?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="qualified-yes" data-testid="radio-qualified-yes" />
                              <label htmlFor="qualified-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="qualified-no" data-testid="radio-qualified-no" />
                              <label htmlFor="qualified-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="qualified-na" data-testid="radio-qualified-na" />
                              <label htmlFor="qualified-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAutomaticWaterShutoff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water flow detection, notification and automatic shutoff for domestic lines?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="automatic-yes" data-testid="radio-automatic-yes" />
                              <label htmlFor="automatic-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="automatic-no" data-testid="radio-automatic-no" />
                              <label htmlFor="automatic-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="automatic-na" data-testid="radio-automatic-na" />
                              <label htmlFor="automatic-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasVacantSpaceProcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formal process to turn off and drain water lines for unused/vacant spaces?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="vacant-yes" data-testid="radio-vacant-yes" />
                              <label htmlFor="vacant-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="vacant-no" data-testid="radio-vacant-no" />
                              <label htmlFor="vacant-no">No</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="na" id="vacant-na" data-testid="radio-vacant-na" />
                              <label htmlFor="vacant-na">N/A</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 5 && (
                <>
                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Any additional information about your property..." data-testid="textarea-comments" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold">Upload Supporting Documents</h3>
                    
                    <FormField
                      control={form.control}
                      name="rentRolls"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Current Rent Rolls</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.xls,.xlsx,.doc,.docx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-rent-rolls"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leaseAgreements"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Sample Copy of Lease Agreements</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-lease"
                            />
                          </FormControl>
                          <FormDescription>Insurance provisions within lease agreements</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contractSamples"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Sample Copy of Contracts</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              data-testid="file-contracts"
                            />
                          </FormControl>
                          <FormDescription>Insurance provisions with service contractors, property managers</FormDescription>
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
                          <FormDescription>3 full years plus most recent partial year</FormDescription>
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