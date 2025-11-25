import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import QuickQuoteForm from "./QuickQuoteForm";
import { SERVICE_STATES } from "@shared/constants/states";

interface Vehicle {
  year: string;
  make: string;
  model: string;
  vin: string;
  statedValue: string;
  seatingCapacity: string;
  liftOrRamp: string;
  meterInstalled: string;
  vehicleClass: string;
}

interface Driver {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseNumber: string;
  yearsExperience: string;
  trafficViolations: string;
}

export default function TaxiQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Business Profile & Regulatory Information
    companyName: "",
    fein: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessWebsite: "",
    mailingStreet: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    yearsInBusiness: "",
    yearsUnderCurrentOwnership: "",
    iccPucDocketNumber: "",
    associationTLPA: false,
    associationNLA: false,
    associationOther: "",
    subsidiariesAffiliatedCompanies: "",
    tlcLicenseNumbers: "",
    medallionNumbers: "",

    // Step 2: Coverage Selection
    autoLiabilityLimit: "$1,000,000",
    umCoverage: "",
    uimCoverage: "",
    medicalPayments: "",
    pipCoverage: "",
    physicalDamageDeductible: "$1,000",
    hiredNonOwnedCoverage: "",

    // Step 3: Operations & Dispatch Mix
    descriptionOfOperations: "",
    dispatchPercentage: "",
    dispatchSharedWithOtherCompany: "",
    tncParticipation: "no",
    tncPlatformUberBlack: false,
    tncPlatformLyftLux: false,
    tncPlatformVia: false,
    tncPlatformOther: "",
    tripTypeAirport: "",
    tripTypeCorporate: "",
    tripTypeWedding: "",
    tripTypeProm: "",
    tripTypeNightOut: "",
    tripTypeFuneral: "",
    tripTypeNonEmergencyMedical: "",
    tripTypeDisabledHandicapped: "",
    tripTypeScheduledShuttle: "",
    tripTypeOther: "",
    serviceModelWheelchair: "",
    serviceModelStretcher: "",
    serviceModelAmbulatory: "",
    serviceTypeCurbToCurb: "",
    serviceTypeDoorToDoor: "",
    serviceTypeDoorThroughDoor: "",
    radiusOfOperation0to50: "",
    radiusOfOperation51to200: "",
    radiusOfOperation200Plus: "",
    acceptUnscheduledPassengers: "",
    preArrangedBasisOnly: "",
    majorMetropolitanAreasServed: "",
    contractsWithOrganizations: "",

    // Step 4: Fleet & Vehicle Information
    numberOfVehiclesOwned: "",
    numberOfShifts: "",
    allVehiclesTitledToInsured: "",
    writtenMaintenanceProgram: "",
    serviceSchedule: "3000miles",
    serviceScheduleOther: "",
    projectedAnnualFleetMileage: "",
    dailyPreTripInspections: "",
    maintenanceRecordsReviewFrequency: "",
    platesRegisteredTaxi: "",
    platesRegisteredLimo8OrLess: "",
    platesRegisteredStretchLimo9Plus: "",
    platesRegisteredAirportService: "",
    vehiclesWithMeters: "",
    equipmentLiftOutRamps: "",
    equipmentMechanicalLifts: "",
    equipmentWheelchairRestraint: "",
    equipmentAutoBrakingSensor: "",
    equipmentGPS: "",
    equipmentInVehicleCamera: "",
    vehiclesStoredOvernightOnPremises: "",
    guardDogsOnPremises: "",

    // Step 5: Driver Information & Safety
    currentNumberOfDrivers: "",
    driverClassification: "employees",
    workersCompForAllDrivers: "",
    minimumDriverAge: "",
    minimumYearsDrivingExperience: "",
    writtenApplicationRequired: "",
    reviewMVRsBeforeHiring: "",
    mvrCheckFrequency: "annually",
    driverTrainingProgram: "",
    regularSafetyMeetings: "",
    safetyMeetingFrequency: "",
    driversTrainedAssistElderlyHandicapped: "",
    drugTestingPolicy: "",
    drugTestingPolicyDescription: "",
    postAccidentDrugTesting: "",
    postAccidentDrugTestingDescription: "",
    driversTakeVehiclesHome: "",
    driverIncentiveProgram: "",
    driverIncentiveProgramDescription: "",
    accidentInvestigationProcedures: "",
    driverDisciplinaryProcedures: "",

    // Step 6: Prior Insurance & Loss History
    cancelledOrRefusedRenewal: "",
    cancellationExplanation: "",
    priorInsuranceCarrier: "",
    priorPolicyEffectiveDate: "",
    priorPolicyExpirationDate: "",
    priorLiabilityLimits: "",
    priorAutoLiabilityPremium: "",
    priorPhysicalDamagePremium: "",
    subcontractWorkToOthers: "",
    certificatesOfInsuranceObtained: "",
    limitsRequiredFromSubcontractors: "",
    additionalComments: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      year: "",
      make: "",
      model: "",
      vin: "",
      statedValue: "",
      seatingCapacity: "",
      liftOrRamp: "no",
      meterInstalled: "no",
      vehicleClass: "sedan",
    }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      licenseNumber: "",
      yearsExperience: "",
      trafficViolations: "",
    }
  ]);

  const { toast } = useToast();

  const addVehicle = () => {
    if (vehicles.length >= 10) {
      toast({
        title: "Vehicle Limit Reached",
        description: "You can add up to 10 vehicles maximum.",
        variant: "destructive"
      });
      return;
    }
    setVehicles([...vehicles, {
      year: "",
      make: "",
      model: "",
      vin: "",
      statedValue: "",
      seatingCapacity: "",
      liftOrRamp: "no",
      meterInstalled: "no",
      vehicleClass: "sedan",
    }]);
  };

  const removeVehicle = (index: number) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter((_, i) => i !== index));
    }
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const addDriver = () => {
    if (drivers.length >= 10) {
      toast({
        title: "Driver Limit Reached",
        description: "You can add up to 10 drivers maximum.",
        variant: "destructive"
      });
      return;
    }
    setDrivers([...drivers, {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      licenseNumber: "",
      yearsExperience: "",
      trafficViolations: "",
    }]);
  };

  const removeDriver = (index: number) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter((_, i) => i !== index));
    }
  };

  const updateDriver = (index: number, field: keyof Driver, value: string) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const validatePercentages = (fields: string[], errorMessage: string): boolean => {
    const total = fields.reduce((sum, field) => {
      const value = parseFloat(formData[field as keyof typeof formData] as string) || 0;
      return sum + value;
    }, 0);
    
    if (total !== 100 && total !== 0) {
      toast({
        title: "Validation Error",
        description: `${errorMessage} (Current total: ${total}%)`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.companyName || !formData.email || !formData.phone) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in Company Name, Email, and Phone.",
          variant: "destructive"
        });
        return false;
      }
    }
    
    if (currentStep === 3) {
      // Validate Trip Type Percentages
      const tripTypeFields = [
        "tripTypeAirport", "tripTypeCorporate", "tripTypeWedding", "tripTypeProm",
        "tripTypeNightOut", "tripTypeFuneral", "tripTypeNonEmergencyMedical",
        "tripTypeDisabledHandicapped", "tripTypeScheduledShuttle", "tripTypeOther"
      ];
      if (!validatePercentages(tripTypeFields, "Trip Type percentages must total 100%")) {
        return false;
      }

      // Validate Service Model Percentages
      const serviceModelFields = ["serviceModelWheelchair", "serviceModelStretcher", "serviceModelAmbulatory"];
      if (!validatePercentages(serviceModelFields, "Service Model percentages must total 100%")) {
        return false;
      }

      // Validate Service Type Percentages
      const serviceTypeFields = ["serviceTypeCurbToCurb", "serviceTypeDoorToDoor", "serviceTypeDoorThroughDoor"];
      if (!validatePercentages(serviceTypeFields, "Service Type percentages must total 100%")) {
        return false;
      }

      // Validate Radius of Operation Percentages
      const radiusFields = ["radiusOfOperation0to50", "radiusOfOperation51to200", "radiusOfOperation200Plus"];
      if (!validatePercentages(radiusFields, "Radius of Operation percentages must total 100%")) {
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("/api/taxi-quote", "POST", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you shortly with your taxi insurance quote.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = () => {
    if (!validateStep(step)) {
      return;
    }

    const payload = {
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      mailingAddress: `${formData.mailingStreet}, ${formData.mailingCity}, ${formData.mailingState} ${formData.mailingZip}`,
      yearsInBusiness: formData.yearsInBusiness,
      fleetSize: formData.numberOfVehiclesOwned,
      autoLiabilityLimit: formData.autoLiabilityLimit,
      dispatchPercentage: formData.dispatchPercentage,
      tncParticipation: formData.tncParticipation,
      payload: {
        formData,
        vehicles,
        drivers
      }
    };
    submitMutation.mutate(payload);
  };

  const totalSteps = 6;

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Quote Request Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for requesting a taxi/black car insurance quote. One of our licensed agents will review your information and contact you within 24-48 hours with a competitive quote.
          </p>
          <Button onClick={() => window.location.href = "/"} data-testid="button-return-home">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    {/* Main Comprehensive Application Form */}
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Taxi Insurance / Uber Black / Black Car Application</CardTitle>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-foreground">
              {step === 1 && "Business Profile & Regulatory Information"}
              {step === 2 && "Coverage Selection"}
              {step === 3 && "Operations & Dispatch Mix"}
              {step === 4 && "Fleet & Vehicle Information"}
              {step === 5 && "Driver Information & Safety"}
              {step === 6 && "Prior Insurance & Loss History"}
            </span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Step 1: Business Profile & Regulatory Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Company/Insured Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Company Name"
                    required
                    data-testid="input-company-name"
                  />
                </div>

                <div>
                  <Label htmlFor="fein">FEIN</Label>
                  <Input
                    id="fein"
                    value={formData.fein}
                    onChange={(e) => setFormData({ ...formData, fein: e.target.value })}
                    placeholder="XX-XXXXXXX"
                    data-testid="input-fein"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Contact Person Name"
                    data-testid="input-contact-person"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 555-5555"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="businessWebsite">Business Website</Label>
                  <Input
                    id="businessWebsite"
                    type="url"
                    value={formData.businessWebsite}
                    onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
                    placeholder="https://www.example.com"
                    data-testid="input-business-website"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Mailing Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="mailingStreet">Street Address</Label>
                  <Input
                    id="mailingStreet"
                    value={formData.mailingStreet}
                    onChange={(e) => setFormData({ ...formData, mailingStreet: e.target.value })}
                    placeholder="Street Address"
                    data-testid="input-mailing-street"
                  />
                </div>

                <div>
                  <Label htmlFor="mailingCity">City</Label>
                  <Input
                    id="mailingCity"
                    value={formData.mailingCity}
                    onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
                    placeholder="City"
                    data-testid="input-mailing-city"
                  />
                </div>

                <div>
                  <Label htmlFor="mailingState">State</Label>
                  <Select
                    value={formData.mailingState}
                    onValueChange={(value) => setFormData({ ...formData, mailingState: value })}
                  >
                    <SelectTrigger data-testid="select-mailing-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mailingZip">ZIP Code</Label>
                  <Input
                    id="mailingZip"
                    value={formData.mailingZip}
                    onChange={(e) => setFormData({ ...formData, mailingZip: e.target.value })}
                    placeholder="ZIP Code"
                    data-testid="input-mailing-zip"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Business History & Licensing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsInBusiness">Years in Business</Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    value={formData.yearsInBusiness}
                    onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                    placeholder="Years"
                    data-testid="input-years-in-business"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsUnderCurrentOwnership">Years Under Current Ownership</Label>
                  <Input
                    id="yearsUnderCurrentOwnership"
                    type="number"
                    value={formData.yearsUnderCurrentOwnership}
                    onChange={(e) => setFormData({ ...formData, yearsUnderCurrentOwnership: e.target.value })}
                    placeholder="Years"
                    data-testid="input-years-under-current-ownership"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="iccPucDocketNumber">Operating Authority: ICC/PUC Docket Number</Label>
                  <Input
                    id="iccPucDocketNumber"
                    value={formData.iccPucDocketNumber}
                    onChange={(e) => setFormData({ ...formData, iccPucDocketNumber: e.target.value })}
                    placeholder="Docket Number"
                    data-testid="input-icc-puc-docket"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Association Memberships</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="associationTLPA"
                        checked={formData.associationTLPA}
                        onCheckedChange={(checked) => setFormData({ ...formData, associationTLPA: checked as boolean })}
                        data-testid="checkbox-association-tlpa"
                      />
                      <Label htmlFor="associationTLPA" className="cursor-pointer font-normal">TLPA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="associationNLA"
                        checked={formData.associationNLA}
                        onCheckedChange={(checked) => setFormData({ ...formData, associationNLA: checked as boolean })}
                        data-testid="checkbox-association-nla"
                      />
                      <Label htmlFor="associationNLA" className="cursor-pointer font-normal">NLA</Label>
                    </div>
                    <div>
                      <Label htmlFor="associationOther">Other</Label>
                      <Input
                        id="associationOther"
                        value={formData.associationOther}
                        onChange={(e) => setFormData({ ...formData, associationOther: e.target.value })}
                        placeholder="Other associations"
                        data-testid="input-association-other"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="subsidiariesAffiliatedCompanies">Subsidiaries/Affiliated Companies</Label>
                  <Textarea
                    id="subsidiariesAffiliatedCompanies"
                    value={formData.subsidiariesAffiliatedCompanies}
                    onChange={(e) => setFormData({ ...formData, subsidiariesAffiliatedCompanies: e.target.value })}
                    placeholder="List any subsidiaries or affiliated companies"
                    rows={3}
                    data-testid="textarea-subsidiaries"
                  />
                </div>

                <div>
                  <Label htmlFor="tlcLicenseNumbers">TLC License Numbers (if applicable)</Label>
                  <Input
                    id="tlcLicenseNumbers"
                    value={formData.tlcLicenseNumbers}
                    onChange={(e) => setFormData({ ...formData, tlcLicenseNumbers: e.target.value })}
                    placeholder="TLC License Numbers"
                    data-testid="input-tlc-license"
                  />
                </div>

                <div>
                  <Label htmlFor="medallionNumbers">Medallion Numbers (if applicable)</Label>
                  <Input
                    id="medallionNumbers"
                    value={formData.medallionNumbers}
                    onChange={(e) => setFormData({ ...formData, medallionNumbers: e.target.value })}
                    placeholder="Medallion Numbers"
                    data-testid="input-medallion-numbers"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Coverage Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Auto Liability Coverage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="autoLiabilityLimit">Auto Liability (Combined Single Limit) *</Label>
                  <Select
                    value={formData.autoLiabilityLimit}
                    onValueChange={(value) => setFormData({ ...formData, autoLiabilityLimit: value })}
                  >
                    <SelectTrigger id="autoLiabilityLimit" data-testid="select-auto-liability-limit">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$750,000">$750,000</SelectItem>
                      <SelectItem value="$1,000,000">$1,000,000</SelectItem>
                      <SelectItem value="$1,500,000">$1,500,000</SelectItem>
                      <SelectItem value="$2,000,000">$2,000,000</SelectItem>
                      <SelectItem value="$3,000,000">$3,000,000</SelectItem>
                      <SelectItem value="$5,000,000">$5,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="umCoverage">UM (Uninsured Motorist)</Label>
                  <Input
                    id="umCoverage"
                    value={formData.umCoverage}
                    onChange={(e) => setFormData({ ...formData, umCoverage: e.target.value })}
                    placeholder="Coverage amount"
                    data-testid="input-um-coverage"
                  />
                </div>

                <div>
                  <Label htmlFor="uimCoverage">UIM (Underinsured Motorist)</Label>
                  <Input
                    id="uimCoverage"
                    value={formData.uimCoverage}
                    onChange={(e) => setFormData({ ...formData, uimCoverage: e.target.value })}
                    placeholder="Coverage amount"
                    data-testid="input-uim-coverage"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalPayments">Medical Payments</Label>
                  <Input
                    id="medicalPayments"
                    value={formData.medicalPayments}
                    onChange={(e) => setFormData({ ...formData, medicalPayments: e.target.value })}
                    placeholder="Coverage amount"
                    data-testid="input-medical-payments"
                  />
                </div>

                <div>
                  <Label htmlFor="pipCoverage">PIP (Personal Injury Protection)</Label>
                  <Input
                    id="pipCoverage"
                    value={formData.pipCoverage}
                    onChange={(e) => setFormData({ ...formData, pipCoverage: e.target.value })}
                    placeholder="Coverage amount"
                    data-testid="input-pip-coverage"
                  />
                </div>

                <div>
                  <Label htmlFor="physicalDamageDeductible">Physical Damage Deductible</Label>
                  <Select
                    value={formData.physicalDamageDeductible}
                    onValueChange={(value) => setFormData({ ...formData, physicalDamageDeductible: value })}
                  >
                    <SelectTrigger id="physicalDamageDeductible" data-testid="select-physical-damage-deductible">
                      <SelectValue placeholder="Select deductible" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500">$500</SelectItem>
                      <SelectItem value="$1,000">$1,000</SelectItem>
                      <SelectItem value="$2,500">$2,500</SelectItem>
                      <SelectItem value="$5,000">$5,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hiredNonOwnedCoverage">Hired/Non-Owned Auto Coverage</Label>
                  <Input
                    id="hiredNonOwnedCoverage"
                    value={formData.hiredNonOwnedCoverage}
                    onChange={(e) => setFormData({ ...formData, hiredNonOwnedCoverage: e.target.value })}
                    placeholder="Coverage amount"
                    data-testid="input-hired-non-owned"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Operations & Dispatch Mix */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Operations Overview</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="descriptionOfOperations">Description of Operations</Label>
                  <Textarea
                    id="descriptionOfOperations"
                    value={formData.descriptionOfOperations}
                    onChange={(e) => setFormData({ ...formData, descriptionOfOperations: e.target.value })}
                    placeholder="Describe your taxi/black car operations"
                    rows={4}
                    data-testid="textarea-description-operations"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dispatchPercentage">Dispatch Percentage (%)</Label>
                    <Input
                      id="dispatchPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.dispatchPercentage}
                      onChange={(e) => setFormData({ ...formData, dispatchPercentage: e.target.value })}
                      placeholder="0-100"
                      data-testid="input-dispatch-percentage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dispatchSharedWithOtherCompany">Are dispatch services shared with another company?</Label>
                    <Select
                      value={formData.dispatchSharedWithOtherCompany}
                      onValueChange={(value) => setFormData({ ...formData, dispatchSharedWithOtherCompany: value })}
                    >
                      <SelectTrigger id="dispatchSharedWithOtherCompany" data-testid="select-dispatch-shared">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">TNC Participation</h3>
              <div className="space-y-4">
                <div>
                  <Label>Do you use Uber/Lyft/Via or other TNC platforms?</Label>
                  <RadioGroup 
                    value={formData.tncParticipation} 
                    onValueChange={(value) => setFormData({ ...formData, tncParticipation: value })}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="tnc-yes" data-testid="radio-tnc-yes" />
                      <Label htmlFor="tnc-yes" className="cursor-pointer font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tnc-no" data-testid="radio-tnc-no" />
                      <Label htmlFor="tnc-no" className="cursor-pointer font-normal">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.tncParticipation === "yes" && (
                  <div className="pl-6 border-l-2 border-primary/20 space-y-3">
                    <Label>Which platforms do you use?</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tncUberBlack"
                          checked={formData.tncPlatformUberBlack}
                          onCheckedChange={(checked) => setFormData({ ...formData, tncPlatformUberBlack: checked as boolean })}
                          data-testid="checkbox-uber-black"
                        />
                        <Label htmlFor="tncUberBlack" className="cursor-pointer font-normal">Uber Black</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tncLyftLux"
                          checked={formData.tncPlatformLyftLux}
                          onCheckedChange={(checked) => setFormData({ ...formData, tncPlatformLyftLux: checked as boolean })}
                          data-testid="checkbox-lyft-lux"
                        />
                        <Label htmlFor="tncLyftLux" className="cursor-pointer font-normal">Lyft Lux</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tncVia"
                          checked={formData.tncPlatformVia}
                          onCheckedChange={(checked) => setFormData({ ...formData, tncPlatformVia: checked as boolean })}
                          data-testid="checkbox-via"
                        />
                        <Label htmlFor="tncVia" className="cursor-pointer font-normal">Via</Label>
                      </div>
                      <div>
                        <Label htmlFor="tncOther">Other Platform(s)</Label>
                        <Input
                          id="tncOther"
                          value={formData.tncPlatformOther}
                          onChange={(e) => setFormData({ ...formData, tncPlatformOther: e.target.value })}
                          placeholder="Specify other platforms"
                          data-testid="input-tnc-other"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Trip Type Breakdown (must total 100%)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tripTypeAirport">Airport (%)</Label>
                  <Input
                    id="tripTypeAirport"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeAirport}
                    onChange={(e) => setFormData({ ...formData, tripTypeAirport: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-airport"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeCorporate">Corporate (%)</Label>
                  <Input
                    id="tripTypeCorporate"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeCorporate}
                    onChange={(e) => setFormData({ ...formData, tripTypeCorporate: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-corporate"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeWedding">Wedding (%)</Label>
                  <Input
                    id="tripTypeWedding"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeWedding}
                    onChange={(e) => setFormData({ ...formData, tripTypeWedding: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-wedding"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeProm">Prom (%)</Label>
                  <Input
                    id="tripTypeProm"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeProm}
                    onChange={(e) => setFormData({ ...formData, tripTypeProm: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-prom"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeNightOut">Night-Out (%)</Label>
                  <Input
                    id="tripTypeNightOut"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeNightOut}
                    onChange={(e) => setFormData({ ...formData, tripTypeNightOut: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-night-out"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeFuneral">Funeral (%)</Label>
                  <Input
                    id="tripTypeFuneral"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeFuneral}
                    onChange={(e) => setFormData({ ...formData, tripTypeFuneral: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-funeral"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeNonEmergencyMedical">Non-Emergency Medical (%)</Label>
                  <Input
                    id="tripTypeNonEmergencyMedical"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeNonEmergencyMedical}
                    onChange={(e) => setFormData({ ...formData, tripTypeNonEmergencyMedical: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-medical"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeDisabledHandicapped">Disabled/Handicapped (%)</Label>
                  <Input
                    id="tripTypeDisabledHandicapped"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeDisabledHandicapped}
                    onChange={(e) => setFormData({ ...formData, tripTypeDisabledHandicapped: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-disabled"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeScheduledShuttle">Scheduled Shuttle Service (%)</Label>
                  <Input
                    id="tripTypeScheduledShuttle"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeScheduledShuttle}
                    onChange={(e) => setFormData({ ...formData, tripTypeScheduledShuttle: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-shuttle"
                  />
                </div>
                <div>
                  <Label htmlFor="tripTypeOther">Other (%)</Label>
                  <Input
                    id="tripTypeOther"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tripTypeOther}
                    onChange={(e) => setFormData({ ...formData, tripTypeOther: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-trip-other"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Service Model Breakdown (must total 100%)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="serviceModelWheelchair">Wheelchair (%)</Label>
                  <Input
                    id="serviceModelWheelchair"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceModelWheelchair}
                    onChange={(e) => setFormData({ ...formData, serviceModelWheelchair: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-service-wheelchair"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceModelStretcher">Stretcher (%)</Label>
                  <Input
                    id="serviceModelStretcher"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceModelStretcher}
                    onChange={(e) => setFormData({ ...formData, serviceModelStretcher: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-service-stretcher"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceModelAmbulatory">Ambulatory (%)</Label>
                  <Input
                    id="serviceModelAmbulatory"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceModelAmbulatory}
                    onChange={(e) => setFormData({ ...formData, serviceModelAmbulatory: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-service-ambulatory"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Service Type Breakdown (must total 100%)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="serviceTypeCurbToCurb">Curb-to-curb (%)</Label>
                  <Input
                    id="serviceTypeCurbToCurb"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceTypeCurbToCurb}
                    onChange={(e) => setFormData({ ...formData, serviceTypeCurbToCurb: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-type-curb-to-curb"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceTypeDoorToDoor">Door-to-door (%)</Label>
                  <Input
                    id="serviceTypeDoorToDoor"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceTypeDoorToDoor}
                    onChange={(e) => setFormData({ ...formData, serviceTypeDoorToDoor: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-type-door-to-door"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceTypeDoorThroughDoor">Door-through-door (%)</Label>
                  <Input
                    id="serviceTypeDoorThroughDoor"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.serviceTypeDoorThroughDoor}
                    onChange={(e) => setFormData({ ...formData, serviceTypeDoorThroughDoor: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-type-door-through-door"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Radius of Operation (must total 100%)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="radiusOfOperation0to50">0-50 Miles (%)</Label>
                  <Input
                    id="radiusOfOperation0to50"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.radiusOfOperation0to50}
                    onChange={(e) => setFormData({ ...formData, radiusOfOperation0to50: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-radius-0-50"
                  />
                </div>
                <div>
                  <Label htmlFor="radiusOfOperation51to200">51-200 Miles (%)</Label>
                  <Input
                    id="radiusOfOperation51to200"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.radiusOfOperation51to200}
                    onChange={(e) => setFormData({ ...formData, radiusOfOperation51to200: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-radius-51-200"
                  />
                </div>
                <div>
                  <Label htmlFor="radiusOfOperation200Plus">200+ Miles (%)</Label>
                  <Input
                    id="radiusOfOperation200Plus"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.radiusOfOperation200Plus}
                    onChange={(e) => setFormData({ ...formData, radiusOfOperation200Plus: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-radius-200-plus"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Service Area & Contracts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="acceptUnscheduledPassengers">Do you accept unscheduled passengers?</Label>
                  <Select
                    value={formData.acceptUnscheduledPassengers}
                    onValueChange={(value) => setFormData({ ...formData, acceptUnscheduledPassengers: value })}
                  >
                    <SelectTrigger id="acceptUnscheduledPassengers" data-testid="select-unscheduled-passengers">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="preArrangedBasisOnly">Are customers accepted on pre-arranged basis only?</Label>
                  <Select
                    value={formData.preArrangedBasisOnly}
                    onValueChange={(value) => setFormData({ ...formData, preArrangedBasisOnly: value })}
                  >
                    <SelectTrigger id="preArrangedBasisOnly" data-testid="select-pre-arranged-only">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="majorMetropolitanAreasServed">Major Metropolitan Areas Served</Label>
                  <Input
                    id="majorMetropolitanAreasServed"
                    value={formData.majorMetropolitanAreasServed}
                    onChange={(e) => setFormData({ ...formData, majorMetropolitanAreasServed: e.target.value })}
                    placeholder="e.g., New York, Los Angeles, Chicago"
                    data-testid="input-metro-areas"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="contractsWithOrganizations">Contracts with Organizations</Label>
                  <Textarea
                    id="contractsWithOrganizations"
                    value={formData.contractsWithOrganizations}
                    onChange={(e) => setFormData({ ...formData, contractsWithOrganizations: e.target.value })}
                    placeholder="List any contracts with hotels, corporations, or other organizations"
                    rows={3}
                    data-testid="textarea-contracts"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Fleet & Vehicle Information */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Fleet Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfVehiclesOwned">How many vehicles do you own?</Label>
                  <Input
                    id="numberOfVehiclesOwned"
                    type="number"
                    value={formData.numberOfVehiclesOwned}
                    onChange={(e) => setFormData({ ...formData, numberOfVehiclesOwned: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-vehicles-owned"
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfShifts">How many shifts do you run?</Label>
                  <Input
                    id="numberOfShifts"
                    type="number"
                    value={formData.numberOfShifts}
                    onChange={(e) => setFormData({ ...formData, numberOfShifts: e.target.value })}
                    placeholder="Number of shifts"
                    data-testid="input-shifts"
                  />
                </div>

                <div>
                  <Label htmlFor="allVehiclesTitledToInsured">Are all vehicles titled and registered to named insured?</Label>
                  <Select
                    value={formData.allVehiclesTitledToInsured}
                    onValueChange={(value) => setFormData({ ...formData, allVehiclesTitledToInsured: value })}
                  >
                    <SelectTrigger id="allVehiclesTitledToInsured" data-testid="select-vehicles-titled">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Maintenance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="writtenMaintenanceProgram">Written Maintenance Program?</Label>
                  <Select
                    value={formData.writtenMaintenanceProgram}
                    onValueChange={(value) => setFormData({ ...formData, writtenMaintenanceProgram: value })}
                  >
                    <SelectTrigger id="writtenMaintenanceProgram" data-testid="select-written-maintenance">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="serviceSchedule">Service Schedule</Label>
                  <Select
                    value={formData.serviceSchedule}
                    onValueChange={(value) => setFormData({ ...formData, serviceSchedule: value })}
                  >
                    <SelectTrigger id="serviceSchedule" data-testid="select-service-schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3000miles">Every 3,000 miles</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="semiannually">Semi-annually</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.serviceSchedule === "other" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="serviceScheduleOther">Specify Service Schedule</Label>
                    <Input
                      id="serviceScheduleOther"
                      value={formData.serviceScheduleOther}
                      onChange={(e) => setFormData({ ...formData, serviceScheduleOther: e.target.value })}
                      placeholder="Describe maintenance schedule"
                      data-testid="input-service-schedule-other"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="projectedAnnualFleetMileage">Projected Annual Fleet Mileage</Label>
                  <Input
                    id="projectedAnnualFleetMileage"
                    type="number"
                    value={formData.projectedAnnualFleetMileage}
                    onChange={(e) => setFormData({ ...formData, projectedAnnualFleetMileage: e.target.value })}
                    placeholder="Total miles"
                    data-testid="input-annual-mileage"
                  />
                </div>

                <div>
                  <Label htmlFor="dailyPreTripInspections">Daily/Pre-trip Inspections?</Label>
                  <Select
                    value={formData.dailyPreTripInspections}
                    onValueChange={(value) => setFormData({ ...formData, dailyPreTripInspections: value })}
                  >
                    <SelectTrigger id="dailyPreTripInspections" data-testid="select-daily-inspections">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="maintenanceRecordsReviewFrequency">Maintenance Records Review Frequency</Label>
                  <Input
                    id="maintenanceRecordsReviewFrequency"
                    value={formData.maintenanceRecordsReviewFrequency}
                    onChange={(e) => setFormData({ ...formData, maintenanceRecordsReviewFrequency: e.target.value })}
                    placeholder="e.g., Weekly, Monthly, Quarterly"
                    data-testid="input-records-review-frequency"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Plates & Registration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platesRegisteredTaxi">Taxi Plates</Label>
                  <Input
                    id="platesRegisteredTaxi"
                    type="number"
                    value={formData.platesRegisteredTaxi}
                    onChange={(e) => setFormData({ ...formData, platesRegisteredTaxi: e.target.value })}
                    placeholder="Number of taxi plates"
                    data-testid="input-plates-taxi"
                  />
                </div>

                <div>
                  <Label htmlFor="platesRegisteredLimo8OrLess">Limousine Plates (8 or less)</Label>
                  <Input
                    id="platesRegisteredLimo8OrLess"
                    type="number"
                    value={formData.platesRegisteredLimo8OrLess}
                    onChange={(e) => setFormData({ ...formData, platesRegisteredLimo8OrLess: e.target.value })}
                    placeholder="Number of limo plates (8 or less)"
                    data-testid="input-plates-limo-8"
                  />
                </div>

                <div>
                  <Label htmlFor="platesRegisteredStretchLimo9Plus">Stretch Limo Plates (9+)</Label>
                  <Input
                    id="platesRegisteredStretchLimo9Plus"
                    type="number"
                    value={formData.platesRegisteredStretchLimo9Plus}
                    onChange={(e) => setFormData({ ...formData, platesRegisteredStretchLimo9Plus: e.target.value })}
                    placeholder="Number of stretch limo plates (9+)"
                    data-testid="input-plates-stretch-limo"
                  />
                </div>

                <div>
                  <Label htmlFor="platesRegisteredAirportService">Airport Service Plates</Label>
                  <Input
                    id="platesRegisteredAirportService"
                    type="number"
                    value={formData.platesRegisteredAirportService}
                    onChange={(e) => setFormData({ ...formData, platesRegisteredAirportService: e.target.value })}
                    placeholder="Number of airport service plates"
                    data-testid="input-plates-airport"
                  />
                </div>

                <div>
                  <Label htmlFor="vehiclesWithMeters">How many vehicles have meters?</Label>
                  <Input
                    id="vehiclesWithMeters"
                    type="number"
                    value={formData.vehiclesWithMeters}
                    onChange={(e) => setFormData({ ...formData, vehiclesWithMeters: e.target.value })}
                    placeholder="Number of vehicles with meters"
                    data-testid="input-vehicles-with-meters"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Schedule</h3>
              {vehicles.map((vehicle, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-base">Vehicle {index + 1}</CardTitle>
                    {vehicles.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVehicle(index)}
                        data-testid={`button-remove-vehicle-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`vehicle-year-${index}`}>Year</Label>
                        <Input
                          id={`vehicle-year-${index}`}
                          value={vehicle.year}
                          onChange={(e) => updateVehicle(index, "year", e.target.value)}
                          placeholder="YYYY"
                          data-testid={`input-vehicle-year-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-make-${index}`}>Make</Label>
                        <Input
                          id={`vehicle-make-${index}`}
                          value={vehicle.make}
                          onChange={(e) => updateVehicle(index, "make", e.target.value)}
                          placeholder="Make"
                          data-testid={`input-vehicle-make-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-model-${index}`}>Model</Label>
                        <Input
                          id={`vehicle-model-${index}`}
                          value={vehicle.model}
                          onChange={(e) => updateVehicle(index, "model", e.target.value)}
                          placeholder="Model"
                          data-testid={`input-vehicle-model-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-vin-${index}`}>VIN</Label>
                        <Input
                          id={`vehicle-vin-${index}`}
                          value={vehicle.vin}
                          onChange={(e) => updateVehicle(index, "vin", e.target.value)}
                          placeholder="VIN"
                          data-testid={`input-vehicle-vin-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-value-${index}`}>Stated Value</Label>
                        <Input
                          id={`vehicle-value-${index}`}
                          type="number"
                          value={vehicle.statedValue}
                          onChange={(e) => updateVehicle(index, "statedValue", e.target.value)}
                          placeholder="Value"
                          data-testid={`input-vehicle-value-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-seating-${index}`}>Seating Capacity</Label>
                        <Input
                          id={`vehicle-seating-${index}`}
                          type="number"
                          value={vehicle.seatingCapacity}
                          onChange={(e) => updateVehicle(index, "seatingCapacity", e.target.value)}
                          placeholder="Passengers"
                          data-testid={`input-vehicle-seating-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-lift-${index}`}>Lift or Ramp?</Label>
                        <Select
                          value={vehicle.liftOrRamp}
                          onValueChange={(value) => updateVehicle(index, "liftOrRamp", value)}
                        >
                          <SelectTrigger id={`vehicle-lift-${index}`} data-testid={`select-vehicle-lift-${index}`}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-meter-${index}`}>Meter Installed?</Label>
                        <Select
                          value={vehicle.meterInstalled}
                          onValueChange={(value) => updateVehicle(index, "meterInstalled", value)}
                        >
                          <SelectTrigger id={`vehicle-meter-${index}`} data-testid={`select-vehicle-meter-${index}`}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`vehicle-class-${index}`}>Vehicle Class</Label>
                        <Select
                          value={vehicle.vehicleClass}
                          onValueChange={(value) => updateVehicle(index, "vehicleClass", value)}
                        >
                          <SelectTrigger id={`vehicle-class-${index}`} data-testid={`select-vehicle-class-${index}`}>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addVehicle}
                className="w-full"
                data-testid="button-add-vehicle"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Special Equipment (Number of Vehicles with Each)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equipmentLiftOutRamps">Lift-Out/Pull-Out Ramps</Label>
                  <Input
                    id="equipmentLiftOutRamps"
                    type="number"
                    value={formData.equipmentLiftOutRamps}
                    onChange={(e) => setFormData({ ...formData, equipmentLiftOutRamps: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-ramps"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentMechanicalLifts">Mechanical Lifts</Label>
                  <Input
                    id="equipmentMechanicalLifts"
                    type="number"
                    value={formData.equipmentMechanicalLifts}
                    onChange={(e) => setFormData({ ...formData, equipmentMechanicalLifts: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-lifts"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentWheelchairRestraint">Wheelchair Safety Restraint System</Label>
                  <Input
                    id="equipmentWheelchairRestraint"
                    type="number"
                    value={formData.equipmentWheelchairRestraint}
                    onChange={(e) => setFormData({ ...formData, equipmentWheelchairRestraint: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-restraint"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentAutoBrakingSensor">Automatic Braking Sensor/Accident Avoidance Tech</Label>
                  <Input
                    id="equipmentAutoBrakingSensor"
                    type="number"
                    value={formData.equipmentAutoBrakingSensor}
                    onChange={(e) => setFormData({ ...formData, equipmentAutoBrakingSensor: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-braking"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentGPS">GPS</Label>
                  <Input
                    id="equipmentGPS"
                    type="number"
                    value={formData.equipmentGPS}
                    onChange={(e) => setFormData({ ...formData, equipmentGPS: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-gps"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentInVehicleCamera">In-Vehicle Camera</Label>
                  <Input
                    id="equipmentInVehicleCamera"
                    type="number"
                    value={formData.equipmentInVehicleCamera}
                    onChange={(e) => setFormData({ ...formData, equipmentInVehicleCamera: e.target.value })}
                    placeholder="Number of vehicles"
                    data-testid="input-equipment-camera"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Storage & Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehiclesStoredOvernightOnPremises">Are vehicles stored overnight on premises?</Label>
                  <Select
                    value={formData.vehiclesStoredOvernightOnPremises}
                    onValueChange={(value) => setFormData({ ...formData, vehiclesStoredOvernightOnPremises: value })}
                  >
                    <SelectTrigger id="vehiclesStoredOvernightOnPremises" data-testid="select-stored-on-premises">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="guardDogsOnPremises">Guard dogs on premises?</Label>
                  <Select
                    value={formData.guardDogsOnPremises}
                    onValueChange={(value) => setFormData({ ...formData, guardDogsOnPremises: value })}
                  >
                    <SelectTrigger id="guardDogsOnPremises" data-testid="select-guard-dogs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Driver Information & Safety */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Driver Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentNumberOfDrivers">Current Number of Drivers</Label>
                  <Input
                    id="currentNumberOfDrivers"
                    type="number"
                    value={formData.currentNumberOfDrivers}
                    onChange={(e) => setFormData({ ...formData, currentNumberOfDrivers: e.target.value })}
                    placeholder="Number of drivers"
                    data-testid="input-number-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="driverClassification">Driver Classification</Label>
                  <Select
                    value={formData.driverClassification}
                    onValueChange={(value) => setFormData({ ...formData, driverClassification: value })}
                  >
                    <SelectTrigger id="driverClassification" data-testid="select-driver-classification">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employees">Employees</SelectItem>
                      <SelectItem value="independent-contractors">Independent Contractors</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workersCompForAllDrivers">Workers Compensation provided for ALL drivers?</Label>
                  <Select
                    value={formData.workersCompForAllDrivers}
                    onValueChange={(value) => setFormData({ ...formData, workersCompForAllDrivers: value })}
                  >
                    <SelectTrigger id="workersCompForAllDrivers" data-testid="select-workers-comp">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minimumDriverAge">Minimum Driver Age Requirement</Label>
                  <Input
                    id="minimumDriverAge"
                    type="number"
                    value={formData.minimumDriverAge}
                    onChange={(e) => setFormData({ ...formData, minimumDriverAge: e.target.value })}
                    placeholder="Age"
                    data-testid="input-minimum-age"
                  />
                </div>

                <div>
                  <Label htmlFor="minimumYearsDrivingExperience">Minimum Years Driving Experience Required</Label>
                  <Input
                    id="minimumYearsDrivingExperience"
                    type="number"
                    value={formData.minimumYearsDrivingExperience}
                    onChange={(e) => setFormData({ ...formData, minimumYearsDrivingExperience: e.target.value })}
                    placeholder="Years"
                    data-testid="input-minimum-experience"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Driver Hiring Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="writtenApplicationRequired">Written application required?</Label>
                  <Select
                    value={formData.writtenApplicationRequired}
                    onValueChange={(value) => setFormData({ ...formData, writtenApplicationRequired: value })}
                  >
                    <SelectTrigger id="writtenApplicationRequired" data-testid="select-written-application">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reviewMVRsBeforeHiring">Review MVRs before hiring?</Label>
                  <Select
                    value={formData.reviewMVRsBeforeHiring}
                    onValueChange={(value) => setFormData({ ...formData, reviewMVRsBeforeHiring: value })}
                  >
                    <SelectTrigger id="reviewMVRsBeforeHiring" data-testid="select-review-mvrs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mvrCheckFrequency">MVR Check Frequency</Label>
                  <Select
                    value={formData.mvrCheckFrequency}
                    onValueChange={(value) => setFormData({ ...formData, mvrCheckFrequency: value })}
                  >
                    <SelectTrigger id="mvrCheckFrequency" data-testid="select-mvr-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="after-accident">After Accident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Driver Training & Safety</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="driverTrainingProgram">Driver Training Program?</Label>
                  <Select
                    value={formData.driverTrainingProgram}
                    onValueChange={(value) => setFormData({ ...formData, driverTrainingProgram: value })}
                  >
                    <SelectTrigger id="driverTrainingProgram" data-testid="select-training-program">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="regularSafetyMeetings">Regular Safety Meetings?</Label>
                  <Select
                    value={formData.regularSafetyMeetings}
                    onValueChange={(value) => setFormData({ ...formData, regularSafetyMeetings: value })}
                  >
                    <SelectTrigger id="regularSafetyMeetings" data-testid="select-safety-meetings">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.regularSafetyMeetings === "yes" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="safetyMeetingFrequency">How often are safety meetings held?</Label>
                    <Input
                      id="safetyMeetingFrequency"
                      value={formData.safetyMeetingFrequency}
                      onChange={(e) => setFormData({ ...formData, safetyMeetingFrequency: e.target.value })}
                      placeholder="e.g., Monthly, Quarterly"
                      data-testid="input-safety-meeting-frequency"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="driversTrainedAssistElderlyHandicapped">Drivers trained to assist elderly/handicapped?</Label>
                  <Select
                    value={formData.driversTrainedAssistElderlyHandicapped}
                    onValueChange={(value) => setFormData({ ...formData, driversTrainedAssistElderlyHandicapped: value })}
                  >
                    <SelectTrigger id="driversTrainedAssistElderlyHandicapped" data-testid="select-assist-training">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Drug Testing & Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drugTestingPolicy">Drug Testing Policy?</Label>
                  <Select
                    value={formData.drugTestingPolicy}
                    onValueChange={(value) => setFormData({ ...formData, drugTestingPolicy: value })}
                  >
                    <SelectTrigger id="drugTestingPolicy" data-testid="select-drug-testing">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.drugTestingPolicy === "yes" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="drugTestingPolicyDescription">Brief Description of Drug Testing Policy</Label>
                    <Textarea
                      id="drugTestingPolicyDescription"
                      value={formData.drugTestingPolicyDescription}
                      onChange={(e) => setFormData({ ...formData, drugTestingPolicyDescription: e.target.value })}
                      placeholder="Describe when and how drug testing is conducted"
                      rows={3}
                      data-testid="textarea-drug-testing-description"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="postAccidentDrugTesting">Post-Accident Drug Testing?</Label>
                  <Select
                    value={formData.postAccidentDrugTesting}
                    onValueChange={(value) => setFormData({ ...formData, postAccidentDrugTesting: value })}
                  >
                    <SelectTrigger id="postAccidentDrugTesting" data-testid="select-post-accident-testing">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.postAccidentDrugTesting === "yes" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="postAccidentDrugTestingDescription">Brief Description of Post-Accident Testing</Label>
                    <Textarea
                      id="postAccidentDrugTestingDescription"
                      value={formData.postAccidentDrugTestingDescription}
                      onChange={(e) => setFormData({ ...formData, postAccidentDrugTestingDescription: e.target.value })}
                      placeholder="Describe post-accident testing procedures"
                      rows={3}
                      data-testid="textarea-post-accident-description"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Driver Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="driversTakeVehiclesHome">Do drivers take vehicles home?</Label>
                  <Select
                    value={formData.driversTakeVehiclesHome}
                    onValueChange={(value) => setFormData({ ...formData, driversTakeVehiclesHome: value })}
                  >
                    <SelectTrigger id="driversTakeVehiclesHome" data-testid="select-drivers-take-home">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="driverIncentiveProgram">Driver Incentive Program?</Label>
                  <Select
                    value={formData.driverIncentiveProgram}
                    onValueChange={(value) => setFormData({ ...formData, driverIncentiveProgram: value })}
                  >
                    <SelectTrigger id="driverIncentiveProgram" data-testid="select-incentive-program">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.driverIncentiveProgram === "yes" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="driverIncentiveProgramDescription">Describe Incentive Program</Label>
                    <Textarea
                      id="driverIncentiveProgramDescription"
                      value={formData.driverIncentiveProgramDescription}
                      onChange={(e) => setFormData({ ...formData, driverIncentiveProgramDescription: e.target.value })}
                      placeholder="Describe the driver incentive program"
                      rows={3}
                      data-testid="textarea-incentive-description"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="accidentInvestigationProcedures">Accident Investigation & Review Procedures?</Label>
                  <Select
                    value={formData.accidentInvestigationProcedures}
                    onValueChange={(value) => setFormData({ ...formData, accidentInvestigationProcedures: value })}
                  >
                    <SelectTrigger id="accidentInvestigationProcedures" data-testid="select-accident-investigation">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="driverDisciplinaryProcedures">Driver Disciplinary Procedures?</Label>
                  <Select
                    value={formData.driverDisciplinaryProcedures}
                    onValueChange={(value) => setFormData({ ...formData, driverDisciplinaryProcedures: value })}
                  >
                    <SelectTrigger id="driverDisciplinaryProcedures" data-testid="select-disciplinary-procedures">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Driver Schedule</h3>
              {drivers.map((driver, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-base">Driver {index + 1}</CardTitle>
                    {drivers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDriver(index)}
                        data-testid={`button-remove-driver-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`driver-first-name-${index}`}>First Name</Label>
                        <Input
                          id={`driver-first-name-${index}`}
                          value={driver.firstName}
                          onChange={(e) => updateDriver(index, "firstName", e.target.value)}
                          placeholder="First Name"
                          data-testid={`input-driver-first-name-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`driver-last-name-${index}`}>Last Name</Label>
                        <Input
                          id={`driver-last-name-${index}`}
                          value={driver.lastName}
                          onChange={(e) => updateDriver(index, "lastName", e.target.value)}
                          placeholder="Last Name"
                          data-testid={`input-driver-last-name-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`driver-dob-${index}`}>Date of Birth (MM/DD/YYYY)</Label>
                        <Input
                          id={`driver-dob-${index}`}
                          value={driver.dateOfBirth}
                          onChange={(e) => updateDriver(index, "dateOfBirth", e.target.value)}
                          placeholder="MM/DD/YYYY"
                          data-testid={`input-driver-dob-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`driver-license-${index}`}>Driver's License Number</Label>
                        <Input
                          id={`driver-license-${index}`}
                          value={driver.licenseNumber}
                          onChange={(e) => updateDriver(index, "licenseNumber", e.target.value)}
                          placeholder="License Number"
                          data-testid={`input-driver-license-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`driver-experience-${index}`}>Years of Experience</Label>
                        <Input
                          id={`driver-experience-${index}`}
                          type="number"
                          value={driver.yearsExperience}
                          onChange={(e) => updateDriver(index, "yearsExperience", e.target.value)}
                          placeholder="Years"
                          data-testid={`input-driver-experience-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`driver-violations-${index}`}>Traffic Violations (past 3 years)</Label>
                        <Input
                          id={`driver-violations-${index}`}
                          type="number"
                          value={driver.trafficViolations}
                          onChange={(e) => updateDriver(index, "trafficViolations", e.target.value)}
                          placeholder="Number of violations"
                          data-testid={`input-driver-violations-${index}`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addDriver}
                className="w-full"
                data-testid="button-add-driver"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Prior Insurance & Loss History */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Insurance History</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cancelledOrRefusedRenewal">Has any company cancelled or refused to renew your coverage?</Label>
                  <Select
                    value={formData.cancelledOrRefusedRenewal}
                    onValueChange={(value) => setFormData({ ...formData, cancelledOrRefusedRenewal: value })}
                  >
                    <SelectTrigger id="cancelledOrRefusedRenewal" data-testid="select-cancelled-refused">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.cancelledOrRefusedRenewal === "yes" && (
                  <div>
                    <Label htmlFor="cancellationExplanation">Please explain</Label>
                    <Textarea
                      id="cancellationExplanation"
                      value={formData.cancellationExplanation}
                      onChange={(e) => setFormData({ ...formData, cancellationExplanation: e.target.value })}
                      placeholder="Explain the cancellation or refusal to renew"
                      rows={3}
                      data-testid="textarea-cancellation-explanation"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Prior Insurance Coverage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="priorInsuranceCarrier">Prior Insurance Carrier Name</Label>
                  <Input
                    id="priorInsuranceCarrier"
                    value={formData.priorInsuranceCarrier}
                    onChange={(e) => setFormData({ ...formData, priorInsuranceCarrier: e.target.value })}
                    placeholder="Carrier name"
                    data-testid="input-prior-carrier"
                  />
                </div>

                <div>
                  <Label htmlFor="priorPolicyEffectiveDate">Prior Policy Effective Date</Label>
                  <Input
                    id="priorPolicyEffectiveDate"
                    type="date"
                    value={formData.priorPolicyEffectiveDate}
                    onChange={(e) => setFormData({ ...formData, priorPolicyEffectiveDate: e.target.value })}
                    data-testid="input-prior-effective-date"
                  />
                </div>

                <div>
                  <Label htmlFor="priorPolicyExpirationDate">Prior Policy Expiration Date</Label>
                  <Input
                    id="priorPolicyExpirationDate"
                    type="date"
                    value={formData.priorPolicyExpirationDate}
                    onChange={(e) => setFormData({ ...formData, priorPolicyExpirationDate: e.target.value })}
                    data-testid="input-prior-expiration-date"
                  />
                </div>

                <div>
                  <Label htmlFor="priorLiabilityLimits">Prior Liability Limits</Label>
                  <Input
                    id="priorLiabilityLimits"
                    value={formData.priorLiabilityLimits}
                    onChange={(e) => setFormData({ ...formData, priorLiabilityLimits: e.target.value })}
                    placeholder="e.g., $1,000,000"
                    data-testid="input-prior-liability-limits"
                  />
                </div>

                <div>
                  <Label htmlFor="priorAutoLiabilityPremium">Prior Auto Liability Premium</Label>
                  <Input
                    id="priorAutoLiabilityPremium"
                    value={formData.priorAutoLiabilityPremium}
                    onChange={(e) => setFormData({ ...formData, priorAutoLiabilityPremium: e.target.value })}
                    placeholder="Premium amount"
                    data-testid="input-prior-auto-premium"
                  />
                </div>

                <div>
                  <Label htmlFor="priorPhysicalDamagePremium">Prior Physical Damage Premium</Label>
                  <Input
                    id="priorPhysicalDamagePremium"
                    value={formData.priorPhysicalDamagePremium}
                    onChange={(e) => setFormData({ ...formData, priorPhysicalDamagePremium: e.target.value })}
                    placeholder="Premium amount"
                    data-testid="input-prior-physical-damage-premium"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Subcontracting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subcontractWorkToOthers">Do you subcontract work to others?</Label>
                  <Select
                    value={formData.subcontractWorkToOthers}
                    onValueChange={(value) => setFormData({ ...formData, subcontractWorkToOthers: value })}
                  >
                    <SelectTrigger id="subcontractWorkToOthers" data-testid="select-subcontract">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.subcontractWorkToOthers === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="certificatesOfInsuranceObtained">Are certificates of insurance obtained?</Label>
                      <Select
                        value={formData.certificatesOfInsuranceObtained}
                        onValueChange={(value) => setFormData({ ...formData, certificatesOfInsuranceObtained: value })}
                      >
                        <SelectTrigger id="certificatesOfInsuranceObtained" data-testid="select-certificates-obtained">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="limitsRequiredFromSubcontractors">What limits do you require from subcontractors?</Label>
                      <Input
                        id="limitsRequiredFromSubcontractors"
                        value={formData.limitsRequiredFromSubcontractors}
                        onChange={(e) => setFormData({ ...formData, limitsRequiredFromSubcontractors: e.target.value })}
                        placeholder="e.g., $1,000,000"
                        data-testid="input-subcontractor-limits"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Information</h3>
              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  placeholder="Any additional information you'd like to provide"
                  rows={5}
                  data-testid="textarea-additional-comments"
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
            onClick={handlePrevious}
            disabled={step === 1}
            data-testid="button-previous"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {step < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              data-testid="button-next"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              data-testid="button-submit"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Quick Quote Alternative */}
    <div className="max-w-4xl mx-auto mt-12">
      <Separator className="mb-8" />
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Don't Have Time for the Full Application?</h3>
        <p className="text-muted-foreground">
          Submit a quick quote request and one of our agents will contact you to gather the necessary details.
        </p>
      </div>
      <QuickQuoteForm insuranceType="Taxi/Black Car" />
    </div>
    </>
  );
}
