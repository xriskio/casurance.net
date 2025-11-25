import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

interface Vehicle {
  year: string;
  make: string;
  bodyType: string;
  gvw: string;
  value: string;
  vin: string;
}

interface Driver {
  name: string;
  dob: string;
  cdlExperience: string;
  accidents: string;
  violations: string;
}

export default function TruckingQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Agency & Applicant Information
    agencyName: "",
    agencyPhone: "",
    agencyEmail: "",
    companyName: "",
    websiteAddress: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    phone: "",
    email: "",
    garagingAddress: "",
    garagingCity: "",
    garagingState: "",
    garagingZip: "",
    inspectionContact: "",
    
    // DOT & Business Information
    effectiveDate: "",
    dotNumber: "",
    mcNumber: "",
    feinNumber: "",
    yearsExperience: "",
    yearsInBusiness: "",
    
    // Operation Type
    operationType: [] as string[],
    carrierType: "",
    
    // Coverage Limits & Deductibles
    autoLiabilityLimit: "",
    autoLiabilityDeductible: "",
    cargoLimit: "",
    cargoDeductible: "",
    generalLiabilityLimit: "",
    generalLiabilityDeductible: "",
    
    // Specialized Transportation Coverages
    inlandMarineTransportation: "",
    furnitureMoversWarehouse: "",
    motorTruckCargoAuto: "",
    motorTruckCargo: "",
    mtcLegalLiability: "",
    vehiclePhysicalDamage: "",
    transportationLocation: "",
    warehousemanLegalLiability: "",
    householdGoodsMovers: "",
    
    // Historical Information
    powerUnitsCurrent: "",
    powerUnits1stPrior: "",
    powerUnits2ndPrior: "",
    powerUnits3rdPrior: "",
    grossReceiptsEstimated: "",
    grossReceiptsCurrent: "",
    grossReceipts1stPrior: "",
    grossReceipts2ndPrior: "",
    grossMileageEstimated: "",
    grossMileageCurrent: "",
    grossMileage1stPrior: "",
    grossMileage2ndPrior: "",
    
    // Commodities Hauled
    commoditiesHauled: "",
    averageLoadValue: "",
    
    // Operating Radius
    operatingRadius: "",
    
    // Driver Information
    totalDrivers: "",
    driversOver70: "",
    driversUnder25: "",
    driversHired: "",
    driversTerminated: "",
    maxHoursPerDay: "",
    maxHoursPerWeek: "",
    avgDriverExperience: "",
    percentOnDemand: "",
    percentRoute: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    insuranceCancelled: false,
    useOwnerOperators: false,
    ownerOpsLeased: false,
    ownerOpsOnSchedule: false,
    tripLeaseOperators: false,
    brokerageAuthority: false,
    separateMC: false,
    teamDriving: false,
    passengersAllowed: false,
    oversizeLoads: false,
    deadHeading: false,
    bobtail: false,
    rentToOthers: false,
    rentShortTerm: false,
    operateCanadaMexico: false,
    timeGuarantees: false,
    doubleTripleTrailers: false,
    oversizeOverweight: false,
    safetyProgram: false,
    crossBorder: false,
    allowOthersUnderAuthority: false,
    writtenMaintenance: false,
    personalUse: false,
    allVehiclesRegistered: false,
    hireOthersVehicles: false,
    driverSelectionProgram: false,
    driverMonitoring: false,
    monitorMVRs: false,
    biNationalDrivers: false,
    penaltyLateDelivery: false,
    driversProperlyLicensed: false,
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { year: "", make: "", bodyType: "", gvw: "", value: "", vin: "" }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    { name: "", dob: "", cdlExperience: "", accidents: "", violations: "" }
  ]);

  const [filingStates, setFilingStates] = useState<string[]>([]);

  const addVehicle = () => {
    setVehicles([...vehicles, { year: "", make: "", bodyType: "", gvw: "", value: "", vin: "" }]);
  };

  const removeVehicle = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const addDriver = () => {
    setDrivers([...drivers, { name: "", dob: "", cdlExperience: "", accidents: "", violations: "" }]);
  };

  const removeDriver = (index: number) => {
    setDrivers(drivers.filter((_, i) => i !== index));
  };

  const updateDriver = (index: number, field: keyof Driver, value: string) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const handleOperationTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      operationType: prev.operationType.includes(type)
        ? prev.operationType.filter(t => t !== type)
        : [...prev.operationType, type]
    }));
  };

  const handleFilingStateToggle = (state: string) => {
    setFilingStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/trucking-quotes", {
        ...formData,
        payload: { ...formData, checkboxes, vehicles, drivers, filingStates }
      });
      
      setReferenceNumber(response.referenceNumber);
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: `Your reference number is ${response.referenceNumber}`,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Transportation Quote Request Received!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your detailed submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our transportation insurance specialists will review your fleet information, driver history, and operational details. You'll receive a competitive quote within 24-48 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Transportation Insurance Application</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive application for trucking and transportation insurance. Include all vehicles, drivers, and operational details for accurate pricing.
        </p>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
              data-testid={`progress-step-${s}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Agency & Applicant Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Agency & Applicant Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input
                  id="agencyName"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  placeholder="Agency name"
                  data-testid="input-agency-name"
                />
              </div>
              <div>
                <Label htmlFor="agencyPhone">Agency Phone</Label>
                <Input
                  id="agencyPhone"
                  type="tel"
                  value={formData.agencyPhone}
                  onChange={(e) => setFormData({ ...formData, agencyPhone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-agency-phone"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="agencyEmail">Agency Email</Label>
              <Input
                id="agencyEmail"
                type="email"
                value={formData.agencyEmail}
                onChange={(e) => setFormData({ ...formData, agencyEmail: e.target.value })}
                placeholder="agency@example.com"
                data-testid="input-agency-email"
              />
            </div>

            <div className="border-t pt-4 mt-6">
              <h4 className="font-medium mb-4">Insured Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Insured Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Legal business name"
                    data-testid="input-insured-name"
                  />
                </div>
                <div>
                  <Label htmlFor="websiteAddress">Website Address</Label>
                  <Input
                    id="websiteAddress"
                    type="url"
                    value={formData.websiteAddress}
                    onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                    placeholder="https://www.example.com"
                    data-testid="input-website"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Mailing Address *</Label>
                <Input
                  value={formData.mailingAddress}
                  onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                  placeholder="Street address"
                  className="mb-2"
                  data-testid="input-mailing-address"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    value={formData.mailingCity}
                    onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
                    placeholder="City"
                    data-testid="input-mailing-city"
                  />
                  <Input
                    value={formData.mailingState}
                    onChange={(e) => setFormData({ ...formData, mailingState: e.target.value })}
                    placeholder="State"
                    maxLength={2}
                    data-testid="input-mailing-state"
                  />
                  <Input
                    value={formData.mailingZip}
                    onChange={(e) => setFormData({ ...formData, mailingZip: e.target.value })}
                    placeholder="ZIP Code"
                    data-testid="input-mailing-zip"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    data-testid="input-phone"
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
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Garaging Address *</Label>
                <Input
                  value={formData.garagingAddress}
                  onChange={(e) => setFormData({ ...formData, garagingAddress: e.target.value })}
                  placeholder="Street address"
                  className="mb-2"
                  data-testid="input-garaging-address"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    value={formData.garagingCity}
                    onChange={(e) => setFormData({ ...formData, garagingCity: e.target.value })}
                    placeholder="City"
                    data-testid="input-garaging-city"
                  />
                  <Input
                    value={formData.garagingState}
                    onChange={(e) => setFormData({ ...formData, garagingState: e.target.value })}
                    placeholder="State"
                    maxLength={2}
                    data-testid="input-garaging-state"
                  />
                  <Input
                    value={formData.garagingZip}
                    onChange={(e) => setFormData({ ...formData, garagingZip: e.target.value })}
                    placeholder="ZIP Code"
                    data-testid="input-garaging-zip"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="inspectionContact">Contact for Inspection</Label>
                <Input
                  id="inspectionContact"
                  value={formData.inspectionContact}
                  onChange={(e) => setFormData({ ...formData, inspectionContact: e.target.value })}
                  placeholder="Name and phone"
                  data-testid="input-inspection-contact"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: DOT, Business & Operations Information */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">DOT, Business & Operations Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  data-testid="input-effective-date"
                />
              </div>
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  placeholder="0"
                  data-testid="input-years-in-business"
                />
                <p className="text-xs text-muted-foreground mt-1">If less than 3 years, please provide work history</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dotNumber">DOT Number *</Label>
                <Input
                  id="dotNumber"
                  value={formData.dotNumber}
                  onChange={(e) => setFormData({ ...formData, dotNumber: e.target.value })}
                  placeholder="DOT#"
                  data-testid="input-dot-number"
                />
              </div>
              <div>
                <Label htmlFor="mcNumber">MC Number</Label>
                <Input
                  id="mcNumber"
                  value={formData.mcNumber}
                  onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                  placeholder="MC#"
                  data-testid="input-mc-number"
                />
              </div>
              <div>
                <Label htmlFor="feinNumber">FEIN Number *</Label>
                <Input
                  id="feinNumber"
                  value={formData.feinNumber}
                  onChange={(e) => setFormData({ ...formData, feinNumber: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  data-testid="input-fein"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="yearsExperience">Years of Experience in Similar Industry *</Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                placeholder="0"
                data-testid="input-years-experience"
              />
            </div>

            <div>
              <Label>Type of Operation (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {["Courier", "Expeditor", "Freight Broker", "Last Mile", "Intermodal", "Local Trucking", "Intermediate Trucking", "Long Haul Trucking"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`op-${type}`}
                      checked={formData.operationType.includes(type)}
                      onCheckedChange={() => handleOperationTypeToggle(type)}
                      data-testid={`checkbox-operation-${type.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <Label htmlFor={`op-${type}`} className="font-normal cursor-pointer text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="carrierType">Carrier Type</Label>
              <Select
                value={formData.carrierType}
                onValueChange={(value) => setFormData({ ...formData, carrierType: value })}
              >
                <SelectTrigger data-testid="select-carrier-type">
                  <SelectValue placeholder="Select carrier type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">Common Carrier</SelectItem>
                  <SelectItem value="contract">Contract Carrier</SelectItem>
                  <SelectItem value="private">Private Hauler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="operatingRadius">Operating Radius</Label>
              <Select
                value={formData.operatingRadius}
                onValueChange={(value) => setFormData({ ...formData, operatingRadius: value })}
              >
                <SelectTrigger data-testid="select-radius">
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100">0-100 miles</SelectItem>
                  <SelectItem value="101-200">101-200 miles</SelectItem>
                  <SelectItem value="201-300">201-300 miles</SelectItem>
                  <SelectItem value="301-500">301-500 miles</SelectItem>
                  <SelectItem value="western">Western States</SelectItem>
                  <SelectItem value="48-states">48 States</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Filing States Needed (Select all that apply)</Label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2 max-h-48 overflow-y-auto border rounded-md p-3">
                <div className="col-span-full">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="federal"
                      checked={filingStates.includes("Federal")}
                      onCheckedChange={() => handleFilingStateToggle("Federal")}
                      data-testid="checkbox-filing-federal"
                    />
                    <Label htmlFor="federal" className="font-medium cursor-pointer">Federal</Label>
                  </div>
                </div>
                {SERVICE_STATES.map((state) => (
                  <div key={state.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state.value}`}
                      checked={filingStates.includes(state.value)}
                      onCheckedChange={() => handleFilingStateToggle(state.value)}
                      data-testid={`checkbox-filing-${state.value}`}
                    />
                    <Label htmlFor={`state-${state.value}`} className="font-normal cursor-pointer text-sm">{state.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commoditiesHauled">Commodities Hauled</Label>
                <Input
                  id="commoditiesHauled"
                  value={formData.commoditiesHauled}
                  onChange={(e) => setFormData({ ...formData, commoditiesHauled: e.target.value })}
                  placeholder="e.g., General Freight, Refrigerated, etc."
                  data-testid="input-commodities"
                />
              </div>
              <div>
                <Label htmlFor="averageLoadValue">Average Load Value ($)</Label>
                <Input
                  id="averageLoadValue"
                  type="number"
                  value={formData.averageLoadValue}
                  onChange={(e) => setFormData({ ...formData, averageLoadValue: e.target.value })}
                  placeholder="0"
                  data-testid="input-avg-load-value"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Coverage Information */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Coverage & Limits</h3>
            
            <h4 className="font-medium mt-6">Primary Coverages</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="autoLiabilityLimit">Auto Liability Limit</Label>
                <Select
                  value={formData.autoLiabilityLimit}
                  onValueChange={(value) => setFormData({ ...formData, autoLiabilityLimit: value })}
                >
                  <SelectTrigger data-testid="select-auto-liability-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="750k">$750,000 CSL</SelectItem>
                    <SelectItem value="1m">$1,000,000 CSL</SelectItem>
                    <SelectItem value="2m">$2,000,000 CSL</SelectItem>
                    <SelectItem value="5m">$5,000,000 CSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="autoLiabilityDeductible">Auto Liability Deductible</Label>
                <Select
                  value={formData.autoLiabilityDeductible}
                  onValueChange={(value) => setFormData({ ...formData, autoLiabilityDeductible: value })}
                >
                  <SelectTrigger data-testid="select-auto-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">$0</SelectItem>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargoLimit">Cargo Limit</Label>
                <Select
                  value={formData.cargoLimit}
                  onValueChange={(value) => setFormData({ ...formData, cargoLimit: value })}
                >
                  <SelectTrigger data-testid="select-cargo-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                    <SelectItem value="1m">$1,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cargoDeductible">Cargo Deductible</Label>
                <Select
                  value={formData.cargoDeductible}
                  onValueChange={(value) => setFormData({ ...formData, cargoDeductible: value })}
                >
                  <SelectTrigger data-testid="select-cargo-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                    <SelectItem value="10000">$10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="generalLiabilityLimit">General Liability Limit</Label>
                <Select
                  value={formData.generalLiabilityLimit}
                  onValueChange={(value) => setFormData({ ...formData, generalLiabilityLimit: value })}
                >
                  <SelectTrigger data-testid="select-gl-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m-2m">$1,000,000 / $2,000,000</SelectItem>
                    <SelectItem value="2m-4m">$2,000,000 / $4,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="generalLiabilityDeductible">General Liability Deductible</Label>
                <Select
                  value={formData.generalLiabilityDeductible}
                  onValueChange={(value) => setFormData({ ...formData, generalLiabilityDeductible: value })}
                >
                  <SelectTrigger data-testid="select-gl-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">$0</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium mt-6">Specialized Transportation Coverages</h4>
            <p className="text-sm text-muted-foreground">Select additional coverages needed for your operation</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inlandMarineTransportation">Inland Marine Transportation</Label>
                <Select
                  value={formData.inlandMarineTransportation}
                  onValueChange={(value) => setFormData({ ...formData, inlandMarineTransportation: value })}
                >
                  <SelectTrigger data-testid="select-inland-marine">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                    <SelectItem value="1m">$1,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="furnitureMoversWarehouse">Furniture Movers Warehouseman's Coverage</Label>
                <Select
                  value={formData.furnitureMoversWarehouse}
                  onValueChange={(value) => setFormData({ ...formData, furnitureMoversWarehouse: value })}
                >
                  <SelectTrigger data-testid="select-furniture-movers">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="motorTruckCargoAuto">Motor Truck Cargo - Auto & Boat Haulers</Label>
                <Select
                  value={formData.motorTruckCargoAuto}
                  onValueChange={(value) => setFormData({ ...formData, motorTruckCargoAuto: value })}
                >
                  <SelectTrigger data-testid="select-mtc-auto-boat">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                    <SelectItem value="1m">$1,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="motorTruckCargo">Motor Truck Cargo Insurance</Label>
                <Select
                  value={formData.motorTruckCargo}
                  onValueChange={(value) => setFormData({ ...formData, motorTruckCargo: value })}
                >
                  <SelectTrigger data-testid="select-mtc">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mtcLegalLiability">MTC Legal Liability</Label>
                <Select
                  value={formData.mtcLegalLiability}
                  onValueChange={(value) => setFormData({ ...formData, mtcLegalLiability: value })}
                >
                  <SelectTrigger data-testid="select-mtc-legal">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vehiclePhysicalDamage">Vehicle Physical Damage</Label>
                <Select
                  value={formData.vehiclePhysicalDamage}
                  onValueChange={(value) => setFormData({ ...formData, vehiclePhysicalDamage: value })}
                >
                  <SelectTrigger data-testid="select-physical-damage">
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Only</SelectItem>
                    <SelectItem value="collision">Collision Only</SelectItem>
                    <SelectItem value="both">Comprehensive & Collision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transportationLocation">Transportation Location Coverage</Label>
                <Select
                  value={formData.transportationLocation}
                  onValueChange={(value) => setFormData({ ...formData, transportationLocation: value })}
                >
                  <SelectTrigger data-testid="select-transport-location">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="warehousemanLegalLiability">Warehouseman's Legal Liability</Label>
                <Select
                  value={formData.warehousemanLegalLiability}
                  onValueChange={(value) => setFormData({ ...formData, warehousemanLegalLiability: value })}
                >
                  <SelectTrigger data-testid="select-warehouseman">
                    <SelectValue placeholder="Select limit or N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">Not Applicable</SelectItem>
                    <SelectItem value="100k">$100,000</SelectItem>
                    <SelectItem value="250k">$250,000</SelectItem>
                    <SelectItem value="500k">$500,000</SelectItem>
                    <SelectItem value="1m">$1,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="householdGoodsMovers">Household Goods Movers - Carriers' Legal Liability & Warehouseman's Legal Liability</Label>
              <Select
                value={formData.householdGoodsMovers}
                onValueChange={(value) => setFormData({ ...formData, householdGoodsMovers: value })}
              >
                <SelectTrigger data-testid="select-household-goods">
                  <SelectValue placeholder="Select limit or N/A" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="na">Not Applicable</SelectItem>
                  <SelectItem value="100k">$100,000</SelectItem>
                  <SelectItem value="250k">$250,000</SelectItem>
                  <SelectItem value="500k">$500,000</SelectItem>
                  <SelectItem value="1m">$1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 4: Vehicles & Equipment */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Vehicles & Equipment</h3>
                <p className="text-sm text-muted-foreground">List all power units and trailers</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addVehicle} data-testid="button-add-vehicle">
                <Plus className="h-4 w-4 mr-1" />
                Add Vehicle
              </Button>
            </div>

            {vehicles.map((vehicle, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Vehicle {index + 1}</h4>
                  {vehicles.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVehicle(index)}
                      data-testid={`button-remove-vehicle-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Year *</Label>
                    <Input
                      type="number"
                      value={vehicle.year}
                      onChange={(e) => updateVehicle(index, 'year', e.target.value)}
                      placeholder="YYYY"
                      data-testid={`input-vehicle-year-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Make *</Label>
                    <Input
                      value={vehicle.make}
                      onChange={(e) => updateVehicle(index, 'make', e.target.value)}
                      placeholder="e.g., Freightliner, Peterbilt"
                      data-testid={`input-vehicle-make-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Body Type *</Label>
                    <Input
                      value={vehicle.bodyType}
                      onChange={(e) => updateVehicle(index, 'bodyType', e.target.value)}
                      placeholder="e.g., Tractor, Van, Flatbed"
                      data-testid={`input-vehicle-body-${index}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>GVW</Label>
                    <Input
                      value={vehicle.gvw}
                      onChange={(e) => updateVehicle(index, 'gvw', e.target.value)}
                      placeholder="e.g., 80,000"
                      data-testid={`input-vehicle-gvw-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Value ($)</Label>
                    <Input
                      type="number"
                      value={vehicle.value}
                      onChange={(e) => updateVehicle(index, 'value', e.target.value)}
                      placeholder="0"
                      data-testid={`input-vehicle-value-${index}`}
                    />
                  </div>
                  <div>
                    <Label>VIN *</Label>
                    <Input
                      value={vehicle.vin}
                      onChange={(e) => updateVehicle(index, 'vin', e.target.value)}
                      placeholder="17-digit VIN"
                      maxLength={17}
                      data-testid={`input-vehicle-vin-${index}`}
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="bg-muted/50 p-4 rounded-md mt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> For larger fleets, you may submit a separate vehicle schedule in Excel format after completing this application.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Drivers */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Driver Information</h3>
                <p className="text-sm text-muted-foreground">Provide details for all drivers</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addDriver} data-testid="button-add-driver">
                <Plus className="h-4 w-4 mr-1" />
                Add Driver
              </Button>
            </div>

            {drivers.map((driver, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Driver {index + 1}</h4>
                  {drivers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDriver(index)}
                      data-testid={`button-remove-driver-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={driver.name}
                      onChange={(e) => updateDriver(index, 'name', e.target.value)}
                      placeholder="Driver full name"
                      data-testid={`input-driver-name-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Date of Birth *</Label>
                    <Input
                      type="date"
                      value={driver.dob}
                      onChange={(e) => updateDriver(index, 'dob', e.target.value)}
                      data-testid={`input-driver-dob-${index}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>CDL Experience (Years) *</Label>
                    <Input
                      type="number"
                      value={driver.cdlExperience}
                      onChange={(e) => updateDriver(index, 'cdlExperience', e.target.value)}
                      placeholder="0"
                      data-testid={`input-driver-cdl-${index}`}
                    />
                  </div>
                  <div>
                    <Label># of Accidents (Last 5 Years)</Label>
                    <Input
                      type="number"
                      value={driver.accidents}
                      onChange={(e) => updateDriver(index, 'accidents', e.target.value)}
                      placeholder="0"
                      data-testid={`input-driver-accidents-${index}`}
                    />
                  </div>
                  <div>
                    <Label># of Violations (Last 5 Years)</Label>
                    <Input
                      type="number"
                      value={driver.violations}
                      onChange={(e) => updateDriver(index, 'violations', e.target.value)}
                      placeholder="0"
                      data-testid={`input-driver-violations-${index}`}
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="border-t pt-4 mt-6">
              <h4 className="font-medium mb-4">Driver Statistics</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalDrivers">Total Number of Drivers</Label>
                  <Input
                    id="totalDrivers"
                    type="number"
                    value={formData.totalDrivers}
                    onChange={(e) => setFormData({ ...formData, totalDrivers: e.target.value })}
                    placeholder="0"
                    data-testid="input-total-drivers"
                  />
                </div>
                <div>
                  <Label htmlFor="avgDriverExperience">Average Years of Driver Experience</Label>
                  <Input
                    id="avgDriverExperience"
                    type="number"
                    value={formData.avgDriverExperience}
                    onChange={(e) => setFormData({ ...formData, avgDriverExperience: e.target.value })}
                    placeholder="0"
                    data-testid="input-avg-experience"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="driversOver70">Drivers Over 70 Years Old</Label>
                  <Input
                    id="driversOver70"
                    type="number"
                    value={formData.driversOver70}
                    onChange={(e) => setFormData({ ...formData, driversOver70: e.target.value })}
                    placeholder="0"
                    data-testid="input-drivers-over-70"
                  />
                </div>
                <div>
                  <Label htmlFor="driversUnder25">Drivers Under 25 Years Old</Label>
                  <Input
                    id="driversUnder25"
                    type="number"
                    value={formData.driversUnder25}
                    onChange={(e) => setFormData({ ...formData, driversUnder25: e.target.value })}
                    placeholder="0"
                    data-testid="input-drivers-under-25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="maxHoursPerDay">Maximum Hours Per Day Driving</Label>
                  <Input
                    id="maxHoursPerDay"
                    type="number"
                    value={formData.maxHoursPerDay}
                    onChange={(e) => setFormData({ ...formData, maxHoursPerDay: e.target.value })}
                    placeholder="0"
                    data-testid="input-max-hours-day"
                  />
                </div>
                <div>
                  <Label htmlFor="maxHoursPerWeek">Maximum Hours Per Week</Label>
                  <Input
                    id="maxHoursPerWeek"
                    type="number"
                    value={formData.maxHoursPerWeek}
                    onChange={(e) => setFormData({ ...formData, maxHoursPerWeek: e.target.value })}
                    placeholder="0"
                    data-testid="input-max-hours-week"
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> MVRs (Motor Vehicle Records) are required for all drivers. Please have these available for submission.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Historical Data & Additional Information */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Historical Data & Additional Information</h3>
            
            <h4 className="font-medium">Power Units by Year</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="powerUnitsCurrent">Current Year</Label>
                <Input
                  id="powerUnitsCurrent"
                  type="number"
                  value={formData.powerUnitsCurrent}
                  onChange={(e) => setFormData({ ...formData, powerUnitsCurrent: e.target.value })}
                  placeholder="0"
                  data-testid="input-power-current"
                />
              </div>
              <div>
                <Label htmlFor="powerUnits1stPrior">1st Prior Year</Label>
                <Input
                  id="powerUnits1stPrior"
                  type="number"
                  value={formData.powerUnits1stPrior}
                  onChange={(e) => setFormData({ ...formData, powerUnits1stPrior: e.target.value })}
                  placeholder="0"
                  data-testid="input-power-1st"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Gross Receipts by Year</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossReceiptsEstimated">Estimated Next Year ($)</Label>
                <Input
                  id="grossReceiptsEstimated"
                  type="number"
                  value={formData.grossReceiptsEstimated}
                  onChange={(e) => setFormData({ ...formData, grossReceiptsEstimated: e.target.value })}
                  placeholder="0"
                  data-testid="input-receipts-estimated"
                />
              </div>
              <div>
                <Label htmlFor="grossReceiptsCurrent">Current Year ($)</Label>
                <Input
                  id="grossReceiptsCurrent"
                  type="number"
                  value={formData.grossReceiptsCurrent}
                  onChange={(e) => setFormData({ ...formData, grossReceiptsCurrent: e.target.value })}
                  placeholder="0"
                  data-testid="input-receipts-current"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Operational Questions</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insuranceCancelled"
                  checked={checkboxes.insuranceCancelled}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, insuranceCancelled: checked as boolean })}
                  data-testid="checkbox-insurance-cancelled"
                />
                <Label htmlFor="insuranceCancelled" className="font-normal cursor-pointer">
                  Had insurance cancelled, declined or non-renewed in last 3 years?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useOwnerOperators"
                  checked={checkboxes.useOwnerOperators}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, useOwnerOperators: checked as boolean })}
                  data-testid="checkbox-owner-operators"
                />
                <Label htmlFor="useOwnerOperators" className="font-normal cursor-pointer">
                  Utilize Owner/Operators?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brokerageAuthority"
                  checked={checkboxes.brokerageAuthority}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, brokerageAuthority: checked as boolean })}
                  data-testid="checkbox-brokerage"
                />
                <Label htmlFor="brokerageAuthority" className="font-normal cursor-pointer">
                  Have Brokerage Authority?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="teamDriving"
                  checked={checkboxes.teamDriving}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, teamDriving: checked as boolean })}
                  data-testid="checkbox-team-driving"
                />
                <Label htmlFor="teamDriving" className="font-normal cursor-pointer">
                  Allow Team Driving?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="safetyProgram"
                  checked={checkboxes.safetyProgram}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, safetyProgram: checked as boolean })}
                  data-testid="checkbox-safety-program"
                />
                <Label htmlFor="safetyProgram" className="font-normal cursor-pointer">
                  Have a written safety program in place?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="driverSelectionProgram"
                  checked={checkboxes.driverSelectionProgram}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, driverSelectionProgram: checked as boolean })}
                  data-testid="checkbox-driver-selection"
                />
                <Label htmlFor="driverSelectionProgram" className="font-normal cursor-pointer">
                  Have a driver selection program in place?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="writtenMaintenance"
                  checked={checkboxes.writtenMaintenance}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, writtenMaintenance: checked as boolean })}
                  data-testid="checkbox-maintenance"
                />
                <Label htmlFor="writtenMaintenance" className="font-normal cursor-pointer">
                  Have a written maintenance program in place?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monitorMVRs"
                  checked={checkboxes.monitorMVRs}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, monitorMVRs: checked as boolean })}
                  data-testid="checkbox-monitor-mvrs"
                />
                <Label htmlFor="monitorMVRs" className="font-normal cursor-pointer">
                  Monitor motor vehicle reports for all drivers?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="driversProperlyLicensed"
                  checked={checkboxes.driversProperlyLicensed}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, driversProperlyLicensed: checked as boolean })}
                  data-testid="checkbox-properly-licensed"
                />
                <Label htmlFor="driversProperlyLicensed" className="font-normal cursor-pointer">
                  All drivers properly licensed and DOT compliant?
                </Label>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-4">Required Documents</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="acordForm">ACORD 137 Form *</Label>
                  <Input
                    id="acordForm"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    data-testid="input-acord-form"
                  />
                </div>

                <div>
                  <Label htmlFor="lossRuns">Currently Valued Loss Runs (3 years) *</Label>
                  <Input
                    id="lossRuns"
                    type="file"
                    accept=".pdf,.xls,.xlsx"
                    data-testid="input-loss-runs"
                  />
                </div>

                <div>
                  <Label htmlFor="iftaReports">IFTA Reports (4 Quarters) - If Long Haul</Label>
                  <Input
                    id="iftaReports"
                    type="file"
                    accept=".pdf,.xls,.xlsx"
                    multiple
                    data-testid="input-ifta"
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleList">Vehicle List (Excel Format)</Label>
                  <Input
                    id="vehicleList"
                    type="file"
                    accept=".xls,.xlsx"
                    data-testid="input-vehicle-list"
                  />
                </div>

                <div>
                  <Label htmlFor="driverList">Driver List</Label>
                  <Input
                    id="driverList"
                    type="file"
                    accept=".pdf,.xls,.xlsx"
                    data-testid="input-driver-list"
                  />
                </div>

                <div>
                  <Label htmlFor="mvrDocuments">MVRs for All Drivers *</Label>
                  <Input
                    id="mvrDocuments"
                    type="file"
                    accept=".pdf"
                    multiple
                    data-testid="input-mvrs"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Please provide any additional information about your operation, special circumstances, or coverage needs..."
                rows={5}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our transportation insurance specialists</li>
                <li>We'll analyze your fleet, drivers, operations, and loss history</li>
                <li>You'll receive a competitive quote within 24-48 hours</li>
                <li>Our team will help with DOT filings and compliance requirements</li>
                <li>We can provide guidance on safety programs and risk management</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 6 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto" data-testid="button-submit-quote">
              Submit Transportation Quote Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
