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
  gvwr: string;
  color: string;
  lengthOfStretch: string;
  passengers: string;
  garageLocation: string;
  value: string;
  comprehensiveDeductible: string;
  collisionDeductible: string;
  personalUse: string;
}

interface Driver {
  name: string;
  licenseNumber: string;
  state: string;
  dateOfBirth: string;
  yearsLicensed: string;
  yearsExperience: string;
}

export default function LimousineQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Section I - General Information
    companyName: "",
    dba: "",
    companyType: "Corporation",
    companyTypeOther: "",
    mailingAddress: "",
    businessPhone: "",
    businessFax: "",
    garageAddress: "",
    email: "",
    website: "",
    contactPerson: "",
    contactTitle: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    ownerOtherEmployment: false,
    ownerEmploymentDetails: "",
    iccPucDocket: "",
    fein: "",
    
    // Section II - Coverage Information
    autoLiabilityLimit: "$1,000,000",
    pipLimit: "",
    umLimit: "",
    uimLimit: "",
    employersNonOwnershipLimit: "",
    hiredAutoLiabilityLimit: "",
    comprehensiveDeductible: "$1,000",
    collisionDeductible: "$1,000",
    
    // Section III - Operations Information
    estimatedMileageProposed: "",
    estimatedMileageCurrentYear: "",
    estimatedMileagePriorYear: "",
    grossReceiptsProposed: "",
    grossReceiptsCurrentYear: "",
    grossReceiptsPriorYear: "",
    garagingType: [] as string[],
    garagingTypeOther: "",
    employeesTakeVehiclesHome: false,
    employeesGaraging: "",
    vehiclesServiced: false,
    servicedBy: "",
    serviceFrequency: "",
    ownsUnlistedEquipment: false,
    unlistedEquipmentDetails: "",
    twoWayRadio: false,
    radioUsage: "",
    hasDriveCam: false,
    driveCamType: "",
    hasGpsTracking: false,
    allVehiclesQvmCertified: false,
    qvmCertifiedBy: "",
    qvmNotCertifiedExplanation: "",
    longestRoundTrip: "",
    frequentDestination1: "",
    frequentDestination1Pct: "",
    frequentDestination2: "",
    frequentDestination2Pct: "",
    frequentDestination3: "",
    frequentDestination3Pct: "",
    tripPctAirport: "",
    tripPctCorporate: "",
    tripPctWeddingsFunerals: "",
    tripPctPromNightOut: "",
    tripPctOther: "",
    tripPctOtherDescribe: "",
    reservations24HoursPct: "",
    transportAthleticsEntertainment: false,
    athleticsEntertainmentDetails: "",
    expectedCostOfHire: "",
    leasesVehiclesFromOthers: false,
    leasesVehiclesPct: "",
    leasesVehiclesToOthers: false,
    usesOwnerOperators: false,
    usesTncApps: false,
    
    // Section IV - Driver Information
    driversReplacedLast12Months: "",
    driversAddedLast12Months: "",
    drugTestingRequired: false,
    minimumAgeOfDrivers: "",
    hasDriverRecruitmentProgram: false,
    recruitmentProgramDetails: "",
    workersCompForAllDrivers: false,
    workersCompCarrier: "",
    workersCompExplanation: "",
    allDriversAreEmployees: false,
    driversNotEmployeesExplanation: "",
    hasFormalDrivingPolicy: false,
    drivingPolicyCommunicatedInWriting: false,
    signedAcknowledgmentOnFile: false,
    noMajorViolations: false,
    noMoreThan2MovingViolations: false,
    noMoreThan1AtFaultAccident: false,
    mvrCheckFrequency: "",
    ongoingDriverTraining: "",
    newDriversRequireTraining: false,
    employeesDrivePersonalVehicles: false,
    personalVehicleSamePolicy: false,
    personalVehicleAdequateLimits: false,
    
    // Section V - Prior Insurance History
    currentCarrier: "",
    currentAutoLiabilityPremium: "",
    currentPhysicalDamagePremium: "",
    currentGeneralLiabilityPremium: "",
    priorYear1Carrier: "",
    priorYear1AutoLiabilityPremium: "",
    priorYear1PhysicalDamagePremium: "",
    priorYear1GeneralLiabilityPremium: "",
    priorYear2Carrier: "",
    priorYear2AutoLiabilityPremium: "",
    priorYear2PhysicalDamagePremium: "",
    priorYear2GeneralLiabilityPremium: "",
    currentPolicyCancelled: false,
    cancellationExplanation: "",
    hadAssignedRiskPlan: false,
    assignedRiskExplanation: "",
    filedBankruptcy: false,
    bankruptcyExplanation: "",
    otherPublicTransportationOwnership: "",
    allAutosOwnedOrLeased: false,
    autosNotOwnedExplanation: "",
    priorGapsInCoverage: "",
    lossHistory: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { 
      year: "", 
      make: "", 
      model: "", 
      vin: "", 
      gvwr: "",
      color: "",
      lengthOfStretch: "",
      passengers: "",
      garageLocation: "",
      value: "", 
      comprehensiveDeductible: "$1,000",
      collisionDeductible: "$1,000",
      personalUse: "no"
    }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      name: "",
      licenseNumber: "",
      state: "",
      dateOfBirth: "",
      yearsLicensed: "",
      yearsExperience: ""
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
      gvwr: "",
      color: "",
      lengthOfStretch: "",
      passengers: "",
      garageLocation: "",
      value: "", 
      comprehensiveDeductible: "$1,000",
      collisionDeductible: "$1,000",
      personalUse: "no"
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
      name: "",
      licenseNumber: "",
      state: "",
      dateOfBirth: "",
      yearsLicensed: "",
      yearsExperience: ""
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

  const handleGaragingTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      garagingType: prev.garagingType.includes(type)
        ? prev.garagingType.filter(t => t !== type)
        : [...prev.garagingType, type]
    }));
  };

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("POST", "/api/limousine-quotes", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you shortly with your quote.",
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
    const payload = {
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      businessPhone: formData.businessPhone,
      mailingAddress: formData.mailingAddress,
      status: "pending",
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
            Thank you for requesting a limousine insurance quote. One of our licensed agents will review your information and contact you within 24-48 hours with a competitive quote.
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
        <CardTitle className="text-2xl">Chauffeured Transportation Insurance Application</CardTitle>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-foreground">
              {step === 1 && "General Information"}
              {step === 2 && "Coverage Information"}
              {step === 3 && "Operations Information"}
              {step === 4 && "Driver Information"}
              {step === 5 && "Prior Insurance History"}
              {step === 6 && "Vehicle Schedule & Review"}
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
        {/* Step 1: General Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="companyName">Name of Limousine Operation (include DBA) *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company Name / DBA"
                  required
                  data-testid="input-company-name"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Company Type *</Label>
                <RadioGroup value={formData.companyType} onValueChange={(value) => setFormData({ ...formData, companyType: value })}>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Individual" id="individual" data-testid="radio-individual" />
                      <Label htmlFor="individual" className="cursor-pointer font-normal">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Corporation" id="corporation" data-testid="radio-corporation" />
                      <Label htmlFor="corporation" className="cursor-pointer font-normal">Corporation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Partnership" id="partnership" data-testid="radio-partnership" />
                      <Label htmlFor="partnership" className="cursor-pointer font-normal">Partnership</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other-type" data-testid="radio-other-type" />
                      <Label htmlFor="other-type" className="cursor-pointer font-normal">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
                {formData.companyType === "Other" && (
                  <Input
                    className="mt-2"
                    value={formData.companyTypeOther}
                    onChange={(e) => setFormData({ ...formData, companyTypeOther: e.target.value })}
                    placeholder="Specify other type"
                    data-testid="input-company-type-other"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="mailingAddress">Mailing Address *</Label>
                <Input
                  id="mailingAddress"
                  value={formData.mailingAddress}
                  onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                  placeholder="Street Address"
                  required
                  data-testid="input-mailing-address"
                />
              </div>

              <div>
                <Label htmlFor="businessPhone">Business Telephone *</Label>
                <Input
                  id="businessPhone"
                  type="tel"
                  value={formData.businessPhone}
                  onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                  placeholder="(555) 555-5555"
                  required
                  data-testid="input-business-phone"
                />
              </div>

              <div>
                <Label htmlFor="businessFax">Fax</Label>
                <Input
                  id="businessFax"
                  type="tel"
                  value={formData.businessFax}
                  onChange={(e) => setFormData({ ...formData, businessFax: e.target.value })}
                  placeholder="(555) 555-5555"
                  data-testid="input-business-fax"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="garageAddress">Garage Address</Label>
                <Input
                  id="garageAddress"
                  value={formData.garageAddress}
                  onChange={(e) => setFormData({ ...formData, garageAddress: e.target.value })}
                  placeholder="Physical Location of Vehicles"
                  data-testid="input-garage-address"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="website">Website Address</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="www.example.com"
                  data-testid="input-website"
                />
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Full Name"
                  required
                  data-testid="input-contact-person"
                />
              </div>

              <div>
                <Label htmlFor="contactTitle">Title</Label>
                <Input
                  id="contactTitle"
                  value={formData.contactTitle}
                  onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
                  placeholder="Position/Title"
                  data-testid="input-contact-title"
                />
              </div>

              <div>
                <Label htmlFor="yearsInBusiness">Number of Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  placeholder="e.g., 5"
                  required
                  data-testid="input-years-in-business"
                />
              </div>

              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
                <Input
                  id="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })}
                  placeholder="e.g., 10"
                  required
                  data-testid="input-number-of-employees"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="ownerOtherEmployment"
                    checked={formData.ownerOtherEmployment}
                    onCheckedChange={(checked) => setFormData({ ...formData, ownerOtherEmployment: checked as boolean })}
                    data-testid="checkbox-owner-other-employment"
                  />
                  <Label htmlFor="ownerOtherEmployment" className="cursor-pointer">
                    Does the owner have other employment?
                  </Label>
                </div>
                {formData.ownerOtherEmployment && (
                  <Textarea
                    value={formData.ownerEmploymentDetails}
                    onChange={(e) => setFormData({ ...formData, ownerEmploymentDetails: e.target.value })}
                    placeholder="Please explain the owner's other employment"
                    data-testid="textarea-owner-employment-details"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="iccPucDocket">ICC/PUC Docket Number (if applicable)</Label>
                <Input
                  id="iccPucDocket"
                  value={formData.iccPucDocket}
                  onChange={(e) => setFormData({ ...formData, iccPucDocket: e.target.value })}
                  placeholder="Docket Number"
                  data-testid="input-icc-puc-docket"
                />
              </div>

              <div>
                <Label htmlFor="fein">FEIN (Federal Employer Identification Number)</Label>
                <Input
                  id="fein"
                  value={formData.fein}
                  onChange={(e) => setFormData({ ...formData, fein: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  data-testid="input-fein"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Coverage Information */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Coverage Limits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="autoLiabilityLimit">Auto Liability (Combined Single Limit) *</Label>
                <Select value={formData.autoLiabilityLimit} onValueChange={(value) => setFormData({ ...formData, autoLiabilityLimit: value })}>
                  <SelectTrigger id="autoLiabilityLimit" data-testid="select-auto-liability-limit">
                    <SelectValue />
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
                <Label htmlFor="pipLimit">Personal Injury Protection (PIP)</Label>
                <Input
                  id="pipLimit"
                  value={formData.pipLimit}
                  onChange={(e) => setFormData({ ...formData, pipLimit: e.target.value })}
                  placeholder="$ Amount or Statutory"
                  data-testid="input-pip-limit"
                />
              </div>

              <div>
                <Label htmlFor="umLimit">Uninsured Motorist Protection (UM)</Label>
                <Input
                  id="umLimit"
                  value={formData.umLimit}
                  onChange={(e) => setFormData({ ...formData, umLimit: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-um-limit"
                />
              </div>

              <div>
                <Label htmlFor="uimLimit">Underinsured Motorist Protection (UIM)</Label>
                <Input
                  id="uimLimit"
                  value={formData.uimLimit}
                  onChange={(e) => setFormData({ ...formData, uimLimit: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-uim-limit"
                />
              </div>

              <div>
                <Label htmlFor="employersNonOwnershipLimit">Employer's Non-Ownership Liability</Label>
                <Input
                  id="employersNonOwnershipLimit"
                  value={formData.employersNonOwnershipLimit}
                  onChange={(e) => setFormData({ ...formData, employersNonOwnershipLimit: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-employers-non-ownership-limit"
                />
              </div>

              <div>
                <Label htmlFor="hiredAutoLiabilityLimit">Hired Auto Liability</Label>
                <Input
                  id="hiredAutoLiabilityLimit"
                  value={formData.hiredAutoLiabilityLimit}
                  onChange={(e) => setFormData({ ...formData, hiredAutoLiabilityLimit: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-hired-auto-liability-limit"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Physical Damage Deductibles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="comprehensiveDeductible">Comprehensive Deductible *</Label>
                <Select value={formData.comprehensiveDeductible} onValueChange={(value) => setFormData({ ...formData, comprehensiveDeductible: value })}>
                  <SelectTrigger id="comprehensiveDeductible" data-testid="select-comprehensive-deductible">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$1,000">$1,000</SelectItem>
                    <SelectItem value="$2,000">$2,000</SelectItem>
                    <SelectItem value="$3,000">$3,000</SelectItem>
                    <SelectItem value="$5,000">$5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="collisionDeductible">Collision Deductible *</Label>
                <Select value={formData.collisionDeductible} onValueChange={(value) => setFormData({ ...formData, collisionDeductible: value })}>
                  <SelectTrigger id="collisionDeductible" data-testid="select-collision-deductible">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$1,000">$1,000</SelectItem>
                    <SelectItem value="$2,000">$2,000</SelectItem>
                    <SelectItem value="$3,000">$3,000</SelectItem>
                    <SelectItem value="$5,000">$5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Program Features:</strong> Up to $5M CSL Primary Auto Liability • Owned/Non-Owned/Hired Auto Coverage • Zero Deductible Glass • Lease Gap Coverage • Electronic Equipment Coverage
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Operations Information */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Mileage & Receipts</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="estimatedMileageProposed">Estimated Mileage - Proposed Period</Label>
                <Input
                  id="estimatedMileageProposed"
                  value={formData.estimatedMileageProposed}
                  onChange={(e) => setFormData({ ...formData, estimatedMileageProposed: e.target.value })}
                  placeholder="Miles"
                  data-testid="input-mileage-proposed"
                />
              </div>
              <div>
                <Label htmlFor="estimatedMileageCurrentYear">Current Year</Label>
                <Input
                  id="estimatedMileageCurrentYear"
                  value={formData.estimatedMileageCurrentYear}
                  onChange={(e) => setFormData({ ...formData, estimatedMileageCurrentYear: e.target.value })}
                  placeholder="Miles"
                  data-testid="input-mileage-current"
                />
              </div>
              <div>
                <Label htmlFor="estimatedMileagePriorYear">Prior Year</Label>
                <Input
                  id="estimatedMileagePriorYear"
                  value={formData.estimatedMileagePriorYear}
                  onChange={(e) => setFormData({ ...formData, estimatedMileagePriorYear: e.target.value })}
                  placeholder="Miles"
                  data-testid="input-mileage-prior"
                />
              </div>

              <div>
                <Label htmlFor="grossReceiptsProposed">Gross Receipts - Proposed Period</Label>
                <Input
                  id="grossReceiptsProposed"
                  value={formData.grossReceiptsProposed}
                  onChange={(e) => setFormData({ ...formData, grossReceiptsProposed: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-receipts-proposed"
                />
              </div>
              <div>
                <Label htmlFor="grossReceiptsCurrentYear">Current Year</Label>
                <Input
                  id="grossReceiptsCurrentYear"
                  value={formData.grossReceiptsCurrentYear}
                  onChange={(e) => setFormData({ ...formData, grossReceiptsCurrentYear: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-receipts-current"
                />
              </div>
              <div>
                <Label htmlFor="grossReceiptsPriorYear">Prior Year</Label>
                <Input
                  id="grossReceiptsPriorYear"
                  value={formData.grossReceiptsPriorYear}
                  onChange={(e) => setFormData({ ...formData, grossReceiptsPriorYear: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-receipts-prior"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Type of Garaging</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Indoor", "Outdoor", "Fenced", "Lighted", "Security Guard", "Other"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`garaging-${type.toLowerCase()}`}
                    checked={formData.garagingType.includes(type)}
                    onCheckedChange={() => handleGaragingTypeToggle(type)}
                    data-testid={`checkbox-garaging-${type.toLowerCase()}`}
                  />
                  <Label htmlFor={`garaging-${type.toLowerCase()}`} className="cursor-pointer">{type}</Label>
                </div>
              ))}
            </div>
            {formData.garagingType.includes("Other") && (
              <Input
                value={formData.garagingTypeOther}
                onChange={(e) => setFormData({ ...formData, garagingTypeOther: e.target.value })}
                placeholder="Specify other garaging type"
                data-testid="input-garaging-other"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="employeesTakeVehiclesHome"
                    checked={formData.employeesTakeVehiclesHome}
                    onCheckedChange={(checked) => setFormData({ ...formData, employeesTakeVehiclesHome: checked as boolean })}
                    data-testid="checkbox-employees-take-vehicles-home"
                  />
                  <Label htmlFor="employeesTakeVehiclesHome" className="cursor-pointer">
                    Do employees take vehicles home?
                  </Label>
                </div>
                {formData.employeesTakeVehiclesHome && (
                  <RadioGroup value={formData.employeesGaraging} onValueChange={(value) => setFormData({ ...formData, employeesGaraging: value })}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="On Street" id="on-street" data-testid="radio-on-street" />
                        <Label htmlFor="on-street" className="cursor-pointer font-normal">On Street</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Off Street" id="off-street" data-testid="radio-off-street" />
                        <Label htmlFor="off-street" className="cursor-pointer font-normal">Off Street</Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="vehiclesServiced"
                    checked={formData.vehiclesServiced}
                    onCheckedChange={(checked) => setFormData({ ...formData, vehiclesServiced: checked as boolean })}
                    data-testid="checkbox-vehicles-serviced"
                  />
                  <Label htmlFor="vehiclesServiced" className="cursor-pointer">
                    Are vehicles serviced and inspected?
                  </Label>
                </div>
                {formData.vehiclesServiced && (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={formData.servicedBy}
                      onChange={(e) => setFormData({ ...formData, servicedBy: e.target.value })}
                      placeholder="By whom?"
                      data-testid="input-serviced-by"
                    />
                    <Input
                      value={formData.serviceFrequency}
                      onChange={(e) => setFormData({ ...formData, serviceFrequency: e.target.value })}
                      placeholder="How often?"
                      data-testid="input-service-frequency"
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="ownsUnlistedEquipment"
                    checked={formData.ownsUnlistedEquipment}
                    onCheckedChange={(checked) => setFormData({ ...formData, ownsUnlistedEquipment: checked as boolean })}
                    data-testid="checkbox-owns-unlisted-equipment"
                  />
                  <Label htmlFor="ownsUnlistedEquipment" className="cursor-pointer">
                    Does the Applicant own or operate any equipment not listed on the schedule?
                  </Label>
                </div>
                {formData.ownsUnlistedEquipment && (
                  <Textarea
                    value={formData.unlistedEquipmentDetails}
                    onChange={(e) => setFormData({ ...formData, unlistedEquipmentDetails: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-unlisted-equipment"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="twoWayRadio"
                    checked={formData.twoWayRadio}
                    onCheckedChange={(checked) => setFormData({ ...formData, twoWayRadio: checked as boolean })}
                    data-testid="checkbox-two-way-radio"
                  />
                  <Label htmlFor="twoWayRadio" className="cursor-pointer">
                    Are vehicles equipped with a two-way radio?
                  </Label>
                </div>
                {formData.twoWayRadio && (
                  <Input
                    value={formData.radioUsage}
                    onChange={(e) => setFormData({ ...formData, radioUsage: e.target.value })}
                    placeholder="What are the radios used for?"
                    data-testid="input-radio-usage"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="hasDriveCam"
                    checked={formData.hasDriveCam}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasDriveCam: checked as boolean })}
                    data-testid="checkbox-drive-cam"
                  />
                  <Label htmlFor="hasDriveCam" className="cursor-pointer">
                    Drive-Cam or other recording devices?
                  </Label>
                </div>
                {formData.hasDriveCam && (
                  <Input
                    value={formData.driveCamType}
                    onChange={(e) => setFormData({ ...formData, driveCamType: e.target.value })}
                    placeholder="Drive-Cam, Other, etc."
                    data-testid="input-drive-cam-type"
                  />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasGpsTracking"
                  checked={formData.hasGpsTracking}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasGpsTracking: checked as boolean })}
                  data-testid="checkbox-gps-tracking"
                />
                <Label htmlFor="hasGpsTracking" className="cursor-pointer">
                  GPS tracking capability?
                </Label>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="allVehiclesQvmCertified"
                    checked={formData.allVehiclesQvmCertified}
                    onCheckedChange={(checked) => setFormData({ ...formData, allVehiclesQvmCertified: checked as boolean })}
                    data-testid="checkbox-qvm-certified"
                  />
                  <Label htmlFor="allVehiclesQvmCertified" className="cursor-pointer">
                    Are all conversion vehicles QVM certified?
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {formData.allVehiclesQvmCertified ? (
                    <Input
                      value={formData.qvmCertifiedBy}
                      onChange={(e) => setFormData({ ...formData, qvmCertifiedBy: e.target.value })}
                      placeholder="Certified by whom?"
                      data-testid="input-qvm-certified-by"
                    />
                  ) : (
                    <Input
                      value={formData.qvmNotCertifiedExplanation}
                      onChange={(e) => setFormData({ ...formData, qvmNotCertifiedExplanation: e.target.value })}
                      placeholder="If no, please explain"
                      data-testid="input-qvm-not-certified"
                    />
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Trip Information</h3>
            
            <div>
              <Label htmlFor="longestRoundTrip">What was the longest round-trip destination in the last 12 months?</Label>
              <Input
                id="longestRoundTrip"
                value={formData.longestRoundTrip}
                onChange={(e) => setFormData({ ...formData, longestRoundTrip: e.target.value })}
                placeholder="e.g., Los Angeles to San Francisco"
                data-testid="input-longest-round-trip"
              />
            </div>

            <div>
              <Label>Three most frequent destinations and percentage of trips</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input
                  value={formData.frequentDestination1}
                  onChange={(e) => setFormData({ ...formData, frequentDestination1: e.target.value })}
                  placeholder="City/State"
                  data-testid="input-destination-1"
                />
                <Input
                  value={formData.frequentDestination1Pct}
                  onChange={(e) => setFormData({ ...formData, frequentDestination1Pct: e.target.value })}
                  placeholder="Percentage %"
                  data-testid="input-destination-1-pct"
                />
                <Input
                  value={formData.frequentDestination2}
                  onChange={(e) => setFormData({ ...formData, frequentDestination2: e.target.value })}
                  placeholder="City/State"
                  data-testid="input-destination-2"
                />
                <Input
                  value={formData.frequentDestination2Pct}
                  onChange={(e) => setFormData({ ...formData, frequentDestination2Pct: e.target.value })}
                  placeholder="Percentage %"
                  data-testid="input-destination-2-pct"
                />
                <Input
                  value={formData.frequentDestination3}
                  onChange={(e) => setFormData({ ...formData, frequentDestination3: e.target.value })}
                  placeholder="City/State"
                  data-testid="input-destination-3"
                />
                <Input
                  value={formData.frequentDestination3Pct}
                  onChange={(e) => setFormData({ ...formData, frequentDestination3Pct: e.target.value })}
                  placeholder="Percentage %"
                  data-testid="input-destination-3-pct"
                />
              </div>
            </div>

            <div>
              <Label>What percentage of your trips are:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <Label htmlFor="tripPctAirport" className="text-sm text-muted-foreground">Airport</Label>
                  <Input
                    id="tripPctAirport"
                    value={formData.tripPctAirport}
                    onChange={(e) => setFormData({ ...formData, tripPctAirport: e.target.value })}
                    placeholder="%"
                    data-testid="input-trip-pct-airport"
                  />
                </div>
                <div>
                  <Label htmlFor="tripPctCorporate" className="text-sm text-muted-foreground">Corporate</Label>
                  <Input
                    id="tripPctCorporate"
                    value={formData.tripPctCorporate}
                    onChange={(e) => setFormData({ ...formData, tripPctCorporate: e.target.value })}
                    placeholder="%"
                    data-testid="input-trip-pct-corporate"
                  />
                </div>
                <div>
                  <Label htmlFor="tripPctWeddingsFunerals" className="text-sm text-muted-foreground">Weddings/Funerals</Label>
                  <Input
                    id="tripPctWeddingsFunerals"
                    value={formData.tripPctWeddingsFunerals}
                    onChange={(e) => setFormData({ ...formData, tripPctWeddingsFunerals: e.target.value })}
                    placeholder="%"
                    data-testid="input-trip-pct-weddings"
                  />
                </div>
                <div>
                  <Label htmlFor="tripPctPromNightOut" className="text-sm text-muted-foreground">Prom/Night-on-the-Town</Label>
                  <Input
                    id="tripPctPromNightOut"
                    value={formData.tripPctPromNightOut}
                    onChange={(e) => setFormData({ ...formData, tripPctPromNightOut: e.target.value })}
                    placeholder="%"
                    data-testid="input-trip-pct-prom"
                  />
                </div>
                <div>
                  <Label htmlFor="tripPctOther" className="text-sm text-muted-foreground">Other</Label>
                  <Input
                    id="tripPctOther"
                    value={formData.tripPctOther}
                    onChange={(e) => setFormData({ ...formData, tripPctOther: e.target.value })}
                    placeholder="%"
                    data-testid="input-trip-pct-other"
                  />
                </div>
                <div>
                  <Label htmlFor="tripPctOtherDescribe" className="text-sm text-muted-foreground">Describe Other</Label>
                  <Input
                    id="tripPctOtherDescribe"
                    value={formData.tripPctOtherDescribe}
                    onChange={(e) => setFormData({ ...formData, tripPctOtherDescribe: e.target.value })}
                    placeholder="Description"
                    data-testid="input-trip-pct-other-describe"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reservations24HoursPct">What percentage of reservations are made 24 hours in advance?</Label>
                <Input
                  id="reservations24HoursPct"
                  value={formData.reservations24HoursPct}
                  onChange={(e) => setFormData({ ...formData, reservations24HoursPct: e.target.value })}
                  placeholder="%"
                  data-testid="input-reservations-24hrs-pct"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="transportAthleticsEntertainment"
                    checked={formData.transportAthleticsEntertainment}
                    onCheckedChange={(checked) => setFormData({ ...formData, transportAthleticsEntertainment: checked as boolean })}
                    data-testid="checkbox-transport-athletics"
                  />
                  <Label htmlFor="transportAthleticsEntertainment" className="cursor-pointer">
                    Transport professional athletic teams or entertainment groups?
                  </Label>
                </div>
                {formData.transportAthleticsEntertainment && (
                  <Textarea
                    value={formData.athleticsEntertainmentDetails}
                    onChange={(e) => setFormData({ ...formData, athleticsEntertainmentDetails: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-athletics-details"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="expectedCostOfHire">Expected Cost of Hire for hired autos next year</Label>
                <Input
                  id="expectedCostOfHire"
                  value={formData.expectedCostOfHire}
                  onChange={(e) => setFormData({ ...formData, expectedCostOfHire: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-cost-of-hire"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="leasesVehiclesFromOthers"
                    checked={formData.leasesVehiclesFromOthers}
                    onCheckedChange={(checked) => setFormData({ ...formData, leasesVehiclesFromOthers: checked as boolean })}
                    data-testid="checkbox-leases-from-others"
                  />
                  <Label htmlFor="leasesVehiclesFromOthers" className="cursor-pointer">
                    Lease vehicles from others?
                  </Label>
                </div>
                {formData.leasesVehiclesFromOthers && (
                  <Input
                    value={formData.leasesVehiclesPct}
                    onChange={(e) => setFormData({ ...formData, leasesVehiclesPct: e.target.value })}
                    placeholder="What percentage?"
                    data-testid="input-leases-pct"
                  />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="leasesVehiclesToOthers"
                  checked={formData.leasesVehiclesToOthers}
                  onCheckedChange={(checked) => setFormData({ ...formData, leasesVehiclesToOthers: checked as boolean })}
                  data-testid="checkbox-leases-to-others"
                />
                <Label htmlFor="leasesVehiclesToOthers" className="cursor-pointer">
                  Lease or rent out vehicles to others (without driver)?
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usesOwnerOperators"
                  checked={formData.usesOwnerOperators}
                  onCheckedChange={(checked) => setFormData({ ...formData, usesOwnerOperators: checked as boolean })}
                  data-testid="checkbox-owner-operators"
                />
                <Label htmlFor="usesOwnerOperators" className="cursor-pointer">
                  Use or hire Owner-Operators?
                </Label>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesTncApps"
                    checked={formData.usesTncApps}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesTncApps: checked as boolean })}
                    data-testid="checkbox-tnc-apps"
                  />
                  <Label htmlFor="usesTncApps" className="cursor-pointer">
                    Does the Applicant or any drivers utilize Transportation Network Company Mobile Applications (Uber, Lyft, etc.)?
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Driver Information */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="driversReplacedLast12Months">Within the last 12 months, how many drivers has the Applicant replaced?</Label>
                <Input
                  id="driversReplacedLast12Months"
                  value={formData.driversReplacedLast12Months}
                  onChange={(e) => setFormData({ ...formData, driversReplacedLast12Months: e.target.value })}
                  placeholder="Number"
                  data-testid="input-drivers-replaced"
                />
              </div>

              <div>
                <Label htmlFor="driversAddedLast12Months">Drivers Added</Label>
                <Input
                  id="driversAddedLast12Months"
                  value={formData.driversAddedLast12Months}
                  onChange={(e) => setFormData({ ...formData, driversAddedLast12Months: e.target.value })}
                  placeholder="Number"
                  data-testid="input-drivers-added"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drugTestingRequired"
                  checked={formData.drugTestingRequired}
                  onCheckedChange={(checked) => setFormData({ ...formData, drugTestingRequired: checked as boolean })}
                  data-testid="checkbox-drug-testing"
                />
                <Label htmlFor="drugTestingRequired" className="cursor-pointer">
                  Does driver selection procedure include drug testing?
                </Label>
              </div>

              <div>
                <Label htmlFor="minimumAgeOfDrivers">Minimum Age of Drivers</Label>
                <Input
                  id="minimumAgeOfDrivers"
                  value={formData.minimumAgeOfDrivers}
                  onChange={(e) => setFormData({ ...formData, minimumAgeOfDrivers: e.target.value })}
                  placeholder="Age"
                  data-testid="input-minimum-driver-age"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="hasDriverRecruitmentProgram"
                    checked={formData.hasDriverRecruitmentProgram}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasDriverRecruitmentProgram: checked as boolean })}
                    data-testid="checkbox-recruitment-program"
                  />
                  <Label htmlFor="hasDriverRecruitmentProgram" className="cursor-pointer">
                    Does the Applicant have a driver recruitment program?
                  </Label>
                </div>
                {formData.hasDriverRecruitmentProgram && (
                  <Textarea
                    value={formData.recruitmentProgramDetails}
                    onChange={(e) => setFormData({ ...formData, recruitmentProgramDetails: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-recruitment-details"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="workersCompForAllDrivers"
                    checked={formData.workersCompForAllDrivers}
                    onCheckedChange={(checked) => setFormData({ ...formData, workersCompForAllDrivers: checked as boolean })}
                    data-testid="checkbox-workers-comp"
                  />
                  <Label htmlFor="workersCompForAllDrivers" className="cursor-pointer">
                    Provide Workers' Compensation coverage for all drivers and employees?
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {formData.workersCompForAllDrivers ? (
                    <Input
                      value={formData.workersCompCarrier}
                      onChange={(e) => setFormData({ ...formData, workersCompCarrier: e.target.value })}
                      placeholder="Specify insurance carrier"
                      data-testid="input-workers-comp-carrier"
                    />
                  ) : (
                    <Input
                      value={formData.workersCompExplanation}
                      onChange={(e) => setFormData({ ...formData, workersCompExplanation: e.target.value })}
                      placeholder="Provide explanation"
                      data-testid="input-workers-comp-explanation"
                    />
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="allDriversAreEmployees"
                    checked={formData.allDriversAreEmployees}
                    onCheckedChange={(checked) => setFormData({ ...formData, allDriversAreEmployees: checked as boolean })}
                    data-testid="checkbox-all-drivers-employees"
                  />
                  <Label htmlFor="allDriversAreEmployees" className="cursor-pointer">
                    Are all drivers your employees?
                  </Label>
                </div>
                {!formData.allDriversAreEmployees && (
                  <Textarea
                    value={formData.driversNotEmployeesExplanation}
                    onChange={(e) => setFormData({ ...formData, driversNotEmployeesExplanation: e.target.value })}
                    placeholder="Provide explanation"
                    data-testid="textarea-drivers-not-employees"
                  />
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Formal Driving Policy</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasFormalDrivingPolicy"
                  checked={formData.hasFormalDrivingPolicy}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasFormalDrivingPolicy: checked as boolean })}
                  data-testid="checkbox-formal-policy"
                />
                <Label htmlFor="hasFormalDrivingPolicy" className="cursor-pointer font-medium">
                  Does the Applicant have a formal driving policy in place with MVR standards?
                </Label>
              </div>

              {formData.hasFormalDrivingPolicy && (
                <div className="pl-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="drivingPolicyCommunicatedInWriting"
                      checked={formData.drivingPolicyCommunicatedInWriting}
                      onCheckedChange={(checked) => setFormData({ ...formData, drivingPolicyCommunicatedInWriting: checked as boolean })}
                      data-testid="checkbox-policy-written"
                    />
                    <Label htmlFor="drivingPolicyCommunicatedInWriting" className="cursor-pointer">
                      Is driving policy communicated in writing to all employees?
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="signedAcknowledgmentOnFile"
                      checked={formData.signedAcknowledgmentOnFile}
                      onCheckedChange={(checked) => setFormData({ ...formData, signedAcknowledgmentOnFile: checked as boolean })}
                      data-testid="checkbox-signed-acknowledgment"
                    />
                    <Label htmlFor="signedAcknowledgmentOnFile" className="cursor-pointer">
                      Is a signed acknowledgment form kept on file?
                    </Label>
                  </div>

                  <div className="mt-3">
                    <Label className="font-medium">Do driving standards include the following:</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="noMajorViolations"
                          checked={formData.noMajorViolations}
                          onCheckedChange={(checked) => setFormData({ ...formData, noMajorViolations: checked as boolean })}
                          data-testid="checkbox-no-major-violations"
                        />
                        <Label htmlFor="noMajorViolations" className="cursor-pointer">
                          No major violations (DUI, racing, hit and run, speeding 20+ mph over limit, manslaughter)
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="noMoreThan2MovingViolations"
                          checked={formData.noMoreThan2MovingViolations}
                          onCheckedChange={(checked) => setFormData({ ...formData, noMoreThan2MovingViolations: checked as boolean })}
                          data-testid="checkbox-no-more-2-violations"
                        />
                        <Label htmlFor="noMoreThan2MovingViolations" className="cursor-pointer">
                          No more than 2 moving violations within past 3 years
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="noMoreThan1AtFaultAccident"
                          checked={formData.noMoreThan1AtFaultAccident}
                          onCheckedChange={(checked) => setFormData({ ...formData, noMoreThan1AtFaultAccident: checked as boolean })}
                          data-testid="checkbox-no-more-1-accident"
                        />
                        <Label htmlFor="noMoreThan1AtFaultAccident" className="cursor-pointer">
                          No more than 1 at-fault accident within past 3 years
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="mvrCheckFrequency">How often does the Applicant check MVR reports?</Label>
                <Input
                  id="mvrCheckFrequency"
                  value={formData.mvrCheckFrequency}
                  onChange={(e) => setFormData({ ...formData, mvrCheckFrequency: e.target.value })}
                  placeholder="e.g., Annually, Every 6 months"
                  data-testid="input-mvr-frequency"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newDriversRequireTraining"
                  checked={formData.newDriversRequireTraining}
                  onCheckedChange={(checked) => setFormData({ ...formData, newDriversRequireTraining: checked as boolean })}
                  data-testid="checkbox-new-driver-training"
                />
                <Label htmlFor="newDriversRequireTraining" className="cursor-pointer">
                  Does the Applicant allow newly hired drivers to operate vehicles without company-specific documented driver training?
                </Label>
              </div>

              <div>
                <Label htmlFor="ongoingDriverTraining">Describe any ongoing training provided to drivers</Label>
                <Textarea
                  id="ongoingDriverTraining"
                  value={formData.ongoingDriverTraining}
                  onChange={(e) => setFormData({ ...formData, ongoingDriverTraining: e.target.value })}
                  placeholder="Defensive driving, customer service, safety training, etc."
                  rows={3}
                  data-testid="textarea-ongoing-training"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="employeesDrivePersonalVehicles"
                    checked={formData.employeesDrivePersonalVehicles}
                    onCheckedChange={(checked) => setFormData({ ...formData, employeesDrivePersonalVehicles: checked as boolean })}
                    data-testid="checkbox-personal-vehicles"
                  />
                  <Label htmlFor="employeesDrivePersonalVehicles" className="cursor-pointer font-medium">
                    Does the Applicant allow employees to drive personal vehicles for company purposes?
                  </Label>
                </div>

                {formData.employeesDrivePersonalVehicles && (
                  <div className="pl-6 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="personalVehicleSamePolicy"
                        checked={formData.personalVehicleSamePolicy}
                        onCheckedChange={(checked) => setFormData({ ...formData, personalVehicleSamePolicy: checked as boolean })}
                        data-testid="checkbox-personal-same-policy"
                      />
                      <Label htmlFor="personalVehicleSamePolicy" className="cursor-pointer">
                        Are the driving policy and standards for these drivers the same?
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="personalVehicleAdequateLimits"
                        checked={formData.personalVehicleAdequateLimits}
                        onCheckedChange={(checked) => setFormData({ ...formData, personalVehicleAdequateLimits: checked as boolean })}
                        data-testid="checkbox-personal-adequate-limits"
                      />
                      <Label htmlFor="personalVehicleAdequateLimits" className="cursor-pointer">
                        Does the Applicant require these employees to have adequate personal insurance limits?
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">Driver Schedule</h3>
                <Button type="button" onClick={addDriver} variant="outline" size="sm" data-testid="button-add-driver">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Driver
                </Button>
              </div>

              {drivers.map((driver, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Driver #{index + 1}</h4>
                    {drivers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDriver(index)}
                        data-testid={`button-remove-driver-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor={`driver-name-${index}`}>Driver Name *</Label>
                      <Input
                        id={`driver-name-${index}`}
                        value={driver.name}
                        onChange={(e) => updateDriver(index, "name", e.target.value)}
                        placeholder="Full Name"
                        data-testid={`input-driver-name-${index}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`driver-dob-${index}`}>Date of Birth *</Label>
                      <Input
                        id={`driver-dob-${index}`}
                        type="date"
                        value={driver.dateOfBirth}
                        onChange={(e) => updateDriver(index, "dateOfBirth", e.target.value)}
                        data-testid={`input-driver-dob-${index}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`driver-license-${index}`}>Driver's License Number *</Label>
                      <Input
                        id={`driver-license-${index}`}
                        value={driver.licenseNumber}
                        onChange={(e) => updateDriver(index, "licenseNumber", e.target.value)}
                        placeholder="License Number"
                        data-testid={`input-driver-license-${index}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`driver-state-${index}`}>License State *</Label>
                      <Select 
                        value={driver.state} 
                        onValueChange={(value) => updateDriver(index, "state", value)}
                      >
                        <SelectTrigger id={`driver-state-${index}`} data-testid={`select-driver-state-${index}`}>
                          <SelectValue placeholder="Select State" />
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
                      <Label htmlFor={`driver-years-licensed-${index}`}>Years Licensed *</Label>
                      <Input
                        id={`driver-years-licensed-${index}`}
                        value={driver.yearsLicensed}
                        onChange={(e) => updateDriver(index, "yearsLicensed", e.target.value)}
                        placeholder="Years"
                        data-testid={`input-driver-years-licensed-${index}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`driver-years-experience-${index}`}>Years Experience *</Label>
                      <Input
                        id={`driver-years-experience-${index}`}
                        value={driver.yearsExperience}
                        onChange={(e) => updateDriver(index, "yearsExperience", e.target.value)}
                        placeholder="Years"
                        data-testid={`input-driver-years-experience-${index}`}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Prior Insurance History */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Current Policy Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentCarrier">Current Insurance Carrier</Label>
                <Input
                  id="currentCarrier"
                  value={formData.currentCarrier}
                  onChange={(e) => setFormData({ ...formData, currentCarrier: e.target.value })}
                  placeholder="Carrier Name"
                  data-testid="input-current-carrier"
                />
              </div>

              <div>
                <Label htmlFor="currentAutoLiabilityPremium">Auto Liability Premium</Label>
                <Input
                  id="currentAutoLiabilityPremium"
                  value={formData.currentAutoLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, currentAutoLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-current-auto-premium"
                />
              </div>

              <div>
                <Label htmlFor="currentPhysicalDamagePremium">Physical Damage Premium</Label>
                <Input
                  id="currentPhysicalDamagePremium"
                  value={formData.currentPhysicalDamagePremium}
                  onChange={(e) => setFormData({ ...formData, currentPhysicalDamagePremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-current-pd-premium"
                />
              </div>

              <div className="md:col-span-3">
                <Label htmlFor="currentGeneralLiabilityPremium">General Liability Premium</Label>
                <Input
                  id="currentGeneralLiabilityPremium"
                  value={formData.currentGeneralLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, currentGeneralLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-current-gl-premium"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Prior Year 1 Policy Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="priorYear1Carrier">Insurance Carrier</Label>
                <Input
                  id="priorYear1Carrier"
                  value={formData.priorYear1Carrier}
                  onChange={(e) => setFormData({ ...formData, priorYear1Carrier: e.target.value })}
                  placeholder="Carrier Name"
                  data-testid="input-prior1-carrier"
                />
              </div>

              <div>
                <Label htmlFor="priorYear1AutoLiabilityPremium">Auto Liability</Label>
                <Input
                  id="priorYear1AutoLiabilityPremium"
                  value={formData.priorYear1AutoLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, priorYear1AutoLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior1-auto"
                />
              </div>

              <div>
                <Label htmlFor="priorYear1PhysicalDamagePremium">Physical Damage</Label>
                <Input
                  id="priorYear1PhysicalDamagePremium"
                  value={formData.priorYear1PhysicalDamagePremium}
                  onChange={(e) => setFormData({ ...formData, priorYear1PhysicalDamagePremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior1-pd"
                />
              </div>

              <div>
                <Label htmlFor="priorYear1GeneralLiabilityPremium">General Liability</Label>
                <Input
                  id="priorYear1GeneralLiabilityPremium"
                  value={formData.priorYear1GeneralLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, priorYear1GeneralLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior1-gl"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Prior Year 2 Policy Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="priorYear2Carrier">Insurance Carrier</Label>
                <Input
                  id="priorYear2Carrier"
                  value={formData.priorYear2Carrier}
                  onChange={(e) => setFormData({ ...formData, priorYear2Carrier: e.target.value })}
                  placeholder="Carrier Name"
                  data-testid="input-prior2-carrier"
                />
              </div>

              <div>
                <Label htmlFor="priorYear2AutoLiabilityPremium">Auto Liability</Label>
                <Input
                  id="priorYear2AutoLiabilityPremium"
                  value={formData.priorYear2AutoLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, priorYear2AutoLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior2-auto"
                />
              </div>

              <div>
                <Label htmlFor="priorYear2PhysicalDamagePremium">Physical Damage</Label>
                <Input
                  id="priorYear2PhysicalDamagePremium"
                  value={formData.priorYear2PhysicalDamagePremium}
                  onChange={(e) => setFormData({ ...formData, priorYear2PhysicalDamagePremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior2-pd"
                />
              </div>

              <div>
                <Label htmlFor="priorYear2GeneralLiabilityPremium">General Liability</Label>
                <Input
                  id="priorYear2GeneralLiabilityPremium"
                  value={formData.priorYear2GeneralLiabilityPremium}
                  onChange={(e) => setFormData({ ...formData, priorYear2GeneralLiabilityPremium: e.target.value })}
                  placeholder="$ Amount"
                  data-testid="input-prior2-gl"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Additional History Questions</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="currentPolicyCancelled"
                    checked={formData.currentPolicyCancelled}
                    onCheckedChange={(checked) => setFormData({ ...formData, currentPolicyCancelled: checked as boolean })}
                    data-testid="checkbox-policy-cancelled"
                  />
                  <Label htmlFor="currentPolicyCancelled" className="cursor-pointer">
                    Is the Applicant's present policy being cancelled or non-renewed?
                  </Label>
                </div>
                {formData.currentPolicyCancelled && (
                  <Textarea
                    value={formData.cancellationExplanation}
                    onChange={(e) => setFormData({ ...formData, cancellationExplanation: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-cancellation-explanation"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="hadAssignedRiskPlan"
                    checked={formData.hadAssignedRiskPlan}
                    onCheckedChange={(checked) => setFormData({ ...formData, hadAssignedRiskPlan: checked as boolean })}
                    data-testid="checkbox-assigned-risk"
                  />
                  <Label htmlFor="hadAssignedRiskPlan" className="cursor-pointer">
                    Has the Applicant's insurance ever been obtained through an Assigned Risk Plan?
                  </Label>
                </div>
                {formData.hadAssignedRiskPlan && (
                  <Textarea
                    value={formData.assignedRiskExplanation}
                    onChange={(e) => setFormData({ ...formData, assignedRiskExplanation: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-assigned-risk-explanation"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="filedBankruptcy"
                    checked={formData.filedBankruptcy}
                    onCheckedChange={(checked) => setFormData({ ...formData, filedBankruptcy: checked as boolean })}
                    data-testid="checkbox-bankruptcy"
                  />
                  <Label htmlFor="filedBankruptcy" className="cursor-pointer">
                    Has the Applicant ever filed or are planning to file for reorganization or bankruptcy?
                  </Label>
                </div>
                {formData.filedBankruptcy && (
                  <Textarea
                    value={formData.bankruptcyExplanation}
                    onChange={(e) => setFormData({ ...formData, bankruptcyExplanation: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-bankruptcy-explanation"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="otherPublicTransportationOwnership">Name(s) of any other public transportation entity(ies) in which named insured or officers have ownership interest</Label>
                <Textarea
                  id="otherPublicTransportationOwnership"
                  value={formData.otherPublicTransportationOwnership}
                  onChange={(e) => setFormData({ ...formData, otherPublicTransportationOwnership: e.target.value })}
                  placeholder="List entities, if any"
                  rows={2}
                  data-testid="textarea-other-ownership"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="allAutosOwnedOrLeased"
                    checked={formData.allAutosOwnedOrLeased}
                    onCheckedChange={(checked) => setFormData({ ...formData, allAutosOwnedOrLeased: checked as boolean })}
                    data-testid="checkbox-autos-owned"
                  />
                  <Label htmlFor="allAutosOwnedOrLeased" className="cursor-pointer">
                    Except for encumbrances, are all autos owned by, leased to, or registered to the Applicant?
                  </Label>
                </div>
                {!formData.allAutosOwnedOrLeased && (
                  <Textarea
                    value={formData.autosNotOwnedExplanation}
                    onChange={(e) => setFormData({ ...formData, autosNotOwnedExplanation: e.target.value })}
                    placeholder="Please explain"
                    data-testid="textarea-autos-not-owned"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="priorGapsInCoverage">Please explain any prior gaps in insurance coverage</Label>
                <Textarea
                  id="priorGapsInCoverage"
                  value={formData.priorGapsInCoverage}
                  onChange={(e) => setFormData({ ...formData, priorGapsInCoverage: e.target.value })}
                  placeholder="Explanation of gaps, if any"
                  rows={2}
                  data-testid="textarea-gaps-coverage"
                />
              </div>

              <div>
                <Label htmlFor="lossHistory">Loss History (Details of all losses exceeding $25,000)</Label>
                <Textarea
                  id="lossHistory"
                  value={formData.lossHistory}
                  onChange={(e) => setFormData({ ...formData, lossHistory: e.target.value })}
                  placeholder="Date, amount incurred, number of claims, description"
                  rows={4}
                  data-testid="textarea-loss-history"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Vehicle Schedule & Review */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Vehicle Schedule</h3>
              <Button type="button" onClick={addVehicle} variant="outline" size="sm" data-testid="button-add-vehicle">
                <Plus className="h-4 w-4 mr-1" />
                Add Vehicle
              </Button>
            </div>

            {vehicles.map((vehicle, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Vehicle #{index + 1}</h4>
                  {vehicles.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVehicle(index)}
                      data-testid={`button-remove-vehicle-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      placeholder="e.g., Lincoln"
                      data-testid={`input-vehicle-make-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-model-${index}`}>Model</Label>
                    <Input
                      id={`vehicle-model-${index}`}
                      value={vehicle.model}
                      onChange={(e) => updateVehicle(index, "model", e.target.value)}
                      placeholder="e.g., Town Car"
                      data-testid={`input-vehicle-model-${index}`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`vehicle-vin-${index}`}>VIN</Label>
                    <Input
                      id={`vehicle-vin-${index}`}
                      value={vehicle.vin}
                      onChange={(e) => updateVehicle(index, "vin", e.target.value)}
                      placeholder="17-character VIN"
                      data-testid={`input-vehicle-vin-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-gvwr-${index}`}>GVWR</Label>
                    <Input
                      id={`vehicle-gvwr-${index}`}
                      value={vehicle.gvwr}
                      onChange={(e) => updateVehicle(index, "gvwr", e.target.value)}
                      placeholder="lbs"
                      data-testid={`input-vehicle-gvwr-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-color-${index}`}>Color</Label>
                    <Input
                      id={`vehicle-color-${index}`}
                      value={vehicle.color}
                      onChange={(e) => updateVehicle(index, "color", e.target.value)}
                      placeholder="e.g., Black"
                      data-testid={`input-vehicle-color-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-stretch-${index}`}>Length of Stretch</Label>
                    <Input
                      id={`vehicle-stretch-${index}`}
                      value={vehicle.lengthOfStretch}
                      onChange={(e) => updateVehicle(index, "lengthOfStretch", e.target.value)}
                      placeholder="inches"
                      data-testid={`input-vehicle-stretch-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-passengers-${index}`}>Number of Passengers</Label>
                    <Input
                      id={`vehicle-passengers-${index}`}
                      value={vehicle.passengers}
                      onChange={(e) => updateVehicle(index, "passengers", e.target.value)}
                      placeholder="e.g., 8"
                      data-testid={`input-vehicle-passengers-${index}`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`vehicle-garage-${index}`}>Garage Location</Label>
                    <Input
                      id={`vehicle-garage-${index}`}
                      value={vehicle.garageLocation}
                      onChange={(e) => updateVehicle(index, "garageLocation", e.target.value)}
                      placeholder="Address or City, State"
                      data-testid={`input-vehicle-garage-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-value-${index}`}>Vehicle Value</Label>
                    <Input
                      id={`vehicle-value-${index}`}
                      value={vehicle.value}
                      onChange={(e) => updateVehicle(index, "value", e.target.value)}
                      placeholder="$ Amount"
                      data-testid={`input-vehicle-value-${index}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-comp-ded-${index}`}>Comprehensive Deductible</Label>
                    <Select 
                      value={vehicle.comprehensiveDeductible} 
                      onValueChange={(value) => updateVehicle(index, "comprehensiveDeductible", value)}
                    >
                      <SelectTrigger id={`vehicle-comp-ded-${index}`} data-testid={`select-vehicle-comp-ded-${index}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$1,000">$1,000</SelectItem>
                        <SelectItem value="$2,000">$2,000</SelectItem>
                        <SelectItem value="$3,000">$3,000</SelectItem>
                        <SelectItem value="$5,000">$5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-coll-ded-${index}`}>Collision Deductible</Label>
                    <Select 
                      value={vehicle.collisionDeductible} 
                      onValueChange={(value) => updateVehicle(index, "collisionDeductible", value)}
                    >
                      <SelectTrigger id={`vehicle-coll-ded-${index}`} data-testid={`select-vehicle-coll-ded-${index}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$1,000">$1,000</SelectItem>
                        <SelectItem value="$2,000">$2,000</SelectItem>
                        <SelectItem value="$3,000">$3,000</SelectItem>
                        <SelectItem value="$5,000">$5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`vehicle-personal-use-${index}`}>Personal Use?</Label>
                    <RadioGroup 
                      value={vehicle.personalUse} 
                      onValueChange={(value) => updateVehicle(index, "personalUse", value)}
                    >
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id={`personal-yes-${index}`} data-testid={`radio-personal-yes-${index}`} />
                          <Label htmlFor={`personal-yes-${index}`} className="cursor-pointer font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`personal-no-${index}`} data-testid={`radio-personal-no-${index}`} />
                          <Label htmlFor={`personal-no-${index}`} className="cursor-pointer font-normal">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </Card>
            ))}

            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Any additional information you'd like to provide"
                rows={4}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted p-6 rounded-md">
              <h4 className="font-semibold text-foreground mb-3">Submission Requirements</h4>
              <p className="text-sm text-muted-foreground mb-2">Upon binding, the following documents will be required:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Currently valued insurance company loss runs for the current and prior three (3) years</li>
                <li>An updated drivers list with current MVRs (less than 3 months old) for each driver</li>
                <li>An updated Vehicle Schedule</li>
                <li>Signed application by both Applicant and Producer</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)} data-testid="button-previous">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} className="ml-auto" data-testid="button-submit">
              Submit Quote Request
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
      <QuickQuoteForm insuranceType="Limousine" />
    </div>
    </>
  );
}
